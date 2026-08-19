import Image from "next/image";
import Link from "next/link";


export interface BlogPostCard {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    categories: string[];
    imageUrl: string | null;
    authorName: string;
    authorAvatar?: string | null;
    createdAt: Date;
}

export default function BlogList({ blogPosts }: { blogPosts: BlogPostCard[] }) {
    const featuredPost = blogPosts.length > 0 ? blogPosts[0] : null;
    const otherPosts = blogPosts.length > 1 ? blogPosts.slice(1) : [];

    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent selection:text-white">
            {/* Header Section */}
            <header className="bg-black/40 border-b border-white/10 pt-32 pb-16 px-4 relative">
                {/* Background Noise/Gradient Effect */}
                <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-gray-800 via-transparent to-transparent"></div>

                <div className="max-w-[1160px] mx-auto relative z-10">

                    <div className="text-center max-w-2xl mx-auto py-8">
                        <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-tight">
                            The Blog
                        </h1>
                        <p className="text-xl text-gray-400 leading-relaxed">
                            Notes on making club music, DJing, and trying to get it heard. Mostly things I worked out the slow way.
                        </p>
                    </div>

                    {/* Category Links */}
                    <div className="flex justify-center gap-6 text-sm font-bold uppercase tracking-widest text-gray-400">
                        <Link href="/blog/category/djing" className="hover:text-accent transition-colors">DJing</Link>
                        <Link href="/blog/category/production" className="hover:text-accent transition-colors">Production</Link>
                        <Link href="/blog/category/music-marketing" className="hover:text-accent transition-colors">Marketing</Link>
                        <Link href="/blog/category/backstage" className="hover:text-accent transition-colors">Backstage</Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-[1160px] mx-auto px-4 pt-32 pb-20">

                {/* Featured Post */}
                {featuredPost ? (
                    <Link href={`/blog/${featuredPost.slug}`} className="mb-16 grid md:grid-cols-2 gap-8 items-center group cursor-pointer block">
                        <div className="relative h-[400px] w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-gray-900">
                            {featuredPost.imageUrl && (
                                <Image
                                    src={featuredPost.imageUrl}
                                    alt={featuredPost.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                        </div>

                        <div className="space-y-4">
                            <span className="text-accent font-bold text-sm tracking-wide uppercase">
                                {featuredPost.categories?.[0]}
                            </span>
                            <h2 className="text-3xl font-bold leading-tight group-hover:text-accent transition-colors">
                                {featuredPost.title}
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                {featuredPost.excerpt}
                            </p>
                            <div className="flex items-center gap-3 pt-2">
                                {featuredPost.authorAvatar && (
                                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/10 shrink-0 bg-gray-800">
                                        <Image
                                            src={featuredPost.authorAvatar}
                                            alt={featuredPost.authorName}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                                <div className="text-sm">
                                    <p className="font-medium text-white">{featuredPost.authorName}</p>
                                    <p className="text-gray-500">{featuredPost.createdAt.toLocaleDateString('en-AU')}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ) : (
                    <div className="text-center py-20 text-gray-500">
                        <p>No blog posts found.</p>
                    </div>
                )}

                {/* Post Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {otherPosts.map((post) => (
                        <Link href={`/blog/${post.slug}`} key={post.id} className="group cursor-pointer flex flex-col h-full block">
                            <div className="relative h-64 w-full mb-6 overflow-hidden rounded-xl border border-white/10 shadow-lg bg-gray-900">
                                {post.imageUrl && (
                                    <Image
                                        src={post.imageUrl}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                            </div>

                            <div className="flex flex-col flex-1">
                                <span className="text-accent font-bold text-xs tracking-wide uppercase mb-3">
                                    {post.categories?.[0]}
                                </span>
                                <h3 className="text-xl font-bold leading-snug mb-3 group-hover:text-accent transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed mb-6 flex-1">
                                    {post.excerpt}
                                </p>
                                <div className="flex items-center gap-3 mt-auto">
                                    {post.authorAvatar && (
                                        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/10 shrink-0 bg-gray-800">
                                            <Image
                                                src={post.authorAvatar}
                                                alt={post.authorName}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    )}
                                    <div className="text-xs">
                                        <p className="font-medium text-white">{post.authorName}</p>
                                        <p className="text-gray-500">{post.createdAt.toLocaleDateString('en-AU')}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

            </main>
        </div>
    );
}
