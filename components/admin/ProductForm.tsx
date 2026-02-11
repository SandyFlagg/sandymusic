'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import MediaPicker from './MediaPicker';

interface ProductFormProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialData?: any;
    isEditing?: boolean;
}

export default function ProductForm({ initialData, isEditing = false }: ProductFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [showsMediaPicker, setShowsMediaPicker] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: 'ableton-templates',
        genre: '',
        description: '',
        artistStyle: '',
        image: '',
        previewAudioUrl: '',
        downloadUrl: '',
        specs: {
            daw: '',
            plugins: '',
            bpm: '',
            key: ''
        },
        features: [] as string[],
        badges: [] as string[]
    });

    // Load initial data
    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                price: initialData.price?.toString() || '',
                category: initialData.category || 'ableton-templates',
                genre: initialData.genre || '',
                description: initialData.description || '',
                artistStyle: initialData.artistStyle || '',
                image: initialData.image || '',
                previewAudioUrl: initialData.previewAudioUrl || initialData.previewAudio || '',
                downloadUrl: initialData.downloadUrl || '',
                specs: {
                    daw: initialData.specs?.daw || '',
                    plugins: initialData.specs?.plugins || '',
                    bpm: initialData.specs?.bpm?.toString() || '',
                    key: initialData.specs?.key || ''
                },
                features: initialData.features || [],
                badges: initialData.badges || []
            });
        }
    }, [initialData]);

    // Handlers
    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSpecChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            specs: { ...prev.specs, [field]: value }
        }));
    };

    // Feature List Logic
    const [newFeature, setNewFeature] = useState('');
    const addFeature = () => {
        if (!newFeature.trim()) return;
        setFormData(prev => ({ ...prev, features: [...prev.features, newFeature] }));
        setNewFeature('');
    };
    const removeFeature = (idx: number) => {
        setFormData(prev => ({ ...prev, features: prev.features.filter((_, i) => i !== idx) }));
    };

    // Badge List Logic
    const [newBadge, setNewBadge] = useState('');
    const addBadge = () => {
        if (!newBadge.trim()) return;
        setFormData(prev => ({ ...prev, badges: [...prev.badges, newBadge] }));
        setNewBadge('');
    };
    const removeBadge = (idx: number) => {
        setFormData(prev => ({ ...prev, badges: prev.badges.filter((_, i) => i !== idx) }));
    };

    // File Upload Handler (Generic)
    const handleFileUpload = async (file: File, field: 'previewAudioUrl' | 'downloadUrl') => {
        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('category', 'product-file');

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            if (data.success) {
                setFormData(prev => ({ ...prev, [field]: data.media.url }));
            } else {
                alert('Upload failed');
            }
        } catch (err) {
            console.error(err);
            alert('Upload error');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = '/api/products';
            const method = isEditing ? 'PUT' : 'POST';
            const body = {
                ...formData,
                id: isEditing ? initialData.id : undefined,
                specs: {
                    ...formData.specs,
                    bpm: formData.specs.bpm ? parseInt(formData.specs.bpm) : undefined
                }
            };

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            if (res.ok) {
                router.push('/admin/products');
            } else {
                const err = await res.json();
                alert('Error: ' + err.error);
            }
        } catch (err) {
            console.error(err);
            alert('Save failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-12 max-w-5xl">
            {/* Basic Info */}
            <section className="space-y-6">
                <h3 className="text-xl font-bold uppercase tracking-widest text-white border-b border-white/10 pb-2">Basic Info</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Product Name</label>
                        <input
                            required
                            type="text"
                            value={formData.name}
                            onChange={e => handleChange('name', e.target.value)}
                            className="w-full bg-black border border-white/10 rounded p-3 text-white focus:border-accent focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Price ($)</label>
                        <input
                            required
                            type="number"
                            step="0.01"
                            value={formData.price}
                            onChange={e => handleChange('price', e.target.value)}
                            className="w-full bg-black border border-white/10 rounded p-3 text-white focus:border-accent focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Category</label>
                        <select
                            value={formData.category}
                            onChange={e => handleChange('category', e.target.value)}
                            className="w-full bg-black border border-white/10 rounded p-3 text-white focus:border-accent focus:outline-none"
                        >
                            <option value="ableton-templates">Ableton Templates</option>
                            <option value="serum-presets">Serum Presets</option>
                            <option value="trinkets">Trinkets / Merch</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Genre</label>
                        <input
                            type="text"
                            value={formData.genre}
                            onChange={e => handleChange('genre', e.target.value)}
                            className="w-full bg-black border border-white/10 rounded p-3 text-white focus:border-accent focus:outline-none"
                            placeholder="e.g. Techno, House"
                        />
                    </div>
                </div>
            </section>

            {/* Media & Files */}
            <section className="space-y-6">
                <h3 className="text-xl font-bold uppercase tracking-widest text-white border-b border-white/10 pb-2">Files & Media</h3>

                {/* Cover Image */}
                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Cover Image</label>
                    <div className="flex items-start gap-6">
                        <div className="w-32 h-32 relative bg-[#111] rounded-lg border border-white/10 overflow-hidden flex-shrink-0">
                            {formData.image ? (
                                <Image src={formData.image} alt="Preview" fill className="object-cover" />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-700 text-xs text-center p-2">No Image</div>
                            )}
                        </div>
                        <div className="flex flex-col gap-3">
                            <button
                                type="button"
                                onClick={() => setShowsMediaPicker(true)}
                                className="bg-[#222] hover:bg-[#333] text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-widest transition-colors"
                            >
                                Select Image
                            </button>
                            {formData.image && (
                                <button type="button" onClick={() => handleChange('image', '')} className="text-red-500 text-xs uppercase font-bold tracking-widest text-left">Remove</button>
                            )}
                        </div>
                    </div>
                </div>

                {/* File Uploads */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Product File (ZIP/WAV)</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={formData.downloadUrl}
                                readOnly
                                placeholder="No file uploaded"
                                className="flex-1 bg-black border border-white/10 rounded p-3 text-white text-sm"
                            />
                            <label className="cursor-pointer bg-[#222] hover:bg-[#333] text-white px-4 py-3 rounded text-xs font-bold uppercase tracking-widest flex items-center justify-center">
                                Upload
                                <input type="file" className="hidden" onChange={e => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'downloadUrl')} />
                            </label>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">Verify this link is secure/correct.</p>
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Audio Preview (MP3)</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={formData.previewAudioUrl}
                                readOnly
                                placeholder="No audio uploaded"
                                className="flex-1 bg-black border border-white/10 rounded p-3 text-white text-sm"
                            />
                            <label className="cursor-pointer bg-[#222] hover:bg-[#333] text-white px-4 py-3 rounded text-xs font-bold uppercase tracking-widest flex items-center justify-center">
                                Upload
                                <input type="file" className="hidden" accept="audio/*" onChange={e => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'previewAudioUrl')} />
                            </label>
                        </div>
                    </div>
                </div>
            </section>

            {/* Specs */}
            <section className="space-y-6">
                <h3 className="text-xl font-bold uppercase tracking-widest text-white border-b border-white/10 pb-2">Technical Specs</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">DAW / Software</label>
                        <input type="text" value={formData.specs.daw} onChange={e => handleSpecChange('daw', e.target.value)} className="w-full bg-black border border-white/10 rounded p-3 text-white focus:border-accent focus:outline-none" placeholder="e.g. Ableton Live 11" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Required Plugins</label>
                        <input type="text" value={formData.specs.plugins} onChange={e => handleSpecChange('plugins', e.target.value)} className="w-full bg-black border border-white/10 rounded p-3 text-white focus:border-accent focus:outline-none" placeholder="e.g. Serum, Diva" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">BPM</label>
                        <input type="number" value={formData.specs.bpm} onChange={e => handleSpecChange('bpm', e.target.value)} className="w-full bg-black border border-white/10 rounded p-3 text-white focus:border-accent focus:outline-none" placeholder="124" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Key</label>
                        <input type="text" value={formData.specs.key} onChange={e => handleSpecChange('key', e.target.value)} className="w-full bg-black border border-white/10 rounded p-3 text-white focus:border-accent focus:outline-none" placeholder="G minor" />
                    </div>
                </div>
            </section>

            {/* Features & Description */}
            <section className="space-y-6">
                <h3 className="text-xl font-bold uppercase tracking-widest text-white border-b border-white/10 pb-2">Details</h3>

                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Key Features (Bullet Points)</label>
                    <div className="space-y-2 mb-2">
                        {formData.features.map((feat, idx) => (
                            <div key={idx} className="flex items-center gap-2 bg-[#111] border border-white/10 p-2 rounded px-3">
                                <span className="flex-1 text-sm">{feat}</span>
                                <button type="button" onClick={() => removeFeature(idx)} className="text-red-500 hover:text-red-400">✕</button>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newFeature}
                            onChange={e => setNewFeature(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                            className="flex-1 bg-black border border-white/10 rounded p-3 text-white focus:border-accent focus:outline-none"
                            placeholder="Type feature and press Enter"
                        />
                        <button type="button" onClick={addFeature} className="bg-[#222] hover:bg-[#333] text-white px-6 rounded font-bold uppercase tracking-widest">Add</button>
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Badges (e.g. Best Seller)</label>
                    <div className="space-y-2 mb-2">
                        {formData.badges.map((badge, idx) => (
                            <div key={idx} className="flex items-center gap-2 bg-[#111] border border-white/10 p-2 rounded px-3">
                                <span className="flex-1 text-sm">{badge}</span>
                                <button type="button" onClick={() => removeBadge(idx)} className="text-red-500 hover:text-red-400">✕</button>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newBadge}
                            onChange={e => setNewBadge(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addBadge())}
                            className="flex-1 bg-black border border-white/10 rounded p-3 text-white focus:border-accent focus:outline-none"
                            placeholder="Type badge and press Enter"
                        />
                        <button type="button" onClick={addBadge} className="bg-[#222] hover:bg-[#333] text-white px-6 rounded font-bold uppercase tracking-widest">Add</button>
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Description / About this pack</label>
                    <textarea
                        value={formData.description}
                        onChange={e => handleChange('description', e.target.value)}
                        rows={6}
                        className="w-full bg-black border border-white/10 rounded p-3 text-white focus:border-accent focus:outline-none"
                        placeholder="Detailed description of the product..."
                    />
                </div>
            </section>

            {/* Actions */}
            <div className="flex gap-4 pt-6 border-t border-white/10">
                <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-white text-black font-bold uppercase tracking-widest py-4 rounded hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                    {loading ? 'Saving...' : (isEditing ? 'Update Product' : 'Create Product')}
                </button>
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="flex-1 bg-transparent border border-white/20 text-white font-bold uppercase tracking-widest py-4 rounded hover:bg-white/5 transition-colors"
                >
                    Cancel
                </button>
            </div>

            {/* Media Picker Modal */}
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
                                handleChange('image', item.url);
                                setShowsMediaPicker(false);
                            }}
                        />
                    </div>
                </div>
            )}
        </form>
    );
}
