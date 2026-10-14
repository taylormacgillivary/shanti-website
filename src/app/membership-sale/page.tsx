"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Check, CalendarDays, Sparkles } from "lucide-react";

import { useMembershipSaleStatus } from "@/lib/use-membership-sale-status";
import { getMembershipSaleStatus, isMembershipSaleCheckoutReady, membershipSale } from "@/lib/membership-sale";

function SaleCheckout({ contractId, label, className, status }: {
  contractId: string | null;
  label: string;
  className: string;
  status: ReturnType<typeof getMembershipSaleStatus>;
}) {
  if (status !== "active" || !isMembershipSaleCheckoutReady() || !contractId) {
    return <Button disabled size="lg" className="w-full py-6 text-base">
      {status === "ended" ? "Sale ended" : label}
    </Button>;
  }
  return <div className="w-full" dangerouslySetInnerHTML={{
    __html: `<healcode-widget data-version="0.2" data-link-class="${className}" data-site-id="1889" data-mb-site-id="11233" data-service-id="${contractId}" data-bw-identity-site="true" data-type="contract-link" data-inner-html="${label}"></healcode-widget>`,
  }} />;
}

/** Same `Button` variant/size/sizing as the original regular CTA; sage fill instead of purple outline. */
const membershipSaleRegularHealcodeLinkClass = cn(
  "healcode-contract-text-link",
  buttonVariants({
    variant: "outline",
    size: "lg",
    className:
      "w-full border-2 border-white/35 py-6 text-lg gradient-sage text-white hover:opacity-90 dark:border-white/25",
  }),
  "hover:bg-transparent dark:hover:bg-transparent"
);

/** Matches the student/senior `Button` (outline, lg, purple) so the Healcode link looks identical. */
const membershipSaleStudentHealcodeLinkClass = cn(
  "healcode-contract-text-link",
  buttonVariants({
    variant: "outline",
    size: "lg",
    className:
      "w-full border-2 border-purple-600 text-purple-800 dark:text-purple-200 hover:bg-purple-50 dark:hover:bg-purple-950/40 py-6 text-lg",
  })
);

const membershipHighlights = [
  "One membership includes access to unlimited hot yoga on our yoga-only monthly tier",
  "Minimum 4-month commitment (same structure as our standard monthly membership)",
  "One membership includes access to all three studios — Halifax, Bedford, and Dartmouth",
  "Student/senior tier reflects the lower ongoing rate for those who qualify",
] as const;

const gallery = [
  { src: "/images-in-use/12.jpg", alt: "Practicing hot yoga at Shanti" },
  { src: "/images-in-use/19.jpg", alt: "Shanti Hot Yoga studio space" },
  { src: "/images-in-use/08.jpg", alt: "Community at Shanti Hot Yoga" },
] as const;

