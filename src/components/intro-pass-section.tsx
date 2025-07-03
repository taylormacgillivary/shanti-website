import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function IntroPassSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Column */}
          <div className="space-y-6 lg:order-1 order-2">
            <Badge variant="secondary" className="mb-4 bg-sage-green/10 text-sage-green border-sage-green/20">
              Perfect for Beginners
            </Badge>

            <h2 className="text-4xl md:text-5xl font-bold">
              Start Your Journey with Our{" "}
              <span className="gradient-sage-text">
                Intro Pass
              </span>
            </h2>

            <div className="flex items-baseline gap-2">
              <span className="text-6xl font-bold gradient-sage-text">$39</span>
              <span className="text-xl text-muted-foreground">for two weeks</span>
            </div>

            <p className="text-xl text-muted-foreground leading-relaxed">
              Experience unlimited classes across all three studios for two full weeks. 
              Perfect for those new to hot yoga or wanting to try our unique approach to practice.
            </p>

            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-lg text-muted-foreground">
                <svg className="w-6 h-6 text-sage-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Unlimited access to all classes
              </li>
              <li className="flex items-center gap-2 text-lg text-muted-foreground">
                <svg className="w-6 h-6 text-sage-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Access to all three locations
              </li>
              <li className="flex items-center gap-2 text-lg text-muted-foreground">
                <svg className="w-6 h-6 text-sage-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Try different class styles
              </li>
            </ul>

            <Button 
              asChild
              className="mt-8 gradient-sage text-white hover:opacity-90 shadow-lg text-lg px-8 py-6"
            >
              <a
                href="https://clients.mindbodyonline.com/classic/mainclass?studioid=11233"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Your Intro Pass
              </a>
            </Button>
          </div>

          {/* Image Column */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl lg:order-2 order-1">
            <Image
              src="/images-in-use/19.jpg"
              alt="Yoga practice at Shanti Hot Yoga"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            
            {/* Price Badge */}
            <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-xl">
              <div className="text-center">
                <div className="text-3xl font-bold gradient-sage-text">$39</div>
                <div className="text-sm text-muted-foreground">2 Weeks</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 