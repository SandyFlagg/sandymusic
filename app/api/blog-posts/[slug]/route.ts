import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

interface RouteParams {
    params: Promise<{ slug: string }>;
}

// GET /api/blog-posts/[slug]
export async function GET(request: Request, { params }: RouteParams) {
    const { slug } = await params;

    try {
        const post = await prisma.blogPost.findUnique({
            where: { slug },
            include: { author: true }
        } as any);

        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        return NextResponse.json(post);
    } catch (error) {
        console.error('Error fetching blog post:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// PUT /api/blog-posts/[slug]
export async function PUT(request: Request, { params }: RouteParams) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { slug } = await params;
        const body = await request.json();

        const {
            title,
            newSlug,
            excerpt,
            content,
            categories,
            tags,
            imageUrl,
            readTime,
            published,
            metaTitle,
            metaDescription,
            adminNotes,
            blogAuthorId,
            keyPoints
        } = body;

        const updatedPost = await prisma.blogPost.update({
            where: { slug },
            data: {
                title,
                slug: newSlug || slug,
                excerpt,
                content,
                categories: categories || [],
                tags: tags || [],
                imageUrl,
                readTime,
                published,
                metaTitle,
                metaDescription,
                adminNotes,
                blogAuthorId: blogAuthorId || undefined,
                keyPoints: keyPoints || [],
            } as any,
        });

        return NextResponse.json(updatedPost);
    } catch (error) {
        console.error('Failed to update blog post:', error);
        return NextResponse.json({ error: 'Failed to update blog post' }, { status: 500 });
    }
}

// DELETE /api/blog-posts/[slug]
export async function DELETE(request: Request, { params }: RouteParams) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { slug } = await params;

        await prisma.blogPost.delete({
            where: { slug },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to delete blog post:', error);
        return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 });
    }
}
