import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

export function IntroPassSection() {
  const [isClient, setIsClient] = useState(false);
  const [healcodeReady, setHealcodeReady] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Check if HealcodeWidget is already available
    if (typeof window !== 'undefined' && 'HealcodeWidget' in window) {
      setHealcodeReady(true);
      return;
    }

    // Poll for HealcodeWidget availability
    let tries = 0;
    const checkHealcode = setInterval(() => {
      tries += 1;
      if (typeof window !== 'undefined' && 'HealcodeWidget' in window) {
        setHealcodeReady(true);
        clearInterval(checkHealcode);
      } else if (tries > 50) { // 5 seconds timeout
        clearInterval(checkHealcode);
      }
    }, 100);

    return () => clearInterval(checkHealcode);
  }, []);
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

            {/* Render consistently to avoid hydration mismatch */}
            {isClient && healcodeReady ? (
              // @ts-expect-error - Mindbody widget
              <healcode-widget
                data-version="0.2"
                data-link-class="mt-8 inline-flex items-center justify-center whitespace-nowrap rounded-md text-lg font-medium gradient-sage hover:opacity-90 text-white px-8 py-6 shadow-lg"
                data-site-id="1889"
                data-mb-site-id="11233"
                data-service-id="1364"
                data-bw-identity-site="false"
                data-type="pricing-link"
                data-inner-html="Get Your Intro Pass"
              />
            ) : (
              <a
                href="https://clients.mindbodyonline.com/classic/ws?studioid=11233&stype=41&sTG=39&prodId=1364"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center justify-center whitespace-nowrap rounded-md text-lg font-medium gradient-sage hover:opacity-90 text-white px-8 py-6 shadow-lg"
              >
                Get Your Intro Pass
              </a>
            )}
          </div>

          {/* Image Column */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl lg:order-2 order-1">
            <Image
              src="/images-in-use/19.jpg"
              alt="Yoga practice at Shanti Hot Yoga"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
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