import Link from 'next/link';

export default function Header() {
  return (
    <header className="pt-8 pb-4">
      <div className="container mx-auto px-4 text-center">
        <Link href="/" className="text-4xl font-black uppercase tracking-tighter hover:text-accent transition-colors">
          Sandy Music
        </Link>
      </div>
    </header>
  );
}

