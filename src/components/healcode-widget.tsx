"use client";

import { useHealcodeLoader } from "@/hooks/use-healcode-loader";
import React, { useEffect, useRef, useState } from "react";

interface HealcodeWidgetProps extends React.HTMLAttributes<HTMLElement> {
  "data-type"?: string;
  "data-widget-partner"?: string;
  "data-widget-id"?: string;
  "data-widget-version"?: string;
  "data-site-id"?: string;
  "data-mb-site-id"?: string;
  "data-service-id"?: string;
  "data-bw-identity-site"?: string;
  "data-inner-html"?: string;
  "data-link-class"?: string;
  "data-version"?: string;
}

export function HealcodeWidget({ children, ...props }: HealcodeWidgetProps & { children?: React.ReactNode }) {
  const { isLoaded, isLoading } = useHealcodeLoader();
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasError, setHasError] = useState(false);
  const [widgetRendered, setWidgetRendered] = useState(false);

  useEffect(() => {
    if (!isLoaded || !containerRef.current || widgetRendered || hasError) {
      return;
    }

    try {
      // Clear any existing content
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
        
        // Create the healcode-widget element
        const widgetElement = document.createElement('healcode-widget');
        
        // Set all data attributes
        Object.entries(props).forEach(([key, value]) => {
          if (key.startsWith('data-') && value !== undefined) {
            widgetElement.setAttribute(key, String(value));
          }
        });

        // Set style if provided
        if (props.style) {
          Object.assign(widgetElement.style, props.style);
        }

        // Set class if provided
        if (props.className) {
          widgetElement.className = props.className;
        }

        // Add content if provided
        if (props['data-inner-html']) {
          widgetElement.innerHTML = props['data-inner-html'];
        }

        containerRef.current.appendChild(widgetElement);
        setWidgetRendered(true);
        
        // Add a small delay to ensure the widget initializes
        setTimeout(() => {
          console.log('Healcode widget rendered successfully');
        }, 100);
      }
    } catch (error) {
      console.error('Error rendering healcode widget:', error);
      setHasError(true);
    }
  }, [isLoaded, props, widgetRendered, hasError]);

  // Reset widget state when props change significantly
  const widgetId = props['data-widget-id'];
  const dataType = props['data-type'];
  
  useEffect(() => {
    if (widgetRendered) {
      setWidgetRendered(false);
    }
  }, [widgetId, dataType, widgetRendered]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sage-green mx-auto mb-2"></div>
          <p className="text-gray-600">Loading widget...</p>
        </div>
      </div>
    );
  }

  if (!isLoaded || hasError) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-red-50 border border-red-200 rounded-lg">
        <div className="text-center">
          <p className="text-red-800 mb-4">Unable to load widget</p>
          {children || (
            <button 
              onClick={() => {
                setHasError(false);
                setWidgetRendered(false);
              }}
              className="inline-flex items-center justify-center rounded-md bg-sage-green text-white font-medium px-4 py-2 hover:bg-sage-green/90 transition-colors"
            >
              Retry
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="w-full"
      style={{ minHeight: '400px', ...props.style }}
    />
  );
}