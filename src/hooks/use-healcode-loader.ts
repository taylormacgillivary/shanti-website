"use client";

import { useEffect, useState, useCallback, useRef } from 'react';

// Global state to track healcode script loading
let healcodeScriptState: 'loading' | 'loaded' | 'error' | 'idle' = 'idle';
let healcodeCallbacks: Array<(success: boolean) => void> = [];

export function useHealcodeLoader() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const mountedRef = useRef(true);

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

  const updateState = useCallback((loaded: boolean, loading: boolean) => {
    if (mountedRef.current) {
      setIsLoaded(loaded);
      setIsLoading(loading);
    }
  }, []);

  const loadHealcode = useCallback(() => {
    if (typeof window === 'undefined') {
      updateState(false, false);
      return;
    }
    
    // Check if HealcodeWidget is already available and functional
    if (checkHealcodeReady()) {
      healcodeScriptState = 'loaded';
      updateState(true, false);
      return;
    }

    // If script is already loading, queue the callback
    if (healcodeScriptState === 'loading') {
      healcodeCallbacks.push((success) => {
        updateState(success, false);
      });
      return;
    }

    // If script already failed, don't try again
    if (healcodeScriptState === 'error') {
      updateState(false, false);
      return;
    }

    // Check if script is already in DOM but not initialized
    const existingScript = document.getElementById('healcode-script');
    if (existingScript && healcodeScriptState === 'idle') {
      healcodeScriptState = 'loading';
      
      // Wait for the existing script to load and initialize
      const checkInterval = setInterval(() => {
        if (checkHealcodeReady()) {
          healcodeScriptState = 'loaded';
          updateState(true, false);
          // Notify other waiting components
          healcodeCallbacks.forEach(cb => cb(true));
          healcodeCallbacks = [];
          clearInterval(checkInterval);
        }
      }, 100);
      
      // Timeout after 10 seconds
      setTimeout(() => {
        clearInterval(checkInterval);
        if (!checkHealcodeReady()) {
          console.error('Healcode script failed to initialize');
          healcodeScriptState = 'error';
          updateState(false, false);
          // Notify other waiting components
          healcodeCallbacks.forEach(cb => cb(false));
          healcodeCallbacks = [];
        }
      }, 10000);
      
      return;
    }

    // Load the script for the first time
    if (healcodeScriptState === 'idle') {
      healcodeScriptState = 'loading';
      
      const script = document.createElement('script');
      script.id = 'healcode-script';
      script.src = 'https://widgets.mindbodyonline.com/javascripts/healcode.js';
      script.async = true; // Changed to async to prevent blocking
      script.crossOrigin = 'anonymous';
      
      script.onload = () => {
        console.log('Healcode script loaded successfully');
        
        // Wait for HealcodeWidget to be properly initialized
        const checkInterval = setInterval(() => {
          if (checkHealcodeReady()) {
            healcodeScriptState = 'loaded';
            updateState(true, false);
            // Notify other waiting components
            healcodeCallbacks.forEach(cb => cb(true));
            healcodeCallbacks = [];
            clearInterval(checkInterval);
          }
        }, 50);
        
        // Timeout after 5 seconds
        setTimeout(() => {
          clearInterval(checkInterval);
          if (!checkHealcodeReady()) {
            console.error('Healcode script loaded but HealcodeWidget not initialized');
            healcodeScriptState = 'error';
            updateState(false, false);
            // Notify other waiting components
            healcodeCallbacks.forEach(cb => cb(false));
            healcodeCallbacks = [];
          }
        }, 5000);
      };
      
      script.onerror = () => {
        console.error('Failed to load healcode script');
        healcodeScriptState = 'error';
        updateState(false, false);
        // Notify other waiting components
        healcodeCallbacks.forEach(cb => cb(false));
        healcodeCallbacks = [];
      };

      document.head.appendChild(script);
    }
  }, [checkHealcodeReady, updateState]);

  useEffect(() => {
    mountedRef.current = true;
    loadHealcode();

    return () => {
      mountedRef.current = false;
    };
  }, [loadHealcode]);

  return { isLoaded, isLoading };
}

declare global {
  interface Window {
    HealcodeWidget: unknown;
  }
}