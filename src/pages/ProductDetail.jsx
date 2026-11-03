import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Check, 
  XCircle,
  Tag, 
  ChevronRight,
  Share2
} from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import ProductImage from '../components/ProductImage';
import ProductCard from '../components/ProductCard';
import ProductDetailModal from '../components/ProductDetailModal';
import { getCountryFlag } from '../utils/countryFlags';
import { getProductById, getPublishedProducts, fetchProductById, fetchPublishedProducts } from '../services/productService';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [modalProduct, setModalProduct] = useState(null);
  const [copied, setCopied] = useState(false);

  // Find product by id or slug with live Supabase support
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(() => getProductById(id));

  useEffect(() => {
    setLoading(true);
    fetchProductById(id)
      .then((p) => {
        setProduct(p);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', fontWeight: 600 }}>
          Loading authentic product details...
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '480px' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--color-text-main, #221819)' }}>
            Product Not Found
          </h2>
          <p style={{ color: 'var(--color-text-secondary, #685A5B)', marginBottom: 'var(--space-6, 1.5rem)' }}>
            The item you are looking for is either no longer available or the catalog link is incorrect.
          </p>
          <Link to="/products" className="btn btn-primary">
            <ArrowLeft size={16} />
            <span>Return to Catalog</span>
          </Link>
        </div>
      </div>
    );
  }

  const brand = product.brand;
  const categoryName = product.categoryName;
  const variant = product.variant;
  const packageSize = product.packageSize;
  const origin = product.origin;
  const flag = product.countryFlag || getCountryFlag(origin);
  const isAvailable = product.isAvailable;
  const description = product.description;

  // Related products from the same category
  const allPublished = getPublishedProducts();
  const relatedProducts = allPublished
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
    <div className="product-detail-page section" style={{ backgroundColor: 'var(--color-bg, #FAF7F2)', minHeight: '85vh' }}>
      <div className="container">
        {/* Breadcrumb Navigation */}
        <Breadcrumb 
          items={[
            { label: 'Products', path: '/products' },
            ...(categoryName ? [{ label: categoryName, path: `/products?category=${product.category}` }] : []),
            { label: product.name }
          ]}
        />

        {/* Back Link */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="btn btn-secondary btn-sm"
          style={{ marginBottom: 'var(--space-6, 1.5rem)', display: 'inline-flex', gap: '0.4rem', alignItems: 'center' }}
        >
          <ArrowLeft size={15} />
          <span>Back to Products</span>
        </button>

        {/* Main Product Details Card */}
        <div 
          className="card"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl, 20px)',
            overflow: 'hidden',
            border: '1px solid var(--color-border, #E8E0D6)',
            marginBottom: 'var(--space-12, 3rem)',
            boxShadow: 'var(--shadow-md, 0 4px 12px rgba(36, 36, 36, 0.06))'
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
                backgroundColor: '#FAF8F5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 'var(--space-8, 2rem)',
                borderRight: '1px solid var(--color-border, #E8E0D6)',
                position: 'relative'
              }}
            >
              <div style={{ width: '100%', maxWidth: '420px' }}>
                <ProductImage 
                  product={product} 
                  aspectRatio="1/1"
                  style={{ width: '100%', borderRadius: 'var(--radius-lg, 14px)' }}
                />
              </div>
            </div>

            {/* Right: Detailed Product Specification */}
            <div 
              style={{
                padding: 'var(--space-10, 2.5rem) var(--space-8, 2rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 'var(--space-6, 1.5rem)'
              }}
            >
              <div>
                {/* Meta Badges Row: Availability, Brand, Category, Origin */}
                <div 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem', 
                    flexWrap: 'wrap', 
                    marginBottom: 'var(--space-4, 1rem)' 
                  }}
                >
                  {/* Availability Badge */}
                  {isAvailable ? (
                    <span 
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        backgroundColor: '#EDF7F1',
                        color: '#1B6839',
                        border: '1px solid #C6E7D2',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px'
                      }}
                    >
                      <Check size={13} strokeWidth={3} />
                      <span>Available</span>
                    </span>
                  ) : (
                    <span 
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        backgroundColor: '#F1F5F9',
                        color: '#64748B',
                        border: '1px solid #CBD5E1',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px'
                      }}
                    >
                      <XCircle size={13} strokeWidth={2.5} />
                      <span>Currently Unavailable</span>
                    </span>
                  )}

                  {/* Brand Badge */}
                  {brand && (
                    <span 
                      className="badge badge-brand" 
                      style={{ 
                        fontSize: '0.75rem', 
                        fontWeight: 800,
                        backgroundColor: 'var(--color-bg, #FAF7F2)',
                        color: 'var(--color-primary, #7B111A)',
                        border: '1px solid var(--color-border, #E8E0D6)',
                        padding: '0.25rem 0.7rem',
                        borderRadius: '9999px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em'
                      }}
                    >
                      {brand}
                    </span>
                  )}

                  {/* Category Badge */}
                  {categoryName && (
                    <Link
                      to={`/products?category=${product.category}`}
                      className="badge" 
                      style={{ 
                        backgroundColor: 'var(--color-bg, #FAF7F2)', 
                        color: 'var(--color-text-secondary, #685A5B)',
                        border: '1px solid var(--color-border, #E8E0D6)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        textDecoration: 'none',
                        padding: '0.25rem 0.7rem',
                        borderRadius: '9999px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem'
                      }}
                    >
                      <Tag size={12} />
                      <span>{categoryName}</span>
                    </Link>
                  )}

                  {/* Country of Origin Badge */}
                  {origin && (
                    <span 
                      title={`Country of Origin: ${origin}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        backgroundColor: '#FFFFFF',
                        color: 'var(--color-text-secondary, #685A5B)',
                        border: '1px solid var(--color-border, #E8E0D6)',
                        padding: '0.25rem 0.7rem',
                        borderRadius: '9999px'
                      }}
                    >
                      <span>{flag}</span>
                      <span>Product of {origin}</span>
                    </span>
                  )}
                </div>

                {/* Product Full Name (Hero Heading) */}
                <h1 
                  style={{
                    fontSize: 'clamp(1.75rem, 3vw, 2.35rem)',
                    fontWeight: 800,
                    color: 'var(--color-text-main, #221819)',
                    lineHeight: 1.2,
                    marginBottom: 'var(--space-4, 1rem)',
                    letterSpacing: '-0.02em'
                  }}
                >
                  {product.name}
                </h1>

                {/* Specifications Bar: Variant & Package Size */}
                {(variant || packageSize) && (
                  <div 
                    style={{ 
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '1rem',
                      fontSize: 'var(--text-sm, 0.875rem)', 
                      color: 'var(--color-text-secondary, #685A5B)', 
                      marginBottom: 'var(--space-6, 1.5rem)',
                      padding: '0.75rem 1rem',
                      backgroundColor: 'var(--color-bg, #FAF7F2)',
                      borderRadius: 'var(--radius-lg, 14px)',
                      border: '1px solid var(--color-border, #E8E0D6)'
                    }}
                  >
                    {variant && (
                      <div>
                        <span style={{ fontWeight: 600 }}>Variant / Flavor: </span>
                        <strong style={{ color: 'var(--color-text-main, #221819)' }}>{variant}</strong>
                      </div>
                    )}

                    {packageSize && (
                      <div>
                        <span style={{ fontWeight: 600 }}>Package Size / Weight: </span>
                        <strong style={{ color: 'var(--color-text-main, #221819)' }}>{packageSize}</strong>
                      </div>
                    )}
                  </div>
                )}

                {/* Product Description */}
                {description && (
                  <div style={{ marginBottom: 'var(--space-6, 1.5rem)' }}>
                    <h3 
                      style={{ 
                        fontSize: '0.85rem', 
                        fontWeight: 800, 
                        textTransform: 'uppercase', 
                        letterSpacing: '0.04em',
                        color: 'var(--color-text-secondary, #685A5B)', 
                        marginBottom: '0.5rem' 
                      }}
                    >
                      Product Description
                    </h3>
                    <p 
                      style={{ 
                        fontSize: 'var(--text-base, 1rem)', 
                        color: 'var(--color-text-main, #221819)', 
                        lineHeight: 1.7 
                      }}
                    >
                      {description}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-4, 1rem)',
                  paddingTop: 'var(--space-6, 1.5rem)',
                  borderTop: '1px solid var(--color-border, #E8E0D6)',
                  flexWrap: 'wrap'
                }}
              >
                <Link
                  to="/visit-us"
                  className="btn btn-primary btn-lg"
                  style={{ flex: 1, minWidth: '220px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                  <MapPin size={18} />
                  <span>Visit Store in Athens</span>
                </Link>

                <button
                  type="button"
                  onClick={handleShare}
                  className="btn btn-secondary btn-lg"
                  aria-label="Share product"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
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
          <div style={{ marginTop: 'var(--space-12, 3rem)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-6, 1.5rem)' }}>
              <div>
                <span className="eyebrow">Explore More</span>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-main, #221819)' }}>
                  More in {categoryName || 'this Category'}
                </h2>
              </div>
              <Link
                to={`/products?category=${product.category}`}
                className="btn btn-secondary btn-sm"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
              >
                <span>View All {categoryName}</span>
                <ChevronRight size={14} />
              </Link>
            </div>

            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: 'var(--space-5, 1.25rem)'
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
