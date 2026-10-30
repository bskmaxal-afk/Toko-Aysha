import React from 'react';
import { Eye, Check } from 'lucide-react';
import ProductImage from './ProductImage';
import { formatPrice, hasLivePrice } from '../utils/formatPrice';

export function getCountryFlag(origin) {
  if (!origin) return '🌏';
  const lower = origin.toLowerCase();
  if (lower.includes('indonesia')) return '🇮🇩';
  if (lower.includes('korea')) return '🇰🇷';
  if (lower.includes('thai')) return '🇹🇭';
  if (lower.includes('china')) return '🇨🇳';
  if (lower.includes('sri lanka')) return '🇱🇰';
  if (lower.includes('japan')) return '🇯🇵';
  if (lower.includes('vietnam')) return '🇻🇳';
  return '🌏';
}

export function getProductSku(product) {
  if (product.sku) return product.sku;
  let hash = 0;
  const str = product.id || product.name || 'sku';
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) % 9000;
  }
  return String(1000 + Math.abs(hash));
}

export default function ProductCard({ product, onViewDetails }) {
  if (!product) return null;

  const showLivePrice = hasLivePrice(product.price);
  const priceDisplay = formatPrice(product.price);
  const flag = getCountryFlag(product.origin);
  const isImported = product.origin && !product.origin.toLowerCase().includes('indonesia');

  return (
    <article 
      className="product-card card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        overflow: 'hidden',
        position: 'relative',
        height: '100%',
        transition: 'all var(--transition-normal)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)';
        e.currentTarget.style.borderColor = 'var(--color-border-hover)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow-card)';
        e.currentTarget.style.borderColor = 'var(--color-border)';
      }}
    >
      {/* Product Image Area */}
      <div 
        style={{
          position: 'relative',
          cursor: 'pointer'
        }}
        onClick={() => onViewDetails(product)}
      >
        <ProductImage 
          product={product} 
          aspectRatio="1/1"
        />

        {/* Brand Badge */}
        <span 
          className="badge badge-brand"
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.94)',
            backdropFilter: 'blur(4px)',
            color: 'var(--color-text-main)',
            fontSize: '0.68rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            padding: '0.2rem 0.55rem',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--color-border)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}
        >
          {product.brand}
        </span>

        {/* Origin / Flag Badge or Favorite Badge */}
        <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end' }}>
          {product.featured && (
            <span 
              style={{
                backgroundColor: 'var(--color-primary)',
                color: '#FFFFFF',
                fontSize: '0.65rem',
                fontWeight: 800,
                padding: '0.2rem 0.5rem',
                borderRadius: 'var(--radius-full)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase'
              }}
            >
              Favorite
            </span>
          )}

          {product.origin && (
            <span
              title={`Origin: ${product.origin}`}
              style={{
                backgroundColor: isImported ? 'rgba(40, 82, 60, 0.92)' : 'rgba(255, 255, 255, 0.92)',
                color: isImported ? '#FFFFFF' : 'var(--color-text-secondary)',
                border: isImported ? 'none' : '1px solid var(--color-border)',
                backdropFilter: 'blur(4px)',
                fontSize: '0.68rem',
                fontWeight: 700,
                padding: '0.18rem 0.45rem',
                borderRadius: 'var(--radius-full)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                boxShadow: '0 2px 4px rgba(0,0,0,0.06)'
              }}
            >
              <span>{flag}</span>
              <span>{product.origin}</span>
            </span>
          )}
        </div>
      </div>

      {/* Product Info Content */}
      <div 
        style={{
          padding: 'var(--space-4)',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          justifyContent: 'space-between',
          backgroundColor: '#FFFFFF'
        }}
      >
        <div>
          {/* Top Row: In Stock Green Pill Badge & Package size */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.45rem'
            }}
          >
            <span 
              style={{
                backgroundColor: product.inStock !== false ? '#10B981' : '#94A3B8',
                color: '#FFFFFF',
                fontSize: '0.68rem',
                fontWeight: 700,
                padding: '0.2rem 0.65rem',
                borderRadius: '9999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                letterSpacing: '0.02em',
                lineHeight: 1
              }}
            >
              <Check size={11} strokeWidth={3} />
              In Stock
            </span>

            {product.packageSize && (
              <span 
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  color: 'var(--color-text-secondary)'
                }}
              >
                {product.packageSize}
              </span>
            )}
          </div>

          {/* Price & SKU line — exactly matching the supplier catalog example */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              marginBottom: '0.35rem'
            }}
          >
            <span 
              style={{
                fontSize: '1.25rem',
                fontWeight: 800,
                color: showLivePrice ? 'var(--color-primary)' : '#475569',
                letterSpacing: '-0.02em',
                lineHeight: 1.2
              }}
            >
              {showLivePrice ? priceDisplay : 'N/A'}
            </span>
            <span 
              style={{
                fontSize: '0.72rem',
                fontWeight: 600,
                color: '#94A3B8',
                fontFamily: 'monospace'
              }}
            >
              #{getProductSku(product)}
            </span>
          </div>

          {/* Product Name */}
          <h3 
            onClick={() => onViewDetails(product)}
            title={product.name}
            style={{
              fontSize: '0.92rem',
              fontWeight: 700,
              color: 'var(--color-text-main)',
              lineHeight: 1.35,
              marginBottom: 'var(--space-2)',
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
        </div>

        {/* Bottom Price/Info & Action Row */}
        <div 
          style={{
            marginTop: 'var(--space-3)',
            paddingTop: 'var(--space-3)',
            borderTop: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-2)'
          }}
        >
          <span 
            style={{
              fontSize: '0.72rem',
              color: 'var(--color-text-secondary)',
              fontWeight: 600
            }}
          >
            {product.brand}
          </span>

          {/* View Details Button */}
          <button
            type="button"
            onClick={() => onViewDetails(product)}
            className="btn btn-outline btn-sm"
            aria-label={`View details for ${product.name}`}
            style={{
              padding: '0.35rem 0.75rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              gap: '0.3rem',
              borderRadius: 'var(--radius-full)',
              flexShrink: 0
            }}
          >
            <Eye size={13} />
            <span>Details</span>
          </button>
        </div>
      </div>
    </article>
  );
}
