"use client";

import { Button } from "@/components/ui/button";
import { EnergyExchangeForm } from "@/components/energy-exchange-form";
import { useState } from "react";

export default function EnergyExchangePage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-background via-background to-muted overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Energy{" "}
              <span className="gradient-sage-text">
                Exchange
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Join our community and practice yoga in exchange for your time and energy.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="prose prose-lg mx-auto text-center">
              <p>
                Our Energy Exchange Program is at the heart of our studios, and creates the backbone of the Shanti experience. 
                We offer yoga practice in exchange for time spent keeping the studio tidy and looking fresh. This includes 
                general cleaning and helping out around the studio when classes are busy.
              </p>
              <p>
                Each shift is four hours, and for each shift completed you receive one week of unlimited practice. We have 
                permanent shifts, as well as float shifts for those who want to help out here and there at their convenience.
              </p>
              <p className="font-medium">
                We&apos;re looking for people who will take their Energy Exchange seriously – just like any other job. We want to 
                build relationships with our trades based on trust, communication, compassion and commitment. Applicants should 
                therefore be willing to commit to a minimum of 3 months of participation in this program.
              </p>
            </div>

            <div className="flex justify-center pt-8">
              <Button 
                size="lg"
                className="gradient-sage text-white hover:opacity-90"
                onClick={() => setIsFormOpen(true)}
              >
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Form Dialog */}
      <EnergyExchangeForm open={isFormOpen} onOpenChange={setIsFormOpen} />

    </>
  );
} 