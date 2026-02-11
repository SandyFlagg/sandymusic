import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden font-sans selection:bg-red-500 selection:text-white">

            {/* Background Noise/Grain */}
            <div className="absolute inset-0 opacity-[0.15] pointer-events-none z-0"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}>
            </div>

            {/* Red Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/20 blur-[120px] rounded-full pointer-events-none z-0"></div>

            <div className="relative z-10 text-center px-6">

                {/* Glitchy 404 */}
                <div className="relative inline-block mb-4">
                    <h1 className="text-[12rem] md:text-[18rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 select-none relative z-10">
                        404
                    </h1>
                    <h1 className="text-[12rem] md:text-[18rem] font-black leading-none tracking-tighter text-red-600 absolute top-0 left-1 opacity-50 -z-10 animate-pulse" style={{ animationDuration: '0.2s' }}>
                        404
                    </h1>
                    <h1 className="text-[12rem] md:text-[18rem] font-black leading-none tracking-tighter text-blue-600 absolute top-0 -left-1 opacity-50 -z-10 animate-pulse" style={{ animationDuration: '0.3s' }}>
                        404
                    </h1>
                </div>

                <div className="space-y-6">
                    <div className="flex flex-col items-center gap-2">
                        <div className="h-px w-24 bg-red-600 mb-4"></div>
                        <h2 className="text-2xl md:text-4xl font-black uppercase tracking-widest text-white">
                            Session Corrupted
                        </h2>
                        <p className="text-gray-400 text-lg md:text-xl font-medium font-mono max-w-md">
                            The track you're looking for has been deleted or moved to a different folder.
                        </p>
                    </div>

                    <div className="pt-8">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center h-16 px-10 bg-white text-black text-lg font-black uppercase tracking-widest rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 shadow-[0_0_30px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_-5px_rgba(220,38,38,0.6)] hover:-translate-y-1 active:scale-95"
                        >
                            Return to Studio
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer / Tech ID */}
            <div className="absolute bottom-12 text-center w-full">
                <p className="text-gray-700 font-mono text-xs uppercase tracking-[0.3em]">
                    Error Code: ID-10T / File Not Found
                </p>
            </div>

        </div>
    );
}
