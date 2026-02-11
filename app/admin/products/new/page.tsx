'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductForm from '@/components/admin/ProductForm';

function ProductEditor() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(!!id);

    useEffect(() => {
        if (id) {
            fetch(`/api/products?id=${id}`)
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data) && data.length > 0) {
                        setProduct(data[0]);
                    }
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) return <div className="p-12 text-white">Loading...</div>;

    return (
        <div className="p-12">
            <h1 className="text-4xl font-black uppercase tracking-tighter mb-8 text-white">
                {id ? 'Edit Product' : 'New Product'}
            </h1>
            <ProductForm initialData={product} isEditing={!!id} />
        </div>
    );
}

export default function NewProductPage() {
    return (
        <Suspense fallback={<div className="p-12 text-white">Loading...</div>}>
            <ProductEditor />
        </Suspense>
    );
}
