
import prisma from './lib/prisma';

async function main() {
    const post = await prisma.blogPost.findUnique({
        where: { slug: 'how-to-upload-to-soundcloud' }
    });
    console.log(post);
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
