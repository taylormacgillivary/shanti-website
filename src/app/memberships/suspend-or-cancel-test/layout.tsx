import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Membership Form Test | Shanti Hot Yoga",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function SuspendOrCancelTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
