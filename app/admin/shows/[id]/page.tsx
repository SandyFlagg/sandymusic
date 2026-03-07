import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import ShowForm from '../ShowForm';

export default async function EditShowPage({ params }: { params: { id: string } }) {
    const show = await prisma.show.findUnique({
        where: { id: params.id }
    });

    if (!show) {
        return notFound();
    }

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-black uppercase tracking-tighter text-white">Edit Show</h1>
                <p className="text-gray-400 mt-2 font-medium">Update information for {show.venue}.</p>
            </div>
            <ShowForm initialData={show} />
        </div>
    );
}
