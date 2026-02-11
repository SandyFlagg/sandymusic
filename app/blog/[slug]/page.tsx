
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import BlogPostClient from './BlogPostClient';
import JsonLd from '@/components/JsonLd';
import { BlogPosting, WithContext } from 'schema-dts';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await prisma.blogPost.findUnique({
        where: { slug, published: true },
        select: {
            title: true,
            tags: true,
            categories: true,
            excerpt: true,
            imageUrl: true,
            metaTitle: true,
            metaDescription: true,
            author: {
                select: {
                    name: true,
                    avatarUrl: true,
                    role: true,
                    bio: true
                }
            },
            // Fallback fields
            authorName: true,
            authorAvatar: true,
            authorRole: true,
            authorBio: true
        } as any // eslint-disable-line @typescript-eslint/no-explicit-any
    }) as any; // eslint-disable-line @typescript-eslint/no-explicit-any

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    // Resolve author
    const author = post.author || {
        name: post.authorName,
        avatarUrl: post.authorAvatar,
        role: post.authorRole,
        bio: post.authorBio
    };

    return {
        title: post.metaTitle || post.title,
        description: post.metaDescription || post.excerpt,
        openGraph: {
            title: post.metaTitle || post.title,
            description: post.metaDescription || post.excerpt,
            images: post.imageUrl ? [post.imageUrl] : [],
            type: 'article',
            authors: [author.name]
        }
    };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function BlogPostPage({ params }: any) {
    const { slug } = await params;
    const post = await prisma.blogPost.findUnique({
        where: { slug, published: true },
        include: {
            author: true // Fetch full author relation
        }

    } as any) as any; // eslint-disable-line @typescript-eslint/no-explicit-any

    if (!post) {
        notFound();
    }

    // Normalize author data for the client component
    const normalizedPost = {
        ...post,
        authorName: post.author?.name || post.authorName,
        authorAvatar: post.author?.avatarUrl || post.authorAvatar,
        authorRole: post.author?.role || post.authorRole,
        authorBio: post.author?.bio || post.authorBio,
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString()
    };

    const articleSchema: WithContext<BlogPosting> = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        image: post.imageUrl ? [post.imageUrl] : [],
        datePublished: post.createdAt.toISOString(),
        dateModified: post.updatedAt.toISOString(),
        author: {
            "@type": "Person",
            name: post.authorName,
            image: post.authorAvatar || undefined,
        },
        publisher: {
            "@type": "Organization",
            name: "Sandy Music",
            logo: {
                "@type": "ImageObject",
                url: "https://sandymusic.com/logo.png" // Replace with actual logo URL
            }
        }
    };

    return (
        <>
            <JsonLd schema={articleSchema} />
            <BlogPostClient initialPost={normalizedPost} />
        </>
    );
}
