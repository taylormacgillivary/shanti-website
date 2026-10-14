"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MEMBERSHIP_SALE_PATH } from "@/lib/membership-sale-window";
import { useMembershipSaleStatus } from "@/lib/use-membership-sale-status";

export function MembershipSaleBanner() {
  if (useMembershipSaleStatus() !== "active") return null;

  return (
    <aside aria-label="Fall membership sale" className="border-b border-[#96bf50]/30 bg-gradient-to-r from-[#2d4934] via-[#405e3b] to-[#2d4934] text-[#fbf8ef]">
      <Link href={MEMBERSHIP_SALE_PATH} className="group flex min-h-11 items-center justify-center gap-2 px-4 py-2.5 text-center text-sm leading-snug transition-colors hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#d7e7b5]">
        <span><strong className="block font-semibold sm:inline">Fall membership sale on now</strong><span className="mx-1.5 hidden sm:inline">—</span><span className="block underline underline-offset-4 decoration-[#d7e7b5]/60 sm:inline">click here for details<ArrowRight aria-hidden="true" className="ml-2 inline h-4 w-4 text-[#d7e7b5] transition-transform group-hover:translate-x-0.5" /></span></span>
      </Link>
    </aside>
  );
}
