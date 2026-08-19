import prisma from '@/lib/prisma';
import BlogList from './BlogList';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog - Sandy Music',
    description: 'Notes on making club music, DJing, and trying to get it heard.',
    alternates: {
        canonical: '/blog',
    },
};

// Rendered on the server and cached. Previously this fetched from
// /api/blog-posts in the browser, which meant no posts in the HTML for search
// engines and a blank page whenever the database was cold.
export const revalidate = 60;

export default async function BlogPage() {
    const posts = await prisma.blogPost.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' },
        select: {
            id: true,
            slug: true,
            title: true,
            excerpt: true,
            categories: true,
            imageUrl: true,
            authorName: true,
            authorAvatar: true,
            createdAt: true,
        },
    });

    return <BlogList blogPosts={posts} />;
}
