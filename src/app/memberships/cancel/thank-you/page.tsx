"use client"

import { useState } from "react"
import Link from "next/link"
import Script from "next/script"
import { Button } from "@/components/ui/button"
import { Check, Copy } from "lucide-react"

const PROMO_CODE = "20OFF"

const TEN_CLASS_PASS_WIDGET = `<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link inline-flex items-center justify-center whitespace-nowrap rounded-full text-lg font-semibold gradient-sage hover:opacity-90 text-white px-10 py-6 shadow-lg cursor-pointer transition-all ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" data-site-id="1889" data-mb-site-id="11233" data-service-id="291" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Buy 10 Class Pass"></healcode-widget>`

export default function CancelThankYouPage() {
  const [copied, setCopied] = useState(false)

  const copyPromoCode = () => {
    navigator.clipboard.writeText(PROMO_CODE)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center -mt-16 pt-16 bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-24 h-24 gradient-sage rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <Check className="w-12 h-12 text-white" strokeWidth={2.5} />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Cancellation Request{" "}
            <span className="gradient-sage-text">Submitted</span>
          </h1>

          <p className="text-xl text-gray-700 mb-10 leading-relaxed">
            Your cancellation request has been successfully submitted. We&apos;ll process your request and send you a confirmation email shortly.
          </p>

          <div className="bg-muted/40 border border-muted rounded-2xl p-8 md:p-10 text-left space-y-6 mb-10">
            <p className="text-lg text-gray-700 leading-relaxed text-center">
              We&apos;re sorry to see you go! If a monthly membership didn&apos;t quite fit your schedule and routine, maybe a 10 class pass would suit you better. If it does, take 20% off on us. Use promo code{" "}
              <span className="font-mono font-bold text-gray-900">{PROMO_CODE}</span> at checkout.
            </p>

            <div className="max-w-sm mx-auto">
              <button
                type="button"
                onClick={copyPromoCode}
                className="w-full group flex items-center justify-center gap-3 px-6 py-4 bg-gray-900 hover:bg-gray-800 rounded-xl transition-colors"
              >
                <span className="text-2xl font-mono font-bold tracking-widest text-white">
                  {PROMO_CODE}
                </span>
                {copied ? (
                  <Check className="w-5 h-5 text-white" />
                ) : (
                  <Copy className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
                )}
              </button>
              <p className="text-gray-500 text-xs mt-2 text-center">
                {copied ? "Copied to clipboard!" : "Click to copy promo code"}
              </p>
            </div>

            <div className="flex justify-center pt-2">
              <div
                dangerouslySetInnerHTML={{
                  __html: TEN_CLASS_PASS_WIDGET,
                }}
              />
            </div>
          </div>

          <Button variant="outline" size="lg" asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>

      <Script
        src="https://widgets.mindbodyonline.com/javascripts/healcode.js"
        strategy="afterInteractive"
      />
    </div>
  )
}
