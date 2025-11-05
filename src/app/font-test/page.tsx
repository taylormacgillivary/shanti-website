"use client"

import { HeroSectionVideo } from "@/components/hero-section-video";
import { StudiosSection } from "@/components/studios-section";
import { TeachersSection } from "@/components/teachers-section";
import { IntroPassSection } from "@/components/intro-pass-section";
import { CommunityVideoSection } from "@/components/community-video-section";
import { JoinCommunityCTA } from "@/components/join-community-cta";
import { Playfair_Display, Inter } from "next/font/google";

// Test fonts - Elegant serif for headings, clean sans-serif for body
const playfairDisplay = Playfair_Display({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function FontTest() {
  return (
    <div className={inter.className}>
      <style jsx global>{`
        /* Apply Playfair Display to all headings with custom kerning */
        h1, h2, h3, h4, h5, h6 {
          font-family: ${playfairDisplay.style.fontFamily};
          letter-spacing: 0.05em; /* 5% kerning for headings */
          font-style: italic;
        }
        
        /* Body text uses Inter with subtle kerning */
        p, span, a, button, div {
          font-family: ${inter.style.fontFamily};
          letter-spacing: 0.01em; /* 1% kerning for better readability */
        }
        
        /* Specific adjustments for larger headings */
        h1 {
          letter-spacing: 0.08em; /* 8% kerning for hero text */
        }
        
        h2 {
          letter-spacing: 0.06em; /* 6% kerning */
        }
        
        h3, h4 {
          letter-spacing: 0.05em; /* 5% kerning */
        }
      `}</style>
      
      <HeroSectionVideo />
      <StudiosSection />
      <IntroPassSection />
      <CommunityVideoSection />
      <TeachersSection />
      <JoinCommunityCTA />
    </div>
  );
}

