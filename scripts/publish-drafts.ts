import 'dotenv/config';
import prisma from '../lib/prisma';

const SLUGS = [
    'the-remix-that-got-two-million-plays',
    'getting-better-made-me-slower',
    'what-seo-taught-me-about-getting-music-heard',
];

async function main() {
    for (const slug of SLUGS) {
        const post = await prisma.blogPost.findUnique({ where: { slug } });
        if (!post) {
            console.log(`  missing: ${slug}`);
            continue;
        }
        if (post.published) {
            console.log(`  already live: ${slug}`);
            continue;
        }
        await prisma.blogPost.update({ where: { slug }, data: { published: true } });
        console.log(`  published: ${slug}`);
    }
}
main().finally(() => process.exit(0));
