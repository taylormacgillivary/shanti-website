"use client";

import Link from "next/link";
import { Gift } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="bg-red-600 text-white py-2 px-4">
      <div className="container mx-auto flex items-center justify-center gap-2 text-sm">
        <Gift className="w-4 h-4 flex-shrink-0" />
        <span>🎄 Boxing Day Sale is on now!</span>
        <Link 
          href="/boxing-day-sale" 
          className="font-semibold underline underline-offset-2 hover:text-red-100 transition-colors"
        >
          Save 20% on 10 Class Passes →
        </Link>
      </div>
    </div>
  );
}
