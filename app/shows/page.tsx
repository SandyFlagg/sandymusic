import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shows - Sandy Music',
  description: 'Upcoming shows and tour dates for Sandy Music. Find tickets and venue information for live performances.',
  openGraph: {
    title: 'Shows - Sandy Music',
    description: 'Upcoming shows and tour dates for Sandy Music. Find tickets and venue information for live performances.',
  },
};

export default function Shows() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-16 text-center">Shows</h1>

      <div className="max-w-4xl mx-auto space-y-px bg-muted/30 border border-muted/30">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-background p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:bg-muted/5 transition-colors">
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 flex-1">
              <div className="font-mono text-accent text-lg">2023.11.2{i}</div>
              <div>
                <h3 className="text-2xl font-bold uppercase leading-none mb-1 group-hover:text-accent transition-colors">Club Underground</h3>
                <p className="text-muted uppercase text-sm tracking-wider">Berlin, Germany</p>
              </div>
            </div>
            <a href="#" className="px-8 py-3 bg-foreground text-background font-bold uppercase text-sm tracking-widest hover:bg-accent hover:text-foreground transition-colors text-center">
              Tickets
            </a>
          </div>
        ))}
      </div>

      <div className="text-center mt-16">
        <p className="font-mono text-muted uppercase tracking-widest text-sm">
          More dates TBA
        </p>
      </div>
    </div>
  );
}

