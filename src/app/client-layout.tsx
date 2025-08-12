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
          
          // Add global error handler for healcode errors
          if (typeof window !== 'undefined') {
            const originalConsoleError = console.error;
            console.error = function(...args) {
              // Check if this is a healcode-related error
              const errorMessage = args.join(' ');
              if (errorMessage.includes('healcode') || errorMessage.includes('mindbody')) {
                console.warn('Healcode widget error intercepted:', ...args);
                // Dispatch error event but don't crash the app
                window.dispatchEvent(new CustomEvent('healcodeError', { detail: args }));
                return;
              }
              // For all other errors, use original console.error
              originalConsoleError.apply(console, args);
            };
            
            // Set up global error handler for unhandled healcode errors
            window.addEventListener('error', (event) => {
              if (event.filename && event.filename.includes('healcode')) {
                event.preventDefault(); // Prevent the error from crashing the app
                console.warn('Healcode script error prevented:', event.error);
                window.dispatchEvent(new CustomEvent('healcodeError', { detail: event.error }));
              }
            });
            
            // Dispatch ready event
            window.dispatchEvent(new CustomEvent('healcodeReady'));
          }
        }}
        onError={(e) => {
          console.error('Error loading global healcode script:', e);
          // Dispatch error event
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('healcodeError', { detail: e }));
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