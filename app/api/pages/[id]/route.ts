
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import { auth } from '@clerk/nextjs/server';

const pageUpdateSchema = z.object({
    title: z.string().min(1).optional(),
    slug: z.string().min(1).optional(),
    description: z.string().optional(),
    content: z.string().optional(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    isPublished: z.boolean().optional(),
});

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const page = await prisma.page.findUnique({
            where: { id },
        });

        if (!page) {
            return NextResponse.json({ error: 'Page not found' }, { status: 404 });
        }

        return NextResponse.json(page);
    } catch {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const json = await req.json();
        const body = pageUpdateSchema.parse(json);

        // Check slug uniqueness if updating slug
        if (body.slug) {
            const existing = await prisma.page.findUnique({
                where: { slug: body.slug },
            });
            if (existing && existing.id !== id) {
                return NextResponse.json({ error: 'Slug already taken' }, { status: 400 });
            }
        }

        const page = await prisma.page.update({
            where: { id },
            data: body,
        });

        return NextResponse.json(page);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: 'Validation Error', details: error.issues }, { status: 400 });
        }
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        await prisma.page.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
