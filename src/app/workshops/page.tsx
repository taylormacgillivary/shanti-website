'use client';

import * as React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-hero";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Declare HealCode on window object
declare global {
  interface Window {
    HealCode?: {
      init: () => void;
    };
  }
}


interface Workshop {
  title: string;
  description: string;
  fullDescription?: string;
  location: string;
  dates: string[];
  image: string;
  instructor?: string;
  duration?: string;
  dropIn?: string;
  discount?: string;
  cost?: string;
  featured?: boolean;
  imagePosition?: string;
  customWidget?: string;
  widgetId?: string;
  registrationClosed?: boolean;
  hasMultipleOptions?: boolean;
  takeHome?: string;
}

const workshops: Workshop[] = [
  {
    title: "Mysore Ashtanga Practice",
    instructor: "Andrea Gracia",
    description: "Mysore Style is the traditional way of teaching the Ashtanga Vinyasa Yoga once the student has familiarity with the Sun Salutations and primary series. In this practice you will receive personal attention from Andrea Gracia, an Authorized Level 1 Ashtanga Yoga Teacher who travels to Mysore (India) every year to study with her teacher Saraswathi Jois.",
    location: "Bedford",
    dates: [
      "<strong>Thursdays starting March 19th</strong>",
      "<strong>5:45 - 7:15pm</strong>"
    ],
    duration: "6 Week Program",
    cost: "$160 + tax",
    discount: "*Shanti monthly members receive 10% discount with promo code: Mysore10",
    image: "/images-in-use/teachers-used/andrea-gracia.jpg",
    imagePosition: "center bottom",
    widgetId: "6810924385be",
    featured: true
  },
  {
    title: "Assisted Rest Workshop",
    instructor: "Kristie & Leanna Letterio",
    description: "Receive double the hands-on assists for even more personalized support in every shape. Join Kristie and Leanna Letterio for a 90-minute restorative yin practice designed to help you soften, unwind, and fully rest your body.",
    location: "Dartmouth",
    dates: [
      "<strong>Saturday, March 28th</strong>",
      "<strong>12:00 - 1:30pm</strong>"
    ],
    cost: "$50 + tax",
    discount: "*Shanti monthly members use promo code REST10 for 10% off",
    image: "/images-in-use/An-Assisted-Rest.jpeg",
    widgetId: "6811236985be"
  },
  {
    title: "Prenatal Yoga",
    description: "Prenatal Yoga is an incredible way to tune into your body in an intimate way as it undergoes a very challenging and magical transformation. Prenatal Yoga will help strengthen both the body and mind during your pregnancy and in preparation for labour while connecting you to a like-minded group. With everyone at a different stage of pregnancy, the community building aspect can be extremely valuable, while at the same time, building a closer connection to the little one in your belly!",
    location: "Dartmouth & Bedford",
    dates: [
      "<strong>March 5th, 2026</strong> - <strong>Dartmouth:</strong> 5:30pm with Nikki Smith",
      "<strong>March 9th, 2026</strong> - <strong>Bedford:</strong> 6:00pm with Prily MacPhee"
    ],
    duration: "4 Week Program",
    image: "/images-in-use/prenatal-2017.jpg",
    widgetId: "689767685be",
    hasMultipleOptions: true
  },
];

