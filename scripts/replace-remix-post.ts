import 'dotenv/config';
import prisma from '../lib/prisma';

/**
 * Unpublishes the Skin on Skin remix post (kept in the database so it stays
 * recoverable from /admin/blog) and adds a replacement in its place.
 *
 * The replacement sticks strictly to what Sandy's About page already says:
 * GarageBand first, Ableton while studying business at UTS, no course, learned
 * by practising and watching YouTube, piano for the HSC, made music with his
 * cousin at school. No new claims.
 */

const REPLACEMENT = {
    slug: 'i-never-did-a-production-course',
    title: 'I Never Did a Production Course',
    excerpt:
        'No course, no system, no mentor. Just YouTube, a lot of practice, and friends who knew slightly more than I did. Here is what actually moved the needle and what was a waste of time.',
    categories: ['Backstage', 'Production'],
    tags: ['Learning', 'Ableton', 'Getting Started'],
    imageUrl: '/images/blog-hero-kick.jpg',
    readTime: '6 min read',
    metaTitle: 'I Never Did a Production Course | Sandy Music',
    metaDescription:
        'Learning music production without a course or a system: what actually helped, what was a waste of time, and why the theory you already have matters more than you think.',
    keyPoints: [
        'Nobody is coming to give you a curriculum. That is fine, but it means you pick the order yourself.',
        'Finishing bad tracks taught me more than watching good tutorials did.',
        'Any instrument you already play is a bigger head start than any plugin.',
        'The people slightly ahead of you are more useful than the people miles ahead.',
    ],
    content: `
<p>I started on GarageBand, just messing about. Later, while I was studying business at UTS, I moved over to Ableton. At no point did I do a course, follow a curriculum, or have anyone sit down and teach me production properly.</p>

<p>I am not going to pretend that was a clever decision. It was mostly that I did not know courses were a thing you could do, and then later I could not justify the money. But it does mean I have a reasonable sense of what you can pick up on your own, and where the gaps end up.</p>

<h2 id="the-order-problem">Nobody gives you an order</h2>

<p>The hard part about teaching yourself is not finding information. There is an absurd amount of it, all free, on YouTube. The hard part is that none of it is sequenced. You do not know what you should be learning now versus in a year, so you end up watching a video on parallel compression before you can arrange eight bars.</p>

<p>I lost a lot of time to that. Watching a tutorial feels like progress in a way that opening a blank project does not, and it is much more comfortable. But you cannot watch your way to being able to finish a track.</p>

<p>If I were starting again I would pick the boring order deliberately: finish things badly, then learn to arrange, then learn to mix. Not the other way around, which is the order the internet will hand you because mixing tutorials get more views.</p>

<h2 id="what-actually-helped">What actually helped</h2>

<ul>
<li><strong>Finishing things, even bad ones.</strong> Every finished track taught me more than any tutorial. Being forced to make an ending is a skill nobody teaches.</li>
<li><strong>Making music with someone else.</strong> I made tracks with my cousin back at school and that was worth more than months of solo fiddling. You see how someone else solves a problem you were stuck on, and you have to explain your own choices out loud.</li>
<li><strong>Copying records I liked.</strong> Not sampling — trying to rebuild a sound by ear until it was close. You learn more about a bassline in an hour of failing to recreate it than in any video about it.</li>
<li><strong>Friends slightly ahead of me.</strong> Not the people miles ahead — the people two steps ahead. They remember what confused them, and they answer questions at your level.</li>
</ul>

<h2 id="the-piano-thing">The piano thing</h2>

<p>The one advantage I did have was that I played piano at school and did it for my HSC. I spent a lot of that time improvising rather than reading, which turned out to matter more than the grades did.</p>

<p>When I started making tracks I was already used to playing around with ideas and trusting my ear, so I was not staring at a piano roll wondering what note to click. Knowing some theory helped too — not because you need it, but because it means fewer decisions are random.</p>

<p>If you play anything at all, even badly, that is a bigger head start than any plugin you could buy. And if you do not, learning a bit of keys will do more for your tracks than the next sample pack.</p>

<h2 id="what-i-missed">What I definitely missed</h2>

<p>Mixing. Almost entirely. Self-teaching gets you a long way with ideas and arrangement, because you can hear whether those are working. Mixing is much harder to self-assess: your mix sounds fine to you because you have been listening to it for six hours, and there is nobody to tell you the low mids are a mess.</p>

<p>I also picked up habits nobody corrected, and I still do not know how many. That is the real cost of no course. Not the missing knowledge, which you can go and get, but the bad technique that goes unmentioned for years because nobody is watching you work.</p>

<h2 id="would-i-do-a-course">Would I do one now?</h2>

<p>Probably, for mixing specifically. For everything else I do not think it would have made much difference. The bottleneck was never information. It was hours in Ableton, and no course gives you those.</p>

<p>What I would tell someone starting: you already have access to more teaching than any producer in history, so stop collecting it. Pick one track you like, try to make something in that direction, finish it badly, and do it again.</p>
`.trim(),
};

async function main() {
    const removed = await prisma.blogPost.updateMany({
        where: { slug: 'the-remix-that-got-two-million-plays' },
        data: { published: false },
    });
    console.log(`Unpublished remix post (${removed.count} row). Still in /admin/blog if you want it back.`);

    const author = await prisma.author.findFirst({ where: { name: 'Sandy Flagg' } });

    const existing = await prisma.blogPost.findUnique({ where: { slug: REPLACEMENT.slug } });
    if (existing) {
        console.log(`Replacement already exists: ${REPLACEMENT.slug}`);
        return;
    }

    await prisma.blogPost.create({
        data: {
            ...REPLACEMENT,
            published: true,
            blogAuthorId: author?.id,
            creatorId: 'seed-script',
            authorName: 'Sandy Flagg',
            authorAvatar: '/images/sandy-author.jpg',
            authorRole: 'Producer & DJ',
            authorBio: 'Producer and DJ from Sydney. Makes club music in his spare time and writes about what he learns.',
        },
    });
    console.log(`Published replacement: ${REPLACEMENT.slug}`);
}

main().finally(() => process.exit(0));
