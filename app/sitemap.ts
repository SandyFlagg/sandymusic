
import { MetadataRoute } from 'next'
import prisma from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://sandymusic.com'

    // 1. Static Routes
    const staticRoutes = [
        '',
        '/about',
        '/contact',
        '/music',
        '/blog',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // 2. Fetch Blog Posts
    const posts = await prisma.blogPost.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
    })

    const blogRoutes = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.updatedAt,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    // 4. Fetch Categories (Optional, but good for SEO)
    // Hardcoding based on known categories for now, or could query distinct categories
    const categories = ['Production', 'DJing', 'Music Marketing', 'Backstage']
    const categoryRoutes = categories.map((cat) => ({
        url: `${baseUrl}/blog/category/${cat.toLowerCase().replace(/ /g, '-')}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }))

    return [...staticRoutes, ...blogRoutes, ...categoryRoutes]
}
