"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { submitScholarshipApplication } from "@/app/actions/scholarship";
import { CheckCircle2, GraduationCap, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Schema for form validation
const scholarshipFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  reasonsForEnrollment: z.string().min(20, { message: "Please provide a more detailed response (at least 20 characters)." }),
  teachingAspirations: z.string().optional(),
  programSelection: z.string().min(20, { message: "Please provide a more detailed response (at least 20 characters)." }),
  personalDefinition: z.string().min(20, { message: "Please provide a more detailed response (at least 20 characters)." }),
  experienceAndStyle: z.string().min(20, { message: "Please provide a more detailed response (at least 20 characters)." }),
  currentRoutine: z.string().min(20, { message: "Please provide a more detailed response (at least 20 characters)." }),
  originStory: z.string().min(20, { message: "Please provide a more detailed response (at least 20 characters)." }),
  beyondPhysical: z.string().min(20, { message: "Please provide a more detailed response (at least 20 characters)." }),
  lessonsLearned: z.string().min(20, { message: "Please provide a more detailed response (at least 20 characters)." }),
  teacherQualities: z.string().min(20, { message: "Please provide a more detailed response (at least 20 characters)." }),
  fearsHesitations: z.string().min(10, { message: "Please provide a response (at least 10 characters)." }),
  supportSystem: z.string().min(10, { message: "Please provide a response (at least 10 characters)." }),
  additionalComments: z.string().optional(),
});

type ScholarshipFormData = z.infer<typeof scholarshipFormSchema>;

