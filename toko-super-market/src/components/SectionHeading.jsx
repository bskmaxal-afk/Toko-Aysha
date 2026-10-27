import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function SectionHeading({
  eyebrow,
  title,
  description,
  actionLink,
  actionText,
  centered = false,
  className = ''
}) {
  return (
    <div 
      className={`section-heading-container ${className}`}
      style={{
        display: 'flex',
        flexDirection: centered ? 'column' : 'row',
        alignItems: centered ? 'center' : 'flex-end',
        justifyContent: 'space-between',
        textAlign: centered ? 'center' : 'left',
        marginBottom: 'var(--space-8)',
        gap: 'var(--space-4)',
        flexWrap: 'wrap'
      }}
    >
      <div style={{ maxWidth: centered ? '680px' : '580px' }}>
        {eyebrow && (
          <span 
            className="eyebrow"
            style={{
              color: 'var(--color-primary)',
              fontSize: 'var(--text-xs)',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              display: 'inline-block',
              marginBottom: '0.4rem'
            }}
          >
            {eyebrow}
          </span>
        )}
        <h2 
          style={{
            fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)',
            fontWeight: 800,
            color: 'var(--color-text-main)',
            lineHeight: 1.2,
            marginBottom: description ? '0.5rem' : '0'
          }}
        >
          {title}
        </h2>
        {description && (
          <p 
            style={{
              fontSize: 'var(--text-base)',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.55
            }}
          >
            {description}
          </p>
        )}
      </div>

      {actionLink && actionText && (
        <Link
          to={actionLink}
          className="btn btn-secondary btn-sm"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontWeight: 700,
            color: 'var(--color-primary)',
            flexShrink: 0
          }}
        >
          <span>{actionText}</span>
          <ArrowRight size={15} />
        </Link>
      )}
    </div>
  );
}
