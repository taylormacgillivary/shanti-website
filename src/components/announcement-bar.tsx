"use client";

import { X } from "lucide-react";
import { useState, useEffect } from "react";

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    console.log("AnnouncementBar mounted, isVisible:", isVisible);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="relative bg-amber-500 text-white z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-center gap-4">
          <p className="text-sm md:text-base font-medium text-center">
            ⚠️ We are currently experiencing issues with form submissions on our site. Please wait until this message has been removed to submit any forms from our site.
          </p>
          <button
            onClick={() => setIsVisible(false)}
            className="flex-shrink-0 p-1 hover:bg-amber-600 rounded-full transition-colors"
            aria-label="Dismiss announcement"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

