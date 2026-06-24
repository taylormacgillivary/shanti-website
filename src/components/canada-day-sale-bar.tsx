"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  isCanadaDaySalePopupOrBarVisible,
  CANADA_DAY_SALE_PATH,
} from "@/lib/canada-day-sale-window";

export function CanadaDaySaleBar() {
  const pathname = usePathname();
  const visible = isCanadaDaySalePopupOrBarVisible();

  if (!visible || pathname === CANADA_DAY_SALE_PATH) {
    return null;
  }

  return (
    <Link
      href={CANADA_DAY_SALE_PATH}
      className="block w-full bg-red-600 px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-red-700"
    >
      <span className="sm:hidden">
        Canada Day Sale: 20% off 10 Class Passes · Code CANADA
      </span>
      <span className="hidden sm:inline">
        Canada Day Sale: 20% off 10 Class Passes · Jul 1–2 · Code CANADA — Shop now
      </span>
    </Link>
  );
}
