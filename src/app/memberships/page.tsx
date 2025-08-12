"use client"

import { MembershipSection } from "@/components/membership-section";
import { IntroOfferSection } from "@/components/intro-offer-section";
import { useHealcodeLoader } from "@/hooks/use-healcode-loader";

export default function MembershipsPage() {
  const { isLoaded } = useHealcodeLoader();

  return (
    <>
      <IntroOfferSection showWidgets={isLoaded} />
      <MembershipSection showWidgets={isLoaded} />
    </>
  );
} 