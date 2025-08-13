import Image from "next/image";
import { HealcodeLink } from "@/components/healcode-link";

// The IntroOfferSection component displays a hero section with a call to action.
export function IntroOfferSection({ showWidgets = true, isLoading = false }: { showWidgets?: boolean; isLoading?: boolean }) {
  return (
    <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center text-white">
      <Image
        src="/images-in-use/08.jpg"
        alt="A person in a yoga pose"
        fill
        sizes="100vw"
        className="absolute inset-0 -z-10 object-cover"
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
            {showWidgets ? (
              <HealcodeLink
                data-version="0.2"
                data-link-class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-lg font-medium gradient-sage hover:opacity-90 text-white px-8 py-4 shadow-lg"
                data-site-id="1889"
                data-mb-site-id="11233"
                data-service-id="1364"
                data-bw-identity-site="false"
                data-type="pricing-link"
                data-inner-html="Buy Intro Pass"
                fallbackHref="https://clients.mindbodyonline.com/classic/ws?studioid=11233&stype=43&prodid=1364"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-lg font-medium gradient-sage hover:opacity-90 text-white px-8 py-4 shadow-lg"
              >
                Buy Intro Pass
              </HealcodeLink>
            ) : isLoading ? (
              <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-lg font-medium gradient-sage hover:opacity-90 text-white px-8 py-4 shadow-lg">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Loading...
              </div>
            ) : (
              <a
                href="https://clients.mindbodyonline.com/classic/ws?studioid=11233&stype=41&sTG=39&prodId=1364"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-lg font-medium gradient-sage hover:opacity-90 text-white px-8 py-4 shadow-lg"
              >
                Buy Intro Pass
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
} 