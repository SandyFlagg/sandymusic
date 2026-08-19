import 'dotenv/config';
import prisma from '../lib/prisma';

/**
 * Reframes the learning post. The previous version was built around "I never
 * did a production course", which implies courses are the norm and treats not
 * doing one as a distinction. Almost nobody does one. Same material, reframed
 * around a self-critical observation instead of a claim to being unusual.
 */

const UPDATED = {
    slug: 'i-watched-too-many-tutorials',
    title: 'I Watched Too Many Tutorials',
    excerpt:
        'I learned production the same way everyone does now: YouTube, at 2am, in no particular order. Here is what actually moved things forward and what just felt like it did.',
    metaTitle: 'I Watched Too Many Tutorials | Sandy Music',
    metaDescription:
        'Learning music production from YouTube: why watching feels like progress, the order nobody sequences for you, and what actually helped.',
    keyPoints: [
        'Watching a tutorial feels like progress in a way that opening a blank project does not.',
        'The problem is not finding information. It is that nothing tells you what to learn now versus in a year.',
        'Finishing bad tracks taught me more than good tutorials did.',
        'Any instrument you already play is a bigger head start than any plugin.',
    ],
    content: `
<p>I started on GarageBand, just messing about. Later, while I was studying business at UTS, I moved over to Ableton. Like almost everyone making music now, I learned from YouTube — no system, no order, just whatever the algorithm put in front of me at 2am.</p>

<p>That is the normal way to do it. I am not claiming otherwise. But I did it badly for a long time, and I have a fairly clear sense now of which bits were useful and which were procrastination wearing a helpful costume.</p>

<h2 id="watching-isnt-making">Watching is not making</h2>

<p>This is the one I wish someone had said to me earlier.</p>

<p>Watching a tutorial feels like progress. It is comfortable, it is well-lit, someone competent is explaining something clearly, and you end it knowing a thing you did not know before. Opening a blank Ableton project feels like nothing. It is uncomfortable and mostly consists of you being bad at something in private.</p>

<p>So given a free hour, I would very often watch. And I could tell myself that was working on music, because technically it was about music. It took me an embarrassingly long time to notice that the people getting better were the ones with more finished tracks, not more watch time.</p>

<h2 id="the-order-problem">Nobody sequences it for you</h2>

<p>The other issue with learning this way is not the amount of information. There is an absurd amount, all free, and more every day. The problem is that none of it is in an order.</p>

<p>You do not know what you should be learning now versus in a year, so you end up watching something on parallel compression before you can arrange eight bars. I spent time on mixing techniques I had no business thinking about, because mixing videos are everywhere — they get views, so they get made.</p>

<p>If I were starting again I would force the boring order: finish things badly, then learn to arrange, then worry about how it sounds. Roughly the reverse of what the internet hands you.</p>

<h2 id="what-actually-helped">What actually helped</h2>

<ul>
<li><strong>Finishing things, even bad ones.</strong> Every finished track taught me more than any video. Being forced to make an ending is a skill nobody covers.</li>
<li><strong>Making music with someone else.</strong> I made tracks with my cousin back at school and it was worth more than months of solo fiddling. You see how someone else gets around a problem you were stuck on, and you have to say your own choices out loud.</li>
<li><strong>Rebuilding records I liked by ear.</strong> Not sampling — trying to recreate a sound until it was close. You learn more about a bassline in an hour of failing to rebuild it than in any video about basslines.</li>
<li><strong>Friends slightly ahead of me.</strong> Not the people miles ahead. The people two steps ahead, who still remember what confused them and answer at your level.</li>
</ul>

<h2 id="the-piano-thing">The piano thing</h2>

<p>The one real advantage I had was playing piano at school, which I did through to my HSC. I spent most of that improvising rather than reading, and that turned out to matter more than the grades.</p>

<p>By the time I started making tracks I was used to messing with ideas and trusting my ear, so I was not staring at an empty piano roll wondering which note to click. Knowing a bit of theory helped too — not because you need it, but because it means fewer of your decisions are random.</p>

<p>If you play anything, even badly, that is a bigger head start than any plugin. And if you do not, an hour on keys will do more for your tracks than the next sample pack.</p>

<h2 id="what-i-missed">What I missed</h2>

<p>Mixing, almost entirely.</p>

<p>You can get a long way alone on ideas and arrangement, because you can hear whether those are working. Mixing is much harder to judge on your own: it sounds fine to you because you have been listening to it for six hours, and there is nobody in the room to say the low mids are a mess.</p>

<p>I also picked up habits nobody corrected, and I do not know how many. That is the actual cost of learning this way — not the missing knowledge, which you can go and get whenever you want, but the bad technique that goes unmentioned for years because nobody is watching you work.</p>

<h2 id="the-short-version">The short version</h2>

<p>You already have access to more teaching than any producer in history. That is not the bottleneck and it has not been for a long time. The bottleneck is hours spent making things that are not very good yet.</p>

<p>Pick a track you like, try to make something in that direction, finish it badly, do it again. I am still working on taking my own advice here.</p>
`.trim(),
};

async function main() {
    const existing = await prisma.blogPost.findUnique({ where: { slug: 'i-never-did-a-production-course' } });
    if (!existing) {
        console.log('Original not found — nothing to rewrite.');
        return;
    }
    await prisma.blogPost.update({
        where: { slug: 'i-never-did-a-production-course' },
        data: UPDATED,
    });
    console.log(`Rewritten: ${UPDATED.slug}`);
    console.log(`Title:     ${UPDATED.title}`);
}

main().finally(() => process.exit(0));
