
import prisma from '../lib/prisma';

async function main() {
    try {
        const slug = 'api-test-multi-category';
        const deleted = await prisma.blogPost.delete({
            where: { slug }
        });
        console.log(`Deleted post: ${deleted.title}`);
    } catch (e) {
        console.error('Error deleting post:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
