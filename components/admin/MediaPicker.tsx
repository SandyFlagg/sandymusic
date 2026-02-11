'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface MediaItem {
    id: string; // filename in local mode
    url: string;
    filename: string;
    category: string;
    altText?: string;
    caption?: string;
}

interface MediaPickerProps {
    onSelect?: (item: MediaItem) => void;
    className?: string;
}

export default function MediaPicker({ onSelect, className = '' }: MediaPickerProps) {
    const [activeTab, setActiveTab] = useState<'upload' | 'library'>('upload');
    const [media, setMedia] = useState<MediaItem[]>([]);
    const [uploading, setUploading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('blog');

    // Fetch Logic
    const fetchMedia = async () => {
        const res = await fetch('/api/upload');
        const data = await res.json();
        if (data.success) {
            setMedia(data.media);
        }
    };

    useEffect(() => {
        if (activeTab === 'library') {
            fetchMedia();
        }
    }, [activeTab]);

    // Upload Logic
    const handleUpload = async (file: File) => {
        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('category', selectedCategory);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (data.success) {
                if (onSelect) onSelect(data.media);
                setActiveTab('library'); // Switch to library to show it (optional)
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

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files?.[0]) {
            handleUpload(e.dataTransfer.files[0]);
        }
    }, [selectedCategory]);

    return (
        <div className={`bg-gray-900 border border-white/10 rounded-xl overflow-hidden flex flex-col ${className}`}>
            {/* Tabs */}
            <div className="flex border-b border-white/10">
                <button
                    onClick={() => setActiveTab('upload')}
                    className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider ${activeTab === 'upload' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                    Upload New
                </button>
                <button
                    onClick={() => setActiveTab('library')}
                    className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider ${activeTab === 'library' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                    Browse Library
                </button>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 min-h-[300px] overflow-y-auto">
                {activeTab === 'upload' ? (
                    <div
                        className="h-full border-2 border-dashed border-white/20 rounded-lg flex flex-col items-center justify-center gap-4 hover:border-accent hover:bg-accent/5 transition-colors p-8"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDrop}
                    >
                        <p className="text-xl font-bold">Drag & Drop Image</p>

                        {/* Category Selector */}
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="bg-black border border-white/20 rounded px-2 py-1 text-sm mb-2"
                        >
                            <option value="blog">Blog Image</option>
                            <option value="product">Product Image</option>
                            <option value="uncategorized">Uncategorized</option>
                        </select>

                        <label className="cursor-pointer bg-white text-black px-6 py-2 rounded-full font-bold text-sm uppercase hover:scale-105 transition-transform">
                            Choose File
                            <input type="file" className="hidden" onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])} />
                        </label>
                        {uploading && <p className="text-accent animate-pulse">Uploading...</p>}
                    </div>
                ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                        {media.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => onSelect && onSelect(item)}
                                className="relative aspect-square rounded-lg overflow-hidden border border-white/10 hover:border-accent group focus:outline-none focus:ring-2 focus:ring-accent"
                            >
                                <Image src={item.url} alt={item.altText || item.filename} fill className="object-cover" />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                                    <p className="text-xs text-white truncate w-full text-left">{item.filename}</p>
                                </div>
                                {item.category && (
                                    <span className="absolute top-1 right-1 bg-black/50 text-[10px] px-1 rounded text-white border border-white/20">
                                        {item.category}
                                    </span>
                                )}
                            </button>
                        ))}
                        {media.length === 0 && <p className="col-span-full text-center text-gray-500">No media found.</p>}
                    </div>
                )}
            </div>
        </div>
    );
}
