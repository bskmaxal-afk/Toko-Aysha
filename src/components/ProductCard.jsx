import React from 'react';
import { ArrowRight, Check, XCircle } from 'lucide-react';
import ProductImage from './ProductImage';
import { getCountryFlag } from '../utils/countryFlags';
import { normalizeProduct } from '../services/productService';

// Re-export getCountryFlag for backwards compatibility
export { getCountryFlag };

export default function ProductCard({ product: rawProduct, onViewDetails }) {
  if (!rawProduct) return null;

  // Normalize product to handle both Supabase schema and local dataset seamlessly
  const product = normalizeProduct(rawProduct);

  const productId = product.id || product.slug;
  const brand = product.brand;
  const categoryName = product.categoryName;
  const variant = product.variant;
  const packageSize = product.packageSize;
  const origin = product.origin;
  const flag = product.countryFlag || getCountryFlag(origin);
  const isAvailable = product.isAvailable;

  const handleActionClick = (e) => {
    if (onViewDetails) {
      e.preventDefault();
      onViewDetails(product);
    }
  };

  return (
    <article 
      className="product-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-lg, 14px)',
        border: '1px solid var(--color-border, #E8E0D6)',
        overflow: 'hidden',
        position: 'relative',
        height: '100%',
        boxShadow: 'var(--shadow-card, 0 2px 6px rgba(36, 36, 36, 0.04))',
        transition: 'transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-card-hover, 0 10px 24px rgba(36, 36, 36, 0.08))';
        e.currentTarget.style.borderColor = 'var(--color-border-hover, #D4C7B8)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow-card, 0 2px 6px rgba(36, 36, 36, 0.04))';
        e.currentTarget.style.borderColor = 'var(--color-border, #E8E0D6)';
      }}
    >
      {/* 1. Product Image Section */}
      <div 
        style={{
          position: 'relative',
          cursor: 'pointer',
          backgroundColor: '#FAF8F5',
          borderBottom: '1px solid var(--color-border, #E8E0D6)'
        }}
        onClick={handleActionClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleActionClick(e);
          }
        }}
        aria-label={`View details for ${product.name}`}
      >
        <ProductImage 
          product={product} 
          aspectRatio="1/1"
        />

        {/* Top-Left: Availability Status Badge */}
        <div 
          style={{ 
            position: 'absolute', 
            top: '8px', 
            left: '8px', 
            zIndex: 3 
          }}
        >
          {isAvailable ? (
            <span 
              className="badge-availability available"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.28rem',
                backgroundColor: '#EDF7F1',
                color: '#1B6839',
                border: '1px solid #C6E7D2',
                fontSize: '0.68rem',
                fontWeight: 700,
                padding: '0.2rem 0.55rem',
                borderRadius: '9999px',
                letterSpacing: '0.01em',
                lineHeight: 1.1,
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
              }}
            >
              <Check size={11} strokeWidth={3} />
              <span>Available</span>
            </span>
          ) : (
            <span 
              className="badge-availability unavailable"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.28rem',
                backgroundColor: '#F1F5F9',
                color: '#64748B',
                border: '1px solid #CBD5E1',
                fontSize: '0.68rem',
                fontWeight: 600,
                padding: '0.2rem 0.55rem',
                borderRadius: '9999px',
                letterSpacing: '0.01em',
                lineHeight: 1.1,
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
              }}
            >
              <XCircle size={11} strokeWidth={2.5} />
              <span>Currently Unavailable</span>
            </span>
          )}
        </div>

        {/* Top-Right: Country of Origin Badge */}
        {origin && (
          <div 
            style={{ 
              position: 'absolute', 
              top: '8px', 
              right: '8px', 
              zIndex: 3 
            }}
          >
            <span
              title={`Product of ${origin}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                backgroundColor: 'rgba(255, 255, 255, 0.94)',
                backdropFilter: 'blur(4px)',
                color: 'var(--color-text-secondary, #685A5B)',
                border: '1px solid var(--color-border, #E8E0D6)',
                fontSize: '0.68rem',
                fontWeight: 600,
                padding: '0.18rem 0.5rem',
                borderRadius: '9999px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                lineHeight: 1.1
              }}
            >
              <span>{flag}</span>
              <span>{origin}</span>
            </span>
          </div>
        )}
      </div>

      {/* 2. Product Information Content */}
      <div 
        style={{
          padding: '0.9rem 1rem 1rem',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          justifyContent: 'space-between',
          backgroundColor: '#FFFFFF'
        }}
      >
        <div>
          {/* Eyebrow: Brand & Category */}
          {(brand || categoryName) && (
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.7rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '0.35rem',
                color: 'var(--color-primary, #7B111A)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {brand && <span>{brand}</span>}
              {brand && categoryName && (
                <span style={{ color: 'var(--color-border-hover, #D4C7B8)' }}>•</span>
              )}
              {categoryName && (
                <span style={{ color: 'var(--color-text-secondary, #685A5B)', fontWeight: 600 }}>
                  {categoryName}
                </span>
              )}
            </div>
          )}

          {/* Product Name (Main Hero Text) */}
          <h3 
            onClick={handleActionClick}
            title={product.name}
            style={{
              fontSize: '0.92rem',
              fontWeight: 700,
              color: 'var(--color-text-main, #221819)',
              lineHeight: 1.35,
              marginBottom: '0.4rem',
              cursor: 'pointer',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '2.5rem'
            }}
          >
            {product.name}
          </h3>

          {/* Optional Variant / Flavor & Package Size / Weight */}
          {(variant || packageSize) && (
            <div 
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.35rem',
                alignItems: 'center',
                marginTop: '0.2rem',
                marginBottom: '0.35rem'
              }}
            >
              {variant && (
                <span 
                  title={`Variant: ${variant}`}
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    color: 'var(--color-text-secondary, #685A5B)',
                    backgroundColor: 'var(--color-bg, #FAF7F2)',
                    border: '1px solid var(--color-border, #E8E0D6)',
                    padding: '0.12rem 0.45rem',
                    borderRadius: '4px',
                    lineHeight: 1.3
                  }}
                >
                  {variant}
                </span>
              )}

              {packageSize && (
                <span 
                  title={`Size: ${packageSize}`}
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    color: 'var(--color-text-secondary, #685A5B)',
                    backgroundColor: 'var(--color-bg, #FAF7F2)',
                    border: '1px solid var(--color-border, #E8E0D6)',
                    padding: '0.12rem 0.45rem',
                    borderRadius: '4px',
                    lineHeight: 1.3
                  }}
                >
                  {packageSize}
                </span>
              )}
            </div>
          )}
        </div>

        {/* 3. Action Section: Clear "View Details" Button */}
        <div 
          style={{
            marginTop: '0.75rem',
            paddingTop: '0.65rem',
            borderTop: '1px solid var(--color-border, #E8E0D6)'
          }}
        >
          <button
            type="button"
            onClick={handleActionClick}
            className="product-card-btn"
            aria-label={`View details for ${product.name}`}
            style={{
              width: '100%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              padding: '0.48rem 0.85rem',
              fontSize: '0.78rem',
              fontWeight: 700,
              color: 'var(--color-primary, #7B111A)',
              backgroundColor: 'var(--color-bg, #FAF7F2)',
              border: '1px solid var(--color-border, #E8E0D6)',
              borderRadius: 'var(--radius-md, 10px)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-primary, #7B111A)';
              e.currentTarget.style.borderColor = 'var(--color-primary, #7B111A)';
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-bg, #FAF7F2)';
              e.currentTarget.style.borderColor = 'var(--color-border, #E8E0D6)';
              e.currentTarget.style.color = 'var(--color-primary, #7B111A)';
            }}
          >
            <span>View Details</span>
            <ArrowRight size={13} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </article>
  );
}
