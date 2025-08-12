"use client"

import { MembershipSection } from "@/components/membership-section";
import { IntroOfferSection } from "@/components/intro-offer-section";
import { useHealcode } from "@/hooks/use-healcode";

export default function MembershipsPage() {
  const { isReady, hasError } = useHealcode();
  const showWidgets = isReady && !hasError;

  return (
    <>
      <IntroOfferSection showWidgets={showWidgets} />
      <MembershipSection showWidgets={showWidgets} />
    </>
  );
} 