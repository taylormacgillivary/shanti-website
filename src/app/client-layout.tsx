"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
// Removed Script import as it's no longer needed

const queryClient = new QueryClient();

export function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <QueryClientProvider client={queryClient}>
      {/* Remove global script loading - handle per component */}
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