'use client';

import Link from 'next/link';
import { useState } from 'react';

interface ShopSidebarProps {
    currentCategory?: string;
    currentGenre?: string;
    availableGenres?: string[];

    currentSort?: string;
    onSortChange?: (sort: string) => void;

    // New Filter Props
    currentPriceRange?: string; // 'under-25', '25-50', '50-plus'
    onPriceChange?: (range: string) => void;
    currentMinRating?: number;
    onRatingChange?: (rating: number) => void;
}

export default function ShopSidebar({
    currentCategory,
    currentGenre,
    availableGenres = [],
    currentSort,
    onSortChange,
    currentPriceRange,
    onPriceChange,
    currentMinRating,
    onRatingChange
}: ShopSidebarProps) {
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    return (
        <div className="w-full md:w-64 flex-shrink-0 animate-fade-in relative z-10">
            {/* Mobile Filter Toggle */}
            <button
                className="md:hidden w-full bg-[#111] border border-white/10 p-4 rounded-xl flex items-center justify-between text-left mb-6 hover:bg-white/5 transition-colors"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
                <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                    <span className="font-bold text-sm uppercase tracking-wider text-white">
                        Filters & Sort
                    </span>
                </div>
                <span className={`transform transition-transform duration-300 text-gray-400 ${isMobileOpen ? 'rotate-180' : ''}`}>
                    ▼
                </span>
            </button>

            <div className={`
                space-y-10 
                ${isMobileOpen ? 'block' : 'hidden'} 
                md:block 
                md:sticky md:top-32
            `}>
                {/* 1. Browse Categories */}
                <div className="space-y-4">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest is-mac-font">Browse</h3>
                    <div className="flex flex-col gap-1">
                        <Link
                            href="/shop"
                            className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors text-left ${!currentCategory ? 'bg-accent text-white shadow-lg shadow-accent/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                        >
                            All Products
                        </Link>
                        <Link
                            href="/shop/ableton-templates"
                            className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors text-left ${currentCategory === 'ableton-templates' ? 'bg-accent text-white shadow-lg shadow-accent/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                        >
                            Ableton Templates
                        </Link>
                        <Link
                            href="/shop/serum-presets"
                            className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors text-left ${currentCategory === 'serum-presets' ? 'bg-accent text-white shadow-lg shadow-accent/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                        >
                            Serum Presets
                        </Link>
                        <Link
                            href="/shop/trinkets"
                            className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors text-left ${currentCategory === 'trinkets' ? 'bg-accent text-white shadow-lg shadow-accent/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                        >
                            Trinkets
                        </Link>
                    </div>
                </div>

                {/* 2. Filter By Genre (Using Links for SEO) */}
                {availableGenres.length > 0 && currentCategory && (
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest is-mac-font">Filter By Genre</h3>
                        <div className="flex flex-col gap-2">
                            <Link
                                href={`/shop/${currentCategory}`}
                                className={`flex items-center gap-3 group cursor-pointer w-full text-left`}
                            >
                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${!currentGenre ? 'border-accent bg-accent' : 'border-gray-600 group-hover:border-gray-400'}`}>
                                    {!currentGenre && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                                </div>
                                <span className={`text-sm font-medium transition-colors ${!currentGenre ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'}`}>All Genres</span>
                            </Link>

                            {availableGenres.map(genre => (
                                <Link
                                    key={genre}
                                    href={`/shop/${currentCategory}/${encodeURIComponent(genre.toLowerCase())}`}
                                    className={`flex items-center gap-3 group cursor-pointer w-full text-left`}
                                >
                                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${currentGenre?.toLowerCase() === genre.toLowerCase() ? 'border-accent bg-accent' : 'border-gray-600 group-hover:border-gray-400'}`}>
                                        {currentGenre?.toLowerCase() === genre.toLowerCase() && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                                    </div>
                                    <span className={`text-sm font-medium transition-colors ${currentGenre?.toLowerCase() === genre.toLowerCase() ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'}`}>{genre}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* 3. Filter By Pricing (Client Side) */}
                {onPriceChange && (
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest is-mac-font">Price</h3>
                        <div className="space-y-2">
                            {[
                                { id: 'all', label: 'Any Price' },
                                { id: 'under-25', label: 'Under $25' },
                                { id: '25-50', label: '$25 to $50' },
                                { id: '50-plus', label: '$50 & Above' }
                            ].map((option) => (
                                <div key={option.id} className="flex items-center gap-3">
                                    <button
                                        onClick={() => onPriceChange(option.id === 'all' ? '' : option.id)}
                                        className={`flex items-center gap-3 group text-sm font-medium transition-colors ${currentPriceRange === option.id || (!currentPriceRange && option.id === 'all') ? 'text-white' : 'text-gray-400 hover:text-gray-300'}`}
                                    >
                                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${currentPriceRange === option.id || (!currentPriceRange && option.id === 'all') ? 'border-accent bg-accent' : 'border-gray-600 group-hover:border-gray-400'}`}>
                                            {(currentPriceRange === option.id || (!currentPriceRange && option.id === 'all')) && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                                        </div>
                                        {option.label}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 4. Filter By Rating (Client Side) */}
                {onRatingChange && (
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest is-mac-font">Customer Review</h3>
                        <div className="space-y-2">
                            {[4, 3, 2, 1].map((rating) => (
                                <button
                                    key={rating}
                                    onClick={() => onRatingChange(currentMinRating === rating ? 0 : rating)}
                                    className={`flex items-center gap-2 text-sm font-medium transition-colors group ${currentMinRating === rating ? 'text-white' : 'text-gray-400 hover:text-gray-300'}`}
                                >
                                    <div className="flex text-yellow-500">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className={i < rating ? 'opacity-100' : 'opacity-20 text-gray-500'}>★</span>
                                        ))}
                                    </div>
                                    <span className="text-xs opacity-70 group-hover:opacity-100">& Up</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* 5. Sort By (Client Side State) */}
                {onSortChange && currentSort && (
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest is-mac-font">Sort By</h3>
                        <div className="space-y-2">
                            {[
                                { id: 'popular', label: 'Most Popular' },
                                { id: 'newest', label: 'Newest Arrivals' },
                                { id: 'price-asc', label: 'Price: Low to High' },
                                { id: 'price-desc', label: 'Price: High to Low' }
                            ].map((option) => (
                                <button
                                    key={option.id}
                                    onClick={() => onSortChange(option.id)}
                                    className={`block w-full text-left text-sm font-medium transition-colors ${currentSort === option.id ? 'text-accent' : 'text-gray-400 hover:text-white'}`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
