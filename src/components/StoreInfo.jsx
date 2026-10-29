import React from 'react';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Navigation, 
  Info, 
  Store, 
  CheckCircle2 
} from 'lucide-react';
import { storeConfig } from '../data/storeConfig';

export default function StoreInfo({ compact = false }) {
  const { location, contact, operatingHours, storeName } = storeConfig;

  return (
    <div className="store-info-component">
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: compact ? '1fr' : '1fr 1fr',
          gap: 'var(--space-6)',
          alignItems: 'stretch'
        }}
      >
        {/* Left Side: Store Address, Contact & Hours Card */}
        <div 
          className="card"
          style={{
            padding: 'var(--space-8)',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 'var(--space-6)'
          }}
        >
          <div>
            <div 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                backgroundColor: 'var(--color-primary-light)',
                color: 'var(--color-primary)',
                padding: '0.3rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                fontSize: 'var(--text-xs)',
                fontWeight: 800,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                marginBottom: 'var(--space-3)'
              }}
            >
              <Store size={14} />
              <span>In-Person Grocery Shopping</span>
            </div>

            <h3 style={{ fontSize: '1.45rem', fontWeight: 800, marginBottom: 'var(--space-2)' }}>
              {storeName} Physical Store
            </h3>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
              Visit us directly to browse our shelves of Indonesian instant noodles, sauces, snacks, frozen items, and authentic pantry staples.
            </p>

            {/* Address Block */}
            <div style={{ display: 'flex', gap: '0.85rem', marginBottom: 'var(--space-5)' }}>
              <div 
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <MapPin size={20} />
              </div>
              <div>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--color-text-main)' }}>
                  Location & Address
                </div>
                {location.isConfigured ? (
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                    {location.addressLine1} <br />
                    {location.city} {location.postalCode} {location.country}
                  </div>
                ) : (
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.5, marginTop: '0.2rem' }}>
                    <span style={{ display: 'inline-block', backgroundColor: 'var(--color-bg)', padding: '0.25rem 0.5rem', borderRadius: '4px', border: '1px dashed var(--color-border)' }}>
                      📍 {location.displayPlaceholder}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Hours Block */}
            <div style={{ display: 'flex', gap: '0.85rem', marginBottom: 'var(--space-5)' }}>
              <div 
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-accent-light)',
                  color: 'var(--color-accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Clock size={20} />
              </div>
              <div style={{ width: '100%' }}>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '0.35rem' }}>
                  Opening Hours
                </div>
                <div 
                  style={{
                    backgroundColor: 'var(--color-bg)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.65rem 0.85rem',
                    fontSize: 'var(--text-xs)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.35rem'
                  }}
                >
                  {operatingHours.schedule.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-main)' }}>
                      <span style={{ fontWeight: 600 }}>{item.day}</span>
                      <span style={{ color: 'var(--color-accent)', fontWeight: 700 }}>{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact info Block */}
            <div style={{ display: 'flex', gap: '0.85rem' }}>
              <div 
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-bg-alt)',
                  color: 'var(--color-text-main)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Mail size={20} />
              </div>
              <div>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--color-text-main)' }}>
                  Customer Inquiries
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', marginTop: '0.15rem' }}>
                  Email: <strong>{contact.email}</strong>
                </div>
                {contact.isConfigured && contact.phone && (
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
                    Phone: <strong>{contact.phone}</strong>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Directions Button */}
          <div style={{ paddingTop: 'var(--space-4)', borderTop: '1px solid var(--color-border)' }}>
            {location.directionsUrl ? (
              <a
                href={location.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                <Navigation size={18} />
                <span>Get Directions via Google Maps</span>
              </a>
            ) : (
              <button
                type="button"
                className="btn btn-secondary"
                style={{ width: '100%', cursor: 'default' }}
                onClick={() => alert(`Store location is being prepared in ${storeConfig.storeName} settings. Please check back soon!`)}
              >
                <Navigation size={18} style={{ color: 'var(--color-primary)' }} />
                <span>Directions link configured upon grand opening</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Side: Visual Map / Supermarket Storefront Representation */}
        <div 
          className="card"
          style={{
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid var(--color-border)'
          }}
        >
          {/* Map / Storefront Graphical Area with Store Banner */}
          <div 
            style={{
              position: 'relative',
              backgroundColor: '#FAF5F5',
              minHeight: '280px',
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'var(--space-6)',
              backgroundImage: "linear-gradient(135deg, rgba(255, 255, 255, 0.92) 0%, rgba(255, 255, 255, 0.85) 100%), url('/images/brand/banner.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* Clean Simulated Supermarket Map UI */}
            <div 
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                padding: 'var(--space-6)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              {/* Map grid lines background */}
              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: 0.25,
                  backgroundImage: 'radial-gradient(var(--color-primary) 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}
              />

              {/* Pin Icon */}
              <div 
                style={{
                  position: 'relative',
                  zIndex: 2,
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-primary)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 20px rgba(123, 17, 26, 0.4)',
                  marginBottom: 'var(--space-3)',
                  animation: 'bounce 2s infinite'
                }}
              >
                <MapPin size={28} />
              </div>

              <div style={{ position: 'relative', zIndex: 2 }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.25rem' }}>
                  {storeName} Location
                </h4>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', maxWidth: '280px' }}>
                  {location.isConfigured 
                    ? `${location.addressLine1}, ${location.addressLine2}, ${location.city} ${location.postalCode}, ${location.country}`
                    : "Centralized location easily accessible for customers seeking authentic Indonesian products."}
                </p>
              </div>

              {/* In-Store Highlights */}
              <div 
                style={{
                  position: 'relative',
                  zIndex: 2,
                  marginTop: 'var(--space-5)',
                  display: 'flex',
                  gap: '0.45rem',
                  flexWrap: 'wrap',
                  justifyContent: 'center'
                }}
              >
                <span className="badge badge-accent" style={{ fontSize: '0.7rem' }}>
                  <CheckCircle2 size={11} /> Easy Parking
                </span>
                <span className="badge badge-accent" style={{ fontSize: '0.7rem' }}>
                  <CheckCircle2 size={11} /> Direct Imports
                </span>
                <span className="badge badge-accent" style={{ fontSize: '0.7rem' }}>
                  <CheckCircle2 size={11} /> Fresh Deliveries
                </span>
              </div>
            </div>
          </div>

          {/* Quick Notice footer inside card */}
          <div 
            style={{
              padding: 'var(--space-4) var(--space-6)',
              backgroundColor: 'var(--color-surface-soft)',
              borderTop: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: 'var(--text-xs)',
              color: 'var(--color-text-secondary)'
            }}
          >
            <Info size={16} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
            <span>Store address and GPS coordinates are maintained in <code>storeConfig.js</code> for instant live updates.</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}
