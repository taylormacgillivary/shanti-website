"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

interface NewsletterConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email: string;
}

export function NewsletterConfirmationModal({
  open,
  onOpenChange,
  email,
}: NewsletterConfirmationModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl">
            Welcome to Our Community!
          </DialogTitle>
          <DialogDescription className="text-center text-base pt-2">
            Thank you for subscribing to our newsletter. We&apos;ve successfully
            added <strong className="text-gray-900 dark:text-gray-100">{email}</strong> to
            our mailing list.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 pt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            You&apos;ll receive updates about classes, workshops, retreats, and special
            offers directly to your inbox.
          </p>
          <Button
            onClick={() => onOpenChange(false)}
            className="w-full gradient-sage text-white"
          >
            Got it!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

