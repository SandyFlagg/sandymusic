import 'dotenv/config';
import prisma from '../lib/prisma';

/**
 * One-off tidy of test data that was publicly visible on the live site.
 * Unpublishes rather than deletes the test post, so nothing is lost.
 */
async function main() {
    const show = await prisma.show.findFirst({ where: { venue: { contains: 'Pelicano' } } });
    if (show) {
        await prisma.show.delete({ where: { id: show.id } });
        console.log(`Deleted show: ${show.venue} (${show.date.toISOString().slice(0, 10)})`);
    } else {
        console.log('No Pelicano show found.');
    }

    const testPost = await prisma.blogPost.findUnique({ where: { slug: 'category-test-no-avatar' } });
    if (testPost?.published) {
        await prisma.blogPost.update({
            where: { slug: 'category-test-no-avatar' },
            data: { published: false },
        });
        console.log('Unpublished test post: category-test-no-avatar (still in /admin/blog if you want it)');
    }

    // The one real existing post pointed at picsum.photos for its cover image —
    // a random stock photo service that could change or disappear.
    const legacy = await prisma.blogPost.findUnique({ where: { slug: 'how-to-upload-to-soundcloud' } });
    if (legacy && legacy.imageUrl?.includes('picsum.photos')) {
        await prisma.blogPost.update({
            where: { slug: 'how-to-upload-to-soundcloud' },
            data: { imageUrl: '/images/blog_production_operator.png' },
        });
        console.log('Replaced picsum.photos cover on how-to-upload-to-soundcloud with a local image');
    }
}
main().finally(() => process.exit(0));
