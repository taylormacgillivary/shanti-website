"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSectionVideo() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-16">
        {/* Video Background */}
        <div className="absolute inset-0 -z-10">
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/40 z-10" />
          
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster="/images-in-use/12.jpg"
          >
            <source src="/community-video_web.mp4" type="video/mp4" />
            {/* Fallback image if video doesn't load */}
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted" />
          </video>
        </div>

        {/* Overlay Content - always visible */}
        <div className="container relative z-10 mx-auto px-4 py-32 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-lg">
              Transform Your Practice at{" "}
              <span className="text-sage-green drop-shadow-lg">
                Shanti Hot Yoga
              </span>
            </h1>

            {/* Subtitle - no background box */}
            <p className="text-xl md:text-2xl text-white leading-relaxed max-w-3xl mx-auto drop-shadow-lg">
              Access all three locations in Halifax, Bedford, and Dartmouth with one membership. 
              Join our thriving community and discover the transformative power of hot yoga.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button size="lg" asChild className="gradient-sage hover:opacity-90 text-white px-8 py-4 text-lg shadow-lg">
                <Link href="/memberships">
                  Start Your Journey
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                asChild 
                className="px-8 py-4 text-lg border-2 border-white bg-white/10 hover:bg-white/20 text-white backdrop-blur-md shadow-lg font-semibold"
              >
                <Link href="/about">
                  Explore Shanti
                </Link>
              </Button>
            </div>

            {/* Stats - no background boxes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-sage-green drop-shadow-lg">3</div>
                <div className="text-sm text-white drop-shadow-md">Studio Locations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-sage-green drop-shadow-lg">15</div>
                <div className="text-sm text-white drop-shadow-md">Years of Creating Community</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-sage-green drop-shadow-lg">1</div>
                <div className="text-sm text-white drop-shadow-md">Membership Access</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center backdrop-blur-sm">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>
  );
}

