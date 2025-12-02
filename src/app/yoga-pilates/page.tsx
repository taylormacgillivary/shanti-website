"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import Script from "next/script"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Flame, Heart, MapPin, Zap, Lock } from "lucide-react"

const CORRECT_PASSWORD = "hotpilates"

export default function YogaPilatesLandingPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if already authenticated in this session
    const auth = sessionStorage.getItem("yoga-pilates-auth")
    if (auth === "true") {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === CORRECT_PASSWORD) {
      sessionStorage.setItem("yoga-pilates-auth", "true")
      setIsAuthenticated(true)
      setError(false)
    } else {
      setError(true)
    }
  }

  // Show loading state
  if (isLoading) {
    return (
      <main className="min-h-screen bg-stone-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-lime-500 border-t-transparent rounded-full animate-spin" />
      </main>
    )
  }

  // Show password gate
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-stone-950 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10 mb-6">
              <Lock className="w-8 h-8 text-lime-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Preview Access</h1>
            <p className="text-white/60">Enter the password to view this page</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError(false)
                }}
                placeholder="Enter password"
                className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                  error ? "border-red-500" : "border-white/10"
                } text-white placeholder:text-white/40 focus:outline-none focus:border-lime-500 transition-colors`}
                autoFocus
              />
              {error && (
                <p className="mt-2 text-sm text-red-400">Incorrect password. Please try again.</p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-lime-500 to-emerald-600 hover:from-lime-400 hover:to-emerald-500 text-white font-semibold rounded-xl"
            >
              Access Page
            </Button>
          </form>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-stone-950">
      {/* Hero Section - Inspired by "Smart Math" Ad */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images-in-use/pilates-ad-1.jpg"
            alt="Split view of yoga child's pose and pilates plank"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/50 via-stone-950/30 to-stone-950" />
        
        {/* Hero Content */}
        <div className="container relative z-10 mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium">
              <Flame className="w-4 h-4 text-amber-400" />
              Hot Yoga + Hot Pilates
            </div>
            
            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white">
              The Burn.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-lime-300 to-emerald-400">
                The Bliss.
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl font-light text-white/80">
              One Membership.
            </p>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              Why choose between your workout and your recovery? Get the high-intensity tone of Hot Pilates AND the restoration of Hot Yoga. Unlimited access for less than the cost of a reformer pass elsewhere.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <Button 
                size="lg" 
                asChild 
                className="bg-gradient-to-r from-lime-500 to-emerald-600 hover:from-lime-400 hover:to-emerald-500 text-white px-10 py-6 text-lg font-semibold shadow-2xl shadow-emerald-900/40 rounded-full"
              >
                <a href="#memberships">
                  View Membership Options
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                asChild 
                className="px-10 py-6 text-lg border-2 border-white/30 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white rounded-full"
              >
                <Link href="/schedule">
                  See Today&apos;s Schedule
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2" />
          </div>
        </div>
      </section>

      {/* Benefits Section - "You Are The Machine" messaging */}
      <section className="py-24 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                No Machines.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-lime-400">
                  Just You.
                </span>
              </h2>
              <p className="text-xl text-white/60 max-w-2xl mx-auto">
                You don&apos;t need coils and springs to build a stronger core. Our Hot Pilates classes use your body weight and the heat to create deep, functional strength.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Benefit 1 */}
              <div className="group p-8 rounded-3xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 hover:border-lime-500/30 transition-all duration-500">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Flame className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Burn Deeper</h3>
                <p className="text-white/60 leading-relaxed">
                  The heat amplifies every movement, helping you build lean muscle and torch calories faster than traditional classes.
                </p>
              </div>

              {/* Benefit 2 */}
              <div className="group p-8 rounded-3xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 hover:border-lime-500/30 transition-all duration-500">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-lime-500 to-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Heart className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Restore Fully</h3>
                <p className="text-white/60 leading-relaxed">
                  Balance intense workouts with restorative yoga. Give your body the recovery it needs to perform at its peak.
                </p>
              </div>

              {/* Benefit 3 */}
              <div className="group p-8 rounded-3xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 hover:border-lime-500/30 transition-all duration-500">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Train Smarter</h3>
                <p className="text-white/60 leading-relaxed">
                  Functional strength that translates to real life. Build a body that moves better, not just looks better.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* "The Glow" Results Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images-in-use/pilates-ad-3.jpg"
            alt="Post-class glow"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/70 via-stone-950/50 to-stone-950/30" />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime-500/20 border border-lime-500/30 text-lime-400 text-sm font-medium mb-6">
              <Check className="w-4 h-4" />
              Real Results
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              That Post-Class{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-300 to-pink-400">
                High
              </span>
            </h2>
            
            <p className="text-xl text-white/70 mb-8 leading-relaxed">
              The endorphins of a pilates workout met with the mindfulness of yoga. Walk out feeling stronger, clearer, and more alive. This is the Shanti difference.
            </p>

            <div className="space-y-4">
              {[
                "Increased flexibility & core strength",
                "Better sleep & stress management",
                "More energy throughout your day",
                "A supportive community that keeps you coming back"
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-3 text-white/80">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-lime-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Location Section - "Downtown Grind" */}
      <section className="relative py-24">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images-in-use/pilates-ad-2.jpg"
            alt="Shanti Hot Yoga studio on Spring Garden Road"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/60 to-stone-950/40" />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-6">
              <MapPin className="w-4 h-4 text-rose-400" />
              Spring Garden Road, Halifax
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Your Sanctuary on{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-lime-400">
                Spring Garden
              </span>
            </h2>
            
            <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              Downtown life moves fast. Slow it down (or sweat it out) without breaking the bank. Accessible Pilates and Yoga right in the heart of Halifax.
            </p>
          </div>
        </div>
      </section>

      {/* Membership Options Section */}
      <section id="memberships" className="py-24 bg-gradient-to-b from-stone-950 to-stone-900">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Unlimited{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-400">
                  Yoga + Pilates
                </span>
              </h2>
              <p className="text-xl text-white/60 max-w-2xl mx-auto">
                One membership. All classes. All three locations. Cancel anytime after your initial term.
              </p>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* 1 Month - No Commitment */}
              <Card className="relative bg-gradient-to-b from-white/5 to-white/[0.02] border-white/10 rounded-3xl overflow-hidden">
                <CardHeader className="pt-8 pb-4">
                  <CardTitle className="text-xl text-white/80 font-medium">1 Month Membership</CardTitle>
                </CardHeader>
                <CardContent className="pb-6">
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-white">$159</span>
                    <span className="text-white/50">/month</span>
                  </div>
                  <ul className="space-y-3 text-white/70">
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-lime-400" />
                      Unlimited Hot Yoga + Hot Pilates
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-lime-400" />
                      Access to all 3 locations
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-lime-400" />
                      No commitment required
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-lime-400" />
                      Cancel anytime
                    </li>
                  </ul>
                  <p className="mt-4 text-sm text-white/50">
                    Student/Senior: $142/month (use code STUDENTONE1)
                  </p>
                </CardContent>
                <CardFooter className="pb-8">
                  <Button 
                    className="w-full py-6 text-lg font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl" 
                    asChild
                  >
                    <a 
                      href="https://clients.mindbodyonline.com/classic/ws?studioid=11233&stype=40&prodId=189" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Get Started
                    </a>
                  </Button>
                </CardFooter>
              </Card>

              {/* Monthly - Best Value */}
              <Card className="relative bg-gradient-to-b from-lime-500/10 to-emerald-500/5 border-lime-500/30 rounded-3xl overflow-hidden">
                {/* Popular Badge */}
                <div className="absolute top-0 right-0 bg-gradient-to-r from-lime-500 to-emerald-500 text-white text-sm font-bold px-4 py-2 rounded-bl-2xl">
                  BEST VALUE
                </div>
                <CardHeader className="pt-8 pb-4">
                  <CardTitle className="text-xl text-white/80 font-medium">Monthly Membership</CardTitle>
                </CardHeader>
                <CardContent className="pb-6">
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-white">$149</span>
                    <span className="text-white/50">/month</span>
                  </div>
                  <ul className="space-y-3 text-white/70">
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-lime-400" />
                      Unlimited Hot Yoga + Hot Pilates
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-lime-400" />
                      Access to all 3 locations
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-lime-400" />
                      <span className="text-lime-400 font-medium">Save $10/month</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-lime-400" />
                      4 month initial commitment
                    </li>
                  </ul>
                  <p className="mt-4 text-sm text-white/50">
                    Student/Senior: $123/month (use code STUDENT1)
                  </p>
                </CardContent>
                <CardFooter className="pb-8">
                  <Button 
                    className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-lime-500 to-emerald-600 hover:from-lime-400 hover:to-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-900/30" 
                    asChild
                  >
                    <a 
                      href="https://clients.mindbodyonline.com/classic/ws?studioid=11233&stype=40&prodId=190" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Get Started
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Trial Offer */}
            <div className="mt-16 p-8 md:p-12 rounded-3xl bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-violet-500/10 border border-white/10 text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Not sure yet? Try us first.
              </h3>
              <p className="text-white/60 mb-6 max-w-xl mx-auto">
                Get unlimited classes for your first two weeks for only $39. Experience the Shanti difference before you commit.
              </p>
              <div 
                dangerouslySetInnerHTML={{
                  __html: `<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link inline-flex items-center justify-center whitespace-nowrap rounded-full text-lg font-semibold bg-white/10 hover:bg-white/20 text-white px-8 py-4 border border-white/20 cursor-pointer transition-all" data-site-id="1889" data-mb-site-id="11233" data-service-id="1364" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Start Your $39 Trial"></healcode-widget>`
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-stone-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Feel the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-lime-300 to-emerald-400">
                Difference
              </span>
              ?
            </h2>
            <p className="text-xl text-white/60 mb-10">
              Join thousands of Haligonians who have made Shanti part of their wellness routine.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                asChild 
                className="bg-gradient-to-r from-lime-500 to-emerald-600 hover:from-lime-400 hover:to-emerald-500 text-white px-10 py-6 text-lg font-semibold rounded-full shadow-2xl"
              >
                <a href="#memberships">
                  Join Now
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                asChild 
                className="px-10 py-6 text-lg border-2 border-white/20 bg-transparent hover:bg-white/5 text-white rounded-full"
              >
                <Link href="/schedule">
                  Book a Class
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

