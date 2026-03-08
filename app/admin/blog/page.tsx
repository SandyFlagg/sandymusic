'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function BlogAdminPage() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = () => {
        setLoading(true);
        fetch('/api/blog-posts?all=true')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setPosts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDelete = async (slug: string, title: string) => {
        if (!confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) return;

        try {
            const res = await fetch(`/api/blog-posts/${slug}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                fetchPosts();
            } else {
                alert('Failed to delete post');
            }
        } catch (error) {
            console.error('Failed to delete:', error);
            alert('Failed to delete post');
        }
    };

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
                                <th className="p-6">Date</th>
                                <th className="p-6">Status</th>
                                <th className="p-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                            {posts.map(post => (
                                <tr key={post.id} className="hover:bg-white/5 transition-colors">
                                    <td className="p-6 font-bold text-white">{post.title}</td>
                                    <td className="p-6 text-gray-400">{post.authorName}</td>
                                    <td className="p-6 text-gray-500 text-sm">
                                        {new Date(post.createdAt).toLocaleDateString('en-AU', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric'
                                        })}
                                    </td>
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
                                        <Link href={`/admin/blog/edit/${post.slug}`} className="text-accent hover:text-white text-xs font-bold uppercase tracking-widest ml-4 mr-4">
                                            Edit
                                        </Link>
                                        <span className="text-gray-700">|</span>
                                        <button
                                            onClick={() => handleDelete(post.slug, post.title)}
                                            className="text-red-500 hover:text-red-400 text-xs font-bold uppercase tracking-widest ml-4"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {posts.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="p-12 text-center text-gray-500">
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
