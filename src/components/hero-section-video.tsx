"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function HeroSectionVideo() {
  const [overlayVisible, setOverlayVisible] = useState(true);
  const [contentExpanded, setContentExpanded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Fade out overlay after 4 seconds
    const fadeOutTimer = setTimeout(() => {
      setOverlayVisible(false);
    }, 4000);

    // Expand content section after 5.5 seconds (4s visible + 1.5s video only)
    // This creates a more seamless transition
    const expandTimer = setTimeout(() => {
      setContentExpanded(true);
    }, 5500);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(expandTimer);
    };
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      {/* Video Section - becomes full screen */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 -z-10">
          {/* Dark overlay - fades out when content moves down */}
          <div 
            className={`absolute inset-0 bg-black/40 z-10 transition-opacity duration-1000 ${
              contentExpanded ? 'opacity-20' : 'opacity-100'
            }`} 
          />
          
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster="/images-in-use/12.jpg"
          >
            <source src="/community-video.mp4" type="video/mp4" />
            {/* Fallback image if video doesn't load */}
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted" />
          </video>
        </div>

        {/* Mute Toggle Button */}
        <button
          onClick={toggleMute}
          className="absolute top-8 right-8 z-20 bg-black/30 backdrop-blur-md hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300 shadow-lg"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? (
            <VolumeX className="w-6 h-6" />
          ) : (
            <Volume2 className="w-6 h-6" />
          )}
        </button>

        {/* Overlay Content - fades out */}
        <div 
          className={`container relative z-10 mx-auto px-4 py-32 text-center transition-opacity duration-1000 ${
            overlayVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-lg">
              Transform Your Practice at{" "}
              <span className="text-sage-green drop-shadow-lg">
                Shanti Hot Yoga
              </span>
            </h1>

            {/* Subtitle with semi-transparent background for readability */}
            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 max-w-3xl mx-auto">
              <p className="text-xl md:text-2xl text-white leading-relaxed">
                Access all three locations in Halifax, Bedford, and Dartmouth with one membership. 
                Join our thriving community and discover the transformative power of hot yoga.
              </p>
            </div>

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

            {/* Stats with semi-transparent backgrounds */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 max-w-2xl mx-auto">
              <div className="text-center bg-black/30 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-sage-green drop-shadow-lg">3</div>
                <div className="text-sm text-white">Studio Locations</div>
              </div>
              <div className="text-center bg-black/30 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-sage-green drop-shadow-lg">15</div>
                <div className="text-sm text-white">Years of Creating Community</div>
              </div>
              <div className="text-center bg-black/30 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-sage-green drop-shadow-lg">1</div>
                <div className="text-sm text-white">Membership Access</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - fades out when content expands */}
        <div 
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce transition-opacity duration-1000 ${
            contentExpanded ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center backdrop-blur-sm">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Content Section - fades in smoothly */}
      <section 
        className={`relative transition-all duration-[1500ms] ease-in-out ${
          contentExpanded 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8 max-h-0 overflow-hidden'
        }`}
      >
        <div className="bg-background shadow-2xl">
          <div className="container mx-auto px-4 py-16 text-center">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Main Headline */}
              <h1 
                className={`text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight transition-all duration-1000 delay-100 ${
                  contentExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                Transform Your Practice at{" "}
                <span className="gradient-sage-text">
                  Shanti Hot Yoga
                </span>
              </h1>

              {/* Subtitle */}
              <p 
                className={`text-xl md:text-2xl text-muted-foreground leading-relaxed transition-all duration-1000 delay-200 ${
                  contentExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                Access all three locations in Halifax, Bedford, and Dartmouth with one membership. 
                Join our thriving community and discover the transformative power of hot yoga.
              </p>

              {/* CTA Buttons */}
              <div 
                className={`flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 transition-all duration-1000 delay-300 ${
                  contentExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <Button size="lg" asChild className="gradient-sage hover:opacity-90 text-white px-8 py-4 text-lg shadow-lg">
                  <Link href="/memberships">
                    Start Your Journey
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="px-8 py-4 text-lg border-2 border-sage-green/30 hover:bg-sage-green/5 text-foreground">
                  <Link href="/about">
                    Explore Shanti
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div 
                className={`grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 max-w-2xl mx-auto transition-all duration-1000 delay-500 ${
                  contentExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <div className="text-center">
                  <div className="text-3xl font-bold sage-green">3</div>
                  <div className="text-sm text-muted-foreground">Studio Locations</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold sage-green">15</div>
                  <div className="text-sm text-muted-foreground">Years of Creating Community</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold sage-green">1</div>
                  <div className="text-sm text-muted-foreground">Membership Access</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

