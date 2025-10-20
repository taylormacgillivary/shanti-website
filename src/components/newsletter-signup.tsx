"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { subscribeToNewsletter } from "@/app/actions/newsletter";
import { toast } from "sonner";

interface NewsletterSignupProps {
  title?: string;
  subtitle?: string;
  tags?: string[];
  placeholder?: string;
  buttonText?: string;
  className?: string;
}

export function NewsletterSignup({
  title = "Stay in the loop",
  subtitle = "Sign up with your email address to receive news and updates.",
  tags = ["website-newsletter"],
  placeholder = "Email Address",
  buttonText = "Sign Up",
  className = "",
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
        toast.success(result.message);
        setEmail(""); // Clear the input
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
  );
}

