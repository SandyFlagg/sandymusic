import 'dotenv/config';
import prisma from '../lib/prisma';

async function main() {
    const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } });
    for (const p of posts) {
        console.log('='.repeat(70));
        console.log('slug        :', p.slug);
        console.log('title       :', p.title);
        console.log('published   :', p.published);
        console.log('createdAt   :', p.createdAt.toISOString().slice(0, 10));
        console.log('authorName  :', JSON.stringify(p.authorName), '| blogAuthorId:', p.blogAuthorId);
        console.log('authorAvatar:', p.authorAvatar);
        console.log('imageUrl    :', p.imageUrl);
        console.log('readTime    :', p.readTime, '| keyPoints:', p.keyPoints.length);
        console.log('excerpt     :', (p.excerpt || '').slice(0, 120));
        console.log('content len :', p.content.length);
        console.log('content head:', p.content.slice(0, 300).replace(/\n\s*/g, ' '));
    }
    const authors = await prisma.author.findMany();
    console.log('\n' + '='.repeat(70));
    for (const a of authors) console.log(`AUTHOR ${a.id} | name=${JSON.stringify(a.name)} | role=${JSON.stringify(a.role)} | avatar=${a.avatarUrl} | bio=${JSON.stringify((a.bio||'').slice(0,80))}`);
}
main().finally(() => process.exit(0));
