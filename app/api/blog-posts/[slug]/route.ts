import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface RouteParams {
    params: Promise<{ slug: string }>;
}

// GET /api/blog-posts/[slug]
export async function GET(request: Request, { params }: RouteParams) {
    const { slug } = await params;

    try {
        const post = await prisma.blogPost.findUnique({
            where: { slug, published: true },
        });

        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        return NextResponse.json(post);
    } catch (error) {
        console.error('Error fetching blog post:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
