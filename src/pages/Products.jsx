import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import SearchBar from '../components/SearchBar';
import ProductFilters from '../components/ProductFilters';
import ProductGrid from '../components/ProductGrid';
import ProductDetailModal from '../components/ProductDetailModal';
import { products } from '../data/products';
import { categories } from '../data/categories';

const ITEMS_PER_PAGE = 12;

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read URL query parameters
  const initialCategory = searchParams.get('category') || 'all';
  const initialOrigin = searchParams.get('origin') || 'all';
  const initialSearch = searchParams.get('search') || '';
  const initialBrand = searchParams.get('brand') || 'all';
  const initialSort = searchParams.get('sort') || 'featured';

  const [category, setCategory] = useState(initialCategory);
  const [origin, setOrigin] = useState(initialOrigin);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [brand, setBrand] = useState(initialBrand);
  const [sortBy, setSortBy] = useState(initialSort);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Sync state with URL params when URL changes
  useEffect(() => {
    const cat = searchParams.get('category') || 'all';
    const orig = searchParams.get('origin') || 'all';
    const s = searchParams.get('search') || '';
    const b = searchParams.get('brand') || 'all';
    const st = searchParams.get('sort') || 'featured';

    setCategory(cat);
    setOrigin(orig);
    setSearchQuery(s);
    setBrand(b);
    setSortBy(st);
  }, [searchParams]);

  // Update URL helper
  const updateUrlParams = (newParams) => {
    const updated = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, value]) => {
      if (value && value !== 'all') {
        updated.set(key, value);
      } else {
        updated.delete(key);
      }
    });
    setSearchParams(updated, { replace: true });
  };

  // Handle Category Select
  const handleSelectCategory = (catId) => {
    setCategory(catId);
    setVisibleCount(ITEMS_PER_PAGE);
    updateUrlParams({ category: catId });
  };

  // Handle Origin Select
  const handleSelectOrigin = (origId) => {
    setOrigin(origId);
    setVisibleCount(ITEMS_PER_PAGE);
    updateUrlParams({ origin: origId });
  };

  // Handle Brand Select
  const handleSelectBrand = (brandName) => {
    setBrand(brandName);
    setVisibleCount(ITEMS_PER_PAGE);
    updateUrlParams({ brand: brandName });
  };

  // Handle Sort Select
  const handleSelectSort = (sortOption) => {
    setSortBy(sortOption);
    updateUrlParams({ sort: sortOption });
  };

  // Handle Live Search
  const handleSearch = (query) => {
    setSearchQuery(query);
    setVisibleCount(ITEMS_PER_PAGE);
    updateUrlParams({ search: query });
  };

  // Reset All Filters
  const handleResetFilters = () => {
    setCategory('all');
    setOrigin('all');
    setSearchQuery('');
    setBrand('all');
    setSortBy('featured');
    setVisibleCount(ITEMS_PER_PAGE);
    setSearchParams({}, { replace: true });
  };

  // Available unique brands derived from current category and origin
  const availableBrands = useMemo(() => {
    let pool = products;
    if (category !== 'all') {
      pool = pool.filter(p => p.category === category);
    }
    if (origin !== 'all') {
      if (origin.toLowerCase() === 'imported' || origin.toLowerCase() === 'non-indonesia') {
        pool = pool.filter(p => p.origin && !p.origin.toLowerCase().includes('indonesia'));
      } else if (origin.toLowerCase() === 'indonesia') {
        pool = pool.filter(p => p.origin && p.origin.toLowerCase().includes('indonesia'));
      } else {
        pool = pool.filter(p => p.origin && p.origin.toLowerCase().includes(origin.toLowerCase()));
      }
    }
    const unique = [...new Set(pool.map(p => p.brand))].sort();
    return unique;
  }, [category, origin]);

  // Filter and Sort Products
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // 1. Origin Filter
      let matchOrigin = true;
      if (origin !== 'all') {
        if (origin.toLowerCase() === 'imported' || origin.toLowerCase() === 'non-indonesia') {
          matchOrigin = Boolean(item.origin && !item.origin.toLowerCase().includes('indonesia'));
        } else if (origin.toLowerCase() === 'indonesia') {
          matchOrigin = Boolean(item.origin && item.origin.toLowerCase().includes('indonesia'));
        } else {
          matchOrigin = Boolean(item.origin && item.origin.toLowerCase().includes(origin.toLowerCase()));
        }
      }

      // 2. Category Filter
      const matchCategory = category === 'all' || item.category === category;

      // 3. Brand Filter
      const matchBrand = brand === 'all' || item.brand === brand;

      // 4. Search Filter (name, brand, description, origin, packageSize)
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q || 
        item.name.toLowerCase().includes(q) ||
        item.brand.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        (item.origin && item.origin.toLowerCase().includes(q)) ||
        (item.packageSize && item.packageSize.toLowerCase().includes(q));

      return matchOrigin && matchCategory && matchBrand && matchSearch;
    }).sort((a, b) => {
      if (sortBy === 'featured') {
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
      if (sortBy === 'name-asc') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'name-desc') {
        return b.name.localeCompare(a.name);
      }
      if (sortBy === 'brand') {
        return a.brand.localeCompare(b.brand);
      }
      return 0;
    });
  }, [category, origin, brand, searchQuery, sortBy]);

  // Paginated/Sliced subset
  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const currentCategoryObj = categories.find(c => c.id === category);

  const hasActiveFilters = category !== 'all' || origin !== 'all' || brand !== 'all' || Boolean(searchQuery.trim());

  // Dynamic Page Title & Description
  const getPageTitle = () => {
    if (currentCategoryObj && origin !== 'all') {
      const origLabel = origin === 'imported' ? 'Asian Imports' : origin;
      return `${currentCategoryObj.name} — ${origLabel}`;
    }
    if (currentCategoryObj) return currentCategoryObj.name;
    if (origin === 'imported') return 'Asian Market Imports';
    if (origin === 'Indonesia') return 'Indonesian Groceries';
    if (origin !== 'all') return `${origin} Specialties`;
    return 'Asian Grocery Catalog';
  };

  const getPageDescription = () => {
    if (currentCategoryObj && origin === 'imported') {
      return `Explore ${currentCategoryObj.name.toLowerCase()} imported from South Korea, Thailand, China, and across Asia.`;
    }
    if (currentCategoryObj) return currentCategoryObj.description;
    if (origin === 'imported') {
      return 'Explore our curated collection of authentic grocery favorites imported from South Korea, Thailand, China, and across Asia.';
    }
    if (origin === 'Indonesia') {
      return 'Discover authentic Indonesian favorites — from Indomie Mi Goreng and Sambal ABC to Bango sweet soy sauce and regional snacks.';
    }
    if (origin !== 'all') {
      return `Browse authentic grocery essentials and specialties from ${origin}.`;
    }
    return 'Browse our complete catalog of 145 authentic Asian groceries, instant noodles, sauces, snacks, and cooking ingredients.';
  };

  return (
    <div className="products-page section" style={{ backgroundColor: 'var(--color-bg)', minHeight: '80vh' }}>
      <div className="container">
        {/* Breadcrumb Navigation */}
        <Breadcrumb 
          items={[
            { label: 'Products', path: '/products' },
            ...(origin !== 'all' ? [{ label: origin === 'imported' ? 'Asian Imports' : origin, path: `/products?origin=${origin}` }] : []),
            ...(currentCategoryObj ? [{ label: currentCategoryObj.name }] : [])
          ]}
        />

        {/* Asian Grocer Catalogue Banner Hero Card with Official Banner Background */}
        <div 
          className="catalog-banner-hero"
          style={{
            position: 'relative',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            marginBottom: 'var(--space-8)',
            border: '1.5px solid var(--color-border)',
            boxShadow: 'var(--shadow-md)',
            backgroundImage: "linear-gradient(135deg, rgba(255, 255, 255, 0.94) 0%, rgba(255, 255, 255, 0.88) 48%, rgba(255, 255, 255, 0.72) 100%), url('/images/brand/banner.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center right',
            padding: 'clamp(1.5rem, 3.5vw, 2.5rem)'
          }}
        >
          {/* Official Banner Verification Badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem', marginBottom: 'var(--space-3)' }}>
            <span 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                backgroundColor: 'var(--color-primary)',
                color: '#FFFFFF',
                padding: '0.25rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.72rem',
                fontWeight: 800,
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}
            >
              TA TOKO AYSHA • ASIAN MARKET
            </span>
            <span 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                backgroundColor: 'rgba(255, 255, 255, 0.92)',
                color: 'var(--color-accent)',
                padding: '0.25rem 0.65rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.72rem',
                fontWeight: 700,
                border: '1px solid var(--color-border)'
              }}
            >
              Halal Indonesia Certified
            </span>
            <span 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                backgroundColor: 'rgba(255, 255, 255, 0.92)',
                color: 'var(--color-text-secondary)',
                padding: '0.25rem 0.65rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.72rem',
                fontWeight: 600,
                border: '1px solid var(--color-border)'
              }}
            >
              📍 Knosou 11, Athens, Greece
            </span>
            <span 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                backgroundColor: 'rgba(255, 255, 255, 0.92)',
                color: 'var(--color-text-secondary)',
                padding: '0.25rem 0.65rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.72rem',
                fontWeight: 600,
                border: '1px solid var(--color-border)'
              }}
            >
              Χονδρική & Λιανική (Wholesale & Retail)
            </span>
          </div>

          <div 
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 'var(--space-6)'
            }}
          >
            <div style={{ maxWidth: '640px' }}>
              <h1 
                style={{
                  fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                  fontWeight: 800,
                  color: 'var(--color-primary)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  marginBottom: '0.45rem'
                }}
              >
                {getPageTitle()}
              </h1>
              <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-main)', lineHeight: 1.55 }}>
                {getPageDescription()}
              </p>
            </div>

            {/* Search bar inside products page */}
            <div style={{ width: '100%', maxWidth: '380px' }}>
              <SearchBar
                initialValue={searchQuery}
                onSearch={handleSearch}
                placeholder="Search name, brand, origin, or flavor..."
                variant="catalog"
              />
            </div>
          </div>
        </div>

        {/* Product Filters & Sorters */}
        <ProductFilters
          selectedCategory={category}
          onSelectCategory={handleSelectCategory}
          selectedOrigin={origin}
          onSelectOrigin={handleSelectOrigin}
          selectedBrand={brand}
          onSelectBrand={handleSelectBrand}
          sortBy={sortBy}
          onSelectSort={handleSelectSort}
          availableBrands={availableBrands}
          totalCount={filteredProducts.length}
          onResetFilters={handleResetFilters}
          hasActiveFilters={hasActiveFilters}
        />

        {/* Product Grid */}
        <ProductGrid
          products={displayedProducts}
          onViewDetails={(product) => setSelectedProduct(product)}
          onResetFilters={handleResetFilters}
        />

        {/* Load More Button */}
        {hasMore && (
          <div style={{ textAlign: 'center', marginTop: 'var(--space-10)' }}>
            <button
              type="button"
              onClick={() => setVisibleCount(prev => prev + ITEMS_PER_PAGE)}
              className="btn btn-secondary btn-lg"
              style={{
                borderRadius: 'var(--radius-full)',
                padding: '0.85rem 2.2rem'
              }}
            >
              Load More Products ({filteredProducts.length - visibleCount} remaining)
            </button>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
