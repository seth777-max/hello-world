import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lemonaed Atelier",
  description: "Curated essentials inspired by Lemonaed — elevated for the modern wardrobe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0b0b0b] text-[#f1f1f1]`}
      >
        <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/20 border-b border-white/10">
          <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
            <Link href="/" className="tracking-[0.25em] text-sm font-medium">LEMONAED ATELIER</Link>
            <nav className="flex items-center gap-6 text-sm">
              <Link href="/collection" className="hover:opacity-80">Collection</Link>
              <Link href="/about" className="hover:opacity-80">About</Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-6 py-12 min-h-[70vh]">{children}</main>
        <footer className="border-t border-white/10">
          <div className="mx-auto max-w-7xl px-6 py-10 text-xs text-white/60 flex items-center justify-between">
            <p>© {new Date().getFullYear()} Lemonaed Atelier</p>
            <p>INR</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
