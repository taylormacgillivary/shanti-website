"use client";

import * as React from "react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  isMembershipSaleNavOrPopupVisible,
  MEMBERSHIP_SALE_PATH,
} from "@/lib/membership-sale-window";

const POPUP_DISMISS_AT_KEY = "shanti-spring-membership-sale-2026-popup-dismissed-at";
const SUPPRESS_MS = 12 * 60 * 60 * 1000;

function isPopupSuppressedByRecentClose(): boolean {
  if (typeof window === "undefined") return false;
  const raw = localStorage.getItem(POPUP_DISMISS_AT_KEY);
  if (!raw) return false;
  const at = Number(raw);
  if (!Number.isFinite(at)) return false;
  return Date.now() - at < SUPPRESS_MS;
}

function recordPopupClosedAt(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(POPUP_DISMISS_AT_KEY, String(Date.now()));
}

export function MembershipSaleAnnouncement() {
  const visible = isMembershipSaleNavOrPopupVisible();
  const [mounted, setMounted] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!mounted || !visible) {
      setOpen(false);
      return;
    }
    if (isPopupSuppressedByRecentClose()) {
      setOpen(false);
      return;
    }
    setOpen(true);
  }, [mounted, visible]);

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) {
      recordPopupClosedAt();
    }
  };

  if (!visible) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="border-sage-green/30 bg-card sm:max-w-md">
        <div className="-mx-6 -mt-6 mb-4 rounded-t-lg gradient-sage px-6 py-5 text-center text-white shadow-inner">
          <DialogHeader className="space-y-2 text-center sm:text-center">
            <DialogTitle className="sr-only">Membership sale</DialogTitle>
            <DialogDescription className="text-lg font-medium leading-relaxed text-white sm:text-xl">
              April 20–22 only. Get your first two months of membership for just $9 each.
            </DialogDescription>
          </DialogHeader>
        </div>
        <DialogFooter className="flex-col gap-2 sm:flex-col">
          <Button
            asChild
            size="lg"
            className="w-full gradient-sage border-0 text-base font-semibold text-white shadow-md hover:opacity-95"
          >
            <Link
              href={MEMBERSHIP_SALE_PATH}
              onClick={() => {
                recordPopupClosedAt();
                setOpen(false);
              }}
            >
              View offer & pricing
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
