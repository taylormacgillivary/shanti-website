"use client"

import { MembershipSection } from "@/components/membership-section";
import { IntroOfferSection } from "@/components/intro-offer-section";
import Script from "next/script";

export default function MembershipsPage() {
  return (
    <>
      <Script
        src="https://widgets.mindbodyonline.com/javascripts/healcode.js"
        type="text/javascript"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('Healcode script loaded successfully');
        }}
        onError={(e) => {
          console.error('Error loading healcode script:', e);
        }}
      />
      <IntroOfferSection />
      <MembershipSection />
    </>
  );
} 