"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMembershipSaleStatus } from "@/lib/use-membership-sale-status";
import { membershipSale } from "@/lib/membership-sale";
import { isMembershipSalePromotionVisible, MEMBERSHIP_SALE_PATH } from "@/lib/membership-sale-window";

const POPUP_DISMISS_AT_KEY = "shanti-fall-membership-sale-2026-popup-dismissed-at";
const SUPPRESS_MS = 12 * 60 * 60 * 1000;

function isPopupSuppressedByRecentClose(): boolean {
  try {
    const at = Number(localStorage.getItem(POPUP_DISMISS_AT_KEY));
    const age = Date.now() - at;
    return at > 0 && Number.isFinite(at) && age >= 0 && age < SUPPRESS_MS;
  } catch {
    return false;
  }
}

function recordPopupClosedAt(): void {
  try {
    localStorage.setItem(POPUP_DISMISS_AT_KEY, String(Date.now()));
  } catch {
    // Storage restrictions must not prevent closing the popup or following the offer.
  }
}

export function MembershipSaleAnnouncement() {
  const saleStatus = useMembershipSaleStatus();
  const pathname = usePathname();
  const visible = isMembershipSalePromotionVisible(saleStatus) && pathname !== MEMBERSHIP_SALE_PATH;
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(visible && !isPopupSuppressedByRecentClose());
  }, [visible]);

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) recordPopupClosedAt();
  };

  // Close immediately at the end boundary, even if the visitor leaves the modal open.
  if (!visible) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-[420px] gap-0 overflow-hidden rounded-2xl border-[#dce4d0] bg-[#fbf8ef] p-0 text-[#263b2c] shadow-2xl [&>button]:right-3 [&>button]:top-3 [&>button]:rounded-full [&>button]:bg-[#fbf8ef] [&>button]:p-2 [&>button]:opacity-100">
        <div className="relative h-40 sm:h-44">
          <Image src="/images-in-use/ad-1-landscape.jpg" alt="A yoga class at Shanti" fill sizes="420px" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#263b2c]/90 via-[#263b2c]/20 to-transparent" />
          <DialogHeader className="absolute inset-x-0 bottom-5 px-7 text-left sm:text-left">
            <DialogTitle className="text-2xl font-semibold tracking-tight text-[#fbf8ef]">Fall Membership Sale</DialogTitle>
          </DialogHeader>
        </div>
        <div className="px-7 pb-7 pt-6 text-center">
          <p className="flex items-baseline justify-center gap-1.5 leading-none">
            <span className="text-7xl font-semibold tracking-tighter">${membershipSale.firstMonthsRate}</span>
            <span className="text-xl font-medium text-[#4f683b]">/ month</span>
          </p>
          <DialogDescription className="mt-3 text-base text-[#263b2c]"><span className="sr-only">${membershipSale.firstMonthsRate} per month </span>for your first two months.</DialogDescription>
          <p className="mt-2 text-sm text-[#59664f]">Unlimited yoga. All three studios.</p>
          <Button asChild size="lg" className="mt-6 h-12 w-full rounded-lg bg-[#36513b] text-base font-semibold text-[#fbf8ef] hover:bg-[#263b2c]">
            <Link href={MEMBERSHIP_SALE_PATH} onClick={() => {
              recordPopupClosedAt();
              setOpen(false);
            }}>
              See the offer <ArrowRight aria-hidden="true" className="ml-1 h-4 w-4 text-[#d7e7b5]" />
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
