import Link from 'next/link';
import Image from 'next/image';
import LiveSocialCounter from './LiveSocialCounter';
import SocialLinks from './SocialLinks';

const INSTAGRAM_URL = 'https://www.instagram.com/sandymusic___/';

const HeroSection = () => {
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

                    {/* Primary CTA */}
                    <Link
                        href="#music"
                        className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-black uppercase tracking-widest text-sm hover:bg-accent hover:text-white transition-all duration-300 shadow-lg hover:-translate-y-0.5 active:scale-95"
                    >
                        Hear the music
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </Link>

                    {/* Collaboration invite */}
                    <p className="text-gray-500 max-w-md mt-8 mb-10 text-sm md:text-base leading-relaxed font-medium">
                        Making something yourself? I&apos;d love to help out or jump on a track &mdash;{' '}
                        <a
                            href={INSTAGRAM_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white border-b border-white/30 hover:text-accent hover:border-accent transition-colors"
                        >
                            DM me on Instagram
                        </a>.
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


                {/* Bottom edge */}
                <div className="absolute bottom-0 left-0 w-full h-px z-10 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50"></div>
            </section>

        </>
    );
};

export default HeroSection;
