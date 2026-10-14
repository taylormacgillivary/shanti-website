"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getMembershipSaleStatus, membershipSale } from "./membership-sale";

type SaleStatus = ReturnType<typeof getMembershipSaleStatus>;
const SaleStatusContext = createContext<SaleStatus>("upcoming");
const MAX_TIMEOUT_MS = 2_147_483_647;

/** One clock for the navigation, banner, popup and checkout, including already-open tabs. */
export function MembershipSaleClockProvider({ children, allowPreview = false }: {
  children: ReactNode;
  allowPreview?: boolean;
}) {
  // Static/cached HTML never freezes the promotion in its build-time state.
  const [status, setStatus] = useState<SaleStatus>("upcoming");

  useEffect(() => {
    let disposed = false;
    let boundaryTimer: ReturnType<typeof setTimeout> | undefined;
    let anchor = { time: Date.now(), tick: performance.now() };
    const controller = new AbortController();
    const boundaries = [Date.parse(membershipSale.startsAt), Date.parse(membershipSale.endsAt)];

    // Visual/time-travel QA is explicitly disabled in production deployments.
    const query = new URLSearchParams(window.location.search);
    const previewPresets: Record<string, number> = {
      upcoming: boundaries[0] - 60_000,
      active: boundaries[0] + 60_000,
      ended: boundaries[1],
    };
    const previewAt = allowPreview
      ? previewPresets[query.get("sale-preview") ?? ""]
        ?? Date.parse(query.get("sale-preview-at") ?? "")
      : NaN;
    const isPreview = Number.isFinite(previewAt);
    if (isPreview) anchor = { time: previewAt, tick: performance.now() };

    function update() {
      if (disposed) return;
      const now = anchor.time + performance.now() - anchor.tick;
      setStatus(getMembershipSaleStatus(new Date(now)));
      clearTimeout(boundaryTimer);
      const next = boundaries.find((boundary) => boundary > now);
      if (next !== undefined) {
        boundaryTimer = setTimeout(update, Math.min(MAX_TIMEOUT_MS, Math.max(1, next - now + 1)));
      }
    }

    async function syncClock() {
      if (isPreview) {
        update();
        return;
      }
      const sentAt = performance.now();
      try {
        const response = await fetch("/api/membership-sale-clock", {
          cache: "no-store", signal: controller.signal,
        });
        if (!response.ok) throw new Error("Clock unavailable");
        const data: { now: number } = await response.json();
        if (!Number.isFinite(data.now)) throw new Error("Invalid clock");
        if (disposed) return;
        const receivedAt = performance.now();
        anchor = { time: data.now + (receivedAt - sentAt) / 2, tick: receivedAt };
      } catch {
        if (disposed) return;
        // Keep the last server anchor; fall back to the device clock on initial failure.
      }
      update();
    }

    const onVisibility = () => {
      if (document.visibilityState === "visible") void syncClock();
    };
    if (isPreview) update();
    else void syncClock();
    const tick = setInterval(update, 30_000);
    const resync = setInterval(() => void syncClock(), 5 * 60_000);
    window.addEventListener("focus", syncClock);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      disposed = true;
      controller.abort();
      clearTimeout(boundaryTimer);
      clearInterval(tick);
      clearInterval(resync);
      window.removeEventListener("focus", syncClock);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [allowPreview]);

  return <SaleStatusContext.Provider value={status}>{children}</SaleStatusContext.Provider>;
}

export function useMembershipSaleStatus() {
  return useContext(SaleStatusContext);
}
