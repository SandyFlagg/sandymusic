'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const RichTextEditor = dynamic(() => import('@/app/components/RichTextEditor'), { ssr: false });
import MediaPicker from '@/components/admin/MediaPicker';

export default function EditBlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showsMediaPicker, setShowsMediaPicker] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [authors, setAuthors] = useState<any[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [formData, setFormData] = useState<any>({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        categories: [],
        tags: '',
        imageUrl: '',
        readTime: '',
        published: false,
        adminNotes: '',
        metaTitle: '',
        metaDescription: '',
        blogAuthorId: '',
        keyPoints: ['']
    });

    // Fetch existing post
    useEffect(() => {
        Promise.all([
            fetch(`/api/blog-posts/${slug}`).then(r => r.json()),
            fetch('/api/authors').then(r => r.json())
        ]).then(([post, authorsData]) => {
            if (post && !post.error) {
                setFormData({
                    title: post.title || '',
                    slug: post.slug || '',
                    excerpt: post.excerpt || '',
                    content: post.content || '',
                    categories: post.categories || [],
                    tags: Array.isArray(post.tags) ? post.tags.join(', ') : (post.tags || ''),
                    imageUrl: post.imageUrl || '',
                    readTime: post.readTime || '',
                    published: post.published || false,
                    adminNotes: post.adminNotes || '',
                    metaTitle: post.metaTitle || '',
                    metaDescription: post.metaDescription || '',
                    blogAuthorId: post.blogAuthorId || '',
                    keyPoints: post.keyPoints?.length > 0 ? post.keyPoints : ['']
                });
            }
            if (Array.isArray(authorsData)) setAuthors(authorsData);
            setLoading(false);
        }).catch(err => {
            console.error('Failed to load post:', err);
            setLoading(false);
        });
    }, [slug]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setFormData((prev: any) => ({ ...prev, [name]: value }));

        if (name === 'title') {
            const newSlug = value.toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '');
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setFormData((prev: any) => ({ ...prev, slug: newSlug }));
        }

        if (name === 'content') {
            const text = value.replace(/<[^>]*>/g, '');
            const words = text.trim().split(/\s+/).length;
            const minutes = Math.ceil(words / 200);
            const readTime = `${minutes} min read`;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setFormData((prev: any) => ({ ...prev, readTime }));
        }
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setFormData((prev: any) => ({ ...prev, [name]: checked }));
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const res = await fetch(`/api/blog-posts/${slug}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    newSlug: formData.slug !== slug ? formData.slug : undefined,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    tags: typeof formData.tags === 'string' ? formData.tags.split(',').map((t: any) => t.trim()).filter(Boolean) : formData.tags,
                    keyPoints: formData.keyPoints.filter((p: string) => p.trim() !== '')
                })
            });

            if (res.ok) {
                const updated = await res.json();
                router.push(`/admin/blog`);
                router.refresh();
                // If slug changed, update the URL
                if (updated.slug !== slug) {
                    router.replace(`/admin/blog/edit/${updated.slug}`);
                }
            } else {
                const error = await res.json();
                alert(`Error: ${error.error || 'Failed to update post'}`);
            }
        } catch (error) {
            console.error('Failed to update post:', error);
            alert('Failed to update post');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to permanently delete this blog post? This cannot be undone.')) return;

        try {
            const res = await fetch(`/api/blog-posts/${slug}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                router.push('/admin/blog');
                router.refresh();
            } else {
                alert('Failed to delete post');
            }
        } catch (error) {
            console.error('Failed to delete post:', error);
            alert('Failed to delete post');
        }
    };

    if (loading) {
        return (
            <div className="p-12">
                <div className="text-gray-500">Loading post...</div>
            </div>
        );
    }

    return (
        <div className="p-12">
            <div className="mb-12">
                <Link href="/admin/blog" className="text-gray-500 hover:text-white text-xs font-bold uppercase tracking-widest mb-4 block">
                    ← Back to Posts
                </Link>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Edit Post</h1>
                        <p className="text-gray-500">Update your article.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href={`/blog/${formData.slug}`}
                            target="_blank"
                            className="border border-white/20 text-gray-400 hover:text-white font-bold uppercase tracking-widest text-xs px-6 py-3 rounded-sm transition-colors"
                        >
                            Preview
                        </Link>
                        <button
                            onClick={handleDelete}
                            className="border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white font-bold uppercase tracking-widest text-xs px-6 py-3 rounded-sm transition-colors"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl">
                <form onSubmit={handleSave} className="space-y-8">

                    {/* Title & Slug */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="w-full bg-[#111] border border-white/10 rounded p-4 text-xl font-bold text-white focus:border-accent focus:outline-none"
                                placeholder="Enter post title..."
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Slug</label>
                            <input
                                type="text"
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                required
                                className="w-full bg-[#111] border border-white/10 rounded p-3 text-sm font-mono text-gray-300 focus:border-accent focus:outline-none"
                                placeholder="post-url-slug"
                            />
                        </div>
                    </div>

                    {/* Meta Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Categories</label>
                            <div className="grid grid-cols-2 gap-3 bg-[#111] border border-white/10 rounded p-4">
                                {['Production', 'DJing', 'Music Marketing', 'Backstage'].map((cat) => (
                                    <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={formData.categories?.includes(cat) || false}
                                            onChange={(e) => {
                                                const checked = e.target.checked;
                                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                                setFormData((prev: any) => {
                                                    const current = prev.categories || [];
                                                    const updated = checked
                                                        ? [...current, cat]
                                                        : current.filter((c: string) => c !== cat);
                                                    return { ...prev, categories: updated };
                                                });
                                            }}
                                            className="w-4 h-4 rounded border-white/20 bg-gray-900 checked:bg-accent focus:ring-accent"
                                        />
                                        <span className={`text-sm ${formData.categories?.includes(cat) ? 'text-white font-bold' : 'text-gray-400 group-hover:text-gray-300'}`}>
                                            {cat}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Read Time (Auto)</label>
                            <input
                                type="text"
                                name="readTime"
                                value={formData.readTime}
                                readOnly
                                className="w-full bg-[#111]/50 border border-white/10 rounded p-3 text-gray-400 cursor-not-allowed focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Cover Image</label>

                        {formData.imageUrl ? (
                            <div className="relative aspect-video w-full max-w-md bg-gray-900 rounded-lg overflow-hidden border border-white/10 mb-4 group">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={formData.imageUrl} alt="Cover" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowsMediaPicker(true)}
                                        className="bg-white text-black text-xs font-bold uppercase px-3 py-2 rounded hover:scale-105 transition-transform"
                                    >
                                        Change
                                    </button>
                                    <button
                                        type="button"
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        onClick={() => setFormData((prev: any) => ({ ...prev, imageUrl: '' }))}
                                        className="bg-red-500 text-white text-xs font-bold uppercase px-3 py-2 rounded hover:scale-105 transition-transform"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={() => setShowsMediaPicker(true)}
                                className="w-full max-w-md aspect-video bg-[#111] border-2 border-dashed border-white/10 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-accent hover:bg-accent/5 transition-colors group"
                            >
                                <svg className="w-8 h-8 text-gray-500 group-hover:text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="text-sm font-bold text-gray-400 group-hover:text-white uppercase tracking-widest">Select Cover Image</span>
                            </button>
                        )}

                        {showsMediaPicker && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-8">
                                <div className="bg-gray-900 w-full max-w-4xl h-[80vh] rounded-xl border border-white/10 flex flex-col shadow-2xl">
                                    <div className="flex justify-between items-center p-4 border-b border-white/10 bg-black/20">
                                        <h3 className="text-lg font-bold uppercase tracking-widest">Media Library</h3>
                                        <button type="button" onClick={() => setShowsMediaPicker(false)} className="text-gray-400 hover:text-white">✕</button>
                                    </div>
                                    <MediaPicker
                                        className="flex-1 w-full border-0"
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        onSelect={(item: any) => {
                                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                            setFormData((prev: any) => ({ ...prev, imageUrl: item.url }));
                                            setShowsMediaPicker(false);
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Excerpt */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Excerpt</label>
                        <textarea
                            name="excerpt"
                            value={formData.excerpt}
                            onChange={handleChange}
                            rows={3}
                            className="w-full bg-[#111] border border-white/10 rounded p-3 text-white focus:border-accent focus:outline-none"
                            placeholder="Brief summary for the card..."
                        />
                    </div>

                    {/* Key Points */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Key Points (Summary)</label>
                        <div className="space-y-3">
                            {formData.keyPoints.map((point: string, index: number) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={point}
                                        onChange={(e) => {
                                            const newPoints = [...formData.keyPoints];
                                            newPoints[index] = e.target.value;
                                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                            setFormData((prev: any) => ({ ...prev, keyPoints: newPoints }));
                                        }}
                                        placeholder={`Point ${index + 1}`}
                                        className="flex-1 bg-[#111] border border-white/10 rounded p-3 text-white focus:border-accent focus:outline-none"
                                    />
                                    {formData.keyPoints.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newPoints = formData.keyPoints.filter((_: string, i: number) => i !== index);
                                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                                setFormData((prev: any) => ({ ...prev, keyPoints: newPoints }));
                                            }}
                                            className="px-4 text-gray-500 hover:text-red-500 font-bold"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                onClick={() => setFormData((prev: any) => ({ ...prev, keyPoints: [...prev.keyPoints, ''] }))}
                                className="text-accent text-xs font-bold uppercase tracking-widest hover:text-white transition-colors"
                            >
                                + Add Point
                            </button>
                        </div>
                    </div>

                    {/* Content Editor */}
                    <div className="flex-1 flex flex-col min-h-[500px]">
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Content</label>
                        <div className="flex-1">
                            <RichTextEditor
                                content={formData.content}
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                onChange={(html) => setFormData((prev: any) => ({ ...prev, content: html }))}
                            />
                        </div>
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Tags (comma separated)</label>
                        <input
                            type="text"
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            placeholder="Techno, Ableton, Tips"
                            className="w-full bg-[#111] border border-white/10 rounded p-3 text-white focus:border-accent focus:outline-none"
                        />
                    </div>

                    {/* Published */}
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            name="published"
                            id="published"
                            checked={formData.published}
                            onChange={handleCheckboxChange}
                            className="w-5 h-5 rounded border-white/10 bg-[#111] text-accent focus:ring-accent"
                        />
                        <label htmlFor="published" className="text-sm font-bold text-white cursor-pointer select-none">
                            Published
                        </label>
                    </div>

                    {/* Author Selection */}
                    <div className="mb-8">
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Author</label>
                        <div className="flex gap-4">
                            <select
                                name="blogAuthorId"
                                value={formData.blogAuthorId}
                                onChange={handleChange}
                                className="flex-1 bg-[#111] border border-white/10 rounded p-3 text-white focus:border-accent focus:outline-none appearance-none"
                            >
                                <option value="">Select an Author...</option>
                                {authors.map(author => (
                                    <option key={author.id} value={author.id}>{author.name}</option>
                                ))}
                            </select>
                            <Link href="/admin/authors" target="_blank" className="bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded font-bold text-sm transition-colors">
                                Manage Authors
                            </Link>
                        </div>
                    </div>

                    {/* SEO & Notes */}
                    <div className="pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-6">Metadata (SEO)</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Meta Title</label>
                                    <input
                                        type="text"
                                        name="metaTitle"
                                        value={formData.metaTitle || ''}
                                        onChange={handleChange}
                                        placeholder="Title for search engines"
                                        className="w-full bg-[#111] border border-white/10 rounded p-3 text-white focus:border-accent focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Meta Description</label>
                                    <textarea
                                        name="metaDescription"
                                        value={formData.metaDescription || ''}
                                        onChange={handleChange}
                                        rows={3}
                                        placeholder="Description for search results..."
                                        className="w-full bg-[#111] border border-white/10 rounded p-3 text-white focus:border-accent focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-6">Internal Notes</h3>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Strategy / Reminders</label>
                                <textarea
                                    name="adminNotes"
                                    value={formData.adminNotes || ''}
                                    onChange={handleChange}
                                    rows={8}
                                    placeholder="Jot down keywords to target, content strategy, or reminders..."
                                    className="w-full bg-[#111] border border-white/10 rounded p-3 text-white focus:border-accent focus:outline-none h-full"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="text-red-500 hover:text-red-400 text-xs font-bold uppercase tracking-widest transition-colors"
                        >
                            Delete Post
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="bg-accent text-black font-bold uppercase tracking-widest px-8 py-4 rounded-sm hover:bg-white transition-colors disabled:opacity-50"
                        >
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
