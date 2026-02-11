'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useCart } from '../context/CartContext';

export default function SuccessPage() {
    const { clearCart } = useCart();

    useEffect(() => {
        clearCart();
    }, [clearCart]);

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
            <div className="text-center max-w-lg">
                <div className="text-6xl mb-6">🎉</div>
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 text-accent">
                    Order Confirmed!
                </h1>
                <p className="text-xl text-gray-400 mb-12 leading-relaxed">
                    Thank you for your support. You should receive an email with your download links shortly.
                </p>
                <Link href="/" className="px-8 py-4 bg-white text-black font-black uppercase tracking-widest hover:bg-accent hover:text-white transition-colors">
                    Back to Home
                </Link>
            </div>
        </div>
    );
}
