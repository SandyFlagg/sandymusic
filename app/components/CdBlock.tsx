import React from 'react';
import Image from 'next/image';

export default function CdBlock() {
    return (
        <div className="relative group perspective-1000 w-[300px] h-[300px]">
            {/* The CD (Spinning & Poking Out) */}
            <div className="absolute top-2 right-2 bottom-2 w-[95%] h-[95%] rounded-full animate-spin-slow transition-all duration-700 group-hover:translate-x-1/2 z-0">
                <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl">
                    <Image
                        src="/images/cd.jpg"
                        alt="Spinning CD"
                        fill
                        className="object-cover"
                    />
                    {/* Center Hole */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-black rounded-full border border-white/20"></div>
                </div>
            </div>

            {/* The Sleeve (Block) */}
            <div className="absolute inset-0 bg-black border border-white/10 rounded-lg shadow-2xl z-10 flex flex-col items-center justify-center p-6 text-center backdrop-blur-sm bg-black/90 transition-transform duration-500 group-hover:-translate-x-4">
                <div className="w-full h-full border border-white/5 rounded flex flex-col items-center justify-center relative overflow-hidden">
                    {/* Sleeve Art / Text */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-90"></div>
                    <div className="relative z-10">
                        <h3 className="text-4xl font-black uppercase tracking-tighter text-white mb-2 mix-blend-difference">
                            Sandy<br />Music
                        </h3>
                        <p className="text-accent text-xs font-bold uppercase tracking-widest">
                            Vol. 01
                        </p>
                    </div>

                    {/* Texture overlay */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay"></div>
                </div>
            </div>
        </div>
    );
}
