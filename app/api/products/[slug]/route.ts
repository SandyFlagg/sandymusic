import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface RouteParams {
    params: Promise<{ slug: string }>;
}

// GET /api/products/[slug]
export async function GET(request: Request, { params }: RouteParams) {
    const { slug } = await params;

    try {
        const product = await prisma.product.findUnique({
            where: { slug },
        });

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
