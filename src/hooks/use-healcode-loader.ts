"use client";

import { useEffect, useState, useCallback } from 'react';

export function useHealcodeLoader() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkHealcodeReady = useCallback(() => {
    if (typeof window === 'undefined') return false;
    
    // Check if HealcodeWidget exists and is functional
    if (!window.HealcodeWidget) return false;
    
    // Additional check: ensure the widget constructor is available
    try {
      return typeof window.HealcodeWidget === 'object' || typeof window.HealcodeWidget === 'function';
    } catch {
      return false;
    }
  }, []);

  const loadHealcode = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    // Check if HealcodeWidget is already available and functional
    if (checkHealcodeReady()) {
      setIsLoaded(true);
      setIsLoading(false);
      return;
    }

    // Check if script is already in DOM
    const existingScript = document.getElementById('healcode-script');
    if (existingScript) {
      // Wait for the existing script to load and initialize
      const checkInterval = setInterval(() => {
        if (checkHealcodeReady()) {
          setIsLoaded(true);
          setIsLoading(false);
          clearInterval(checkInterval);
        }
      }, 100);
      
      // Timeout after 10 seconds
      setTimeout(() => {
        clearInterval(checkInterval);
        if (!checkHealcodeReady()) {
          console.error('Healcode script failed to initialize');
          setIsLoading(false);
        }
      }, 10000);
      
      return;
    }

    // Load the script for the first time
    const script = document.createElement('script');
    script.id = 'healcode-script';
    script.src = 'https://widgets.mindbodyonline.com/javascripts/healcode.js';
    script.async = false; // Load synchronously to ensure proper initialization
    script.crossOrigin = 'anonymous';
    
    script.onload = () => {
      // Wait for HealcodeWidget to be properly initialized
      const checkInterval = setInterval(() => {
        if (checkHealcodeReady()) {
          setIsLoaded(true);
          setIsLoading(false);
          clearInterval(checkInterval);
        }
      }, 50);
      
      // Timeout after 5 seconds
      setTimeout(() => {
        clearInterval(checkInterval);
        if (!checkHealcodeReady()) {
          console.error('Healcode script loaded but HealcodeWidget not initialized');
          setIsLoading(false);
        }
      }, 5000);
    };
    
    script.onerror = () => {
      console.error('Failed to load healcode script');
      setIsLoading(false);
    };

    document.head.appendChild(script);
  }, [checkHealcodeReady]);

  useEffect(() => {
    loadHealcode();

    // Listen for global ready event
    const handleGlobalReady = () => {
      if (checkHealcodeReady()) {
        setIsLoaded(true);
        setIsLoading(false);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('healcodeGlobalReady', handleGlobalReady);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('healcodeGlobalReady', handleGlobalReady);
      }
    };
  }, [loadHealcode, checkHealcodeReady]);

  return { isLoaded, isLoading };
}

declare global {
  interface Window {
    HealcodeWidget: unknown;
  }
}