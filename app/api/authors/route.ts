import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';



export async function GET() {
    try {
        const authors = await prisma.author.findMany({
            orderBy: { name: 'asc' }
        });
        return NextResponse.json(authors);
    } catch {
        return NextResponse.json({ error: 'Failed to fetch authors' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        // const user = await currentUser();
        // if (!user) {
        //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        // }

        const body = await request.json();
        const { name, role, bio, avatarUrl } = body;

        if (!name) {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 });
        }

        const author = await prisma.author.create({
            data: {
                name,
                role,
                bio,
                avatarUrl
            }
        });

        return NextResponse.json(author);
    } catch (error) {
        console.error('Error creating author:', error);
        return NextResponse.json({ error: 'Failed to create author', details: (error as Error).message }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { id, name, role, bio, avatarUrl } = body;

        if (!id || !name) {
            return NextResponse.json({ error: 'ID and Name are required' }, { status: 400 });
        }

        const author = await prisma.author.update({
            where: { id },
            data: {
                name,
                role,
                bio,
                avatarUrl
            }
        });

        return NextResponse.json(author);
    } catch (error) {
        console.error('Error updating author:', error);
        return NextResponse.json({ error: 'Failed to update author', details: (error as Error).message }, { status: 500 });
    }
}
