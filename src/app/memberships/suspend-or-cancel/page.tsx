"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { submitSuspendRequest, submitCancelRequest } from "@/app/actions/membership";
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
            <CancelForm onBack={handleBack} />
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

function CancelForm({ onBack }: { onBack: () => void }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    acknowledge: false,
    reasons: {
      leavingHalifax: false,
      notUsingEnough: false,
      tooExpensive: false,
      noTime: false,
      attendingAnother: false,
      illness: false,
    },
    otherReason: "",
    feedback: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await submitCancelRequest(formData);
      
      if (result.success) {
        router.push("/memberships/cancel/thank-you");
      } else {
        alert(result.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting cancel form:", error);
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
        <DialogTitle className="text-2xl">Cancel Your Membership</DialogTitle>
        <DialogDescription>
          We&apos;re sorry to see you go! We hope you had a wonderful experience with all of our classes and teachers, and we hope to see you at the studio again in the future. Once your membership is cancelled, you are still able to attend classes until the full 30 days since your last payment have passed.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-6 py-4">
        <div className="space-y-4">
          <p className="font-semibold">
            After submitting the cancellation form below, you will be redirected to a page that confirms that the cancellation request has been received. If you are not redirected to this confirmation page, your request has not been received.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="font-semibold text-amber-900">*PLEASE NOTE SHANTI YOGA ONLINE USERS*</p>
            <p className="text-amber-900 mt-2">
              You cannot cancel your subscription to Shanti Yoga Online via this form submission. Click{" "}
              <a href="/shanti-online#cancel-subscription" className="underline font-semibold">HERE</a> for instructions on how to cancel your online subscription.
            </p>
          </div>
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
          <Label className="font-semibold">*</Label>
          <p className="text-sm text-muted-foreground mb-2">
            I acknowledge that, as per the terms of my contract, Shanti Yoga requires 14 days notice in order to terminate my Membership without further charges. If today&apos;s date is fewer than 14 days until my next scheduled payment, my payment may be processed and a refund cannot be given.
          </p>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="acknowledge"
              required
              checked={formData.acknowledge}
              onCheckedChange={(checked) => 
                setFormData({ ...formData, acknowledge: checked as boolean })
              }
            />
            <Label htmlFor="acknowledge" className="font-normal">
              Yes, I acknowledge this
            </Label>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="font-semibold">What is the reason for cancelling your Membership? Please check all that apply.</Label>
          <div className="space-y-2">
            {[
              { key: "leavingHalifax", label: "I am leaving Halifax" },
              { key: "notUsingEnough", label: "I don&apos;t use my membership enough" },
              { key: "tooExpensive", label: "The membership is too expensive" },
              { key: "noTime", label: "I don&apos;t have time" },
              { key: "attendingAnother", label: "I am attending another yoga studio/fitness facility" },
              { key: "illness", label: "I have an illness/injury that prevents me from taking classes" },
            ].map((reason) => (
              <div key={reason.key} className="flex items-center space-x-2">
                <Checkbox
                  id={reason.key}
                  checked={formData.reasons[reason.key as keyof typeof formData.reasons]}
                  onCheckedChange={(checked) => 
                    setFormData({ 
                      ...formData, 
                      reasons: { ...formData.reasons, [reason.key]: checked as boolean }
                    })
                  }
                />
                <Label htmlFor={reason.key} className="font-normal">
                  {reason.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="otherReason">
            If the reason for cancelling your membership isn&apos;t listed above, please let us know in the box below:
          </Label>
          <Textarea
            id="otherReason"
            value={formData.otherReason}
            onChange={(e) => setFormData({ ...formData, otherReason: e.target.value })}
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="feedback">
            If you have any feedback on your experience at Shanti Yoga, please share it with us! We hope to see you on your mat again in the future.
          </Label>
          <Textarea
            id="feedback"
            value={formData.feedback}
            onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
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

