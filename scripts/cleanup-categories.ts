
import prisma from '../lib/prisma';

async function main() {
    try {
        const slug = 'how-to-upload-to-soundcloud';
        // Update to valid categories only
        const updated = await prisma.blogPost.update({
            where: { slug },
            data: {
                categories: ['Production', 'Music Marketing']
            } as any
        });

        console.log(`Cleaned up categories for ${slug}. New categories:`, updated.categories);

    } catch (e) {
        console.error('Error cleaning up categories:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
