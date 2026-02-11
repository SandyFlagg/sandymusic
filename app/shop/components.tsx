'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/shop-data';
import { useCart } from '../context/CartContext';

export function ProductCard({ product }: { product: Product }) {
    const { addToCart } = useCart();

    // Mock "Bought in past month" based on review count
    const boughtCount = product.reviewCount ? Math.floor(product.reviewCount * 12.5) : 50;
    const isPopular = boughtCount > 500;

    return (
        <div className="group relative flex flex-col bg-[#111] hover:bg-[#161616] border border-white/5 hover:border-white/10 transition-all duration-300 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 h-full">
            {/* Image Container */}
            <div className="relative aspect-square w-full overflow-hidden bg-white/5 flex-shrink-0">
                <Link href={`/shop/${product.category}/${product.slug}`} className="block w-full h-full">
                    {product.image ? (
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-600 bg-[#0a0a0a]">
                            <span className="text-sm font-medium">No Image</span>
                        </div>
                    )}
                </Link>
                {/* Badges Overlay */}
                {product.badges?.includes('Best Seller') && (
                    <div className="absolute top-3 left-3 bg-[#e87b35] text-white text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-sm shadow-md z-10">
                        Best Seller
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-col flex-grow p-5">
                <Link href={`/shop/${product.category}/${product.slug}`} className="block flex-grow">
                    <h3 className="text-base font-bold text-white group-hover:text-accent transition-colors leading-tight mb-2 line-clamp-2">
                        {product.name}
                    </h3>

                    {/* Ratings */}
                    <div className="flex items-center gap-1.5 mb-1">
                        <div className="flex text-accent text-xs">
                            {'★'.repeat(Math.round(product.rating || 5)) + '☆'.repeat(5 - Math.round(product.rating || 5))}
                        </div>
                        <span className="text-xs text-blue-400 hover:text-blue-300 hover:underline cursor-pointer font-medium">
                            {product.reviewCount || 0}
                        </span>
                    </div>

                    {/* Bought in past month */}
                    <div className="text-xs text-gray-400 font-medium mb-3">
                        {isPopular ? `${(boughtCount / 1000).toFixed(1)}K+` : `${boughtCount}+`} bought in past month
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-xl font-bold text-white tracking-tight">
                            ${product.price.toFixed(2)}
                        </span>
                        {product.price > 40 && (
                            <span className="text-xs text-gray-500 line-through">
                                ${(product.price * 1.3).toFixed(2)}
                            </span>
                        )}
                    </div>
                </Link>

                {/* Add to Cart Button */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToCart(product);
                    }}
                    className="w-full cursor-pointer bg-[#ffd814] hover:bg-[#f7ca00] text-black border border-[#fcd200] font-medium text-sm py-2 rounded-full transition-all duration-200 shadow-sm hover:shadow-lg hover:brightness-110 active:scale-95 active:shadow-inner transform hover:-translate-y-0.5"
                >
                    Add to cart
                </button>
            </div>
        </div >
    );
}

function AddToCartButton({ product }: { product: Product }) {
    const { addToCart } = useCart();

    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(product);
            }}
            className="text-xs font-bold uppercase tracking-widest bg-white text-black px-3 py-2 hover:bg-accent hover:text-white transition-colors rounded-sm"
        >
            Add to Cart
        </button>
    );
}

export function ProductGrid({ products }: { products: Product[] }) {
    if (products.length === 0) {
        return (
            <div className="text-center py-32">
                <p className="text-gray-600 uppercase tracking-widest">No items found.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
