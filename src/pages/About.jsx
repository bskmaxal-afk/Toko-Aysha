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
            <span>AUTHENTIC ASIAN MARKET & SUPERMARKET</span>
          </div>

          <h1 
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
              fontWeight: 800,
              color: 'var(--color-text-main)',
              lineHeight: 1.15,
              maxWidth: '820px',
              margin: '0 auto var(--space-4)',
              letterSpacing: '-0.02em'
            }}
          >
            Bringing Authentic Asian Flavors Closer to You
          </h1>

          <p 
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.6,
              maxWidth: '720px',
              margin: '0 auto var(--space-8)'
            }}
          >
            Toko Aysha Asian Market is your trusted neighborhood grocery destination, bringing together the finest culinary treasures from Indonesia, South Korea, Thailand, China, and across Asia for both diaspora families and international food enthusiasts.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
            <Link to="/products" className="btn btn-primary btn-lg">
              <span>Explore All Products</span>
              <ArrowRight size={18} />
            </Link>
            <Link to="/products?origin=imported" className="btn btn-outline btn-lg">
              <Globe2 size={18} />
              <span>Browse Asian Imports</span>
            </Link>
            <Link to="/visit-us" className="btn btn-secondary btn-lg">
              <Store size={18} />
              <span>Visit Our Store</span>
            </Link>
          </div>
        </div>

        {/* Official Banner & Storefront Showcase */}
        <div 
          className="card"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            border: '1.5px solid var(--color-border)',
            marginBottom: 'var(--space-12)',
            boxShadow: 'var(--shadow-md)'
          }}
        >
          <img 
            src="/images/brand/banner.jpg" 
            alt="Toko Aysha Asian Market Official Store Banner - Knosou 11, Athens, Greece" 
            style={{
              width: '100%',
              maxHeight: '340px',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block'
            }}
          />
          <div 
            style={{
              padding: 'var(--space-4) var(--space-6)',
              backgroundColor: 'var(--color-surface-soft)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 'var(--space-3)',
              borderTop: '1px solid var(--color-border)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--color-primary)' }}>
              <span>📍 Knosou 11, 11253 Athens (Amerikis Square & Agiou Nikolaou)</span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span className="badge badge-accent">Halal Indonesia Certified</span>
              <span className="badge badge-primary">Wholesale & Retail (Χονδρική & Λιανική)</span>
              <span className="badge badge-stock">📞 +30 2110014955 / +30 694 6161076</span>
            </div>
          </div>
        </div>

        {/* Core Pillars */}
        <div style={{ marginBottom: 'var(--space-16)' }}>
          <SectionHeading
            eyebrow="What We Stand For"
            title="Our Focus & Commitment"
            description="We bridge culinary traditions by making genuine Asian grocery favorites convenient and accessible."
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
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>100% Authentic Asian Brands</h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                Every item on our shelves is verified and authentic. We carry legendary brands across Asia including Indomie, Samyang Buldak, Nongshim Shin Ramyun, Bango, ABC, Aroy-D, Flying Goose, Kokita, and Longkou Dragon Brand.
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
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Celebrating Diverse Asian Cuisines</h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                From rich Indonesian Rendang pastes and fiery sambals to Korean Jajangmyeon, Thai Tom Yum curries, and glass vermicelli, our curated catalog unites the rich culinary diversity of Asia under one roof.
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
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Full Culinary & Pantry Essentials</h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                From comforting instant noodles and crispy cassava chips to aged single-clove black garlic, coconut milks, marinades, and soothing jasmine teas, we ensure your Asian home kitchen is fully supplied.
              </p>
            </div>
          </div>
        </div>

        {/* Categories Overview on About Page */}
        <div style={{ marginBottom: 'var(--space-12)' }}>
          <SectionHeading
            eyebrow="Carefully Selected"
            title="What You Will Find at Toko Aysha Asian Market"
            description="Our physical store covers eight core categories to fulfill your everyday Asian cooking and snacking needs."
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
            Experience Toko Aysha Asian Market In Person
          </h2>
          <p style={{ fontSize: 'var(--text-base)', color: 'rgba(255, 255, 255, 0.85)', maxWidth: '580px', margin: '0 auto var(--space-6)' }}>
            Discover nostalgic comfort foods, fiery ramyun, specialty sauces, and authentic Asian cooking staples. Plan your visit to our physical supermarket today.
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
