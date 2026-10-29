# Toko Aysha — Authentic Indonesian Groceries & Asian Market

A modern Indonesian supermarket catalog website built with React, Vite, and Lucide Icons. Designed for Indonesian diaspora and international customers discovering authentic Indonesian culinary products.

## Features

- **Product Catalog**: Comprehensive catalog of 94 authentic Indonesian grocery products across 8 supermarket categories.
- **Search & Filter**: Real-time multi-attribute search (by name, brand, variant) and category filters.
- **100% Real Product Imagery**: Authentic packaging photos for every single item on the store shelf.
- **Store Information**: Clean physical store location, operational hours, visiting guide, and contact channels.
- **Responsive Design**: Mobile-first, fully responsive UI following the Modern Indonesian Grocery Store visual identity.

## Tech Stack

- **Framework**: React 19 + Vite 6
- **Icons**: Lucide React
- **Styles**: Custom CSS Variables & Responsive Design System

## Project Structure

```
Toko Aysha Asian Market/
├── public/                 # Static assets
│   ├── favicon.svg         # Store favicon
│   ├── icons.svg           # Sprite icons
│   └── images/
│       ├── categories/     # Category SVGs
│       ├── hero/           # Hero section graphics
│       └── products/       # Real product packaging images (JPG/PNG/WebP)
├── src/
│   ├── components/         # Reusable UI components
│   ├── data/               # Product catalog, categories, store config
│   ├── pages/              # Application views (Home, Products, About, VisitUs)
│   ├── styles/             # Global styles, variables, responsive rules
│   ├── utils/              # Helper utilities
│   ├── App.jsx             # Main router & layout
│   └── main.jsx            # React root mount
├── dist/                   # Production build output
├── index.html              # HTML entry point
├── package.json            # Dependencies & scripts
└── vite.config.js          # Vite configuration
```

## Getting Started

### Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```
