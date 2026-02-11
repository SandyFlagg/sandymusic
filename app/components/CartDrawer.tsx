'use client';

import { useCart } from '@/app/context/CartContext';
import { useState } from 'react';
import Image from 'next/image';

export default function CartDrawer() {
    const { items, isCartOpen, toggleCart, removeFromCart, updateQuantity, cartTotal } = useCart();
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    const handleCheckout = async () => {
        setIsCheckingOut(true);

        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ items }),
            });

            const { url } = await response.json();

            if (url) {
                window.location.href = url;
            } else {
                console.error('Checkout failed');
                alert('Checkout failed. Please check the console for details (likely missing Stripe keys).');
                setIsCheckingOut(false);
            }
        } catch (error) {
            console.error('Error during checkout:', error);
            alert('Error during checkout. Please check the console for details (likely missing Stripe keys).');
            setIsCheckingOut(false);
        }
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isCartOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                onClick={toggleCart}
            ></div>

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-full md:w-[450px] bg-[#111] border-l border-white/10 z-[70] transform transition-transform duration-300 flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <h2 className="text-xl font-black uppercase tracking-tighter">Your Cart</h2>
                    <button onClick={toggleCart} className="text-gray-400 hover:text-white transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {items.length === 0 ? (
                        <div className="text-center py-12 text-gray-500 uppercase tracking-widest text-sm">
                            Your cart is empty.
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.product.id} className="flex gap-4">
                                <div className="w-20 h-20 bg-black border border-white/10 flex-shrink-0">
                                    <Image src={item.product.image || '/placeholder.png'} alt={item.product.name} fill className="object-contain p-2" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold uppercase tracking-tight text-sm mb-1">{item.product.name}</h3>
                                    <p className="text-xs text-gray-400 mb-2">${item.product.price.toFixed(2)}</p>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center border border-white/10 rounded-sm">
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                className="px-2 py-1 hover:bg-white/10 transition-colors"
                                            >
                                                -
                                            </button>
                                            <span className="px-2 text-xs font-bold">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                className="px-2 py-1 hover:bg-white/10 transition-colors"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.product.id)}
                                            className="text-xs text-gray-500 hover:text-red-500 underline uppercase tracking-widest"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/10 bg-black">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-gray-400 uppercase tracking-widest text-sm">Subtotal</span>
                        <span className="text-2xl font-black">${cartTotal.toFixed(2)}</span>
                    </div>
                    <button
                        onClick={handleCheckout}
                        disabled={items.length === 0 || isCheckingOut}
                        className="w-full py-4 bg-white text-black font-black uppercase tracking-widest hover:bg-accent hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isCheckingOut ? 'Processing...' : 'Checkout'}
                    </button>
                    <p className="text-center text-[10px] text-gray-600 mt-4 uppercase tracking-widest">
                        Secure Checkout via Stripe
                    </p>
                </div>
            </div>
        </>
    );
}
