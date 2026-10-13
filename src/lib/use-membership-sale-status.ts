"use client";

import { useEffect, useState } from "react";
import { getMembershipSaleStatus } from "./membership-sale";

/** Match static HTML on first render, then keep open tabs in sync with sale boundaries. */
export function useMembershipSaleStatus() {
  const [status, setStatus] = useState<ReturnType<typeof getMembershipSaleStatus>>("upcoming");
  useEffect(() => {
    const update = () => setStatus(getMembershipSaleStatus());
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, []);
  return status;
}
