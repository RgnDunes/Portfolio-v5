"use client";

import { useState, useEffect } from "react";

interface GameUIProps {
  onExit: () => void;
}

export default function GameUI({ onExit }: GameUIProps) {
  const [showIntro, setShowIntro] = useState(true);

  // Auto-dismiss intro after 4 seconds
  useEffect(() => {
    if (showIntro) {
      const timer = setTimeout(() => setShowIntro(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showIntro]);

  return (
    <>
      {/* Controls hint - bottom */}
      <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
        <div className="rounded-lg bg-black/60 px-6 py-3 text-center backdrop-blur-sm">
          <div className="font-mono text-xs text-white/90">
            <span className="text-yellow-400">WASD</span> Move &nbsp;|&nbsp;
            <span className="text-yellow-400">Click</span> buildings to explore &nbsp;|&nbsp;
            Walk to a building and click it!
          </div>
        </div>
      </div>

      {/* Exit button */}
      <button
        onClick={onExit}
        className="fixed right-4 top-4 z-50 rounded-lg bg-black/60 px-4 py-2 font-mono text-sm text-white backdrop-blur-sm transition-colors hover:bg-red-600/80"
      >
        Exit Game
      </button>

      {/* Title */}
      <div className="fixed left-4 top-4 z-50">
        <div className="rounded-lg bg-black/60 px-4 py-2 backdrop-blur-sm">
          <div className="font-serif text-lg font-bold text-white">
            Portfolio Quest
          </div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-white/50">
            Explore Divyansh&apos;s World
          </div>
        </div>
      </div>

      {/* Intro overlay */}
      {showIntro && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={() => setShowIntro(false)}
        >
          <div className="mx-4 max-w-md rounded-xl bg-black/80 p-8 text-center backdrop-blur-sm">
            <div className="text-4xl">🎮</div>
            <h2 className="mt-3 font-serif text-3xl font-bold text-white">
              Portfolio Quest
            </h2>
            <p className="mt-2 font-mono text-sm text-white/60">
              Walk your character through the world and explore different sections of the portfolio
            </p>
            <div className="mt-6 space-y-2 text-left font-mono text-xs text-white/80">
              <div className="flex items-center gap-3">
                <kbd className="rounded bg-white/20 px-2 py-1 text-yellow-400">WASD</kbd>
                <span>Move your character</span>
              </div>
              <div className="flex items-center gap-3">
                <kbd className="rounded bg-white/20 px-2 py-1 text-yellow-400">Click</kbd>
                <span>Click on buildings to explore sections</span>
              </div>
            </div>
            <button
              onClick={() => setShowIntro(false)}
              className="mt-6 w-full rounded-lg bg-[#c84b31] py-2.5 font-mono text-sm font-bold text-white transition-colors hover:bg-[#a03b25]"
            >
              Start Exploring
            </button>
          </div>
        </div>
      )}
    </>
  );
}
