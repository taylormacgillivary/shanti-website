"use client";

import { useState, useEffect, useCallback } from 'react';

interface UseHealcodeResult {
  isReady: boolean;
  hasError: boolean;
  isLoading: boolean;
  retry: () => void;
}

export function useHealcode(): UseHealcodeResult {
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkHealcode = useCallback(() => {
    try {
      if (typeof window !== 'undefined' && 'HealcodeWidget' in window) {
        setIsReady(true);
        setHasError(false);
        setIsLoading(false);
        return true;
      }
    } catch (error) {
      console.error('Error checking HealcodeWidget:', error);
      setHasError(true);
      setIsLoading(false);
    }
    return false;
  }, []);

  const retry = useCallback(() => {
    setHasError(false);
    setIsLoading(true);
    setIsReady(false);
    
    // Immediate check
    if (checkHealcode()) {
      return;
    }

    // Poll with timeout
    let attempts = 0;
    const maxAttempts = 50; // 5 seconds
    
    const interval = setInterval(() => {
      attempts += 1;
      
      if (checkHealcode()) {
        clearInterval(interval);
      } else if (attempts >= maxAttempts) {
        setHasError(true);
        setIsLoading(false);
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [checkHealcode]);

  useEffect(() => {
    const cleanup = retry();
    
    // Listen for healcode ready event
    const handleHealcodeReady = () => {
      checkHealcode();
    };

    const handleHealcodeError = () => {
      setHasError(true);
      setIsLoading(false);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('healcodeReady', handleHealcodeReady);
      window.addEventListener('healcodeError', handleHealcodeError);
    }

    return () => {
      if (cleanup) cleanup();
      if (typeof window !== 'undefined') {
        window.removeEventListener('healcodeReady', handleHealcodeReady);
        window.removeEventListener('healcodeError', handleHealcodeError);
      }
    };
  }, [retry, checkHealcode]);

  return { isReady, hasError, isLoading, retry };
}