'use client';

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-hero";
import { useEffect } from "react";

interface Workshop {
  title: string;
  description: string;
  location: string;
  dates: string[];
  image: string;
  instructor?: string;
  duration?: string;
  dropIn?: string;
  discount?: string;
  featured?: boolean;
  imagePosition?: string;
  customWidget?: string;
}

const workshops: Workshop[] = [
  {
    title: "Myofascial Release & Yoga Class",
    instructor: "Stephanie Morton",
    description: "A slow, luxurious practice featuring both a gently dynamic yoga practice interspersed with myofascial release techniques for tissue hydration, and restorative postures with breath work for integration, rest and deep healing.",
    location: "Dartmouth",
    dates: ["<strong>November 22nd</strong>", "<strong>6:30pm</strong>"],
    image: "/images-in-use/mfr-better-backbends-c1a0c9d10b8add5a2e3ff705289a142f.webp",
    featured: true,
    customWidget: '<healcode-widget data-version="0.2" data-site-id="1889" data-mb-site-id="11233" data-service-id="1594" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Register Now" />'
  },
  {
    title: "Mysore Ashtanga Practice",
    instructor: "Andrea Gracia",
    description: "Mysore Style is the traditional way of teaching the Ashtanga Vinyasa Yoga once the student has familiarity with the Sun Salutations and primary series. In this practice you will receive personal attention from Andrea Gracia, an Authorized Level 1 Ashtanga Yoga Teacher who travels to Mysore (India) every year to study with her teacher Saraswathi Jois.",
    location: "Bedford",
    dates: ["<strong>Starts October 16th</strong>", "5:45 - 7:15pm"],
    duration: "6 Week Program",
    dropIn: "*Drop in available: $30 +tax. Contact studio for more info",
    discount: "*Shanti monthly members receive 10% discount with promo code: Mysore10",
    image: "/images-in-use/teachers-used/andrea-gracia.jpg",
    imagePosition: "center bottom",
    customWidget: '<healcode-widget data-version="0.2" data-site-id="1889" data-mb-site-id="11233" data-service-id="1587" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Register Now" />'
  },
  {
    title: "Healing Sound Bath",
    instructor: "Amanda Savoie",
    description: "Back by popular demand this fall, join Amanda Savoie in a deeply restorative and healing sound bath, where guided meditation and soothing sound vibrations carry you into profound relaxation.",
    location: "Bedford",
    dates: [
      "<strong>Monthly Dates:</strong>",
      "October 25th",
      "November 28th", 
      "December 20th<br><br>",
      "<strong>6:00pm start time for all dates</strong>"
    ],
    image: "/images-in-use/sound-bath.webp",
    customWidget: '<healcode-widget data-version="0.2" data-site-id="1889" data-mb-site-id="11233" data-service-id="1616" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Register Now" />'
  },
  {
    title: "Prenatal Yoga",
    instructor: "Nikki Smith (Dartmouth) & Prily MacPhee (Bedford)",
    description: "Prenatal Yoga is an incredible way to tune into your body in an intimate way as it undergoes a very challenging and magical transformation. Prenatal Yoga will help strengthen both the body and mind during your pregnancy and in preparation for labour while connecting you to a like-minded group. With everyone at a different stage of pregnancy, the community building aspect can be extremely valuable, while at the same time, building a closer connection to the little one in your belly!",
    location: "Dartmouth & Bedford",
    dates: [
      "<strong>Dartmouth:</strong> October 23rd, 5:30pm",
      "<strong>Bedford:</strong> October 27th, 6pm"
    ],
    duration: "4 Week Programs",
    image: "/images-in-use/prenatal-2017.jpg",
    customWidget: '<healcode-widget data-version="0.2" data-site-id="1889" data-mb-site-id="11233" data-service-id="1542" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Register Now" />'
  },
  {
    title: "Read More! Lead More! Move More!",
    instructor: "Joe A. Doiron",
    description: "Raising resilient kids through literacy, movement and mindfulness. Join Joe A. Doiron, founder, creator and author of Active Kids Adventures for this special free workshop.",
    location: "Dartmouth & Bedford",
    dates: [
      "<strong>November 29th</strong>",
      "<strong>Dartmouth:</strong> 12:30-2:00pm",
      "<strong>Bedford:</strong> 3:30-5:00pm"
    ],
    duration: "FREE!",
    image: "/images-in-use/joe-doiron.webp",
    imagePosition: "center top",
    customWidget: '<healcode-widget data-version="0.2" data-site-id="1889" data-mb-site-id="11233" data-service-id="1542" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Register Now" />'
  }
];

