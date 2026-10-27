import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  Store, 
  ShieldCheck, 
  HeartHandshake, 
  ShoppingBag,
  Flame,
  Search
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

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [previewCategory, setPreviewCategory] = useState('all');
  const [previewSearch, setPreviewSearch] = useState('');

  // 1. Featured Products (Customer Favorites - ~8 items)
  const customerFavorites = products.filter(p => p.featured).slice(0, 8);

  // 2. Interactive Catalog Preview Filter
  const previewProducts = products.filter(p => {
    const matchesCategory = previewCategory === 'all' || p.category === previewCategory;
    const matchesSearch = !previewSearch || 
      p.name.toLowerCase().includes(previewSearch.toLowerCase()) ||
      p.brand.toLowerCase().includes(previewSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  }).slice(0, 8);

  return (
    <div className="home-page">
      {/* C. Hero Banner Utama */}
      <Hero />

      {/* D. Kategori Produk (Shop by Category) */}
      <section className="section" id="categories" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="container">
          <SectionHeading
            eyebrow="Browse Our Aisles"
            title="Shop by Category"
            description="Find the flavors and essentials you love across our authentic Indonesian pantry selection."
            actionLink="/products"
            actionText="View All Products"
          />
          <CategoryGrid />
        </div>
      </section>

      {/* E. Produk Unggulan (Customer Favorites) */}
      <section className="section" style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <SectionHeading
            eyebrow="Popular Indonesian Items"
            title="Customer Favorites"
            description="Explore popular picks from Indonesia — from classic Indomie Mi Goreng and Sambal Extra Pedas to sweet Bango soy sauce."
            actionLink="/products"
            actionText="Explore Entire Catalog"
          />
          <ProductGrid
            products={customerFavorites}
            onViewDetails={(product) => setSelectedProduct(product)}
          />
        </div>
      </section>

      {/* F. Banner Promosi Visual (Branding Banner) */}
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
                <span>Authentic Taste Guaranteed</span>
              </div>
              <h2 
                style={{
                  fontSize: 'clamp(1.75rem, 3vw, 2.35rem)',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  marginBottom: 'var(--space-2)'
                }}
              >
                Bring Indonesian Flavors to Your Kitchen.
              </h2>
              <p 
                style={{
                  fontSize: 'var(--text-base)',
                  color: 'rgba(255, 255, 255, 0.85)',
                  lineHeight: 1.55
                }}
              >
                From everyday pantry essentials to your favorite local snacks, discover more of Indonesia at Toko Aysha.
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
                <span>Browse All Products</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* G. Preview Katalog Produk (Interactive Catalog Preview) */}
      <section className="section" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="container">
          <SectionHeading
            eyebrow="Interactive Catalog Preview"
            title="Explore Our Products"
            description="Quickly search by product name or switch categories to preview what we carry on our shelves."
            actionLink="/products"
            actionText="Go to Full Products Page"
          />

          {/* Interactive filter & search controls on homepage */}
          <div 
            style={{
              backgroundColor: '#FFFFFF',
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
                placeholder="Type to filter preview (e.g. Indomie, Sambal, Kopi, Rice)..."
                aria-label="Filter preview"
                className="input-text"
                style={{
                  paddingLeft: '2.5rem',
                  fontSize: 'var(--text-sm)',
                  borderRadius: 'var(--radius-full)'
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
              setPreviewSearch('');
            }}
          />

          <div style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}>
            <Link 
              to="/products"
              className="btn btn-primary btn-lg"
              style={{
                boxShadow: '0 4px 14px rgba(199, 70, 43, 0.25)'
              }}
            >
              <span>View All {products.length} Products</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* H. Tentang Toko (About Store Teaser) */}
      <section className="section" style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid var(--color-border)' }}>
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
                Bringing Indonesia Closer
              </h2>
              <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-4)' }}>
                Your destination for Indonesian groceries, familiar flavors, and everyday essentials. Whether you are craving the nostalgic taste of comfort noodles from home or discovering the vibrant world of Indonesian spices and sambals for the first time, Toko Aysha brings the authentic archipelago market experience right to you.
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-6)' }}>
                We curate direct imports of original national brands, ensuring uncompromised authenticity in flavor, ingredients, and quality.
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
                  backgroundColor: 'var(--color-bg)',
                  borderColor: 'var(--color-border)'
                }}
              >
                <div style={{ color: 'var(--color-primary)', marginBottom: 'var(--space-2)' }}>
                  <ShieldCheck size={28} />
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.25rem' }}>100% Genuine</h4>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
                  Authentic packaging and verified ingredients sourced directly from Indonesia.
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
                <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.25rem' }}>Full Pantry</h4>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
                  From instant comfort meals to deep cooking spices and healing herbal oils.
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
                  <Flame size={28} />
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.25rem' }}>Real Spice</h4>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
                  Legendary heat levels: Extra Pedas sambal, Balado crisps, and chili pastes.
                </p>
              </div>

              <div 
                className="card" 
                style={{ 
                  padding: 'var(--space-5)', 
                  backgroundColor: 'var(--color-bg)',
                  borderColor: 'var(--color-border)'
                }}
              >
                <div style={{ color: 'var(--color-accent)', marginBottom: 'var(--space-2)' }}>
                  <HeartHandshake size={28} />
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.25rem' }}>Warm Service</h4>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
                  Friendly Indonesian hospitality ready to guide your ingredient selections.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* I. Informasi Lokasi Toko (Come Visit Us) */}
      <section className="section" style={{ backgroundColor: 'var(--color-bg)', borderTop: '1px solid var(--color-border)' }}>
        <div className="container">
          <SectionHeading
            eyebrow="Physical Supermarket"
            title="Come Visit Us"
            description="Find our physical store, check opening hours, and plan your grocery visit."
            centered={true}
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
