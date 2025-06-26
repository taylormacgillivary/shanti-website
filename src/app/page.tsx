import { HeroSection } from "@/components/hero-section";
import { StudiosSection } from "@/components/studios-section";
import { TeachersSection } from "@/components/teachers-section";
import { IntroPassSection } from "@/components/intro-pass-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <StudiosSection />
      <IntroPassSection />
      <TeachersSection />
    </>
  );
}