export default function WorkshopsPage() {
  useEffect(() => {
    // Load Mindbody widget script
    const script = document.createElement('script');
    script.src = 'https://widgets.mindbodyonline.com/javascripts/healcode.js';
    script.type = 'text/javascript';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup: remove script when component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <>
      <PageHero
        badge="Deepen Your Practice"
        title={<>Workshops & <span className="gradient-sage-text">Special Events</span></>}
        subtitle="Join us for special workshops and events designed to deepen your practice and expand your understanding of yoga. From traditional Ashtanga to specialized techniques, we offer a variety of opportunities to grow."
      />

      {/* Featured Workshop */}
      {workshops.filter(w => w.featured).map((workshop, index) => (
        <section key={index} className="py-24 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {workshop.image ? (
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={workshop.image}
                    alt={workshop.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  
                  {/* Location Badge */}
                  <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-xl">
                    <div className="text-center">
                      <div className="text-lg font-bold text-sage-green">{workshop.location}</div>
                      <div className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: workshop.dates[0] }} />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-sage-green/20 to-sage-green/5 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-lg font-bold text-sage-green">{workshop.location}</div>
                    <div className="text-sm text-muted-foreground mt-2" dangerouslySetInnerHTML={{ __html: workshop.dates[0] }} />
                  </div>
                </div>
              )}

              <div className="space-y-6">
                <Badge variant="secondary" className="mb-4 bg-sage-green/10 text-sage-green border-sage-green/20">
                  Featured Workshop
                </Badge>

                <h2 className="text-4xl font-bold">
                  {workshop.title}
                </h2>

                {workshop.instructor && (
                  <p className="text-sage-green text-xl font-medium">with {workshop.instructor}</p>
                )}

                <p className="text-xl text-muted-foreground leading-relaxed">
                  {workshop.description}
                </p>

                <div className="space-y-2">
                  {workshop.dates.map((date, i) => (
                    <div key={i} className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: date }} />
                  ))}
                  {workshop.duration && (
                    <div className="font-medium text-sage-green">
                      {workshop.duration}
                    </div>
                  )}
                </div>

                {workshop.dropIn && (
                  <div className="text-sm text-muted-foreground italic">
                    {workshop.dropIn}
                  </div>
                )}

                {workshop.discount && (
                  <div className="text-sm text-sage-green font-medium">
                    {workshop.discount}
                  </div>
                )}

                <Button 
                  asChild
                  className="gradient-sage text-white hover:opacity-90 shadow-lg"
                >
                  {workshop.customWidget ? (
                    <div dangerouslySetInnerHTML={{ __html: workshop.customWidget }} />
                  ) : (
                    <a
                      href="https://clients.mindbodyonline.com/classic/mainclass?studioid=11233"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Register Now
                    </a>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Other Workshops Grid */}
      <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workshops.filter(w => !w.featured).map((workshop, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg flex flex-col">
                {workshop.image ? (
                  <div className="aspect-[3/2] relative">
                    <Image
                      src={workshop.image}
                      alt={workshop.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                      style={workshop.imagePosition ? { objectPosition: workshop.imagePosition } : undefined}
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/90 text-gray-900 backdrop-blur-sm">
                        {workshop.location}
                      </Badge>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-[3/2] relative bg-gradient-to-br from-sage-green/20 to-sage-green/5 flex items-center justify-center">
                    <div className="text-center p-4">
                      <Badge className="bg-white/90 text-gray-900 backdrop-blur-sm">
                        {workshop.location}
                      </Badge>
                    </div>
                  </div>
                )}
                <div className="p-6 space-y-4 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold">{workshop.title}</h3>
                  {workshop.instructor && (
                    <p className="text-sage-green font-medium">with {workshop.instructor}</p>
                  )}
                  <p className="text-muted-foreground">{workshop.description}</p>
                  <div className="space-y-1">
                    {workshop.dates.map((date, i) => (
                      <div key={i} className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: date }} />
                    ))}
                    {workshop.duration && (
                      <div className="text-sm font-medium text-sage-green">
                        {workshop.duration}
                      </div>
                    )}
                  </div>
                  {workshop.dropIn && (
                    <div className="text-xs text-muted-foreground italic">
                      {workshop.dropIn}
                    </div>
                  )}
                  {workshop.discount && (
                    <div className="text-xs text-sage-green font-medium">
                      {workshop.discount}
                    </div>
                  )}
                  <div className="mt-auto pt-2">
                    <Button 
                      asChild
                      className="w-full gradient-sage text-white hover:opacity-90"
                    >
                      {workshop.customWidget ? (
                        <div dangerouslySetInnerHTML={{ __html: workshop.customWidget }} />
                      ) : (
                        <a
                          href="https://clients.mindbodyonline.com/classic/mainclass?studioid=11233"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Register Now
                        </a>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
} 