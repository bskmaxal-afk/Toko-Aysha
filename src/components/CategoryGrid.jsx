import React from 'react';
import CategoryCard from './CategoryCard';
import { categories } from '../data/categories';

export default function CategoryGrid({ limit }) {
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
      {displayCategories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}
