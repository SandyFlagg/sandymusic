import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-black py-20">
            <SignIn appearance={{
                elements: {
                    formButtonPrimary: 'bg-accent hover:bg-accent/80 text-white',
                    footerActionLink: 'text-accent hover:text-accent/80',
                    card: 'bg-[#111] border border-white/10',
                    headerTitle: 'text-white',
                    headerSubtitle: 'text-gray-400',
                    socialButtonsBlockButton: 'bg-white/5 border-white/10 text-white hover:bg-white/10',
                    socialButtonsBlockButtonText: 'text-white',
                    formFieldLabel: 'text-gray-300',
                    formFieldInput: 'bg-black border-white/10 text-white',
                    identityPreviewText: 'text-gray-300',
                    identityPreviewEditButton: 'text-accent',
                }
            }} />
        </div>
    );
}
