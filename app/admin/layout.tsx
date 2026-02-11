'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-accent selection:text-white flex pt-20">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 bg-[#0a0a0a] flex flex-col fixed top-20 left-0 h-[calc(100vh-5rem)] z-40">
                <div className="h-16 flex items-center px-6 border-b border-white/10">
                    <Link href="/" className="text-xl font-black uppercase tracking-tighter text-white hover:text-accent transition-colors">
                        Sandy Music
                    </Link>
                </div>

                <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
                    {/* Dashboard */}
                    <div>
                        <Link
                            href="/admin"
                            className={`block px-4 py-2 rounded text-sm font-bold uppercase tracking-widest transition-colors ${pathname === '/admin' ? 'bg-accent text-black' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                        >
                            Dashboard
                        </Link>
                    </div>

                    {/* Page Management */}
                    <div>
                        <h3 className="px-4 text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-2">Content</h3>
                        <div className="space-y-1">
                            <Link
                                href="/admin/pages"
                                className={`block px-4 py-2 rounded text-sm font-medium transition-colors ${pathname.startsWith('/admin/pages') ? 'text-white bg-white/5' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                            >
                                Pages
                            </Link>
                        </div>
                    </div>

                    {/* Blog Management */}
                    <div>
                        <h3 className="px-4 text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-2">Blog</h3>
                        <div className="space-y-1">
                            <Link
                                href="/admin/blog"
                                className={`block px-4 py-2 rounded text-sm font-medium transition-colors ${pathname === '/admin/blog' ? 'text-white bg-white/5' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                            >
                                All Posts
                            </Link>
                            <Link
                                href="/admin/blog/new"
                                className={`block px-4 py-2 rounded text-sm font-medium transition-colors ${pathname === '/admin/blog/new' ? 'text-white bg-white/5' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                            >
                                New Post
                            </Link>
                            <Link
                                href="/admin/authors"
                                className={`block px-4 py-2 rounded text-sm font-medium transition-colors ${pathname === '/admin/authors' ? 'text-white bg-white/5' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                            >
                                Authors
                            </Link>
                        </div>
                    </div>

                    {/* Shop Management */}
                    <div>
                        <h3 className="px-4 text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-2">Shop</h3>
                        <div className="space-y-1">
                            <Link
                                href="/admin/products"
                                className={`block px-4 py-2 rounded text-sm font-medium transition-colors ${pathname === '/admin/products' ? 'text-white bg-white/5' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                            >
                                All Products
                            </Link>
                            <Link
                                href="/admin/products/new"
                                className={`block px-4 py-2 rounded text-sm font-medium transition-colors ${pathname === '/admin/products/new' ? 'text-white bg-white/5' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                            >
                                New Product
                            </Link>
                        </div>
                    </div>

                    {/* Site */}
                    <div>
                        <h3 className="px-4 text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-2">Site</h3>
                        <div className="space-y-1">
                            <Link
                                href="/"
                                target="_blank"
                                className="block px-4 py-2 rounded text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                            >
                                View Live Site ↗
                            </Link>
                        </div>
                    </div>
                </nav>

                <div className="p-4 border-t border-white/10">
                    <div className="flex items-center gap-3 px-4">
                        <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-black font-bold text-xs">
                            A
                        </div>
                        <div>
                            <div className="text-sm font-bold text-white">Admin</div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-widest">Logged In</div>
                        </div>
                    </div>
                </div>
            </aside >

            {/* Main Content */}
            <main className="flex-1 ml-64 bg-black">
                {children}
            </main>
        </div>
    );
}
