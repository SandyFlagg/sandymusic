import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';

export default async function DashboardPage() {
    const user = await currentUser();

    if (!user) return null;

    // Mock Data for "My Downloads"
    const myDownloads = [
        {
            id: '1',
            name: 'Euro Daddy',
            type: 'Ableton Template',
            date: '2025-11-28',
            image: '/images/products/euro-daddy.png',
            downloadUrl: '#'
        },
        {
            id: '2',
            name: 'Serum Presets Vol. 1',
            type: 'Serum Presets',
            date: '2025-10-15',
            image: '/images/products/serum-vol1.png',
            downloadUrl: '#'
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-20">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-white/10 pb-8">
                    <div>
                        <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">
                            Dashboard
                        </h1>
                        <p className="text-gray-400">
                            Welcome back, <span className="text-white font-bold">{user.firstName}</span>.
                        </p>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <Link href="/shop" className="px-6 py-3 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-accent hover:text-white transition-colors">
                            Browse Shop
                        </Link>
                    </div>
                </div>

                {/* My Downloads */}
                <section className="mb-20">
                    <h2 className="text-2xl font-bold uppercase tracking-widest mb-8 flex items-center gap-3">
                        <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        My Downloads
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {myDownloads.map((item) => (
                            <div key={item.id} className="bg-[#111] border border-white/10 p-6 rounded-sm group hover:border-accent transition-colors">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 bg-black border border-white/10 flex items-center justify-center text-2xl">
                                        📁
                                    </div>
                                    <div>
                                        <h3 className="font-bold uppercase tracking-tight text-lg">{item.name}</h3>
                                        <p className="text-xs text-gray-500 uppercase tracking-widest">{item.type}</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center pt-6 border-t border-white/5">
                                    <span className="text-xs text-gray-600 font-mono">Purchased: {item.date}</span>
                                    <a href={item.downloadUrl} className="text-xs font-bold uppercase tracking-widest text-white hover:text-accent flex items-center gap-2">
                                        Download
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Account Settings */}
                <section>
                    <h2 className="text-2xl font-bold uppercase tracking-widest mb-8 flex items-center gap-3">
                        <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        Settings
                    </h2>
                    <div className="bg-[#111] border border-white/10 p-8 rounded-sm max-w-xl">
                        <p className="text-gray-400 mb-6">
                            Manage your email, password, and other account settings securely via Clerk.
                        </p>
                        {/* The UserProfile component is usually a modal, but we can link to the profile page or just use the UserButton which handles it */}
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-500 uppercase tracking-widest">Click your avatar in the top right to manage settings.</span>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
