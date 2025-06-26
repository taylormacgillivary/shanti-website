import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function TeachersSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Column */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/May-18-2022/YogaShantiMay2022-103.jpg"
              alt="Yoga class with experienced teachers"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>

          {/* Content Column */}
          <div className="space-y-6">
            <Badge variant="secondary" className="mb-4 bg-sage-green/10 text-sage-green border-sage-green/20">
              Receive gentle guidance
            </Badge>

            <h2 className="text-4xl md:text-5xl font-bold">
              With experienced teachers you can{" "}
              <span className="gradient-sage-text">
                trust
              </span>
            </h2>

            <p className="text-xl text-muted-foreground leading-relaxed">
              Each of our registered yoga teachers have gone through certified training programs, specializing in a
              variety of different practices including Hatha, Vinyasa, Ashtanga, and Yin. At Shanti, we provide
              guidance for all levels of practice so you can decide what feels best for your body.
            </p>

            <Button 
              asChild
              variant="outline" 
              size="lg" 
              className="mt-8 border-2 border-sage-green/30 hover:bg-sage-green/5 text-foreground"
            >
              <Link href="/teachers">
                Meet your teachers
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
} 