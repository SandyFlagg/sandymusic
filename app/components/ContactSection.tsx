import React from 'react';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE, CONTACT_EMAIL } from '@/lib/links';

const ContactSection = () => {
    return (
        <section id="contact" className="py-24 lg:py-32 px-6 relative overflow-hidden bg-[#0a0a0a] border-t border-white/5">
            {/* Instagram-toned glow, kept faint so it reads as atmosphere rather than branding */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[600px] h-[600px] lg:w-[900px] lg:h-[900px] rounded-full pointer-events-none blur-[140px] opacity-[0.10] lg:opacity-[0.16] bg-[radial-gradient(circle,_#833AB4_0%,_#E1306C_45%,_transparent_70%)]"></div>

            <div className="container mx-auto max-w-5xl relative z-10 text-center">

                <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="h-px w-8 bg-white/20"></div>
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500">Get in touch</span>
                    <div className="h-px w-8 bg-white/20"></div>
                </div>

                <h2 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-white leading-[0.9] mb-8">
                    Message me on <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F77737] via-[#E1306C] to-[#833AB4]">Instagram</span>
                </h2>

                <p className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto leading-relaxed mb-14">
                    Bookings, or if you&apos;re making something and want a hand with it.
                </p>

                {/* The handle itself is the button */}
                <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-5 pl-7 pr-4 py-4 rounded-full bg-white text-black shadow-2xl hover:shadow-[0_0_50px_-10px_rgba(225,48,108,0.5)] hover:-translate-y-1 active:scale-95 transition-all duration-300 max-w-full"
                >
                    <svg className="w-7 h-7 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                    <span className="text-xl md:text-2xl font-black tracking-tight truncate">{INSTAGRAM_HANDLE}</span>
                    <span className="w-11 h-11 shrink-0 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-accent transition-colors duration-300">
                        <svg className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </span>
                </a>

                <p className="text-sm text-gray-600 mt-10 leading-relaxed max-w-sm mx-auto">
                    I read everything. Might take me a few days to reply. Or email{' '}
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-gray-500 hover:text-accent transition-colors underline underline-offset-4 decoration-white/20">
                        {CONTACT_EMAIL}
                    </a>
                </p>

            </div>
        </section>
    );
};

export default ContactSection;
