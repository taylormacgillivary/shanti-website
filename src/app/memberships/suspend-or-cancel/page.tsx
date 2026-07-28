"use client"

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { submitSuspendRequest } from "@/app/actions/membership";
import { CheckCircle2 } from "lucide-react";

export default function SuspendOrCancelPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<"suspend" | "cancel" | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setSelectedOption(null);
    setShowSuccess(false);
  };

  const handleSelectOption = (option: "suspend" | "cancel") => {
    setSelectedOption(option);
  };

  const handleBack = () => {
    setSelectedOption(null);
    setShowSuccess(false);
  };

  const handleSuccess = () => {
    setShowSuccess(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOption(null);
    setShowSuccess(false);
  };

  return (
    <>
      {/* Hero Section with Image */}
      <section className="relative py-24 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images-in-use/08.jpg"
            alt="Shanti Hot Yoga"
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay for better text visibility */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Suspend or Cancel Your <span className="gradient-sage-text">Membership</span>
            </h1>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg text-muted-foreground mb-8">
              We understand that life happens. If you need to take a break or end your membership, we&apos;re here to help.
            </p>
            <Button 
              onClick={handleOpenModal}
              size="lg"
              className="gradient-sage text-white px-8 py-4 text-lg"
            >
              Suspend or Cancel Your Membership
            </Button>
          </div>
        </div>
      </section>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {showSuccess ? (
            <SuccessMessage onClose={handleCloseModal} type={selectedOption || "suspend"} />
          ) : !selectedOption ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">Manage Your Membership</DialogTitle>
                <DialogDescription>
                  Please select whether you&apos;d like to suspend or cancel your membership.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <Button
                  onClick={() => handleSelectOption("suspend")}
                  variant="outline"
                  className="h-auto py-6 flex flex-col items-start text-left"
                >
                  <span className="font-semibold text-lg mb-2">Suspend Your Membership</span>
                  <span className="text-sm text-muted-foreground font-normal">
                    Take a temporary break from your membership (30-60 days)
                  </span>
                </Button>

                <Button
                  onClick={() => handleSelectOption("cancel")}
                  variant="outline"
                  className="h-auto py-6 flex flex-col items-start text-left"
                >
                  <span className="font-semibold text-lg mb-2">Cancel Your Membership</span>
                  <span className="text-sm text-muted-foreground font-normal">
                    Permanently end your membership
                  </span>
                </Button>
              </div>
            </>
          ) : selectedOption === "suspend" ? (
            <SuspendForm onBack={handleBack} onSuccess={handleSuccess} />
          ) : (
            <CancelUnavailableMessage onBack={handleBack} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function SuccessMessage({ onClose, type }: { onClose: () => void; type: "suspend" | "cancel" }) {
  return (
    <>
      <DialogHeader>
        <div className="flex justify-center mb-4">
          <CheckCircle2 className="h-16 w-16 text-green-500" />
        </div>
        <DialogTitle className="text-2xl text-center">Request Submitted Successfully!</DialogTitle>
        <DialogDescription className="text-center text-base">
          {type === "suspend" 
            ? "Your membership suspension request has been received. We&apos;ll process your request and send you a confirmation email shortly."
            : "Your membership cancellation request has been received. We&apos;ll process your request and send you a confirmation email shortly."}
        </DialogDescription>
      </DialogHeader>

      <div className="py-6 text-center space-y-4">
        <p className="text-muted-foreground">
          If you have any questions or concerns, please don&apos;t hesitate to contact us.
        </p>
        <Button onClick={onClose} className="gradient-sage text-white">
          Close
        </Button>
      </div>
    </>
  );
}

function SuspendForm({ onBack, onSuccess }: { onBack: () => void; onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    acknowledgeFee: false,
    reason: "",
    startDate: "",
    numberOfDays: "",
    additionalInfo: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await submitSuspendRequest(formData);
      
      if (result.success) {
        onSuccess();
      } else {
        alert(result.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting suspend form:", error);
      alert("An error occurred. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <DialogHeader>
        <Button variant="ghost" onClick={onBack} className="w-fit mb-2">
          ← Back
        </Button>
        <DialogTitle className="text-2xl">Suspend Your Membership</DialogTitle>
        <DialogDescription>
          As a Member, you are entitled to one suspension every calendar year. All suspensions must be a minimum of 30 days, and a maximum of 60 days. An administration fee of $25 is charged for all membership suspensions.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-6 py-4">
        <div className="space-y-4">
          <p className="font-semibold">
            We require a minimum of 5 business days notice to suspend a membership for the requested date.
          </p>
          <p className="font-semibold">
            After submitting the suspension form below, you will be redirected to a page that confirms that the suspension request has been received. If you are not redirected to this confirmation page, your request has not been received.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              required
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              required
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label className="font-semibold">
            I acknowledge that suspending my membership carries a $25 administration fee *
          </Label>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="acknowledgeFee"
              required
              checked={formData.acknowledgeFee}
              onCheckedChange={(checked) => 
                setFormData({ ...formData, acknowledgeFee: checked as boolean })
              }
            />
            <Label htmlFor="acknowledgeFee" className="font-normal">
              Yes, I acknowledge this
            </Label>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="reason">Reason for membership suspension *</Label>
          <Textarea
            id="reason"
            required
            value={formData.reason}
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="startDate">Suspension Start Date *</Label>
          <Input
            id="startDate"
            type="date"
            required
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="numberOfDays">Number of days you would like to suspend your membership *</Label>
          <Input
            id="numberOfDays"
            type="number"
            min="30"
            max="60"
            required
            value={formData.numberOfDays}
            onChange={(e) => setFormData({ ...formData, numberOfDays: e.target.value })}
            placeholder="Enter a number between 30 and 60"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="additionalInfo">Anything else we need to know?</Label>
          <Textarea
            id="additionalInfo"
            value={formData.additionalInfo}
            onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
            rows={4}
          />
        </div>

        <Button 
          type="submit" 
          className="w-full gradient-sage text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </>
  );
}

function CancelUnavailableMessage({ onBack }: { onBack: () => void }) {
  return (
    <>
      <DialogHeader>
        <Button variant="ghost" onClick={onBack} className="w-fit mb-2">
          ← Back
        </Button>
        <DialogTitle className="text-2xl">Cancel Your Membership</DialogTitle>
      </DialogHeader>

      <div className="py-6 space-y-4">
        <p className="text-base text-muted-foreground leading-relaxed">
          We are currently reconfiguring our automatic submission process for membership cancellations. Please email{" "}
          <a
            href="mailto:info@shantihotyoga.ca?subject=Membership%20Cancellation%20Request"
            className="text-sage-green font-semibold underline hover:text-sage-green/80"
          >
            info@shantihotyoga.ca
          </a>{" "}
          to cancel your membership. Two weeks notice is required to cancel your membership before the next billing cycle.
        </p>
      </div>
    </>
  );
}

