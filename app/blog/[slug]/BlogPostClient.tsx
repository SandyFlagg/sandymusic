'use client';


import Image from 'next/image';
import { useState, useEffect, useMemo } from 'react';
import { notFound } from "next/navigation";
import { useUser } from '@clerk/nextjs';


import Link from 'next/link';
import CommentItem, { Comment } from '@/app/components/blog/CommentItem';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function BlogPostClient({ initialPost }: { initialPost: any }) {
    const { isSignedIn } = useUser();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [post] = useState<any>(initialPost);
    // const [loading, setLoading] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeSection, setActiveSection] = useState('');
    const [comments, setComments] = useState<Comment[]>([]);
    const [isCommenting, setIsCommenting] = useState(false);
    const [newComment, setNewComment] = useState('');

    const slug = initialPost.slug;

    // Fetch Blog Post - REMOVED as we pass it in
    // useEffect(() => { ... }, [slug]);

    // Fetch Comments
    const fetchComments = async () => {
        try {
            const res = await fetch(`/api/comments?slug=${slug}`);
            if (res.ok) {
                const data = await res.json();

                const nestedComments: Comment[] = [];
                const commentMap: { [key: string]: Comment } = {};

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                data.forEach((c: any) => {
                    commentMap[c.id] = { ...c, replies: [] };
                });

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                data.forEach((c: any) => {
                    if (c.parentId) {
                        if (commentMap[c.parentId]) {
                            commentMap[c.parentId].replies?.push(commentMap[c.id]);
                        }
                    } else {
                        nestedComments.push(commentMap[c.id]);
                    }
                });

                setComments(nestedComments);
            }
        } catch (error) {
            console.error('Failed to fetch comments', error);
        }
    };

    useEffect(() => {
        const loadComments = async () => {
            await fetchComments();
        };
        loadComments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug]);

    // Scroll Progress Listener
    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scroll = `${totalScroll / windowHeight}`;
            setScrollProgress(Number(scroll));
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Extract Headings for TOC
    const headings = useMemo(() => {
        if (!post?.content) return [];

        // Start with the main title
        const foundHeadings: { level: number; id: string; text: string }[] = [
            { level: 1, id: 'main-title', text: 'Introduction' }
        ];

        const regex = /<h([123])[^>]*id="([^"]*)"[^>]*>(.*?)<\/h\1>/g;
        let match;

        while ((match = regex.exec(post.content)) !== null) {
            const text = match[3].replace(/<[^>]*>/g, '');
            foundHeadings.push({
                level: parseInt(match[1]),
                id: match[2],
                text: text
            });
        }
        return foundHeadings;
    }, [post]);

    // Active Section Scroll Listener
    useEffect(() => {
        const handleScroll = () => {
            // Offset for header/sticky elements (approx 150px)
            const scrollPosition = window.scrollY + 150;

            let current = '';

            // Check headings
            for (const heading of headings) {
                const element = document.getElementById(heading.id);
                if (element && element.offsetTop <= scrollPosition) {
                    current = heading.id;
                }
            }

            // Check discussion section specifically
            const discussion = document.getElementById('discussion');
            if (discussion && discussion.offsetTop <= scrollPosition) {
                current = 'discussion';
            }

            // Default to main title if at the very top and nothing else matches
            if (!current && window.scrollY < 200) {
                current = 'main-title';
            }

            if (current && current !== activeSection) {
                setActiveSection(current);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        // Initial check after a small delay to ensure rendering
        const timeoutId = setTimeout(handleScroll, 100);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timeoutId);
        };
    }, [headings, activeSection]);

    // Helper to recursively update comments
    const updateCommentsRecursively = (
        items: Comment[],
        id: string,
        updateFn: (c: Comment) => Comment
    ): Comment[] => {
        return items.map(item => {
            if (item.id === id) {
                return updateFn(item);
            }
            if (item.replies) {
                return { ...item, replies: updateCommentsRecursively(item.replies, id, updateFn) };
            }
            return item;
        });
    };

    const handleVote = (id: string, type: 'up' | 'down') => {
        setComments(prev => updateCommentsRecursively(prev, id, (comment) => {
            let newVotes = comment.votes;
            let newUserVote = comment.userVote;

            if (comment.userVote === type) {
                // Toggle off
                newUserVote = null;
                newVotes = type === 'up' ? newVotes - 1 : newVotes + 1;
            } else {
                // Switch vote or new vote
                if (comment.userVote === 'up') newVotes--;
                if (comment.userVote === 'down') newVotes++;

                newUserVote = type;
                newVotes = type === 'up' ? newVotes + 1 : newVotes - 1;
            }
            return { ...comment, votes: newVotes, userVote: newUserVote };
        }));
    };

    const handleReply = async (parentId: string, content: string) => {
        if (!isSignedIn) {
            alert('Please sign in to reply');
            return;
        }

        try {
            const res = await fetch('/api/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content, slug, parentId })
            });

            if (res.ok) {
                fetchComments(); // Refresh comments
            }
        } catch (error) {
            console.error('Error replying', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this comment?')) return;

        try {
            const res = await fetch('/api/comments', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });

            if (res.ok) {
                fetchComments(); // Refresh
            } else {
                alert('Failed to delete comment');
            }
        } catch (error) {
            console.error('Error deleting', error);
        }
    };

    const handlePostComment = async () => {
        if (!newComment.trim()) return;
        if (!isSignedIn) {
            alert('Please sign in to post a comment');
            return;
        }

        try {
            const res = await fetch('/api/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: newComment, slug })
            });

            if (res.ok) {
                setNewComment('');
                setIsCommenting(false);
                fetchComments(); // Refresh
            }
        } catch (error) {
            console.error('Error posting comment', error);
        }
    };



    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-accent selection:text-white">

            {/* Reading Progress Bar */}
            <div className="fixed top-0 left-0 h-1 bg-accent z-[60]" style={{ width: `${scrollProgress * 100}%` }}></div>

            {/* Hero Header */}
            <header className="relative pt-40 pb-24 px-6 overflow-hidden border-b border-white/10">
                <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-accent/40 via-transparent to-transparent"></div>

                <div className="container mx-auto max-w-7xl relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="text-left">
                            <div className="flex justify-start gap-3 mb-8">
                                {(post.categories?.length > 0 ? post.categories : (post.category ? [post.category] : [])).map((cat: string) => (
                                    <Link
                                        key={cat}
                                        href={`/blog/category/${cat.toLowerCase().replace(/ /g, '-')}`}
                                        className="text-accent font-bold text-xs uppercase tracking-widest border border-accent/20 px-3 py-1 rounded-full bg-accent/5 hover:bg-accent/10 hover:text-white transition-colors"
                                    >
                                        {cat}
                                    </Link>
                                ))}
                            </div>

                            <h1 id="main-title" className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                                {post.title}
                            </h1>

                            <div className="flex items-center justify-start gap-8 text-sm text-gray-400">
                                <div className="flex items-center gap-3">
                                    {post.authorAvatar ? (
                                        <Image
                                            src={post.authorAvatar}
                                            alt={post.authorName}
                                            width={40}
                                            height={40}
                                            className="rounded-full border border-white/10 object-cover aspect-square"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center font-bold text-white shrink-0">
                                            {post.authorName.charAt(0)}
                                        </div>
                                    )}
                                    <div className="text-left">
                                        <div className="text-white font-bold uppercase tracking-widest text-xs">{post.authorName}</div>
                                        <div className="text-[10px] uppercase tracking-widest">{post.authorRole || 'Author'}</div>
                                    </div>
                                </div>
                                <div className="h-8 w-[1px] bg-white/10"></div>
                                <div className="text-left">
                                    <div className="text-white font-bold uppercase tracking-widest text-xs">{new Date(post.createdAt).toLocaleDateString()}</div>
                                    <div className="text-[10px] uppercase tracking-widest">Published</div>
                                </div>
                                <div className="h-8 w-[1px] bg-white/10"></div>
                                <div className="text-left">
                                    <div className="text-white font-bold uppercase tracking-widest text-xs">{post.readTime}</div>

                                </div>
                            </div>
                        </div>

                        {/* Featured Image - Second Grid Column */}
                        {post.imageUrl && (
                            <div className="relative aspect-video lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                                <Image
                                    src={post.imageUrl}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    priority
                                />
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-[1400px] mx-auto">

                    {/* Left Sidebar: Table of Contents */}
                    <aside className="hidden lg:block lg:col-span-2">
                        <div className="sticky top-32">
                            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-6">Contents</h3>
                            <nav className="space-y-4 border-l border-white/10 pl-4">
                                {headings.map(heading => (
                                    <a
                                        key={heading.id}
                                        href={`#${heading.id}`}
                                        className={`block text-sm font-bold transition-colors ${activeSection === heading.id ? 'text-accent' : 'text-gray-500 hover:text-white'} ${heading.level === 3 ? 'pl-4 text-xs' : ''}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                    >
                                        {heading.text}
                                    </a>
                                ))}
                                <a
                                    href="#discussion"
                                    className={`block text-sm font-bold transition-colors ${activeSection === 'discussion' ? 'text-accent' : 'text-gray-500 hover:text-white'}`}
                                >
                                    Discussion
                                </a>
                            </nav>
                        </div>
                    </aside>

                    {/* Center: Article */}
                    <article className="lg:col-span-7 prose prose-invert prose-lg max-w-none">
                        {/* Key Points Summary */}
                        {post.keyPoints && post.keyPoints.length > 0 && (
                            <div className="bg-[#111] border border-accent/20 rounded-xl p-8 mb-12 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-accent"></div>
                                <h3 className="text-accent font-black uppercase tracking-widest text-sm mb-6 flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    Key Takeaways
                                </h3>
                                <ul className="space-y-4">
                                    {post.keyPoints.map((point: string, idx: number) => (
                                        <li key={idx} className="flex items-start gap-4 text-gray-300">
                                            <span className="text-accent font-bold mt-1 text-xs">{String(idx + 1).padStart(2, '0')}.</span>
                                            <span className="leading-relaxed font-medium">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div dangerouslySetInnerHTML={{ __html: post.content }} />

                        {/* Discussion Section */}
                        <div className="mt-12">
                            <div className="flex items-baseline justify-between mb-8">
                                <h2 id="discussion" className="text-3xl font-black uppercase tracking-tighter text-white scroll-mt-32">Discussion <span className="text-gray-500 text-2xl align-middle ml-2">({comments.length})</span></h2>
                                <div className="text-xs font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2 cursor-pointer hover:text-white">
                                    Sort by: <span className="text-accent">Best</span> <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>

                            {/* CTA / Comment Form */}
                            <div className="bg-[#111] border border-white/10 rounded-xl p-6 mb-12">
                                {!isCommenting ? (
                                    <div className="text-center">
                                        <h4 className="text-lg font-bold text-white mb-2">What&apos;s your take?</h4>
                                        <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
                                            Have you tried these techniques? Share your experience or ask a question to the community.
                                        </p>
                                        <button
                                            onClick={() => setIsCommenting(true)}
                                            className="bg-accent text-black font-bold uppercase tracking-widest text-xs px-8 py-3 rounded-full hover:bg-white transition-all duration-200 hover:-translate-y-1 active:scale-95"
                                        >
                                            Join the Conversation
                                        </button>
                                    </div>
                                ) : (
                                    <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                                        <textarea
                                            value={newComment}
                                            onChange={(e) => setNewComment(e.target.value)}
                                            placeholder="What are your thoughts?"
                                            className="w-full bg-black/50 border border-white/10 rounded-2xl p-4 text-white text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none min-h-[120px] mb-4"
                                            autoFocus
                                        />
                                        <div className="flex justify-end gap-3">
                                            <button
                                                onClick={() => setIsCommenting(false)}
                                                className="text-gray-500 font-bold uppercase tracking-widest text-xs px-6 py-2 hover:text-white transition-colors hover:-translate-y-0.5"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handlePostComment}
                                                disabled={!newComment.trim()}
                                                className="bg-accent text-black font-bold uppercase tracking-widest text-xs px-6 py-2 rounded-full hover:bg-white transition-all duration-200 hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                                            >
                                                Post Comment
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Comments List */}
                            <div className="space-y-8">
                                {comments.map(comment => (
                                    <CommentItem
                                        key={comment.id}
                                        comment={comment}
                                        onVote={handleVote}
                                        onReply={handleReply}
                                        onDelete={handleDelete}
                                        isModerator={isSignedIn || false}
                                    />
                                ))}
                            </div>
                        </div>
                    </article>

                    {/* Right Sidebar: Author & Share */}
                    <aside className="hidden lg:block lg:col-span-3">
                        <div className="sticky top-32 space-y-12">

                            {/* Author Profile */}
                            <div className="space-y-4">
                                {post.authorAvatar ? (
                                    <Image
                                        src={post.authorAvatar}
                                        alt={post.authorName}
                                        width={80}
                                        height={80}
                                        className="rounded-full border-2 border-white/10 object-cover aspect-square"
                                    />
                                ) : (
                                    <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center font-bold text-2xl text-white border-2 border-white/10">
                                        {post.authorName.charAt(0)}
                                    </div>
                                )}
                                <div>
                                    <h4 className="font-bold text-lg text-white">{post.authorName}</h4>
                                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">{post.authorRole || 'Author'}</p>
                                    <p className="text-sm text-gray-400 leading-relaxed">
                                        {post.authorBio || 'Music producer and DJ sharing tips and tricks.'}
                                    </p>
                                </div>
                            </div>

                            {/* Share Section */}
                            <div className="pt-8 border-t border-white/10">
                                <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-6">Share Post</h3>
                                <div className="flex flex-col gap-4 text-gray-500">
                                    <a href="#" className="hover:text-white transition-colors flex items-center gap-3 group" aria-label="Share on X">
                                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                                        <span className="text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity -ml-2">X</span>
                                    </a>
                                    <a href="#" className="hover:text-white transition-colors flex items-center gap-3 group" aria-label="Share on LinkedIn">
                                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                                        <span className="text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity -ml-2">LinkedIn</span>
                                    </a>
                                    <a href="#" className="hover:text-white transition-colors flex items-center gap-3 group" aria-label="Share on Facebook">
                                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.148 0-2.797 1.603-2.797 2.87v1.12h5.306l-1.008 3.667h-4.298v7.98c0 .003-.001.005-.001.008h-5.016s.001-.005.001-.008z" /></svg>
                                        <span className="text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity -ml-2">Facebook</span>
                                    </a>
                                    <a href="#" className="hover:text-white transition-colors flex items-center gap-3 group" aria-label="Share on Instagram">
                                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069-3.204 0-3.584-.012-4.849-.069-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" /></svg>
                                        <span className="text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity -ml-2">Instagram</span>
                                    </a>
                                </div>
                            </div>

                        </div>
                    </aside>

                </div>
            </main>

            {/* Newsletter CTA */}
            <section className="py-20 border-t border-white/10 bg-[#050505]">
                <div className="container mx-auto px-6 max-w-2xl text-center">
                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4">
                        Never miss a beat
                    </h2>
                    <p className="text-gray-400 mb-8">
                        Join 5,000+ producers getting weekly tips and free samples.
                    </p>
                    <div className="flex gap-2">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 bg-black border border-white/20 p-4 rounded-full text-white focus:border-accent focus:outline-none"
                        />
                        <button className="bg-accent text-white font-bold uppercase tracking-widest px-8 py-4 hover:bg-white hover:text-black transition-all duration-200 rounded-full hover:-translate-y-1 active:scale-95">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>

        </div>
    );
}
