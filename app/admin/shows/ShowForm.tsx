'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ShowForm({ initialData }: { initialData?: any }) {
    const router = useRouter();
    const [saving, setSaving] = useState(false);

    // Convert UTC date to local string for input type="date"
    const formatDateForInput = (dateStr: string) => {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        return d.toISOString().split('T')[0];
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSaving(true);

        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = {
            venue: formData.get('venue'),
            location: formData.get('location'),
            date: formData.get('date'),
            ticketUrl: formData.get('ticketUrl') || null,
            isSoldOut: formData.get('isSoldOut') === 'on',
        };

        const isEditing = !!initialData?.id;
        const url = isEditing ? `/api/shows/${initialData.id}` : '/api/shows';
        const method = isEditing ? 'PUT' : 'POST';

        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        setSaving(false);

        if (res.ok) {
            router.push('/admin/shows');
            router.refresh();
        } else {
            alert('Failed to save show');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-[#111] border border-white/10 rounded-2xl p-8">
            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Date</label>
                    <input
                        type="date"
                        name="date"
                        required
                        defaultValue={formatDateForInput(initialData?.date)}
                        className="w-full h-12 bg-black border border-white/10 rounded-xl px-4 text-white focus:border-accent outline-none focus:ring-1 focus:ring-accent"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Venue</label>
                    <input
                        type="text"
                        name="venue"
                        required
                        defaultValue={initialData?.venue}
                        className="w-full h-12 bg-black border border-white/10 rounded-xl px-4 text-white focus:border-accent outline-none focus:ring-1 focus:ring-accent"
                        placeholder="e.g. Enmore Theatre"
                    />
                </div>
                <div className="space-y-2 col-span-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Location</label>
                    <input
                        type="text"
                        name="location"
                        required
                        defaultValue={initialData?.location}
                        className="w-full h-12 bg-black border border-white/10 rounded-xl px-4 text-white focus:border-accent outline-none focus:ring-1 focus:ring-accent"
                        placeholder="e.g. Sydney, Australia"
                    />
                </div>
                <div className="space-y-2 col-span-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Ticket URL (Optional)</label>
                    <input
                        type="url"
                        name="ticketUrl"
                        defaultValue={initialData?.ticketUrl}
                        className="w-full h-12 bg-black border border-white/10 rounded-xl px-4 text-white focus:border-accent outline-none focus:ring-1 focus:ring-accent"
                        placeholder="https://eventbrite.com/..."
                    />
                </div>
                <div className="space-y-2 col-span-2 flex items-center gap-4 mt-2">
                    <input
                        type="checkbox"
                        name="isSoldOut"
                        id="isSoldOut"
                        defaultChecked={initialData?.isSoldOut}
                        className="w-5 h-5 bg-black border border-white/10 rounded accent-accent cursor-pointer"
                    />
                    <label htmlFor="isSoldOut" className="text-sm font-bold uppercase tracking-widest text-red-500 cursor-pointer">
                        Mark as Sold Out
                    </label>
                </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex justify-end gap-4">
                <button
                    type="button"
                    onClick={() => router.push('/admin/shows')}
                    className="px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-sm text-gray-400 hover:text-white transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={saving}
                    className="bg-white text-black px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-accent hover:text-white transition-colors disabled:opacity-50 inline-flex items-center justify-center min-w-[140px]"
                >
                    {saving ? (
                        <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : 'Save Show'}
                </button>
            </div>
        </form>
    );
}
