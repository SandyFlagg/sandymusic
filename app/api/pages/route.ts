
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import { auth } from '@clerk/nextjs/server';

const pageSchema = z.object({
    title: z.string().min(1),
    slug: z.string().min(1),
    description: z.string().optional(),
    content: z.string().optional(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    isPublished: z.boolean().optional(),
});

export async function GET() {
    try {
        const pages = await prisma.page.findMany({
            orderBy: { updatedAt: 'desc' },
        });
        return NextResponse.json(pages);
    } catch {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const json = await req.json();
        const body = pageSchema.parse(json);

        // Check if slug exists
        const existing = await prisma.page.findUnique({
            where: { slug: body.slug },
        });

        if (existing) {
            return NextResponse.json({ error: 'Slug already exists' }, { status: 400 });
        }

        const page = await prisma.page.create({
            data: {
                title: body.title,
                slug: body.slug,
                description: body.description,
                content: body.content,
                metaTitle: body.metaTitle,
                metaDescription: body.metaDescription,
                isPublished: body.isPublished || false,
            },
        });

        return NextResponse.json(page);
    } catch (error) {
        console.error('Page creation error:', error);
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: 'Validation Error', details: error.issues }, { status: 400 });
        }
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
