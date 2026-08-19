'use client';

import React, { useState } from 'react';

const NewsletterSection = () => {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    // Previously this opened the visitor's mail client via a mailto: link, which
    // meant most signups were simply lost. Now it persists to the Submission table.
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');
        const form = e.currentTarget;
        const email = new FormData(form).get('email');

        try {
            const res = await fetch('/api/submissions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, type: 'NEWSLETTER_SIGNUP' }),
            });
            if (res.ok) {
                setStatus('success');
                form.reset();
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    return (
        <section className="pt-16 lg:pt-20 pb-32 lg:pb-40 px-6 bg-black">
            <div className="container mx-auto max-w-7xl">
                <div className="bg-[#111] text-white border border-white/5 rounded-[2.5rem] p-12 lg:p-24 relative overflow-hidden text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-16">

                    {/* Visual Accent */}
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

                    <div className="relative z-10 max-w-2xl">
                        <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter mb-6 leading-none">
                            Don&apos;t miss <br /> a beat.
                        </h2>
                        <p className="text-lg lg:text-xl font-medium text-gray-400 max-w-lg leading-relaxed">
                            Get notified when I release new tracks or post something new on the blog.
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
                        {status === 'success' ? (
                            <div className="w-full h-16 bg-green-500/10 border border-green-500/50 text-green-500 flex items-center justify-center rounded-2xl font-bold uppercase tracking-widest">
                                You&apos;re on the list 🎧
                            </div>
                        ) : (
                            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    disabled={status === 'loading'}
                                    placeholder="YOUR@EMAIL.COM"
                                    className="w-full h-16 bg-white/5 border-2 border-white/10 focus:border-white/20 text-white px-6 rounded-2xl outline-none transition-all duration-300 placeholder:text-gray-600 text-lg font-bold focus:bg-white/10 disabled:opacity-50"
                                />
                                <button
                                    disabled={status === 'loading'}
                                    className="w-full h-16 bg-white text-black text-lg font-black uppercase tracking-widest rounded-full hover:bg-accent hover:text-white transition-all duration-300 shadow-xl hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {status === 'loading' ? 'Joining...' : 'Join The List'}
                                </button>
                                {status === 'error' && (
                                    <p className="text-sm font-bold text-red-500 text-center">Something went wrong — try again?</p>
                                )}
                            </form>
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default NewsletterSection;
