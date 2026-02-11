import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Music - Sandy Music',
  description: 'Browse and listen to music by Sandy Music. Discover albums, singles, and exclusive releases.',
  openGraph: {
    title: 'Music - Sandy Music',
    description: 'Browse and listen to music by Sandy Music. Discover albums, singles, and exclusive releases.',
  },
};

export default function Music() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="mb-24">
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-12 text-center">Music</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="group">
            <div className="aspect-square bg-muted/20 border border-muted/30 mb-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <h2 className="text-4xl font-bold uppercase mb-2">Latest Release</h2>
            <p className="font-mono text-muted mb-4">OUT NOW // 2023</p>
            <div className="flex gap-4">
              <button className="px-6 py-2 border border-foreground hover:bg-foreground hover:text-background uppercase font-bold text-sm transition-colors">Spotify</button>
              <button className="px-6 py-2 border border-foreground hover:bg-foreground hover:text-background uppercase font-bold text-sm transition-colors">Apple Music</button>
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-2xl font-bold uppercase border-b border-muted/30 pb-4">Top Tracks</h3>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-muted/10 p-2 transition-colors">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-muted">0{i}</span>
                  <span className="font-bold uppercase">Track Title {i}</span>
                </div>
                <span className="font-mono text-sm text-muted">3:45</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-4xl font-black uppercase mb-12 text-center">Discography</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-square bg-muted/10 border border-muted/20 mb-4 transition-colors group-hover:border-accent"></div>
              <h3 className="font-bold uppercase text-sm">Album Title {i}</h3>
              <p className="font-mono text-xs text-muted">202{i}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

