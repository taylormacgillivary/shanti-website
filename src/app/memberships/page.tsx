import { MembershipSection } from "@/components/membership-section";
import { IntroOfferSection } from "@/components/intro-offer-section";
import Script from "next/script";

export default function MembershipsPage() {
  return (
    <>
      <Script
        src="https://widgets.mindbodyonline.com/javascripts/healcode.js"
        type="text/javascript"
      />
      <IntroOfferSection />
      <MembershipSection />
    </>
  );
} 