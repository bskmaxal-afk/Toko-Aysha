import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBasket, MapPin, Clock, Phone, Mail, ArrowUpRight } from 'lucide-react';
import { storeConfig } from '../data/storeConfig';
import { categories } from '../data/categories';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      style={{
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid var(--color-border)',
        marginTop: 'auto'
      }}
    >
      {/* Top Footer Grid */}
      <div className="container" style={{ paddingTop: 'var(--space-16)', paddingBottom: 'var(--space-12)' }}>
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'var(--space-10)'
          }}
        >
          {/* Col 1: Store Brand */}
          <div style={{ maxWidth: '340px' }}>
            <Link 
              to="/" 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                textDecoration: 'none',
                marginBottom: 'var(--space-4)'
              }}
            >
              <div 
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-primary)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ShoppingBasket size={20} />
              </div>
              <div>
                <span 
                  style={{
                    fontFamily: 'var(--font-family-heading)',
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: 'var(--color-primary)',
                    letterSpacing: '-0.02em',
                    display: 'block',
                    lineHeight: 1
                  }}
                >
                  Toko Aysha
                </span>
                <span 
                  style={{
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'var(--color-accent)'
                  }}
                >
                  Indonesian Market
                </span>
              </div>
            </Link>

            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
              {storeConfig.shortDescription}
            </p>

            <div 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'var(--color-bg)',
                padding: '0.4rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                color: 'var(--color-accent)'
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-accent)' }}></span>
              100% Authentic Indonesian Products
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 700, marginBottom: 'var(--space-4)' }}>
              Explore
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li>
                <Link to="/" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/about" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                  About Toko Aysha
                </Link>
              </li>
              <li>
                <Link to="/visit-us" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                  Store Location & Hours
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div>
            <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 700, marginBottom: 'var(--space-4)' }}>
              Top Categories
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {categories.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <Link 
                    to={`/products?category=${cat.id}`}
                    style={{ 
                      fontSize: 'var(--text-sm)', 
                      color: 'var(--color-text-secondary)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}
                  >
                    <span>{cat.name}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  to="/products"
                  style={{ 
                    fontSize: 'var(--text-xs)', 
                    fontWeight: 700, 
                    color: 'var(--color-primary)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    marginTop: '0.25rem'
                  }}
                >
                  View all 8 categories
                  <ArrowUpRight size={13} />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Store Visit & Contact */}
          <div>
            <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 700, marginBottom: 'var(--space-4)' }}>
              Store Info
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-start' }}>
                <MapPin size={18} style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text-main)' }}>
                    Physical Store
                  </div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
                    {storeConfig.location.isConfigured 
                      ? `${storeConfig.location.addressLine1}, ${storeConfig.location.city}` 
                      : storeConfig.location.displayPlaceholder}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-start' }}>
                <Clock size={18} style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text-main)' }}>
                    Opening Hours
                  </div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
                    {storeConfig.operatingHours.isConfigured 
                      ? storeConfig.operatingHours.schedule[0].hours
                      : 'Mon – Sat: 10:00 AM – 7:00 PM (Details on Visit Us)'}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-start' }}>
                <Mail size={18} style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text-main)' }}>
                    Contact Email
                  </div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
                    {storeConfig.contact.email}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div 
        style={{
          borderTop: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-bg)'
        }}
      >
        <div 
          className="container"
          style={{
            paddingTop: 'var(--space-4)',
            paddingBottom: 'var(--space-4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 'var(--space-3)'
          }}
        >
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
            © {currentYear} <strong>Toko Aysha</strong>. All rights reserved. Authentic Indonesian Groceries.
          </div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', display: 'flex', gap: 'var(--space-4)' }}>
            <Link to="/products" style={{ color: 'var(--color-text-secondary)' }}>Products Catalog</Link>
            <Link to="/visit-us" style={{ color: 'var(--color-text-secondary)' }}>Location & Directions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
