import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Store, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  return (
    <section 
      className="hero-section"
      style={{
        backgroundColor: 'var(--color-bg)',
        borderBottom: '1px solid var(--color-border)',
        paddingTop: 'var(--space-12)',
        paddingBottom: 'var(--space-12)',
        overflow: 'hidden'
      }}
    >
      <div className="container">
        <div 
          className="hero-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.05fr 0.95fr',
            alignItems: 'center',
            gap: 'var(--space-10)'
          }}
        >
          {/* Left Column: Headlines & Call to Actions */}
          <div className="hero-content">
            <div 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-full)',
                padding: '0.35rem 0.85rem',
                marginBottom: 'var(--space-4)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <Sparkles size={14} style={{ color: 'var(--color-primary)' }} />
              <span 
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--color-primary)'
                }}
              >
                YOUR INDONESIAN GROCERY DESTINATION
              </span>
            </div>

            <h1 
              style={{
                fontSize: 'clamp(2.1rem, 4vw, 3.25rem)',
                fontWeight: 800,
                color: 'var(--color-text-main)',
                lineHeight: 1.15,
                marginBottom: 'var(--space-4)',
                letterSpacing: '-0.025em'
              }}
            >
              A Taste of Indonesia, <br />
              <span style={{ color: 'var(--color-primary)' }}>Close to Home.</span>
            </h1>

            <p 
              style={{
                fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6,
                maxWidth: '540px',
                marginBottom: 'var(--space-8)'
              }}
            >
              Discover your favorite Indonesian noodles, snacks, spices, and everyday essentials — all in one place.
            </p>

            {/* Dual CTA Buttons */}
            <div 
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--space-3)',
                marginBottom: 'var(--space-8)'
              }}
            >
              <Link 
                to="/products" 
                className="btn btn-primary btn-lg"
                style={{
                  boxShadow: '0 4px 14px rgba(199, 70, 43, 0.28)'
                }}
              >
                <span>Explore Products</span>
                <ArrowRight size={18} />
              </Link>

              <Link 
                to="/visit-us" 
                className="btn btn-secondary btn-lg"
              >
                <Store size={18} style={{ color: 'var(--color-accent)' }} />
                <span>Visit Our Store</span>
              </Link>
            </div>

            {/* Trust Points */}
            <div 
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--space-4)',
                paddingTop: 'var(--space-4)',
                borderTop: '1px solid var(--color-border)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-text-main)' }}>
                <CheckCircle2 size={16} style={{ color: 'var(--color-accent)' }} />
                <span>60+ Indonesian Essentials</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-text-main)' }}>
                <CheckCircle2 size={16} style={{ color: 'var(--color-accent)' }} />
                <span>Authentic National Brands</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-text-main)' }}>
                <CheckCircle2 size={16} style={{ color: 'var(--color-accent)' }} />
                <span>Regular Restocks</span>
              </div>
            </div>
          </div>

          {/* Right Column: High Quality Supermarket Grocery Showcase */}
          <div 
            className="hero-visual"
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div 
              style={{
                width: '100%',
                maxWidth: '540px',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                backgroundColor: 'var(--color-surface)',
                border: '1.5px solid var(--color-border)',
                boxShadow: 'var(--shadow-lg)',
                padding: '1rem'
              }}
            >
              <img 
                src="/images/hero/indonesian-groceries.svg" 
                alt="Composition of authentic Indonesian grocery items including Indomie, Bango Kecap Manis, ABC Sambal, Teh Botol, and Pandan Rice"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 'var(--radius-lg)'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Inline CSS for Hero */}
      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: var(--space-8) !important;
          }
          .hero-content {
            text-align: left;
          }
          .hero-visual {
            order: -1;
          }
        }
      `}</style>
    </section>
  );
}
