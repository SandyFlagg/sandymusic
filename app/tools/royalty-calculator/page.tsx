import RoyaltyCalculator from '@/components/tools/RoyaltyCalculator';
import Navbar from '@/app/components/Navbar';

export const metadata = {
    title: 'Streaming Royalty Calculator | Sandy Music',
    description: 'Estimate your music earnings from Spotify, Apple Music, and SoundCloud streams. Free tool for independent artists.',
    alternates: {
        canonical: '/tools/royalty-calculator',
    },
    openGraph: {
        title: 'Streaming Royalty Calculator | Sandy Music',
        description: 'See how much your streams are worth. Calculate earnings from Spotify, Apple Music, and SoundCloud.',
        url: 'https://www.sandymusic.com/tools/royalty-calculator',
        siteName: 'Sandy Music',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Streaming Royalty Calculator',
        description: 'Estimate your music earnings from Spotify, Apple Music, and SoundCloud streams.',
        creator: '@sandymusic',
    },
};

export default function RoyaltyCalculatorPage() {
    return (
        <main className="min-h-screen bg-black font-sans selection:bg-accent selection:text-white">
            <Navbar />

            <div className="pt-32 pb-24 px-6">
                <div className="container mx-auto max-w-7xl">
                    <div className="text-center mb-16 animate-fade-in-up">
                        <h1 className="text-5xl lg:text-8xl font-black uppercase tracking-tighter text-white mb-6 leading-[0.9]">
                            Royalty <br /><span className="text-accent">Calculator</span>
                        </h1>
                        <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto">
                            See how much your streams could be worth.
                        </p>
                    </div>

                    <RoyaltyCalculator />

                    {/* Additional Content */}
                    <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                        {/* Use Cases */}
                        <div className="space-y-8">
                            <h2 className="text-3xl font-black uppercase tracking-tighter text-white">
                                Why Use This <span className="text-accent">Tool?</span>
                            </h2>
                            <div className="space-y-6">
                                <div className="bg-[#111] border border-white/10 p-6 rounded-2xl hover:border-accent/50 transition-colors">
                                    <h3 className="text-xl font-bold text-white mb-2">💰 Project Revenue</h3>
                                    <p className="text-gray-400 leading-relaxed"> Estimate how much your next release could earn based on your current audience size and growth targets.</p>
                                </div>
                                <div className="bg-[#111] border border-white/10 p-6 rounded-2xl hover:border-accent/50 transition-colors">
                                    <h3 className="text-xl font-bold text-white mb-2">🤝 Label Deals</h3>
                                    <p className="text-gray-400 leading-relaxed">Fact-check advance offers against realistic streaming income. Don&apos;t sign away your rights for less than they&apos;re worth.</p>
                                </div>
                                <div className="bg-[#111] border border-white/10 p-6 rounded-2xl hover:border-accent/50 transition-colors">
                                    <h3 className="text-xl font-bold text-white mb-2">🎯 Set Goals</h3>
                                    <p className="text-gray-400 leading-relaxed">Reverse-engineer your success. Want to earn $1,000/month? Use the calculator to find out how many streams you need.</p>
                                </div>
                            </div>

                            <div className="pt-8">
                                <h2 className="text-3xl font-black uppercase tracking-tighter text-white mb-6">
                                    What is <span className="text-accent">1 Million</span> Streams Worth?
                                </h2>
                                <div className="bg-[#080808] border border-white/10 rounded-2xl p-6 space-y-4">
                                    <div className="flex justify-between items-center border-b border-white/5 pb-4">
                                        <span className="text-gray-400 font-bold">Spotify</span>
                                        <span className="text-white font-mono font-bold text-xl">$4,000</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-white/5 pb-4">
                                        <span className="text-gray-400 font-bold">Apple Music</span>
                                        <span className="text-white font-mono font-bold text-xl">$8,000</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400 font-bold">SoundCloud</span>
                                        <span className="text-white font-mono font-bold text-xl">$3,000</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* FAQs */}
                        <div>
                            <h2 className="text-3xl font-black uppercase tracking-tighter text-white mb-8">
                                Frequently Asked <span className="text-accent">Questions</span>
                            </h2>
                            <div className="space-y-4">
                                <details className="group bg-[#111] border border-white/10 rounded-2xl open:border-accent/50 transition-colors">
                                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                                        <span className="font-bold text-white">Are these numbers exact?</span>
                                        <span className="text-accent text-xl group-open:rotate-180 transition-transform">▼</span>
                                    </summary>
                                    <div className="px-6 pb-6 text-gray-400 leading-relaxed">
                                        No. These are estimated averages. Your actual payout per stream (PPS) depends on the listener&apos;s country, subscription plan (Free vs. Premium), and your distributor&apos;s fees.
                                    </div>
                                </details>

                                <details className="group bg-[#111] border border-white/10 rounded-2xl open:border-accent/50 transition-colors">
                                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                                        <span className="font-bold text-white">Do I keep 100% of this?</span>
                                        <span className="text-accent text-xl group-open:rotate-180 transition-transform">▼</span>
                                    </summary>
                                    <div className="px-6 pb-6 text-gray-400 leading-relaxed">
                                        Likely not. You need to deduct:
                                        <ul className="list-disc pl-5 mt-2 space-y-1">
                                            <li>Distributor fees (e.g., DistroKid, Tunecore)</li>
                                            <li>Publisher cuts (if you have one)</li>
                                            <li>Collaborator splits</li>
                                            <li>Taxes</li>
                                        </ul>
                                    </div>
                                </details>

                                <details className="group bg-[#111] border border-white/10 rounded-2xl open:border-accent/50 transition-colors">
                                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                                        <span className="font-bold text-white">Why is Apple Music higher?</span>
                                        <span className="text-accent text-xl group-open:rotate-180 transition-transform">▼</span>
                                    </summary>
                                    <div className="px-6 pb-6 text-gray-400 leading-relaxed">
                                        Apple Music is a paid-only service (no free ad-supported tier), which allows them to pay a higher rate per stream compared to Spotify&apos;s hybrid model.
                                    </div>
                                </details>

                                <details className="group bg-[#111] border border-white/10 rounded-2xl open:border-accent/50 transition-colors">
                                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                                        <span className="font-bold text-white">How can I increase earnings?</span>
                                        <span className="text-accent text-xl group-open:rotate-180 transition-transform">▼</span>
                                    </summary>
                                    <div className="px-6 pb-6 text-gray-400 leading-relaxed">
                                        Focus on building a loyal fanbase that streams repeatedly. Also, encourage listening on high-paying platforms like Apple Music and Tidal, and sell merchandise/tour tickets to diversify income.
                                    </div>
                                </details>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
