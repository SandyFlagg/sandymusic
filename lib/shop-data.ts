
export type Category = 'ableton-templates' | 'serum-presets' | 'trinkets';

export interface Product {
    id: string;
    slug: string;
    name: string;
    category: Category | string;
    genre?: string;
    price: number;
    image: string;
    images?: string[];
    previewAudio?: string; // URL to preview audio file
    backgroundTexture?: string;
    rating?: number;
    reviewCount?: number;
    features?: string[];
    specs?: {
        daw?: string;
        plugins?: string;
        bpm?: number;
        key?: string;
    };
    badges?: string[];
    description?: string;
    artistStyle?: string;
    createdAt: string;
}

export const MOCK_PRODUCTS: Product[] = [
    {
        id: '1',
        slug: 'melodic-techno-template',
        name: 'Melodic Techno Template',
        category: 'ableton-templates',
        genre: 'Techno',
        price: 49.99,
        image: '/assets/shop/ableton-folder-logo.png',
        images: [
            '/assets/shop/ableton-folder-logo.png',
            '/images/products/techno-2.jpg',
            '/images/products/techno-3.jpg'
        ],
        previewAudio: '/audio/previews/techno-template.mp3',
        backgroundTexture: '/images/textures/techno-bg.jpg',
        rating: 4.8,
        reviewCount: 124,
        features: [
            'Full Logic Pro project file tailored for melodic techno production.',
            'Includes 20+ custom Serum presets designed for deep bass and leads.',
            'Mixed and mastered ready for club playback.',
            'Requires Ableton Live 11 Suite or higher.'
        ],
        specs: { daw: 'Ableton Live 11', plugins: 'Serum, Diva', bpm: 124, key: 'G minor' },
        badges: ['Best Seller'],
        description: 'A full production template for modern melodic techno, inspired by the sounds of Afterlife and Anjunadeep. Dive into the project file to see exactly how professionals layer synths and process drums.',
        createdAt: new Date().toISOString(),
    },
    {
        id: '2',
        slug: 'house-essentials',
        name: 'House Essentials Vol. 1',
        category: 'ableton-templates',
        genre: 'House',
        price: 39.99,
        image: '/assets/shop/ableton-folder-logo.png',
        images: ['/assets/shop/ableton-folder-logo.png'],
        previewAudio: '/audio/previews/house-template.mp3',
        rating: 4.5,
        reviewCount: 89,
        features: [
            'Classic House groove templates.',
            'Stock plugins only - no third party software needed.',
            'Includes 50+ drum samples.'
        ],
        specs: { daw: 'Ableton Live 11', plugins: 'Stock Only', bpm: 126, key: 'A minor' },
        badges: [],
        description: 'A groovy house template using only stock plugins. Perfect for beginners learning arrangement and mixing.',
        createdAt: new Date().toISOString(),
    },
    {
        id: '3',
        slug: 'serum-bass-master',
        name: 'Serum Bass Master',
        category: 'serum-presets',
        genre: 'Dubstep',
        price: 29.99,
        image: '/serum-logo.jpg',
        images: ['/serum-logo.jpg'],
        previewAudio: '/audio/previews/serum-bass.mp3',
        rating: 5.0,
        reviewCount: 42,
        features: [
            '100 Heavy Bass Presets for Serum.',
            'Includes 50 Wavetables.',
            'Macros pre-assigned for maximum playability.'
        ],
        specs: { daw: 'Any', plugins: 'Serum', bpm: 140, key: 'F minor' },
        badges: ['New', 'Serum Required'],
        description: '100 heavy bass presets for Serum, designed for Dubstep, Trap, and Bass Music.',
        createdAt: new Date().toISOString(),
    },
    {
        id: '4',
        slug: 'usb-stick',
        name: 'Sandy Music USB',
        category: 'trinkets',
        genre: 'Merch',
        price: 15.00,
        image: '/images/products/usbbox.jpg',
        specs: {},
        badges: ['Limited Edition'],
        description: 'Custom branded USB stick with exclusive sets.',
        createdAt: new Date().toISOString(),
    },
    {
        id: '5',
        slug: 'deep-house-stems',
        name: 'Deep House Stems',
        category: 'ableton-templates',
        genre: 'House',
        price: 24.99,
        image: '/assets/shop/ableton-folder-logo.png',
        images: ['/assets/shop/ableton-folder-logo.png'],
        previewAudio: '/audio/previews/house-template.mp3',
        rating: 4.7,
        reviewCount: 56,
        features: [
            'Full stems for remixing.',
            'High quality WAV files.',
            'Royalty free.'
        ],
        specs: { daw: 'Any', bpm: 122, key: 'C minor' },
        badges: [],
        description: 'Stem pack from my latest deep house release. Perfect for remixes or learning arrangement.',
        createdAt: new Date().toISOString(),
    },
    {
        id: '6',
        slug: 'mastering-chain',
        name: 'My Mastering Chain',
        category: 'ableton-templates',
        genre: 'Utility',
        price: 19.99,
        image: '/assets/shop/ableton-folder-logo.png',
        images: ['/assets/shop/ableton-folder-logo.png'],
        previewAudio: '',
        rating: 4.9,
        reviewCount: 203,
        features: [
            'The exact chain I use on every track.',
            'Stock and 3rd party versions included.',
            'Loud and punchy results.'
        ],
        specs: { daw: 'Ableton Live 11', plugins: 'FabFilter (Optional)' },
        badges: ['Popular'],
        description: 'The final polish for your tracks. My personal mastering chain rack for Ableton Live.',
        createdAt: new Date().toISOString(),
    }
];

