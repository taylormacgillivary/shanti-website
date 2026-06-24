import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Canada Day Sale | 20% Off 10 Class Passes | Shanti Hot Yoga",
  description:
    "Celebrate Canada Day with 20% off 10 Class Passes, July 1–2 only. Use promo code CANADA at checkout. Valid at all three Halifax locations.",
  openGraph: {
    title: "Canada Day Sale | Shanti Hot Yoga",
    description:
      "20% off 10 Class Passes, July 1–2 only. Use code CANADA at checkout.",
  },
};

export default function CanadaDaySaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
