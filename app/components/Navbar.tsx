'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const { toggleCart, cartCount } = useCart();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // Helper to determine if we are on the home page
    const isHome = pathname === '/';

    // Helper for hash links: if on home, use #id, else use /#id
    const getLink = (hash: string) => (isHome ? hash : `/${hash}`);

    // Get current section for breadcrumb
    const getCurrentSection = () => {
        if (pathname.startsWith('/shop')) return 'SHOP';
        if (pathname.startsWith('/blog')) return 'BLOG';
        if (pathname.startsWith('/music')) return 'MUSIC';
        if (pathname.startsWith('/dashboard')) return 'DASHBOARD';
        if (pathname.startsWith('/tools')) return 'TOOLS';
        if (pathname.startsWith('/privacy')) return 'PRIVACY';
        return null;
    };

    const currentSection = getCurrentSection();

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10 font-sans">
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 text-2xl font-black uppercase tracking-tighter hover:text-accent transition-colors">
                    <span>SANDY</span>
                    {currentSection && (
                        <>
                            <span className="text-white/20 font-light">/</span>
                            <span className="text-accent">{currentSection}</span>
                        </>
                    )}
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-8 text-sm font-bold uppercase tracking-widest items-center absolute left-1/2 -translate-x-1/2">
                    <Link href="/about" className={`hover:text-accent transition-colors ${pathname === '/about' ? 'text-accent' : ''}`}>About</Link>
                    <Link href={getLink('#music')} className="hover:text-accent transition-colors">Music</Link>

                    {/* Shop Dropdown */}
                    <div className="relative group">
                        <Link href="/shop" className={`hover:text-accent transition-colors py-4 ${pathname.startsWith('/shop') ? 'text-accent' : ''}`}>
                            SHOP
                        </Link>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:-translate-y-1">
                            <div className="bg-black/95 backdrop-blur-2xl border border-white/10 rounded-xl p-2 min-w-[320px] shadow-2xl flex flex-col gap-1 ring-1 ring-white/5">
                                <Link href="/shop/ableton-templates" className="group/item flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-white/5 transition-all hover:translate-x-1">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-lg group-hover/item:bg-accent group-hover/item:text-white transition-colors">
                                        🎹
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-gray-200 group-hover/item:text-white transition-colors">Ableton Files</div>
                                        <div className="text-[10px] font-medium text-gray-500 group-hover/item:text-gray-400 uppercase tracking-wide">Project templates & racks</div>
                                    </div>
                                </Link>
                                <Link href="/shop/serum-presets" className="group/item flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-white/5 transition-all hover:translate-x-1">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-lg group-hover/item:bg-accent group-hover/item:text-white transition-colors">
                                        🎛️
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-gray-200 group-hover/item:text-white transition-colors">Serum Presets</div>
                                        <div className="text-[10px] font-medium text-gray-500 group-hover/item:text-gray-400 uppercase tracking-wide">Bass, leads & pads</div>
                                    </div>
                                </Link>
                                <Link href="/shop/trinkets" className="group/item flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-white/5 transition-all hover:translate-x-1">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-lg group-hover/item:bg-accent group-hover/item:text-white transition-colors">
                                        💎
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-gray-200 group-hover/item:text-white transition-colors">Trinkets</div>
                                        <div className="text-[10px] font-medium text-gray-500 group-hover/item:text-gray-400 uppercase tracking-wide">Accessories & merch</div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Blog Dropdown */}
                    <div className="relative group">
                        <Link href="/blog" className={`hover:text-accent transition-colors py-4 ${pathname.startsWith('/blog') ? 'text-accent' : ''}`}>
                            Blog
                        </Link>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:-translate-y-1">
                            <div className="bg-black/95 backdrop-blur-2xl border border-white/10 rounded-xl p-2 min-w-[320px] shadow-2xl flex flex-col gap-1 ring-1 ring-white/5">
                                <Link href="/blog/category/production" className="group/item flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-white/5 transition-all hover:translate-x-1">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-lg group-hover/item:bg-accent group-hover/item:text-white transition-colors">
                                        🎧
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-gray-200 group-hover/item:text-white transition-colors">Production</div>
                                        <div className="text-[10px] font-medium text-gray-500 group-hover/item:text-gray-400 uppercase tracking-wide">Tips & tricks</div>
                                    </div>
                                </Link>
                                <Link href="/blog/category/djing" className="group/item flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-white/5 transition-all hover:translate-x-1">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-lg group-hover/item:bg-accent group-hover/item:text-white transition-colors">
                                        💿
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-gray-200 group-hover/item:text-white transition-colors">DJing</div>
                                        <div className="text-[10px] font-medium text-gray-500 group-hover/item:text-gray-400 uppercase tracking-wide">Techniques & guides</div>
                                    </div>
                                </Link>
                                <Link href="/blog/category/music-marketing" className="group/item flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-white/5 transition-all hover:translate-x-1">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-lg group-hover/item:bg-accent group-hover/item:text-white transition-colors">
                                        📈
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-gray-200 group-hover/item:text-white transition-colors">Music Marketing</div>
                                        <div className="text-[10px] font-medium text-gray-500 group-hover/item:text-gray-400 uppercase tracking-wide">Grow your audience</div>
                                    </div>
                                </Link>
                                <Link href="/blog/category/backstage" className="group/item flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-white/5 transition-all hover:translate-x-1">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-lg group-hover/item:bg-accent group-hover/item:text-white transition-colors">
                                        🎫
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-gray-200 group-hover/item:text-white transition-colors">Backstage</div>
                                        <div className="text-[10px] font-medium text-gray-500 group-hover/item:text-gray-400 uppercase tracking-wide">Behind the scenes</div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Tools Dropdown */}
                    <div className="relative group">
                        <Link href="/tools/royalty-calculator" className={`hover:text-accent transition-colors py-4 ${pathname.startsWith('/tools') ? 'text-accent' : ''}`}>
                            TOOLS
                        </Link>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:-translate-y-1">
                            <div className="bg-black/95 backdrop-blur-2xl border border-white/10 rounded-xl p-2 min-w-[320px] shadow-2xl flex flex-col gap-1 ring-1 ring-white/5">
                                <Link href="/tools/royalty-calculator" className="group/item flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-white/5 transition-all hover:translate-x-1">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-lg group-hover/item:bg-accent group-hover/item:text-white transition-colors">
                                        💰
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-gray-200 group-hover/item:text-white transition-colors">Royalty Calculator</div>
                                        <div className="text-[10px] font-medium text-gray-500 group-hover/item:text-gray-400 uppercase tracking-wide">Estimate streaming revenue</div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <Link href={getLink('#dates')} className="hover:text-accent transition-colors">Dates</Link>
                    <Link href={getLink('#contact')} className="hover:text-accent transition-colors">Contact</Link>
                </div>

                {/* Cart & Mobile Toggle */}
                <div className="flex items-center gap-6">
                    {/* Auth UI */}
                    <SignedOut>
                        <Link href="/sign-in" className="text-sm font-bold uppercase tracking-widest hover:text-accent transition-colors hidden md:block">
                            Log In
                        </Link>
                    </SignedOut>
                    <SignedIn>
                        <Link href="/dashboard" className="text-sm font-bold uppercase tracking-widest hover:text-accent transition-colors hidden md:block">
                            Dashboard
                        </Link>
                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox: "w-8 h-8 border border-white/20"
                                }
                            }}
                        />
                    </SignedIn>

                    <button onClick={toggleCart} className="relative group">
                        <svg className="w-6 h-6 text-white group-hover:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-black">
                                {cartCount}
                            </span>
                        )}
                    </button>

                    {/* Mobile Menu Toggle */}
                    <button className="md:hidden text-2xl focus:outline-none" onClick={toggleMenu}>
                        {isMenuOpen ? '✕' : '☰'}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="absolute top-20 left-0 w-full h-[calc(100vh-80px)] bg-black/95 backdrop-blur-xl flex flex-col p-8 overflow-y-auto">
                    <div className="flex flex-col gap-6 text-xl font-black uppercase tracking-widest">
                        <Link href="/about" onClick={toggleMenu} className={`hover:text-accent transition-colors ${pathname === '/about' ? 'text-accent' : ''}`}>About</Link>
                        <Link href={getLink('#music')} onClick={toggleMenu} className="hover:text-accent transition-colors">Music</Link>

                        <div className="flex flex-col gap-4">
                            <Link href="/shop" onClick={toggleMenu} className={`hover:text-accent transition-colors ${pathname.startsWith('/shop') ? 'text-accent' : ''}`}>SHOP</Link>
                            <div className="flex flex-col gap-3 pl-4 border-l border-white/10 text-sm font-bold text-gray-400">
                                <Link href="/shop/ableton-templates" onClick={toggleMenu} className="hover:text-white transition-colors">Ableton Templates</Link>
                                <Link href="/shop/serum-presets" onClick={toggleMenu} className="hover:text-white transition-colors">Serum Presets</Link>
                                <Link href="/shop/trinkets" onClick={toggleMenu} className="hover:text-white transition-colors">Trinkets</Link>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <Link href="/blog" onClick={toggleMenu} className={`hover:text-accent transition-colors ${pathname.startsWith('/blog') ? 'text-accent' : ''}`}>Blog</Link>
                            <div className="flex flex-col gap-3 pl-4 border-l border-white/10 text-sm font-bold text-gray-400">
                                <Link href="/blog/category/production" onClick={toggleMenu} className="hover:text-white transition-colors">Production</Link>
                                <Link href="/blog/category/djing" onClick={toggleMenu} className="hover:text-white transition-colors">DJing</Link>
                                <Link href="/blog/category/music-marketing" onClick={toggleMenu} className="hover:text-white transition-colors">Music Marketing</Link>
                                <Link href="/blog/category/backstage" onClick={toggleMenu} className="hover:text-white transition-colors">Backstage</Link>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <Link href="/tools/royalty-calculator" onClick={toggleMenu} className={`hover:text-accent transition-colors ${pathname.startsWith('/tools') ? 'text-accent' : ''}`}>TOOLS</Link>
                            <div className="flex flex-col gap-3 pl-4 border-l border-white/10 text-sm font-bold text-gray-400">
                                <Link href="/tools/royalty-calculator" onClick={toggleMenu} className="hover:text-white transition-colors">Royalty Calculator</Link>
                            </div>
                        </div>

                        <Link href={getLink('#dates')} onClick={toggleMenu} className="hover:text-accent transition-colors">Dates</Link>
                        <Link href={getLink('#contact')} onClick={toggleMenu} className="hover:text-accent transition-colors">Contact</Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
