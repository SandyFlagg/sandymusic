import Image from 'next/image';
import LiveSocialCounter from './LiveSocialCounter';
import SocialLinks from './SocialLinks';

const SOUNDCLOUD_URL = 'https://soundcloud.com/sandyflagg';

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
                    <a
                        href={SOUNDCLOUD_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-black uppercase tracking-widest text-sm hover:bg-accent hover:text-white transition-all duration-300 shadow-lg hover:-translate-y-0.5 active:scale-95 mb-12"
                    >
                        Hear the music
                        <svg className="w-5 h-5 transform group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M23.999 14.165c-.052 1.796-1.612 3.169-3.4 3.169h-8.18a.68.68 0 0 1-.675-.683V7.862a.747.747 0 0 1 .452-.724s.75-.513 2.333-.513a5.364 5.364 0 0 1 2.763.755 5.433 5.433 0 0 1 2.57 3.54c.282-.08.574-.121.868-.12.884 0 1.73.358 2.347.992s.948 1.49.922 2.373ZM10.721 8.421c.247 2.98.427 5.697 0 8.672a.264.264 0 0 1-.53 0c-.395-2.946-.22-5.718 0-8.672a.264.264 0 0 1 .53 0ZM9.072 9.448c.285 2.659.37 4.986-.006 7.655a.277.277 0 0 1-.55 0c-.331-2.63-.256-5.02 0-7.655a.277.277 0 0 1 .556 0Zm-1.663-.257c.27 2.726.39 5.171 0 7.904a.266.266 0 0 1-.532 0c-.38-2.69-.257-5.21 0-7.904a.266.266 0 0 1 .532 0Zm-1.647.77a26.108 26.108 0 0 1-.008 7.147.272.272 0 0 1-.542 0 27.955 27.955 0 0 1 0-7.147.275.275 0 0 1 .55 0Zm-1.67 1.769c.421 1.865.228 3.5-.029 5.388a.257.257 0 0 1-.514 0c-.21-1.858-.398-3.549 0-5.389a.272.272 0 0 1 .543 0Zm-1.655-.273c.388 1.897.26 3.508-.01 5.412-.026.28-.514.283-.54 0-.244-1.878-.347-3.54-.01-5.412a.283.283 0 0 1 .56 0Zm-1.668.911c.4 1.268.257 2.292-.026 3.572a.257.257 0 0 1-.514 0c-.241-1.262-.354-2.312-.023-3.572a.283.283 0 0 1 .563 0Z" /></svg>
                    </a>

                    {/* Social Row */}
                    <SocialLinks />
                </div>

                {/* Visuals: Photo & Stats - Right Column */}
                <div className="relative z-10 w-full lg:w-1/2 flex flex-col items-center justify-center animate-fade-in-up delay-200">

                    {/* Profile Photo Container */}
                    <div className="relative w-full max-w-[520px] aspect-[3/2] rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl shadow-black/60 mb-8 sm:rotate-2 hover:rotate-0 transition-transform duration-500">
                        <Image
                            src="/sandy-live.jpg"
                            alt="Sandy playing to a crowd"
                            fill
                            sizes="(max-width: 1024px) 100vw, 520px"
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
