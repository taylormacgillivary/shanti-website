import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-hero";

const workshops = [
  {
    title: "Ashtanga: Deconstructing the Primary Series",
    description: "Whether you are already an Ashtanga Yoga practitioner or not, this course will shed light over the key elements to focus on while learning the Primary Series. It is ideal for people who are interested in building a sustainable personal practice or returning to it.",
    location: "Bedford",
    dates: [
      "September 19-21st",
      "Friday, 5:30-7:30pm",
      "Saturday, 9:30-11:30am, 12:30-2:30pm",
      "Sunday, 9:30-11:30am, 12:30-2:30pm"
    ],
    image: "/workshops/ashtanga.jpg",
    certification: "10 Hours CE credits with the Yoga Alliance",
    featured: true
  },
  {
    title: "Yang-Yin Summer Solstice Celebration",
    description: "Join Amanda Greenwood for a Summer Solstice Celebration. In this popup class, we will celebrate the Sun and the longest day of the year by stoking our own internal fire - our Agni! We will honour this day with movement and breath to strengthen Agni, build power and stamina, while burning up all we wish to let go, as we enter the season of fire.",
    location: "Dartmouth",
    dates: ["June 20th", "7-8:30pm"],
    image: "/workshops/solstice.jpg"
  },
  {
    title: "Myofascial Release and Yoga Movement",
    instructor: "Stephanie Morton",
    description: "This workshop will combine self-MFR techniques within a flowing yoga practice to increase flexibility, enhance recovery and promote healing and rest. All props will be included. Myofascial release has a wide range of benefits for both athletes and the general population.",
    location: "Bedford",
    dates: ["June 7th", "4:00-5:30pm"],
    image: "/workshops/myofascial.jpg"
  },
  {
    title: "Mysore Ashtanga Practice",
    instructor: "Andrea Gracia",
    description: "Mysore Style is the traditional way of teaching the Ashtanga Vinyasa Yoga once the student has familiarity with the Sun Salutations and primary series. In this practice you will receive personal attention from Andrea Gracia, an Authorized Level 1 Ashtanga Yoga Teacher.",
    location: "Bedford",
    dates: ["Starts June 12th", "5:45 - 7:15pm"],
    duration: "6 Week Program",
    image: "/workshops/mysore.jpg"
  }
];

export default function WorkshopsPage() {
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
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={workshop.image}
                  alt={workshop.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                
                {/* Location Badge */}
                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-xl">
                  <div className="text-center">
                    <div className="text-lg font-bold text-sage-green">{workshop.location}</div>
                    <div className="text-sm text-muted-foreground">{workshop.dates[0]}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <Badge variant="secondary" className="mb-4 bg-sage-green/10 text-sage-green border-sage-green/20">
                  Featured Workshop
                </Badge>

                <h2 className="text-4xl font-bold">
                  {workshop.title}
                </h2>

                <p className="text-xl text-muted-foreground leading-relaxed">
                  {workshop.description}
                </p>

                <div className="space-y-2">
                  {workshop.dates.map((date, i) => (
                    <div key={i} className="text-muted-foreground">
                      {date}
                    </div>
                  ))}
                </div>

                {workshop.certification && (
                  <div className="text-sage-green font-medium">
                    {workshop.certification}
                  </div>
                )}

                <Button 
                  asChild
                  className="gradient-sage text-white hover:opacity-90 shadow-lg"
                >
                  <a
                    href="https://clients.mindbodyonline.com/classic/mainclass?studioid=11233"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Register Now
                  </a>
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
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg">
                <div className="aspect-[3/2] relative">
                  <Image
                    src={workshop.image}
                    alt={workshop.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-gray-900 backdrop-blur-sm">
                      {workshop.location}
                    </Badge>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-bold">{workshop.title}</h3>
                  {workshop.instructor && (
                    <p className="text-sage-green font-medium">with {workshop.instructor}</p>
                  )}
                  <p className="text-muted-foreground">{workshop.description}</p>
                  <div className="space-y-1">
                    {workshop.dates.map((date, i) => (
                      <div key={i} className="text-sm text-muted-foreground">
                        {date}
                      </div>
                    ))}
                    {workshop.duration && (
                      <div className="text-sm font-medium text-sage-green">
                        {workshop.duration}
                      </div>
                    )}
                  </div>
                  <Button 
                    asChild
                    className="w-full gradient-sage text-white hover:opacity-90"
                  >
                    <a
                      href="https://clients.mindbodyonline.com/classic/mainclass?studioid=11233"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Register Now
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
} 