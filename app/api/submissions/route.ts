import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const submissionSchema = z.object({
    email: z.string().email(),
    type: z.enum(['TEMPLATE_REQUEST', 'DEMO_SUBMISSION']),
    data: z.record(z.string(), z.any()).optional(),
});

export async function POST(req: Request) {
    try {
        const json = await req.json();
        const body = submissionSchema.parse(json);

        const submission = await prisma.submission.create({
            data: {
                email: body.email,
                type: body.type,
                data: body.data || {},
            },
        });

        return NextResponse.json({ success: true, id: submission.id });
    } catch (error) {
        console.error('Submission error:', error);
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: 'Invalid data', details: error.issues }, { status: 400 });
        }
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
