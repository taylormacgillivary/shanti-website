import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PageHero } from "@/components/page-hero";

export default function ShantiOnlinePage() {
  return (
    <>
      <PageHero
        badge="Your Virtual Studio"
        title={<>Welcome to <span className="gradient-sage-text">Shanti Online</span></>}
        subtitle="We&apos;ve got something for everyone. Whether you&apos;re looking for a yoga practice that will melt your muscles and let you sleep like a baby, or one that makes for shaky legs and a puddle of sweat, you&apos;re in the right place."
      />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto mb-8">
          <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/u_lhlGWuuTs"
              title="This is Shanti Yoga Online"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <a 
              href="https://namastream.com/shantihotyoga/account/login" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center justify-center px-8 py-3 gradient-sage text-white font-medium rounded-lg hover:opacity-90 transition-all duration-200 shadow-lg"
            >
              Log In Here
            </a>
            <a 
              href="https://namastream.com/shantihotyoga/buy/product/4383" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center justify-center px-8 py-3 gradient-sage text-white font-medium rounded-lg hover:opacity-90 transition-all duration-200 shadow-lg"
            >
              Join Now
            </a>
        </div>

        <h2 className="text-3xl font-bold text-center mb-4 mt-8">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto">
          <AccordionItem value="item-1">
            <AccordionTrigger>HOW DO I CREATE AN ACCOUNT?</AccordionTrigger>
            <AccordionContent>
              Really simple! You can click <a href="https://namastream.com/shantihotyoga/buy/product/4383" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">HERE</a> and you&apos;ll be redirected to our online platform through Namastream. When you select the Monthly Membership to purchase, you&apos;ll be led through creating an account and completing the setup for your two week free trial.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>WHY DO I HAVE TO PROVIDE CREDIT CARD INFO?</AccordionTrigger>
            <AccordionContent>
              Credit card info is required to create an account because your membership is a monthly subscription that renews automatically each month.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>WHEN AND HOW DO I CANCEL MY SUBSCRIPTION?</AccordionTrigger>
            <AccordionContent>
              You can cancel your membership anytime. Even though credit card info is required to create your account, you are not obliged to carry your membership past your free trial. To cancel your subscription, go to the <strong>My Settings</strong> in your Namastream account, scroll down to the <strong>Subscriptions</strong> section, and then click on box icon to the right of your membership. A drop down menu will appear with an option to cancel.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
} 