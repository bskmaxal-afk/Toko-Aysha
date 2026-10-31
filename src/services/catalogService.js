import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { products as localProducts } from '../data/products';
import { categories as localCategories } from '../data/categories';

const BUCKET_NAME = 'product-images';

/**
 * Helper to resolve product image URL
 */
function resolveImageUrl(imagePath) {
  if (!imagePath) return '';
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('/')) {
    return imagePath;
  }
  if (!isSupabaseConfigured || !supabase) return imagePath;

  const { data } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(imagePath);

  return data?.publicUrl || imagePath;
}

/**
 * Map Supabase product database record to the public website's product shape
 */
function mapDatabaseProduct(dbRow) {
  return {
    id: dbRow.slug || dbRow.id,
    dbId: dbRow.id,
    name: dbRow.name,
    brand: dbRow.brand || '',
    category: dbRow.category?.slug || 'other-products',
    categoryName: dbRow.category?.name || 'Category',
    origin: dbRow.country?.name || 'Asian Market',
    originCode: dbRow.country?.code || 'ID',
    flagEmoji: dbRow.country?.flag_emoji || '🌏',
    packageSize: dbRow.package_size || '',
    variant: dbRow.variant || '',
    featured: Boolean(dbRow.featured),
    isNew: Boolean(dbRow.is_new),
    inStock: dbRow.availability === 'available',
    price: dbRow.price || null,
    image: resolveImageUrl(dbRow.image_path),
    description: dbRow.description || '',
    ingredients: dbRow.ingredients || '',
    allergens: dbRow.allergens || '',
    preparation: dbRow.preparation || '',
    status: dbRow.status,
    updatedAt: dbRow.updated_at,
  };
}

/**
 * Fetch all eligible published products from Supabase
 * Enforces rule: status = 'published' AND archived_at IS NULL
 */
export async function getPublishedProducts() {
  if (!isSupabaseConfigured || !supabase) {
    // Graceful fallback to preserve working storefront before Supabase credentials are configured
    return localProducts;
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
      console.warn('Error querying published products from Supabase, falling back to local dataset:', error.message);
      return localProducts;
    }

    if (!data || data.length === 0) {
      // If table is empty, return local verified catalog as safety fallback
      return localProducts;
    }

    return data.map(mapDatabaseProduct);
  } catch (err) {
    console.error('Failed to load published products:', err);
    return localProducts;
  }
}

/**
 * Fetch single published product by id or slug
 */
export async function getPublishedProductById(idOrSlug) {
  if (!isSupabaseConfigured || !supabase) {
    return localProducts.find(p => p.id === idOrSlug) || null;
  }

  try {
    // Try finding by slug first, then UUID
    let query = supabase
      .from('products')
      .select(`
        *,
        country:countries(name, code, flag_emoji),
        category:categories(name, slug)
      `)
      .eq('status', 'published')
      .is('archived_at', null);

    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrSlug);
    if (isUUID) {
      query = query.eq('id', idOrSlug);
    } else {
      query = query.eq('slug', idOrSlug);
    }

    const { data, error } = await query.maybeSingle();

    if (error || !data) {
      // Fallback check in local data
      return localProducts.find(p => p.id === idOrSlug) || null;
    }

    return mapDatabaseProduct(data);
  } catch (err) {
    console.error('Error fetching product by slug:', err);
    return localProducts.find(p => p.id === idOrSlug) || null;
  }
}

/**
 * Fetch active categories from database
 */
export async function getPublicCategories() {
  if (!isSupabaseConfigured || !supabase) {
    return localCategories;
  }

  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return localCategories;
    }

    return data.map(c => ({
      id: c.slug,
      dbId: c.id,
      name: c.name,
      tagline: c.tagline || '',
      description: c.description || '',
      icon: c.icon || 'ShoppingBag',
      color: c.color || '#7B111A',
      bgTint: c.bg_tint || '#FAF2F3',
    }));
  } catch (err) {
    console.error('Error fetching categories from Supabase:', err);
    return localCategories;
  }
}

/**
 * Fetch active country options from database
 */
export async function getPublicCountries() {
  if (!isSupabaseConfigured || !supabase) {
    return [
      { id: 'all', label: 'All Asian Products', flag: '🌏' },
      { id: 'Indonesia', label: 'Indonesia', flag: '🇮🇩' },
      { id: 'South Korea', label: 'South Korea', flag: '🇰🇷' },
      { id: 'Thailand', label: 'Thailand', flag: '🇹🇭' },
      { id: 'China', label: 'China', flag: '🇨🇳' },
      { id: 'Sri Lanka', label: 'Sri Lanka', flag: '🇱🇰' },
      { id: 'Japan', label: 'Japan', flag: '🇯🇵' },
    ];
  }

  try {
    const { data, error } = await supabase
      .from('countries')
      .select('*')
      .order('name', { ascending: true });

    if (error || !data || data.length === 0) {
      return [
        { id: 'all', label: 'All Asian Products', flag: '🌏' },
        { id: 'Indonesia', label: 'Indonesia', flag: '🇮🇩' },
        { id: 'South Korea', label: 'South Korea', flag: '🇰🇷' },
        { id: 'Thailand', label: 'Thailand', flag: '🇹🇭' },
        { id: 'China', label: 'China', flag: '🇨🇳' },
        { id: 'Sri Lanka', label: 'Sri Lanka', flag: '🇱🇰' },
        { id: 'Japan', label: 'Japan', flag: '🇯🇵' },
      ];
    }

    return [
      { id: 'all', label: 'All Asian Products', flag: '🌏' },
      ...data.map(c => ({
        id: c.name,
        label: c.name,
        flag: c.flag_emoji || '🌏',
        code: c.code,
      })),
    ];
  } catch (err) {
    console.error('Error fetching countries from Supabase:', err);
    return [
      { id: 'all', label: 'All Asian Products', flag: '🌏' },
      { id: 'Indonesia', label: 'Indonesia', flag: '🇮🇩' },
    ];
  }
}
