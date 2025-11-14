"use client"

import Script from 'next/script'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SchedulePage() {
  const router = useRouter()

  useEffect(() => {
    // Intercept and prevent redirects to /booking-confirmed
    // This handles redirects from MindBody widget after successful booking
    
    let isBlocking = false

    // Monitor URL changes and prevent redirects to /booking-confirmed
    const checkAndBlockRedirect = () => {
      if (window.location.pathname === '/booking-confirmed') {
        if (!isBlocking) {
          isBlocking = true
          console.log('Blocked redirect to /booking-confirmed, staying on schedule page')
          // Use replaceState to change URL back without triggering navigation
          window.history.replaceState(null, '', '/schedule')
          // Reset blocking flag after a short delay
          setTimeout(() => {
            isBlocking = false
          }, 100)
        }
      }
    }

    // Listen for postMessage events from MindBody iframe
    const handleMessage = (event: MessageEvent) => {
      // Block any redirect attempts to /booking-confirmed
      const data = event.data
      if (data && (
        (typeof data === 'string' && data.includes('/booking-confirmed')) ||
        (typeof data === 'object' && (
          data.redirect === '/booking-confirmed' ||
          data.url === '/booking-confirmed' ||
          data.pathname === '/booking-confirmed'
        ))
      )) {
        console.log('Blocked postMessage redirect to /booking-confirmed')
        event.stopPropagation()
        event.preventDefault()
      }
    }

    // Intercept Next.js router navigation
    const originalPush = router.push
    const originalReplace = router.replace
    
    router.push = ((url: string | URL, options?: any) => {
      const urlString = typeof url === 'string' ? url : url.pathname
      if (urlString === '/booking-confirmed' || urlString.startsWith('/booking-confirmed')) {
        console.log('Blocked router.push to /booking-confirmed')
        return Promise.resolve(false)
      }
      return originalPush.call(router, url, options)
    }) as typeof router.push

    router.replace = ((url: string | URL, options?: any) => {
      const urlString = typeof url === 'string' ? url : url.pathname
      if (urlString === '/booking-confirmed' || urlString.startsWith('/booking-confirmed')) {
        console.log('Blocked router.replace to /booking-confirmed')
        return Promise.resolve(false)
      }
      return originalReplace.call(router, url, options)
    }) as typeof router.replace

    // Set up event listeners
    window.addEventListener('message', handleMessage)
    
    // Monitor URL changes
    const intervalId = setInterval(checkAndBlockRedirect, 50)
    window.addEventListener('popstate', checkAndBlockRedirect)
    window.addEventListener('hashchange', checkAndBlockRedirect)
    
    // Initial check
    checkAndBlockRedirect()

    return () => {
      window.removeEventListener('message', handleMessage)
      window.removeEventListener('popstate', checkAndBlockRedirect)
      window.removeEventListener('hashchange', checkAndBlockRedirect)
      clearInterval(intervalId)
      // Restore original router methods
      router.push = originalPush
      router.replace = originalReplace
    }
  }, [router])

  return (
    <>
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Class Schedule
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Book your favourite classes with ease. If you haven&apos;t purchased a pass yet, you&apos;ll be prompted to purchase when you book.
            </p>
          </div>
        </div>
        
        {/* HealCode Widget for Schedule */}
        <div className="w-full max-w-6xl mx-auto">
          <div 
            dangerouslySetInnerHTML={{
              __html: `<healcode-widget data-type="schedules" data-widget-partner="object" data-widget-id="68165685be" data-widget-version="1"></healcode-widget>`
            }}
          />
        </div>
        
        {/* Load HealCode script using Next.js Script component */}
        <Script
          src="https://widgets.mindbodyonline.com/javascripts/healcode.js"
          strategy="afterInteractive"
          onLoad={() => {
            console.log('HealCode script loaded successfully')
          }}
          onError={(e) => {
            console.error('Failed to load HealCode script:', e)
          }}
        />
      </div>
    </>
  )
} 