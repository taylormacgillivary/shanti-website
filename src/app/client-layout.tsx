"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const queryClient = new QueryClient();

export function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <QueryClientProvider client={queryClient}>
      <div className="sticky top-0 z-[100] w-full">
        <Navigation />
      </div>
      <main className="flex-grow">{children}</main>
      <Footer />
      <Toaster position="top-center" richColors />
    </QueryClientProvider>
  );
}

 