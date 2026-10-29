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
                  Email:{' '}
                  <a 
                    href={`mailto:${contact.email}`}
                    style={{ fontWeight: 700, color: 'var(--color-primary)', textDecoration: 'none' }}
                  >
                    {contact.email}
                  </a>
                </div>
                {contact.isConfigured && contact.phone && (
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', marginTop: '0.15rem' }}>
                    Phone:{' '}
                    <a 
                      href={`tel:${contact.phone.replace(/[^+\d]/g, '')}`} 
                      style={{ fontWeight: 700, color: 'var(--color-text-main)', textDecoration: 'none' }}
                    >
                      {contact.phone}
                    </a>
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

        {/* Right Side: Official Google Maps Live Embed */}
        <div 
          className="card"
          style={{
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-md)',
            minHeight: '440px'
          }}
        >
          {/* Header Bar above Map */}
          <div 
            style={{
              padding: 'var(--space-4) var(--space-6)',
              backgroundColor: '#FFFFFF',
              borderBottom: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 'var(--space-2)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div 
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <MapPin size={18} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--color-text-main)', margin: 0, lineHeight: 1.2 }}>
                  TOKO AYSHA on Google Maps
                </h4>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', margin: 0 }}>
                  Knosou 11, 11253 Athens (Amerikis Square & Agiou Nikolaou)
                </p>
              </div>
            </div>

            <a
              href={location.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: 'var(--text-xs)',
                fontWeight: 700,
                color: 'var(--color-primary)',
                textDecoration: 'none',
                padding: '0.35rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-primary-light)'
              }}
            >
              <span>View Larger Map</span>
              <Navigation size={13} />
            </a>
          </div>

          {/* Interactive Google Maps Iframe Embed */}
          <div 
            style={{
              position: 'relative',
              width: '100%',
              flex: 1,
              minHeight: '360px'
            }}
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3143.7573990176456!2d23.733767!3d38.0061188!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a1a35079e78b5d%3A0x66b8b59090c98bb1!2sTOKO%20AYSHA!5e0!3m2!1sid!2sid!4v1793259577660!5m2!1sid!2sid" 
              width="100%" 
              height="100%" 
              style={{ 
                border: 0, 
                display: 'block', 
                minHeight: '360px',
                width: '100%',
                height: '100%'
              }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="strict-origin-when-cross-origin"
              title="TOKO AYSHA Official Google Maps Location"
            />
          </div>

          {/* Map Footer Bar with quick info badges */}
          <div 
            style={{
              padding: 'var(--space-3) var(--space-6)',
              backgroundColor: 'var(--color-surface-soft)',
              borderTop: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 'var(--space-2)',
              fontSize: 'var(--text-xs)',
              color: 'var(--color-text-secondary)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Info size={14} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
              <span>Amerikis Square & Agiou Nikolaou, Athens</span>
            </div>
            <div style={{ display: 'flex', gap: '0.35rem' }}>
              <span className="badge badge-stock" style={{ fontSize: '0.68rem' }}>Verified Location</span>
              <span className="badge badge-accent" style={{ fontSize: '0.68rem' }}>Open for Visitors</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
