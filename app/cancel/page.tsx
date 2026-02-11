import Link from 'next/link';

export default function CancelPage() {
    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
            <div className="text-center max-w-lg">
                <div className="text-6xl mb-6">❌</div>
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 text-red-500">
                    Order Cancelled
                </h1>
                <p className="text-xl text-gray-400 mb-12 leading-relaxed">
                    No worries. Your cart is still saved if you want to try again later.
                </p>
                <Link href="/shop" className="px-8 py-4 bg-white text-black font-black uppercase tracking-widest hover:bg-accent hover:text-white transition-colors">
                    Return to Shop
                </Link>
            </div>
        </div>
    );
}
