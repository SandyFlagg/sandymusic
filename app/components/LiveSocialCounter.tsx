'use client';

import { useEffect, useState } from 'react';

interface LiveSocialCounterProps {
    label: string;
    end: number;
    suffix?: string;
    duration?: number;
}

export default function LiveSocialCounter({ label, end, suffix = '', duration = 2000 }: LiveSocialCounterProps) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime: number | null = null;
        const start = 0;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);

            // Easing function for smooth deceleration
            const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4);

            const currentCount = Math.floor(start + (end - start) * easeOutQuart(percentage));
            setCount(currentCount);

            if (progress < duration) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [end, duration]);

    // Format number with commas
    const formattedCount = new Intl.NumberFormat('en-US').format(count);

    return (
        <div className="flex flex-col items-center sm:items-start">
            <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="font-mono text-xl md:text-2xl font-bold text-white tracking-tight">
                    {formattedCount}{suffix}
                </span>
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500 pl-4">
                {label}
            </span>
        </div>
    );
}
