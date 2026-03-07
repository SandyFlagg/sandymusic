'use client';

import { useState } from 'react';
import Link from 'next/link';

type Show = {
    id: string;
    venue: string;
    location: string;
    date: Date;
    ticketUrl: string | null;
    isSoldOut: boolean;
};

export default function ShowsTable({ initialShows }: { initialShows: Show[] }) {
    const [shows, setShows] = useState(initialShows);
    const [deleting, setDeleting] = useState<string | null>(null);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this show?')) return;

        setDeleting(id);
        const res = await fetch(`/api/shows/${id}`, { method: 'DELETE' });

        if (res.ok) {
            setShows(shows.filter(s => s.id !== id));
        } else {
            alert('Failed to delete show');
        }
        setDeleting(null);
    };

    if (shows.length === 0) {
        return (
            <div className="bg-[#111] border border-white/10 rounded-2xl p-12 text-center text-gray-500 font-bold uppercase tracking-widest">
                No shows found. Add one to get started.
            </div>
        );
    }

    return (
        <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-[#1a1a1a] text-xs font-bold uppercase tracking-widest text-gray-500">
                    <tr>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Venue</th>
                        <th className="px-6 py-4">Location</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {shows.map((show) => {
                        // Clear the time part for robust exact-day comparisons, or just do raw UTC.
                        const isPast = new Date(show.date).getTime() < new Date().setHours(0, 0, 0, 0);
                        return (
                            <tr key={show.id} className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4 text-white">
                                    {new Date(show.date).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 text-white font-bold">{show.venue}</td>
                                <td className="px-6 py-4 text-gray-400">{show.location}</td>
                                <td className="px-6 py-4">
                                    {isPast ? (
                                        <span className="text-gray-500 text-xs px-3 py-1 bg-white/5 border border-white/10 rounded-full uppercase tracking-wider font-bold">Past</span>
                                    ) : show.isSoldOut ? (
                                        <span className="text-red-500 text-xs px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full uppercase tracking-wider font-bold">Sold Out</span>
                                    ) : (
                                        <span className="text-green-500 text-xs px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full uppercase tracking-wider font-bold">Upcoming</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right space-x-6">
                                    <Link href={`/admin/shows/${show.id}`} className="text-gray-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(show.id)}
                                        disabled={deleting === show.id}
                                        className="text-red-500 hover:text-red-400 transition-colors text-sm font-bold uppercase tracking-widest disabled:opacity-50"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
