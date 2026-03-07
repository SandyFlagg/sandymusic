'use client';

import { useState } from 'react';

export default function ProducerSection() {
    const [templateStatus, setTemplateStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [feedbackStatus, setFeedbackStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');


    const handleTemplateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setTemplateStatus('loading');
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email');

        try {
            const res = await fetch('/api/submissions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, type: 'TEMPLATE_REQUEST' }),
            });
            if (res.ok) {
                setTemplateStatus('success');
                (e.target as HTMLFormElement).reset();
            } else {
                setTemplateStatus('error');
            }
        } catch {
            setTemplateStatus('error');
        }
    };

    const handleFeedbackSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFeedbackStatus('loading');
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email');
        const link = formData.get('link');

        try {
            const res = await fetch('/api/submissions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    type: 'DEMO_SUBMISSION',
                    data: { link }
                }),
            });
            if (res.ok) {
                setFeedbackStatus('success');
                (e.target as HTMLFormElement).reset();
            } else {
                setFeedbackStatus('error');
            }
        } catch {
            setFeedbackStatus('error');
        }
    };

    return (
        <section
            id="producer"
            className="py-32 lg:py-40 px-6 border-b border-white/5 bg-[#0a0a0a]"
            style={{
                backgroundImage: `linear-gradient(to right, #222 1px, transparent 1px),
                                linear-gradient(to bottom, #222 1px, transparent 1px)`,
                backgroundSize: '24px 24px'
            }}
        >
            <div className="container mx-auto max-w-7xl relative">

                {/* Simplified Header */}
                <div className="text-left max-w-3xl mb-16 animate-fade-in-up">
                    <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter text-white leading-none mb-8">
                        PRODUCER <br /> TOOLS
                    </h2>
                    <p className="text-xl text-gray-300 font-medium leading-relaxed mb-8 max-w-2xl">
                        Don&apos;t start from scratch. Use the actual project files, racks, and samples I use in my own released tracks.
                    </p>

                </div>



                {/* Action Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Card 1: Free Template (Primary) */}
                    <div className="relative group rounded-[2.5rem] bg-[#111] border border-white/5 hover:border-white/10 hover:ring-1 hover:ring-white/5 overflow-hidden transition-all duration-500">
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                        <div className="relative z-10 p-10 lg:p-14 flex flex-col justify-between h-full">
                            <div className="mb-10">
                                <h3 className="text-3xl lg:text-5xl font-black uppercase tracking-tighter text-white mb-4 leading-[0.9]">
                                    Free <span className="text-accent">Ableton</span> template
                                </h3>
                                <p className="text-gray-400 text-lg font-medium leading-relaxed max-w-md">
                                    Something I start most tracks from. Useful if you want less friction when opening Ableton so you can get straight into making music.
                                </p>
                            </div>

                            {templateStatus === 'success' ? (
                                <div className="w-full h-16 bg-green-500/10 border border-green-500/50 text-green-500 flex items-center justify-center rounded-2xl font-bold uppercase tracking-widest">
                                    Check your inbox! 📩
                                </div>
                            ) : (
                                <form className="w-full flex flex-col gap-4" onSubmit={handleTemplateSubmit}>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="YOUR@EMAIL.COM"
                                        disabled={templateStatus === 'loading'}
                                        className="w-full h-16 bg-white/5 border border-white/10 focus:border-accent text-white px-6 rounded-2xl outline-none text-lg font-bold placeholder:text-gray-600 transition-all focus:bg-white/10 disabled:opacity-50"
                                    />
                                    <button
                                        disabled={templateStatus === 'loading'}
                                        className="w-full h-16 bg-white text-black text-lg font-black uppercase tracking-widest rounded-2xl hover:bg-accent hover:text-white transition-all shadow-xl hover:shadow-accent/20 hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {templateStatus === 'loading' ? 'Sending...' : 'Send It'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* Card 2: Feedback (Secondary) */}
                    <div className="relative group rounded-[2.5rem] bg-[#111] border border-white/5 hover:border-white/10 hover:ring-1 hover:ring-white/5 overflow-hidden flex flex-col transition-all duration-500">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 bg-repeat bg-[length:100px_100px] pointer-events-none mix-blend-overlay"></div>

                        <div className="relative z-10 p-10 lg:p-14 flex flex-col justify-between h-full">
                            <div className="mb-10">
                                <h3 className="text-3xl lg:text-5xl font-black uppercase tracking-tighter text-white mb-4 leading-[0.9]">
                                    Need <br /> Feedback?
                                </h3>
                                <p className="text-gray-400 text-lg font-medium leading-relaxed max-w-md">
                                    Send me your WIPs to review. I listen to everything sent my way.
                                </p>
                            </div>

                            {feedbackStatus === 'success' ? (
                                <div className="w-full h-16 bg-blue-500/10 border border-blue-500/50 text-blue-500 flex items-center justify-center rounded-2xl font-bold uppercase tracking-widest">
                                    Got it! I&apos;ll listen soon. 🎧
                                </div>
                            ) : (
                                <form className="w-full flex flex-col gap-4" onSubmit={handleFeedbackSubmit}>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="YOUR@EMAIL.COM"
                                        disabled={feedbackStatus === 'loading'}
                                        className="w-full h-16 bg-white/5 border border-white/10 focus:border-white text-white px-6 rounded-2xl outline-none text-lg font-bold placeholder:text-gray-600 transition-all focus:bg-white/10 disabled:opacity-50"
                                    />
                                    <div className="flex gap-4">
                                        <input
                                            type="url"
                                            name="link"
                                            required
                                            placeholder="PRIVATE LINK (SC/DROPBOX)"
                                            disabled={feedbackStatus === 'loading'}
                                            className="flex-1 h-14 bg-white/5 border border-white/10 focus:border-white text-white px-6 rounded-2xl outline-none text-sm font-bold placeholder:text-gray-600 transition-all focus:bg-white/10 disabled:opacity-50"
                                        />
                                        <button
                                            disabled={feedbackStatus === 'loading'}
                                            className="w-32 h-14 bg-white text-black text-sm font-black uppercase tracking-widest rounded-2xl hover:bg-white hover:text-black transition-all shadow-xl hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {feedbackStatus === 'loading' ? '...' : 'Send'}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}

