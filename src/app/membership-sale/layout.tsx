import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "April Membership Sale | Shanti Hot Yoga",
  description:
    "April 20–22 only: start a 4-month monthly membership with your first two months at $9 each. Unlimited hot yoga across Halifax, Bedford, and Dartmouth.",
  openGraph: {
    title: "April Membership Sale | Shanti Hot Yoga",
    description:
      "Limited time: $9/month for your first two months on a 4-month monthly membership. April 20–22.",
    type: "website",
    locale: "en_CA",
  },
};

export default function MembershipSaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
