import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  X, 
  Check, 
  XCircle,
  ExternalLink,
  Tag
} from 'lucide-react';
import ProductImage from './ProductImage';
import { getCountryFlag } from '../utils/countryFlags';
import { normalizeProduct } from '../services/productService';

export default function ProductDetailModal({ product: rawProduct, onClose }) {
  // Lock body scroll while modal is open
  useEffect(() => {
    if (!rawProduct) return;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [rawProduct, onClose]);

  if (!rawProduct) return null;

  const product = normalizeProduct(rawProduct);
  const productId = product.id || product.slug;
  const brand = product.brand;
  const categoryName = product.categoryName;
  const variant = product.variant;
  const packageSize = product.packageSize;
  const origin = product.origin;
  const flag = product.countryFlag || getCountryFlag(origin);
  const isAvailable = product.isAvailable;
  const description = product.description;

  return (
    <div 
      className="modal-backdrop"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(34, 24, 25, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-4, 1rem)',
        animation: 'fadeIn 0.2s ease'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="modal-content card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-product-title"
        style={{
          width: '100%',
          maxWidth: '780px',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-xl, 20px)',
          position: 'relative',
          padding: 0,
          border: '1px solid var(--color-border, #E8E0D6)',
          boxShadow: 'var(--shadow-lg, 0 10px 28px rgba(36, 36, 36, 0.12))'
        }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            zIndex: 10,
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            border: '1px solid var(--color-border, #E8E0D6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            color: 'var(--color-text-main, #221819)',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-bg, #FAF7F2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.92)';
          }}
        >
          <X size={18} />
        </button>

        {/* Modal Layout Grid */}
        <div 
          className="modal-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            minHeight: '400px'
          }}
        >
          {/* Left Column: Product Image Area */}
          <div 
            style={{
              backgroundColor: '#FAF8F5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'var(--space-6, 1.5rem)',
              borderRight: '1px solid var(--color-border, #E8E0D6)',
              position: 'relative'
            }}
          >
            <div style={{ width: '100%', maxWidth: '320px' }}>
              <ProductImage 
                product={product} 
                aspectRatio="1/1"
                className="modal-product-image"
              />
            </div>
          </div>

          {/* Right Column: Product Information */}
          <div 
            style={{
              padding: 'var(--space-8, 2rem) var(--space-6, 1.5rem)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 'var(--space-5, 1.25rem)'
            }}
          >
            <div>
              {/* Badges Bar: Availability, Brand, Category, Origin */}
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.45rem', 
                  flexWrap: 'wrap', 
                  marginBottom: 'var(--space-3, 0.75rem)' 
                }}
              >
                {/* Availability Badge */}
                {isAvailable ? (
                  <span 
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      backgroundColor: '#EDF7F1',
                      color: '#1B6839',
                      border: '1px solid #C6E7D2',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '0.22rem 0.65rem',
                      borderRadius: '9999px'
                    }}
                  >
                    <Check size={12} strokeWidth={3} />
                    Available
                  </span>
                ) : (
                  <span 
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      backgroundColor: '#F1F5F9',
                      color: '#64748B',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      padding: '0.22rem 0.65rem',
                      borderRadius: '9999px'
                    }}
                  >
                    <XCircle size={12} strokeWidth={2.5} />
                    Currently Unavailable
                  </span>
                )}

                {/* Brand Badge */}
                {brand && (
                  <span 
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      backgroundColor: 'var(--color-bg, #FAF7F2)',
                      color: 'var(--color-primary, #7B111A)',
                      border: '1px solid var(--color-border, #E8E0D6)',
                      padding: '0.22rem 0.6rem',
                      borderRadius: '9999px'
                    }}
                  >
                    {brand}
                  </span>
                )}

                {/* Category Badge */}
                {categoryName && (
                  <span 
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      backgroundColor: 'var(--color-bg, #FAF7F2)',
                      color: 'var(--color-text-secondary, #685A5B)',
                      border: '1px solid var(--color-border, #E8E0D6)',
                      padding: '0.22rem 0.6rem',
                      borderRadius: '9999px'
                    }}
                  >
                    <Tag size={11} />
                    {categoryName}
                  </span>
                )}

                {/* Country of Origin Badge */}
                {origin && (
                  <span 
                    title={`Product of ${origin}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      backgroundColor: '#FFFFFF',
                      color: 'var(--color-text-secondary, #685A5B)',
                      border: '1px solid var(--color-border, #E8E0D6)',
                      padding: '0.22rem 0.6rem',
                      borderRadius: '9999px'
                    }}
                  >
                    <span>{flag}</span>
                    <span>{origin}</span>
                  </span>
                )}
              </div>

              {/* Product Full Name */}
              <h2 
                id="modal-product-title"
                style={{
                  fontSize: '1.4rem',
                  fontWeight: 800,
                  color: 'var(--color-text-main, #221819)',
                  lineHeight: 1.25,
                  marginBottom: '0.65rem'
                }}
              >
                {product.name}
              </h2>

              {/* Product Specifications: Variant & Package Size */}
              {(variant || packageSize) && (
                <div 
                  style={{ 
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.75rem',
                    fontSize: 'var(--text-sm, 0.875rem)', 
                    color: 'var(--color-text-secondary, #685A5B)', 
                    marginBottom: 'var(--space-4, 1rem)',
                    padding: '0.55rem 0.75rem',
                    backgroundColor: 'var(--color-bg, #FAF7F2)',
                    borderRadius: 'var(--radius-md, 10px)',
                    border: '1px solid var(--color-border, #E8E0D6)'
                  }}
                >
                  {variant && (
                    <div>
                      <span style={{ fontWeight: 600 }}>Variant / Flavor: </span>
                      <strong style={{ color: 'var(--color-text-main, #221819)' }}>{variant}</strong>
                    </div>
                  )}

                  {packageSize && (
                    <div>
                      <span style={{ fontWeight: 600 }}>Package Size / Weight: </span>
                      <strong style={{ color: 'var(--color-text-main, #221819)' }}>{packageSize}</strong>
                    </div>
                  )}
                </div>
              )}

              {/* Description */}
              {description && (
                <div style={{ marginBottom: 'var(--space-4, 1rem)' }}>
                  <h4 
                    style={{ 
                      fontSize: '0.8rem', 
                      fontWeight: 800, 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.04em',
                      color: 'var(--color-text-secondary, #685A5B)', 
                      marginBottom: '0.35rem' 
                    }}
                  >
                    Product Description
                  </h4>
                  <p 
                    style={{ 
                      fontSize: 'var(--text-sm, 0.875rem)', 
                      color: 'var(--color-text-main, #221819)', 
                      lineHeight: 1.6 
                    }}
                  >
                    {description}
                  </p>
                </div>
              )}
            </div>

            {/* Actions Bar */}
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 'var(--space-3, 0.75rem)',
                paddingTop: 'var(--space-4, 1rem)',
                borderTop: '1px solid var(--color-border, #E8E0D6)'
              }}
            >
              <Link
                to={`/products/${productId}`}
                onClick={onClose}
                className="btn btn-primary btn-sm"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.82rem',
                  fontWeight: 700
                }}
              >
                <span>View Full Page</span>
                <ExternalLink size={14} />
              </Link>

              <button
                type="button"
                onClick={onClose}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '0.82rem' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
