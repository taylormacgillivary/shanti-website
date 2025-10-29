"use client"

import { HeroSectionVideo } from "@/components/hero-section-video";
import { StudiosSection } from "@/components/studios-section";
import { TeachersSection } from "@/components/teachers-section";
import { IntroPassSection } from "@/components/intro-pass-section";

export default function Home() {
  return (
    <>
      <HeroSectionVideo />
      <StudiosSection />
      <IntroPassSection />
      <TeachersSection />
    </>
  );
}
