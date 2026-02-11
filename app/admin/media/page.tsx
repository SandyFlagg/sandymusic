'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import MediaDetailModal from '@/components/admin/MediaDetailModal';

interface MediaItem {
    id: string;
    url: string;
    filename: string;
    type: string;
    category?: string;
    altText?: string;
    caption?: string;
}

export default function MediaLibrary() {
    const [media, setMedia] = useState<MediaItem[]>([]);
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

    const fetchMedia = async () => {
        const res = await fetch('/api/upload');
        const data = await res.json();
        if (data.success) {
            setMedia(data.media);
        }
    };

    useEffect(() => {
        fetchMedia();
    }, []);

    const handleUpload = async (file: File) => {
        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('category', 'uncategorized'); // Default for direct upload

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (data.success) {
                // Refresh list
                fetchMedia();
            } else {
                alert('Upload failed: ' + data.message);
            }
        } catch (err) {
            alert('Upload error');
        } finally {
            setUploading(false);
        }
    };

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleUpload(e.dataTransfer.files[0]);
        }
    }, []);

    return (
        <div className="p-8 text-white min-h-screen">
            <h1 className="text-3xl font-black uppercase mb-8">Media Library</h1>

            {/* Upload Zone */}
            <div
                className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors mb-12 ${dragActive ? 'border-accent bg-accent/10' : 'border-white/20 bg-white/5 hover:border-white/40'
                    }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <div className="flex flex-col items-center gap-4">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                    <p className="text-xl font-bold">Drag & Drop files here</p>
                    <p className="text-gray-400">or</p>
                    <label className="cursor-pointer bg-white text-black px-6 py-3 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform">
                        Browse Files
                        <input
                            type="file"
                            className="hidden"
                            onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
                        />
                    </label>
                </div>
                {uploading && <p className="mt-4 text-accent animate-pulse">Uploading...</p>}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {media.map((item, i) => (
                    <button
                        key={i}
                        onClick={() => setSelectedItem(item)}
                        className="group relative aspect-square bg-gray-900 rounded-lg overflow-hidden border border-white/10 hover:border-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent text-left"
                    >
                        <Image
                            src={item.url}
                            alt={item.altText || item.filename}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2">
                            <span className="text-xs text-white truncate w-full font-bold">{item.filename}</span>
                            {item.category && <span className="text-[10px] text-gray-400 uppercase">{item.category}</span>}
                        </div>
                    </button>
                ))}
            </div>

            {media.length === 0 && (
                <div className="text-center text-gray-500 py-12">
                    No media found. Upload your first image!
                </div>
            )}

            {selectedItem && (
                <MediaDetailModal
                    media={selectedItem}
                    onClose={() => setSelectedItem(null)}
                    onUpdate={fetchMedia}
                />
            )}
        </div>
    );
}
