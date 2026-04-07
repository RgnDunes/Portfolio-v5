"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import SectionOverlay from "./SectionOverlay";

// Dynamically import GameWorld to avoid SSR issues with Three.js
const GameWorld = dynamic(() => import("./GameWorld"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="text-center">
        <div className="font-serif text-2xl font-bold text-white">Loading World...</div>
        <div className="mt-2 font-mono text-sm text-white/50">Preparing your adventure</div>
      </div>
    </div>
  ),
});

interface GameModeWrapperProps {
  isActive: boolean;
  onExit: () => void;
}

export default function GameModeWrapper({ isActive, onExit }: GameModeWrapperProps) {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const handleSelectSection = useCallback((section: string) => {
    setSelectedSection(section);
  }, []);

  const handleCloseOverlay = useCallback(() => {
    setSelectedSection(null);
  }, []);

  if (!isActive) return null;

  return (
    <>
      <GameWorld onExit={onExit} onSelectSection={handleSelectSection} />
      <SectionOverlay section={selectedSection} onClose={handleCloseOverlay} />
    </>
  );
}
