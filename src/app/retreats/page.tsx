"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PastRetreatsMap from "@/components/ui/PastRetreatsMap";

const pastRetreats = [
  { name: "Kerala, India", image: "/images-in-use/Retreats/kerala-india.jpeg" },
  { name: "Bali", image: "/images-in-use/Retreats/Bali.jpg" },
  { name: "South of France", image: "/images-in-use/Retreats/south-france.avif" },
  { name: "Greece", image: "/images-in-use/Retreats/greece.avif" },
  { name: "Vietnam", image: "/images-in-use/Retreats/vietnam.avif" },
  { name: "Peru", image: "/images-in-use/Retreats/Peru.jpg" },
  { name: "Nicaragua", image: "/images-in-use/Retreats/nicaragua.avif" },
  { name: "Tanzania", image: "/images-in-use/Retreats/Tanzania.jpg" },
  { name: "Costa Rica", image: "/images-in-use/Retreats/costa-rica.webp" },
  { name: "Florence, Italy", image: "/images-in-use/Retreats/florence-italy.jpg" },
  { name: "Morocco", image: "/images-in-use/Retreats/morocco.jpg" },
  { name: "Belize", image: "/images-in-use/Retreats/belize.jpg" },
  { name: "Galapagos, Ecuador", image: "/images-in-use/Retreats/galapagos-ecuador.jpg" },
  { name: "Windhorse Farm, Canada", image: "/images-in-use/Retreats/windhorse-farm-canada.jpeg" },
  { name: "Palamino, Colombia", image: "/images-in-use/Retreats/colombia.jpg" },
];

const retreatToCountryCode: { [key: string]: string } = {
  "Kerala, India": "in",
  "Bali": "id",
  "South of France": "fr",
  "Greece": "gr",
  "Vietnam": "vn",
  "Peru": "pe",
  "Nicaragua": "ni",
  "Tanzania": "tz",
  "Costa Rica": "cr",
  "Florence, Italy": "it",
  "Morocco": "ma",
  "Belize": "bz",
  "Galapagos, Ecuador": "ec",
  "Windhorse Farm, Canada": "ca",
  "Palamino, Colombia": "co",
};

export default function RetreatsPage() {
  const [activeTab, setActiveTab] = useState<'photos' | 'map'>('photos');

  const visitedCountryCodes = useMemo(() => [
    ...new Set(
      pastRetreats.map((r) => retreatToCountryCode[r.name]).filter(Boolean)
    ),
  ], []);

  return (
    <>
      
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-background via-background to-muted overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4 bg-sage-green/10 text-sage-green border-sage-green/20">
              Join Us On An Adventure
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transform Your Practice{" "}
              <span className="gradient-sage-text">
                Around The World
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Every year we find beautiful destinations to satisfy your sense of adventure, exploration and passion. 
              From the south of India to the Incan ruins of Peru and from the Costa Rican coastline to the Balinese rainforest, 
              we&apos;ve got your wanderlust covered.
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Retreat Section */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-sage-text">Malta</span> 2026
            </h2>

            <p className="text-2xl md:text-3xl font-semibold text-foreground mb-10">
              October 23-26, 2026
            </p>

            <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-8">
              <Image
                src="/images-in-use/malta-3.jpg"
                alt="Malta retreat destination"
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>

            <p className="text-2xl md:text-3xl font-bold text-black">
              SOLD OUT
            </p>
          </div>
        </div>
      </section>

      {/* Past Retreats Section */}
      <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Where We&apos;ve Been{" "}
              <span className="gradient-sage-text">
                Around The World
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We&apos;ve had the privilege of taking yogis on incredible adventures to every corner of the globe. 
              Explore our past retreats through our photo gallery or on the world map.
            </p>
          </div>
          
          <div className="flex justify-center gap-4 mb-8">
            <Button
              variant={activeTab === 'photos' ? 'default' : 'outline'}
              onClick={() => setActiveTab('photos')}
              className={activeTab === 'photos' ? 'gradient-sage text-white' : 'border-2 border-sage-green/30'}
            >
              Photo Gallery
            </Button>
            <Button
              variant={activeTab === 'map' ? 'default' : 'outline'}
              onClick={() => setActiveTab('map')}
              className={activeTab === 'map' ? 'gradient-sage text-white' : 'border-2 border-sage-green/30'}
            >
              Map View
            </Button>
          </div>

          <div className="mt-8">
            {activeTab === 'photos' && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {pastRetreats.map((retreat, index) => (
                  <div key={index} className="relative aspect-square rounded-xl overflow-hidden group">
                    <Image
                      src={retreat.image}
                      alt={`${retreat.name} Retreat`}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold">{retreat.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'map' && (
              <div className="flex justify-center pointer-events-none">
                <div className="max-w-7xl">
                  <PastRetreatsMap visitedCountryCodes={visitedCountryCodes} />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

    </>
  );
} 