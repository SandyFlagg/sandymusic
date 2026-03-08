'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LiveSocialCounter from './LiveSocialCounter';
import SocialLinks from './SocialLinks';

const HeroSection = () => {
    const [hoveredIntent, setHoveredIntent] = useState<'music' | 'producer' | null>(null);

    return (
        <>
            {/* Hero Section */}
            <section className="min-h-screen flex flex-col lg:flex-row items-center justify-center relative overflow-hidden px-6 lg:px-8 pt-40 pb-32 lg:pt-48 lg:pb-48 gap-16 lg:gap-20 max-w-7xl mx-auto">
                <div className="absolute inset-0 z-0 opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800 via-black to-black"></div>

                {/* Text Content */}
                <div className="relative z-20 text-center lg:text-left max-w-2xl lg:w-1/2 flex flex-col items-center lg:items-start lg:pl-4">
                    <h1 className="text-[15vw] md:text-[9vw] font-black leading-none tracking-tighter mb-4 text-white">
                        SANDY
                    </h1>
                    <p className="text-xl md:text-2xl font-black uppercase tracking-[0.2em] text-gray-500 mb-6">
                        Producer and DJ from Sydney, Australia 🇦🇺
                    </p>
                    <p className="text-gray-400 max-w-lg mb-10 text-base md:text-lg leading-relaxed font-medium">
                        Making club music and sharing what I learn along the way trying to make it as a DJ.
                    </p>

                    {/* Social Row */}
                    <SocialLinks />
                </div>

                {/* Visuals: Photo & Stats - Right Column */}
                <div className="relative z-10 w-full lg:w-1/2 flex flex-col items-center justify-center animate-fade-in-up delay-200">

                    {/* Profile Photo Container */}
                    <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full sm:rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl shadow-accent/20 mb-8 sm:rotate-2 hover:rotate-0 transition-transform duration-500">
                        <div className="absolute inset-0 bg-accent/20 mix-blend-overlay z-10"></div>
                        <Image
                            src="/sandy-profile.jpg"
                            alt="Sandy"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Live Stats */}
                    <div className="flex flex-col gap-4 mt-12">
                        <div className="flex gap-8">
                            <LiveSocialCounter end={11000000} label="Original Plays" suffix="+" duration={3000} />
                            <LiveSocialCounter end={15000} label="Followers" suffix="+" duration={2500} />
                        </div>
                        <p className="text-[10px] uppercase font-bold tracking-widest text-gray-600 pl-4 mt-1">
                            Across SoundCloud & streaming platforms
                        </p>
                    </div>

                </div>


                {/* The Connector Line - Interactive */}
                <div
                    className={`absolute bottom-0 left-0 w-full h-px z-10 transition-all duration-700
            ${hoveredIntent === 'music' ? 'bg-gradient-to-r from-accent via-white/10 to-transparent opacity-100' :
                            hoveredIntent === 'producer' ? 'bg-gradient-to-l from-white via-white/10 to-transparent opacity-100' :
                                'bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50'
                        }`}
                ></div>
            </section>

            {/* Intent Section: User Journey (Semi-Attached) */}
            <section className="relative z-30 -mt-16 lg:-mt-24 px-6 lg:px-8 container mx-auto max-w-7xl pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative">

                    {/* Card 1: Music */}
                    <Link
                        href="#music"
                        className="group relative bg-[#111] border border-white/5 rounded-[2.5rem] p-10 lg:p-14 min-h-[400px] flex flex-col justify-between overflow-hidden hover:border-white/10 hover:ring-1 hover:ring-white/5 hover:bg-[#151515] hover:shadow-[0_0_60px_-15px_rgba(255,85,0,0.15)] transition-all duration-500 hover:-translate-y-1"
                        onMouseEnter={() => setHoveredIntent('music')}
                        onMouseLeave={() => setHoveredIntent(null)}
                    >

                        {/* Abstract Background Elements */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#ffffff_0%,_transparent_25%)] opacity-0 group-hover:opacity-5 transition-opacity duration-700"></div>
                        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-accent/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-20 transition-opacity duration-700"></div>

                        {/* Background Music Icon */}
                        <div className="absolute -right-8 -bottom-8 text-white opacity-[0.03] group-hover:opacity-[0.07] group-hover:scale-110 group-hover:-rotate-12 transition-all duration-700 ease-out">
                            <svg width="250" height="250" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" /></svg>
                        </div>

                        <div className="relative z-10 flex flex-col gap-6">
                            <div className="w-16 h-1 bg-accent mb-2 group-hover:w-24 transition-all duration-500"></div>
                            <h3 className="text-5xl lg:text-7xl font-black text-white leading-none tracking-tighter">
                                I&apos;M HERE <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 group-hover:from-white group-hover:to-white transition-all duration-500">FOR THE MUSIC</span>
                            </h3>
                            <p className="text-gray-400 text-xl font-medium leading-relaxed max-w-sm group-hover:text-gray-300 transition-colors">
                                Tracks, DJ sets, and booking info.
                            </p>
                        </div>

                        {/* Action Button */}
                        <div className="relative z-10 self-end">
                            <div className="w-20 h-20 rounded-full border border-white/10 bg-white/5 flex items-center justify-center transform group-hover:bg-accent group-hover:border-accent group-hover:rotate-45 group-hover:scale-110 transition-all duration-300 shadow-lg">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            </div>
                        </div>
                    </Link>

                    {/* Arrow Divider */}
                    <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white/30">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </div>

                    {/* Card 2: Producer */}
                    <Link
                        href="#producer"
                        className="group relative bg-[#111] border border-white/5 rounded-[2.5rem] p-10 lg:p-14 min-h-[400px] flex flex-col justify-between overflow-hidden hover:border-white/10 hover:ring-1 hover:ring-white/5 hover:bg-[#151515] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.05)] transition-all duration-500 hover:-translate-y-1"
                        onMouseEnter={() => setHoveredIntent('producer')}
                        onMouseLeave={() => setHoveredIntent(null)}
                    >

                        {/* Abstract Grid Background */}
                        <div className="absolute inset-0 opacity-[0.1] group-hover:opacity-[0.15] transition-opacity duration-700"
                            style={{
                                backgroundImage: `linear-gradient(to right, #333 1px, transparent 1px),
                                linear-gradient(to bottom, #333 1px, transparent 1px)`,
                                backgroundSize: '24px 24px'
                            }}>
                        </div>

                        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-20 transition-opacity duration-700"></div>

                        <div className="relative z-10 flex flex-col gap-6">
                            <div className="w-16 h-1 bg-gray-600 group-hover:bg-white transition-all duration-500 mb-2 group-hover:w-24"></div>
                            <h3 className="text-5xl lg:text-7xl font-black text-white leading-none tracking-tighter">
                                I&apos;M A <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600 group-hover:from-white group-hover:to-gray-300 transition-all duration-500">PRODUCER</span>
                            </h3>
                            <p className="text-gray-400 text-xl font-medium leading-relaxed max-w-sm group-hover:text-gray-300 transition-colors">
                                Templates, presets, and workflow tips.
                            </p>
                        </div>

                        {/* Action Button */}
                        <div className="relative z-10 self-end">
                            <div className="w-20 h-20 rounded-full border border-white/10 bg-white/5 flex items-center justify-center transform group-hover:bg-white group-hover:text-black group-hover:border-white group-hover:rotate-45 group-hover:scale-110 transition-all duration-300 shadow-lg">
                                <svg className="w-8 h-8 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            </div>
                        </div>
                    </Link>
                </div>
            </section >
        </>
    );
};

export default HeroSection;
