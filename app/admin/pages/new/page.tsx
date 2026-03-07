
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewPage() {
    const router = useRouter();
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch('/api/pages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.error || 'Failed to create');
            }

            router.push('/admin/pages');
            router.refresh();
        } catch (err) {
            if (err instanceof Error) alert(err.message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/pages" className="text-gray-500 hover:text-white transition-colors">
                    ← Back
                </Link>
                <h1 className="text-2xl font-black uppercase text-white">Create New Page</h1>
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
                        type="submit"
                        disabled={saving}
                        className="bg-accent text-black px-8 py-3 rounded-full font-black uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50"
                    >
                        {saving ? 'Creating...' : 'Create Page'}
                    </button>
                </div>
            </form>
        </div>
    );
}
