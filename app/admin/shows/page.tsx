import Link from 'next/link';
import prisma from '@/lib/prisma';
import ShowsTable from './ShowsTable';

export const dynamic = 'force-dynamic';

export default async function AdminShowsPage() {
    const shows = await prisma.show.findMany({
        orderBy: { date: 'asc' },
    });

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-black uppercase tracking-tighter text-white">Shows</h1>
                    <p className="text-gray-400 mt-2 font-medium">Manage upcoming and past shows.</p>
                </div>
                <Link
                    href="/admin/shows/new"
                    className="bg-white text-black px-6 py-3 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-accent hover:text-white transition-colors"
                >
                    Add Show
                </Link>
            </div>

            <ShowsTable initialShows={shows} />
        </div>
    );
}
