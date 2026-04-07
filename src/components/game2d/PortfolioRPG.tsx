"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createInitialState, setupInput, update } from "./engine";
import type { GameState } from "./engine";
import { render } from "./renderer";

interface PortfolioRPGProps {
  onExit: () => void;
  onSelectSection: (section: string) => void;
}

export default function PortfolioRPG({
  onExit,
  onSelectSection,
}: PortfolioRPGProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<GameState | null>(null);
  const rafRef = useRef<number>(0);
  const inputRef = useRef<ReturnType<typeof setupInput> | null>(null);
  const frameRef = useRef(0);
  const pausedRef = useRef(false);
  const [showIntro, setShowIntro] = useState(true);
  const [canvasSize, setCanvasSize] = useState({ w: 0, h: 0 });

  // Resize handler
  const handleResize = useCallback(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    setCanvasSize({ w, h });
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = w;
      canvas.height = h;
    }
  }, []);

  // Pause/unpause from parent (when section modal opens)
  const setPaused = useCallback((paused: boolean) => {
    pausedRef.current = paused;
  }, []);

  // Initialize game
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    const state = createInitialState();
    stateRef.current = state;
    const input = setupInput();
    inputRef.current = input;

    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05); // cap dt to avoid large jumps
      lastTime = now;
      frameRef.current++;

      const canvas = canvasRef.current;
      if (!canvas || !stateRef.current) {
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      // Get input
      const currentInput = input.getInput();
      stateRef.current.input = currentInput;

      // Update (only if not paused)
      if (!pausedRef.current && !showIntro) {
        const result = update(
          stateRef.current,
          dt,
          canvas.width,
          canvas.height
        );
        stateRef.current = result.state;

        if (result.sectionToOpen) {
          setPaused(true);
          onSelectSection(result.sectionToOpen);
          // Unpause after a short delay when section closes
        }

        if (result.wantsExit) {
          onExit();
        }
      }

      // Always render
      render(
        ctx,
        canvas,
        stateRef.current,
        frameRef.current,
        canvas.width,
        canvas.height
      );

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      input.cleanup();
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle showIntro dismiss
  const dismissIntro = useCallback(() => {
    setShowIntro(false);
  }, []);

  // Auto-dismiss intro after 3 seconds
  useEffect(() => {
    if (!showIntro) return;
    const timer = setTimeout(dismissIntro, 3000);
    return () => clearTimeout(timer);
  }, [showIntro, dismissIntro]);

  // Expose pause control for section modal
  useEffect(() => {
    // When onSelectSection is called, we pause.
    // Parent should call back somehow to unpause. We use a global approach:
    // If pausedRef is true and we detect no active section, unpause.
    // This is handled by the parent wrapper.
  }, []);

  // Public method to unpause (called via ref or prop change)
  // Since we can't easily use imperative handle here, we track it differently.
  // The GameModeWrapper will re-render us when section closes.

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <canvas
        ref={canvasRef}
        width={canvasSize.w || 1}
        height={canvasSize.h || 1}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          imageRendering: "pixelated",
        }}
      />

      {/* Intro overlay */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={dismissIntro}
          >
            <motion.div
              initial={{ scale: 0.8, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: -30, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="mx-4 max-w-md rounded-2xl border border-white/10 p-8 text-center"
              style={{
                background:
                  "linear-gradient(145deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)",
              }}
            >
              <div className="mb-4 text-5xl">🎮</div>
              <h2 className="mb-2 font-serif text-2xl font-bold text-white">
                Portfolio RPG
              </h2>
              <p className="mb-4 text-sm text-white/60">
                Explore the island village to discover my portfolio.
                <br />
                Visit buildings, talk to NPCs, and collect skill gems!
              </p>
              <div className="mb-4 space-y-1 text-xs text-white/40">
                <p>
                  <span className="text-white/70">WASD</span> — Move
                  {" | "}
                  <span className="text-white/70">E</span> — Interact
                </p>
                <p>
                  <span className="text-white/70">Shift</span> — Sprint
                  {" | "}
                  <span className="text-white/70">ESC</span> — Exit
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={dismissIntro}
                className="rounded-lg bg-[#c84b31] px-6 py-2 font-mono text-sm font-bold text-white transition-colors hover:bg-[#a83e28]"
              >
                Start Exploring
              </motion.button>
              <p className="mt-3 text-[10px] text-white/30">
                Click anywhere or wait to begin
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Export a method to unpause from outside
export function unpauseGame(ref: React.RefObject<{ unpause: () => void } | null>) {
  if (ref.current) {
    ref.current.unpause();
  }
}
