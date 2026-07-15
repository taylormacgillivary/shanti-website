"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitYinTrainingApplication } from "@/app/actions/yin-training";
import { CheckCircle2 } from "lucide-react";

const initialFormData = {
  name: "",
  email: "",
  contactNumber: "",
  emergencyName: "",
  emergencyContact: "",
  emergencyRelationship: "",
  whyYinTraining: "",
  yinExperience: "",
  describeYinYoga: "",
  currentPractice: "",
};

export function YinTrainingApplication() {
  const [open, setOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await submitYinTrainingApplication(formData);

      if (result.success) {
        setShowSuccess(true);
        setFormData(initialFormData);
      } else {
        alert(result.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting yin training application:", error);
      alert("An error occurred. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      setShowSuccess(false);
    }
  };

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <div className="flex justify-center mt-8">
        <Button
          size="lg"
          className="gradient-sage text-white hover:opacity-90 text-lg px-10 py-5 h-auto font-semibold shadow-lg"
          onClick={() => setOpen(true)}
        >
          Complete Your Application
        </Button>
      </div>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {showSuccess ? (
            <>
              <DialogHeader>
                <div className="flex justify-center mb-4">
                  <CheckCircle2 className="h-16 w-16 text-green-500" />
                </div>
                <DialogTitle className="text-2xl text-center">
                  Application Submitted Successfully!
                </DialogTitle>
                <DialogDescription className="text-center text-base">
                  Thank you for applying to the Yin Yoga Teacher Training. We&apos;ve
                  received your application and will be in touch soon.
                </DialogDescription>
              </DialogHeader>

              <div className="py-6 text-center space-y-4">
                <p className="text-muted-foreground">
                  If you have any questions, please don&apos;t hesitate to contact us.
                </p>
                <Button
                  onClick={() => handleOpenChange(false)}
                  className="gradient-sage text-white"
                >
                  Close
                </Button>
              </div>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  Yin Yoga Teacher Training Application
                </DialogTitle>
                <DialogDescription>
                  Please complete all fields below to apply for the training.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-6 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactNumber">Contact Number *</Label>
                  <Input
                    id="contactNumber"
                    type="tel"
                    required
                    value={formData.contactNumber}
                    onChange={(e) => updateField("contactNumber", e.target.value)}
                  />
                </div>

                <div className="space-y-4 rounded-lg border border-stone-200 p-4">
                  <p className="text-sm font-semibold text-stone-800">
                    Emergency Contact *
                  </p>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyName">Name</Label>
                    <Input
                      id="emergencyName"
                      required
                      value={formData.emergencyName}
                      onChange={(e) => updateField("emergencyName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContact">Contact Number</Label>
                    <Input
                      id="emergencyContact"
                      type="tel"
                      required
                      value={formData.emergencyContact}
                      onChange={(e) =>
                        updateField("emergencyContact", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyRelationship">Relationship</Label>
                    <Input
                      id="emergencyRelationship"
                      required
                      placeholder="e.g. Partner, Parent, Friend"
                      value={formData.emergencyRelationship}
                      onChange={(e) =>
                        updateField("emergencyRelationship", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whyYinTraining">
                    Why are you wanting to take the yin training? *
                  </Label>
                  <Textarea
                    id="whyYinTraining"
                    required
                    rows={4}
                    value={formData.whyYinTraining}
                    onChange={(e) => updateField("whyYinTraining", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="yinExperience">
                    What is your experience with yin? (e.g. personal practice) *
                  </Label>
                  <Textarea
                    id="yinExperience"
                    required
                    rows={4}
                    value={formData.yinExperience}
                    onChange={(e) => updateField("yinExperience", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="describeYinYoga">
                    In your own words, describe what yin yoga is. *
                  </Label>
                  <Textarea
                    id="describeYinYoga"
                    required
                    rows={4}
                    value={formData.describeYinYoga}
                    onChange={(e) => updateField("describeYinYoga", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentPractice">
                    Are you currently teaching yoga / a body worker / have an
                    established yoga practice? *
                  </Label>
                  <Textarea
                    id="currentPractice"
                    required
                    rows={4}
                    value={formData.currentPractice}
                    onChange={(e) => updateField("currentPractice", e.target.value)}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full gradient-sage text-white hover:opacity-90"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
