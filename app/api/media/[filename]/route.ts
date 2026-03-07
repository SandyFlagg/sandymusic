
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { updateFileMetadata } from '@/lib/local-media-metadata';

// We use dynamic route segment [filename]
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ filename: string }> }
) {
    const { filename } = await params;
    const body = await request.json();
    const { altText, caption, category } = body;

    // 1. Update Local Store (Always do this for reliability in this env)
    await updateFileMetadata(filename, { altText, caption, category });

    // 2. Update DB (Best effort)
    try {
        // Create if not exists logic is hard here without ID, so we try updateMany based on url ending with filename
        // Or just try to find by URL pattern
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (prisma as any).media.updateMany({
            where: {
                url: {
                    endsWith: filename
                }
            },
            data: {
                altText,
                caption,
                category
            }
        });
    } catch (e) {
        console.warn("DB update failed, ignoring", e);
    }

    return NextResponse.json({ success: true });
}
