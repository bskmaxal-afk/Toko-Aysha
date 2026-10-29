import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  Store, 
  ShieldCheck, 
  ShoppingBag,
  Flame,
  Search,
  Globe2
} from 'lucide-react';
import Hero from '../components/Hero';
import SectionHeading from '../components/SectionHeading';
import CategoryGrid from '../components/CategoryGrid';
import ProductGrid from '../components/ProductGrid';
import ProductDetailModal from '../components/ProductDetailModal';
import StoreInfo from '../components/StoreInfo';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { storeConfig } from '../data/storeConfig';

const REGION_CARDS = [
  {
    id: 'Indonesia',
    name: 'Indonesian Favorites',
    flag: '🇮🇩',
    count: 125,
    tagline: 'Indomie, Bango, Sambal ABC & Kerupuk',
    link: '/products?origin=Indonesia',
    bg: '#FAF2F3',
    border: '#F3D2D5'
  },
  {
    id: 'South Korea',
    name: 'Korean Ramyun & Noodles',
    flag: '🇰🇷',
    count: 10,
    tagline: 'Samyang Buldak, Shin Ramyun & Chapagetti',
    link: '/products?origin=South+Korea',
    bg: '#EFF6FF',
    border: '#BFDBFE'
  },
  {
    id: 'Thailand',
    name: 'Thai Essentials & Sauces',
    flag: '🇹🇭',
    count: 9,
    tagline: 'Aroy-D Coconut Milk, Sriracha & Wai Wai',
    link: '/products?origin=Thailand',
    bg: '#F0FDF4',
    border: '#BBF7D0'
  },
  {
    id: 'China',
    name: 'Traditional Glass Vermicelli',
    flag: '🇨🇳',
    count: 1,
    tagline: 'Longkou Dragon Brand Mung Bean Vermicelli',
    link: '/products?origin=China',
    bg: '#FEFCE8',
    border: '#FEF08A'
  }
];

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [previewCategory, setPreviewCategory] = useState('all');
  const [previewOrigin, setPreviewOrigin] = useState('all');
  const [previewSearch, setPreviewSearch] = useState('');

  // 1. Featured Products (Customer Favorites - ~8 items across origins)
  const customerFavorites = products.filter(p => p.featured).slice(0, 8);

  // 2. Interactive Catalog Preview Filter
  const previewProducts = products.filter(p => {
    const matchesCategory = previewCategory === 'all' || p.category === previewCategory;
    let matchesOrigin = true;
    if (previewOrigin === 'imported') {
      matchesOrigin = Boolean(p.origin && !p.origin.toLowerCase().includes('indonesia'));
    } else if (previewOrigin !== 'all') {
      matchesOrigin = Boolean(p.origin && p.origin.toLowerCase().includes(previewOrigin.toLowerCase()));
    }
    const matchesSearch = !previewSearch || 
      p.name.toLowerCase().includes(previewSearch.toLowerCase()) ||
      p.brand.toLowerCase().includes(previewSearch.toLowerCase());
    return matchesCategory && matchesOrigin && matchesSearch;
  }).slice(0, 8);

  return (
    <div className="home-page">
      {/* Hero Banner */}
      <Hero />

      {/* Shop by Category */}
      <section className="section" id="categories" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="container">
          <SectionHeading
            eyebrow="Browse Our Aisles"
            title="Shop by Category"
            description="Explore our eight unified grocery categories spanning authentic Indonesian favorites and Asian imports."
            actionLink="/products"
            actionText="View All 145 Products"
          />
          <CategoryGrid />
        </div>
      </section>

      {/* Shop by Regional Origin (Pan-Asian Aisles) */}
      <section className="section-tight" style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <SectionHeading
            eyebrow="Pan-Asian Discovery"
            title="Shop by Regional Origin"
            description="Explore curated grocery specialties sourced from Indonesia, South Korea, Thailand, and China."
            actionLink="/products?origin=imported"
            actionText="Explore Asian Imports (20)"
          />

          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 'var(--space-4)',
              marginBottom: 'var(--space-6)'
            }}
          >
            {REGION_CARDS.map((rc) => (
              <Link
                key={rc.id}
                to={rc.link}
                className="card"
                style={{
                  backgroundColor: rc.bg,
                  borderColor: rc.border,
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-5)',
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: 'var(--space-3)',
                  transition: 'all var(--transition-fast)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-card)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '2rem' }}>{rc.flag}</span>
                  <span 
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      backgroundColor: 'rgba(255, 255, 255, 0.85)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: 'var(--radius-full)',
                      color: 'var(--color-text-main)',
                      border: '1px solid var(--color-border)'
                    }}
                  >
                    {rc.count} Products
                  </span>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '0.2rem' }}>
                    {rc.name}
                  </h3>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                    {rc.tagline}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-primary)' }}>
                  <span>Browse {rc.id}</span>
                  <ArrowRight size={13} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Favorites */}
      <section className="section" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="container">
          <SectionHeading
            eyebrow="Popular Asian Picks"
            title="Customer Favorites"
            description="Our best-loved items — from Indomie Mi Goreng and Sambal ABC to fiery Samyang Buldak, Shin Ramyun, and Aroy-D Coconut Milk."
            actionLink="/products"
            actionText="Explore Entire Catalog"
          />
          <ProductGrid
            products={customerFavorites}
            onViewDetails={(product) => setSelectedProduct(product)}
          />
        </div>
      </section>

      {/* Promo Banner */}
      <section 
        className="section-tight"
        style={{
          backgroundColor: 'var(--color-accent)',
          color: 'var(--color-text-inverse)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div className="container">
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 'var(--space-6)',
              padding: 'var(--space-4) 0'
            }}
          >
            <div style={{ maxWidth: '640px' }}>
              <div 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  padding: '0.25rem 0.65rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 700,
                  marginBottom: 'var(--space-2)',
                  color: '#FDE68A'
                }}
              >
                <Flame size={14} />
                <span>Authentic Asian Taste Guaranteed</span>
              </div>
              <h2 
                style={{
                  fontSize: 'clamp(1.75rem, 3vw, 2.35rem)',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  marginBottom: 'var(--space-2)'
                }}
              >
                Bring Authentic Asian Flavors to Your Kitchen.
              </h2>
              <p 
                style={{
                  fontSize: 'var(--text-base)',
                  color: 'rgba(255, 255, 255, 0.85)',
                  lineHeight: 1.55
                }}
              >
                From comforting instant noodles to aromatic curry pastes, sriracha, and savory snacks — discover the best of Asia at Toko Aysha Asian Market.
              </p>
            </div>

            <div>
              <Link 
                to="/products"
                className="btn btn-lg"
                style={{
                  backgroundColor: '#FFFFFF',
                  color: 'var(--color-accent)',
                  fontWeight: 800,
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)'
                }}
              >
                <span>Browse All 145 Products</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Asian Grocery Catalogue Interactive Preview with Official Store Banner Backdrop */}
      <section 
        className="section catalog-preview-section" 
        style={{ 
          position: 'relative',
          backgroundColor: '#FFFFFF', 
          borderTop: '1px solid var(--color-border)', 
          borderBottom: '1px solid var(--color-border)',
          backgroundImage: "linear-gradient(180deg, rgba(255, 255, 255, 0.96) 0%, rgba(255, 255, 255, 0.90) 50%, rgba(255, 255, 255, 0.97) 100%), url('/images/brand/banner.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="container">
          <SectionHeading
            eyebrow="Asian Grocer Catalogue Preview"
            title="Explore Our Products"
            description="Quickly filter by category or regional origin to preview authentic grocery staples currently on our shelves."
            actionLink="/products"
            actionText="Go to Full Products Page"
          />

          {/* Interactive filter & search controls on homepage */}
          <div 
            style={{
              backgroundColor: 'var(--color-bg)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              padding: 'var(--space-4)',
              marginBottom: 'var(--space-6)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)'
            }}
          >
            {/* Search Input for preview */}
            <div style={{ position: 'relative', width: '100%' }}>
              <input
                type="text"
                value={previewSearch}
                onChange={(e) => setPreviewSearch(e.target.value)}
                placeholder="Type to filter preview (e.g. Samyang, Shin Ramyun, Indomie, Coconut Milk)..."
                aria-label="Filter preview"
                className="input-text"
                style={{
                  paddingLeft: '2.5rem',
                  fontSize: 'var(--text-sm)',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: '#FFFFFF'
                }}
              />
              <Search 
                size={16} 
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--color-text-secondary)',
                  pointerEvents: 'none'
                }}
              />
            </div>

            {/* Quick origin selector row */}
            <div 
              style={{
                display: 'flex',
                gap: '0.4rem',
                overflowX: 'auto',
                paddingBottom: '0.2rem',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {[
                { id: 'all', label: 'All Asian Items' },
                { id: 'Indonesia', label: '🇮🇩 Indonesia' },
                { id: 'imported', label: '🥢 Asian Imports' },
                { id: 'South Korea', label: '🇰🇷 South Korea' },
                { id: 'Thailand', label: '🇹🇭 Thailand' },
                { id: 'Sri Lanka', label: '🇱🇰 Sri Lanka' },
                { id: 'China', label: '🇨🇳 China' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setPreviewOrigin(opt.id)}
                  style={{
                    padding: '0.3rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    border: previewOrigin === opt.id ? '1.5px solid var(--color-accent)' : '1px solid var(--color-border)',
                    backgroundColor: previewOrigin === opt.id ? 'var(--color-accent)' : '#FFFFFF',
                    color: previewOrigin === opt.id ? '#FFFFFF' : 'var(--color-text-main)',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Quick category pills row */}
            <div 
              style={{
                display: 'flex',
                gap: '0.4rem',
                overflowX: 'auto',
                paddingBottom: '0.2rem',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              <button
                type="button"
                onClick={() => setPreviewCategory('all')}
                style={{
                  padding: '0.35rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 700,
                  border: previewCategory === 'all' 
                    ? '1.5px solid var(--color-primary)' 
                    : '1.5px solid var(--color-border)',
                  backgroundColor: previewCategory === 'all' ? 'var(--color-primary)' : '#FFFFFF',
                  color: previewCategory === 'all' ? '#FFFFFF' : 'var(--color-text-main)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                All Categories ({products.length})
              </button>

              {categories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setPreviewCategory(c.id)}
                  style={{
                    padding: '0.35rem 0.85rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 700,
                    border: previewCategory === c.id 
                      ? `1.5px solid ${c.color}` 
                      : '1.5px solid var(--color-border)',
                    backgroundColor: previewCategory === c.id ? c.color : '#FFFFFF',
                    color: previewCategory === c.id ? '#FFFFFF' : 'var(--color-text-main)',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid Preview */}
          <ProductGrid
            products={previewProducts}
            onViewDetails={(product) => setSelectedProduct(product)}
            onResetFilters={() => {
              setPreviewCategory('all');
              setPreviewOrigin('all');
              setPreviewSearch('');
            }}
          />

          <div style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}>
            <Link 
              to="/products"
              className="btn btn-primary btn-lg"
              style={{
                boxShadow: '0 4px 14px rgba(123, 17, 26, 0.25)'
              }}
            >
              <span>View All {products.length} Products</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* About Store Teaser */}
      <section className="section" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="container">
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'var(--space-10)',
              alignItems: 'center'
            }}
          >
            <div>
              <span className="eyebrow">Our Story</span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.3rem)', fontWeight: 800, marginBottom: 'var(--space-4)' }}>
                Bringing the Flavors of Asia Closer
              </h2>
              <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-4)' }}>
                Toko Aysha Asian Market is your neighborhood grocery hub for authentic Asian foods, familiar comfort meals, and everyday ingredients. From spicy Korean ramyun and authentic Indonesian rendang to Thai curries and Chinese bean vermicelli, we bring the vibrant market experience directly to you.
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-6)' }}>
                We curate direct imports of original national brands, ensuring uncompromised authenticity in flavor, ingredients, and quality across every aisle.
              </p>

              <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                <Link to="/about" className="btn btn-secondary">
                  <span>Learn More About Us</span>
                  <ArrowRight size={16} />
                </Link>
                <Link to="/visit-us" className="btn btn-outline">
                  <Store size={16} />
                  <span>Store Hours & Location</span>
                </Link>
              </div>
            </div>

            {/* Visual Value Cards */}
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 'var(--space-4)'
              }}
            >
              <div 
                className="card" 
                style={{ 
                  padding: 'var(--space-5)', 
                  backgroundColor: '#FFFFFF',
                  borderColor: 'var(--color-border)'
                }}
              >
                <div style={{ color: 'var(--color-primary)', marginBottom: 'var(--space-2)' }}>
                  <ShieldCheck size={28} />
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.25rem' }}>100% Authentic</h4>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
                  Verified packaging and ingredients directly imported from Indonesia, Korea, Thailand, and China.
                </p>
              </div>

              <div 
                className="card" 
                style={{ 
                  padding: 'var(--space-5)', 
                  backgroundColor: 'var(--color-accent-light)',
                  borderColor: 'var(--color-border)'
                }}
              >
                <div style={{ color: 'var(--color-accent)', marginBottom: 'var(--space-2)' }}>
                  <ShoppingBag size={28} />
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.25rem' }}>Pan-Asian Pantry</h4>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
                  From comfort instant noodles to Thai coconut milks, sambals, and soothing teas.
                </p>
              </div>

              <div 
                className="card" 
                style={{ 
                  padding: 'var(--space-5)', 
                  backgroundColor: 'var(--color-primary-light)',
                  borderColor: 'var(--color-border)'
                }}
              >
                <div style={{ color: 'var(--color-primary)', marginBottom: 'var(--space-2)' }}>
                  <Globe2 size={28} />
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.25rem' }}>Diverse Aisles</h4>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
                  145 carefully verified products spanning 8 supermarket grocery categories.
                </p>
              </div>

              <div 
                className="card" 
                style={{ 
                  padding: 'var(--space-5)', 
                  backgroundColor: '#FFFFFF',
                  borderColor: 'var(--color-border)'
                }}
              >
                <div style={{ color: 'var(--color-accent)', marginBottom: 'var(--space-2)' }}>
                  <Store size={28} />
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.25rem' }}>Walk-in Friendly</h4>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
                  Real physical store with welcoming service, weekly restocks, and in-person assistance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Store Location & Information */}
      <section className="section" id="visit" style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid var(--color-border)' }}>
        <div className="container">
          <SectionHeading
            eyebrow="Plan Your Visit"
            title="Store Location & Hours"
            description="Come explore our aisles in person. Check our location guidelines, operating hours, and helpful visitor tips."
            actionLink="/visit-us"
            actionText="View Complete Store Guide"
          />
          <StoreInfo />
        </div>
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
