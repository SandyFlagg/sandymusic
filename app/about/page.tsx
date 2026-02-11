'use client';

import Link from 'next/link';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-accent selection:text-white pt-32 pb-20">

            <div className="container mx-auto max-w-7xl px-6 lg:px-8">

                {/* Header */}
                <div className="mb-20 lg:mb-32">
                    <h1 className="text-8xl lg:text-[12rem] font-black tracking-tighter uppercase leading-[0.8] text-white/5 select-none pointer-events-none absolute top-20 right-0 z-0">
                        About
                    </h1>
                    <h1 className="relative z-10 text-6xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.9] mb-8">
                        About <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Sandy.</span>
                    </h1>
                    <p className="relative z-10 text-xl lg:text-3xl text-white font-medium max-w-3xl leading-relaxed">
                        I’m Sandy. I make music in my spare time and DJ occasionally. I also work full-time in SEO and live in Sydney.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

                    {/* Main Content Column */}
                    <div className="lg:col-span-7 space-y-20">

                        {/* Background */}
                        <section className="space-y-6">
                            <span className="text-accent font-mono text-xs uppercase tracking-[0.2em] block mb-2 opacity-80">01. Roots</span>
                            <h2 className="text-3xl lg:text-5xl font-black uppercase tracking-tight text-white mb-6">
                                Background
                            </h2>
                            <div className="prose prose-lg prose-invert text-gray-400 leading-relaxed space-y-6">
                                <p>
                                    I grew up on a farm near Wagga and moved to Sydney when I was about fifteen.
                                    Music was always around when I was younger, mostly through piano at school.
                                </p>
                                <p>
                                    I played piano for my HSC and spent a lot of time improvising. That made it easier later on when I started making tracks, because I was already used to playing around with ideas and trusting my ear. Learning some music theory helped too.
                                </p>
                            </div>
                        </section>

                        {/* Getting into production */}
                        <section className="space-y-6">
                            <span className="text-accent font-mono text-xs uppercase tracking-[0.2em] block mb-2 opacity-80">02. Origin</span>
                            <h2 className="text-3xl lg:text-5xl font-black uppercase tracking-tight text-white mb-6">
                                Getting into production
                            </h2>
                            <div className="prose prose-lg prose-invert text-gray-400 leading-relaxed space-y-6">
                                <p>
                                    I started making music properly on GarageBand, just messing around.
                                    Later, while I was studying business at UTS, I moved over to Ableton.
                                </p>
                                <p>
                                    I didn’t follow a course or a system. I learned by practising a lot, testing things, watching YouTube videos, and picking things up from friends. I also made music with my cousin back at school, which helped early on.
                                </p>
                                <p>
                                    Around that time, I remade an unreleased <strong className="text-white">Skin on Skin</strong> track and uploaded it to SoundCloud. It ended up getting around two million plays, which surprised me and made me put a bit more energy into production.
                                </p>
                            </div>
                        </section>

                        {/* Where I’m at now */}
                        <section className="space-y-6">
                            <span className="text-accent font-mono text-xs uppercase tracking-[0.2em] block mb-2 opacity-80">03. Status</span>
                            <h2 className="text-3xl lg:text-5xl font-black uppercase tracking-tight text-white mb-6">
                                Where I’m at now
                            </h2>
                            <div className="prose prose-lg prose-invert text-gray-400 leading-relaxed space-y-6">
                                <p>
                                    I enjoy making music, but I’ve noticed that as I’ve learned more, I’ve also become more critical and slower to finish things. I’ve got plenty of half-finished ideas sitting around.
                                </p>
                                <p>
                                    I think my strengths are having a decent ear and being comfortable improvising. I still find direction, finishing tracks, and mixing harder.
                                </p>
                                <p>
                                    At the moment, I probably spend about an hour a week in Ableton and I’m trying to slowly increase that without turning it into something I don’t enjoy.
                                </p>
                            </div>

                            <div className="pt-12">
                                <Link
                                    href="/#contact"
                                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-black uppercase tracking-widest hover:bg-accent hover:text-white hover:scale-105 transition-all duration-300"
                                >
                                    Get In Touch
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </Link>
                            </div>
                        </section>

                    </div>

                    {/* Sidebar: Interests & Playlist */}
                    <div className="lg:col-span-5 space-y-16 lg:pt-8">

                        {/* Spare Time (Interests) */}
                        <div className="bg-[#080808] border border-white/5 rounded-[2rem] p-8 lg:p-10">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-8 border-b border-white/5 pb-4">Spare Time</h3>
                            <div className="flex flex-wrap gap-3">
                                {['Music Production', 'Live Improvisation', 'SEO & Marketing', 'Design', 'Running', 'Coffee'].map((tag) => (
                                    <span key={tag} className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-sm font-medium text-gray-300 hover:text-accent hover:border-accent/40 transition-colors cursor-default">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Favorite DJs (Playlist) */}
                        <div className="bg-[#080808] border border-white/5 rounded-[2rem] p-8 lg:p-10">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-8 border-b border-white/5 pb-4">Favourite DJs</h3>
                            <ul className="space-y-4">
                                {[
                                    'DJ H0rde',
                                    'Skin on Skin',
                                    'Willaris K',
                                    'Club Angel'
                                ].map((artist, i) => (
                                    <li key={i} className="flex items-center justify-between text-gray-400 hover:text-white transition-colors group cursor-default">
                                        <span className="font-bold text-lg">{artist}</span>
                                        <span className="w-2 h-2 rounded-full bg-white/10 group-hover:bg-accent transition-colors"></span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
