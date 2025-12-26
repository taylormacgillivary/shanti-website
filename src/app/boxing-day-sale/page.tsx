"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import Script from "next/script"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Gift, Sparkles, Copy, Check } from "lucide-react"

export default function BoxingDaySalePage() {
  const [copied, setCopied] = useState(false)

  const copyPromoCode = () => {
    navigator.clipboard.writeText("BOXING20")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images-in-use/boxing-day-sale-2025.jpg"
            alt="Boxing Day Sale 2025"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-stone-50" />
        
        {/* Subtle decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-2 h-2 bg-red-400/60 rounded-full animate-pulse" />
          <div className="absolute top-40 right-20 w-1.5 h-1.5 bg-green-400/50 rounded-full animate-pulse delay-300" />
          <div className="absolute bottom-40 left-1/4 w-1 h-1 bg-red-300/40 rounded-full animate-pulse delay-500" />
        </div>
        
        {/* Hero Content */}
        <div className="container relative z-10 mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 text-white text-sm font-medium shadow-lg">
              <Gift className="w-4 h-4" />
              Limited Time Offer
            </div>
            
            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white drop-shadow-lg">
              Boxing Day{" "}
              <span className="text-red-500">
                Sale
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl font-light text-white drop-shadow-md">
              20% Off 10 Class Passes
            </p>
            
            {/* Promo Code Box - Very Prominent */}
            <div className="max-w-md mx-auto">
              <div className="relative p-6 rounded-2xl bg-white/95 backdrop-blur-sm border-2 border-red-600 shadow-xl">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-red-600 text-white text-xs font-bold rounded-full uppercase tracking-wide">
                  Use This Code
                </div>
                <p className="text-gray-600 text-sm mb-3 mt-1">Enter at checkout to receive your discount</p>
                <button
                  onClick={copyPromoCode}
                  className="w-full group flex items-center justify-center gap-3 px-6 py-4 bg-green-700 hover:bg-green-600 rounded-xl transition-all duration-300"
                >
                  <span className="text-3xl md:text-4xl font-mono font-bold tracking-widest text-white">
                    BOXING20
                  </span>
                  {copied ? (
                    <Check className="w-6 h-6 text-white" />
                  ) : (
                    <Copy className="w-6 h-6 text-white/80 group-hover:text-white transition-colors" />
                  )}
                </button>
                <p className="text-gray-500 text-xs mt-3">
                  {copied ? "Copied to clipboard!" : "Click to copy"}
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Button 
                size="lg" 
                asChild 
                className="bg-red-600 hover:bg-red-700 text-white px-10 py-6 text-lg font-semibold shadow-xl rounded-full"
              >
                <a href="#offers">
                  View Offers
                </a>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-500 rounded-full mt-2" />
          </div>
        </div>
      </section>

      {/* Offers Section */}
      <section id="offers" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Boxing Day{" "}
                <span className="text-red-600">
                  Specials
                </span>
              </h2>
              <p className="text-gray-600 text-lg">
                Save 20% on 10 class passes with code <span className="text-green-700 font-mono font-bold">BOXING20</span>
              </p>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Regular 10 Class Pass */}
              <Card className="relative bg-white border-2 border-gray-200 rounded-3xl overflow-hidden shadow-lg">
                <div className="absolute top-4 right-4 px-3 py-1 bg-red-100 border border-red-200 rounded-full text-red-700 text-sm font-medium">
                  Save $38
                </div>
                <CardHeader className="pt-8 pb-4">
                  <CardTitle className="text-xl text-gray-800 font-medium">10 Class Pass</CardTitle>
                </CardHeader>
                <CardContent className="pb-6">
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">$151</span>
                    <span className="text-gray-400 line-through ml-3">$189</span>
                  </div>
                  <ul className="space-y-3 text-gray-600 text-sm">
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                      10 classes to use anytime
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                      Valid at all 3 locations
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                      1 year expiry
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                      Access to all yoga + pilates classes
                    </li>
                  </ul>
                  
                  {/* Promo code reminder */}
                  <div className="mt-6 p-3 rounded-xl bg-green-50 border border-green-200">
                    <p className="text-green-700 text-xs text-center">
                      Use code <span className="font-mono font-bold">BOXING20</span> at checkout
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="pb-8">
                  <div 
                    className="w-full"
                    dangerouslySetInnerHTML={{
                      __html: `<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link w-full bg-red-600 hover:bg-red-700 text-white inline-flex items-center justify-center whitespace-nowrap rounded-xl text-base font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-12 px-6 py-3 cursor-pointer shadow-lg" data-site-id="1889" data-mb-site-id="11233" data-service-id="291" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Buy 10 Class Pass"></healcode-widget>`
                    }}
                  />
                </CardFooter>
              </Card>

              {/* Student/Senior 10 Class Pass */}
              <Card className="relative bg-white border-2 border-green-600 rounded-3xl overflow-hidden shadow-lg">
                <div className="absolute top-0 right-0 bg-green-700 text-white text-sm font-bold px-4 py-2 rounded-bl-2xl">
                  STUDENT / SENIOR
                </div>
                <CardHeader className="pt-8 pb-4">
                  <CardTitle className="text-xl text-gray-800 font-medium">10 Class Pass</CardTitle>
                </CardHeader>
                <CardContent className="pb-6">
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">$119</span>
                    <span className="text-gray-400 line-through ml-3">$149</span>
                  </div>
                  <ul className="space-y-3 text-gray-600 text-sm">
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                      10 classes to use anytime
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                      Valid at all 3 locations
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                      1 year expiry
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                      Access to all yoga + pilates classes
                    </li>
                  </ul>
                  
                  {/* Promo code reminder */}
                  <div className="mt-6 p-3 rounded-xl bg-green-50 border border-green-200">
                    <p className="text-green-700 text-xs text-center">
                      Use code <span className="font-mono font-bold">BOXING20</span> at checkout
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="pb-8">
                  <div 
                    className="w-full"
                    dangerouslySetInnerHTML={{
                      __html: `<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link w-full bg-green-700 hover:bg-green-800 text-white inline-flex items-center justify-center whitespace-nowrap rounded-xl text-base font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-12 px-6 py-3 cursor-pointer shadow-lg" data-site-id="1889" data-mb-site-id="11233" data-service-id="292" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Buy Student/Senior Pass"></healcode-widget>`
                    }}
                  />
                </CardFooter>
              </Card>
            </div>

            {/* Large Promo Code Reminder */}
            <div className="mt-16 max-w-2xl mx-auto">
              <div className="p-8 rounded-3xl bg-stone-50 border-2 border-red-200 shadow-lg text-center">
                <p className="text-gray-600 mb-4">Don&apos;t forget to enter your promo code at checkout</p>
                <button
                  onClick={copyPromoCode}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 rounded-xl transition-all duration-300"
                >
                  <span className="text-3xl font-mono font-bold tracking-widest text-white">
                    BOXING20
                  </span>
                  {copied ? (
                    <Check className="w-5 h-5 text-white" />
                  ) : (
                    <Copy className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
                  )}
                </button>
                <p className="text-gray-500 text-sm mt-3">
                  {copied ? "Copied!" : "Click to copy code"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-20 bg-stone-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 border border-green-200 text-green-700 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 text-green-600" />
              The Perfect Gift
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Start the New Year{" "}
              <span className="text-green-700">
                Feeling Your Best
              </span>
            </h2>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
              Whether it&apos;s a gift for yourself or someone special, our 10 class pass gives you the flexibility to explore our wide variety of yoga classes at your own pace. Valid for one full year.
            </p>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="p-6 rounded-2xl bg-white border border-red-100">
                <p className="text-red-700 font-semibold mb-2">Flexibility</p>
                <p className="text-gray-600 text-sm">Use your classes whenever works for you. No weekly minimums or restrictions.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-green-100">
                <p className="text-green-700 font-semibold mb-2">Variety</p>
                <p className="text-gray-600 text-sm">Access to 50+ classes per week across all three of our Halifax locations.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-red-100">
                <p className="text-red-700 font-semibold mb-2">1 Year Expiry</p>
                <p className="text-gray-600 text-sm">Plenty of time to use all 10 classes at a pace that suits your lifestyle.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Questions?{" "}
              <span className="text-green-700">
                We&apos;re Here to Help
              </span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Check out our full schedule or explore all our membership options.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline" 
                size="lg" 
                asChild 
                className="px-8 py-6 text-lg border-2 border-green-700 bg-transparent hover:bg-green-50 text-green-700 rounded-full"
              >
                <Link href="/schedule">
                  View Schedule
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                asChild 
                className="px-8 py-6 text-lg border-2 border-red-600 bg-transparent hover:bg-red-50 text-red-600 rounded-full"
              >
                <Link href="/memberships">
                  All Memberships
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Load HealCode script */}
      <Script
        src="https://widgets.mindbodyonline.com/javascripts/healcode.js"
        strategy="afterInteractive"
      />
    </main>
  )
}
