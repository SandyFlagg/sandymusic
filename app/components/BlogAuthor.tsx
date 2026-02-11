'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Author {
    name: string;
    avatar: string;
    role: string;
    bio: string;
}

export default function BlogAuthor({ author }: { author: Author }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="bg-[#111] border border-white/10 rounded-xl p-6 text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                    <Image
                        src={author.avatar}
                        alt={author.name}
                        fill
                        className="object-cover rounded-full border-2 border-accent"
                    />
                </div>
                <h3 className="font-bold text-lg mb-1">{author.name}</h3>
                <p className="text-accent text-xs font-bold uppercase tracking-widest mb-4">{author.role}</p>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full border border-white/20 text-white py-2 rounded text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
                >
                    Read more
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={() => setIsModalOpen(false)}
                    ></div>
                    <div className="relative bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-200">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            ✕
                        </button>

                        <div className="flex flex-col items-center text-center">
                            <div className="relative w-32 h-32 mb-6">
                                <Image
                                    src={author.avatar}
                                    alt={author.name}
                                    fill
                                    className="object-cover rounded-full border-4 border-accent"
                                />
                            </div>
                            <h2 className="text-2xl font-bold mb-2">{author.name}</h2>
                            <p className="text-accent text-sm font-bold uppercase tracking-widest mb-6">{author.role}</p>
                            <p className="text-gray-300 leading-relaxed">
                                {author.bio}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
