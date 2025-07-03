import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Star } from "lucide-react";
import Image from "next/image";

const studios = [
  {
    id: "halifax",
    name: "Shanti Halifax",
    location: "Downtown Halifax",
    description: "Through the summer of 2015 we worked night and day to find local creators and craftspeople to build our central studio in Downtown Halifax and expand our community to the bustling energy of the diverse downtown core.",
    image: "https://images.squarespace-cdn.com/content/v1/673f8221417d512fe9887ee8/1732215365346-Q728J2VMG3QEE8DLX537/Halifax%2B1.jpg",
    features: ["Downtown Location", "Largest Studio", "Premium Amenities"],
    established: "2015"
  },
  {
    id: "bedford",
    name: "Shanti Bedford",
    location: "Bedford",
    description: "In 2013 we decided to expand our community to Bedford. As the Yoga community in Halifax had few choices around the city, we aimed to bridge the gap in the Halifax.",
    image: "https://images.squarespace-cdn.com/content/v1/673f8221417d512fe9887ee8/1732215365354-SS65BOZYTUV1H789DX88/Bedford1.jpg",
    features: ["Community Focus", "Welcoming Environment", "Convenient Location"],
    established: "2013"
  },
  {
    id: "dartmouth",
    name: "Shanti Dartmouth",
    location: "Dartmouth",
    description: "Where it all started. Opening in 2010 and building a yoga community that has been together 11 years strong and always striving for growth.",
    image: "https://images.squarespace-cdn.com/content/v1/673f8221417d512fe9887ee8/1732215365350-3VTMTFPQXCSH4KFD4Q44/Dartmouth2.jpg",
    features: ["Original Studio", "Established Community", "Rich History"],
    established: "2010"
  }
];

export function StudiosSection() {
  return (
    <section id="studios" className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-sage-green/10 text-sage-green border-sage-green/20">
            Our Studios
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Three Locations,{" "}
            <span className="gradient-sage-text">
              One Community
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your membership grants you access to all three of our beautiful studios across Halifax, Bedford, and Dartmouth. 
            Each location has its own unique character while maintaining the same high-quality hot yoga experience.
          </p>
        </div>

        {/* Studios Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {studios.map((studio) => (
            <Card key={studio.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white">
              <div className="relative overflow-hidden h-64">
                <Image
                  src={studio.image}
                  alt={studio.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 text-gray-900 backdrop-blur-sm border-sage-green/20">
                    <MapPin className="w-3 h-3 mr-1" />
                    {studio.location}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-sage-green/10 text-sage-green border-sage-green/20">
                    Est. {studio.established}
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-foreground">{studio.name}</CardTitle>
                <CardDescription className="text-base leading-relaxed text-muted-foreground">
                  {studio.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 text-sage-green" />
                    <span>{studio.location}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {studio.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-sage-green/20 text-sage-green">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-4 pt-2">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Users className="w-4 h-4 text-sage-green" />
                      <span>Community</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>5.0</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-sage-green/5 to-primary/5 rounded-2xl border border-sage-green/10">
          <h3 className="text-2xl font-bold mb-4">Ready to Join Our Community?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Start your hot yoga journey today and experience the transformative power of our practice across all three locations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/schedule"
              className="inline-flex items-center justify-center px-8 py-3 gradient-sage text-white font-medium rounded-lg hover:opacity-90 transition-all duration-200 shadow-lg"
            >
              Book Your First Class
            </a>
            <a
              href="/memberships"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-sage-green/30 text-foreground font-medium rounded-lg hover:bg-sage-green/5 transition-all duration-200"
            >
              View Memberships
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 