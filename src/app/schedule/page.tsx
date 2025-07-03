"use client"

import Script from "next/script";

export default function SchedulePage() {
  return (
    <>
      <Script
        src="https://widgets.mindbodyonline.com/javascripts/healcode.js"
        type="text/javascript"
      />
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
        
        {/* Branded Web Schedule Widget Container */}
        <div className="w-full">
          {/* @ts-expect-error - Mindbody widget */}
          <healcode-widget
            data-type="schedules"
            data-widget-partner="object"
            data-widget-id="68165685be"
            data-widget-version="1"
            data-site-id="1889"
            data-mb-site-id="11233"
            style={{
              width: '100%',
              minHeight: '600px'
            }}
          />
        </div>
        
        {/* Fallback content */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Having trouble viewing the schedule? 
            <a 
              href="https://clients.mindbodyonline.com/classic/ws?studioid=11233" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 ml-1"
            >
              Visit our booking page directly
            </a>
          </p>
        </div>
      </div>
    </>
  )
} 