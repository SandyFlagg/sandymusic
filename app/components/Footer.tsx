import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/10 pt-20 pb-10 text-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">

          {/* Brand Column - 4 cols */}
          <div className="md:col-span-4">
            <Link href="/" className="text-2xl font-black tracking-tighter mb-6 block">SANDY</Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs mb-8">
              Producer and DJ from Sydney, Australia. Sharing music, tips, templates, and the journey.
            </p>
            {/* Social Icons - Small */}
            <div className="flex gap-4">
              <a href="https://open.spotify.com/artist/sandyflagg" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#1DB954] transition-colors" aria-label="Spotify">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" /></svg>
              </a>
              <a href="https://soundcloud.com/sandyflagg" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#ff5500] transition-colors" aria-label="SoundCloud">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.56 8.87V17h8.76c1.48 0 2.68-1.2 2.68-2.68 0-1.48-1.2-2.68-2.68-2.68-.2 0-.4.02-.59.07-.42-1.73-1.97-3.01-3.82-3.01-.63 0-1.23.15-1.76.41-.34-1.84-1.94-3.23-3.86-3.23-2.17 0-3.93 1.76-3.93 3.93v1.16c-.2-.03-.4-.05-.61-.05-2.07 0-3.75 1.68-3.75 3.75S3.68 18.42 5.75 18.42h5.81V8.87z" /></svg>
              </a>
              <a href="https://youtube.com/@sandyflagg" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#FF0000] transition-colors" aria-label="YouTube">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </a>
              <a href="https://instagram.com/sandyflagg" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#E1306C] transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              </a>
              <a href="https://tiktok.com/@sandyflagg" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#00f2ea] transition-colors" aria-label="TikTok">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v6.16c0 2.52-1.12 4.84-2.9 6.35-1.78 1.51-4.15 2.07-6.47 1.63-2.32-.44-4.3-2.04-5.17-4.18-.87-2.14-.37-4.65 1.25-6.31 1.62-1.66 4.06-2.19 6.23-1.42l.25.09v4.2c-.83-.37-1.76-.43-2.64-.18-.87.25-1.61.86-2.06 1.66-.45.8-.47 1.76-.06 2.59.41.83 1.17 1.43 2.07 1.63.9.2 1.84-.04 2.56-.63.72-.59 1.14-1.48 1.14-2.43v-12.6c0-1.58 0-3.16 0-4.74z" /></svg>
              </a>
            </div>
          </div>

          <div className="md:col-span-1"></div>

          {/* Explore Column */}
          <div className="md:col-span-3">
            <h4 className="font-bold uppercase tracking-widest text-xs text-gray-500 mb-6">Explore</h4>
            <ul className="space-y-4 text-sm font-medium text-gray-300">
              <li><Link href="/#music" className="hover:text-accent transition-colors">Music</Link></li>
              <li><Link href="/#producer" className="hover:text-accent transition-colors">Producer Resources</Link></li>

              <li><Link href="/blog" className="hover:text-accent transition-colors">Blog</Link></li>
              <li><Link href="/#contact" className="hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="md:col-span-2">
            <h4 className="font-bold uppercase tracking-widest text-xs text-gray-500 mb-6">Legal</h4>
            <ul className="space-y-4 text-sm font-medium text-gray-300">
              <li><Link href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 font-medium uppercase tracking-wide">
          <div className="flex items-center gap-4">
            <span>&copy; {currentYear} Sandy Music</span>
            <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
            <span>All rights reserved</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Sydney, Australia</span>
            <span className="grayscale opacity-50">🇦🇺</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
