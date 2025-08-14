"use client"

import { useEffect, useRef } from 'react'

export default function SchedulePage() {
  const widgetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load the HealCode script if it hasn't been loaded yet
    if (!document.querySelector('script[src="https://widgets.mindbodyonline.com/javascripts/healcode.js"]')) {
      const script = document.createElement('script')
      script.src = 'https://widgets.mindbodyonline.com/javascripts/healcode.js'
      script.type = 'text/javascript'
      script.async = true
      document.head.appendChild(script)
    }

    // Create the healcode-widget element manually
    if (widgetRef.current) {
      const widget = document.createElement('healcode-widget')
      widget.setAttribute('data-type', 'schedules')
      widget.setAttribute('data-widget-partner', 'object')
      widget.setAttribute('data-widget-id', '68165685be')
      widget.setAttribute('data-widget-version', '1')
      
      // Clear any existing content and append the widget
      widgetRef.current.innerHTML = ''
      widgetRef.current.appendChild(widget)
    }
  }, [])

  return (
    <>
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Class Schedule
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Book your favorite classes with ease.
            </p>
          </div>
        </div>
        
        {/* HealCode Widget for Schedule */}
        <div className="w-full max-w-6xl mx-auto">
          <div ref={widgetRef} id="healcode-widget-container" />
        </div>
      </div>
    </>
  )
} 