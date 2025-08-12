"use client"

import { MembershipSection } from "@/components/membership-section";
import { IntroOfferSection } from "@/components/intro-offer-section";
import { useEffect, useState } from "react";

export default function MembershipsPage() {
  const [isClient, setIsClient] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    if (typeof window !== 'undefined' && 'HealcodeWidget' in window) {
      setScriptLoaded(true);
      return;
    }
    
    let tries = 0;
    const interval = setInterval(() => {
      tries += 1;
      if (typeof window !== 'undefined' && 'HealcodeWidget' in window) {
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

  const showWidgets = isClient && scriptLoaded && !scriptError;

  return (
    <>
      <IntroOfferSection showWidgets={showWidgets} />
      <MembershipSection showWidgets={showWidgets} />
    </>
  );
} 