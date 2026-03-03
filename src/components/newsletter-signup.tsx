"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { subscribeToNewsletter } from "@/app/actions/newsletter";
import { toast } from "sonner";
import { NewsletterConfirmationModal } from "@/components/newsletter-confirmation-modal";
import { Mail } from "lucide-react";

interface NewsletterSignupProps {
  title?: string;
  subtitle?: string;
  tags?: string[];
  placeholder?: string;
  buttonText?: string;
  className?: string;
  variant?: "default" | "section";
}

export function NewsletterSignup({
  title = "Stay in the loop",
  subtitle = "Sign up with your email address to receive news and updates.",
  tags = ["website-newsletter"],
  placeholder = "Email Address",
  buttonText = "Sign Up",
  className = "",
  variant = "default",
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmedEmail, setConfirmedEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const result = await subscribeToNewsletter({ email, tags });

      if (result.success) {
        setConfirmedEmail(email);
        setShowConfirmation(true);
        setEmail("");
      } else {
        toast.error(result.message || "Failed to subscribe. Please try again.");
        console.error("Newsletter subscription failed:", result);
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
      console.error("Newsletter subscription error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (variant === "section") {
    return (
      <>
        <section className={`bg-gradient-to-b from-background to-muted/30 border-t border-border/40 ${className}`}>
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sage-green/10 mb-4">
                <Mail className="w-6 h-6 text-sage-green" />
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-2">
                {title}
              </h3>
              <p className="text-muted-foreground mb-6">
                {subtitle}
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto">
                <input
                  className="flex-1 px-4 py-2.5 text-sm border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-sage-green/50 focus:border-sage-green transition-colors h-10"
                  placeholder={placeholder}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                />
                <Button
                  type="submit"
                  className="h-10 px-5 rounded-md bg-sage-green hover:bg-sage-green/90 text-white text-sm font-medium transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? "Subscribing..." : buttonText}
                </Button>
              </form>
              <p className="text-xs text-muted-foreground mt-4">
                Join our community for updates on classes, workshops, and special events.
              </p>
            </div>
          </div>
        </section>
        
        <NewsletterConfirmationModal
          open={showConfirmation}
          onOpenChange={setShowConfirmation}
          email={confirmedEmail}
        />
      </>
    );
  }

  return (
    <>
      <div className={`text-center ${className}`}>
        <h3 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
          {title}
        </h3>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          {subtitle}
        </p>
        <form onSubmit={handleSubmit} className="mt-6 flex justify-center gap-2">
          <input
            className="w-full max-w-sm p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-50"
            placeholder={placeholder}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />
          <Button
            type="submit"
            className="px-6 py-2 rounded-md gradient-sage text-white"
            disabled={isLoading}
          >
            {isLoading ? "..." : buttonText}
          </Button>
        </form>
      </div>
      
      <NewsletterConfirmationModal
        open={showConfirmation}
        onOpenChange={setShowConfirmation}
        email={confirmedEmail}
      />
    </>
  );
}

