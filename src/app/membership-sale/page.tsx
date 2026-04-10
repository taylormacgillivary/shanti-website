"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, CalendarDays, Sparkles } from "lucide-react";

/**
 * Mindbody purchase URLs for this promo. Set in .env when your sale SKUs are live:
 * NEXT_PUBLIC_MB_MEMBERSHIP_SALE_REGULAR_URL
 * NEXT_PUBLIC_MB_MEMBERSHIP_SALE_STUDENT_URL
 *
 * Defaults point at the standard 4-month monthly membership (yoga only) until updated.
 */
const CHECKOUT_REGULAR =
  process.env.NEXT_PUBLIC_MB_MEMBERSHIP_SALE_REGULAR_URL ??
  "https://clients.mindbodyonline.com/classic/ws?studioid=11233&stype=40&prodId=156";

const CHECKOUT_STUDENT =
  process.env.NEXT_PUBLIC_MB_MEMBERSHIP_SALE_STUDENT_URL ?? CHECKOUT_REGULAR;

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
            <Badge className="bg-white/15 text-white border-white/30 backdrop-blur-md px-4 py-1.5">
              <CalendarDays className="w-3.5 h-3.5 mr-2 inline" />
              April 20–22 only
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-lg">
              Let Your Yoga Practice{" "}
              <span className="text-sage-green drop-shadow-lg">Bloom</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/95 drop-shadow-md max-w-2xl mx-auto leading-relaxed">
              This spring, bring your yoga practice to life with our most accessible membership offer
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
              This membership pricing will be available from April 20-22 only.
            </p>
          </div>

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
                  <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">$9 / month</span>
                </div>
                <div className="flex justify-between items-baseline gap-4">
                  <span className="text-muted-foreground">Months 3 &amp; 4</span>
                  <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">$115 / month</span>
                </div>
                <p className="text-sm text-muted-foreground pt-2">
                  Then continues at the regular monthly rate on the same membership terms.
                </p>
              </CardContent>
              <CardFooter className="flex flex-col gap-2 border-t bg-muted/20 pt-6 pb-6">
                <Button
                  size="lg"
                  className="w-full gradient-sage hover:opacity-90 text-white py-6 text-lg"
                  asChild
                >
                  <a
                    href={CHECKOUT_REGULAR}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Buy now — regular
                  </a>
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-2 border-purple-500/40 shadow-lg overflow-hidden flex flex-col">
              <CardHeader className="bg-muted/50 pb-2">
                <CardTitle className="text-xl">Student / senior</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow pt-6 space-y-4">
                <div className="flex justify-between items-baseline gap-4 border-b border-border pb-3">
                  <span className="text-muted-foreground">Months 1 &amp; 2</span>
                  <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">$9 / month</span>
                </div>
                <div className="flex justify-between items-baseline gap-4">
                  <span className="text-muted-foreground">Months 3 &amp; 4</span>
                  <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">$89 / month</span>
                </div>
                <p className="text-sm text-muted-foreground pt-2">
                  For members who qualify for our student/senior rate. Then continues at the regular monthly rate on the same membership terms.
                </p>
              </CardContent>
              <CardFooter className="flex flex-col gap-2 border-t bg-muted/20 pt-6 pb-6">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-2 border-purple-600 text-purple-800 dark:text-purple-200 hover:bg-purple-50 dark:hover:bg-purple-950/40 py-6 text-lg"
                  asChild
                >
                  <a
                    href={CHECKOUT_STUDENT}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Buy now — student / senior
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <p className="text-center text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto mt-8 leading-relaxed">
            The above pricing is for our yoga-only unlimited membership. If you wish to include access to unlimited Pilates classes, there is a $34/month add-on that can be processed by submitting a request to{" "}
            <a
              href="mailto:info@shantihotyoga.ca?subject=Pilates%20Add-On%20Request"
              className="text-sage-green font-medium hover:underline underline-offset-2"
            >
              info@shantihotyoga.ca
            </a>
            .
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

    </div>
  );
}
