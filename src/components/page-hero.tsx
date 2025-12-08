import { Badge } from "@/components/ui/badge";

interface PageHeroProps {
  title: React.ReactNode;
  subtitle?: string;
  badge?: string;
  note?: string;
}

export function PageHero({ title, subtitle, badge, note }: PageHeroProps) {
  return (
    <section className="relative py-24 bg-gradient-to-br from-background via-background to-muted overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {badge && (
            <Badge variant="secondary" className="mb-4 bg-sage-green/10 text-sage-green border-sage-green/20">
              {badge}
            </Badge>
          )}
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl text-muted-foreground mb-8">
              {subtitle}
            </p>
          )}
          {note && (
            <p className="text-gray-500 italic">
              {note}
            </p>
          )}
        </div>
      </div>
    </section>
  );
} 