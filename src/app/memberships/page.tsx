"use client"

import { MembershipSection } from "@/components/membership-section";
import { IntroOfferSection } from "@/components/intro-offer-section";
import { useHealcodeLoader } from "@/hooks/use-healcode-loader";

export default function MembershipsPage() {
  const { isLoaded, isLoading } = useHealcodeLoader();

  return (
    <>
      <IntroOfferSection showWidgets={isLoaded} isLoading={isLoading} />
      <MembershipSection showWidgets={isLoaded} isLoading={isLoading} />
    </>
  );
} 