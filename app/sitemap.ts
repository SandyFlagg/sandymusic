
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
        '/shop',
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

    // 3. Fetch Products
    const products = await prisma.product.findMany({
        where: { soldOut: false }, // Optional: only show available products? Or all. Let's show all for SEO.
        select: { slug: true, updatedAt: true },
    })

    const productRoutes = products.map((product) => ({
        url: `${baseUrl}/shop/${product.slug}`, // Verify this is the correct route
        lastModified: product.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.9,
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

    return [...staticRoutes, ...blogRoutes, ...productRoutes, ...categoryRoutes]
}
