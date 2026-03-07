'use client';

import Link from 'next/link';
import { ProductCard } from './components';
import { Product } from '@/lib/shop-data';

// Mock product for display
const mockProduct: Product = {
    id: 'mock-product',
    slug: 'mock-product',
    name: 'Example Product',
    category: 'ableton-templates',
    genre: 'house',
    price: 29.99,
    artistStyle: 'Design System Style',
    specs: {
        daw: 'Ableton 11',
        plugins: 'Serum',
        bpm: 128,
        key: 'C Minor'
    },
    badges: ['New', 'Best Seller'],
    image: '/assets/shop/ableton-folder-logo.png',
    rating: 4.8,
    reviewCount: 42,
    createdAt: '2023-01-01',
};

export default function DesignSystemPage() {
    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-accent selection:text-white pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-6xl">

                <header className="mb-20 border-b border-white/10 pb-10">
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">
                        Design System
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl">
                        A living guide to the visual language of Sandy Music.
                    </p>
                </header>

                {/* 01. Typography */}
                <section className="mb-24">
                    <h2 className="text-2xl font-bold uppercase tracking-wide mb-8 text-accent border-l-4 border-accent pl-4">
                        01. Typography
                    </h2>
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-8">
                            <div>
                                <p className="text-xs text-gray-500 mb-2 font-mono">H1 / Black / Uppercase</p>
                                <h1 className="text-6xl font-black uppercase tracking-tighter">
                                    The Quick Brown Fox
                                </h1>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 mb-2 font-mono">H2 / Black / Uppercase</p>
                                <h2 className="text-4xl font-black uppercase tracking-tighter">
                                    Jumps Over The Lazy Dog
                                </h2>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 mb-2 font-mono">H3 / Bold / Uppercase</p>
                                <h3 className="text-2xl font-bold uppercase tracking-wide">
                                    Music Production Assets
                                </h3>
                            </div>
                        </div>
                        <div className="space-y-8">
                            <div>
                                <p className="text-xs text-gray-500 mb-2 font-mono">Body / Regular</p>
                                <p className="text-gray-300 leading-relaxed">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 mb-2 font-mono">Body / Small / Muted</p>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 mb-2 font-mono">Label / Bold / Uppercase</p>
                                <span className="text-xs font-bold uppercase tracking-widest text-accent">
                                    Featured Item
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 02. Colors */}
                <section className="mb-24">
                    <h2 className="text-2xl font-bold uppercase tracking-wide mb-8 text-accent border-l-4 border-accent pl-4">
                        02. Colors
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="space-y-3">
                            <div className="h-32 w-full bg-[#ff5500] rounded-lg border border-white/10 shadow-lg"></div>
                            <div>
                                <p className="font-bold">Accent Orange</p>
                                <p className="text-xs text-gray-500 font-mono">#FF5500</p>
                                <p className="text-xs text-gray-500">Primary actions, highlights</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="h-32 w-full bg-[#0a0a0a] rounded-lg border border-white/10 shadow-lg"></div>
                            <div>
                                <p className="font-bold">Background Black</p>
                                <p className="text-xs text-gray-500 font-mono">#0A0A0A</p>
                                <p className="text-xs text-gray-500">Main background</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="h-32 w-full bg-[#111111] rounded-lg border border-white/10 shadow-lg"></div>
                            <div>
                                <p className="font-bold">Surface Gray</p>
                                <p className="text-xs text-gray-500 font-mono">#111111</p>
                                <p className="text-xs text-gray-500">Cards, sections</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="h-32 w-full bg-white rounded-lg border border-white/10 shadow-lg"></div>
                            <div>
                                <p className="font-bold">Foreground White</p>
                                <p className="text-xs text-gray-500 font-mono">#FFFFFF</p>
                                <p className="text-xs text-gray-500">Text, borders</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 03. Layout & Grid */}
                <section className="mb-24">
                    <h2 className="text-2xl font-bold uppercase tracking-wide mb-8 text-accent border-l-4 border-accent pl-4">
                        03. Layout & Grid
                    </h2>
                    <div className="space-y-8">
                        <div>
                            <p className="text-xs text-gray-500 mb-4 font-mono">12-Column Grid System</p>
                            <div className="grid grid-cols-12 gap-4 h-32 bg-[#111] p-4 rounded-xl border border-white/10">
                                {[...Array(12)].map((_, i) => (
                                    <div key={i} className="bg-accent/20 border border-accent/40 rounded h-full flex items-center justify-center text-xs text-accent font-mono">
                                        {i + 1}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <p className="text-xs text-gray-500 mb-4 font-mono">2-Column Layout</p>
                                <div className="grid grid-cols-2 gap-4 h-32 bg-[#111] p-4 rounded-xl border border-white/10">
                                    <div className="bg-white/5 rounded h-full"></div>
                                    <div className="bg-white/5 rounded h-full"></div>
                                </div>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 mb-4 font-mono">3-Column Layout</p>
                                <div className="grid grid-cols-3 gap-4 h-32 bg-[#111] p-4 rounded-xl border border-white/10">
                                    <div className="bg-white/5 rounded h-full"></div>
                                    <div className="bg-white/5 rounded h-full"></div>
                                    <div className="bg-white/5 rounded h-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 04. Spacing Scale */}
                <section className="mb-24">
                    <h2 className="text-2xl font-bold uppercase tracking-wide mb-8 text-accent border-l-4 border-accent pl-4">
                        04. Spacing Scale
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[4, 8, 12, 16, 24, 32, 48, 64].map((size) => (
                            <div key={size} className="space-y-2">
                                <div className="bg-accent/20 border border-accent/40" style={{ width: size * 4, height: size * 4 }}></div>
                                <p className="text-xs text-gray-500 font-mono">p-{size} / {size * 4}px</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 05. Buttons & Links */}
                <section className="mb-24">
                    <h2 className="text-2xl font-bold uppercase tracking-wide mb-8 text-accent border-l-4 border-accent pl-4">
                        05. Buttons & Links
                    </h2>
                    <div className="flex flex-wrap gap-8 items-center bg-[#111] p-10 rounded-xl border border-white/10">

                        {/* Primary Button */}
                        <div className="text-center space-y-4">
                            <button className="bg-white text-black font-black uppercase tracking-widest px-8 py-4 hover:bg-accent hover:text-white transition-colors">
                                Primary Action
                            </button>
                            <p className="text-xs text-gray-500 font-mono">bg-white hover:bg-accent</p>
                        </div>

                        {/* Secondary Button */}
                        <div className="text-center space-y-4">
                            <button className="border border-white/20 text-white font-bold uppercase tracking-widest px-8 py-4 hover:border-white hover:bg-white/5 transition-colors">
                                Secondary Action
                            </button>
                            <p className="text-xs text-gray-500 font-mono">border-white/20 hover:border-white</p>
                        </div>

                        {/* Accent Button */}
                        <div className="text-center space-y-4">
                            <button className="bg-accent text-white font-bold uppercase tracking-widest px-6 py-3 rounded-sm hover:bg-accent/80 transition-colors">
                                Accent Small
                            </button>
                            <p className="text-xs text-gray-500 font-mono">bg-accent</p>
                        </div>

                        {/* Text Link */}
                        <div className="text-center space-y-4">
                            <Link href="#" className="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-white border-b border-transparent hover:border-white pb-1 transition-all">
                                Text Link →
                            </Link>
                            <p className="text-xs text-gray-500 font-mono">text-gray-400 hover:text-white</p>
                        </div>
                    </div>
                </section>

                {/* 06. Interactive Components */}
                <section className="mb-24">
                    <h2 className="text-2xl font-bold uppercase tracking-wide mb-8 text-accent border-l-4 border-accent pl-4">
                        06. Interactive Components
                    </h2>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Product Card */}
                        <div>
                            <h3 className="text-lg font-bold mb-6 text-gray-300">Product Card</h3>
                            <div className="max-w-sm">
                                <ProductCard product={mockProduct} />
                            </div>
                        </div>

                        {/* Form Elements */}
                        <div>
                            <h3 className="text-lg font-bold mb-6 text-gray-300">Form Elements</h3>
                            <div className="space-y-6 bg-[#111] p-8 rounded-xl border border-white/10">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="name@example.com"
                                        className="w-full bg-black border border-white/20 p-3 rounded text-white focus:border-accent focus:outline-none transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Message</label>
                                    <textarea
                                        rows={3}
                                        placeholder="Type your message..."
                                        className="w-full bg-black border border-white/20 p-3 rounded text-white focus:border-accent focus:outline-none transition-colors"
                                    ></textarea>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 border border-white/20 bg-black flex items-center justify-center">
                                        <div className="w-3 h-3 bg-accent"></div>
                                    </div>
                                    <span className="text-sm text-gray-400">Checkbox active state</span>
                                </div>

                                <div className="pt-4 border-t border-white/10">
                                    <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Dropdown / Accordion</p>
                                    <details className="group bg-black border border-white/20 rounded overflow-hidden">
                                        <summary className="flex justify-between items-center p-4 cursor-pointer hover:bg-white/5 transition-colors">
                                            <span className="font-bold text-sm">Click to Expand</span>
                                            <span className="transform group-open:rotate-180 transition-transform">▼</span>
                                        </summary>
                                        <div className="p-4 border-t border-white/10 text-gray-400 text-sm">
                                            This is the hidden content inside the dropdown. Useful for FAQs or menus.
                                        </div>
                                    </details>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 07. Animations */}
                <section className="mb-24">
                    <h2 className="text-2xl font-bold uppercase tracking-wide mb-8 text-accent border-l-4 border-accent pl-4">
                        07. Animations
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="space-y-4 text-center">
                            <div className="w-24 h-24 bg-[#111] border border-white/10 rounded-xl mx-auto flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer">
                                <span className="text-2xl">🚀</span>
                            </div>
                            <p className="text-xs text-gray-500 font-mono">Hover Scale</p>
                        </div>
                        <div className="space-y-4 text-center">
                            <div className="w-24 h-24 bg-[#111] border border-white/10 rounded-xl mx-auto flex items-center justify-center hover:-translate-y-2 transition-transform duration-300 cursor-pointer">
                                <span className="text-2xl">⬆️</span>
                            </div>
                            <p className="text-xs text-gray-500 font-mono">Hover Lift</p>
                        </div>
                        <div className="space-y-4 text-center">
                            <div className="w-24 h-24 bg-[#111] border border-white/10 rounded-xl mx-auto flex items-center justify-center group cursor-pointer">
                                <span className="text-2xl group-hover:rotate-180 transition-transform duration-500">🔄</span>
                            </div>
                            <p className="text-xs text-gray-500 font-mono">Hover Rotate</p>
                        </div>
                        <div className="space-y-4 text-center">
                            <div className="w-24 h-24 bg-[#111] border border-white/10 rounded-xl mx-auto flex items-center justify-center animate-pulse cursor-pointer">
                                <span className="text-2xl">💓</span>
                            </div>
                            <p className="text-xs text-gray-500 font-mono">Pulse Animation</p>
                        </div>
                    </div>
                </section>

                {/* 08. Badges & UI Elements */}
                <section className="mb-24">
                    <h2 className="text-2xl font-bold uppercase tracking-wide mb-8 text-accent border-l-4 border-accent pl-4">
                        08. Badges & UI Elements
                    </h2>
                    <div className="flex flex-wrap gap-6 bg-[#111] p-10 rounded-xl border border-white/10">

                        <div>
                            <span className="bg-accent text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm">
                                New Arrival
                            </span>
                            <p className="text-xs text-gray-500 mt-2 font-mono">bg-accent</p>
                        </div>

                        <div>
                            <span className="bg-white text-black text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm">
                                Best Seller
                            </span>
                            <p className="text-xs text-gray-500 mt-2 font-mono">bg-white text-black</p>
                        </div>

                        <div>
                            <span className="border border-white/20 text-gray-300 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm">
                                Outline Badge
                            </span>
                            <p className="text-xs text-gray-500 mt-2 font-mono">border-white/20</p>
                        </div>

                        <div>
                            <div className="w-12 h-12 rounded-full bg-black border border-white/10 flex items-center justify-center hover:border-accent transition-colors cursor-pointer">
                                <span className="text-xl">➜</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-2 font-mono">Icon Button</p>
                        </div>

                    </div>
                </section>

                {/* 09. Page Templates */}
                <section className="mb-24">
                    <h2 className="text-2xl font-bold uppercase tracking-wide mb-8 text-accent border-l-4 border-accent pl-4">
                        09. Page Templates
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <Link href="/admin/design-system/product-template" className="group block bg-[#111] border border-white/10 rounded-xl overflow-hidden hover:border-accent transition-colors">
                            <div className="h-48 bg-gradient-to-br from-gray-800 to-black flex items-center justify-center group-hover:from-gray-700 transition-colors">
                                <span className="text-4xl">🛍️</span>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold uppercase tracking-widest mb-2 group-hover:text-accent transition-colors">Product Page Template</h3>
                                <p className="text-gray-400 text-sm">
                                    A &quot;Best in Class&quot; product detail layout featuring immersive hero, sticky CTA, and tabbed content.
                                </p>
                            </div>
                        </Link>

                        <Link href="/admin/design-system/blog-template" className="group block bg-[#111] border border-white/10 rounded-xl overflow-hidden hover:border-accent transition-colors">
                            <div className="h-48 bg-gradient-to-br from-gray-800 to-black flex items-center justify-center group-hover:from-gray-700 transition-colors">
                                <span className="text-4xl">📝</span>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold uppercase tracking-widest mb-2 group-hover:text-accent transition-colors">Blog Post Template</h3>
                                <p className="text-gray-400 text-sm">
                                    A premium editorial layout with reading progress, rich content styling, and engagement features.
                                </p>
                            </div>
                        </Link>
                    </div>
                </section>

                {/* 10. Navigation */}
                <section className="mb-24">
                    <h2 className="text-2xl font-bold uppercase tracking-wide mb-8 text-accent border-l-4 border-accent pl-4">
                        10. Navigation
                    </h2>
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-lg font-bold mb-6 text-gray-300">Rich Dropdown Menu</h3>
                            <div className="bg-[#111] p-12 rounded-xl border border-white/10 flex justify-center min-h-[350px] items-start">
                                {/* Static Dropdown Example */}
                                <div className="relative">
                                    <button className="text-sm font-bold uppercase tracking-widest text-white mb-4 hover:text-accent transition-colors">
                                        Hover Me
                                    </button>
                                    <div className="bg-black/95 backdrop-blur-2xl border border-white/10 rounded-xl p-2 min-w-[320px] shadow-2xl flex flex-col gap-1 ring-1 ring-white/5">
                                        <div className="group/item flex items-center gap-4 px-4 py-3 rounded-lg bg-white/5 transition-all translate-x-1">
                                            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-lg text-white transition-colors">
                                                🎹
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-white transition-colors">Active Item</div>
                                                <div className="text-[10px] font-medium text-gray-400 uppercase tracking-wide">Description text</div>
                                            </div>
                                        </div>
                                        <div className="group/item flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-white/5 transition-all hover:translate-x-1 cursor-pointer">
                                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-lg group-hover/item:bg-accent group-hover/item:text-white transition-colors">
                                                🎛️
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-gray-200 group-hover/item:text-white transition-colors">Menu Item</div>
                                                <div className="text-[10px] font-medium text-gray-500 group-hover/item:text-gray-400 uppercase tracking-wide">More details here</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
