import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";
import { ContactDetails } from "@/components/contact-details";

export default function ContactPage() {
  return (
    <>
      <PageHero
        title={<>Contact <span className="gradient-sage-text">Us</span></>}
        subtitle="We're here to help. Reach out to us with any questions."
      />
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <h2 className="text-2xl font-bold">Our Studios</h2>
              <p className="mt-2 text-muted-foreground">
                Find us at any of our three locations.
              </p>
              <div className="mt-8">
                <ContactDetails />
              </div>
            </div>
            <div className="md:pl-12 md:border-l">
              <h2 className="text-2xl font-bold">Send us a message</h2>
              <p className="mt-2 text-muted-foreground">
                Have questions about our classes, memberships, or anything else? Let us know!
              </p>
              <ContactForm className="mt-8" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 