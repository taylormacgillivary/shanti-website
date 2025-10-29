export function JoinCommunityCTA() {
  return (
    <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center p-8 bg-gradient-to-r from-sage-green/5 to-primary/5 rounded-2xl border border-sage-green/10">
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

