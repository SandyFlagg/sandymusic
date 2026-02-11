'use client';

import React from 'react';

const ContactSection = () => {
    return (
        <section id="contact" className="py-24 lg:py-48 px-6 border-t border-white/10 bg-[#111] relative overflow-hidden">
            <div className="container mx-auto max-w-7xl">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                    {/* Left: Info */}
                    <div className="lg:sticky lg:top-32">
                        <div className="absolute -top-24 left-0 text-[12rem] font-black text-white/[0.02] select-none pointer-events-none leading-none">
                            06
                        </div>
                        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8 relative z-10 text-white">
                            Get In <br /> Touch
                        </h2>
                        <p className="text-xl text-gray-400 mb-12 max-w-md leading-relaxed">
                            Got a question about a product, a booking enquiry, or just want to say hey?
                        </p>

                        <div className="space-y-8">
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Email</h4>
                                <a href="mailto:sandy@sandymusic.com" className="text-2xl text-white font-bold hover:text-accent transition-colors">sandy@sandymusic.com</a>
                            </div>
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Socials</h4>
                                <div className="flex gap-6">
                                    <a href="#" className="text-white hover:text-accent transition-colors uppercase font-bold tracking-widest text-sm border-b border-white/20 hover:border-accent pb-1">Instagram</a>
                                    <a href="#" className="text-white hover:text-accent transition-colors uppercase font-bold tracking-widest text-sm border-b border-white/20 hover:border-accent pb-1">Twitter</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="bg-[#1a1a1a] p-8 md:p-12 rounded-[2.5rem] border border-white/5 relative group">
                        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2.5rem]"></div>

                        <form className="space-y-6 relative z-10" onSubmit={(e) => {
                            e.preventDefault();
                            const form = e.target as HTMLFormElement;
                            const formData = new FormData(form);
                            const subject = encodeURIComponent(formData.get('subject') as string);
                            const body = encodeURIComponent(`Name: ${formData.get('name')}\nEmail: ${formData.get('email')}\nSubject: ${formData.get('subject')}\nMessage: ${formData.get('message')}`);
                            window.location.href = `mailto:sandy@sandymusic.com?subject=${subject}&body=${body}`;
                        }}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Name</label>
                                    <input name="name" type="text" required className="w-full h-14 bg-[#111] border border-white/5 focus:border-accent text-white px-6 rounded-xl outline-none transition-all duration-300 placeholder:text-gray-700 font-medium focus:ring-1 focus:ring-accent" placeholder="SANDY FLAGG" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Email</label>
                                    <input name="email" type="email" required className="w-full h-14 bg-[#111] border border-white/5 focus:border-accent text-white px-6 rounded-xl outline-none transition-all duration-300 placeholder:text-gray-700 font-medium focus:ring-1 focus:ring-accent" placeholder="HELLO@EXAMPLE.COM" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Subject</label>
                                <div className="relative">
                                    <select name="subject" className="w-full h-14 bg-[#111] border border-white/5 focus:border-accent text-white px-6 rounded-xl outline-none transition-all duration-300 font-medium appearance-none focus:ring-1 focus:ring-accent cursor-pointer">
                                        <option>General Inquiry</option>
                                        <option>Booking Request</option>
                                        <option>Collaboration</option>
                                        <option>Shop Support</option>
                                    </select>
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Message</label>
                                <textarea name="message" rows={6} required className="w-full bg-[#111] border border-white/5 focus:border-accent text-white p-6 rounded-xl outline-none transition-all duration-300 placeholder:text-gray-700 font-medium resize-none focus:ring-1 focus:ring-accent" placeholder="TELL ME WHATS GOOD..."></textarea>
                            </div>

                            <div className="pt-2">
                                <button type="submit" className="w-full h-16 bg-white text-black font-black uppercase tracking-[0.2em] rounded-full hover:bg-accent hover:text-white transition-all duration-300 shadow-lg hover:shadow-orange-500/20 hover:-translate-y-1 active:scale-95">
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ContactSection;
