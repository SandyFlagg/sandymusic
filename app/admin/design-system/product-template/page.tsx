'use client';

import Link from 'next/link';
import { Product } from '@/lib/shop-data';
import { ProductGallery, ProductInfo, BuyBox, ReviewsSection } from '../product-components';

// ==========================================
// 📋 PRODUCT DATA TEMPLATE
// Copy and paste this structure into lib/shop-data.ts to add new products.
// ==========================================
const TEMPLATE_PRODUCT: Product = {
    id: 'template-id', // Unique ID
    slug: 'your-product-slug', // URL-friendly name (e.g., 'melodic-techno-bundle')
    name: 'Product Name Here',
    category: 'ableton-templates', // 'ableton-templates' | 'serum-presets' | 'trinkets'
    genre: 'Techno',
    price: 49.99,

    // Media
    image: '/images/products/techno-template.jpg', // Main fallback image
    images: [
        '/images/products/techno-template.jpg',
        '/images/products/techno-2.jpg',
        '/images/products/techno-3.jpg'
    ],
    // Optional: Add a preview audio file (plays on the main image)
    previewAudio: '/audio/previews/techno-template.mp3',

    // Ratings
    rating: 5.0,
    reviewCount: 150,

    // Bullet Points (appears in center column)
    features: [
        'Feature 1: Full Project File included.',
        'Feature 2: Mixed with stock plugins.',
        'Feature 3: Includes 50+ MIDI files.',
        'Feature 4: 100% Royalty Free.'
    ],

    // Technical Specs (appears in grid)
    specs: {
        daw: 'Ableton Live 11',
        plugins: 'Serum, Diva',
        bpm: 128,
        key: 'F Minor'
    },

    badges: ['Best Seller'],
    description: 'Full product description goes here...',
    createdAt: new Date().toISOString(),
};

export default function ProductTemplatePage() {
    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-accent selection:text-white pt-24 pb-20">
            {/* Design System Header */}
            <div className="fixed top-0 left-0 w-full z-50 bg-neutral-900 border-b border-white/10 h-10 flex items-center px-4 justify-between">
                <span className="text-xs font-mono text-gray-400">DESIGN SYSTEM: PRODUCT TEMPLATE</span>
                <Link href="/admin/design-system" className="text-xs hover:text-white text-gray-500">
                    ← Back to System
                </Link>
            </div>

            <div className="container mx-auto px-4 mt-8">
                {/* Breadcrumbs Helper */}
                <div className="text-sm text-gray-400 mb-8 flex items-center gap-2">
                    <span className="opacity-50">Shop</span>
                    <span className="text-gray-600">›</span>
                    <span className="opacity-50 capitalize">{TEMPLATE_PRODUCT.category}</span>
                    <span className="text-gray-600">›</span>
                    <span className="font-bold text-white">{TEMPLATE_PRODUCT.name}</span>
                </div>

                {/* 3-Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                    {/* Left: Gallery (4 Columns) */}
                    <div className="lg:col-span-5">
                        <ProductGallery product={TEMPLATE_PRODUCT} />
                    </div>

                    {/* Center: Info (4 Columns) */}
                    <div className="lg:col-span-4">
                        <ProductInfo product={TEMPLATE_PRODUCT} />
                    </div>

                    {/* Right: Buy Box (3 Columns) */}
                    <div className="lg:col-span-3">
                        <BuyBox product={TEMPLATE_PRODUCT} />
                    </div>

                </div>

                {/* Reviews Section */}
                <ReviewsSection product={TEMPLATE_PRODUCT} />

                {/* Developer Note */}
                <div className="mt-20 p-8 border border-dashed border-white/20 rounded-xl bg-white/5 font-mono text-sm text-gray-400">
                    <h3 className="text-white font-bold mb-4">👨‍💻 How to use this template</h3>
                    <p className="mb-4">
                        To add a new product, open <code>lib/shop-data.ts</code> and add a new object to the <code>MOCK_PRODUCTS</code> array using the structure above.
                        The page layout will automatically adapt.
                    </p>
                    <pre className="bg-black p-4 rounded-lg overflow-x-auto text-xs">
                        {`{
  id: 'unique-id',
  name: 'New Product',
  price: 29.99,
  images: ['/path/to/image.jpg'],
  previewAudio: '/path/to/audio.mp3',
  ...
}`}
                    </pre>
                </div>
            </div>
        </div>
    );
}
