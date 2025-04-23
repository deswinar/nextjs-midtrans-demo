// src/app/layout.js

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "My Demo Shop",
  description: "A simple Next.js demo with checkout",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased bg-gray-100 text-gray-900">
        <header className="bg-blue-600 text-white">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">
              <Link href="/" className="hover:underline">My Demo Shop</Link>
            </h1>
            <nav className="space-x-4">
              <Link href="/" className="hover:underline">Home</Link>
              <Link href="/orders" className="hover:underline">Orders</Link>
            </nav>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 min-h-screen">
          {children}
        </main>

        <footer className="bg-blue-50 text-center text-sm text-gray-600 py-6">
          © {new Date().getFullYear()} My Demo Shop. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
