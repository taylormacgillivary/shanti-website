import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
];

export default function RetreatsPage() {
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Column */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images-in-use/Retreats/colombia.jpg"
                alt="Palamino, Colombia Retreat"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              
              {/* Date Badge */}
              <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-xl">
                <div className="text-center">
                  <div className="text-lg font-bold text-sage-green">Feb 28 - Mar 7</div>
                  <div className="text-sm text-muted-foreground">2025</div>
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className="space-y-6">
              <Badge variant="secondary" className="mb-4 bg-sage-green/10 text-sage-green border-sage-green/20">
                Winter 2025
              </Badge>

              <h2 className="text-4xl md:text-5xl font-bold">
                Palamino,{" "}
                <span className="gradient-sage-text">
                  Colombia
                </span>
              </h2>

              <p className="text-xl text-muted-foreground leading-relaxed">
                Join us for an unforgettable yoga retreat in the beautiful coastal town of Palamino, Colombia.
                Only a few spots remain for this transformative experience.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  asChild
                  className="gradient-sage text-white hover:opacity-90 shadow-lg"
                >
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Secure Your Spot
                  </a>
                </Button>
                <Button 
                  asChild
                  variant="outline"
                  className="border-2 border-sage-green/30 hover:bg-sage-green/5"
                >
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Download Info Package
                  </a>
                </Button>
              </div>
            </div>
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
              From the jungles of India to the savannahs of Tanzania and the mountain peaks of Peru, 
              we&apos;ve sought out places that bring your spirit to life.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {pastRetreats.map((retreat, index) => (
              <div key={index} className="relative aspect-square rounded-xl overflow-hidden group">
                <Image
                  src={retreat.image}
                  alt={`${retreat.name} Retreat`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{retreat.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Stay in the loop</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Sign up with your email address to receive news and updates about our upcoming retreats.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-6 py-3 rounded-lg border-2 border-sage-green/30 focus:outline-none focus:border-sage-green"
              />
              <Button className="gradient-sage text-white hover:opacity-90">
                Sign Up
              </Button>
            </form>
          </div>
        </div>
      </section>

    </>
  );
} 