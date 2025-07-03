import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/60 to-background/80 z-10" />
        <Image
          src="/May-18-2022/YogaShantiMay2022-100.jpg"
          alt="Yoga Studio"
          fill
          className="object-cover opacity-20"
          priority
        />
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-sage-green/20 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-sage-green/15 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-4000"></div>

      <div className="container relative z-10 mx-auto px-4 py-32 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Transform Your Practice at{" "}
            <span className="gradient-sage-text">
              Shanti Hot Yoga
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
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
            <Button variant="outline" size="lg" asChild className="px-8 py-4 text-lg border-2 border-sage-green/30 hover:bg-sage-green/5 text-foreground">
              <Link href="/about">
                Explore Shanti
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold sage-green">3</div>
              <div className="text-sm text-muted-foreground">Studio Locations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold sage-green">13+</div>
              <div className="text-sm text-muted-foreground">Years of Community</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold sage-green">1</div>
              <div className="text-sm text-muted-foreground">Membership Access</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-sage-green/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-sage-green rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
} 