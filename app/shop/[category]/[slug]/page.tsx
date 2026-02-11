'use client';

import { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { products, Product } from '@/lib/shop-data';
import { ProductGallery, ProductInfo, BuyBox, ReviewsSection } from '../../product-components';
import ShopCategoryView from '../../category-view';



import JsonLd from '@/components/JsonLd';
import { Product as ProductSchema, WithContext } from 'schema-dts';

export default function ProductOrGenrePage({ params }: { params: Promise<{ category: string; slug: string }> }) {
    const { category, slug } = use(params);

    // Check if it's a product
    const product = products.find(p => p.slug === slug && p.category === category);

    if (product) {
        // Render Product Detail Page
        return <ProductDetailPage product={product} />;
    }

    // Check if it's a genre (by using decodeURIComponent to handle spaces/encoding if needed)
    // Note: Our sidebar links encode the genre, so we expect slug to be the encoded genre ID or name.
    // However, clean URLs usually need slug-checking.
    // Let's check against available genres in this category.
    const categoryProducts = products.filter(p => p.category === category);
    const availableGenres = Array.from(new Set(categoryProducts.map(p => p.genre).filter(Boolean))) as string[];

    // We treat the slug as the genre name (possibly URL encoded).
    const decodedSlug = decodeURIComponent(slug).toLowerCase();

    // Find the matching genre name from available genres (case-insensitive search)
    const genreMatch = availableGenres.find(g => g.toLowerCase() === decodedSlug);

    if (genreMatch) {
        // Render Genre Category Page using the Shared View
        return (
            <ShopCategoryView
                initialProducts={categoryProducts} // Pass all category products, the view handles filtering
                category={category}
                currentGenre={genreMatch} // Use the original Case-Preserved genre name for display/filtering
                availableGenres={availableGenres}
            />
        );
    }

    // Not found
    notFound();
}

function ProductDetailPage({ product }: { product: Product }) {
    // Find next/prev products in same category
    const categoryProducts = products.filter(p => p.category === product.category);
    const currentIndex = categoryProducts.findIndex(p => p.id === product.id);
    const nextProduct = categoryProducts[(currentIndex + 1) % categoryProducts.length];
    const prevProduct = categoryProducts[(currentIndex - 1 + categoryProducts.length) % categoryProducts.length];



    const productSchema: WithContext<ProductSchema> = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: product.description || `Premium ${product.category} for music producers.`,
        image: product.image ? [product.image] : [],
        sku: product.id,
        offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock"
        }
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-accent selection:text-white pt-24 pb-20">
            <JsonLd schema={productSchema} />
            <div className="container mx-auto px-4">
                {/* Breadcrumbs */}
                <div className="text-sm text-gray-400 mb-8 flex items-center gap-2">
                    <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
                    <span className="text-gray-600">›</span>
                    <Link href={`/shop/${product.category}`} className="hover:text-white transition-colors capitalize">{product.category}</Link>
                    <span className="text-gray-600">›</span>
                    <span className="font-bold text-white">{product.name}</span>
                </div>

                {/* 3-Column Layout */}
                <div className="flex flex-col lg:flex-row gap-12 relative">
                    {/* 1. Left: Gallery (40%) */}
                    <div className="w-full lg:w-2/5">
                        <ProductGallery product={product} />
                    </div>

                    {/* 2. Center: Info (35%) */}
                    <div className="w-full lg:w-1/3">
                        <ProductInfo product={product} />
                    </div>

                    {/* 3. Right: Buy Box (25%) */}
                    <div className="w-full lg:w-1/4">
                        <BuyBox product={product} />
                    </div>
                </div>

                {/* Reviews Section */}
                <ReviewsSection product={product} />

                {/* Flick Through Navigation (Retained) */}
                <div className="max-w-6xl mx-auto flex justify-between items-center border-t border-white/10 mt-24 pt-8">
                    <Link href={`/shop/${prevProduct.category}/${prevProduct.slug}`} className="group flex items-center gap-4 text-left p-4 rounded-xl hover:bg-white/5 transition-colors">
                        <div className="border border-white/10 p-2 rounded-full group-hover:bg-accent group-hover:text-black group-hover:border-accent transition-colors text-white">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                        </div>
                        <div>
                            <span className="block text-xs text-gray-500 font-medium mb-0.5 uppercase tracking-wider">Previous</span>
                            <span className="block font-bold text-white group-hover:text-accent transition-colors">{prevProduct.name}</span>
                        </div>
                    </Link>

                    <Link href={`/shop/${nextProduct.category}/${nextProduct.slug}`} className="group flex items-center gap-4 text-right p-4 rounded-xl hover:bg-white/5 transition-colors">
                        <div>
                            <span className="block text-xs text-gray-500 font-medium mb-0.5 uppercase tracking-wider">Next</span>
                            <span className="block font-bold text-white group-hover:text-accent transition-colors">{nextProduct.name}</span>
                        </div>
                        <div className="border border-white/10 p-2 rounded-full group-hover:bg-accent group-hover:text-black group-hover:border-accent transition-colors text-white">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}


