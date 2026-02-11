'use client';

import Link from 'next/link';
import { products } from '@/lib/shop-data';
import { ProductCard } from '@/app/shop/components';

export default function AbletonTemplatesSection() {
    // Filter for the specific templates we added
    const featuredTemplates = products.filter(p =>
        ['tech-house-starter', 'melodic-trance', 'peak-time-breaks', 'club-bass-toolkit', 'fx-risers-mini'].includes(p.id)
    );

    return (
        <section className="py-48 bg-[#111] border-b border-white/10">
            <div className="container mx-auto px-4">

                {/* Intro Block */}
                <div className="text-center max-w-3xl mx-auto mb-20 relative">
                    <div className="absolute -top-20 left-1/2 -translate-x-1/2 text-[12rem] font-black text-white/[0.02] select-none pointer-events-none">
                        02
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-tight relative z-10">
                        Ableton Templates you can <span className="text-accent">tear apart</span> and make your own.
                    </h2>
                    <p className="text-lg text-white/90 mb-4 font-medium italic">
                        These are the same project structures and sounds I use when starting my own tracks.
                    </p>
                    <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                        Drag, drop, tweak — build tracks faster without getting stuck on the intro.
                    </p>
                    <Link href="/shop" className="inline-block bg-white text-black font-black uppercase tracking-widest px-8 py-4 hover:bg-accent hover:text-white transition-colors">
                        Browse Templates →
                    </Link>
                </div>

                {/* What You'll Find */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-24 max-w-5xl mx-auto">
                    <div>
                        <h3 className="text-2xl font-bold uppercase tracking-wide mb-6 border-l-4 border-accent pl-4">
                            What You&apos;ll Find
                        </h3>
                        <p className="text-gray-400 mb-6">
                            Club-ready Ableton project files designed to help you:
                        </p>
                        <ul className="space-y-4">
                            {[
                                "Learn arrangement and sound design quicker",
                                "Reverse-engineer mix decisions",
                                "Start from structure instead of a blank project"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span className="text-accent mt-1">✓</span>
                                    <span className="font-medium text-gray-200">{item}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-8 text-sm text-gray-500 font-bold uppercase tracking-widest">
                            Every template is clean, editable, and built in Ableton Live.
                        </p>
                    </div>
                    <div className="relative aspect-square md:aspect-video bg-[#111] border border-white/10 rounded-xl overflow-hidden group">
                        {/* Abstract visual representation of a DAW project */}
                        <div className="absolute inset-0 flex flex-col justify-center gap-1 p-8 opacity-50 group-hover:opacity-80 transition-opacity">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="h-2 bg-white/20 rounded-full w-full" style={{ width: `${((i * 37) % 50) + 50}%` }}></div>
                            ))}
                            <div className="h-2 bg-accent rounded-full w-3/4 mt-4"></div>
                        </div>
                    </div>
                </div>

                {/* Featured Templates Carousel */}
                <div className="mb-24">
                    <div className="flex justify-between items-end mb-8">
                        <h3 className="text-2xl font-bold uppercase tracking-wide">
                            Kickstart your next track
                        </h3>
                        <div className="hidden md:flex gap-2">
                            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Scroll for more →</span>
                        </div>
                    </div>

                    <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar">
                        {featuredTemplates.map((product) => (
                            <div key={product.id} className="flex-shrink-0 w-[280px] snap-center">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-8">
                        <Link href="/shop" className="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-white border-b border-transparent hover:border-white pb-1 transition-all">
                            View All Templates
                        </Link>
                    </div>
                </div>

                {/* Why These Work & Email CTA Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Why These Work */}
                    <div className="bg-[#111] border border-white/10 p-8 rounded-xl">
                        <h3 className="text-xl font-bold uppercase tracking-wide mb-6">
                            Why These Work
                        </h3>
                        <ul className="space-y-4">
                            {[
                                "Made by a producer actually releasing on SoundCloud",
                                "No filler — just quality project files",
                                "Clear labelling + simple workflow",
                                "Built for club-focused genres: tech house, trance, breaks, techno"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2"></div>
                                    <span className="text-gray-300 text-sm">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Email CTA */}
                    <div className="bg-gradient-to-br from-[#1a1a1a] to-black border border-white/10 p-8 rounded-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -mr-16 -mt-16"></div>

                        <h3 className="text-xl font-bold uppercase tracking-wide mb-2 relative z-10">
                            Get a free Ableton Template
                        </h3>
                        <p className="text-gray-400 text-sm mb-6 relative z-10">
                            Join for new drops, discounts, and early access — no spam.
                        </p>

                        <form
                            className="flex flex-col gap-3 relative z-10"
                            onSubmit={(e) => {
                                e.preventDefault();
                                const form = e.target as HTMLFormElement;
                                const email = (form.elements.namedItem('email') as HTMLInputElement).value;
                                window.location.href = `mailto:sandy@sandymusic.com?subject=Free Template Request (Ableton Section)&body=Hi Sandy,%0D%0A%0D%0APlease send me the free template.%0D%0A%0D%0AMy email is: ${email}`;
                            }}
                        >
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="YOUR@EMAIL.COM"
                                className="bg-black/50 border border-white/20 p-3 rounded text-sm focus:border-accent focus:outline-none text-white placeholder-gray-600"
                            />
                            <button className="bg-white text-black font-bold uppercase tracking-widest text-xs py-3 rounded hover:bg-accent hover:text-white transition-colors">
                                Download Free Template
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </section>
    );
}
