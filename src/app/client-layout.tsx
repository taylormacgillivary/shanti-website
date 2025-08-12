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
        src="https://widgets.mindbodyonline.com/javascripts/healcode.js"
        type="text/javascript"
        strategy="beforeInteractive"
        onLoad={() => {
          console.log('Healcode script loaded globally');
          // Dispatch custom event to notify components
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('healcodeReady'));
          }
        }}
        onError={(e) => {
          console.error('Error loading global healcode script:', e);
          // Dispatch error event
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('healcodeError'));
          }
        }}
      />
      <Navigation />
      <main className="flex-grow">{children}</main>
      <Footer />
      <Toaster />
    </QueryClientProvider>
  );
} 