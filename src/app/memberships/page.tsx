"use client"

import { MembershipSection } from "@/components/membership-section";
import { IntroOfferSection } from "@/components/intro-offer-section";
import Script from "next/script";
import { useEffect, useState } from "react";

export default function MembershipsPage() {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'HealcodeWidget' in window) {
      setScriptLoaded(true);
    }
  }, []);

  return (
    <>
      <Script
        src="https://widgets.mindbodyonline.com/javascripts/healcode.js"
        type="text/javascript"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('Healcode script loaded successfully');
          setScriptLoaded(true);
          setScriptError(false);
        }}
        onError={(e) => {
          console.error('Error loading healcode script:', e);
          setScriptError(true);
        }}
      />
      <IntroOfferSection showWidgets={scriptLoaded && !scriptError} />
      <MembershipSection showWidgets={scriptLoaded && !scriptError} />
    </>
  );
} 