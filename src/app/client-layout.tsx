"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import Script from "next/script";

const queryClient = new QueryClient();

export function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <QueryClientProvider client={queryClient}>
      <Script
        id="healcode-global-loader"
        src="https://widgets.mindbodyonline.com/javascripts/healcode.js"
        strategy="beforeInteractive"
        onLoad={() => {
          console.log('Healcode script loaded globally');
          // Wait a bit for the script to fully initialize
          setTimeout(() => {
            if (typeof window !== 'undefined' && window.HealcodeWidget) {
              // Dispatch a custom event to notify components
              window.dispatchEvent(new CustomEvent('healcodeGlobalReady'));
            }
          }, 100);
        }}
        onError={(e) => {
          console.error('Failed to load healcode script globally:', e);
        }}
      />
      <Navigation />
      <main className="flex-grow">{children}</main>
      <Footer />
      <Toaster />
    </QueryClientProvider>
  );
}

declare global {
  interface Window {
    HealcodeWidget: unknown;
  }
} 