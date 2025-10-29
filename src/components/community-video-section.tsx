"use client";

import { useState, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function CommunityVideoSection() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section id="community-video-section" className="relative w-full h-[80vh] overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'center 35%' }}
        >
          <source src="/community-video-full.mp4" type="video/mp4" />
        </video>
        
        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Mute Toggle Button */}
      <button
        onClick={toggleMute}
        className="absolute bottom-8 right-8 z-20 bg-black/50 backdrop-blur-md hover:bg-black/70 text-white p-4 rounded-full transition-all duration-300 shadow-lg"
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? (
          <VolumeX className="w-6 h-6" />
        ) : (
          <Volume2 className="w-6 h-6" />
        )}
      </button>
    </section>
  );
}

