import prisma from '@/lib/prisma';
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../../components/Navbar";


export async function generateStaticParams() {
    const categories = ["djing", "production", "backstage", "music-marketing"];
    return categories.map((slug) => ({ slug }));
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);

    // Filter posts by category (case-insensitive) - Fetching from DB now
    const categoryPosts = await prisma.blogPost.findMany({
        where: {
            published: true,
            categories: {
                has: categoryName // This matches the exact string stored in the array
            }
        },
        orderBy: { createdAt: 'desc' },
        include: {
            author: true
        }
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const normalizedPosts = categoryPosts.map((post: any) => ({
        id: post.id,
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        category: post.categories[0] || categoryName, // Just show the primary/first category or current
        imageUrl: post.imageUrl,
        date: new Date(post.createdAt).toLocaleDateString(),
        author: {
            name: post.authorName, // Fallback or relation
            avatar: post.authorAvatar
        }
    }));

    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent selection:text-white">
            <Navbar />

            {/* Header Section */}
            <header className="bg-black/40 border-b border-white/10 pt-32 pb-16 px-4 relative">
                {/* Background Noise/Gradient Effect */}
                <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-gray-800 via-transparent to-transparent"></div>

                <div className="max-w-[1160px] mx-auto relative z-10">
                    <div className="text-center max-w-2xl mx-auto py-8">
                        <div className="text-accent font-bold tracking-widest uppercase mb-4 text-sm">Category</div>
                        <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-tight">
                            {categoryName}
                        </h1>
                        <p className="text-xl text-gray-400 leading-relaxed mb-8">
                            Articles and guides related to {categoryName}.
                        </p>

                        {/* Sibling Categories Navigation */}
                        <div className="flex justify-center gap-6 text-sm font-bold uppercase tracking-widest text-gray-400 border-t border-white/10 pt-8 mt-8">
                            <Link href="/blog" className="hover:text-white transition-colors">All</Link>
                            <Link href="/blog/category/djing" className={`hover:text-accent transition-colors ${slug === 'djing' ? 'text-accent' : ''}`}>DJing</Link>
                            <Link href="/blog/category/production" className={`hover:text-accent transition-colors ${slug === 'production' ? 'text-accent' : ''}`}>Production</Link>
                            <Link href="/blog/category/backstage" className={`hover:text-accent transition-colors ${slug === 'backstage' ? 'text-accent' : ''}`}>Backstage</Link>
                            <Link href="/blog/category/music-marketing" className={`hover:text-accent transition-colors ${slug === 'music-marketing' ? 'text-accent' : ''}`}>Marketing</Link>
                        </div>
                    </div>

                    {/* Search Bar (Optional, keeping for consistency or removing if not needed) */}
                    {/* For now, let's keep the navigation back to all posts or similar */}
                    <div className="text-center mt-8">
                        <Link href="/blog" className="text-sm text-gray-400 hover:text-white transition-colors border-b border-transparent hover:border-white pb-1">
                            ← Back to all articles
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-[1160px] mx-auto px-4 pt-20 pb-20">
                {normalizedPosts.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                        {normalizedPosts.map((post) => (
                            <Link href={`/blog/${post.slug}`} key={post.id} className="group cursor-pointer flex flex-col h-full">
                                <div className="relative h-64 w-full mb-6 overflow-hidden rounded-xl border border-white/10 shadow-lg">
                                    <Image
                                        src={post.imageUrl || '/images/placeholder.jpg'}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                                </div>

                                <div className="flex flex-col flex-1">
                                    <span className="text-accent font-bold text-xs tracking-wide uppercase mb-3">
                                        {post.category}
                                    </span>
                                    <h3 className="text-xl font-bold leading-snug mb-3 group-hover:text-accent transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed mb-6 flex-1">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center gap-3 mt-auto">
                                        {post.author.avatar && (
                                            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/10 shrink-0 bg-gray-800">
                                                <Image
                                                    src={post.author.avatar}
                                                    alt={post.author.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        )}
                                        <div className="text-xs">
                                            <p className="font-medium text-white">{post.author.name}</p>
                                            <p className="text-gray-500">{post.date}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : ( // ...
                    <div className="text-center py-20">
                        <p className="text-xl text-gray-500">No articles found in this category yet.</p>
                    </div>
                )}
            </main>
        </div>
    );
}
