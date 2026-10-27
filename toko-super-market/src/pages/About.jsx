import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBasket, 
  Globe2, 
  Utensils, 
  ShieldCheck, 
  HeartHandshake, 
  ArrowRight,
  Sparkles,
  Store
} from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import SectionHeading from '../components/SectionHeading';
import { categories } from '../data/categories';
import { storeConfig } from '../data/storeConfig';

export default function About() {
  return (
    <div className="about-page section" style={{ backgroundColor: 'var(--color-bg)', minHeight: '80vh' }}>
      <div className="container">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={[{ label: 'About Us' }]} />

        {/* Hero Section of About */}
        <div 
          className="card"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-12) var(--space-8)',
            border: '1px solid var(--color-border)',
            marginBottom: 'var(--space-12)',
            boxShadow: 'var(--shadow-sm)',
            textAlign: 'center'
          }}
        >
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              backgroundColor: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
              padding: '0.35rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              fontSize: 'var(--text-xs)',
              fontWeight: 800,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: 'var(--space-4)'
            }}
          >
            <Sparkles size={14} />
            <span>AUTHENTIC INDONESIAN GROCERY</span>
          </div>

          <h1 
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
              fontWeight: 800,
              color: 'var(--color-text-main)',
              lineHeight: 1.15,
              maxWidth: '780px',
              margin: '0 auto var(--space-4)',
              letterSpacing: '-0.02em'
            }}
          >
            Bringing Authentic Indonesian Flavors Closer to You
          </h1>

          <p 
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.6,
              maxWidth: '680px',
              margin: '0 auto var(--space-8)'
            }}
          >
            Toko Aysha was created to serve the Indonesian diaspora living abroad and introduce the rich, vibrant world of Indonesian cuisine to international food enthusiasts.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
            <Link to="/products" className="btn btn-primary btn-lg">
              <span>Explore Products</span>
              <ArrowRight size={18} />
            </Link>
            <Link to="/visit-us" className="btn btn-secondary btn-lg">
              <Store size={18} />
              <span>Visit Our Store</span>
            </Link>
          </div>
        </div>

        {/* Core Pillars */}
        <div style={{ marginBottom: 'var(--space-16)' }}>
          <SectionHeading
            eyebrow="What We Stand For"
            title="Our Focus & Commitment"
            description="We bridge distances by making genuine Indonesian groceries convenient and accessible."
            centered={true}
          />

          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--space-6)'
            }}
          >
            {/* Pillar 1 */}
            <div 
              className="card"
              style={{
                padding: 'var(--space-8) var(--space-6)',
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-3)'
              }}
            >
              <div 
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  backgroundColor: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 'var(--space-2)'
                }}
              >
                <ShieldCheck size={26} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>100% Authentic Indonesian Brands</h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                Every package on our shelves is genuinely manufactured in Indonesia. We carry staple brands that families have loved for generations, including Indomie, Bango, ABC, Roma, Finna, and Kapal Api.
              </p>
            </div>

            {/* Pillar 2 */}
            <div 
              className="card"
              style={{
                padding: 'var(--space-8) var(--space-6)',
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-3)'
              }}
            >
              <div 
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  backgroundColor: 'var(--color-accent-light)',
                  color: 'var(--color-accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 'var(--space-2)'
                }}
              >
                <Globe2 size={26} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>For Locals & Diaspora Alike</h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                Whether you know exactly what bumbu you need for weekend Rendang or you are trying fried noodles (Mi Goreng) for the first time, our catalog is welcoming, accessible, and clearly organized.
              </p>
            </div>

            {/* Pillar 3 */}
            <div 
              className="card"
              style={{
                padding: 'var(--space-8) var(--space-6)',
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-3)'
              }}
            >
              <div 
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  backgroundColor: 'var(--color-bg-alt)',
                  color: 'var(--color-text-main)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 'var(--space-2)'
                }}
              >
                <Utensils size={26} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Full Culinary Essentials</h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                From quick instant foods to complex aromatic pastes, galangal, candlenuts, shrimp paste (terasi), and fragrant Jasmine teas, we ensure your pantry is fully stocked with real Indonesian flavor.
              </p>
            </div>
          </div>
        </div>

        {/* Categories Overview on About Page */}
        <div style={{ marginBottom: 'var(--space-12)' }}>
          <SectionHeading
            eyebrow="Carefully Selected"
            title="What You Will Find at Toko Aysha"
            description="Our physical store covers eight core categories to fulfill everyday cooking and snacking needs."
          />

          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: 'var(--space-4)'
            }}
          >
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.id}`}
                className="card"
                style={{
                  padding: 'var(--space-5)',
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-md)',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-4)',
                  transition: 'all var(--transition-fast)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = cat.color;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div 
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    backgroundColor: cat.bgTint,
                    color: cat.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  ★
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '0.15rem' }}>
                    {cat.name}
                  </h4>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.35 }}>
                    {cat.tagline}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Callout */}
        <div 
          className="card"
          style={{
            backgroundColor: 'var(--color-accent)',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-10) var(--space-8)',
            textAlign: 'center'
          }}
        >
          <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.2rem)', fontWeight: 800, color: '#FFFFFF', marginBottom: 'var(--space-3)' }}>
            Experience Toko Aysha In Person
          </h2>
          <p style={{ fontSize: 'var(--text-base)', color: 'rgba(255, 255, 255, 0.85)', maxWidth: '560px', margin: '0 auto var(--space-6)' }}>
            Discover nostalgic childhood favorites and explore authentic Indonesian tastes. Plan your visit to our physical supermarket today.
          </p>
          <Link to="/visit-us" className="btn btn-lg" style={{ backgroundColor: '#FFFFFF', color: 'var(--color-accent)', fontWeight: 800 }}>
            <Store size={18} />
            <span>Store Location & Hours</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
