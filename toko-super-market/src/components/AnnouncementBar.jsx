import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, X } from 'lucide-react';
import { storeConfig } from '../data/storeConfig';

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);
  const config = storeConfig.announcement;

  if (!config.enabled || !isVisible) return null;

  return (
    <div 
      className="announcement-bar"
      style={{
        backgroundColor: 'var(--color-accent)',
        color: 'var(--color-text-inverse)',
        fontSize: 'var(--text-xs)',
        fontWeight: 600,
        padding: '0.45rem var(--space-4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 100,
        letterSpacing: '0.01em'
      }}
    >
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          textAlign: 'center',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}
      >
        <Sparkles size={14} style={{ color: '#FCD34D', flexShrink: 0 }} />
        <span>{config.message}</span>
        {config.linkUrl && config.linkText && (
          <Link 
            to={config.linkUrl}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              color: '#FDE68A',
              textDecoration: 'underline',
              textUnderlineOffset: '2px',
              fontWeight: 700,
              marginLeft: '0.35rem'
            }}
          >
            {config.linkText}
            <ArrowRight size={12} />
          </Link>
        )}
      </div>

      <button
        onClick={() => setIsVisible(false)}
        aria-label="Dismiss announcement"
        style={{
          position: 'absolute',
          right: '1rem',
          background: 'none',
          border: 'none',
          color: 'rgba(255, 255, 255, 0.75)',
          cursor: 'pointer',
          padding: '0.2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <X size={14} />
      </button>
    </div>
  );
}
