'use client';

import { useState, useMemo } from 'react';
import { Product } from '@/lib/shop-data';
import ShopSidebar from './sidebar';
import { ProductGrid } from './components';
import Link from 'next/link';

interface ShopCategoryViewProps {
    initialProducts: Product[];
    category: string;
    currentGenre?: string;
    availableGenres: string[];
}

export default function ShopCategoryView({
    initialProducts,
    category,
    currentGenre,
    availableGenres
}: ShopCategoryViewProps) {
    const [sortBy, setSortBy] = useState<string>('popular');
    const [priceRange, setPriceRange] = useState('');
    const [minRating, setMinRating] = useState(0);

    // Filter Logic
    const filteredProducts = useMemo(() => {
        let result = [...initialProducts];

        // 1. Genre Filter (Handled by Parent/URL mostly, but strictly enforced here if needed)
        if (currentGenre) {
            result = result.filter(p => p.genre === currentGenre);
        }

        // 2. Price Filter
        if (priceRange) {
            result = result.filter(p => {
                if (priceRange === 'under-25') return p.price < 25;
                if (priceRange === '25-50') return p.price >= 25 && p.price <= 50;
                if (priceRange === '50-plus') return p.price > 50;
                return true;
            });
        }

        // 3. Rating Filter
        if (minRating > 0) {
            result = result.filter(p => (p.rating || 0) >= minRating);
        }

        // 4. Sort
        result.sort((a, b) => {
            switch (sortBy) {
                case 'price-asc': return a.price - b.price;
                case 'price-desc': return b.price - a.price;
                case 'newest': return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                case 'popular': default: return (b.reviewCount || 0) - (a.reviewCount || 0);
            }
        });

        return result;
    }, [initialProducts, currentGenre, priceRange, minRating, sortBy]);

    const displayTitle = currentGenre
        ? `${currentGenre} ${category.replace('-', ' ')}`.replace(/\b\w/g, l => l.toUpperCase())
        : category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-accent selection:text-white pt-24 pb-20">
            <div className="container mx-auto px-4">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-white/10 pb-6 gap-6">
                    <div>
                        {/* Breadcrumbs - Matching Product Page Style */}
                        <div className="text-sm text-gray-400 mb-4 flex items-center gap-2">
                            <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
                            <span className="text-gray-600">›</span>
                            <span className="font-bold text-white capitalize">{category.replace('-', ' ')}</span>
                            {currentGenre && (
                                <>
                                    <span className="text-gray-600">›</span>
                                    <span className="font-bold text-white">{currentGenre}</span>
                                </>
                            )}
                        </div>

                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-2">
                            {displayTitle}
                        </h1>
                        <p className="text-gray-400 max-w-xl text-lg">
                            {filteredProducts.length} results found
                        </p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8 relative items-start">

                    {/* Left Sidebar */}
                    <ShopSidebar
                        currentCategory={category}
                        currentGenre={currentGenre}
                        availableGenres={availableGenres}
                        currentSort={sortBy}
                        onSortChange={setSortBy}
                        currentPriceRange={priceRange}
                        onPriceChange={setPriceRange}
                        currentMinRating={minRating}
                        onRatingChange={setMinRating}
                    />

                    {/* Main Content */}
                    <main className="flex-1 w-full min-w-0">
                        {filteredProducts.length > 0 ? (
                            <ProductGrid products={filteredProducts} />
                        ) : (
                            <div className="py-20 text-center border border-dashed border-white/10 rounded-2xl">
                                <p className="text-gray-500 text-lg">No items found matching your filters.</p>
                                <button
                                    onClick={() => { setPriceRange(''); setMinRating(0); }}
                                    className="mt-4 text-accent hover:underline text-sm uppercase tracking-wider font-bold"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
