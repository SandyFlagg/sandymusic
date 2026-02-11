
'use client';

import { useEffect, useState } from 'react';

const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
};

export default function LiveStats() {
    const [streams, setStreams] = useState(11006352);
    const [followers, setFollowers] = useState(15420);

    useEffect(() => {
        // Randomly increment streams every few seconds
        const streamInterval = setInterval(() => {
            if (Math.random() > 0.3) { // 70% chance to update
                setStreams(prev => prev + Math.floor(Math.random() * 3) + 1);
            }
        }, 2000);

        // Randomly increment followers less frequently
        const followerInterval = setInterval(() => {
            if (Math.random() > 0.7) { // 30% chance to update
                setFollowers(prev => prev + 1);
            }
        }, 4500);

        return () => {
            clearInterval(streamInterval);
            clearInterval(followerInterval);
        };
    }, []);

    return (
        <div className="w-full max-w-md animate-fade-in-up delay-200">
            <div className="bg-[#111]/90 backdrop-blur-xl border border-white/5 p-6 rounded-2xl shadow-2xl relative overflow-hidden">
                {/* Background glow - Red for "Live" feel */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2"></div>

                {/* Stats Container - Compact */}
                <div className="flex items-center justify-between gap-8 relative z-10">
                    {/* Stream Count */}
                    <div className="flex flex-col">
                        <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">Total Plays</span>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                            <span className="text-3xl md:text-4xl font-black text-white tracking-tighter tabular-nums">
                                {formatNumber(streams)}
                            </span>
                        </div>
                    </div>

                    {/* Follower Count */}
                    <div className="flex flex-col">
                        <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">Followers</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl md:text-3xl font-black text-white tracking-tighter tabular-nums">
                                {formatNumber(followers)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
