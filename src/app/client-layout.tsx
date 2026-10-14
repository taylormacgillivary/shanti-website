"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { Navigation } from "@/components/navigation";
import { MembershipSaleAnnouncement } from "@/components/membership-sale-announcement";
import { Footer } from "@/components/footer";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { MembershipSaleBanner } from "@/components/membership-sale-banner";
import { MembershipSaleClockProvider } from "@/lib/use-membership-sale-status";

const queryClient = new QueryClient();

export function RootLayoutClient({
  children,
  allowSalePreview = false,
}: {
  children: React.ReactNode;
  allowSalePreview?: boolean;
}) {

  return (
    <QueryClientProvider client={queryClient}>
      <MembershipSaleClockProvider allowPreview={allowSalePreview}>
        <div className="sticky top-0 z-[100] w-full">
          <MembershipSaleBanner />
          <Navigation />
        </div>
        <MembershipSaleAnnouncement />
        <main className="flex-grow">{children}</main>
        <NewsletterSignup
          variant="section"
          title="Stay Connected"
          subtitle="Get updates on classes, workshops, retreats, and special events delivered to your inbox."
          buttonText="Subscribe"
        />
        <Footer />
        <Toaster position="top-center" richColors />
      </MembershipSaleClockProvider>
    </QueryClientProvider>
  );
}


