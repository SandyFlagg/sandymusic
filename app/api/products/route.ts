import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/products?category=ableton-templates
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const genre = searchParams.get('genre');
    const id = searchParams.get('id');

    try {
        const where: any = {};
        if (id) where.id = id;
        if (category) where.category = category;
        if (genre) where.genre = genre;

        const products = await prisma.product.findMany({
            where,
            orderBy: { createdAt: 'desc' }
        });

        // If ID is requested, return single object or array? 
        // Best to stick to array for this route, client can pick first.
        // Or if ID is unique, just return the list of 1.
        return NextResponse.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        // Basic validation
        if (!body.name || !body.price) {
            return NextResponse.json({ error: 'Name and Price are required' }, { status: 400 });
        }

        const product = await prisma.product.create({
            data: {
                slug: body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                name: body.name,
                category: body.category || 'ableton-templates',
                genre: body.genre,
                price: parseFloat(body.price),
                description: body.description,
                artistStyle: body.artistStyle,
                image: body.image,
                // images: body.images, // Schema only has 'image' for now
                backgroundTexture: body.backgroundTexture,
                // previewAudio: body.previewAudio, // Old field
                previewAudioUrl: body.previewAudioUrl || body.previewAudio,
                downloadUrl: body.downloadUrl,
                specs: body.specs,
                features: body.features || [],
                badges: body.badges || [],
            }
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error('Error creating product:', error);
        return NextResponse.json({ error: 'Failed to create product', details: (error as Error).message }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { id, name, price, category, ...rest } = body;

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const product = await prisma.product.update({
            where: { id },
            data: {
                name,
                price: parseFloat(price),
                category,
                slug: body.slug || (name ? name.toLowerCase().replace(/[^a-z0-9]+/g, '-') : undefined),
                description: body.description,
                artistStyle: body.artistStyle,
                image: body.image,
                // images: body.images,
                backgroundTexture: body.backgroundTexture,
                // previewAudio: body.previewAudio,
                previewAudioUrl: body.previewAudioUrl,
                downloadUrl: body.downloadUrl,
                specs: body.specs,
                features: body.features || [],
                badges: body.badges || [],
                genre: body.genre,
            }
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error('Error updating product:', error);
        return NextResponse.json({ error: 'Failed to update product', details: (error as Error).message }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    try {
        await prisma.product.delete({
            where: { id }
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting product:', error);
        return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
    }
}
