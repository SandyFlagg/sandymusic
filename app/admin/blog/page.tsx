'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';


export default function BlogAdminPage() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/blog-posts')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setPosts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="p-12">
            <div className="flex items-center justify-between mb-12">
                <div>
                    <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Blog Posts</h1>
                    <p className="text-gray-500">Manage your articles and content.</p>
                </div>
                <Link href="/admin/blog/new" className="bg-accent text-black font-bold uppercase tracking-widest px-6 py-3 rounded-sm hover:bg-white transition-colors">
                    + New Post
                </Link>
            </div>

            {loading ? (
                <div className="text-gray-500">Loading posts...</div>
            ) : (
                <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 border-b border-white/10 text-xs font-bold uppercase tracking-widest text-gray-500">
                            <tr>
                                <th className="p-6">Title</th>
                                <th className="p-6">Author</th>
                                <th className="p-6">Status</th>
                                <th className="p-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                            {posts.map(post => (
                                <tr key={post.id} className="hover:bg-white/5 transition-colors">
                                    <td className="p-6 font-bold text-white">{post.title}</td>
                                    <td className="p-6 text-gray-400">{post.authorName}</td>
                                    <td className="p-6">
                                        {post.published ? (
                                            <span className="bg-green-500/20 text-green-500 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest">Published</span>
                                        ) : (
                                            <span className="bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest">Draft</span>
                                        )}
                                    </td>
                                    <td className="p-6 text-right">
                                        <Link href={`/blog/${post.slug}`} className="text-gray-500 hover:text-white text-xs font-bold uppercase tracking-widest mr-4">
                                            View
                                        </Link>
                                        <span className="text-gray-700">|</span>
                                        <button className="text-accent hover:text-white text-xs font-bold uppercase tracking-widest ml-4">
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {posts.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="p-12 text-center text-gray-500">
                                        No posts found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
