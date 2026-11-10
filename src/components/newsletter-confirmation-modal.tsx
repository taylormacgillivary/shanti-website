"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Mail } from "lucide-react";
import type { NewsletterConfirmationResult } from "@/lib/newsletter-subscription";

interface NewsletterConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email: string;
  result: NewsletterConfirmationResult;
}

export function NewsletterConfirmationModal({
  open,
  onOpenChange,
  email,
  result,
}: NewsletterConfirmationModalProps) {
  const subscribed = result.status === "subscribed";
  const resubscribe = result.status === "resubscribe";
  const Icon = subscribed ? CheckCircle2 : Mail;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-green-100 p-3">
              <Icon className="h-12 w-12 text-green-600" aria-hidden="true" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl">
            {subscribed ? "Welcome to Our Community!" : resubscribe ? "One more step to rejoin" : "Check your inbox"}
          </DialogTitle>
          <DialogDescription className="text-center text-base pt-2">
            {subscribed ? "You are subscribed to our newsletter with " :
              resubscribe ? "Please confirm that you would like to receive our emails again at " :
              "Your signup is awaiting confirmation for "}
            <strong className="text-gray-900 dark:text-gray-100">{email}</strong>.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 pt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            {subscribed ? "You’ll receive updates about classes, workshops, retreats, and special offers directly to your inbox." :
              resubscribe ? "Open our signup form to rejoin, then complete any email confirmation it asks for." :
              "Look for the confirmation email in your inbox or spam folder and follow its link. If you can’t find it, try our signup form again."}
          </p>
          {!subscribed && (
            <Button asChild className="w-full gradient-sage text-white">
              <a href={result.signupUrl} target="_blank" rel="noopener noreferrer">
                {resubscribe ? "Resubscribe" : "Open signup form"}
              </a>
            </Button>
          )}
          <Button
            onClick={() => onOpenChange(false)}
            variant={subscribed ? "default" : "outline"}
            className={subscribed ? "w-full gradient-sage text-white" : "w-full"}
          >
            {subscribed ? "Got it!" : "Close"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

