'use client';

import { useState } from 'react';
import Image from 'next/image';

interface MediaItem {
    id: string; // filename in local mode
    url: string;
    filename: string;
    category?: string;
    type: string;
    altText?: string;
    caption?: string;
}

interface MediaDetailModalProps {
    media: MediaItem;
    onClose: () => void;
    onUpdate: () => void;
}

export default function MediaDetailModal({ media, onClose, onUpdate }: MediaDetailModalProps) {
    const [altText, setAltText] = useState(media.altText || '');
    const [caption, setCaption] = useState(media.caption || '');
    const [category, setCategory] = useState(media.category || 'uncategorized');
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch(`/api/media/${media.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ altText, caption, category })
            });
            if (res.ok) {
                onUpdate();
                onClose();
            } else {
                alert('Failed to save metadata');
            }
        } catch {
            alert('Error saving metadata');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-gray-900 border border-white/10 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row">

                {/* Image Preview */}
                <div className="relative w-full md:w-2/3 bg-black flex items-center justify-center min-h-[300px]">
                    <div className="relative w-full h-full min-h-[300px]">
                        <Image src={media.url} alt={altText || media.filename} fill className="object-contain" />
                    </div>
                </div>

                {/* Sidebar */}
                <div className="md:w-1/3 p-6 flex flex-col gap-4 border-l border-white/10 overflow-y-auto">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="font-bold text-lg truncate" title={media.filename}>{media.filename}</h3>
                        <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs uppercase font-bold text-gray-500">Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="bg-black border border-white/20 rounded p-2 text-sm text-white focus:outline-none focus:border-accent"
                        >
                            <option value="blog">Blog Image</option>
                            <option value="product">Product Image</option>
                            <option value="uncategorized">Uncategorized</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs uppercase font-bold text-gray-500">Alt Text</label>
                        <textarea
                            value={altText}
                            onChange={(e) => setAltText(e.target.value)}
                            className="bg-black border border-white/20 rounded p-2 text-sm text-white focus:outline-none focus:border-accent min-h-[80px]"
                            placeholder="Describe the image for accessibility..."
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs uppercase font-bold text-gray-500">Caption</label>
                        <textarea
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            className="bg-black border border-white/20 rounded p-2 text-sm text-white focus:outline-none focus:border-accent min-h-[80px]"
                            placeholder="Visible caption under image..."
                        />
                    </div>

                    <div className="flex flex-col gap-2 mt-auto pt-4 border-t border-white/10">
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>Type: {media.type}</span>
                            <button
                                onClick={() => navigator.clipboard.writeText(media.url)}
                                className="text-accent hover:underline"
                            >
                                Copy URL
                            </button>
                        </div>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="bg-white text-black font-bold uppercase py-3 rounded hover:scale-105 transition-transform disabled:opacity-50"
                        >
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
