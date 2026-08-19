const SOUNDCLOUD_URL = 'https://soundcloud.com/sandyflagg';

const TRACKS = [
    { id: '2204475507', title: 'Man I Need', height: '300' },
    { id: '1671262302', title: 'Kiss Me Thru The Phone', height: '300' },
    { id: '1545888478', title: 'Jackie Brown', height: '300' },
];

export default function LatestExportsCarousel() {
    return (
        <div>
            {/* Tracks — the section is full width now, so they sit side by side
                rather than in a horizontal scroller. */}
            <div className="grid gap-8 md:grid-cols-3">
                {TRACKS.map((track) => (
                    <div key={track.id} className="group relative">
                        {/* Glow Effect */}
                        <div className="absolute -inset-1 bg-gradient-to-b from-accent to-purple-600 rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-500 will-change-[opacity]"></div>

                        <div className="relative w-full shadow-2xl rounded-3xl overflow-hidden bg-[#111] border border-white/10 group-hover:border-accent/50 transition-all duration-500 group-hover:-translate-y-1">
                            <iframe
                                title={track.title}
                                width="100%"
                                height={track.height}
                                scrolling="no"
                                frameBorder="no"
                                allow="autoplay"
                                loading="lazy"
                                src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A${track.id}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`}
                            ></iframe>
                        </div>
                    </div>
                ))}
            </div>

            {/* Everything else lives on SoundCloud */}
            <div className="mt-12 flex flex-wrap gap-4">
                <a
                    href={SOUNDCLOUD_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white hover:text-black transition-all duration-300 group"
                >
                    <div className="w-5 h-5 text-[#FF5500]">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                            <path d="M23.999 14.165c-.052 1.796-1.612 3.169-3.4 3.169h-8.18a.68.68 0 0 1-.675-.683V7.862a.747.747 0 0 1 .452-.724s.75-.513 2.333-.513a5.364 5.364 0 0 1 2.763.755 5.433 5.433 0 0 1 2.57 3.54c.282-.08.574-.121.868-.12.884 0 1.73.358 2.347.992s.948 1.49.922 2.373ZM10.721 8.421c.247 2.98.427 5.697 0 8.672a.264.264 0 0 1-.53 0c-.395-2.946-.22-5.718 0-8.672a.264.264 0 0 1 .53 0ZM9.072 9.448c.285 2.659.37 4.986-.006 7.655a.277.277 0 0 1-.55 0c-.331-2.63-.256-5.02 0-7.655a.277.277 0 0 1 .556 0Zm-1.663-.257c.27 2.726.39 5.171 0 7.904a.266.266 0 0 1-.532 0c-.38-2.69-.257-5.21 0-7.904a.266.266 0 0 1 .532 0Zm-1.647.77a26.108 26.108 0 0 1-.008 7.147.272.272 0 0 1-.542 0 27.955 27.955 0 0 1 0-7.147.275.275 0 0 1 .55 0Zm-1.67 1.769c.421 1.865.228 3.5-.029 5.388a.257.257 0 0 1-.514 0c-.21-1.858-.398-3.549 0-5.389a.272.272 0 0 1 .543 0Zm-1.655-.273c.388 1.897.26 3.508-.01 5.412-.026.28-.514.283-.54 0-.244-1.878-.347-3.54-.01-5.412a.283.283 0 0 1 .56 0Zm-1.668.911c.4 1.268.257 2.292-.026 3.572a.257.257 0 0 1-.514 0c-.241-1.262-.354-2.312-.023-3.572a.283.283 0 0 1 .563 0Z" />
                        </svg>
                    </div>
                    <span className="font-bold uppercase tracking-widest text-xs">More on SoundCloud</span>
                </a>
            </div>
        </div>
    );
}
