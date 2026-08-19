import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import LatestExportsCarousel from './components/LatestExportsCarousel';
import HeroSection from './components/HeroSection';
import ContactSection from './components/ContactSection';
import Marquee from './components/Marquee';
import Reveal from './components/Reveal';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

// This page reads shows and blog posts from the database. Without this it is
// prerendered once at build time and never reflects admin edits again.
export const revalidate = 60;

export default async function Home() {

  // Fetch latest 3 blog posts
  const recentPosts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    take: 3,
  });

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent selection:text-white">

      {/* Hero Section & Intent Cards (Client Component) */}
      <HeroSection />

      <Marquee />

      {/* Contact — sits directly under the hero: getting in touch is the point of the site */}
      <ContactSection />

      {/* Latest Music */}
      <section id="music" className="py-28 lg:py-36 px-6 relative bg-[#0a0a0a] border-t border-white/5">
        {/* Silver Gradient Top Highlight */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-200/10 via-gray-400/5 to-transparent pointer-events-none z-10"></div>

        <div className="container mx-auto max-w-7xl relative z-20">
          <Reveal className="relative mb-16">
            <div className="absolute -top-12 right-0 text-[10rem] md:text-[14rem] font-black text-white/[0.02] select-none pointer-events-none leading-none tracking-tighter">
              01
            </div>
            <h2 className="relative z-10 text-5xl lg:text-7xl font-black uppercase tracking-tighter text-white leading-[0.9]">
              My Latest Music
            </h2>
            <div className="mt-6 flex items-center gap-4 relative z-10">
              <div className="h-px w-12 bg-accent"></div>
              <p className="text-gray-400 text-lg font-medium tracking-wide">
                Recent releases and edits.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <LatestExportsCarousel />
          </Reveal>
        </div>
      </section>

      {/* Blog: Connected to Prisma */}
      <section id="blog" className="pt-32 lg:pt-40 pb-16 lg:pb-20 px-6 relative overflow-hidden bg-black">

        {/* Background Atmosphere */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[1200px] pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-900/10 blur-[120px] rounded-full mix-blend-screen"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full mix-blend-screen"></div>
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">

          {/* Header */}
          <Reveal className="text-center mb-24 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] md:text-[16rem] font-black text-white/[0.02] select-none pointer-events-none leading-none tracking-tighter">
              02
            </div>
            <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter text-white leading-[0.9] mb-6 relative z-10 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
              What I&apos;ve Learnt
            </h2>
            <div className="h-1 w-20 bg-accent mx-auto mb-8 rounded-full"></div>
            <p className="text-gray-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              Notes on making club music, DJing, and trying to get it heard. Mostly things I worked out the slow way.
            </p>
          </Reveal>

          {/* Dynamic Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentPosts.length > 0 ? (
              recentPosts.map((post, i) => (
                <Reveal key={post.id} delay={i * 110} className="h-full">
                <Link href={`/blog/${post.slug}`} className="group relative block h-full">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-[2.5rem] -z-10 translate-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

                  <div className="h-full bg-[#111] border border-white/5 rounded-[2.5rem] flex flex-col transition-all duration-500 hover:-translate-y-2 hover:border-white/10 hover:ring-1 hover:ring-white/5 hover:shadow-2xl hover:shadow-accent/10 relative overflow-hidden">

                    {/* Card Image */}
                    <div className="relative h-64 w-full overflow-hidden">
                      {post.imageUrl ? (
                        <Image
                          src={post.imageUrl}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                          <span className="text-gray-700 font-black text-4xl uppercase">No Info</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                    </div>

                    {/* Content Wrapper */}
                    <div className="p-8 md:p-10 flex flex-col flex-grow relative">

                      {/* Hover Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                      {/* Category Badge */}
                      <div className="mb-8 relative z-10">
                        {post.categories && post.categories.length > 0 && (
                          <span className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 group-hover:text-accent group-hover:border-accent/30 transition-colors">
                            {post.categories[0]}
                          </span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-grow relative z-10">
                        <h3 className="text-2xl lg:text-3xl font-black uppercase leading-none tracking-tight mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-300">
                          {post.title}
                        </h3>
                        <p className="text-gray-500 text-sm font-medium leading-relaxed group-hover:text-gray-400 transition-colors line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>

                      {/* Action Footer */}
                      <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between group-hover:border-white/10 transition-colors relative z-10">
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">Read Article</span>
                        <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black group-hover:scale-110 transition-all duration-300">
                          <svg className="w-4 h-4 transform group-hover:-rotate-45 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
                </Reveal>
              ))
            ) : (
              <div className="col-span-3 text-center py-12 border border-white/5 rounded-[2.5rem] bg-[#111]">
                <p className="text-gray-500 text-xl font-medium">No blog posts found.</p>
              </div>
            )}
          </div>

          {/* View All Button */}
          <div className="mt-20 text-center">
            <Link href="/blog" className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-colors group">
              <span>View All Posts</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>

        </div>
      </section>

    </div >
  );
}
