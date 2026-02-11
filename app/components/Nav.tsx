'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/music', label: 'Music' },
  { href: '/shows', label: 'Shows' },
  { href: '/shop', label: 'Shop' },
  { href: '/contact', label: 'Contact' },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="mb-12">
      <div className="container mx-auto px-4">
        <ul className="flex justify-center gap-8 md:gap-12 flex-wrap">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block py-2 text-sm font-bold uppercase tracking-widest transition-all hover:text-accent ${pathname === item.href
                    ? 'text-foreground border-b-2 border-accent'
                    : 'text-muted hover:text-foreground'
                  }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

