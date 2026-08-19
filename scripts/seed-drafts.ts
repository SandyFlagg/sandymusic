import 'dotenv/config';
import prisma from '../lib/prisma';

/**
 * Creates the three blog drafts as unpublished posts, plus a proper Author
 * record. Safe to re-run: posts are upserted on slug, and re-running will not
 * republish anything you have since published.
 */

const AUTHOR = {
    name: 'Sandy Flagg',
    role: 'Producer & DJ',
    bio: 'Producer and DJ from Sydney. Makes club music in his spare time and writes about what he learns.',
    avatarUrl: '/images/sandy-author.jpg',
};

const POSTS = [
    {
        slug: 'the-remix-that-got-two-million-plays',
        title: 'The Remix That Got Two Million Plays',
        excerpt:
            'I remade an unreleased Skin on Skin track, put it on SoundCloud, and it did numbers I had not seen before. Here is what actually happened, and what it did and did not change.',
        categories: ['Backstage'],
        tags: ['SoundCloud', 'Remix', 'Skin on Skin'],
        imageUrl: '/images/blog-hero-kick.jpg',
        readTime: '6 min read',
        metaTitle: 'The Remix That Got Two Million Plays | Sandy Music',
        metaDescription:
            'What happened when a bedroom remake of an unreleased Skin on Skin track picked up two million plays on SoundCloud, and what it actually changed.',
        keyPoints: [
            'The track was a remake of an unreleased Skin on Skin ID that people were already hunting for.',
            'Demand existed before the upload. I did not create the interest, I just happened to be holding the thing people wanted.',
            'Two million plays did not translate into bookings, money, or a career on its own.',
            'The useful part was the confidence, not the number.',
        ],
        content: `
<p>I was studying business at UTS and making tracks in my spare time. Nothing serious. I had moved from GarageBand to Ableton not long before, and most of what I made stayed on my laptop.</p>

<p>Then I remade an unreleased Skin on Skin track and put it on SoundCloud. It ended up with around two million plays. That is more than everything else I have made put together, and it happened by accident.</p>

<p>People sometimes ask me how to make that happen. I do not really know. But I can tell you what I think was going on, because I have had a few years to think about it.</p>

<h2 id="what-happened">What actually happened</h2>

<p>The track was an ID. Skin on Skin had been playing it out, people had filmed it on their phones at festivals, and there were comment sections full of people asking what it was and when it was coming out. It was not released and there was no sign it was going to be.</p>

<p>So I sat down and tried to rebuild it by ear. Not sample it, rebuild it. I listened to a phone recording enough times to work out roughly what was going on, then recreated the parts in Ableton. It is not a perfect reproduction. It is my best guess at someone else's record.</p>

<p>Then I uploaded it and went to bed.</p>

<h2 id="why-i-think-it-worked">Why I think it worked</h2>

<p>The honest answer is that I did not create the demand. It was already there. There were thousands of people actively searching for that track, and when they searched, my version was one of the only things that came up.</p>

<p>That is the whole thing, really. I was not competing for attention against every other producer on SoundCloud. I was answering a question a lot of people were already asking. Everything else — the mixdown, the arrangement, whether my kick was any good — mattered much less than being the thing that showed up.</p>

<p>I think this is worth sitting with, because it cuts against the way people usually talk about going viral. Nothing about the track was special. The timing and the search demand were special.</p>

<h2 id="what-it-changed">What it changed</h2>

<p>Less than you would think.</p>

<p>Two million plays is a number that sounds enormous and translates into almost nothing on its own. It did not turn into bookings. It did not turn into money. It did not turn into a mailing list, because I did not have one. Most of the people who played it did not follow me, and the ones who did followed me expecting more of the same thing, which I was not really planning to make.</p>

<p>I want to be careful not to be falsely humble about it either. It did do one useful thing.</p>

<h2 id="what-it-did-do">What it did do</h2>

<p>It made me take production more seriously. Before that, making music was something I did to procrastinate. After it, I started thinking of myself as someone who makes music, which is a small shift but it changes what you do with your evenings.</p>

<p>It also taught me that I could sit down and reverse-engineer a record I liked. That skill has been more useful to me than the plays were. When I hear something now and want to know how it was made, I know I can usually work it out if I am patient enough.</p>

<h2 id="if-youre-hoping-for-a-lesson">If you are hoping for a lesson</h2>

<p>I do not think "go and remake unreleased IDs" is good advice. It worked once, it is a bit of a grey area, and the ceiling on it is low. You end up known for someone else's song.</p>

<p>The thing I would take from it is smaller: pay attention to what people are already looking for. Most music gets made and released into total silence, not because it is bad but because nobody was looking for it. Occasionally there is a gap where demand already exists and nothing is filling it. Those are worth noticing.</p>

<p>The rest of the time you are building an audience the slow way, which is what I am doing now.</p>
`.trim(),
    },
    {
        slug: 'getting-better-made-me-slower',
        title: 'Getting Better Made Me Slower',
        excerpt:
            'The better my ear got, the less I finished. I have a folder full of eight-bar loops to prove it. Some thoughts on taste outrunning ability, and what actually helps.',
        categories: ['Production'],
        tags: ['Ableton', 'Workflow', 'Finishing Tracks'],
        imageUrl: '/images/blog_workflow_ableton.png',
        readTime: '7 min read',
        metaTitle: 'Getting Better Made Me Slower | Sandy Music',
        metaDescription:
            'Why improving as a producer can mean finishing fewer tracks, and the small changes that help when your taste has outrun your ability.',
        keyPoints: [
            'Your taste improves faster than your ability, so the gap between them widens before it closes.',
            'A folder of unfinished eight-bar loops is a symptom of judging ideas too early, not of bad ideas.',
            'Deciding a track is finished is a separate skill from making it good.',
            'Constraints help more than motivation does.',
        ],
        content: `
<p>When I started making music I finished things constantly. They were bad, but they were finished. I would open GarageBand, mess around for two hours, export something, and send it to a friend.</p>

<p>Now I know considerably more about production and I finish almost nothing. I have a folder of eight-bar loops that I am fairly sure would be good tracks if I ever went back to them. I have not gone back to them.</p>

<p>This is apparently a common thing, and I have thought about why it happens.</p>

<h2 id="taste-moves-first">Taste moves faster than ability</h2>

<p>The usual explanation, and I think it is right, is that your ear improves faster than your hands do. You start being able to hear that your hi-hats are lifeless a long time before you can do anything about it. So there is a stretch — and it can be years — where you are good enough to know your work is not good, and not yet good enough to fix it.</p>

<p>When I was on GarageBand I could not hear most of what was wrong with my tracks, which meant I was happy to finish them. That ignorance was doing a lot of quiet work.</p>

<h2 id="judging-too-early">Judging ideas before they exist</h2>

<p>The specific way this ruins my sessions is that I now evaluate an idea about thirty seconds after having it. I will lay down a bassline, listen back twice, decide it is derivative, and delete it.</p>

<p>The problem is that thirty seconds in, no idea is any good. Ideas are not good when they arrive. They become good after you have arranged them, put them next to something else, and lived with them for a bit. Judging them at the loop stage means judging them at exactly the moment they are least able to defend themselves.</p>

<p>The version of me on GarageBand did not do this, because he could not tell the difference. He just kept going until there was a track.</p>

<h2 id="finishing-is-a-separate-skill">Finishing is its own skill</h2>

<p>The thing I underestimated for a long time is that deciding a track is done is a completely separate skill from making it sound good, and it does not improve on its own. You only get better at it by finishing things.</p>

<p>Which is an awkward loop, because the whole problem is that you are not finishing things. You get better at finishing by finishing. There is no way around that except to lower the bar for a while and accept that the next few will be worse than you would like.</p>

<h2 id="what-helps">What actually helps</h2>

<p>These are the things I have found genuinely make a difference, as opposed to the things I read and nodded at.</p>

<ul>
<li><strong>Arrange before you polish.</strong> Get a bad full-length arrangement down before you fix a single sound. A finished bad track can be improved. A perfect loop cannot, because there is nothing to improve it into.</li>
<li><strong>Give yourself less to work with.</strong> One drum kit, one bass sound, a time limit. Most of my unfinished projects died from having too many options, not too few.</li>
<li><strong>Do not start with the drums.</strong> I could spend an entire session on a kick, and often have. If the kick is the first thing I touch, nothing else gets made.</li>
<li><strong>Separate the sessions.</strong> Ideas on one day, arranging on another, mixing on a third. Trying to do all three at once is where the judging-too-early thing comes from.</li>
<li><strong>Finish something you do not care about.</strong> The pressure comes from the idea being precious. Take a loop you are lukewarm on and finish it as an exercise. You will learn the arrangement muscle without risking anything you like.</li>
</ul>

<h2 id="an-hour-a-week">An hour a week</h2>

<p>I should be honest about the scale I am working at. I have a full-time job and I get maybe an hour a week in Ableton at the moment. I am trying to increase that slowly, but I am also wary of turning the one thing I do for enjoyment into something with targets attached.</p>

<p>An hour a week is not enough to brute-force your way out of this problem. It does mean the constraints matter more. If I get an hour, I cannot spend it auditioning kicks. So in a strange way the lack of time has been better for my finishing rate than any amount of discipline was.</p>

<p>I still have the folder. But it is growing more slowly than it used to.</p>
`.trim(),
    },
    {
        slug: 'what-seo-taught-me-about-getting-music-heard',
        title: 'What Working In SEO Taught Me About Getting Music Heard',
        excerpt:
            'I do search for a living and make club music at night. The overlap is bigger than I expected, and most of it comes down to one idea: find the demand that already exists.',
        categories: ['Music Marketing'],
        tags: ['SEO', 'Music Marketing', 'SoundCloud', 'Discovery'],
        imageUrl: '/images/blog_marketing_hypeddit.png',
        readTime: '8 min read',
        metaTitle: 'What Working in SEO Taught Me About Getting Music Heard | Sandy Music',
        metaDescription:
            'A working SEO applies the trade to music promotion: search demand, naming tracks, the long tail, and why most music marketing advice has the order backwards.',
        keyPoints: [
            'Demand comes first. It is far easier to be found for something people already search for than to create new interest.',
            'What you name a track and how you tag it is a discovery decision, not an admin one.',
            'Small specific audiences convert better than large vague ones — the long tail applies to music too.',
            'Own something you control. Followers on a platform are rented; a mailing list is not.',
        ],
        content: `
<p>I work full-time in SEO and make club music in my spare time. For a long time I kept the two completely separate, mostly because "SEO guy" is not a thing anyone wants to be known as in a Sydney club.</p>

<p>But the overlap turns out to be substantial, and it explains something that took me years to work out about my own music.</p>

<h2 id="demand-first">Demand comes first, always</h2>

<p>The first thing you learn doing search work is that you do not create demand. You find it and you position yourself in front of it. Nobody in SEO sits down and tries to make people want a thing. They find out what people already want and make sure their client is the answer.</p>

<p>Most music promotion advice has this backwards. It is all about pushing — post more, be consistent, engage with your community — which is the equivalent of shouting in a room where nobody arrived looking for anything.</p>

<p>The most successful thing I have ever released succeeded entirely because demand already existed. It was a remake of an unreleased track people were actively hunting for. I did not build an audience for it. I stepped in front of one.</p>

<p>That is a slightly deflating lesson but it is a useful one, because it means the question changes. Instead of "how do I get people to care about my track", the question becomes "what are people already looking for that I could credibly make".</p>

<h2 id="names-are-discovery">What you call things matters more than you think</h2>

<p>In search, the words on the page are how you get found. In music, producers routinely give tracks names that no human being would ever type, then tag them with the three broadest genres available, then wonder why nothing surfaces.</p>

<p>A few things that are genuinely worth doing:</p>

<ul>
<li><strong>Include the artist name in edits and remixes.</strong> If someone is searching, they are searching the original artist's name. This is the single highest-leverage thing on the list.</li>
<li><strong>Tag specifically, not broadly.</strong> "Techno" is a category with millions of entries and you will never surface in it. The narrower descriptor is the one that finds you a listener.</li>
<li><strong>Write a real description.</strong> Two sentences about what the track is and where it came from. It costs nothing and it is indexable text.</li>
<li><strong>Be consistent with your name everywhere.</strong> If your SoundCloud, Instagram and TikTok handles are different, you are splitting the small amount of search demand you have across three places.</li>
</ul>

<p>None of this is exciting. All of it is the difference between being findable and not.</p>

<h2 id="the-long-tail">The long tail applies to music</h2>

<p>In search, you almost never win the big broad terms. What you win is hundreds of tiny specific ones, and together they add up to more than the big one would have.</p>

<p>The music version of this is that a very small, very specific audience is worth more than a large vague one. Two hundred people who specifically want the exact thing you make will turn up to a show. Twenty thousand people who followed you for one viral track will not.</p>

<p>I know this from experience, because I have the twenty thousand version and it does very little.</p>

<h2 id="own-something">Own the thing you can own</h2>

<p>The other lesson search work hammers into you is the difference between rented and owned. Rankings can vanish overnight when an algorithm changes. Anyone whose entire business depends on one traffic source eventually learns this the hard way.</p>

<p>Followers are rented. SoundCloud, Instagram and TikTok all decide who sees your posts, and none of them are optimising for your career. An email list is one of the few things in music you actually own, and it is worth starting one long before you feel you have enough people to justify it.</p>

<p>I was slow to do this and it cost me the entire audience from the track that did well. There is no way to go back and collect them.</p>

<h2 id="where-it-stops">Where the comparison stops</h2>

<p>I should be careful not to push this too far. Search is a solved-ish problem with measurable inputs. Music is not. You cannot optimise your way into someone caring about a record, and plenty of technically well-marketed music goes nowhere because the music is not good enough.</p>

<p>The tactics only decide whether the right people get the chance to hear it. Whether they stay is entirely down to the track.</p>

<p>But given how many good tracks never get heard at all, being findable is not a bad place to start.</p>
`.trim(),
    },
];

async function main() {
    const author =
        (await prisma.author.findFirst({ where: { name: AUTHOR.name } })) ??
        (await prisma.author.create({ data: AUTHOR }));
    console.log(`Author: ${author.name} (${author.id})`);

    for (const post of POSTS) {
        const existing = await prisma.blogPost.findUnique({ where: { slug: post.slug } });
        if (existing) {
            console.log(`  skip (already exists): ${post.slug}`);
            continue;
        }
        await prisma.blogPost.create({
            data: {
                ...post,
                published: false,
                blogAuthorId: author.id,
                creatorId: 'seed-script',
                authorName: AUTHOR.name,
                authorAvatar: AUTHOR.avatarUrl,
                authorRole: AUTHOR.role,
                authorBio: AUTHOR.bio,
            },
        });
        console.log(`  created draft: ${post.slug}`);
    }
}

main().finally(() => process.exit(0));
