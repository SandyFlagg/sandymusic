import type { Metadata } from 'next';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact - Sandy Music',
  description: 'Get in touch with Sandy Music. For booking, press inquiries, or general questions, reach out through our contact form.',
  openGraph: {
    title: 'Contact - Sandy Music',
    description: 'Get in touch with Sandy Music. For booking, press inquiries, or general questions, reach out through our contact form.',
  },
};

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-16 text-center">Contact</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <section>
          <h2 className="text-2xl font-bold uppercase mb-8 border-b border-muted/30 pb-4">Send a Message</h2>
          <ContactForm />
        </section>

        <section className="lg:pl-12 lg:border-l border-muted/20">
          <h2 className="text-2xl font-bold uppercase mb-8 border-b border-muted/30 pb-4">Direct Lines</h2>
          <div className="space-y-12">
            <div>
              <h3 className="text-sm font-mono uppercase text-muted mb-2">Booking</h3>
              <p className="text-xl font-bold uppercase hover:text-accent transition-colors cursor-pointer">booking@sandymusic.com</p>
            </div>
            <div>
              <h3 className="text-sm font-mono uppercase text-muted mb-2">Press</h3>
              <p className="text-xl font-bold uppercase hover:text-accent transition-colors cursor-pointer">press@sandymusic.com</p>
            </div>
            <div>
              <h3 className="text-sm font-mono uppercase text-muted mb-2">General</h3>
              <p className="text-xl font-bold uppercase hover:text-accent transition-colors cursor-pointer">info@sandymusic.com</p>
            </div>
            <div>
              <h3 className="text-sm font-mono uppercase text-muted mb-4">Social</h3>
              <div className="flex gap-4">
                {['Instagram', 'Twitter', 'SoundCloud'].map((social) => (
                  <a key={social} href="#" className="text-lg font-bold uppercase border border-muted px-4 py-2 hover:border-accent hover:text-accent transition-colors">
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

