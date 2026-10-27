import React from 'react';
import { RotateCcw, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { categories } from '../data/categories';

export default function ProductFilters({
  selectedCategory,
  onSelectCategory,
  selectedBrand,
  onSelectBrand,
  sortBy,
  onSelectSort,
  availableBrands = [],
  totalCount = 0,
  onResetFilters,
  hasActiveFilters = false
}) {
  return (
    <div 
      className="product-filters-wrapper"
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        padding: 'var(--space-5)',
        marginBottom: 'var(--space-6)',
        boxShadow: 'var(--shadow-sm)'
      }}
    >
      {/* Category Pills Slider / Wrap */}
      <div style={{ marginBottom: 'var(--space-4)' }}>
        <div 
          style={{
            fontSize: 'var(--text-xs)',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: 'var(--color-text-secondary)',
            marginBottom: '0.65rem'
          }}
        >
          Categories
        </div>

        <div 
          className="category-pills-row"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            overflowX: 'auto',
            paddingBottom: '0.4rem',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {/* "All Products" pill */}
          <button
            type="button"
            onClick={() => onSelectCategory('all')}
            style={{
              padding: '0.45rem 0.95rem',
              borderRadius: 'var(--radius-full)',
              fontSize: 'var(--text-xs)',
              fontWeight: 700,
              border: selectedCategory === 'all' 
                ? '1.5px solid var(--color-primary)' 
                : '1.5px solid var(--color-border)',
              backgroundColor: selectedCategory === 'all' 
                ? 'var(--color-primary)' 
                : 'var(--color-surface)',
              color: selectedCategory === 'all' 
                ? 'var(--color-text-inverse)' 
                : 'var(--color-text-main)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all var(--transition-fast)'
            }}
          >
            All Products
          </button>

          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                style={{
                  padding: '0.45rem 0.95rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 700,
                  border: isSelected 
                    ? `1.5px solid ${cat.color}` 
                    : '1.5px solid var(--color-border)',
                  backgroundColor: isSelected 
                    ? cat.color 
                    : 'var(--color-surface)',
                  color: isSelected 
                    ? '#FFFFFF' 
                    : 'var(--color-text-main)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all var(--transition-fast)'
                }}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Secondary Filter & Sort Controls Row */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'var(--space-3)',
          paddingTop: 'var(--space-4)',
          borderTop: '1px solid var(--color-border)'
        }}
      >
        {/* Left: Brand filter & Reset */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
          {/* Brand Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-text-secondary)' }}>
              Brand:
            </span>
            <select
              value={selectedBrand}
              onChange={(e) => onSelectBrand(e.target.value)}
              aria-label="Filter by brand"
              style={{
                padding: '0.4rem 0.75rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-surface)',
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                color: 'var(--color-text-main)',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="all">All Brands</option>
              {availableBrands.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Reset Filters Button */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="btn btn-outline btn-sm"
              style={{
                padding: '0.35rem 0.65rem',
                fontSize: '0.75rem',
                borderRadius: 'var(--radius-full)'
              }}
            >
              <RotateCcw size={13} />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Right: Sort & Count */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
          {/* Product Count Display */}
          <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
            Showing <strong>{totalCount}</strong> products
          </span>

          {/* Sort By Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <ArrowUpDown size={14} style={{ color: 'var(--color-text-secondary)' }} />
            <select
              value={sortBy}
              onChange={(e) => onSelectSort(e.target.value)}
              aria-label="Sort products"
              style={{
                padding: '0.4rem 0.75rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-surface)',
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                color: 'var(--color-text-main)',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="featured">Featured Picks</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
              <option value="brand">Brand: A to Z</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
