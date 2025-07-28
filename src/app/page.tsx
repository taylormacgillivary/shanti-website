"use client"

import { HeroSection } from "@/components/hero-section";
import { StudiosSection } from "@/components/studios-section";
import { TeachersSection } from "@/components/teachers-section";
import { IntroPassSection } from "@/components/intro-pass-section";
import Script from "next/script";

export default function Home() {
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
      <HeroSection />
      <StudiosSection />
      <IntroPassSection />
      <TeachersSection />
    </>
  );
}
