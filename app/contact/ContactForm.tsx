'use client';

export default function ContactForm() {
    return (
        <form className="space-y-8" onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const formData = new FormData(form);
            const subject = encodeURIComponent(formData.get('subject') as string);
            const body = encodeURIComponent(`Name: ${formData.get('name')}\nEmail: ${formData.get('email')}\nSubject: ${formData.get('subject')}\nMessage: ${formData.get('message')}`);
            window.location.href = `mailto:sandy@sandymusic.com?subject=${subject}&body=${body}`;
        }}>
            <div className="group">
                <label htmlFor="name" className="block text-xs font-mono uppercase text-muted mb-2 group-focus-within:text-accent transition-colors">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-0 py-4 bg-transparent border-b border-muted text-foreground focus:border-accent focus:outline-none transition-colors rounded-none placeholder-muted/30"
                    placeholder="ENTER YOUR NAME"
                />
            </div>
            <div className="group">
                <label htmlFor="email" className="block text-xs font-mono uppercase text-muted mb-2 group-focus-within:text-accent transition-colors">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-0 py-4 bg-transparent border-b border-muted text-foreground focus:border-accent focus:outline-none transition-colors rounded-none placeholder-muted/30"
                    placeholder="ENTER YOUR EMAIL"
                />
            </div>
            <div className="group">
                <label htmlFor="subject" className="block text-xs font-mono uppercase text-muted mb-2 group-focus-within:text-accent transition-colors">
                    Subject
                </label>
                <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-0 py-4 bg-transparent border-b border-muted text-foreground focus:border-accent focus:outline-none transition-colors rounded-none placeholder-muted/30"
                    placeholder="WHAT IS THIS REGARDING?"
                />
            </div>
            <div className="group">
                <label htmlFor="message" className="block text-xs font-mono uppercase text-muted mb-2 group-focus-within:text-accent transition-colors">
                    Message
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full px-0 py-4 bg-transparent border-b border-muted text-foreground focus:border-accent focus:outline-none transition-colors rounded-none placeholder-muted/30 resize-none"
                    placeholder="YOUR MESSAGE HERE..."
                />
            </div>
            <button
                type="submit"
                className="px-8 py-4 bg-foreground text-background font-bold uppercase tracking-wider hover:bg-accent hover:text-foreground transition-colors w-full md:w-auto"
            >
                Send Transmission
            </button>
        </form>
    );
}
