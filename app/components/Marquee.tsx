const ITEMS = [
    'Club music',
    'Sydney, Australia',
    'Producer & DJ',
    'Open to collabs',
    'Out now on SoundCloud',
];

/**
 * Slow scrolling band used as a divider between sections. Two identical tracks
 * sit side by side and the pair translates by exactly -50%, so the loop is
 * seamless. aria-hidden on the duplicate so screen readers read it once.
 */
export default function Marquee() {
    const track = (
        <div className="flex shrink-0 items-center gap-10 pr-10">
            {ITEMS.map((item) => (
                <div key={item} className="flex items-center gap-10 shrink-0">
                    <span className="text-sm font-bold uppercase tracking-[0.25em] text-gray-500 whitespace-nowrap">
                        {item}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0"></span>
                </div>
            ))}
        </div>
    );

    return (
        <div className="relative border-y border-white/5 bg-black py-5 overflow-hidden">
            {/* Fade the band out at both edges so it does not just stop */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-black to-transparent"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-black to-transparent"></div>

            <div className="flex w-max animate-marquee motion-reduce:animate-none">
                {track}
                <div aria-hidden="true" className="flex shrink-0">{track}</div>
            </div>
        </div>
    );
}