export default function MembershipSalePage() {
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const saleStatus = useMembershipSaleStatus();

  useEffect(() => {
    const el = heroVideoRef.current;
    if (!el) return;
    el.muted = true;
    const playAttempt = el.play();
    if (playAttempt !== undefined) {
      playAttempt.catch(() => {
        /* Autoplay blocked — poster still shows */
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero — same video asset as home; isolate + no negative z-index so the video stays visible */}
      <section className="relative isolate flex min-h-[90vh] items-center justify-center overflow-hidden -mt-16">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <video
            ref={heroVideoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover"
            poster="/images-in-use/12.jpg"
          >
            <source src="/community-video_web.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-28 md:py-36 text-center">
          <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
            <Badge className="bg-white/15 text-white border-white/30 backdrop-blur-md px-6 py-2 text-base md:text-lg">
              <CalendarDays className="w-4.5 h-4.5 mr-2.5 inline" />
              {membershipSale.dates} · Yoga only
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-lg">
              Find Your Flow{" "}
              <span className="text-sage-green drop-shadow-lg">This Fall</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/95 drop-shadow-md max-w-2xl mx-auto leading-relaxed">
              Your first two months for ${membershipSale.firstMonthsRate} each. Unlimited yoga across Halifax, Bedford, and Dartmouth.
            </p>
          </div>
        </div>

        <a
          href="#offer"
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/50 rounded-full"
          aria-label="Scroll to membership offer"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center backdrop-blur-sm">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
          </div>
        </a>
      </section>

      {/* Pricing + checkout (single place for offer details and buy actions) */}
      <section
        id="offer"
        className="scroll-mt-24 py-16 md:py-24 bg-white dark:bg-gray-950 border-b border-border"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
              Get your 4-month membership at an{" "}
              <span className="gradient-sage-text">unbeatable price</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Available {membershipSale.dates}. Your membership starts on the day you purchase during the sale.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Offer not applicable for current members. Please read the membership agreement for
              full details.
            </p>
          </div>

          <p role="status" className="text-center text-sm text-muted-foreground mb-8">
            {saleStatus === "ended" ? "The October sale has ended. Explore our current memberships below."
              : !isMembershipSaleCheckoutReady() ? "To purchase, please contact the studio."
              : "Choose your membership below to purchase online."}
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="border-2 border-sage-green/30 shadow-lg overflow-hidden flex flex-col">
              <CardHeader className="bg-muted/50 pb-2">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Sparkles className="w-5 h-5 text-sage-green" />
                  Regular
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow pt-6 space-y-4">
                <div className="flex justify-between items-baseline gap-4 border-b border-border pb-3">
                  <span className="text-muted-foreground">Months 1 &amp; 2</span>
                  <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">${membershipSale.firstMonthsRate} / month</span>
                </div>
                <div className="flex justify-between items-baseline gap-4">
                  <span className="text-muted-foreground">Months 3 &amp; 4</span>
                  <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">${membershipSale.regularRate} / month</span>
                </div>
                <p className="text-sm text-muted-foreground pt-2">
                  Then continues at the regular monthly rate on the same membership terms.
                </p>
              </CardContent>
              <CardFooter className="flex flex-col gap-2 border-t bg-muted/20 pt-6 pb-6">
                <SaleCheckout
                  contractId={membershipSale.regularContractId}
                  label="Buy now — regular"
                  className={membershipSaleRegularHealcodeLinkClass}
                  status={saleStatus}
                />
              </CardFooter>
            </Card>

            <Card className="border-2 border-purple-500/40 shadow-lg overflow-hidden flex flex-col">
              <CardHeader className="bg-muted/50 pb-2">
                <CardTitle className="text-xl">Student / senior</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow pt-6 space-y-4">
                <div className="flex justify-between items-baseline gap-4 border-b border-border pb-3">
                  <span className="text-muted-foreground">Months 1 &amp; 2</span>
                  <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">${membershipSale.firstMonthsRate} / month</span>
                </div>
                <div className="flex justify-between items-baseline gap-4">
                  <span className="text-muted-foreground">Months 3 &amp; 4</span>
                  <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">${membershipSale.studentSeniorRate} / month</span>
                </div>
                <p className="text-sm text-muted-foreground pt-2">
                  For members who qualify for our student/senior rate. Then continues at the regular monthly rate on the same membership terms.
                </p>
              </CardContent>
              <CardFooter className="flex flex-col gap-2 border-t bg-muted/20 pt-6 pb-6">
                <SaleCheckout
                  contractId={membershipSale.studentSeniorContractId}
                  label="Buy now — student / senior"
                  className={membershipSaleStudentHealcodeLinkClass}
                  status={saleStatus}
                />
              </CardFooter>
            </Card>
          </div>

          <p className="text-center text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto mt-8 leading-relaxed">
            This is a yoga-only unlimited membership. Pilates classes are not included.
          </p>

          <p className="text-center text-sm text-muted-foreground max-w-2xl mx-auto mt-10">
            Questions or need help choosing?{" "}
            <Link href="/contact" className="text-sage-green font-medium hover:underline">
              Contact us
            </Link>
            {" · "}
            <Link href="/memberships" className="text-sage-green font-medium hover:underline">
              View all passes &amp; memberships
            </Link>
          </p>
        </div>
      </section>

      {/* Highlights from memberships page */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-muted/40 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              What you get with{" "}
              <span className="gradient-sage-text">monthly membership</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              One membership includes access to the same unlimited yoga monthly tier as on our memberships page — now at this limited-time entry price.
            </p>
          </div>

          <ul className="max-w-2xl mx-auto space-y-4">
            {membershipHighlights.map((line) => (
              <li
                key={line}
                className="flex gap-3 text-left text-lg text-gray-800 dark:text-gray-200"
              >
                <Check className="w-6 h-6 text-sage-green shrink-0 mt-0.5" strokeWidth={2.5} />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-12 md:py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {gallery.map((item) => (
              <div
                key={item.src}
                className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg border border-border"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {saleStatus === "active" && isMembershipSaleCheckoutReady() && (
        <Script
          src="https://widgets.mindbodyonline.com/javascripts/healcode.js"
          strategy="afterInteractive"
        />
      )}
    </div>
  );
}
