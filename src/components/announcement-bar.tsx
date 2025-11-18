"use client";

import * as React from "react";
import { X } from "lucide-react";

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-red-600 text-white px-4 py-3 relative z-[60]">
      <div className="container mx-auto flex items-center justify-center pr-8">
        <p className="text-sm text-center font-medium">
          November 18 - Due to an ongoing outage at Cloudflare, you may experience technical issues when trying to book classes, register for events or make purchases. These issues are not affecting everyone. You may not face any problems.
        </p>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors"
        aria-label="Close announcement"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

