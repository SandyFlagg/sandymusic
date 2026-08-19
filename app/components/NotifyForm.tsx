'use client';

import { useState } from 'react';

/**
 * Sign-up for tour date announcements.
 *
 * Replaces a `<form action="mailto:" method="GET">` that never worked: mailto
 * forms don't reliably compose an email, and the email input had no `name`, so
 * the address was never included even when it did.
 */
export default function NotifyForm() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');
        const form = e.currentTarget;
        const email = new FormData(form).get('email');

        try {
            const res = await fetch('/api/submissions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, type: 'TOUR_NOTIFY' }),
            });
            if (res.ok) {
                setStatus('success');
                form.reset();
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <p className="text-lg font-bold text-green-500">
                You&apos;re on the list. I&apos;ll let you know when dates are announced.
            </p>
        );
    }

    return (
        <form className="flex gap-4 items-center group/form" onSubmit={handleSubmit}>
            <div className="relative flex-1 max-w-sm">
                <span className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 text-accent transform -translate-x-full opacity-0 group-hover/form:opacity-100 group-hover/form:-translate-x-4 transition-all duration-300">→</span>
                <input
                    type="email"
                    name="email"
                    required
                    disabled={status === 'loading'}
                    placeholder="Join the list for first access"
                    className="bg-transparent border-b border-white/20 pb-2 text-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent w-full transition-colors p-0 rounded-none disabled:opacity-50"
                />
            </div>
            <button
                type="submit"
                disabled={status === 'loading'}
                aria-label="Join the tour notification list"
                className="w-10 h-10 shrink-0 rounded-full bg-white/5 hover:bg-white hover:text-black flex items-center justify-center transition-all duration-300 border border-white/10 group-hover/form:border-accent/50 group-hover/form:bg-accent/10 group-hover/form:text-accent group-hover/form:hover:bg-accent group-hover/form:hover:text-black disabled:opacity-50"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
            {status === 'error' && (
                <span className="text-sm font-bold text-red-500">Didn&apos;t send — try again?</span>
            )}
        </form>
    );
}
