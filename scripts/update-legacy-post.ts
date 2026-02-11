
import prisma from '../lib/prisma';

async function main() {
    try {
        const slug = 'how-to-upload-to-soundcloud';
        const updated = await prisma.blogPost.update({
            where: { slug },
            data: {
                categories: ['Production'] // Setting a default category
            } as any
        });
        console.log(`Updated post: ${updated.title} with categories: ${updated.categories}`);
    } catch (e) {
        console.error('Error updating post:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
