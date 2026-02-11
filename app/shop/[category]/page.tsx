'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { products } from '@/lib/shop-data';
import ShopCategoryView from '../category-view';

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = use(params);

    // Validate Category Exists
    if (!['ableton-templates', 'serum-presets', 'trinkets'].includes(category)) {
        notFound();
    }

    // Get products for this category
    const categoryProducts = products.filter(p => p.category === category);

    // Get unique genres for sidebar
    const genres = Array.from(new Set(categoryProducts.map(p => p.genre).filter(Boolean))) as string[];

    return (
        <ShopCategoryView
            initialProducts={categoryProducts}
            category={category}
            availableGenres={genres}
        // No currentGenre passed, so it shows all
        />
    );
}
