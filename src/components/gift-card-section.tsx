"use client"

import Image from "next/image";
import { Button } from "@/components/ui/button";

// The GiftCardSection component displays a hero section for gift card purchases.
export function GiftCardSection() {
  return (
    <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center text-white">
      <Image
        src="/images-in-use/08.jpg"
        alt="Yoga practice"
        fill
        sizes="100vw"
        className="absolute inset-0 -z-10 object-cover"
      />
      <div className="absolute inset-0 bg-black/60 -z-10" />
      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Give the Gift of <span className="gradient-sage-text">Yoga</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto">
            This holiday season, give your loved ones the perfect gift - the gift of self-care, transformation, and inner peace. 
            Choose any dollar amount for maximum flexibility.
          </p>
          <div className="mt-8">
            <Button className="gradient-sage hover:opacity-90 text-white px-8 py-4 text-lg shadow-lg" asChild>
              <a href="https://clients.mindbodyonline.com/classic/ws?studioid=11233&stype=42&giftCardID=364" target="_blank" rel="noopener noreferrer">
                Purchase Gift Card
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

