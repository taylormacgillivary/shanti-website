import Image from "next/image";

// The IntroOfferSection component displays a hero section with a call to action.
export function IntroOfferSection() {
  return (
    <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center text-white">
      <Image
        src="/Alexa-Photos/39.jpg"
        alt="A person in a yoga pose"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 -z-10"
      />
      <div className="absolute inset-0 bg-black/60 -z-10" />
      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Your First Two Weeks for Only $39
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto">
            Our aim is to serve you and what you need. We have teachers of all different backgrounds and trainings, and offer classes across the wide spectrum of yoga. Try them all with your intro pass and find what you love.
          </p>
          <div className="mt-8">
            {/* @ts-expect-error - Mindbody widget */}
            <healcode-widget
              data-version="0.2"
              data-link-class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-lg font-medium gradient-sage hover:opacity-90 text-white px-8 py-4 shadow-lg"
              data-site-id="1889"
              data-mb-site-id="11233"
              data-service-id="1364"
              data-bw-identity-site="false"
              data-type="pricing-link"
              data-inner-html="Buy Intro Pass"
            />
          </div>
        </div>
      </div>
    </section>
  );
} 