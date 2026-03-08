
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';

// GET /api/blog-posts?category=Production
// GET /api/blog-posts?slug=my-post-slug
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const slug = searchParams.get('slug');

    try {
        if (slug) {

            const post = await prisma.blogPost.findUnique({
                where: { slug },
            });
            if (!post) {
                return NextResponse.json({ error: 'Post not found' }, { status: 404 });
            }
            return NextResponse.json(post);
        }

        // If no slug, proceed with category filtering
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const where: any = {};
        const showAll = searchParams.get('all') === 'true';
        if (!showAll) {
            where.published = true;
        }
        if (category) {
            where.categories = {
                has: category
            };
        }

        const posts = await prisma.blogPost.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(posts);
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// POST /api/blog-posts
export async function POST(request: Request) {
    try {
        const user = await currentUser();

        // Simple auth check - in production you'd want stricter role checking
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const {
            title,
            slug,
            excerpt,
            content,
            categories, // Array of strings
            tags,
            imageUrl,
            readTime,
            published,
            metaTitle,
            metaDescription,
            adminNotes,
            blogAuthorId,
            keyPoints
        } = await request.json();

        // Basic validation
        if (!title || !slug || !content) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }


        const post = await prisma.blogPost.create({
            data: {
                title,
                slug,
                excerpt,
                content,
                categories: categories || [], // Default to empty array
                tags,
                imageUrl,
                readTime,
                published,
                metaTitle,
                metaDescription,
                adminNotes,
                blogAuthorId: blogAuthorId || undefined,
                keyPoints: keyPoints || [],
                creatorId: user.id,
                authorName: `${user.firstName} ${user.lastName} `.trim() || 'Admin',
                authorAvatar: user.imageUrl,
                authorRole: 'Admin', // Hardcoded for now
                authorBio: 'Music producer and DJ.' // Default bio
            } as any // eslint-disable-line @typescript-eslint/no-explicit-any
        });

        return NextResponse.json(post);
    } catch (error) {
        console.error('Error creating blog post:', error);
        return NextResponse.json({ error: 'Internal Server Error', details: String(error) }, { status: 500 });
    }
}
