import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import ProducerSection from './components/ProducerSection';
import LatestExportsCarousel from './components/LatestExportsCarousel';
import HeroSection from './components/HeroSection';
import NewsletterSection from './components/NewsletterSection';
import ContactSection from './components/ContactSection';


export default async function Home() {

  // Fetch latest 3 blog posts
  const recentPosts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    take: 3,
  });

  // Fetch upcoming shows
  const upcomingShows = await prisma.show.findMany({
    where: { date: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } },
    orderBy: { date: 'asc' },
  });

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent selection:text-white">

      {/* Hero Section & Intent Cards (Client Component) */}
      <HeroSection />

      {/* Music & Bookings Section - Layout 2.0 (Seamless & Full Width) */}
      <section id="music" className="py-32 lg:py-40 px-6 relative bg-[#0a0a0a] border-t border-white/5">
        {/* Silver Gradient Top Highlight */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-200/10 via-gray-400/5 to-transparent pointer-events-none z-10"></div>

        <div className="container mx-auto max-w-7xl relative z-20">

          {/* Section Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start mb-16 gap-8">
            <div className="relative">
              <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter text-white leading-[0.9]">
                LATEST MUSIC <br /> & BOOKINGS
              </h2>
              <div className="mt-6 flex items-center gap-4">
                <div className="h-px w-12 bg-accent"></div>
                <p className="text-gray-400 text-lg font-medium tracking-wide">
                  Sydney based. Available worldwide.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">

            {/* Column 1: Latest Music - 6 Cols */}
            <div className="lg:col-span-6 bg-[#111] border border-white/10 rounded-[2.5rem] p-8 lg:p-12 h-full shadow-2xl">
              <LatestExportsCarousel />
            </div>

            {/* Column 2: Upcoming Dates - 6 Cols */}
            <div id="dates" className="lg:col-span-6 bg-[#111] border border-white/10 rounded-[2.5rem] p-8 lg:p-12 h-full flex flex-col shadow-2xl">
              {/* Simplified Upcoming Dates */}
              <div className="flex justify-between items-end mb-8">
                <div>
                  <span className="text-gray-500 font-mono text-xs uppercase tracking-widest mb-2 block">{new Date().getFullYear()} Season</span>
                  <h3 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter text-white leading-[0.9]">
                    Upcoming <br /> Dates
                  </h3>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-center">
                {upcomingShows.length === 0 ? (
                  <div className="group cursor-default">
                    <p className="text-2xl font-bold text-white mb-6 group-hover:text-accent transition-colors duration-300">
                      No public dates right now.
                    </p>

                    {/* Integrated Form */}
                    <form action="mailto:sandy@sandymusic.com" method="GET" className="flex gap-4 items-center group/form">
                      <input type="hidden" name="subject" value="Tour Notification List" />
                      <input type="hidden" name="body" value="Please notify me when tour dates are announced." />

                      <div className="relative flex-1 max-w-sm">
                        <span className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 text-accent transform -translate-x-full opacity-0 group-hover/form:opacity-100 group-hover/form:-translate-x-4 transition-all duration-300">→</span>
                        <input type="email" placeholder="Join the list for first access" className="bg-transparent border-b border-white/20 pb-2 text-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent w-full transition-colors p-0 rounded-none" />
                      </div>
                      <button type="submit" className="w-10 h-10 shrink-0 rounded-full bg-white/5 hover:bg-white hover:text-black flex items-center justify-center transition-all duration-300 border border-white/10 group-hover/form:border-accent/50 group-hover/form:bg-accent/10 group-hover/form:text-accent group-hover/form:hover:bg-accent group-hover/form:hover:text-black">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {upcomingShows.map((show: any) => {
                      const showDate = new Date(show.date);
                      const month = showDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
                      const day = showDate.toLocaleDateString('en-US', { day: '2-digit' });

                      return (
                        <div key={show.id} className="group flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 py-6 border-b border-white/5 last:border-0 hover:bg-white/[0.02] -mx-4 px-4 sm:-mx-6 sm:px-6 rounded-2xl transition-all duration-500">
                          <div className="flex items-center gap-6 sm:gap-8">
                            {/* Date block */}
                            <div className="flex flex-col items-center justify-center min-w-[3.5rem] opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 origin-center">
                              <span className="text-accent text-xs font-black tracking-widest uppercase mb-1">{month}</span>
                              <span className="text-3xl sm:text-4xl font-black text-white leading-none">{day}</span>
                            </div>

                            {/* Venue block */}
                            <div className="flex flex-col">
                              <div className="flex items-center gap-3">
                                <h4 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-300">{show.venue}</h4>
                                {show.isSoldOut && (
                                  <span className="bg-red-500/10 text-red-500 text-[10px] uppercase font-black tracking-widest px-2 py-0.5 rounded-sm border border-red-500/20 whitespace-nowrap">Sold Out</span>
                                )}
                              </div>
                              <p className="text-gray-500 text-sm font-medium mt-1 group-hover:text-gray-400 transition-colors uppercase tracking-wide">{show.location}</p>
                            </div>
                          </div>

                          {/* Action block */}
                          <div className="w-full sm:w-auto mt-2 sm:mt-0 flex justify-end shrink-0">
                            {show.ticketUrl && !show.isSoldOut ? (
                              <a
                                href={show.ticketUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/btn relative overflow-hidden bg-white text-black font-black uppercase tracking-widest text-xs px-8 py-4 rounded-full hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-500 inline-block text-center w-full sm:w-auto"
                              >
                                <span className="relative z-10 transition-colors duration-500 group-hover/btn:text-white">Tickets</span>
                                <div className="absolute inset-0 h-full w-full scale-x-0 group-hover/btn:scale-x-100 origin-left transition-transform duration-500 bg-accent ease-out"></div>
                              </a>
                            ) : (
                              <div className="w-full sm:w-auto text-center px-8 py-4 rounded-full bg-white/5 text-gray-600 font-black uppercase tracking-widest text-xs cursor-not-allowed">
                                {show.isSoldOut ? 'Sold Out' : 'Invite Only'}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Booking Enquiry - Full Width Row (Moved Bottom) */}
          <div className="relative">
            <div className="flex items-center gap-4 mb-8 opacity-50">
              <div className="h-px bg-white/20 flex-1"></div>
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Industry & Bookings</span>
              <div className="h-px bg-white/20 flex-1"></div>
            </div>

            <div className="bg-[#050505] p-8 lg:p-12 border border-white/5 rounded-[2.5rem] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/5 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

              <div className="relative z-10">
                <div className="mb-8">
                  <h3 className="text-3xl lg:text-4xl font-black uppercase tracking-tight text-white mb-2">
                    Booking Enquiry
                  </h3>
                  <p className="text-gray-400 max-w-md mx-auto lg:mx-0 text-lg">
                    Club nights, festivals, and international bookings.
                  </p>
                </div>

                {/* Simple form wrapper for mailto linkage */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Note: In a Server Component we can't easily capture onSubmit for complex mailto generation without client JS. 
                      Ideally this entire Booking Form should also be a Client Component if we want the complex mailto builder.
                      For now, let's keep the layout but acknowledging the limitation, or move this specific form logic to a component too.
                      Let's move this to a BookingForm component later or utilize the ContactSection logic pattern if consistent.
                      Actually, let's just make a simple link for now or import a client BookingForm.
                  */}
                  <div className="md:col-span-2">
                    <a href="mailto:sandy@sandymusic.com?subject=Booking Enquiry" className="block w-full text-center h-14 bg-white text-black text-base font-black uppercase tracking-[0.2em] rounded-full hover:bg-accent hover:text-white transition-all duration-300 shadow-lg hover:shadow-orange-500/20 py-4">
                      Send Booking Request via Email
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div >
      </section >


      {/* Producer Section */}
      < ProducerSection />

      {/* Blog: Connected to Prisma */}
      <section id="blog" className="pt-32 lg:pt-40 pb-16 lg:pb-20 px-6 relative overflow-hidden bg-black">

        {/* Background Atmosphere */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[1200px] pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-900/10 blur-[120px] rounded-full mix-blend-screen"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full mix-blend-screen"></div>
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">

          {/* Header */}
          <div className="text-center mb-24 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] md:text-[16rem] font-black text-white/[0.02] select-none pointer-events-none leading-none tracking-tighter">
              03
            </div>
            <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter text-white leading-[0.9] mb-6 relative z-10 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
              The Blog
            </h2>
            <div className="h-1 w-20 bg-accent mx-auto mb-8 rounded-full"></div>
            <p className="text-gray-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              Deep dives into production techniques, marketing strategies, and what I&apos;ve learnt from the industry.
            </p>
          </div>

          {/* Dynamic Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentPosts.length > 0 ? (
              recentPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group relative block h-full">
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

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* Contact */}
      <ContactSection />

    </div >
  );
}
