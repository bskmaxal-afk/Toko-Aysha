import React from 'react';
import { RotateCcw, Globe2, ArrowUpDown } from 'lucide-react';
import { categories } from '../data/categories';

export const ORIGIN_OPTIONS = [
  { id: 'all', label: 'All Asian Products', flag: '🌏' },
  { id: 'Indonesia', label: 'Indonesia', flag: '🇮🇩' },
  { id: 'imported', label: 'Asian Imports (Non-Indonesia)', flag: '🥢' },
  { id: 'South Korea', label: 'South Korea', flag: '🇰🇷' },
  { id: 'Thailand', label: 'Thailand', flag: '🇹🇭' },
  { id: 'Sri Lanka', label: 'Sri Lanka', flag: '🇱🇰' },
  { id: 'China', label: 'China', flag: '🇨🇳' }
];

export default function ProductFilters({
  selectedCategory,
  onSelectCategory,
  selectedOrigin = 'all',
  onSelectOrigin,
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
      {/* 1. Origin / Regional Filter Pills */}
      <div 
        style={{ 
          marginBottom: 'var(--space-4)', 
          paddingBottom: 'var(--space-4)', 
          borderBottom: '1px solid var(--color-border)' 
        }}
      >
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            marginBottom: '0.65rem' 
          }}
        >
          <div 
            style={{
              fontSize: 'var(--text-xs)',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--color-text-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <Globe2 size={14} style={{ color: 'var(--color-primary)' }} />
            <span>Regional Origin</span>
          </div>

          {selectedOrigin && selectedOrigin !== 'all' && (
            <span 
              style={{ 
                fontSize: '0.72rem', 
                color: 'var(--color-primary)', 
                fontWeight: 700 
              }}
            >
              Filtered by: {selectedOrigin === 'imported' ? 'Asian Imports (Non-Indonesia)' : selectedOrigin}
            </span>
          )}
        </div>

        <div 
          className="origin-pills-row"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            overflowX: 'auto',
            paddingBottom: '0.3rem',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {ORIGIN_OPTIONS.map((opt) => {
            const isSelected = selectedOrigin.toLowerCase() === opt.id.toLowerCase();
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => onSelectOrigin(opt.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.4rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 700,
                  border: isSelected 
                    ? '1.5px solid var(--color-accent)' 
                    : '1.5px solid var(--color-border)',
                  backgroundColor: isSelected 
                    ? 'var(--color-accent)' 
                    : 'var(--color-surface)',
                  color: isSelected 
                    ? '#FFFFFF' 
                    : 'var(--color-text-main)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <span>{opt.flag}</span>
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Category Pills Slider / Wrap */}
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
          Product Categories
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
          {/* "All Categories" pill */}
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
            All Categories
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

      {/* 3. Secondary Filter & Sort Controls Row */}
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
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Right: Sort & Count */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
          {/* Product Count Display */}
          <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
            Showing <strong>{totalCount}</strong> Asian grocery items
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

      {/* Active Filter Chips — matches supplier catalog UI */}
      {hasActiveFilters && (
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            flexWrap: 'wrap',
            marginTop: 'var(--space-3)',
            paddingTop: 'var(--space-3)',
            borderTop: '1px dashed var(--color-border)'
          }}
        >
          <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
            Showing:
          </span>

          {selectedBrand && selectedBrand !== 'all' && (
            <span 
              onClick={() => onSelectBrand('all')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                backgroundColor: '#EFF6FF',
                color: '#1D4ED8',
                border: '1px solid #BFDBFE',
                borderRadius: 'var(--radius-md)',
                padding: '0.2rem 0.55rem',
                fontSize: '0.72rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
              title="Remove brand filter"
            >
              <span>{selectedBrand.toUpperCase()}</span>
              <span>✕</span>
            </span>
          )}

          {selectedOrigin && selectedOrigin !== 'all' && (
            <span 
              onClick={() => onSelectOrigin('all')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                backgroundColor: '#F0FDF4',
                color: '#15803D',
                border: '1px solid #BBF7D0',
                borderRadius: 'var(--radius-md)',
                padding: '0.2rem 0.55rem',
                fontSize: '0.72rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
              title="Remove country filter"
            >
              <span>{selectedOrigin}</span>
              <span>✕</span>
            </span>
          )}

          {selectedCategory && selectedCategory !== 'all' && (
            <span 
              onClick={() => onSelectCategory('all')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                backgroundColor: '#FAF5FF',
                color: '#7E22CE',
                border: '1px solid #E9D5FF',
                borderRadius: 'var(--radius-md)',
                padding: '0.2rem 0.55rem',
                fontSize: '0.72rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
              title="Remove category filter"
            >
              <span>{categories.find(c => c.id === selectedCategory)?.name || selectedCategory}</span>
              <span>✕</span>
            </span>
          )}

          <button
            type="button"
            onClick={onResetFilters}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-text-secondary)',
              fontSize: '0.72rem',
              fontWeight: 600,
              cursor: 'pointer',
              textDecoration: 'underline',
              padding: '0.2rem 0.4rem'
            }}
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
