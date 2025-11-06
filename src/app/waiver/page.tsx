"use client"

import { useEffect } from "react";
import { PageHero } from "@/components/page-hero";

export default function WaiverPage() {
  useEffect(() => {
    // Load the Mindbody HealCode script
    const script = document.createElement("script");
    script.src = "https://widgets.mindbodyonline.com/javascripts/healcode.js";
    script.type = "text/javascript";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <>
      <PageHero
        title={<>Create Your <span className="gradient-sage-text">Profile</span></>}
      />
      
      <section className="py-12 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div 
            className="max-w-4xl mx-auto"
            dangerouslySetInnerHTML={{
              __html: `<healcode-widget data-type="registrations" data-widget-partner="object" data-widget-id="6814457985be" data-widget-version="0"></healcode-widget>`
            }}
          />
        </div>
      </section>
    </>
  );
}

