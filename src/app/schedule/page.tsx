"use client"

import Script from 'next/script'

export default function SchedulePage() {

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