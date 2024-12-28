import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LoadingAnimation from "./shared/LoadingAnimation"; // Assuming path is correct
import Footer from "app/layouts/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Crypto Tracker - Track Your Crypto Profits",
  description: "Track your cryptocurrency profits and holdings with ease. Stay updated on your crypto portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen h-full bg-gray-900 antialiased`}
      >
        {/* Wrap the layout with the LoadingAnimation component */}
        <LoadingAnimation>
          {children}
          <Footer />
        </LoadingAnimation>
      </body>
    </html>
  );
}
