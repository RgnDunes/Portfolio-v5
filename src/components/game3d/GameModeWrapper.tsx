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

const SECTION_HASH: Record<string, string> = {
  about: "#about",
  experience: "#experience",
  skills: "#skills",
  projects: "#projects",
  blog: "#blog",
  contact: "#contact",
};

export default function GameModeWrapper({ isActive, onExit }: GameModeWrapperProps) {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [exploredSections, setExploredSections] = useState<Set<string>>(new Set());

  const handleSelectSection = useCallback((section: string) => {
    setSelectedSection(section);
    setExploredSections((prev) => {
      const next = new Set(prev);
      next.add(section);
      return next;
    });
  }, []);

  const handleCloseOverlay = useCallback(() => {
    setSelectedSection(null);
  }, []);

  const handleViewPortfolio = useCallback(
    (section: string) => {
      setSelectedSection(null);
      onExit();
      // Small delay to let the game exit animation complete before scrolling
      setTimeout(() => {
        const hash = SECTION_HASH[section];
        if (hash) {
          window.location.hash = hash;
        }
      }, 150);
    },
    [onExit]
  );

  if (!isActive) return null;

  return (
    <>
      <GameWorld onExit={onExit} onSelectSection={handleSelectSection} exploredCount={exploredSections.size} />
      <SectionOverlay
        section={selectedSection}
        onClose={handleCloseOverlay}
        onViewPortfolio={handleViewPortfolio}
      />
    </>
  );
}