export default function WorkshopsPage() {
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [widgetInitialized, setWidgetInitialized] = useState(false);
  const [descriptionWorkshop, setDescriptionWorkshop] = useState<Workshop | null>(null);
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);

  const handleReadMore = (workshop: Workshop) => {
    setDescriptionWorkshop(workshop);
    setIsDescriptionModalOpen(true);
  };

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

  // Initialize widget only once when modal first opens with a widget
  useEffect(() => {
    if (isModalOpen && selectedWorkshop?.widgetId && !widgetInitialized) {
      // Give the DOM time to render the widget element
      setTimeout(() => {
        if (window.HealCode) {
          window.HealCode.init();
          setWidgetInitialized(true);
        }
      }, 100);
    }
  }, [isModalOpen, selectedWorkshop, widgetInitialized]);

  // Close our modal when user clicks on Mindbody widget's register button
  useEffect(() => {
    if (!isModalOpen) return;

    const handleWidgetButtonClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if the clicked element is a Mindbody register/signup button
      if (
        target.closest('a[data-hc-open-modal="modal-iframe"]') ||
        target.closest('.hc-button.signup_now') ||
        target.closest('[data-hc-open-modal]')
      ) {
        // Close our modal so Mindbody's modal can be fully interactive
        setTimeout(() => {
          setIsModalOpen(false);
        }, 100);
      }
    };

    // Add click listener to document
    document.addEventListener('click', handleWidgetButtonClick, true);

    return () => {
      document.removeEventListener('click', handleWidgetButtonClick, true);
    };
  }, [isModalOpen]);

  // Helper function to check if workshop registration is closed based on dates
  const isRegistrationClosed = (workshop: Workshop): boolean => {
    // If manually set, use that
    if (workshop.registrationClosed !== undefined) {
      return workshop.registrationClosed;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset to start of day for comparison
    
    // Map month names to numbers
    const monthMap: { [key: string]: number } = {
      'january': 0, 'jan': 0, 'february': 1, 'feb': 1, 'march': 2, 'mar': 2,
      'april': 3, 'apr': 3, 'may': 4, 'june': 5, 'jun': 5,
      'july': 6, 'jul': 6, 'august': 7, 'aug': 7, 'september': 8, 'sep': 8,
      'october': 9, 'oct': 9, 'november': 10, 'nov': 10, 'december': 11, 'dec': 11
    };

    // Check all dates - registration is only closed if ALL dates have passed
    for (const dateString of workshop.dates) {
      // Extract date patterns like "October 16th", "Nov 29", "January 1st, 2026", etc.
      const dateMatch = dateString.match(/(January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d+)(?:st|nd|rd|th)?(?:,?\s*(\d{4}))?/i);
      
      if (dateMatch) {
        const monthStr = dateMatch[1];
        const day = parseInt(dateMatch[2]);
        // Use parsed year if present, otherwise default to current year
        const year = dateMatch[3] ? parseInt(dateMatch[3]) : new Date().getFullYear();
        
        const month = monthMap[monthStr.toLowerCase()];
        const eventDate = new Date(year, month, day);
        
        // If any date is today or in the future, registration is still open
        if (eventDate >= today) {
          return false;
        }
      }
    }
    
    // All dates have passed (or no valid dates found), registration is closed
    return true;
  };

  const handleRegisterClick = (workshop: Workshop) => {
    setSelectedWorkshop(workshop);
    setIsModalOpen(true);
  };

  return (
    <>
      <PageHero
        badge="Deepen Your Practice"
        title={<>Workshops & <span className="gradient-sage-text">Special Events</span></>}
        subtitle="Join us for special workshops and events designed to deepen your practice and expand your understanding of yoga. From traditional Ashtanga to specialized techniques, we offer a variety of opportunities to grow."
        note="Please note: all events require registration in advance"
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
                    style={workshop.imagePosition ? { objectPosition: workshop.imagePosition } : undefined}
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
                  onClick={() => handleRegisterClick(workshop)}
                  className="gradient-sage text-white hover:opacity-90 shadow-lg"
                >
                  Register Now
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
                  {workshop.fullDescription && (
                    <button
                      onClick={() => handleReadMore(workshop)}
                      className="text-sage-green hover:text-sage-green/80 text-sm font-medium underline underline-offset-2 text-left transition-colors"
                    >
                      Read Full Description →
                    </button>
                  )}
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
                      onClick={() => handleRegisterClick(workshop)}
                      className="w-full gradient-sage text-white hover:opacity-90"
                    >
                      Register Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold mb-2">
              {selectedWorkshop?.title}
            </DialogTitle>
            {selectedWorkshop?.hasMultipleOptions && selectedWorkshop && !isRegistrationClosed(selectedWorkshop) && (
              <p className="text-sage-green text-lg font-medium">
                Select your preferred location and time below
              </p>
            )}
          </DialogHeader>
          <div className="mt-6">
            {selectedWorkshop && isRegistrationClosed(selectedWorkshop) ? (
              <div className="text-center py-12 px-4 bg-muted/30 rounded-lg">
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
                  Registration for this event has already closed. If you would like to request to join this event late, please contact us using the button below.
                </p>
                <Button 
                  asChild
                  className="gradient-sage text-white hover:opacity-90 text-lg px-8 py-6"
                >
                  <a
                    href={`mailto:info@shantihotyoga.ca?subject=Join ${encodeURIComponent(selectedWorkshop.title)} Late`}
                  >
                    Contact Us
                  </a>
                </Button>
              </div>
            ) : selectedWorkshop?.widgetId ? (
              <div className="bg-gradient-to-b from-muted/20 to-background p-6 rounded-lg border border-sage-green/20">
                <div 
                  dangerouslySetInnerHTML={{ 
                    __html: `<healcode-widget data-type="enrollments" data-widget-partner="object" data-widget-id="${selectedWorkshop.widgetId}" data-widget-version="0"></healcode-widget>` 
                  }} 
                />
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">Registration widget not configured for this workshop.</p>
                <Button 
                  asChild
                  className="mt-4 gradient-sage text-white hover:opacity-90"
                >
                  <a
                    href="https://clients.mindbodyonline.com/classic/mainclass?studioid=11233"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Register on Mindbody
                  </a>
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Full Description Modal */}
      <Dialog open={isDescriptionModalOpen} onOpenChange={setIsDescriptionModalOpen}>
        <DialogContent className="max-w-2xl max-h-[75vh] overflow-y-auto my-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold mb-1">
              {descriptionWorkshop?.title}
            </DialogTitle>
            {descriptionWorkshop?.instructor && (
              <p className="text-sage-green font-medium">
                with {descriptionWorkshop.instructor}
              </p>
            )}
          </DialogHeader>
          <div className="mt-4 space-y-4">
            {descriptionWorkshop?.fullDescription && (
              <div 
                className="text-muted-foreground leading-relaxed prose prose-sage max-w-none"
                dangerouslySetInnerHTML={{ __html: descriptionWorkshop.fullDescription }}
              />
            )}
            <div className="pt-4 border-t border-sage-green/20 space-y-2">
              {descriptionWorkshop?.dates.map((date, i) => (
                <div key={i} className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: date }} />
              ))}
              <div className="text-sm text-muted-foreground">
                <strong>Location:</strong> {descriptionWorkshop?.location}
              </div>
              {descriptionWorkshop?.cost && (
                <div className="text-sm font-medium text-sage-green">
                  <strong>Cost:</strong> {descriptionWorkshop.cost}
                </div>
              )}
            </div>
            <div className="pt-4">
              <Button 
                onClick={() => {
                  setIsDescriptionModalOpen(false);
                  if (descriptionWorkshop) {
                    handleRegisterClick(descriptionWorkshop);
                  }
                }}
                className="w-full gradient-sage text-white hover:opacity-90"
              >
                Register Now
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

    </>
  );
}

