import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cancellation Request Received | Shanti Hot Yoga",
  description:
    "Your membership cancellation request has been submitted. Explore a 10 class pass with 20% off using promo code 20OFF.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function CancelThankYouLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
