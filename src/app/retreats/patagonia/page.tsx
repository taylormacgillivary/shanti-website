import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Mail, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import patagoniaImage from "../../../../public/images-in-use/Retreats/patagonia-retreat-2027.jpg";

const inquiryHref = "mailto:ujmacgillivary@gmail.com?subject=Patagonia%20Retreat%20Inquiry%20%E2%80%94%20February%2020%E2%80%9327%2C%202027";
const description = "Join Shanti in Bariloche, Argentina, February 20–27, 2027, for daily practice, lakeside quiet, alpine trails, and nourishing local meals.";
const isLocalDevelopment = process.env.NODE_ENV === "development";
const isPaymentPreview = isLocalDevelopment || process.env.VERCEL_ENV === "preview";
const stripeTestLinkPrefix = "https://buy.stripe.com/test_";
const stripePaymentLinkPattern = /^https:\/\/buy\.stripe\.com\/(test_)?[a-zA-Z0-9]+$/;

function getStripePaymentLink(value: string | undefined) {
  const href = value?.trim();
  if (!href || !stripePaymentLinkPattern.test(href)) return undefined;

  const isTestLink = href.startsWith(stripeTestLinkPrefix);
  return isLocalDevelopment || isTestLink === isPaymentPreview ? href : undefined;
}

export const metadata: Metadata = {
  title: "Patagonia Retreat | February 20–27, 2027 | Shanti Hot Yoga",
  description,
  openGraph: {
    title: "Bucket List Journey: Patagonia Awaits | Shanti Hot Yoga",
    description,
    type: "website",
    images: [{
      url: "https://shantihotyoga.ca/images-in-use/Retreats/patagonia-retreat-2027.jpg",
      width: patagoniaImage.width,
      height: patagoniaImage.height,
      alt: "Lakeside buildings surrounded by forests in Northern Patagonia",
    }],
  },
};

export default function PatagoniaRetreatPage() {
  const depositHref = getStripePaymentLink(process.env.PATAGONIA_STRIPE_DEPOSIT_URL);
  const finalPaymentHref = getStripePaymentLink(process.env.PATAGONIA_STRIPE_FINAL_PAYMENT_URL);
  const isTestCheckout = Boolean(depositHref?.startsWith(stripeTestLinkPrefix));
  const hasPaymentLinks = Boolean(
    depositHref &&
    finalPaymentHref &&
    depositHref !== finalPaymentHref &&
    isTestCheckout === finalPaymentHref.startsWith(stripeTestLinkPrefix),
  );
  const showPayments = isPaymentPreview || hasPaymentLinks;
  const previewMessage = hasPaymentLinks
    ? `Dev preview. These buttons open ${isTestCheckout ? "test" : "live"} Stripe checkout.`
    : "Dev preview. Stripe checkout links are pending.";
  const payments = [
    { label: "Deposit", amount: "$1,000", button: "Pay deposit", href: depositHref },
    {
      label: "Final payment",
      amount: "$2,250",
      button: "Pay final balance",
      href: finalPaymentHref,
      due: { date: "2027-01-08", display: "January 8, 2027" },
    },
  ];

  return (
    <>
      <section className="relative py-12 md:py-20 bg-gradient-to-br from-background via-background to-muted overflow-hidden">
        <div className="container mx-auto px-4">
          <Link href="/retreats" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-10">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All Retreats
          </Link>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <Badge variant="secondary" className="mb-5 bg-sage-green/10 text-sage-green border-sage-green/20">
                Bucket List Journey
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="gradient-sage-text">Patagonia</span> Awaits
              </h1>
              <div className="flex flex-col gap-3 text-lg font-semibold mb-6">
                <p className="flex items-center gap-3">
                  <CalendarDays className="h-5 w-5 shrink-0 text-sage-green" aria-hidden="true" />
                  February 20–27, 2027
                </p>
                <p className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 shrink-0 text-sage-green" aria-hidden="true" />
                  Bariloche, Argentina
                </p>
              </div>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Imagine waking up to crisp Andean air, surrounded by ancient forests,
                glacial lakes, and the untamed beauty of Northern Patagonia.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                {showPayments && (
                  <Button asChild size="lg" className="gradient-sage text-white">
                    <a href="#retreat-payments">View payment options</a>
                  </Button>
                )}
                <Button
                  asChild
                  size="lg"
                  variant={showPayments ? "outline" : "default"}
                  className={showPayments ? undefined : "gradient-sage text-white h-auto min-h-10 whitespace-normal py-3 text-center"}
                >
                  <a href={inquiryHref}>
                    <Mail aria-hidden="true" />
                    {showPayments ? "Email Uriel" : "Email Uriel to Join the Priority List"}
                  </a>
                </Button>
              </div>
            </div>
            <Image
              src={patagoniaImage}
              alt="Lakeside buildings surrounded by forests in Northern Patagonia"
              sizes="(max-width: 1024px) 100vw, 640px"
              priority
              placeholder="blur"
              className="w-full h-auto rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              An Unforgettable <span className="gradient-sage-text">Adventure</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10">
              This coming February, we&apos;re heading south to Bariloche, Argentina,
              for an unforgettable adventure! Between daily practice, lakeside quiet,
              alpine trails, and nourishing local meals, this is a once-in-a-lifetime adventure.
            </p>
            {showPayments && (
              <section id="retreat-payments" aria-labelledby="retreat-payments-title" className="scroll-mt-28 mb-10">
                <h2 id="retreat-payments-title" className="text-3xl md:text-4xl font-bold mb-4">Retreat payments</h2>
                {isPaymentPreview && (
                  <p className="mb-5 text-sm text-muted-foreground">{previewMessage}</p>
                )}
                <div className="grid gap-4 sm:grid-cols-2">
                  {payments.map((payment) => (
                    <div key={payment.label} className="flex flex-col rounded-xl border border-sage-green/20 bg-sage-green/5 p-6 md:p-8">
                      <h3 className="text-xl font-semibold mb-2">{payment.label}</h3>
                      <p className="text-3xl font-bold mb-2">
                        {payment.amount} <span className="text-base font-semibold text-muted-foreground">USD</span>
                      </p>
                      {payment.due && (
                        <p className="text-muted-foreground">Due <time dateTime={payment.due.date}>{payment.due.display}</time></p>
                      )}
                      <div className="mt-auto pt-6">
                        {hasPaymentLinks && payment.href ? (
                          <Button asChild size="lg" className="gradient-sage text-white w-full">
                            <a href={payment.href}>{payment.button}</a>
                          </Button>
                        ) : (
                          <Button disabled size="lg" className="w-full">{payment.button}</Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
            <div className="rounded-xl border border-sage-green/20 bg-sage-green/5 p-6 md:p-8">
              <h3 className="text-2xl font-bold mb-4">{showPayments ? "Questions about the retreat?" : "Interested in Joining Us?"}</h3>
              {!showPayments && (
                <>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                    Full details and itinerary will be released soon, but if Patagonia has
                    been calling your name, reach out now to get on the priority list.
                  </p>
                  <p className="text-lg text-muted-foreground mb-6">Pricing will be announced soon.</p>
                </>
              )}
              <p className="text-lg">
                Connect directly with Uriel at{" "}
                <a href={inquiryHref} className="text-sage-green hover:text-sage-green/80 underline break-all">
                  ujmacgillivary@gmail.com
                </a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
