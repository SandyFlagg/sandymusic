import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir, readdir, stat } from 'fs/promises';
import { join } from 'path';
import prisma from '@/lib/prisma';
import { getFileMetadata, updateFileMetadata } from '@/lib/local-media-metadata';
import { auth } from '@clerk/nextjs/server';

export async function POST(request: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const data = await request.formData();
        const file: File | null = data.get('file') as unknown as File;
        const category = data.get('category') as string || 'uncategorized';

        if (!file) {
            return NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Ensure directory exists
        const uploadDir = join(process.cwd(), 'public/uploads');
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch {
            // Ignore if exists
        }

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = uniqueSuffix + '-' + file.name.replace(/\s+/g, '-');
        const path = join(uploadDir, filename);
        const publicUrl = `/uploads/${filename}`;

        await writeFile(path, buffer);

        // Save Metadata Locally (Reliable Fallback)
        await updateFileMetadata(filename, { category });

        // Save to Database (Best Effort)
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            await (prisma as any).media.create({
                data: {
                    filename: file.name, // Original name
                    url: publicUrl, // System path
                    type: file.type,
                    size: file.size,
                    category: category,
                    altText: '',
                    caption: ''
                },
            });
        } catch (dbError) {
            console.warn('Database save failed, using local fallback:', dbError);
        }

        return NextResponse.json({
            success: true,
            media: {
                id: filename, // Use filename as default ID for simple client handling
                filename: file.name,
                url: publicUrl,
                type: file.type,
                category
            }
        });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ success: false, message: 'Upload failed' }, { status: 500 });
    }
}

export async function GET() {
    try {
        // Try DB first
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const media = await (prisma as any).media.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json({ success: true, media });
    } catch (error) {
        // Fallback to filesystem
        console.warn("DB failed, falling back to filesystem", error);
        try {
            const uploadDir = join(process.cwd(), 'public/uploads');
            const files = await readdir(uploadDir);

            // Map files to MediaItem shape
            const media = await Promise.all(files.map(async (file) => {
                const stats = await stat(join(uploadDir, file));
                // skip system files & metadata json
                if (file.startsWith('.') || file === '_metadata.json') return null;

                const metadata = await getFileMetadata(file);

                return {
                    id: file, // use filename as ID
                    filename: file,
                    url: `/uploads/${file}`,
                    type: 'image/unknown', // generic
                    createdAt: stats.birthtime,
                    category: metadata?.category || 'uncategorized',
                    altText: metadata?.altText || '',
                    caption: metadata?.caption || ''
                };
            }));

            // Filter nulls and sort
            const validMedia = media.filter(Boolean).sort((a, b) => {
                const dateA = a && a.createdAt ? new Date(a.createdAt).getTime() : 0;
                const dateB = b && b.createdAt ? new Date(b.createdAt).getTime() : 0;
                return dateB - dateA;
            });

            return NextResponse.json({ success: true, media: validMedia });
        } catch {
            return NextResponse.json({ success: false, media: [] });
        }
    }
}
