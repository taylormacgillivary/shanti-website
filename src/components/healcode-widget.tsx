"use client";

import React from 'react';
import { ErrorBoundary } from './error-boundary';
import { useHealcode } from '@/hooks/use-healcode';

interface HealcodeWidgetProps {
  'data-version'?: string;
  'data-link-class'?: string;
  'data-site-id'?: string;
  'data-mb-site-id'?: string;
  'data-service-id'?: string;
  'data-bw-identity-site'?: string;
  'data-type'?: string;
  'data-inner-html'?: string;
  'data-widget-partner'?: string;
  'data-widget-id'?: string;
  'data-widget-version'?: string;
  fallbackUrl: string;
  fallbackText: string;
  fallbackClassName?: string;
  style?: React.CSSProperties;
}

function HealcodeWidgetInner(props: HealcodeWidgetProps) {
  const { isReady, hasError, isLoading } = useHealcode();
  const { fallbackUrl, fallbackText, fallbackClassName, style, ...widgetProps } = props;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-sage-green"></div>
        <span className="ml-2 text-sm text-gray-600">Loading...</span>
      </div>
    );
  }

  if (hasError || !isReady) {
    return (
      <a
        href={fallbackUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={fallbackClassName}
      >
        {fallbackText}
      </a>
    );
  }

  try {
    // @ts-expect-error - Mindbody widget custom element
    return <healcode-widget {...widgetProps} style={style} />;
  } catch (error) {
    console.error('Error rendering healcode widget:', error);
    return (
      <a
        href={fallbackUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={fallbackClassName}
      >
        {fallbackText}
      </a>
    );
  }
}

export function HealcodeWidget(props: HealcodeWidgetProps) {
  const { fallbackUrl, fallbackText, fallbackClassName } = props;
  
  return (
    <ErrorBoundary
      fallback={
        <a
          href={fallbackUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={fallbackClassName}
        >
          {fallbackText}
        </a>
      }
      onError={(error) => {
        console.error('HealcodeWidget error:', error);
      }}
    >
      <HealcodeWidgetInner {...props} />
    </ErrorBoundary>
  );
}