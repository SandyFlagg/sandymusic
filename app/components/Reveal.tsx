'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Fades content up as it scrolls into view.
 *
 * The site already had fadeInUp keyframes but they only fired on page load, so
 * everything below the fold had animated away before you ever saw it.
 *
 * Reduced motion is handled in CSS rather than by branching in the effect:
 * motion-reduce pins the element visible regardless of whether the observer
 * has fired, so there is no state to set synchronously.
 */
export default function Reveal({
    children,
    delay = 0,
    className = '',
}: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [shown, setShown] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShown(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '0px 0px -12% 0px' },
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
            style={{ transitionDelay: shown ? `${delay}ms` : '0ms' }}
        >
            {children}
        </div>
    );
}
