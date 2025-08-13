"use client";

import { useHealcodeLoader } from "@/hooks/use-healcode-loader";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

interface HealcodeLinkProps {
  "data-version"?: string;
  "data-link-class"?: string;
  "data-site-id"?: string;
  "data-mb-site-id"?: string;
  "data-service-id"?: string;
  "data-bw-identity-site"?: string;
  "data-type"?: string;
  "data-inner-html"?: string;
  fallbackHref?: string;
  className?: string;
  children?: React.ReactNode;
}

export function HealcodeLink({ 
  fallbackHref, 
  className = "w-full gradient-sage text-white",
  children,
  ...props 
}: HealcodeLinkProps) {
  const { isLoaded, isLoading } = useHealcodeLoader();
  const containerRef = useRef<HTMLButtonElement>(null);
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

        containerRef.current.appendChild(widgetElement);
        setWidgetRendered(true);
        
        console.log('Healcode link widget rendered successfully');
      }
    } catch (error) {
      console.error('Error rendering healcode link widget:', error);
      setHasError(true);
    }
  }, [isLoaded, props, widgetRendered, hasError]);

  // Reset widget state when props change significantly
  const serviceId = props['data-service-id'];
  const dataType = props['data-type'];
  
  useEffect(() => {
    if (widgetRendered) {
      setWidgetRendered(false);
    }
  }, [serviceId, dataType, widgetRendered]);

  if (isLoading) {
    return (
      <Button className={className} disabled>
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          Loading...
        </div>
      </Button>
    );
  }

  if (!isLoaded || hasError) {
    if (fallbackHref) {
      return (
        <a
          href={fallbackHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`block flex items-center justify-center rounded-md py-2 ${className}`}
        >
          {children || props['data-inner-html'] || 'Book Now'}
        </a>
      );
    }

    return (
      <Button 
        className={className} 
        onClick={() => {
          setHasError(false);
          setWidgetRendered(false);
        }}
      >
        Retry
      </Button>
    );
  }

  return (
    <Button 
      ref={containerRef}
      className={className}
      asChild={false}
    />
  );
}