 "use client"

import { useEffect } from "react"
import Image from "next/image"
import Script from "next/script"
import { Badge } from "@/components/ui/badge"

export default function IntroOfferLandingPage() {

  // Listen for Mindbody/HealCode widget events via postMessage
  useEffect(() => {
    // Function to close widget and redirect
    const closeWidgetAndRedirect = () => {
      console.log('🔄 Attempting to close widget and redirect...')
      
      // Try to find and click any close buttons in HealCode widgets
      const closeSelectors = [
        '.hc-close',
        '.healcode-close',
        '[class*="close"]',
        'button[aria-label="Close"]',
        'button[aria-label="close"]',
        '.modal-close',
        '.btn-close'
      ]
      
      closeSelectors.forEach(selector => {
        try {
          const closeBtn = document.querySelector(selector) as HTMLElement
          if (closeBtn) {
            closeBtn.click()
            console.log(`Clicked close button: ${selector}`)
          }
        } catch {
          // Ignore errors
        }
      })
      
      // Try to access HealCode's global object and call close if available
      try {
        const healcode = (window as Window & { HealCode?: { closeModal?: () => void } }).HealCode
        if (healcode && typeof healcode.closeModal === 'function') {
          healcode.closeModal()
          console.log('Called HealCode.closeModal()')
        }
      } catch {
        // Ignore errors
      }
      
      // Remove all iframes and overlays
      const removeSelectors = [
        'iframe[src*="mindbody"]',
        'iframe[src*="healcode"]', 
        'iframe[src*="cart.mindbodyonline"]',
        '.healcode-modal',
        '.hc-modal',
        '.hc-overlay',
        '[class*="healcode"]',
        '[class*="hc-modal"]',
        '.modal-backdrop'
      ]
      
      removeSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
          try {
            el.remove()
          } catch {
            // Ignore errors
          }
        })
      })
      
      // Remove any high z-index overlays
      document.querySelectorAll('div, aside, section').forEach(el => {
        try {
          const style = window.getComputedStyle(el)
          const zIndex = parseInt(style.zIndex) || 0
          if (style.position === 'fixed' && zIndex > 100) {
            el.remove()
          }
        } catch {
          // Ignore errors
        }
      })
      
      // Reset body styles
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.classList.remove('modal-open', 'overflow-hidden')
      
      // Force a hard redirect that replaces the current history entry
      console.log('🚀 Redirecting to thank you page...')
      window.location.replace('/intro-offer/thank-you')
    }
    
    const handleMessage = (event: MessageEvent) => {
      // Log all messages for debugging (check browser console)
      console.log('📨 postMessage received:', {
        origin: event.origin,
        data: event.data
      })
      
      // Check for Mindbody-related origins
      const mindbodyOrigins = [
        'mindbodyonline.com',
        'healcode.com',
        'brandedweb.mindbodyonline.com',
        'cart.mindbodyonline.com',
        'clients.mindbodyonline.com'
      ]
      
      const isMindbodyOrigin = mindbodyOrigins.some(origin => 
        event.origin.includes(origin)
      )
      
      if (isMindbodyOrigin) {
        console.log('✅ Mindbody message:', event.data)
        
        const data = event.data
        
        if (typeof data === 'string') {
          const completionKeywords = ['complete', 'success', 'purchased', 'confirmed', 'thank']
          if (completionKeywords.some(keyword => data.toLowerCase().includes(keyword))) {
            console.log('🎉 Purchase completion detected via string message!')
            closeWidgetAndRedirect()
          }
        } else if (typeof data === 'object' && data !== null) {
          const dataStr = JSON.stringify(data).toLowerCase()
          if (
            dataStr.includes('complete') || 
            dataStr.includes('success') || 
            dataStr.includes('purchased') ||
            dataStr.includes('confirmed') ||
            data.type === 'purchase_complete' ||
            data.event === 'purchase_complete' ||
            data.status === 'success'
          ) {
            console.log('🎉 Purchase completion detected via object message!')
            closeWidgetAndRedirect()
          }
        }
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  // Watch for HealCode modal interactions using MutationObserver
  useEffect(() => {
    let modalWasOpen = false
    let purchaseStartTime: number | null = null
    
    const observer = new MutationObserver(() => {
      // Look for HealCode modal elements
      const healcodeModal = document.querySelector('.healcode-modal, .hc-modal, [class*="healcode"], iframe[src*="mindbody"]')
      const mindbodyOverlay = document.querySelector('[class*="mindbody-overlay"], .modal-backdrop, .hc-overlay')
      
      // Check if any modal/iframe is visible
      const modalIsOpen = !!(healcodeModal || mindbodyOverlay || document.querySelector('iframe[src*="cart.mindbodyonline"]'))
      
      if (modalIsOpen && !modalWasOpen) {
        // Modal just opened
        modalWasOpen = true
        purchaseStartTime = Date.now()
        console.log('🛒 HealCode widget/modal opened')
      } else if (!modalIsOpen && modalWasOpen) {
        // Modal just closed
        modalWasOpen = false
        const timeSpent = purchaseStartTime ? (Date.now() - purchaseStartTime) / 1000 : 0
        console.log(`🔄 HealCode widget/modal closed after ${timeSpent.toFixed(1)}s`)
        
        // If user spent enough time (suggesting they completed a flow), 
        // we could potentially redirect, but this is risky as they may have just closed it
        // Uncomment below if postMessage detection doesn't work:
        // if (timeSpent > 30) {
        //   console.log('User spent significant time, may have completed purchase')
        //   router.push('/intro-offer/thank-you')
        // }
        
        purchaseStartTime = null
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style']
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="bg-white">
      {/* Hero Section - Aligned with "Transformation" Ad */}
      <section 
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden -mt-16 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images-in-use/ad-1-landscape.jpg')" }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />

        <div className="container relative z-10 mx-auto px-4 py-32 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Main Headline - From Ad 1 */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-lg">
              Transform Your Practice.{" "}
              <span className="text-sage-green drop-shadow-lg">
                Transform Your Life.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto drop-shadow-lg">
              At Shanti, the mat is where we explore our physical and mental limits 
              so we can show up better for the world outside.
            </p>

            {/* Price Highlight */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-8 py-6 inline-block shadow-2xl">
              <div className="text-center">
                <div className="text-sm uppercase tracking-wide text-gray-600 font-medium">2-Week Intro Pass</div>
                <div className="text-5xl md:text-6xl font-bold gradient-sage-text mt-1">$39</div>
                <div className="text-gray-600 mt-1">Unlimited classes at all 3 locations</div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <div 
                dangerouslySetInnerHTML={{
                  __html: `<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link inline-flex items-center justify-center whitespace-nowrap rounded-full text-xl font-semibold gradient-sage hover:opacity-90 text-white px-12 py-5 shadow-xl cursor-pointer transition-all hover:scale-105" data-site-id="1889" data-mb-site-id="11233" data-service-id="1364" data-bw-identity-site="true" data-type="pricing-link" data-redirect-url="https://shantihotyoga.ca/intro-offer/thank-you" data-inner-html="Claim Your Intro Pass"></healcode-widget>`
                }}
              />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center backdrop-blur-sm">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to{" "}
              <span className="gradient-sage-text">Start Your Journey</span>
            </h2>
            <p className="text-lg text-gray-600">
              Your intro pass unlocks the full Shanti experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-8 rounded-2xl bg-white shadow-lg border border-gray-100">
              <div className="w-16 h-16 gradient-sage rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">14 Days Unlimited</h3>
              <p className="text-gray-600">
                Attend as many classes as you want for two full weeks, including pilates classes.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-white shadow-lg border border-gray-100">
              <div className="w-16 h-16 gradient-sage rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">3 Studio Locations</h3>
              <p className="text-gray-600">
                Practice at Halifax, Bedford, or Dartmouth. Wherever fits your schedule.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-white shadow-lg border border-gray-100">
              <div className="w-16 h-16 gradient-sage rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">All Class Styles</h3>
              <p className="text-gray-600">
                From the intensity of Flow to the stillness of Yin, find what you love.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Off the Mat Section - Aligned with Ad 2 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Lifestyle/Off the Mat image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images-in-use/ad-2-lanscape.jpg"
                alt="The benefits of yoga practice extend into daily life"
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="space-y-6 lg:pl-8">
              <Badge variant="secondary" className="bg-sage-green/10 text-sage-green border-sage-green/20">
                More Than a Workout
              </Badge>
              
              <h2 className="text-3xl md:text-4xl font-bold">
                A Conscious Commitment{" "}
                <span className="gradient-sage-text">to the Mat</span>
              </h2>

              <p className="text-xl text-gray-600 leading-relaxed">
                Your time at Shanti doesn&apos;t end when you leave the studio. It&apos;s about the 
                clarity, resilience, and mindfulness you carry into every other aspect of your life.
              </p>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full gradient-sage flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold">Mental Clarity</span>
                    <p className="text-gray-600">Clear your mind and improve focus for work and life</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full gradient-sage flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold">Physical Resilience</span>
                    <p className="text-gray-600">Build strength, flexibility, and endurance</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full gradient-sage flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold">Stress Relief</span>
                    <p className="text-gray-600">Release tension and find calm in daily challenges</p>
                  </div>
                </li>
              </ul>

              <div className="pt-4">
                <div 
                  dangerouslySetInnerHTML={{
                    __html: `<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link inline-flex items-center justify-center whitespace-nowrap rounded-full text-lg font-semibold gradient-sage hover:opacity-90 text-white px-8 py-4 shadow-lg cursor-pointer transition-all hover:scale-105" data-site-id="1889" data-mb-site-id="11233" data-service-id="1364" data-bw-identity-site="true" data-type="pricing-link" data-redirect-url="https://shantihotyoga.ca/intro-offer/thank-you" data-inner-html="Start Your Journey - $39"></healcode-widget>`
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Locations Section - Aligned with Ad 3 */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="secondary" className="mb-4 bg-sage-green/10 text-sage-green border-sage-green/20">
              One Community, Three Locations
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-sage-text">15 Years</span> of Community.{" "}
              <span className="gradient-sage-text">3 Studios.</span> 1 Pass.
            </h2>
            <p className="text-lg text-gray-600">
              From Downtown Halifax to Bedford and Dartmouth, experience the unique energy 
              of our three beautiful studios with one membership.
            </p>
          </div>

          {/* Studio Cards - Placeholder for 3 location images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images-in-use/36.jpg"
                alt="Halifax Studio"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-1">Halifax</h3>
                <p className="text-white/80 text-sm">5508 Spring Garden Road</p>
              </div>
            </div>

            <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images-in-use/35.jpg"
                alt="Bedford Studio"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-1">Bedford</h3>
                <p className="text-white/80 text-sm">620 Nine Mile Drive</p>
              </div>
            </div>

            <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images-in-use/37.jpg"
                alt="Dartmouth Studio"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-1">Dartmouth</h3>
                <p className="text-white/80 text-sm">114 Woodlawn Road</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <div 
              dangerouslySetInnerHTML={{
                __html: `<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link inline-flex items-center justify-center whitespace-nowrap rounded-full text-lg font-semibold gradient-sage hover:opacity-90 text-white px-8 py-4 shadow-lg cursor-pointer transition-all hover:scale-105" data-site-id="1889" data-mb-site-id="11233" data-service-id="1364" data-bw-identity-site="true" data-type="pricing-link" data-redirect-url="https://shantihotyoga.ca/intro-offer/thank-you" data-inner-html="Get the $39 Pass"></healcode-widget>`
              }}
            />
          </div>
        </div>
      </section>

      {/* Video/Community Section - Aligned with Ad 4 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Video */}
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl order-2 lg:order-1">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
                poster="/images-in-use/YogaShantiMay2022.jpg"
              >
                <source src="/community-video_web.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-black/20 pointer-events-none" />
            </div>

            {/* Content */}
            <div className="space-y-6 order-1 lg:order-2">
              <Badge variant="secondary" className="bg-sage-green/10 text-sage-green border-sage-green/20">
                15 Years Strong
              </Badge>

              <h2 className="text-3xl md:text-4xl font-bold">
                Find Your Peace{" "}
                <span className="gradient-sage-text">in the Heat</span>
              </h2>

              <p className="text-xl text-gray-600 leading-relaxed">
                There&apos;s a reason we&apos;ve been HRM&apos;s home for hot yoga for 15 years. 
                It&apos;s the expert guidance, the diverse classes, and the community you find 
                the moment you walk through our doors.
              </p>

              <div className="grid grid-cols-2 gap-6 py-4">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-3xl font-bold gradient-sage-text">15+</div>
                  <div className="text-sm text-gray-600">Years of Experience</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-3xl font-bold gradient-sage-text">30+</div>
                  <div className="text-sm text-gray-600">Expert Teachers</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-3xl font-bold gradient-sage-text">100</div>
                  <div className="text-sm text-gray-600">Classes Weekly</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-3xl font-bold gradient-sage-text">10+</div>
                  <div className="text-sm text-gray-600">Class Styles</div>
                </div>
              </div>

              <div className="pt-2">
                <div 
                  dangerouslySetInnerHTML={{
                    __html: `<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link inline-flex items-center justify-center whitespace-nowrap rounded-full text-lg font-semibold gradient-sage hover:opacity-90 text-white px-8 py-4 shadow-lg cursor-pointer transition-all hover:scale-105" data-site-id="1889" data-mb-site-id="11233" data-service-id="1364" data-bw-identity-site="true" data-type="pricing-link" data-redirect-url="https://shantihotyoga.ca/intro-offer/thank-you" data-inner-html="Book Your First Class"></healcode-widget>`
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Class Styles Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Find the Practice That{" "}
              <span className="gradient-sage-text">Feels Right</span>
            </h2>
            <p className="text-lg text-gray-600">
              Our Intro Pass gives you 14 days to explore different teachers, styles, 
              and intensities. Find the practice that fits your body and your goals.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl text-center shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-2">🔥</div>
              <h3 className="font-semibold">All Levels</h3>
              <p className="text-sm text-gray-500">Accessible & Challenging</p>
            </div>
            <div className="bg-white p-6 rounded-xl text-center shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-2">🌙</div>
              <h3 className="font-semibold">Yin Yoga</h3>
              <p className="text-sm text-gray-500">Deep & Restorative</p>
            </div>
            <div className="bg-white p-6 rounded-xl text-center shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-2">💪</div>
              <h3 className="font-semibold">Pilates</h3>
              <p className="text-sm text-gray-500">Core & Strength</p>
            </div>
            <div className="bg-white p-6 rounded-xl text-center shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-2">🧘</div>
              <h3 className="font-semibold">Vinyasa</h3>
              <p className="text-sm text-gray-500">Flowing Movement</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-grid-slate-100" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform{" "}
              <span className="text-sage-green">Your Practice?</span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-8">
              Whether you&apos;re seeking the intensity of a Flow class or the stillness of Yin, 
              our expert teachers are here to guide your personal journey.
            </p>

            {/* Price Box */}
            <div className="bg-white rounded-2xl p-8 max-w-md mx-auto mb-8 shadow-2xl">
              <div className="text-sm uppercase tracking-wide text-gray-500 font-medium">2-Week Intro Pass</div>
              <div className="text-6xl font-bold gradient-sage-text my-2">$39</div>
              <div className="text-gray-600 mb-6">Unlimited classes • All 3 locations • 14 days</div>
              
              <div 
                dangerouslySetInnerHTML={{
                  __html: `<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link w-full inline-flex items-center justify-center whitespace-nowrap rounded-full text-xl font-semibold gradient-sage hover:opacity-90 text-white px-8 py-5 shadow-lg cursor-pointer transition-all hover:scale-105" data-site-id="1889" data-mb-site-id="11233" data-service-id="1364" data-bw-identity-site="true" data-type="pricing-link" data-redirect-url="https://shantihotyoga.ca/intro-offer/thank-you" data-inner-html="Sign Up for 2 Weeks"></healcode-widget>`
                }}
              />

              <p className="text-xs text-gray-400 mt-4">
                No commitment required. Available for new students only.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Common <span className="gradient-sage-text">Questions</span>
            </h2>

            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="font-semibold text-lg mb-2">Is this offer for new students only?</h3>
                <p className="text-gray-600">
                  Yes, the 2-Week Intro Pass is available for those who are new to Shanti Hot Yoga.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="font-semibold text-lg mb-2">Do I need to bring anything?</h3>
                <p className="text-gray-600">
                  Just bring water, a towel, and comfortable clothing. We have mats available 
                  for rent if you don&apos;t have your own.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="font-semibold text-lg mb-2">Can I really attend unlimited classes?</h3>
                <p className="text-gray-600">
                  Absolutely! Your pass gives you access to every class on our schedule at all 
                  three locations for 14 days. Many students attend 10+ classes during their intro period. 
                  Note that workshops are not included in the intro pass and are an additional cost.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="font-semibold text-lg mb-2">I&apos;ve never done hot yoga. Is it safe?</h3>
                <p className="text-gray-600">
                  Yes! Our experienced teachers are trained to guide beginners safely. We recommend 
                  staying hydrated and taking breaks as needed. The heat helps loosen muscles and 
                  deepen your practice.
                </p>
              </div>

              <div className="pb-6">
                <h3 className="font-semibold text-lg mb-2">What happens after my intro pass expires?</h3>
                <p className="text-gray-600">
                  There&apos;s no obligation to continue! If you love your experience (and we think you will), 
                  we&apos;ll help you find the membership or class pass that fits your lifestyle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Load HealCode script */}
      <Script
        src="https://widgets.mindbodyonline.com/javascripts/healcode.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('HealCode script loaded successfully for intro offer page')
        }}
        onError={(e) => {
          console.error('Failed to load HealCode script for intro offer page:', e)
        }}
      />
    </div>
  )
}
