"use client"

import { MembershipSection } from "@/components/membership-section";
import { IntroOfferSection } from "@/components/intro-offer-section";
import { useEffect, useState } from "react";

export default function MembershipsPage() {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if ('HealcodeWidget' in window) setScriptLoaded(true);
    let tries = 0;
    const interval = setInterval(() => {
      tries += 1;
      if ('HealcodeWidget' in window) {
        setScriptLoaded(true);
        setScriptError(false);
        clearInterval(interval);
      } else if (tries > 100) {
        setScriptError(true);
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <IntroOfferSection showWidgets={scriptLoaded && !scriptError} />
      <MembershipSection showWidgets={scriptLoaded && !scriptError} />
    </>
  );
} 