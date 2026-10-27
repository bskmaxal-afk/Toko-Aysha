import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { products } from '../data/products';

export default function CategoryCard({ category }) {
  const [imgError, setImgError] = useState(false);

  // Calculate actual item count in dataset
  const count = products.filter(p => p.category === category.id).length;

  return (
    <Link
      to={`/products?category=${category.id}`}
      className="category-card card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        height: '100%',
        backgroundColor: '#FFFFFF',
        position: 'relative',
        transition: 'all var(--transition-normal)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        overflow: 'hidden'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.borderColor = category.color;
        e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'var(--color-border)';
        e.currentTarget.style.boxShadow = 'var(--shadow-card)';
      }}
    >
      {/* Category Image Preview */}
      <div 
        style={{
          width: '100%',
          aspectRatio: '16/10',
          backgroundColor: category.bgTint || '#F7F3EA',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid var(--color-border)'
        }}
      >
        {!imgError && category.image ? (
          <img
            src={category.image}
            alt={category.name}
            onError={() => setImgError(true)}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.4s ease'
            }}
          />
        ) : (
          <div 
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '16px',
              backgroundColor: category.color,
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ★
          </div>
        )}

        {/* Count badge */}
        <span 
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(4px)',
            color: 'var(--color-text-main)',
            fontSize: '0.7rem',
            fontWeight: 700,
            padding: '0.2rem 0.55rem',
            borderRadius: 'var(--radius-full)',
            boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
          }}
        >
          {count} {count === 1 ? 'item' : 'items'}
        </span>
      </div>

      {/* Category Details */}
      <div 
        style={{
          padding: 'var(--space-4)',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          justifyContent: 'space-between'
        }}
      >
        <div>
          <h3 
            style={{
              fontSize: '1.05rem',
              fontWeight: 700,
              color: 'var(--color-text-main)',
              marginBottom: '0.25rem',
              lineHeight: 1.3
            }}
          >
            {category.name}
          </h3>
          <p 
            style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.45,
              marginBottom: 'var(--space-3)'
            }}
          >
            {category.tagline}
          </p>
        </div>

        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            fontSize: 'var(--text-xs)',
            fontWeight: 700,
            color: category.color,
            marginTop: 'auto'
          }}
        >
          <span>Shop Category</span>
          <ArrowRight size={13} />
        </div>
      </div>
    </Link>
  );
}