export function ScholarshipSection() {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useForm<ScholarshipFormData>({
    resolver: zodResolver(scholarshipFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      reasonsForEnrollment: "",
      teachingAspirations: "",
      programSelection: "",
      personalDefinition: "",
      experienceAndStyle: "",
      currentRoutine: "",
      originStory: "",
      beyondPhysical: "",
      lessonsLearned: "",
      teacherQualities: "",
      fearsHesitations: "",
      supportSystem: "",
      additionalComments: "",
    },
  });

  async function onSubmit(data: ScholarshipFormData) {
    const result = await submitScholarshipApplication(data);
    if (result.success) {
      setShowFormModal(false);
      setShowSuccess(true);
      form.reset();
    } else {
      alert(result.message || "Something went wrong. Please try again.");
    }
  }

  const handleOpenForm = () => {
    setShowInfoModal(false);
    setShowFormModal(true);
  };

  const handleBackToInfo = () => {
    setShowFormModal(false);
    setShowInfoModal(true);
  };

  return (
    <>
      {/* Scholarship Section on Page */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-stone-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sage-green/10 mb-6">
              <GraduationCap className="h-8 w-8 text-sage-green" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mb-4">
              Scholarship Opportunity
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto mb-8">
              We are pleased to offer a scholarship for our upcoming 200-Hour Yoga Teacher Training program. 
              This opportunity is specifically designed to support an aspiring student for whom the cost of 
              the training presents a significant financial barrier to participation.
            </p>
            <Button
              onClick={() => setShowInfoModal(true)}
              size="lg"
              variant="outline"
              className="border-sage-green text-sage-green hover:bg-sage-green hover:text-white transition-colors"
            >
              View Full Scholarship Information
            </Button>
          </div>
        </div>
      </section>

      {/* Information Modal */}
      <Dialog open={showInfoModal} onOpenChange={setShowInfoModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-stone-900">
              Yoga Teacher Training Scholarship Opportunity
            </DialogTitle>
            <DialogDescription className="text-sage-green font-medium text-base">
              Financial Accessibility
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <p className="text-stone-700">
              We are pleased to offer a scholarship for our upcoming 200-Hour Yoga Teacher Training (YTT) program. 
              This opportunity is specifically designed to support an aspiring student for whom the cost of the 
              training presents a significant financial barrier to participation.
            </p>

            <div>
              <h3 className="text-xl font-semibold text-stone-900 mb-3">
                Our Commitment to Accessibility
              </h3>
              <p className="text-stone-700">
                We believe that financial hardship should not prevent dedicated individuals from accessing training. 
                This scholarship is intended to support those who are committed to teaching yoga and developing 
                their practice but require financial assistance to make this viable.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-stone-900 mb-3">
                Scholarship Particulars
              </h3>
              <ul className="space-y-3 text-stone-700">
                <li className="flex items-start">
                  <span className="font-semibold min-w-[140px]">Training:</span>
                  <span>200-Hour Yoga Teacher Training</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold min-w-[140px]">Award Amount:</span>
                  <span className="text-sage-green font-semibold">$1,500</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold min-w-[140px]">Purpose:</span>
                  <span>To provide financial assistance to an aspiring yoga teacher who faces significant financial obstacles to enrollment.</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold min-w-[140px]">Usage Requirement:</span>
                  <span>The scholarship must be used for our current course offering. It cannot be deferred to a future training or transferred.</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-stone-200">
              <Button
                onClick={handleOpenForm}
                size="lg"
                className="w-full gradient-sage hover:opacity-90 text-white"
              >
                Apply for Scholarship
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Application Form Modal */}
      <Dialog open={showFormModal} onOpenChange={setShowFormModal}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToInfo}
                className="p-0 h-auto hover:bg-transparent"
              >
                <ArrowLeft className="h-5 w-5 text-stone-500 hover:text-stone-700" />
              </Button>
              <div>
                <DialogTitle className="text-2xl font-bold text-stone-900">
                  Scholarship Application
                </DialogTitle>
                <DialogDescription className="text-stone-600">
                  Please complete all required fields below.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-4">
              {/* Section 1: Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-stone-900 border-b border-stone-200 pb-2">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your.email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Section 2: Motivation & Intentions */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-stone-900 border-b border-stone-200 pb-2">
                  Motivation & Intentions
                </h3>
                <FormField
                  control={form.control}
                  name="reasonsForEnrollment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Why do you want to take YTT? *</FormLabel>
                      <FormDescription>
                        What are you hoping to take away from the training (e.g., teach, gain knowledge, deepen practice, etc.)?
                      </FormDescription>
                      <FormControl>
                        <Textarea className="min-h-[100px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="teachingAspirations"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>If you intend to teach, why do you want to do so?</FormLabel>
                      <FormControl>
                        <Textarea className="min-h-[100px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="programSelection"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What draws you to the YTT program at Shanti? *</FormLabel>
                      <FormControl>
                        <Textarea className="min-h-[100px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="personalDefinition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What does yoga mean to you? *</FormLabel>
                      <FormControl>
                        <Textarea className="min-h-[100px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Section 3: History of Practice */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-stone-900 border-b border-stone-200 pb-2">
                  History of Practice
                </h3>
                <FormField
                  control={form.control}
                  name="experienceAndStyle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How long have you been practicing yoga, and has the style you prefer changed during this time? *</FormLabel>
                      <FormControl>
                        <Textarea className="min-h-[100px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="currentRoutine"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Do you have a regular studio and/or home practice? *</FormLabel>
                      <FormDescription>
                        If so, please specify where and how often.
                      </FormDescription>
                      <FormControl>
                        <Textarea className="min-h-[100px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="originStory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Why did you take your very first class? *</FormLabel>
                      <FormDescription>
                        How different are your reasons for practicing now compared to your first class?
                      </FormDescription>
                      <FormControl>
                        <Textarea className="min-h-[100px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Section 4: Philosophy & Inner Work */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-stone-900 border-b border-stone-200 pb-2">
                  Philosophy & Inner Work
                </h3>
                <FormField
                  control={form.control}
                  name="beyondPhysical"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What aspect of Yoga (outside of the physical asana poses) interests you most & why? *</FormLabel>
                      <FormControl>
                        <Textarea className="min-h-[100px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lessonsLearned"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Explain 3 lessons that yoga has taught you. *</FormLabel>
                      <FormControl>
                        <Textarea className="min-h-[100px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="teacherQualities"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What do you look for in a yoga teacher? *</FormLabel>
                      <FormDescription>
                        What qualities does a good teacher possess?
                      </FormDescription>
                      <FormControl>
                        <Textarea className="min-h-[100px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Section 5: Readiness & Support */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-stone-900 border-b border-stone-200 pb-2">
                  Readiness & Support
                </h3>
                <FormField
                  control={form.control}
                  name="fearsHesitations"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Do you have any fears or hesitations heading into the training? *</FormLabel>
                      <FormControl>
                        <Textarea className="min-h-[100px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="supportSystem"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Do you have a support system available to you for this training program? *</FormLabel>
                      <FormDescription>
                        Our training is based on an intensive approach and can be very demanding physically and emotionally.
                      </FormDescription>
                      <FormControl>
                        <Textarea className="min-h-[100px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="additionalComments"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Is there anything else we should know?</FormLabel>
                      <FormControl>
                        <Textarea className="min-h-[100px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full gradient-sage hover:opacity-90 text-white"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Submitting Application..." : "Submit Scholarship Application"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            </div>
            <DialogTitle className="text-2xl text-center">Application Submitted!</DialogTitle>
            <DialogDescription className="text-center text-base">
              Thank you for applying for the YTT Scholarship. We have received your application and will 
              review it carefully. You will hear back from us soon regarding the status of your application.
            </DialogDescription>
          </DialogHeader>

          <div className="py-6 text-center">
            <Button onClick={() => setShowSuccess(false)} className="gradient-sage text-white">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}


