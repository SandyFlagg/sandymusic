
import prisma from '../lib/prisma';

async function main() {
    try {
        const slug = 'how-to-upload-to-soundcloud';
        // Fetch the post to get current tags
        const post = await prisma.blogPost.findUnique({
            where: { slug }
        });

        if (!post) {
            console.error('Post not found');
            return;
        }

        // Combine existing categories with tags, handling mapping
        const tags = post.tags || [];
        const existingCategories = post.categories || [];

        const newCategories = new Set(existingCategories);

        tags.forEach(tag => {
            if (tag === 'Music Production') {
                newCategories.add('Production');
            } else {
                newCategories.add(tag);
            }
        });

        // Update the post matches
        const updated = await prisma.blogPost.update({
            where: { slug },
            data: {
                categories: Array.from(newCategories),
                tags: [] // Clear tags? Or keep them? Let's clear them to avoid duplication if we swap the display
            } as any
        });

        console.log(`Migrated tags to categories for ${slug}. New categories:`, updated.categories);

    } catch (e) {
        console.error('Error migrating tags:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
