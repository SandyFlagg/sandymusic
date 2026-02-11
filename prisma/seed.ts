import prisma from '../lib/prisma';
import dotenv from 'dotenv';

dotenv.config();


async function main() {
    console.log('Starting seed...');

    // Seed Products
    const products = [
        {
            slug: 'euro-daddy',
            name: 'EURO DADDY',
            category: 'ableton-templates',
            genre: 'trance',
            price: 30.00,
            artistStyle: 'Inspired by Marlon Hoffstadt',
            specs: {
                daw: 'Ableton 11 Suite',
                plugins: ['Serum'],
                bpm: 140,
                key: 'F# Minor'
            },
            badges: ['Serum Required', 'Ableton 11.1+'],
            image: '/assets/shop/ableton-folder-logo.png',
            backgroundTexture: '/assets/shop/abstract-texture-1.jpg',
            rating: 4.9,
            reviews: 128,
            sales: 1500
        },
        {
            slug: 'techno-rumble-guide',
            name: 'Techno Rumble Guide',
            category: 'ableton-templates',
            genre: 'techno',
            price: 15.00,
            artistStyle: 'Rumble Kick Framework',
            specs: {
                daw: 'Ableton 11',
                plugins: ['Stock Only'],
                bpm: 135,
                key: 'C Minor'
            },
            badges: ['Stock Only', 'PDF + Project'],
            image: '/assets/shop/ableton-folder-logo.png',
            backgroundTexture: '/assets/shop/abstract-texture-1.jpg',
            rating: 4.9,
            reviews: 128,
            sales: 850
        },
        {
            slug: 'crystal-usb-stick',
            name: 'Crystal USB Stick',
            category: 'trinkets',
            price: 30.00,
            image: '/assets/shop/ableton-folder-logo.png',
            soldOut: false,
            rating: 4.9,
            reviews: 56,
            sales: 300
        },
        {
            slug: 'tech-house-starter',
            name: 'Tech House Starter Template',
            category: 'ableton-templates',
            genre: 'tech-house',
            price: 25.00,
            artistStyle: 'Fisher / Chris Lake Style',
            specs: { daw: 'Ableton 11', bpm: 126, key: 'A Minor' },
            badges: ['Best Seller', 'Stock Plugins'],
            image: '/assets/shop/ableton-folder-logo.png',
            rating: 5.0,
            reviews: 42,
            sales: 2100
        },
        {
            slug: 'melodic-trance-template',
            name: 'Melodic Trance Template',
            category: 'ableton-templates',
            genre: 'trance',
            price: 25.00,
            artistStyle: 'Anjunabeats Style',
            specs: { daw: 'Ableton 11', bpm: 138, key: 'G Major' },
            badges: ['Serum Required'],
            image: '/assets/shop/ableton-folder-logo.png',
            rating: 4.8,
            reviews: 31,
            sales: 600
        },
        {
            slug: 'peak-time-breaks',
            name: 'Peak-Time Breaks Template',
            category: 'ableton-templates',
            genre: 'breaks',
            price: 25.00,
            artistStyle: 'Bicep Style',
            specs: { daw: 'Ableton 11', bpm: 130, key: 'E Minor' },
            badges: ['Advanced'],
            image: '/assets/shop/ableton-folder-logo.png',
            rating: 4.9,
            reviews: 28,
            sales: 120
        },
        {
            slug: 'club-bass-toolkit',
            name: 'Club Bass Toolkit',
            category: 'serum-presets',
            genre: 'house',
            price: 20.00,
            specs: { plugins: ['Serum'] },
            badges: ['50 Presets'],
            image: '/assets/shop/ableton-folder-logo.png',
            rating: 4.7,
            reviews: 89,
            sales: 3200
        },
        {
            slug: 'fx-risers-mini',
            name: 'FX + Risers Mini Pack',
            category: 'ableton-templates',
            genre: 'tools',
            price: 10.00,
            specs: { daw: 'Any' },
            badges: ['WAV Samples'],
            image: '/assets/shop/ableton-folder-logo.png',
            rating: 4.6,
            reviews: 112,
            sales: 5000
        }
    ];

    for (const product of products) {
        await prisma.product.upsert({
            where: { slug: product.slug },
            update: product,
            create: product,
        });
    }

    console.log(`✓ Seeded ${products.length} products`);

    // Seed Blog Posts
    const blogPost = {
        slug: 'how-to-upload-to-soundcloud',
        title: 'How to Upload Your First Track to SoundCloud',
        excerpt: 'Ready to share your music with the world? Here is a step-by-step guide to uploading your first track to SoundCloud and getting it heard.',
        content: `
      <p class="lead text-xl text-gray-300 leading-relaxed mb-8 font-medium">
        SoundCloud remains one of the most vital platforms for independent artists in 2025. It's where communities are built, genres are born, and careers are launched. But getting your first upload right is crucial.
      </p>

      <h2 id="preparation" class="text-3xl font-black uppercase tracking-tighter mt-12 mb-6 text-white scroll-mt-32">1. Preparation is Key</h2>
      <p class="text-gray-400 leading-relaxed mb-6">
        Before you even log in, ensure your track is ready for the world. A common mistake is rushing the upload process with an unfinished mix or poor artwork.
      </p>

      <ul class="space-y-4 my-8">
        <li class="flex gap-4 items-start">
            <span class="text-accent font-bold">01.</span>
            <span class="text-gray-300"><strong>Audio Format:</strong> Always upload lossless files like WAV, FLAC, or AIFF. SoundCloud will transcode it for streaming, so start with the highest quality source.</span>
        </li>
        <li class="flex gap-4 items-start">
            <span class="text-accent font-bold">02.</span>
            <span class="text-gray-300"><strong>Artwork:</strong> Use a high-resolution square image (at least 3000x3000px). This is the first thing listeners see.</span>
        </li>
        <li class="flex gap-4 items-start">
            <span class="text-accent font-bold">03.</span>
            <span class="text-gray-300"><strong>Metadata:</strong> Have your track title, genre, and description ready. Use relevant tags to help people find your music.</span>
        </li>
      </ul>

      <blockquote class="border-l-4 border-accent pl-6 py-2 my-8 italic text-xl text-white bg-white/5 rounded-r-lg">
        "Your first upload is your introduction to the world. Make it count." – Sandy Flagg
      </blockquote>

      <h2 id="uploading" class="text-3xl font-black uppercase tracking-tighter mt-12 mb-6 text-white scroll-mt-32">2. The Upload Process</h2>
      <p class="text-gray-400 leading-relaxed mb-6">
        Once you're logged in, hit the "Upload" button. Drag and drop your file. While it processes, fill out the details meticulously.
      </p>

      <div class="bg-[#111] border border-white/10 rounded-lg p-6 my-8 font-mono text-sm text-gray-400">
        <div class="flex justify-between text-xs uppercase tracking-widest text-gray-500 mb-4 border-b border-white/10 pb-2">
            <span>Pro Tip: Tagging Strategy</span>
        </div>
        <div class="grid grid-cols-1 gap-4">
            <div>
                <span class="text-accent">Genre:</span> Be specific (e.g., "Hard Techno" instead of just "Electronic")
            </div>
            <div>
                <span class="text-accent">Moods:</span> Add tags like #Dark, #Industrial, #PeakTime
            </div>
        </div>
      </div>

      <h2 id="promotion" class="text-3xl font-black uppercase tracking-tighter mt-12 mb-6 text-white scroll-mt-32">3. Initial Promotion</h2>
      <p class="text-gray-400 leading-relaxed mb-6">
        Don't just upload and walk away. Share the private link with friends for feedback first. Once public, share it on your socials, submit to repost channels, and engage with comments.
      </p>
    `,
        creatorId: 'seed_admin',
        authorName: 'Sandy Flagg',
        authorAvatar: '/images/sandy-author.jpg',
        authorRole: 'Admin',
        authorBio: 'Music producer and DJ sharing knowledge with the community.',
        category: 'Production',
        tags: ['SoundCloud', 'Distribution', 'Music Production'],
        imageUrl: 'https://picsum.photos/seed/soundcloud/800/400',
        readTime: '5 min read',
        published: true
    };

    await prisma.blogPost.upsert({
        where: { slug: blogPost.slug },
        update: blogPost,
        create: blogPost,
    });

    console.log('✓ Seeded 1 blog post');

    console.log('Seed completed!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
