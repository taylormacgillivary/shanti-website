"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { subscribeToTeacherTraining } from "@/app/actions/newsletter";
import { toast } from "sonner";
import { Mail, CheckCircle, Loader2 } from "lucide-react";

interface InfoPackageEmailCaptureProps {
  trainingType?: string;
  buttonText?: string;
  successMessage?: string;
  className?: string;
}

export function InfoPackageEmailCapture({
  trainingType,
  buttonText = "Get Info Package",
  successMessage = "Check your email! Your info package is on its way.",
  className = "",
}: InfoPackageEmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const result = await subscribeToTeacherTraining({ 
        email, 
        trainingType 
      });

      if (result.success) {
        setIsSuccess(true);
        toast.success(successMessage);
        setEmail("");
      } else {
        toast.error(result.message || "Failed to subscribe. Please try again.");
        console.error("Teacher training subscription failed:", result);
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
      console.error("Teacher training subscription error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className={`flex flex-col items-center gap-4 py-4 ${className}`}>
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <div className="text-center">
          <p className="text-xl font-semibold text-stone-900 mb-1">
            You&apos;re all set!
          </p>
          <p className="text-stone-600">
            {successMessage}
          </p>
        </div>
        <button
          onClick={() => setIsSuccess(false)}
          className="text-sm text-sage-green hover:text-sage-green/80 underline"
        >
          Use a different email
        </button>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center items-center">
        <div className="relative w-full sm:w-auto">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-stone-400" />
          <input
            className="w-full sm:w-80 pl-10 pr-4 py-3 border border-stone-300 rounded-lg bg-white text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-sage-green focus:border-transparent"
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>
        <Button
          type="submit"
          size="lg"
          className="w-full sm:w-auto gradient-sage hover:opacity-90 text-white px-8"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            buttonText
          )}
        </Button>
      </form>
    </div>
  );
}

