import React from 'react';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Navigation, 
  Info, 
  Store, 
  Calendar,
  Sparkles,
  ShoppingBag,
  CreditCard,
  Car
} from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import SectionHeading from '../components/SectionHeading';
import StoreInfo from '../components/StoreInfo';
import { storeConfig } from '../data/storeConfig';

export default function VisitUs() {
  const { location, contact, operatingHours, storeName } = storeConfig;

  return (
    <div className="visit-us-page section" style={{ backgroundColor: 'var(--color-bg)', minHeight: '85vh' }}>
      <div className="container">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={[{ label: 'Visit Us' }]} />

        {/* Page Header */}
        <div style={{ maxWidth: '720px', marginBottom: 'var(--space-8)' }}>
          <span className="eyebrow">PHYSICAL STORE GUIDE</span>
          <h1 
            style={{
              fontSize: 'clamp(2.2rem, 3.8vw, 3rem)',
              fontWeight: 800,
              color: 'var(--color-text-main)',
              lineHeight: 1.15,
              marginBottom: 'var(--space-3)',
              letterSpacing: '-0.02em'
            }}
          >
            Visit {storeName} In Person
          </h1>
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
            Browse aisles of authentic Asian and Indonesian instant noodles, snacks, coconut milks, sauces, curry pastes, and household essentials. Find our location, view detailed daily hours, and plan your visit.
          </p>
        </div>

        {/* Central Store Info Component */}
        <div style={{ marginBottom: 'var(--space-12)' }}>
          <StoreInfo />
        </div>

        {/* Detailed Hours Breakdown & Visiting Tips Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--space-8)',
            marginBottom: 'var(--space-12)'
          }}
        >
          {/* Daily Schedule Card */}
          <div 
            className="card"
            style={{
              padding: 'var(--space-8)',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--color-border)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 'var(--space-4)' }}>
              <Calendar size={22} style={{ color: 'var(--color-primary)' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Weekly Schedule</h3>
            </div>

            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
              Our doors are open throughout the week to help you get your favorite Asian culinary staples.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {operatingHours.schedule.map((item, index) => (
                <div 
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.65rem 0.85rem',
                    backgroundColor: index % 2 === 0 ? 'var(--color-surface-soft)' : '#FFFFFF',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)'
                  }}
                >
                  <span style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--color-text-main)' }}>
                    {item.day}
                  </span>
                  <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-accent)' }}>
                    {item.hours}
                  </span>
                </div>
              ))}
            </div>

            {!operatingHours.isConfigured && (
              <div 
                style={{
                  marginTop: 'var(--space-4)',
                  padding: '0.65rem 0.85rem',
                  backgroundColor: 'var(--color-primary-light)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-primary)',
                  lineHeight: 1.45
                }}
              >
                <strong>Store Note:</strong> {operatingHours.note}
              </div>
            )}
          </div>

          {/* Practical Visit Tips */}
          <div 
            className="card"
            style={{
              padding: 'var(--space-8)',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--color-border)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 'var(--space-4)' }}>
                <Store size={22} style={{ color: 'var(--color-accent)' }} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Tips for Shoppers</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: 'var(--color-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--color-primary)' }}>
                    <Car size={18} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.15rem' }}>Convenient Parking</h4>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                      Ample customer parking is available right in front of the store for loading rice sacks and bulk groceries.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: 'var(--color-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--color-accent)' }}>
                    <ShoppingBag size={18} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.15rem' }}>Bulk & Box Purchases</h4>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                      Instant noodles (Indomie, Samyang Buldak, Shin Ramyun) and bottled teas are readily available in whole carton boxes upon request.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: 'var(--color-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--color-primary)' }}>
                    <CreditCard size={18} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.15rem' }}>In-Store Payment Options</h4>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                      We accept major credit cards, debit cards, and contactless mobile pay at our physical checkout counters.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct inquiry note */}
            <div 
              style={{
                marginTop: 'var(--space-6)',
                paddingTop: 'var(--space-4)',
                borderTop: '1px solid var(--color-border)',
                fontSize: 'var(--text-xs)',
                color: 'var(--color-text-secondary)'
              }}
            >
              Have a special item request or looking for a specific regional ingredient? Send us a note at <strong>{contact.email}</strong>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
