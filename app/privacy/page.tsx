import Link from 'next/link';

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-accent selection:text-white pt-32 pb-20">
            <div className="container mx-auto px-4 max-w-3xl">
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12 text-center">
                    Privacy Policy
                </h1>

                <div className="space-y-12 text-gray-400 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-bold uppercase tracking-widest text-white mb-4">1. Introduction</h2>
                        <p>
                            Welcome to Sandy Music. We respect your privacy and are committed to protecting your personal data.
                            This privacy policy will inform you as to how we look after your personal data when you visit our website
                            and tell you about your privacy rights and how the law protects you.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold uppercase tracking-widest text-white mb-4">2. Data We Collect</h2>
                        <p className="mb-4">
                            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong className="text-white">Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                            <li><strong className="text-white">Contact Data:</strong> includes email address and telephone number.</li>
                            <li><strong className="text-white">Transaction Data:</strong> includes details about payments to and from you and other details of products you have purchased from us.</li>
                            <li><strong className="text-white">Technical Data:</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform on the devices you use to access this website.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold uppercase tracking-widest text-white mb-4">3. How We Use Your Data</h2>
                        <p>
                            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li>To process and deliver your order including: Manage payments, fees and charges.</li>
                            <li>To manage our relationship with you which will include: Notifying you about changes to our terms or privacy policy.</li>
                            <li>To enable you to partake in a prize draw, competition or complete a survey.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold uppercase tracking-widest text-white mb-4">4. Data Security</h2>
                        <p>
                            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold uppercase tracking-widest text-white mb-4">5. Contact Us</h2>
                        <p>
                            If you have any questions about this privacy policy or our privacy practices, please contact us at: <a href="mailto:sandy@sandymusic.com" className="text-accent hover:underline">sandy@sandymusic.com</a>.
                        </p>
                    </section>
                </div>

                <div className="mt-20 pt-12 border-t border-white/10 text-center">
                    <Link href="/" className="text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
