"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { submitWeb3Form, web3formsKeys } from "@/lib/web3forms";
import { CheckCircle2 } from "lucide-react";

function selectedLabels(
  selections: Record<string, boolean>,
  labels: Record<string, string>
): string {
  return Object.entries(selections)
    .filter(([, value]) => value)
    .map(([key]) => labels[key])
    .join(", ");
}

interface EnergyExchangeFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EnergyExchangeForm({ open, onOpenChange }: EnergyExchangeFormProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    newsletter: false,
    locations: {
      halifax: false,
      dartmouth: false,
      bedford: false
    },
    availability: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false
    },
    shifts: {
      morning: false,
      evening: false,
      anytime: false
    },
    howDidYouHear: "",
    yogaExperience: "",
    programAppeal: "",
    conflicts: "",
    additionalInfo: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const locations = selectedLabels(formData.locations, {
        halifax: "Halifax",
        dartmouth: "Dartmouth",
        bedford: "Bedford",
      });
      const availability = selectedLabels(formData.availability, {
        monday: "Monday",
        tuesday: "Tuesday",
        wednesday: "Wednesday",
        thursday: "Thursday",
        friday: "Friday",
        saturday: "Saturday",
        sunday: "Sunday",
      });
      const shifts = selectedLabels(formData.shifts, {
        morning: "Morning",
        evening: "Evening",
        anytime: "Anytime",
      });

      const result = await submitWeb3Form({
        access_key: web3formsKeys.energyExchange(),
        subject: "New Energy Exchange Application",
        from_name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone,
        newsletter_signup: formData.newsletter ? "Yes" : "No",
        location_preference: locations || "Not specified",
        availability: availability || "Not specified",
        shift_preference: shifts || "Not specified",
        how_did_you_hear: formData.howDidYouHear || "Not answered",
        yoga_experience: formData.yogaExperience || "Not answered",
        program_appeal: formData.programAppeal || "Not answered",
        conflicts: formData.conflicts || "Not answered",
        additional_info: formData.additionalInfo || "Not provided",
      });

      if (result.success) {
        setShowSuccess(true);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          newsletter: false,
          locations: {
            halifax: false,
            dartmouth: false,
            bedford: false,
          },
          availability: {
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false,
          },
          shifts: {
            morning: false,
            evening: false,
            anytime: false,
          },
          howDidYouHear: "",
          yogaExperience: "",
          programAppeal: "",
          conflicts: "",
          additionalInfo: "",
        });
      } else {
        alert(result.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting energy exchange application:", error);
      alert("An error occurred. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    onOpenChange(false);
    setShowSuccess(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {showSuccess ? (
          <>
            <DialogHeader>
              <div className="flex justify-center mb-4">
                <CheckCircle2 className="h-16 w-16 text-green-500" />
              </div>
              <DialogTitle className="text-2xl text-center">Application Submitted Successfully!</DialogTitle>
              <DialogDescription className="text-center text-base">
                Thank you for your interest in our Energy Exchange program. We&apos;ll review your application and get back to you soon.
              </DialogDescription>
            </DialogHeader>

            <div className="py-6 text-center space-y-4">
              <p className="text-muted-foreground">
                If you have any questions or concerns, please don&apos;t hesitate to contact us.
              </p>
              <Button onClick={handleCloseModal} className="gradient-sage text-white">
                Close
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Energy Exchange Application</DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Name */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              />
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone *</Label>
            <Input
              id="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>

          {/* Newsletter Signup */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="newsletter"
              checked={formData.newsletter}
              onCheckedChange={(checked) => setFormData({...formData, newsletter: checked as boolean})}
            />
            <Label htmlFor="newsletter">Sign up for news and updates</Label>
          </div>

          {/* Location Preference */}
          <div className="space-y-3">
            <Label>Location Preference *</Label>
            <div className="space-y-2">
              {Object.entries({
                halifax: "Halifax",
                dartmouth: "Dartmouth",
                bedford: "Bedford"
              }).map(([key, label]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox
                    id={`location-${key}`}
                    checked={formData.locations[key as keyof typeof formData.locations]}
                    onCheckedChange={(checked) => 
                      setFormData({
                        ...formData,
                        locations: {
                          ...formData.locations,
                          [key]: checked as boolean
                        }
                      })
                    }
                  />
                  <Label htmlFor={`location-${key}`}>{label}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="space-y-3">
            <Label>Availability *</Label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries({
                monday: "Monday",
                tuesday: "Tuesday",
                wednesday: "Wednesday",
                thursday: "Thursday",
                friday: "Friday",
                saturday: "Saturday",
                sunday: "Sunday"
              }).map(([key, label]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox
                    id={`day-${key}`}
                    checked={formData.availability[key as keyof typeof formData.availability]}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        availability: {
                          ...formData.availability,
                          [key]: checked as boolean
                        }
                      })
                    }
                  />
                  <Label htmlFor={`day-${key}`}>{label}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Shift Preference */}
          <div className="space-y-3">
            <Label>Shift Preference *</Label>
            <div className="space-y-2">
              {Object.entries({
                morning: "Morning",
                evening: "Evening",
                anytime: "Anytime"
              }).map(([key, label]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox
                    id={`shift-${key}`}
                    checked={formData.shifts[key as keyof typeof formData.shifts]}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        shifts: {
                          ...formData.shifts,
                          [key]: checked as boolean
                        }
                      })
                    }
                  />
                  <Label htmlFor={`shift-${key}`}>{label}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Questionnaire */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="howDidYouHear">How did you hear about the Energy Exchange Program?</Label>
              <Textarea
                id="howDidYouHear"
                value={formData.howDidYouHear}
                onChange={(e) => setFormData({...formData, howDidYouHear: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="yogaExperience">How long have you been practicing yoga?</Label>
              <Textarea
                id="yogaExperience"
                value={formData.yogaExperience}
                onChange={(e) => setFormData({...formData, yogaExperience: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="programAppeal">
                What appeals to you most about the Energy Exchange Program and what do you hope to gain from participating?
              </Label>
              <Textarea
                id="programAppeal"
                value={formData.programAppeal}
                onChange={(e) => setFormData({...formData, programAppeal: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="conflicts">
                Is there anything that may interfere with your Energy Exchange position such as school, work commitments, family obligations, etc.?
              </Label>
              <Textarea
                id="conflicts"
                value={formData.conflicts}
                onChange={(e) => setFormData({...formData, conflicts: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalInfo">
                Tell us anything else about you that you think is interesting, applicable to the job or that you want us to know.
              </Label>
              <Textarea
                id="additionalInfo"
                value={formData.additionalInfo}
                onChange={(e) => setFormData({...formData, additionalInfo: e.target.value})}
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full gradient-sage text-white hover:opacity-90"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </Button>
        </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
} 