import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Check, 
  AlertCircle, 
  Tag, 
  Store, 
  Sparkles, 
  ChevronRight,
  Share2
} from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import ProductImage from '../components/ProductImage';
import ProductCard, { getCountryFlag } from '../components/ProductCard';
import ProductDetailModal from '../components/ProductDetailModal';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { formatPrice, hasLivePrice } from '../utils/formatPrice';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [modalProduct, setModalProduct] = useState(null);
  const [copied, setCopied] = useState(false);

  // Find product by id
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '480px' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            Product Not Found
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
            The item you are looking for is either no longer available or the address link is incorrect.
          </p>
          <Link to="/products" className="btn btn-primary">
            <ArrowLeft size={16} />
            <span>Return to Catalog</span>
          </Link>
        </div>
      </div>
    );
  }

  const category = categories.find(c => c.id === product.category);
  const showLivePrice = hasLivePrice(product.price);
  const priceDisplay = formatPrice(product.price);

  // Related products from the same category
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="product-detail-page section" style={{ backgroundColor: 'var(--color-bg)', minHeight: '85vh' }}>
      <div className="container">
        {/* Breadcrumb Navigation */}
        <Breadcrumb 
          items={[
            { label: 'Products', path: '/products' },
            ...(category ? [{ label: category.name, path: `/products?category=${category.id}` }] : []),
            { label: product.name }
          ]}
        />

        {/* Back Link */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="btn btn-secondary btn-sm"
          style={{ marginBottom: 'var(--space-6)', display: 'inline-flex', gap: '0.4rem' }}
        >
          <ArrowLeft size={15} />
          <span>Back to Products</span>
        </button>

        {/* Main Product Details Card */}
        <div 
          className="card"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            border: '1px solid var(--color-border)',
            marginBottom: 'var(--space-12)',
            boxShadow: 'var(--shadow-md)'
          }}
        >
          <div 
            className="product-detail-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.25fr',
              alignItems: 'stretch'
            }}
          >
            {/* Left: Product Image Area */}
            <div 
              style={{
                backgroundColor: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 'var(--space-8)',
                borderRight: '1px solid var(--color-border)',
                position: 'relative'
              }}
            >
              <div style={{ width: '100%', maxWidth: '420px' }}>
                <ProductImage 
                  product={product} 
                  aspectRatio="1/1"
                  style={{ width: '100%', borderRadius: 'var(--radius-lg)' }}
                />
              </div>

              {product.featured && (
                <span 
                  style={{
                    position: 'absolute',
                    top: '1.25rem',
                    left: '1.25rem',
                    backgroundColor: 'var(--color-primary)',
                    color: '#FFFFFF',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    padding: '0.3rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase'
                  }}
                >
                  Customer Favorite
                </span>
              )}
            </div>

            {/* Right: Detailed Product Specification */}
            <div 
              style={{
                padding: 'var(--space-10) var(--space-8)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 'var(--space-6)'
              }}
            >
              <div>
                {/* Meta badges */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: 'var(--space-4)' }}>
                  <span className="badge badge-brand" style={{ fontSize: '0.75rem', fontWeight: 800 }}>
                    {product.brand}
                  </span>

                  {category && (
                    <Link
                      to={`/products?category=${category.id}`}
                      className="badge" 
                      style={{ 
                        backgroundColor: category.bgTint, 
                        color: category.color,
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textDecoration: 'none'
                      }}
                    >
                      <Tag size={12} />
                      {category.name}
                    </Link>
                  )}

                  <span className="badge badge-stock" style={{ fontSize: '0.75rem', fontWeight: 700 }}>
                    <Check size={13} strokeWidth={3} />
                    In Store Stock
                  </span>
                </div>

                {/* Product Full Name */}
                <h1 
                  style={{
                    fontSize: 'clamp(1.75rem, 3vw, 2.35rem)',
                    fontWeight: 800,
                    color: 'var(--color-text-main)',
                    lineHeight: 1.2,
                    marginBottom: 'var(--space-3)',
                    letterSpacing: '-0.02em'
                  }}
                >
                  {product.name}
                </h1>

                {/* Subtitle spec */}
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
                  Net Packaging: <strong style={{ color: 'var(--color-text-main)' }}>{product.packageSize}</strong>
                  {product.origin && ` • ${getCountryFlag(product.origin)} Country of Origin: ${product.origin}`}
                </p>

                {/* Pricing Block */}
                <div 
                  style={{
                    backgroundColor: 'var(--color-bg)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--space-4) var(--space-6)',
                    border: '1px solid var(--color-border)',
                    marginBottom: 'var(--space-6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 'var(--space-3)'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-secondary)' }}>
                      Store Retail Price
                    </div>
                    <div style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                      {priceDisplay}
                    </div>
                  </div>

                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-accent)', fontWeight: 600 }}>
                    Official in-store grocery pricing
                  </div>
                </div>

                {/* Product Description */}
                <div style={{ marginBottom: 'var(--space-5)' }}>
                  <h3 style={{ fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-text-secondary)', marginBottom: '0.4rem' }}>
                    Description
                  </h3>
                  <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-main)', lineHeight: 1.65 }}>
                    {product.description}
                  </p>
                </div>

                {/* Preparation Guide if available */}
                {product.preparation && (
                  <div style={{ marginBottom: 'var(--space-5)', backgroundColor: 'var(--color-surface-soft)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                    <h4 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '0.25rem' }}>
                      Preparation / Serving Suggestion
                    </h4>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-main)', lineHeight: 1.5 }}>
                      {product.preparation}
                    </p>
                  </div>
                )}

                {/* Ingredients if known */}
                {product.ingredients && (
                  <div style={{ marginBottom: 'var(--space-4)' }}>
                    <h3 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-text-secondary)', marginBottom: '0.35rem' }}>
                      Ingredients
                    </h3>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
                      {product.ingredients}
                    </p>
                  </div>
                )}

                {/* Allergen advisory */}
                {product.allergens && (
                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.65rem',
                      backgroundColor: '#FEF3C7',
                      border: '1px solid #FDE68A',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      marginBottom: 'var(--space-4)'
                    }}
                  >
                    <AlertCircle size={18} style={{ color: '#D97706', flexShrink: 0, marginTop: '2px' }} />
                    <div style={{ fontSize: '0.8rem', color: '#92400E', lineHeight: 1.45 }}>
                      <strong>Allergen Advice:</strong> {product.allergens}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-4)',
                  paddingTop: 'var(--space-6)',
                  borderTop: '1px solid var(--color-border)',
                  flexWrap: 'wrap'
                }}
              >
                <Link
                  to="/visit-us"
                  className="btn btn-primary btn-lg"
                  style={{ flex: 1, minWidth: '220px' }}
                >
                  <MapPin size={18} />
                  <span>Visit Store to Purchase</span>
                </Link>

                <button
                  type="button"
                  onClick={handleShare}
                  className="btn btn-secondary btn-lg"
                  aria-label="Share product"
                >
                  <Share2 size={16} />
                  <span>{copied ? 'Link Copied!' : 'Share'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products from Same Category */}
        {relatedProducts.length > 0 && (
          <div style={{ marginTop: 'var(--space-12)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-6)' }}>
              <div>
                <span className="eyebrow">Explore More</span>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>
                  More from {category?.name || 'this Category'}
                </h2>
              </div>
              <Link
                to={`/products?category=${product.category}`}
                className="btn btn-secondary btn-sm"
              >
                <span>View All {category?.name}</span>
                <ChevronRight size={14} />
              </Link>
            </div>

            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: 'var(--space-5)'
              }}
            >
              {relatedProducts.map(rel => (
                <ProductCard
                  key={rel.id}
                  product={rel}
                  onViewDetails={(item) => setModalProduct(item)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal for quick viewing related products */}
      {modalProduct && (
        <ProductDetailModal
          product={modalProduct}
          onClose={() => setModalProduct(null)}
        />
      )}

      {/* Responsive Inline CSS */}
      <style>{`
        @media (max-width: 860px) {
          .product-detail-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
