"use client"

import Script from "next/script";
import { useState, useEffect } from "react";

export default function SchedulePage() {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState(false);

  useEffect(() => {
    // Check if healcode widget is already loaded from another page
    if (typeof window !== 'undefined' && (window as any).HealcodeWidget) {
      setScriptLoaded(true);
    }
  }, []);

  return (
    <>
      <Script
        src="https://widgets.mindbodyonline.com/javascripts/healcode.js"
        type="text/javascript"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('Healcode script loaded successfully');
          setScriptLoaded(true);
          setScriptError(false);
        }}
        onError={(e) => {
          console.error('Error loading healcode script:', e);
          setScriptError(true);
        }}
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
          {scriptError ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <p className="text-red-800 mb-4">
                Unable to load the class schedule widget. Please try refreshing the page or use the direct booking link below.
              </p>
              <a 
                href="https://clients.mindbodyonline.com/classic/ws?studioid=11233" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md bg-sage-green text-white font-medium px-6 py-3 hover:bg-sage-green/90 transition-colors"
              >
                Book Classes Directly
              </a>
            </div>
          ) : (
            <>
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
                  minHeight: '600px',
                  display: scriptLoaded ? 'block' : 'none'
                }}
              />
              
              {/* Loading state */}
              {!scriptLoaded && (
                <div className="flex items-center justify-center min-h-[600px] bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage-green mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading class schedule...</p>
                  </div>
                </div>
              )}
            </>
          )}
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