import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  X, 
  Check, 
  MapPin, 
  AlertCircle, 
  ArrowRight, 
  ExternalLink,
  ShieldCheck,
  Tag
} from 'lucide-react';
import ProductImage from './ProductImage';
import { categories } from '../data/categories';
import { formatPrice, hasLivePrice } from '../utils/formatPrice';

export default function ProductDetailModal({ product, onClose }) {
  // Lock body scroll while modal is open
  useEffect(() => {
    if (!product) return;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  const category = categories.find(c => c.id === product.category);
  const showLivePrice = hasLivePrice(product.price);
  const priceDisplay = formatPrice(product.price);

  return (
    <div 
      className="modal-backdrop"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(36, 36, 36, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-4)',
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
          maxWidth: '820px',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          position: 'relative',
          padding: 0,
          boxShadow: 'var(--shadow-lg)'
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
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            color: 'var(--color-text-main)'
          }}
        >
          <X size={20} />
        </button>

        {/* Modal Layout Grid */}
        <div 
          className="modal-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            minHeight: '440px'
          }}
        >
          {/* Left Column: Image Area */}
          <div 
            style={{
              backgroundColor: category?.bgTint || 'var(--color-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'var(--space-6)',
              borderRight: '1px solid var(--color-border)',
              position: 'relative'
            }}
          >
            <ProductImage 
              product={product} 
              aspectRatio="1/1"
              className="modal-product-image"
              style={{ width: '100%', maxWidth: '320px' }}
            />
          </div>

          {/* Right Column: Full Product Information */}
          <div 
            style={{
              padding: 'var(--space-8) var(--space-6)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 'var(--space-5)'
            }}
          >
            <div>
              {/* Badges Bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap', marginBottom: 'var(--space-3)' }}>
                <span className="badge badge-brand" style={{ fontSize: '0.75rem', fontWeight: 800 }}>
                  {product.brand}
                </span>

                {category && (
                  <span 
                    className="badge" 
                    style={{ 
                      backgroundColor: category.bgTint, 
                      color: category.color,
                      fontSize: '0.72rem',
                      fontWeight: 700 
                    }}
                  >
                    <Tag size={11} />
                    {category.name}
                  </span>
                )}

                <span className="badge badge-stock" style={{ fontSize: '0.72rem', fontWeight: 700 }}>
                  <Check size={12} strokeWidth={3} />
                  Available In Store
                </span>
              </div>

              {/* Title */}
              <h2 
                id="modal-product-title"
                style={{
                  fontSize: '1.45rem',
                  fontWeight: 800,
                  color: 'var(--color-text-main)',
                  lineHeight: 1.25,
                  marginBottom: '0.35rem'
                }}
              >
                {product.name}
              </h2>

              {/* Packaging spec */}
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
                Package Size: <strong style={{ color: 'var(--color-text-main)' }}>{product.packageSize}</strong>
                {product.origin && ` • Product of ${product.origin}`}
              </div>

              {/* Price Banner */}
              <div 
                style={{
                  backgroundColor: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.75rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 'var(--space-4)'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-secondary)' }}>
                    Retail Price
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                    {priceDisplay}
                  </div>
                </div>

                <div 
                  style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-accent)',
                    fontWeight: 600,
                    textAlign: 'right'
                  }}
                >
                  Visit store for current inventory
                </div>
              </div>

              {/* Description */}
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-text-secondary)', marginBottom: '0.35rem' }}>
                  About This Product
                </h4>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-main)', lineHeight: 1.55 }}>
                  {product.description}
                </p>
              </div>

              {/* Ingredients if known */}
              {product.ingredients && (
                <div style={{ marginBottom: 'var(--space-3)' }}>
                  <h4 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>
                    Ingredients
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: 1.45 }}>
                    {product.ingredients}
                  </p>
                </div>
              )}

              {/* Allergens Notice */}
              {product.allergens && (
                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.5rem',
                    backgroundColor: '#FEF3C7',
                    border: '1px solid #FDE68A',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: 'var(--space-2)'
                  }}
                >
                  <AlertCircle size={16} style={{ color: '#D97706', flexShrink: 0, marginTop: '2px' }} />
                  <div style={{ fontSize: '0.75rem', color: '#92400E', lineHeight: 1.4 }}>
                    <strong>Allergen Notice:</strong> {product.allergens}
                  </div>
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
                gap: 'var(--space-3)',
                paddingTop: 'var(--space-4)',
                borderTop: '1px solid var(--color-border)'
              }}
            >
              <Link
                to={`/products/${product.id}`}
                onClick={onClose}
                className="btn btn-secondary btn-sm"
              >
                <span>Full Product Page</span>
                <ExternalLink size={14} />
              </Link>

              <Link
                to="/visit-us"
                onClick={onClose}
                className="btn btn-primary btn-sm"
              >
                <MapPin size={15} />
                <span>Visit Store to Purchase</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Inline CSS for Modal */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @media (max-width: 768px) {
          .modal-grid {
            grid-template-columns: 1fr !important;
          }
          .modal-content {
            max-height: 94vh !important;
          }
        }
      `}</style>
    </div>
  );
}
