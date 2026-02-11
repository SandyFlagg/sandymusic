'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function AdminProductsPage() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/products');
            const data = await res.json();
            if (Array.isArray(data)) setProducts(data);
        } catch (error) {
            console.error('Failed to fetch products', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return;
        try {
            const res = await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                fetchProducts();
            } else {
                alert('Failed to delete product');
            }
        } catch (error) {
            console.error('Failed to delete', error);
        }
    };

    return (
        <div className="p-12">
            <div className="flex items-center justify-between mb-12">
                <div>
                    <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Products</h1>
                    <p className="text-gray-500">Manage your digital downloads and merchandise.</p>
                </div>
                <Link href="/admin/products/new" className="bg-accent text-black font-bold uppercase tracking-widest px-6 py-3 rounded-sm hover:bg-white transition-colors">
                    + New Product
                </Link>
            </div>

            <div className="space-y-4">
                {products.map(product => (
                    <div key={product.id} className="bg-[#111] border border-white/10 p-6 rounded-xl flex items-center gap-6">
                        <div className="w-20 h-20 relative bg-black rounded-lg overflow-hidden border border-white/10 shrink-0">
                            {product.image ? (
                                <Image src={product.image} alt={product.name} fill className="object-cover" />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-700">No Img</div>
                            )}
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-white">{product.name}</h3>
                            <div className="text-sm text-gray-500 flex gap-4 mt-1">
                                <span className="uppercase tracking-widest text-accent">${product.price}</span>
                                <span className="uppercase tracking-widest">{product.category}</span>
                                {product.genre && <span className="text-gray-600">• {product.genre}</span>}
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link
                                href={`/admin/products/new?id=${product.id}`} // Using query param to reuse form route simply
                                className="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-white"
                            >
                                Edit
                            </Link>
                            <button
                                onClick={() => handleDelete(product.id)}
                                className="text-sm font-bold uppercase tracking-widest text-red-900 hover:text-red-500"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}

                {products.length === 0 && !loading && (
                    <div className="bg-[#111] border border-white/10 rounded-2xl p-12 text-center">
                        <div className="text-gray-500 mb-4">No products found.</div>
                        <Link href="/admin/products/new" className="text-accent font-bold uppercase tracking-widest text-sm hover:text-white transition-colors">
                            Create your first product →
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
