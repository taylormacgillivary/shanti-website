"use client"

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Gift, X } from "lucide-react";

export function GiftCardPopup() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    // Check if user has seen the popup and when
    const popupTimestamp = localStorage.getItem("giftCardPopupTimestamp");
    
    if (popupTimestamp) {
      const lastSeenDate = new Date(parseInt(popupTimestamp));
      const now = new Date();
      const thirtySixHoursInMs = 36 * 60 * 60 * 1000; // 36 hours in milliseconds
      const timeSinceLastSeen = now.getTime() - lastSeenDate.getTime();
      
      // If less than 36 hours have passed, don't show popup
      if (timeSinceLastSeen < thirtySixHoursInMs) {
        return;
      }
    }
    
    // Show popup after a short delay (1.5 seconds)
    const timer = setTimeout(() => {
      setOpen(true);
      // Record the timestamp when popup is shown
      localStorage.setItem("giftCardPopupTimestamp", Date.now().toString());
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleClose = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      // Update timestamp when user closes the popup
      localStorage.setItem("giftCardPopupTimestamp", Date.now().toString());
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden border-sage-green/30">
        {/* Enhanced Close Button */}
        <DialogClose className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 opacity-100 shadow-lg ring-offset-background transition-all hover:bg-white hover:scale-110 focus:outline-none focus:ring-2 focus:ring-sage-green focus:ring-offset-2 disabled:pointer-events-none">
          <X className="h-5 w-5 text-gray-700" />
          <span className="sr-only">Close</span>
        </DialogClose>
        
        {/* Image Section */}
        <div className="relative h-48 w-full">
          <Image
            src="/images-in-use/08.jpg"
            alt="Yoga practice"
            fill
            sizes="(max-width: 768px) 100vw, 672px"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
          
          {/* Icon overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full border-2 border-white/40">
              <Gift className="h-12 w-12 text-white" />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-4">
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-2xl md:text-3xl font-bold text-center">
              Give the Gift of <span className="gradient-sage-text">Yoga</span>
            </DialogTitle>
            <DialogDescription className="text-base text-center text-foreground/80">
              This holiday season, give your loved ones the perfect gift - the gift of self-care, 
              transformation, and inner peace. Choose any dollar amount for maximum flexibility.
            </DialogDescription>
          </DialogHeader>

          {/* CTA Section */}
          <div className="flex justify-center pt-2">
            <Button 
              className="gradient-sage hover:opacity-90 text-white h-12 text-base shadow-lg px-8" 
              asChild
            >
              <a 
                href="https://clients.mindbodyonline.com/classic/ws?studioid=11233&stype=42&giftCardID=364" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => handleClose(false)}
              >
                Purchase Gift Card
              </a>
            </Button>
          </div>

          {/* Additional info */}
          <p className="text-xs text-center text-muted-foreground pt-2">
            Valid at all three Shanti Hot Yoga locations • Never expires
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

