import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ShoppingBasket, Menu, X, MapPin, Store } from 'lucide-react';
import SearchBar from './SearchBar';
import { storeConfig } from '../data/storeConfig';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle sticky header elevation on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About Us', path: '/about' },
    { name: 'Visit Us', path: '/visit-us' },
  ];

  return (
    <header 
      className="main-header"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 90,
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid var(--color-border)',
        boxShadow: isScrolled ? '0 4px 16px rgba(0, 0, 0, 0.06)' : 'none',
        transition: 'all var(--transition-normal)'
      }}
    >
      <div className="container">
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 'var(--header-height)',
            gap: 'var(--space-4)'
          }}
        >
          {/* Logo */}
          <Link 
            to="/" 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              textDecoration: 'none',
              flexShrink: 0
            }}
          >
            <div 
              style={{
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-primary)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(199, 70, 43, 0.25)'
              }}
            >
              <ShoppingBasket size={24} strokeWidth={2.2} />
            </div>
            <div>
              <span 
                style={{
                  fontFamily: 'var(--font-family-heading)',
                  fontSize: '1.35rem',
                  fontWeight: 800,
                  color: 'var(--color-primary)',
                  letterSpacing: '-0.02em',
                  display: 'block',
                  lineHeight: 1.1
                }}
              >
                Toko Aysha
              </span>
              <span 
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--color-accent)',
                  display: 'block'
                }}
              >
                Indonesian Market
              </span>
            </div>
          </Link>

          {/* Search Bar (Desktop / Tablet) */}
          <div 
            className="navbar-search"
            style={{
              flex: 1,
              maxWidth: '420px',
              display: 'none'
            }}
          >
            <SearchBar variant="header" />
          </div>

          {/* Desktop Navigation Links */}
          <nav 
            className="navbar-links"
            style={{
              display: 'none',
              alignItems: 'center',
              gap: 'var(--space-6)'
            }}
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                style={({ isActive }) => ({
                  fontSize: 'var(--text-sm)',
                  fontWeight: 600,
                  color: isActive ? 'var(--color-primary)' : 'var(--color-text-main)',
                  position: 'relative',
                  padding: '0.4rem 0',
                  borderBottom: isActive ? '2px solid var(--color-primary)' : '2px solid transparent',
                  transition: 'color var(--transition-fast)'
                })}
              >
                {link.name}
              </NavLink>
            ))}

            <Link 
              to="/visit-us" 
              className="btn btn-primary btn-sm"
              style={{
                borderRadius: 'var(--radius-full)',
                padding: '0.55rem 1.15rem'
              }}
            >
              <MapPin size={15} />
              <span>Find Store</span>
            </Link>
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            className="navbar-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '42px',
              height: '42px',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text-main)',
              cursor: 'pointer'
            }}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Search Input in Navbar */}
        <div 
          className="navbar-mobile-search"
          style={{
            paddingBottom: '0.85rem',
            display: 'block'
          }}
        >
          <SearchBar variant="header" />
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div 
          className="mobile-drawer"
          style={{
            backgroundColor: '#FFFFFF',
            borderTop: '1px solid var(--color-border)',
            padding: 'var(--space-6) var(--space-4)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-3)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)'
          }}
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              style={({ isActive }) => ({
                display: 'block',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--text-base)',
                fontWeight: 600,
                color: isActive ? 'var(--color-primary)' : 'var(--color-text-main)',
                backgroundColor: isActive ? 'var(--color-primary-light)' : 'transparent'
              })}
            >
              {link.name}
            </NavLink>
          ))}

          <div style={{ marginTop: 'var(--space-2)' }}>
            <Link
              to="/visit-us"
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              <Store size={18} />
              <span>Store Location & Hours</span>
            </Link>
          </div>
        </div>
      )}

      {/* Responsive Inline CSS rules for desktop / mobile navbar */}
      <style>{`
        @media (min-width: 769px) {
          .navbar-search {
            display: block !important;
          }
          .navbar-links {
            display: flex !important;
          }
          .navbar-mobile-toggle {
            display: none !important;
          }
          .navbar-mobile-search {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
