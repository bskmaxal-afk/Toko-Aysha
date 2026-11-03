import React from 'react';
import CategoryCard from './CategoryCard';
import { categories } from '../data/categories';

export default function CategoryGrid({ limit, products = [] }) {
  const displayCategories = limit ? categories.slice(0, limit) : categories;

  return (
    <div 
      className="category-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: 'var(--space-5)'
      }}
    >
      {displayCategories.map((category) => {
        const count = products.filter(
          p => p.category === category.id || p.category === category.slug
        ).length;
        return (
          <CategoryCard 
            key={category.id} 
            category={category} 
            productCount={count}
          />
        );
      })}
    </div>
  );
}
