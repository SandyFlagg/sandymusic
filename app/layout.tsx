import type { Metadata } from "next";
import { Geist, Geist_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sandy Music - Official Website",
  description: "Official website for Sandy Music. Discover music, upcoming shows, merchandise, and more.",
  metadataBase: new URL("https://www.sandymusic.com"),
  openGraph: {
    title: "Sandy Music - Official Website",
    description: "Official website for Sandy Music. Discover music, upcoming shows, merchandise, and more.",
    type: "website",
  },
};

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HideOnAdmin from "../components/HideOnAdmin";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

// ... existing imports ...
import JsonLd from "../components/JsonLd";
import { Person, WebSite, WithContext } from "schema-dts";

const personSchema: WithContext<Person> = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sandy Flagg",
  url: "https://www.sandymusic.com",
  jobTitle: "Music Producer & DJ",
  sameAs: [
    "https://www.youtube.com/@SANDY-xp6pt",
    "https://www.instagram.com/sandymusic___/",
    "https://www.tiktok.com/@sandymusic__",
    "https://linktr.ee/sandy.music",
    "https://soundcloud.com/sandyflagg"
  ]
};

const websiteSchema: WithContext<WebSite> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Sandy Music",
  url: "https://www.sandymusic.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${ibmPlexSans.variable} antialiased flex flex-col min-h-screen noise-bg`}
        >
          <JsonLd schema={personSchema} />
          <JsonLd schema={websiteSchema} />
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <HideOnAdmin>
            <Footer />
          </HideOnAdmin>
        </body>
      </html>
    </ClerkProvider>
  );
}
