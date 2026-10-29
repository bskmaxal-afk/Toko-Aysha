import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';

export default function SearchBar({ 
  initialValue = '', 
  onSearch, 
  placeholder = 'Search Indonesian groceries...',
  variant = 'header',
  className = ''
}) {
  const [query, setQuery] = useState(initialValue);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (onSearch) {
      onSearch(trimmed);
    } else {
      // Default header behavior: navigate to products page with search param
      if (trimmed) {
        navigate(`/products?search=${encodeURIComponent(trimmed)}`);
      } else {
        navigate('/products');
      }
    }
  };

  const handleClear = () => {
    setQuery('');
    if (onSearch) {
      onSearch('');
    }
  };

  const isHeader = variant === 'header';

  return (
    <form 
      onSubmit={handleSubmit}
      className={`search-bar-form ${className}`}
      role="search"
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        maxWidth: isHeader ? '420px' : '640px'
      }}
    >
      <div 
        style={{
          position: 'absolute',
          left: isHeader ? '0.85rem' : '1.1rem',
          color: 'var(--color-text-secondary)',
          display: 'flex',
          alignItems: 'center',
          pointerEvents: 'none'
        }}
      >
        <Search size={isHeader ? 18 : 20} />
      </div>

      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          if (onSearch && variant !== 'header') {
            onSearch(e.target.value);
          }
        }}
        placeholder={placeholder}
        aria-label="Search products"
        style={{
          width: '100%',
          paddingLeft: isHeader ? '2.5rem' : '3rem',
          paddingRight: query ? '4.5rem' : '2rem',
          paddingTop: isHeader ? '0.62rem' : '0.85rem',
          paddingBottom: isHeader ? '0.62rem' : '0.85rem',
          backgroundColor: isHeader ? 'var(--color-bg)' : 'var(--color-surface)',
          border: '1.5px solid var(--color-border)',
          borderRadius: 'var(--radius-full)',
          fontSize: isHeader ? 'var(--text-sm)' : 'var(--text-base)',
          color: 'var(--color-text-main)',
          outline: 'none',
          transition: 'all var(--transition-fast)',
          boxShadow: isHeader ? 'none' : 'var(--shadow-sm)'
        }}
        onFocus={(e) => {
          e.target.style.borderColor = 'var(--color-primary)';
          e.target.style.backgroundColor = '#FFFFFF';
          e.target.style.boxShadow = '0 0 0 3px rgba(123, 17, 26, 0.15)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = 'var(--color-border)';
          e.target.style.backgroundColor = isHeader ? 'var(--color-bg)' : 'var(--color-surface)';
          e.target.style.boxShadow = isHeader ? 'none' : 'var(--shadow-sm)';
        }}
      />

      {query && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          style={{
            position: 'absolute',
            right: isHeader ? '2.8rem' : '3.4rem',
            background: 'none',
            border: 'none',
            color: 'var(--color-text-secondary)',
            cursor: 'pointer',
            padding: '0.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={16} />
        </button>
      )}

      <button
        type="submit"
        aria-label="Submit search"
        style={{
          position: 'absolute',
          right: isHeader ? '0.35rem' : '0.45rem',
          backgroundColor: 'var(--color-primary)',
          color: 'var(--color-text-inverse)',
          border: 'none',
          borderRadius: 'var(--radius-full)',
          width: isHeader ? '30px' : '38px',
          height: isHeader ? '30px' : '38px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'background-color var(--transition-fast)'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primary)'}
      >
        <Search size={isHeader ? 14 : 16} />
      </button>
    </form>
  );
}
