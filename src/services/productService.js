import { createClient } from '@supabase/supabase-js';
import { products as localProducts } from '../data/products.js';
import { categories as defaultCategories } from '../data/categories.js';
import { getCountryFlag } from '../utils/countryFlags.js';

// Initialize Supabase client if environment variables are provided
const supabaseUrl = typeof import.meta !== 'undefined' && (import.meta.env?.VITE_SUPABASE_URL || '');
const supabaseAnonKey = typeof import.meta !== 'undefined' && (import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env?.VITE_SUPABASE_ANON_KEY || '');

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('https://') &&
  !supabaseUrl.includes('your-project-id')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false },
    })
  : null;

/**
 * Helper to get human-readable category name by ID/slug
 */
export function getCategoryName(categoryId) {
  if (!categoryId) return '';
  const match = defaultCategories.find(c => c.id === categoryId || c.slug === categoryId);
  return match ? match.name : categoryId;
}

/**
 * Standardize and normalize a product item from either Supabase or local dataset
 */
export function normalizeProduct(raw) {
  if (!raw) return null;

  const id = String(raw.slug || raw.id || '');
  const name = raw.name || '';
  const brand = raw.brand || '';
  const variant = raw.variant || raw.flavor || '';
  const packageSize = raw.package_size || raw.packageSize || raw.weight || '';
  const description = raw.description || '';
  const ingredients = raw.ingredients || '';
  const allergens = raw.allergens || '';
  const preparation = raw.preparation || '';

  // Country & Origin mapping
  const origin = raw.country?.name || raw.origin || raw.country_of_origin || '';
  const countryFlag = raw.country?.flag_emoji || getCountryFlag(origin);

  // Category mapping
  const categoryId = raw.category?.slug || raw.category_id || raw.category || '';
  const categoryName = raw.category?.name || getCategoryName(categoryId);

  // Image mapping
  let image = raw.image_path || raw.image || '';
  if (image && !image.startsWith('http') && !image.startsWith('/') && !image.startsWith('data:')) {
    if (supabaseUrl) {
      image = `${supabaseUrl}/storage/v1/object/public/product-images/${image}`;
    } else {
      image = `/${image}`;
    }
  }

  // Availability:
  let isAvailable = true;
  if (raw.availability !== undefined && raw.availability !== null) {
    isAvailable = raw.availability === 'available';
  } else if (raw.inStock !== undefined && raw.inStock !== null) {
    isAvailable = Boolean(raw.inStock);
  }

  // Publication & Archive status
  const status = raw.status || 'published';
  const isArchived = status === 'archived' || raw.archived === true || Boolean(raw.archived_at);
  const isPublished = status === 'published' && !isArchived;

  return {
    id,
    slug: raw.slug || id,
    name,
    brand,
    variant,
    packageSize,
    description,
    ingredients,
    allergens,
    preparation,
    origin,
    countryFlag,
    category: categoryId,
    categoryName,
    image,
    inStock: isAvailable,
    isAvailable,
    status,
    isArchived,
    isPublished,
    featured: Boolean(raw.featured),
    isNew: Boolean(raw.is_new || raw.isNew),
    price: raw.price ?? null,
    _raw: raw
  };
}

/**
 * Synchronous local catalog fallback (Empty by default in live database mode)
 */
export function getPublishedProducts() {
  if (isSupabaseConfigured) {
    return [];
  }
  return localProducts
    .map(normalizeProduct)
    .filter(p => p && p.isPublished && !p.isArchived);
}

/**
 * Asynchronously fetch all eligible published products from Supabase
 * Enforces rule: status = 'published' AND archived_at IS NULL
 * Pure database source: never falls back to dummy local data when Supabase is active.
 */
export async function fetchPublishedProducts() {
  if (!isSupabaseConfigured || !supabase) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        country:countries(name, code, flag_emoji),
        category:categories(name, slug)
      `)
      .eq('status', 'published')
      .is('archived_at', null)
      .order('featured', { ascending: false })
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Supabase products fetch error:', error.message);
      return [];
    }

    if (!data || data.length === 0) {
      return [];
    }

    return data.map(normalizeProduct).filter(p => p && p.isPublished && !p.isArchived);
  } catch (err) {
    console.error('fetchPublishedProducts exception:', err);
    return [];
  }
}

/**
 * Find single published product by ID or Slug
 */
export async function fetchProductById(idOrSlug) {
  if (!idOrSlug) return null;

  if (isSupabaseConfigured && supabase) {
    try {
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrSlug);
      let query = supabase
        .from('products')
        .select(`
          *,
          country:countries(name, code, flag_emoji),
          category:categories(name, slug)
        `)
        .eq('status', 'published')
        .is('archived_at', null);

      if (isUUID) {
        query = query.eq('id', idOrSlug);
      } else {
        query = query.eq('slug', idOrSlug);
      }

      const { data, error } = await query.maybeSingle();
      if (!error && data) {
        return normalizeProduct(data);
      }
      return null;
    } catch (err) {
      console.warn('fetchProductById error:', err);
      return null;
    }
  }

  if (isSupabaseConfigured) {
    return null;
  }

  // Fallback to local only if database is completely unconfigured
  return getProductById(idOrSlug);
}

/**
 * Synchronous product lookup by ID or Slug from local published dataset
 */
export function getProductById(idOrSlug) {
  if (!idOrSlug) return null;
  const target = String(idOrSlug).toLowerCase();
  const all = getPublishedProducts();
  return all.find(p => p.id.toLowerCase() === target || p.slug.toLowerCase() === target) || null;
}

/**
 * Fetch active categories
 */
export async function fetchPublicCategories() {
  if (!isSupabaseConfigured || !supabase) {
    return defaultCategories;
  }

  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return defaultCategories;
    }

    return data.map(c => ({
      id: c.slug,
      name: c.name,
      tagline: c.tagline || '',
      description: c.description || '',
      icon: c.icon || 'ShoppingBag',
      color: c.color || '#7B111A',
      bgTint: c.bg_tint || '#FAF2F3',
    }));
  } catch (err) {
    console.warn('fetchPublicCategories error, using default:', err);
    return defaultCategories;
  }
}

/**
 * Fetch origin options
 */
export async function fetchPublicCountries() {
  const fallback = [
    { id: 'all', label: 'All Asian Products', flag: '🌏' },
    { id: 'Indonesia', label: 'Indonesia', flag: '🇮🇩' },
    { id: 'imported', label: 'Asian Imports (Non-Indonesia)', flag: '🥢' },
    { id: 'South Korea', label: 'South Korea', flag: '🇰🇷' },
    { id: 'Thailand', label: 'Thailand', flag: '🇹🇭' },
    { id: 'Sri Lanka', label: 'Sri Lanka', flag: '🇱🇰' },
    { id: 'China', label: 'China', flag: '🇨🇳' }
  ];

  if (!isSupabaseConfigured || !supabase) {
    return fallback;
  }

  try {
    const { data, error } = await supabase
      .from('countries')
      .select('*')
      .order('name', { ascending: true });

    if (error || !data || data.length === 0) {
      return fallback;
    }

    return [
      { id: 'all', label: 'All Asian Products', flag: '🌏' },
      ...data.map(c => ({
        id: c.name,
        label: c.name,
        flag: c.flag_emoji || '🌏',
        code: c.code,
      })),
      { id: 'imported', label: 'Asian Imports (Non-Indonesia)', flag: '🥢' },
    ];
  } catch (err) {
    return fallback;
  }
}
