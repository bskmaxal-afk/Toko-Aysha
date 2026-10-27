import React from 'react';
import ProductCard from './ProductCard';
import { PackageSearch, RotateCcw } from 'lucide-react';

export default function ProductGrid({ 
  products = [], 
  onViewDetails, 
  onResetFilters,
  loading = false 
}) {
  if (loading) {
    return (
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: 'var(--space-5)'
        }}
      >
        {[...Array(8)].map((_, i) => (
          <div 
            key={i} 
            className="card"
            style={{
              aspectRatio: '1/1.3',
              backgroundColor: '#FFFFFF',
              opacity: 0.6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
              Loading products...
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div 
        className="card"
        style={{
          padding: 'var(--space-12) var(--space-6)',
          textAlign: 'center',
          backgroundColor: '#FFFFFF',
          maxWidth: '560px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--space-4)'
        }}
      >
        <div 
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-bg)',
            color: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <PackageSearch size={32} />
        </div>

        <div>
          <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, marginBottom: '0.5rem' }}>
            No Products Found
          </h3>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', maxWidth: '420px' }}>
            We couldn't find any products matching your current search or filter combination. Try adjusting your keywords or clearing selected filters.
          </p>
        </div>

        {onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="btn btn-primary"
            style={{ marginTop: 'var(--space-2)' }}
          >
            <RotateCcw size={16} />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div 
      className="product-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: 'var(--space-5)'
      }}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onViewDetails={onViewDetails}
        />
      ))}

      {/* Responsive Inline CSS for Product Grid: 4 columns on large screens, 2 columns on mobile */}
      <style>{`
        @media (max-width: 600px) {
          .product-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: var(--space-3) !important;
          }
        }
      `}</style>
    </div>
  );
}
