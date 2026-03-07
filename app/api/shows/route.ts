import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const upcomingOnly = searchParams.get('upcoming') === 'true';

        const shows = await prisma.show.findMany({
            where: upcomingOnly ? { date: { gte: new Date() } } : undefined,
            orderBy: { date: 'asc' },
        });

        return NextResponse.json(shows);
    } catch (error) {
        console.error('Failed to fetch shows', error);
        return NextResponse.json({ error: 'Failed to fetch shows' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { venue, location, date, ticketUrl, isSoldOut } = body;

        if (!venue || !location || !date) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newShow = await prisma.show.create({
            data: {
                venue,
                location,
                date: new Date(date),
                ticketUrl: ticketUrl || null,
                isSoldOut: isSoldOut || false,
            },
        });

        return NextResponse.json(newShow, { status: 201 });
    } catch (error) {
        console.error('Failed to create show', error);
        return NextResponse.json({ error: 'Failed to create show' }, { status: 500 });
    }
}
