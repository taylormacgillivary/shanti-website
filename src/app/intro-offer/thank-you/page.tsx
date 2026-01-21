"use client"

import Image from "next/image"
import Link from "next/link"
import Script from "next/script"
import { Button } from "@/components/ui/button"

export default function IntroOfferThankYouPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden -mt-16">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
          <div className="absolute inset-0 opacity-20">
            <Image
              src="/images-in-use/12.jpg"
              alt="Yoga community"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="container mx-auto px-4 pt-16">
          <div className="max-w-3xl mx-auto text-center">
            {/* Success Icon */}
            <div className="w-24 h-24 gradient-sage rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Welcome to the{" "}
              <span className="text-sage-green">Shanti Community!</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Your 2-Week Intro Pass is now active. We can&apos;t wait to see you on the mat.
            </p>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20">
              <p className="text-white text-lg">
                <span className="font-semibold">Check your email</span> for your confirmation 
                and details on how to book your first class.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Your Next <span className="gradient-sage-text">Steps</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Here&apos;s everything you need to make the most of your intro pass
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 gradient-sage rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                1
              </div>
              <div className="bg-gray-50 rounded-2xl p-8 pt-10 h-full">
                <h3 className="text-xl font-bold mb-3">Download the App</h3>
                <p className="text-gray-600 mb-4">
                  Get the MindBody app to easily browse schedules and book classes at all three locations.
                </p>
                <div className="flex gap-3">
                  <a 
                    href="https://apps.apple.com/app/mindbody/id689501356" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-sage-green hover:underline"
                  >
                    iOS App →
                  </a>
                  <a 
                    href="https://play.google.com/store/apps/details?id=com.mindbodyonline.connect" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-sage-green hover:underline"
                  >
                    Android App →
                  </a>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 gradient-sage rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                2
              </div>
              <div className="bg-gray-50 rounded-2xl p-8 pt-10 h-full">
                <h3 className="text-xl font-bold mb-3">Book Your First Class</h3>
                <p className="text-gray-600 mb-4">
                  Browse our schedule and book a class that fits your level. We recommend starting 
                  with a Basics or gentle Flow class.
                </p>
                <Link 
                  href="/schedule" 
                  className="text-sm font-medium text-sage-green hover:underline"
                >
                  View Schedule →
                </Link>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 gradient-sage rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                3
              </div>
              <div className="bg-gray-50 rounded-2xl p-8 pt-10 h-full">
                <h3 className="text-xl font-bold mb-3">Arrive Early</h3>
                <p className="text-gray-600 mb-4">
                  For your first visit, arrive 15 minutes early to complete a brief waiver and 
                  get oriented with the studio.
                </p>
                <Link 
                  href="/waiver" 
                  className="text-sm font-medium text-sage-green hover:underline"
                >
                  Complete Waiver Online →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Bring Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  What to <span className="gradient-sage-text">Bring</span>
                </h2>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full gradient-sage flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-semibold">Water Bottle</span>
                      <p className="text-gray-600 text-sm">Stay hydrated! Bring at least 1L of water.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full gradient-sage flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-semibold">Towel</span>
                      <p className="text-gray-600 text-sm">A large towel for your mat and a small one for your face.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full gradient-sage flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-semibold">Comfortable Clothing</span>
                      <p className="text-gray-600 text-sm">Light, breathable clothes you can move in.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full gradient-sage flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-semibold">Open Mind</span>
                      <p className="text-gray-600 text-sm">Come ready to explore and enjoy the journey!</p>
                    </div>
                  </li>
                </ul>
                <p className="text-sm text-gray-500 mt-6">
                  Don&apos;t have a mat? No problem—we have mats available at all studios.
                </p>
              </div>

              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images-in-use/20.jpg"
                  alt="Yoga class at Shanti"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Quick Reference */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Find Your <span className="gradient-sage-text">Studio</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-2">Halifax</h3>
              <p className="text-gray-600 mb-3">6085 Cunard St</p>
              <a 
                href="https://maps.google.com/?q=6085+Cunard+St+Halifax+NS" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm font-medium text-sage-green hover:underline"
              >
                Get Directions →
              </a>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-2">Bedford</h3>
              <p className="text-gray-600 mb-3">1658 Bedford Hwy</p>
              <a 
                href="https://maps.google.com/?q=1658+Bedford+Hwy+Bedford+NS" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm font-medium text-sage-green hover:underline"
              >
                Get Directions →
              </a>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-2">Dartmouth</h3>
              <p className="text-gray-600 mb-3">50 Tacoma Dr</p>
              <a 
                href="https://maps.google.com/?q=50+Tacoma+Dr+Dartmouth+NS" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm font-medium text-sage-green hover:underline"
              >
                Get Directions →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Book Your First Class?
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Browse our schedule and find a class that works for you. 
            Remember, your pass works at all three locations!
          </p>
          <Button size="lg" asChild className="gradient-sage hover:opacity-90 text-white px-8 py-4 text-lg shadow-lg">
            <Link href="/schedule">
              View Class Schedule
            </Link>
          </Button>
        </div>
      </section>

      {/* Meta Pixel Purchase Event - Fires on page load for conversion tracking */}
      <Script id="meta-pixel-purchase" strategy="afterInteractive">
        {`
          if (typeof fbq !== 'undefined') {
            fbq('track', 'Purchase', {
              value: 39.00,
              currency: 'CAD',
              content_name: '2-Week Intro Pass',
              content_type: 'product'
            });
            console.log('Meta Pixel: Purchase event fired for Intro Pass');
          }
        `}
      </Script>
    </div>
  )
}
