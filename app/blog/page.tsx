import BlogClient from './BlogClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog - Sandy Music',
    description: 'Expand your music industry knowledge with detailed tutorials and case studies.',
    alternates: {
        canonical: '/blog',
    },
};

export default function BlogPage() {
    return <BlogClient />;
}
