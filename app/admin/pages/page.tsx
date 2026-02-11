
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Page {
    id: string;
    title: string;
    slug: string;
    isPublished: boolean;
    updatedAt: string;
}

export default function PagesAdmin() {
    const [pages, setPages] = useState<Page[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/pages')
            .then((res) => res.json())
            .then((data) => {
                setPages(data);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="p-8 text-white">Loading pages...</div>;

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-black uppercase text-white">Pages</h1>
                <Link
                    href="/admin/pages/new"
                    className="bg-accent text-black px-6 py-2 rounded font-bold uppercase hover:bg-white transition-colors"
                >
                    New Page
                </Link>
            </div>

            <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-white/5 text-gray-400 text-xs font-bold uppercase tracking-widest border-b border-white/10">
                        <tr>
                            <th className="px-6 py-4">Title</th>
                            <th className="px-6 py-4">Slug</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Last Updated</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {pages.map((page) => (
                            <tr key={page.id} className="hover:bg-white/5 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="font-bold text-white">{page.title}</div>
                                </td>
                                <td className="px-6 py-4 text-gray-400 font-mono text-sm">/{page.slug}</td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${page.isPublished ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
                                            }`}
                                    >
                                        {page.isPublished ? 'Published' : 'Draft'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {new Date(page.updatedAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Link
                                        href={`/admin/pages/${page.id}`}
                                        className="text-accent hover:text-white font-bold text-sm uppercase tracking-wide"
                                    >
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        {pages.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                    No pages found. Create one to get started.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
