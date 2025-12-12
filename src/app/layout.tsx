import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "Sakura Sushi - Authentic Japanese Cuisine",
    template: "%s | Sakura Sushi",
  },
  description:
    "Experience authentic Japanese sushi and cuisine. Fresh ingredients, traditional recipes, delivered to your door.",
  keywords: [
    "sushi",
    "japanese cuisine",
    "restaurant",
    "asian food",
    "delivery",
  ],
  authors: [{ name: "Sakura Sushi" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["bg_BG"],
    siteName: "Sakura Sushi",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
