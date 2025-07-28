"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

interface BioProps {
  text: string;
  autoExpand?: boolean;
}

export function Bio({ text, autoExpand = false }: BioProps) {
  const [isExpanded, setIsExpanded] = useState(autoExpand);

  useEffect(() => {
    if (autoExpand) {
      setIsExpanded(true);
    }
  }, [autoExpand]);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const isLongBio = text.length > 150; // Or any other character count you deem as "long"

  return (
    <div>
      <div className={`relative ${isExpanded ? '' : 'max-h-24 overflow-hidden'}`}>
        <p className="text-muted-foreground">{text}</p>
        {!isExpanded && isLongBio && (
          <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent"></div>
        )}
      </div>
      {isLongBio && (
        <Button variant="link" onClick={toggleExpanded} className="pl-0 gradient-sage-text">
          {isExpanded ? 'Read Less' : 'Read More'}
        </Button>
      )}
    </div>
  );
} 