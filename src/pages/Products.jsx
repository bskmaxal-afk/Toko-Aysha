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
  const initialSearch = searchParams.get('search') || '';
  const initialBrand = searchParams.get('brand') || 'all';
  const initialSort = searchParams.get('sort') || 'featured';

  const [category, setCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [brand, setBrand] = useState(initialBrand);
  const [sortBy, setSortBy] = useState(initialSort);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Sync state with URL params when URL changes
  useEffect(() => {
    const cat = searchParams.get('category') || 'all';
    const s = searchParams.get('search') || '';
    const b = searchParams.get('brand') || 'all';
    const st = searchParams.get('sort') || 'featured';

    setCategory(cat);
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
    setSearchQuery('');
    setBrand('all');
    setSortBy('featured');
    setVisibleCount(ITEMS_PER_PAGE);
    setSearchParams({}, { replace: true });
  };

  // Available unique brands derived from current category or whole catalog
  const availableBrands = useMemo(() => {
    const filteredByCategory = category === 'all' 
      ? products 
      : products.filter(p => p.category === category);
    const unique = [...new Set(filteredByCategory.map(p => p.brand))].sort();
    return unique;
  }, [category]);

  // Filter and Sort Products
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // 1. Category Filter
      const matchCategory = category === 'all' || item.category === category;

      // 2. Brand Filter
      const matchBrand = brand === 'all' || item.brand === brand;

      // 3. Search Filter (name, brand, description, origin)
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q || 
        item.name.toLowerCase().includes(q) ||
        item.brand.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        (item.packageSize && item.packageSize.toLowerCase().includes(q));

      return matchCategory && matchBrand && matchSearch;
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
  }, [category, brand, searchQuery, sortBy]);

  // Paginated/Sliced subset
  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const currentCategoryObj = categories.find(c => c.id === category);

  const hasActiveFilters = category !== 'all' || brand !== 'all' || Boolean(searchQuery.trim());

  return (
    <div className="products-page section" style={{ backgroundColor: 'var(--color-bg)', minHeight: '80vh' }}>
      <div className="container">
        {/* Breadcrumb Navigation */}
        <Breadcrumb 
          items={[
            { label: 'Products', path: '/products' },
            ...(currentCategoryObj ? [{ label: currentCategoryObj.name }] : [])
          ]}
        />

        {/* Page Title & Search Header */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 'var(--space-6)',
            marginBottom: 'var(--space-6)'
          }}
        >
          <div>
            <h1 
              style={{
                fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                fontWeight: 800,
                color: 'var(--color-text-main)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                marginBottom: '0.4rem'
              }}
            >
              {currentCategoryObj ? currentCategoryObj.name : 'Our Products'}
            </h1>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-secondary)', maxWidth: '580px' }}>
              {currentCategoryObj 
                ? currentCategoryObj.description 
                : 'Browse our complete catalog of authentic Indonesian groceries, snacks, noodles, sambals, and pantry essentials.'}
            </p>
          </div>

          {/* Search bar inside products page */}
          <div style={{ width: '100%', maxWidth: '380px' }}>
            <SearchBar
              initialValue={searchQuery}
              onSearch={handleSearch}
              placeholder="Filter by name, brand, or flavor..."
              variant="catalog"
            />
          </div>
        </div>

        {/* Product Filters & Sorters */}
        <ProductFilters
          selectedCategory={category}
          onSelectCategory={handleSelectCategory}
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
