'use client';

import Link from 'next/link';
import { ProductGrid } from './components';
import { useState, useEffect } from 'react';

import { Product } from '@/lib/shop-data';

import ShopSidebar from './sidebar';

export default function ShopIndex() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('popular');

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error('API returned non-array data:', data);
          setProducts([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch products:', err);
        setProducts([]);
        setLoading(false);
      });
  }, []);

  const [priceRange, setPriceRange] = useState('');
  const [minRating, setMinRating] = useState(0);

  const filteredProducts = products.filter(product => {
    // Price Filter
    if (priceRange === 'under-25' && product.price >= 25) return false;
    if (priceRange === '25-50' && (product.price < 25 || product.price > 50)) return false;
    if (priceRange === '50-plus' && product.price <= 50) return false;

    // Rating Filter
    if (minRating > 0 && (product.rating || 0) < minRating) return false;

    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return (b.reviewCount || 0) - (a.reviewCount || 0);
      case 'newest':
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      default:
        return 0;
    }
  });


  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-accent selection:text-white pt-24 pb-20">
      <div className="container mx-auto px-4">

        {/* Header - Cleaner & Left Aligned */}
        <div className="mb-12 border-b border-white/10 pb-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 animate-fade-in-up">
            All Products
          </h1>
          <p className="text-gray-400 text-lg font-medium max-w-2xl animate-fade-in-up delay-100">
            Premium production tools for modern electronic music.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Sidebar */}
          <ShopSidebar
            currentSort={sortBy}
            onSortChange={setSortBy}
            currentPriceRange={priceRange}
            onPriceChange={setPriceRange}
            currentMinRating={minRating}
            onRatingChange={setMinRating}
          />

          {/* Product Grid */}
          <div className="flex-1 min-h-[500px]">
            <ProductGrid products={sortedProducts} />
          </div>
        </div>

      </div>
    </div>
  );
}
