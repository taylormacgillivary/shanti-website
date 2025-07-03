import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { RootLayoutClient } from "./client-layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shanti Hot Yoga | Halifax, Bedford & Dartmouth",
  description: "Transform your practice at Shanti Hot Yoga. Access all three locations in Halifax, Bedford, and Dartmouth with one membership. Join our community today.",
  keywords: "hot yoga, Halifax, Bedford, Dartmouth, Nova Scotia, yoga studio, yoga classes",
  authors: [{ name: "Shanti Hot Yoga" }],
  openGraph: {
    title: "Shanti Hot Yoga | Halifax, Bedford & Dartmouth",
    description: "Transform your practice at Shanti Hot Yoga. Access all three locations in Halifax, Bedford, and Dartmouth with one membership.",
    type: "website",
    locale: "en_CA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
        suppressHydrationWarning={true}
      >
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
