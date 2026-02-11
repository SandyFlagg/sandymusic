'use client';

import React from 'react';

const NewsletterSection = () => {
    return (
        <section className="py-32 px-6 border-t border-white/10 bg-[#0a0a0a]">
            <div className="container mx-auto max-w-7xl">
                <div className="bg-[#111] text-white border border-white/10 rounded-[2.5rem] p-12 lg:p-24 relative overflow-hidden text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-16">

                    {/* Visual Accent */}
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

                    <div className="relative z-10 max-w-2xl">
                        <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter mb-6 leading-[0.9]">
                            Don&apos;t miss <br /> a beat.
                        </h2>
                        <p className="text-lg lg:text-xl font-medium text-gray-400 max-w-lg leading-relaxed">
                            Join the inner circle. Get notified when I release new tracks, post production tips, or drop free downloads.
                        </p>
                        <div className="flex gap-4 mt-8 justify-center lg:justify-start">
                            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">No Spam</span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Monthly-ish</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 w-full lg:w-auto min-w-[300px] lg:min-w-[400px]">
                        <form className="flex flex-col gap-4" onSubmit={(e) => {
                            e.preventDefault();
                            const form = e.target as HTMLFormElement;
                            const email = (form.elements.namedItem('email') as HTMLInputElement).value;
                            const subject = encodeURIComponent('Newsletter Signup');
                            const body = encodeURIComponent(`Please add me to the mailing list.\nEmail: ${email}`);
                            window.location.href = `mailto:sandy@sandymusic.com?subject=${subject}&body=${body}`;
                        }}>
                            <input
                                name="email"
                                type="email"
                                required
                                placeholder="YOUR@EMAIL.COM"
                                className="w-full h-16 bg-white/5 border-2 border-white/10 focus:border-white/20 text-white px-6 rounded-2xl outline-none transition-all duration-300 placeholder:text-gray-600 text-lg font-bold focus:bg-white/10"
                            />
                            <button className="w-full h-16 bg-white text-black text-lg font-black uppercase tracking-widest rounded-full hover:bg-accent hover:text-white transition-all duration-300 shadow-xl hover:-translate-y-1 active:scale-95">
                                Join The List
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default NewsletterSection;
