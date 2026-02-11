'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

import MediaPicker from '@/components/admin/MediaPicker';

export default function AuthorsPage() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [authors, setAuthors] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showsMediaPicker, setShowsMediaPicker] = useState(false);
    const [newAuthor, setNewAuthor] = useState({
        name: '',
        role: '',
        bio: '',
        avatarUrl: ''
    });
    const [editingAuthorId, setEditingAuthorId] = useState<string | null>(null);

    useEffect(() => {
        fetchAuthors();
    }, []);

    const fetchAuthors = async () => {
        try {
            const res = await fetch('/api/authors');
            const data = await res.json();
            if (Array.isArray(data)) setAuthors(data);
        } catch (error) {
            console.error('Failed to fetch authors', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newAuthor.name) return;

        try {
            const url = '/api/authors';
            const method = editingAuthorId ? 'PUT' : 'POST';
            const body = editingAuthorId ? { ...newAuthor, id: editingAuthorId } : newAuthor;

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            if (res.ok) {
                setNewAuthor({ name: '', role: '', bio: '', avatarUrl: '' });
                setEditingAuthorId(null);
                fetchAuthors();
            } else {
                const errData = await res.json();
                console.error('Server error saving author:', errData);
            }
        } catch (error) {
            console.error('Failed to save author', error);
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleEdit = (author: any) => {
        setNewAuthor({
            name: author.name,
            role: author.role || '',
            bio: author.bio || '',
            avatarUrl: author.avatarUrl || ''
        });
        setEditingAuthorId(author.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancel = () => {
        setNewAuthor({ name: '', role: '', bio: '', avatarUrl: '' });
        setEditingAuthorId(null);
    };

    return (
        <div className="p-12">
            <div className="mb-12">
                <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Manage Authors</h1>
                <p className="text-gray-500">Add and edit contributors to your blog.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Create Author Form */}
                <div>
                    <h2 className="text-xl font-bold uppercase tracking-tighter mb-6 text-white">
                        {editingAuthorId ? 'Edit Author' : 'Add New Author'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6 bg-[#111] border border-white/10 p-8 rounded-2xl">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Name</label>
                            <input
                                type="text"
                                value={newAuthor.name}
                                onChange={e => setNewAuthor({ ...newAuthor, name: e.target.value })}
                                className="w-full bg-black border border-white/10 rounded p-3 text-white focus:border-accent focus:outline-none"
                                placeholder="e.g. Sandy Flagg"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Role</label>
                            <input
                                type="text"
                                value={newAuthor.role}
                                onChange={e => setNewAuthor({ ...newAuthor, role: e.target.value })}
                                className="w-full bg-black border border-white/10 rounded p-3 text-white focus:border-accent focus:outline-none"
                                placeholder="e.g. Music Producer"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Avatar</label>
                            <div className="flex items-center gap-4">
                                {newAuthor.avatarUrl ? (
                                    <div className="w-16 h-16 relative rounded-full overflow-hidden border border-white/10">
                                        <Image
                                            src={newAuthor.avatarUrl}
                                            alt="Preview"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-16 h-16 rounded-full bg-black border border-white/10 flex items-center justify-center text-gray-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                        </svg>
                                    </div>
                                )}
                                <div className="flex flex-col gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowsMediaPicker(true)}
                                        className="cursor-pointer bg-[#222] hover:bg-[#333] text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-widest transition-colors text-center"
                                    >
                                        Select Avatar
                                    </button>
                                    {newAuthor.avatarUrl && (
                                        <button
                                            type="button"
                                            onClick={() => setNewAuthor({ ...newAuthor, avatarUrl: '' })}
                                            className="text-xs text-red-500 hover:text-red-400 font-bold uppercase tracking-widest"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Bio</label>
                            <textarea
                                value={newAuthor.bio}
                                onChange={e => setNewAuthor({ ...newAuthor, bio: e.target.value })}
                                rows={3}
                                className="w-full bg-black border border-white/10 rounded p-3 text-white focus:border-accent focus:outline-none"
                                placeholder="Short bio..."
                            />
                        </div>
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                className="flex-1 bg-white text-black font-bold uppercase tracking-widest text-sm py-4 rounded hover:bg-gray-200 transition-colors"
                            >
                                {editingAuthorId ? 'Update Author' : 'Create Author'}
                            </button>
                            {editingAuthorId && (
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="flex-1 bg-red-500/10 text-red-500 border border-red-500/20 font-bold uppercase tracking-widest text-sm py-4 rounded hover:bg-red-500/20 transition-colors"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>

                    {showsMediaPicker && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-8">
                            <div className="bg-gray-900 w-full max-w-4xl h-[80vh] rounded-xl border border-white/10 flex flex-col shadow-2xl">
                                <div className="flex justify-between items-center p-4 border-b border-white/10 bg-black/20">
                                    <h3 className="text-lg font-bold uppercase tracking-widest">Media Library</h3>
                                    <button type="button" onClick={() => setShowsMediaPicker(false)} className="text-gray-400 hover:text-white">✕</button>
                                </div>
                                <MediaPicker
                                    className="flex-1 w-full border-0"
                                    onSelect={(item) => {
                                        setNewAuthor({ ...newAuthor, avatarUrl: item.url });
                                        setShowsMediaPicker(false);
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Authors List */}
                <div>
                    <h2 className="text-xl font-bold uppercase tracking-tighter mb-6 text-white">Existing Authors</h2>
                    <div className="space-y-4">
                        {authors.map(author => (
                            <div
                                key={author.id}
                                onClick={() => handleEdit(author)}
                                className={`bg-[#111] border p-6 rounded-xl flex items-center gap-4 cursor-pointer hover:border-accent transition-colors ${editingAuthorId === author.id ? 'border-accent ring-1 ring-accent' : 'border-white/10'}`}
                            >
                                {author.avatarUrl ? (
                                    <div className="w-12 h-12 relative rounded-full overflow-hidden border border-white/10">
                                        <Image
                                            src={author.avatarUrl}
                                            alt={author.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-12 h-12 rounded-full bg-gray-800 border border-white/10 flex items-center justify-center text-xs font-bold">
                                        {author.name.charAt(0)}
                                    </div>
                                )}
                                <div>
                                    <div className="font-bold text-white">{author.name}</div>
                                    <div className="text-xs text-accent uppercase tracking-widest">{author.role}</div>
                                </div>
                            </div>
                        ))}
                        {authors.length === 0 && !loading && (
                            <div className="text-gray-500 italic">No authors found.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
