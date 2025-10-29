"use client"

import { HeroSectionVideo } from "@/components/hero-section-video";
import { StudiosSection } from "@/components/studios-section";
import { TeachersSection } from "@/components/teachers-section";
import { IntroPassSection } from "@/components/intro-pass-section";
import { CommunityVideoSection } from "@/components/community-video-section";
import { JoinCommunityCTA } from "@/components/join-community-cta";

export default function Home() {
  return (
    <>
      <HeroSectionVideo />
      <StudiosSection />
      <IntroPassSection />
      <CommunityVideoSection />
      <TeachersSection />
      <JoinCommunityCTA />
    </>
  );
}
