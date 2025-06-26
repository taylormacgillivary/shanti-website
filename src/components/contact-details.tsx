import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation } from "lucide-react";

const studios = [
  {
    id: "halifax",
    name: "Shanti Halifax",
    address: "5508 Spring Garden Road, Halifax, NS B3J 1G5",
    gmapsUrl: "https://www.google.com/maps/search/?api=1&query=Shanti+Hot+Yoga+Halifax"
  },
  {
    id: "bedford",
    name: "Shanti Bedford",
    address: "620 Nine Mile Drive, Bedford, NS B4A 4H9",
    gmapsUrl: "https://www.google.com/maps/search/?api=1&query=Shanti+Hot+Yoga+Bedford"
  },
  {
    id: "dartmouth",
    name: "Shanti Dartmouth",
    address: "114 Woodlawn Road, Dartmouth, NS B2W 2S7",
    gmapsUrl: "https://www.google.com/maps/search/?api=1&query=Shanti+Hot+Yoga+Dartmouth"
  }
];

export function ContactDetails() {
  return (
    <div className="space-y-8">
      {studios.map((studio) => (
        <Card key={studio.id}>
          <CardHeader>
            <CardTitle>{studio.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-4">
              <MapPin className="h-5 w-5 mt-1 text-muted-foreground" />
              <p className="text-muted-foreground">{studio.address}</p>
            </div>
            <Button asChild className="gradient-sage text-white hover:opacity-90">
              <a href={studio.gmapsUrl} target="_blank" rel="noopener noreferrer">
                <Navigation className="mr-2 h-4 w-4" />
                Get Directions
              </a>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 