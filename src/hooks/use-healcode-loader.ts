"use client";

import { useEffect, useState, useCallback } from 'react';

export function useHealcodeLoader() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadHealcode = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    // Check if script is already loaded
    if (window.HealcodeWidget) {
      setIsLoaded(true);
      setIsLoading(false);
      return;
    }

    // Check if script is already in DOM
    const existingScript = document.getElementById('healcode-script');
    if (existingScript) {
      // Script exists but not loaded yet, wait for it
      existingScript.addEventListener('load', () => {
        setIsLoaded(true);
        setIsLoading(false);
      });
      return;
    }

    // Load the script
    setIsLoading(true);
    const script = document.createElement('script');
    script.id = 'healcode-script';
    script.src = 'https://widgets.mindbodyonline.com/javascripts/healcode.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    
    script.onload = () => {
      setIsLoaded(true);
      setIsLoading(false);
    };
    
    script.onerror = () => {
      console.error('Failed to load healcode script');
      setIsLoading(false);
    };

    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    loadHealcode();
  }, [loadHealcode]);

  return { isLoaded, isLoading };
}

declare global {
  interface Window {
    HealcodeWidget: unknown;
  }
}