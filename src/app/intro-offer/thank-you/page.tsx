"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function IntroOfferThankYouPage() {
  // Fire Meta Pixel Purchase event for conversion tracking
  useEffect(() => {
    // Define fbq type for Meta Pixel
    type FbqFunction = (action: string, event: string, params?: Record<string, unknown>) => void
    
    const firePurchaseEvent = () => {
      const windowWithFbq = window as Window & { fbq?: FbqFunction }
      if (typeof window !== 'undefined' && typeof windowWithFbq.fbq === 'function') {
        windowWithFbq.fbq('track', 'Purchase', {
          value: 39.00,
          currency: 'CAD',
          content_name: '2-Week Intro Pass',
          content_type: 'product'
        })
        console.log('✅ Meta Pixel: Purchase event fired for Intro Pass')
        return true
      }
      return false
    }
    
    // Try to fire immediately
    if (!firePurchaseEvent()) {
      // If fbq not ready, retry a few times
      let attempts = 0
      const maxAttempts = 10
      const interval = setInterval(() => {
        attempts++
        if (firePurchaseEvent() || attempts >= maxAttempts) {
          clearInterval(interval)
          if (attempts >= maxAttempts) {
            console.warn('⚠️ Meta Pixel: Could not fire Purchase event - fbq not available')
          }
        }
      }, 200)
      
      return () => clearInterval(interval)
    }
  }, [])

  // Clean up any leftover HealCode/Mindbody modal elements from the purchase flow
  useEffect(() => {
    // Function to remove modal elements
    const cleanupModals = () => {
      // Selectors for modal elements that might still be visible
      const modalSelectors = [
        'iframe[src*="mindbody"]',
        'iframe[src*="healcode"]',
        'iframe[src*="cart.mindbodyonline"]',
        '.healcode-modal',
        '.hc-modal',
        '.hc-overlay',
        '[class*="healcode-overlay"]',
        '[class*="mindbody-modal"]',
        '[class*="mindbody-overlay"]',
        '.modal-backdrop',
        '[class*="hc-"]',
        '[id*="healcode"]',
        '[id*="mindbody"]'
      ]
      
      let removedCount = 0
      modalSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
          // Remove the element completely from DOM
          el.remove()
          removedCount++
        })
      })
      
      // Also look for any fixed/absolute positioned full-screen overlays
      document.querySelectorAll('div').forEach(el => {
        const style = window.getComputedStyle(el)
        const isOverlay = (
          (style.position === 'fixed' || style.position === 'absolute') &&
          (style.zIndex === '9999' || parseInt(style.zIndex) > 1000) &&
          (style.top === '0px' || style.left === '0px')
        )
        if (isOverlay && el.querySelector('iframe')) {
          el.remove()
          removedCount++
        }
      })
      
      // Remove any body scroll locks that modals may have added
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.classList.remove('modal-open', 'overflow-hidden', 'no-scroll')
      
      // Also remove any fixed positioning on html element
      document.documentElement.style.overflow = ''
      
      if (removedCount > 0) {
        console.log(`✅ Removed ${removedCount} leftover modal elements`)
      }
    }
    
    // Run cleanup immediately
    cleanupModals()
    
    // Also run after a short delay in case elements load asynchronously
    const cleanupTimeout = setTimeout(cleanupModals, 200)
    
    // And again after a longer delay just to be sure
    const cleanupTimeout2 = setTimeout(cleanupModals, 500)
    
    return () => {
      clearTimeout(cleanupTimeout)
      clearTimeout(cleanupTimeout2)
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center -mt-16 pt-16 bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          {/* Success Icon */}
          <div className="w-24 h-24 gradient-sage rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Welcome to the{" "}
            <span className="gradient-sage-text">Shanti Community!</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 mb-10 leading-relaxed">
            Your 2-Week Intro Pass is now active. We can&apos;t wait to see you on the mat.
          </p>

          <Button size="lg" asChild className="gradient-sage hover:opacity-90 text-white px-10 py-6 text-xl shadow-lg">
            <Link href="/schedule">
              Book Your First Class
            </Link>
          </Button>
        </div>
      </div>

    </div>
  )
}
