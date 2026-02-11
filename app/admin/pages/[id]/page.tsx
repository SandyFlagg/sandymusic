
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { use } from 'react';

export default function EditPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        description: '',
        content: '',
        metaTitle: '',
        metaDescription: '',
        isPublished: false,
    });

    useEffect(() => {
        fetch(`/api/pages/${resolvedParams.id}`)
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch');
                return res.json();
            })
            .then((data) => {
                setFormData({
                    title: data.title,
                    slug: data.slug,
                    description: data.description || '',
                    content: data.content || '',
                    metaTitle: data.metaTitle || '',
                    metaDescription: data.metaDescription || '',
                    isPublished: data.isPublished,
                });
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                alert('Error loading page');
                router.push('/admin/pages');
            });
    }, [resolvedParams.id, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch(`/api/pages/${resolvedParams.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.error || 'Failed to update');
            }

            router.push('/admin/pages');
            router.refresh();
        } catch (err: any) {
            alert(err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this page?')) return;
        try {
            const res = await fetch(`/api/pages/${resolvedParams.id}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error('Failed to delete');
            router.push('/admin/pages');
            router.refresh();
        } catch (err) {
            alert('Error deleting page');
        }
    };

    if (loading) return <div className="p-8 text-white">Loading...</div>;

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/pages" className="text-gray-500 hover:text-white transition-colors">
                    ← Back
                </Link>
                <h1 className="text-2xl font-black uppercase text-white">Edit Page</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full bg-[#111] border border-white/10 rounded-lg p-3 text-white focus:border-accent outline-none"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Slug</label>
                        <input
                            type="text"
                            value={formData.slug}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                            className="w-full bg-[#111] border border-white/10 rounded-lg p-3 text-white focus:border-accent outline-none font-mono text-sm"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Description (Summary)</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full bg-[#111] border border-white/10 rounded-lg p-3 text-white focus:border-accent outline-none h-24"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Content (HTML allowed)</label>
                    <textarea
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        className="w-full bg-[#111] border border-white/10 rounded-lg p-3 text-white focus:border-accent outline-none h-64 font-mono text-sm"
                    />
                </div>

                <div className="border-t border-white/10 pt-8">
                    <h3 className="text-sm font-bold uppercase text-white mb-6">SEO Metadata</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Meta Title</label>
                            <input
                                type="text"
                                value={formData.metaTitle}
                                onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                                className="w-full bg-[#111] border border-white/10 rounded-lg p-3 text-white focus:border-accent outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Meta Description</label>
                            <input
                                type="text"
                                value={formData.metaDescription}
                                onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                                className="w-full bg-[#111] border border-white/10 rounded-lg p-3 text-white focus:border-accent outline-none"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between border-t border-white/10 pt-8">
                    <div className="flex items-center gap-4">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.isPublished}
                                onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                                className="w-5 h-5 rounded border-gray-600 bg-gray-800 text-accent focus:ring-accent"
                            />
                            <span className="text-sm font-bold text-white">Published</span>
                        </label>

                        <button
                            type="button"
                            onClick={handleDelete}
                            className="text-red-500 hover:text-red-400 text-sm font-bold uppercase tracking-wide px-4"
                        >
                            Delete Page
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-accent text-black px-8 py-3 rounded-full font-black uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50"
                    >
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
}
