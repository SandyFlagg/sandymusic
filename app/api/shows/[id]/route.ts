import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export async function PUT(request: Request, context: any) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const id = context.params.id;
        const body = await request.json();
        const { venue, location, date, ticketUrl, isSoldOut } = body;

        if (!venue || !location || !date) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const updatedShow = await prisma.show.update({
            where: { id },
            data: {
                venue,
                location,
                date: new Date(date),
                ticketUrl: ticketUrl !== undefined ? ticketUrl : null,
                isSoldOut: isSoldOut !== undefined ? isSoldOut : false,
            },
        });

        return NextResponse.json(updatedShow);
    } catch (error) {
        console.error('Failed to update show', error);
        return NextResponse.json({ error: 'Failed to update show' }, { status: 500 });
    }
}

export async function DELETE(request: Request, context: any) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const id = context.params.id;

        await prisma.show.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to delete show', error);
        return NextResponse.json({ error: 'Failed to delete show' }, { status: 500 });
    }
}
