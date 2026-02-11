'use client';

import Link from 'next/link';
// import { useState, useEffect } from 'react';

export default function AdminDashboard() {
    return (
        <div className="p-12">
            <header className="mb-12">
                <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Dashboard</h1>
                <p className="text-gray-500">Welcome back to your command center.</p>
            </header>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-[#111] border border-white/10 p-8 rounded-2xl group hover:border-accent/50 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-white/5 rounded-lg text-accent">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Blog</span>
                    </div>
                    <div className="text-3xl font-black text-white mb-1">Manage</div>
                    <div className="text-sm text-gray-400 mb-6">Create and edit posts</div>
                    <Link href="/admin/blog/new" className="text-accent text-xs font-bold uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2">
                        Create Post →
                    </Link>
                </div>

                <div className="bg-[#111] border border-white/10 p-8 rounded-2xl group hover:border-accent/50 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-white/5 rounded-lg text-blue-500">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Shop</span>
                    </div>
                    <div className="text-3xl font-black text-white mb-1">Products</div>
                    <div className="text-sm text-gray-400 mb-6">Manage your inventory</div>
                    <Link href="/admin/products/new" className="text-blue-500 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2">
                        Add Product →
                    </Link>
                </div>

                <div className="bg-[#111] border border-white/10 p-8 rounded-2xl group hover:border-accent/50 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-white/5 rounded-lg text-green-500">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Authors</span>
                    </div>
                    <div className="text-3xl font-black text-white mb-1">Team</div>
                    <div className="text-sm text-gray-400 mb-6">Manage contributors</div>
                    <Link href="/admin/authors" className="text-green-500 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2">
                        Manage Authors →
                    </Link>
                </div>
            </div>

            {/* Recent Activity Placeholder */}
            <div>
                <h2 className="text-xl font-bold uppercase tracking-tighter mb-6">Recent Activity</h2>
                <div className="bg-[#111] border border-white/10 rounded-xl p-8 text-center text-gray-500">
                    No recent activity to show.
                </div>
            </div>
        </div>
    );
}
