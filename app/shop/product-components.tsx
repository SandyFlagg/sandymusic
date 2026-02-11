'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Product } from '@/lib/shop-data';
import { useCart } from '../context/CartContext';

// --- 1. Product Gallery (Now with Audio Preview) ---
export function ProductGallery({ product }: { product: Product }) {
    const images = product.images && product.images.length > 0 ? product.images : [product.image];
    const [selectedImage, setSelectedImage] = useState(images[0]);

    // Audio Player State
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    // Handle audio ending
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const onEnded = () => setIsPlaying(false);
        audio.addEventListener('ended', onEnded);
        return () => audio.removeEventListener('ended', onEnded);
    }, []);


    return (
        <div className="flex gap-4">
            {/* Thumbnails (Left Strip) */}
            <div className="flex flex-col gap-3 w-16 md:w-20">
                {images.map((img, i) => (
                    <button
                        key={i}
                        onMouseEnter={() => setSelectedImage(img)}
                        className={`relative w-full aspect-square border-2 rounded-lg overflow-hidden transition-all ${selectedImage === img ? 'border-accent shadow-md shadow-accent/20' : 'border-white/10 hover:border-white/30'}`}
                    >
                        <Image src={img} alt="" fill className="object-cover" />
                    </button>
                ))}
            </div>

            {/* Main Image & Player */}
            <div className="flex-1 relative aspect-square bg-white/5 rounded-2xl overflow-hidden border border-white/10 shadow-lg shadow-black/50 group">
                <Image
                    src={selectedImage}
                    alt={product.name}
                    fill
                    className="object-contain p-8 group-hover:scale-105 transition-transform duration-500"
                />

                {/* Play Button Overlay (Only if previewAudio exists) */}
                {product.previewAudio && (
                    <>
                        <audio ref={audioRef} src={product.previewAudio} />
                        <button
                            onClick={togglePlay}
                            className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors group-hover:opacity-100"
                        >
                            <div className={`w-20 h-20 rounded-full bg-accent text-black flex items-center justify-center shadow-xl transform transition-transform duration-300 ${isPlaying ? 'scale-100' : 'scale-90 group-hover:scale-100'}`}>
                                {isPlaying ? (
                                    <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                                ) : (
                                    <svg className="w-8 h-8 fill-current ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                )}
                            </div>
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

// --- 2. Product Info (Center) ---
export function ProductInfo({ product }: { product: Product }) {
    return (
        <div className="flex flex-col gap-4">
            {/* Title & Stats */}
            <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-2">
                    {product.name}
                </h1>
                <div className="flex items-center gap-3 text-sm text-gray-400 mb-6">
                    <div className="flex text-accent">
                        {[...Array(5)].map((_, i) => (
                            <span key={i}>
                                {i < (product.rating || 0) ? '★' : '☆'}
                            </span>
                        ))}
                    </div>
                    <span className="font-medium text-white">{product.rating || 'New'}</span>
                    <span className="text-gray-600">|</span>
                    <a href="#reviews" className="hover:text-accent underline decoration-dotted transition-colors">
                        {product.reviewCount || 0} reviews
                    </a>
                </div>
                <div className="border-b border-white/10 mb-8"></div>
            </div>

            {/* Price (Mobile only) */}
            <div className="md:hidden">
                <span className="text-3xl font-bold text-white">${product.price}</span>
            </div>

            {/* Features / Bullets */}
            <div className="space-y-4">
                <h3 className="font-bold text-white text-lg">About this pack</h3>
                <ul className="list-disc pl-5 space-y-3 text-gray-300 leading-relaxed font-light">
                    {product.features?.map((feature, i) => (
                        <li key={i}>{feature}</li>
                    ))}
                    {!product.features && <li>High quality production tools.</li>}
                </ul>
            </div>

            {/* Badges / Specs Grid */}
            <div className="mt-8 grid grid-cols-2 gap-4 text-sm bg-white/5 p-6 rounded-2xl border border-white/10">
                <div>
                    <span className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 is-mac-font">Genre</span>
                    <span className="font-medium text-white">{product.genre}</span>
                </div>
                <div>
                    <span className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 is-mac-font">DAW</span>
                    <span className="font-medium text-white">{product.specs?.daw || 'Universal'}</span>
                </div>
            </div>
        </div>
    );
}

// --- 3. Buy Box (Right Sticky) ---
export function BuyBox({ product }: { product: Product }) {
    const { addToCart } = useCart();

    return (
        <div className="border border-white/10 rounded-2xl p-6 shadow-2xl bg-[#0A0A0A] sticky top-24 backdrop-blur-md">
            <div className="mb-6">
                <sup className="text-sm font-medium text-gray-400">$</sup>
                <span className="text-5xl font-bold text-white tracking-tight">{Math.floor(product.price)}</span>
                <sup className="text-sm font-medium text-gray-400">{(product.price % 1).toFixed(2).substring(2)}</sup>
            </div>

            <div className="text-green-400 font-bold text-sm mb-8 flex items-center gap-2 tracking-wide uppercase">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span>In Stock & Ready to Download</span>
            </div>

            <div className="space-y-4">
                <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-accent hover:brightness-110 active:scale-[0.98] text-black font-bold py-4 rounded-full shadow-lg shadow-accent/20 transition-all duration-200 transform hover:-translate-y-1 text-lg"
                >
                    Add to Cart
                </button>
                <button className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-4 rounded-full transition-all transform hover:scale-[1.02] active:scale-[0.98] backdrop-blur-sm">
                    Buy Now
                </button>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-center gap-2 text-xs text-gray-500 uppercase tracking-wider">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                <span>Secure SSL Checkout</span>
            </div>
        </div>
    );
}

// --- 4. Reviews Section ---
export function ReviewsSection({ product }: { product: Product }) {
    // Mock initial reviews
    const [reviews, setReviews] = useState([
        { id: 1, user: "MusicMaker99", rating: 5, title: "Exactly what I needed", content: "This template is insane. The mixing is top tier and I learned so much just by deconstructing the project file. Worth every penny.", helpful: 12, date: "2 months ago" },
        { id: 2, user: "TechnoFan", rating: 4, title: "Great sounds", content: "Really solid sounds. The only reason it's 4 stars is I wish there were a few more drum samples included. But the synths are heavy.", helpful: 8, date: "1 month ago" }
    ]);

    const [isWriting, setIsWriting] = useState(false);
    const [newReview, setNewReview] = useState({ rating: 5, title: '', content: '' });

    const handleVoteHelpful = (id: number) => {
        setReviews(reviews.map(r => r.id === id ? { ...r, helpful: r.helpful + 1 } : r));
    };

    const handleSubmitReview = (e: React.FormEvent) => {
        e.preventDefault();
        const review = {
            id: reviews.length + 1,
            user: "You",
            rating: newReview.rating,
            title: newReview.title,
            content: newReview.content,
            helpful: 0,
            date: "Just now"
        };
        setReviews([review, ...reviews]);
        setIsWriting(false);
        setNewReview({ rating: 5, title: '', content: '' });
    };

    return (
        <div id="reviews" className="mt-32 border-t border-white/10 pt-16 mb-20 scroll-mt-24">
            <h2 className="text-2xl font-bold text-white mb-12">Customer Reviews</h2>
            <div className="flex flex-col lg:flex-row gap-16">
                {/* Visual Summary */}
                <div className="w-full lg:w-1/3 space-y-8">
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex text-accent text-2xl">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i}>{i < Math.round(product.rating || 5) ? '★' : '☆'}</span>
                                ))}
                            </div>
                            <span className="text-2xl font-bold text-white">{product.rating} out of 5</span>
                        </div>
                        <p className="text-gray-400 text-sm mb-8">{product.reviewCount} global ratings</p>

                        {/* Mock Bars */}
                        <div className="space-y-3">
                            {[5, 4, 3, 2, 1].map((star) => (
                                <div key={star} className="flex items-center gap-4 text-sm">
                                    <span className="w-12 font-medium text-gray-300">{star} star</span>
                                    <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-accent" style={{ width: star === 5 ? '70%' : star === 4 ? '20%' : '5%' }}></div>
                                    </div>
                                    <span className="w-8 text-right text-gray-500">{star === 5 ? '70%' : star === 4 ? '20%' : '5%'}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-8 border-t border-white/10">
                        <h3 className="font-bold text-white mb-4">Review this product</h3>
                        <p className="text-sm text-gray-400 mb-6">Share your thoughts with other producers.</p>
                        <button
                            onClick={() => setIsWriting(!isWriting)}
                            className="w-full py-2 border border-white/20 rounded-full text-white font-medium hover:bg-white/5 transition-colors"
                        >
                            {isWriting ? 'Cancel Review' : 'Write a customer review'}
                        </button>
                    </div>
                </div>

                {/* Reviews List / Form */}
                <div className="flex-1 space-y-12">
                    {isWriting && (
                        <form onSubmit={handleSubmitReview} className="bg-white/5 p-8 rounded-xl border border-white/10 animate-in fade-in slide-in-from-top-4 duration-300">
                            <h3 className="font-bold text-white mb-6">Write a review</h3>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Rating</label>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setNewReview({ ...newReview, rating: star })}
                                                className={`text-2xl transition-transform hover:scale-110 ${star <= newReview.rating ? 'text-accent' : 'text-gray-600'}`}
                                            >
                                                ★
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Headline</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent"
                                        placeholder="What's most important to know?"
                                        value={newReview.title}
                                        onChange={e => setNewReview({ ...newReview, title: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Written Review</label>
                                    <textarea
                                        required
                                        rows={4}
                                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent"
                                        placeholder="What did you like or dislike?"
                                        value={newReview.content}
                                        onChange={e => setNewReview({ ...newReview, content: e.target.value })}
                                    />
                                </div>

                                <button type="submit" className="px-8 py-2 bg-accent text-black font-bold rounded-full hover:brightness-110">
                                    Submit
                                </button>
                            </div>
                        </form>
                    )}

                    {reviews.map(review => (
                        <div key={review.id} className="space-y-4 pb-8 border-b border-white/5 last:border-0">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center text-gray-300 font-bold border border-white/10">
                                    {review.user[0]}
                                </div>
                                <span className="font-bold text-sm text-white">{review.user}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex text-accent text-xs">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i}>{i < review.rating ? '★' : '☆'}</span>
                                    ))}
                                </div>
                                <span className="font-bold text-white">{review.title}</span>
                            </div>
                            <span className="text-xs text-gray-500">Reviewed on {review.date}</span>
                            <p className="text-gray-300 leading-relaxed font-light">
                                {review.content}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span>{review.helpful} people found this helpful</span>
                                <button
                                    onClick={() => handleVoteHelpful(review.id)}
                                    className="px-4 py-1 border border-white/10 rounded-full hover:bg-white/5 hover:text-white transition-colors"
                                >
                                    Helpful
                                </button>
                                <span className="text-gray-600">|</span>
                                <button className="hover:text-white">Report</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