export const products = MOCK_PRODUCTS;

export const categoryContent: Record<Category, {
    title: string;
    intro: string;
    faqs: { q: string; a: string }[];
    guide: { title: string; steps: { title: string; desc: string }[] };
}> = {
    'ableton-templates': {
        title: 'Ableton Templates',
        intro: 'Professional project files to help you finish tracks faster. Deconstruct, learn, and release.',
        faqs: [
            { q: "Do I need 3rd party plugins?", a: "Check the badges on each product. Some require Serum or other common plugins, while others are Stock Only." },
            { q: "What version of Ableton do I need?", a: "Most templates are built in Ableton Live 11.1 or newer. Check the specs on the card." },
            { q: "Are these royalty free?", a: "Yes. You can use the sounds and ideas in your own releases. Just don't resell the template itself." }
        ],
        guide: {
            title: "How to use these templates",
            steps: [
                { title: "Download & Unzip", desc: "Get your files instantly after checkout. No waiting." },
                { title: "Open the Project", desc: "Everything is frozen or stock, so it just works." },
                { title: "Make it Yours", desc: "Save as a new version, tear it apart, and destroy it." }
            ]
        }
    },
    'serum-presets': {
        title: 'Serum Presets',
        intro: 'High-quality presets for modern electronic music. Basses, leads, and fx that cut through.',
        faqs: [
            { q: "Do these work with Vital?", a: "No, these are specifically for Xfer Serum." },
            { q: "How do I install them?", a: "Drag the folder into your Serum Presets directory. A guide is included in the download." }
        ],
        guide: {
            title: "Getting started with presets",
            steps: [
                { title: "Download", desc: "Instant access to your new sounds." },
                { title: "Install", desc: "Drag the folder into your Serum Presets directory." },
                { title: "Play", desc: "All presets have macros assigned for instant expression." }
            ]
        }
    },
    'trinkets': {
        title: 'Curated Gear',
        intro: 'The tools and accessories I actually use in the studio. No generic merch.',
        faqs: [
            { q: "How long is shipping?", a: "Usually 3-5 business days for domestic orders." },
            { q: "What is the return policy?", a: "If it's broken, I'll replace it. Otherwise, all sales are final." }
        ],
        guide: {
            title: "Ordering Process",
            steps: [
                { title: "Order", desc: "Secure checkout via Stripe or PayPal." },
                { title: "Shipping", desc: "We ship worldwide with tracked delivery." },
                { title: "Enjoy", desc: "Tag me on IG @sandyflagg when it arrives." }
            ]
        }
    }
};
