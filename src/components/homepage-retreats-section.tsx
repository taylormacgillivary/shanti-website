import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import patagoniaImage from "../../public/images-in-use/Retreats/patagonia-retreat-2027.jpg";

export function HomepageRetreatsSection() {
  return (
    <section id="retreats" aria-labelledby="homepage-retreats-title" className="scroll-mt-24 bg-[#f4f6ef] py-16 text-[#292e24] sm:py-20 lg:py-24">
      <div className="container">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-3 sm:mb-8">
            <h2 id="homepage-retreats-title" className="text-4xl font-bold tracking-tight md:text-5xl">
              Yoga retreats
            </h2>
            <Link
              href="/retreats"
              className="inline-flex min-h-10 items-center gap-2 rounded-sm text-sm font-semibold text-[#3e502b] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              View all retreats <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>

          <article className="grid overflow-hidden rounded-2xl border border-[#dfe5d7] bg-white md:grid-cols-[1.25fr_1fr]">
            <div className="relative aspect-[5/3] md:aspect-auto">
              <Image
                src={patagoniaImage}
                alt="Lakeside lodges beneath forested hills in Northern Patagonia"
                fill
                placeholder="blur"
                sizes="(min-width: 1280px) 640px, (min-width: 768px) 55vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col items-start justify-center p-6 sm:p-8 lg:p-12">
              <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#4c6038]">
                <MapPin aria-hidden="true" className="size-4 shrink-0" />
                Bariloche, Argentina
              </p>
              <h3 className="text-3xl font-bold tracking-tight lg:text-4xl">Patagonia awaits</h3>
              <p className="mt-4 flex items-center gap-2 text-sm font-medium">
                <CalendarDays aria-hidden="true" className="size-4 shrink-0 text-[#4c6038]" />
                February 20–27, 2027
              </p>
              <p className="mt-4 max-w-[34ch] text-base leading-relaxed text-[#555d4f]">
                Spend a week in Northern Patagonia with daily yoga, alpine trails, quiet time by the lake, and local meals.
              </p>
              <Button asChild size="lg" className="mt-6 min-h-11 bg-[#3e502b] text-white hover:bg-[#314021]">
                <Link href="/retreats/patagonia">
                  Explore Patagonia <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
