import React, { useState } from 'react';
import { 
  Soup, 
  Wheat, 
  Cookie, 
  Flame, 
  Coffee, 
  Utensils, 
  Package, 
  HeartPulse, 
  ShoppingBag 
} from 'lucide-react';
import { categories } from '../data/categories';

const CATEGORY_ICONS = {
  'instant-noodles': Soup,
  'rice-pantry-staples': Wheat,
  'snacks-biscuits': Cookie,
  'sauces-seasonings': Flame,
  'drinks-beverages': Coffee,
  'cooking-ingredients': Utensils,
  'canned-packaged-food': Package,
  'household-essentials': HeartPulse,
};

const CATEGORY_COLORS = {
  'instant-noodles': { bg: '#FAF2F3', accent: '#7B111A' },
  'rice-pantry-staples': { bg: '#FDF5ED', accent: '#C77D2B' },
  'snacks-biscuits': { bg: '#FEF7EE', accent: '#D97706' },
  'sauces-seasonings': { bg: '#FAF2F3', accent: '#7B111A' },
  'drinks-beverages': { bg: '#EDF7F1', accent: '#1B6839' },
  'cooking-ingredients': { bg: '#F5F3FF', accent: '#7C3AED' },
  'canned-packaged-food': { bg: '#F0F9FF', accent: '#0284C7' },
  'household-essentials': { bg: '#ECFDF5', accent: '#059669' },
};

/**
 * ProductImage with guaranteed zero broken images.
 * If external/local image fails to load, cleanly renders a supermarket
 * branded product badge matching the product's authentic category colors.
 */
export default function ProductImage({ product, className = '', aspectRatio = '1/1', style = {} }) {
  const [hasError, setHasError] = useState(false);

  const categoryId = product?.category?.slug || product?.category_id || product?.category || 'instant-noodles';
  const categoryConfig = categories.find(c => c.id === categoryId);
  const IconComponent = CATEGORY_ICONS[categoryId] || ShoppingBag;
  const colorScheme = CATEGORY_COLORS[categoryId] || { bg: '#FAF7F2', accent: '#7B111A' };
  const imageSrc = product?.image_path || product?.image;
  const packageSize = product?.package_size || product?.packageSize;

  // If user provided a working image path and no error occurred yet
  if (imageSrc && !hasError) {
    return (
      <div 
        className={`product-image-container ${className}`}
        style={{
          aspectRatio,
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#FAF8F5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0.85rem',
          ...style
        }}
      >
        <img
          src={imageSrc}
          alt={product.name || 'Product packshot'}
          onError={() => setHasError(true)}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            mixBlendMode: 'multiply',
            transition: 'transform 0.3s ease'
          }}
        />
      </div>
    );
  }

  // Graceful Fallback Supermarket Showcase Badge
  return (
    <div 
      className={`product-image-container product-image-fallback ${className}`}
      style={{
        aspectRatio,
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#FAF8F5',
        borderBottom: '1px solid var(--color-border)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem',
        ...style
      }}
    >
      {/* Decorative concentric background circle */}
      <div 
        style={{
          position: 'absolute',
          width: '75%',
          height: '75%',
          borderRadius: '50%',
          backgroundColor: '#FFFFFF',
          opacity: 0.85,
          boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
        }}
      />
      
      {/* Category Icon Badge */}
      <div 
        style={{
          position: 'relative',
          zIndex: 2,
          width: '52px',
          height: '52px',
          borderRadius: '14px',
          backgroundColor: colorScheme.accent,
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 6px 14px ${colorScheme.accent}25`,
          marginBottom: '0.6rem'
        }}
      >
        <IconComponent size={26} strokeWidth={2} />
      </div>

      {/* Brand & Category Label */}
      <div 
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          maxWidth: '90%'
        }}
      >
        {product?.brand && (
          <span 
            style={{
              display: 'inline-block',
              fontSize: '0.68rem',
              fontWeight: 800,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: colorScheme.accent,
              backgroundColor: '#FFFFFF',
              padding: '0.18rem 0.5rem',
              borderRadius: '9999px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              marginBottom: '0.2rem'
            }}
          >
            {product.brand}
          </span>
        )}
        <div 
          style={{
            fontSize: '0.72rem',
            fontWeight: 600,
            color: '#707070',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {categoryConfig?.name || 'Grocery Item'}
        </div>
      </div>

      {/* Packaging Size Badge if available */}
      {packageSize && (
        <span 
          style={{
            position: 'absolute',
            bottom: '8px',
            right: '8px',
            fontSize: '0.65rem',
            fontWeight: 700,
            color: '#242424',
            backgroundColor: 'rgba(255, 255, 255, 0.94)',
            backdropFilter: 'blur(4px)',
            padding: '0.15rem 0.45rem',
            borderRadius: '4px',
            border: '1px solid #E8E4DC'
          }}
        >
          {packageSize}
        </span>
      )}
    </div>
  );
}
