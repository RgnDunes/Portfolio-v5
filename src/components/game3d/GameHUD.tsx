"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GameHUDProps {
  score: number;
  gemsCollected: number;
  totalGems: number;
  stamina: number;
  isSprinting: boolean;
  lastCollected: { label: string; color: string } | null;
}

export default function GameHUD({
  score,
  gemsCollected,
  totalGems,
  stamina,
  isSprinting,
  lastCollected,
}: GameHUDProps) {
  const [toast, setToast] = useState<{ label: string; color: string } | null>(
    null
  );
  const [displayScore, setDisplayScore] = useState(0);
  const scoreTarget = useRef(0);
  const animFrame = useRef<number>(0);

  // Animate score counter
  useEffect(() => {
    scoreTarget.current = score;
    const animate = () => {
      setDisplayScore((prev) => {
        if (prev < scoreTarget.current) {
          const step = Math.max(1, Math.floor((scoreTarget.current - prev) / 5));
          return Math.min(prev + step, scoreTarget.current);
        }
        return prev;
      });
      animFrame.current = requestAnimationFrame(animate);
    };
    animFrame.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame.current);
  }, [score]);

  // Toast on collection
  useEffect(() => {
    if (lastCollected) {
      setToast(lastCollected);
      const timer = setTimeout(() => setToast(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [lastCollected]);

  const staminaColor =
    isSprinting ? "#eab308" : stamina > 30 ? "#22c55e" : "#ef4444";
  const progressPct = totalGems > 0 ? (gemsCollected / totalGems) * 100 : 0;

  return (
    <>
      {/* Score - top left, below title */}
      <div className="fixed left-4 top-[72px] z-50">
        <div className="rounded-lg bg-black/60 px-4 py-2 backdrop-blur-sm">
          <div className="font-mono text-[10px] uppercase tracking-wider text-white/50">
            Score
          </div>
          <motion.div
            key={displayScore}
            initial={{ scale: 1.3, color: "#fbbf24" }}
            animate={{ scale: 1, color: "#ffffff" }}
            transition={{ duration: 0.3 }}
            className="font-mono text-2xl font-bold text-white"
          >
            {displayScore}
          </motion.div>
        </div>
      </div>

      {/* Gems counter - top left, below score */}
      <div className="fixed left-4 top-[140px] z-50">
        <div className="rounded-lg bg-black/60 px-4 py-2 backdrop-blur-sm">
          <div className="font-mono text-[10px] uppercase tracking-wider text-white/50">
            Gems
          </div>
          <div className="font-mono text-sm font-bold text-emerald-400">
            {gemsCollected}/{totalGems}
          </div>
          <div className="mt-1 h-1.5 w-24 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: "#22c55e" }}
              initial={false}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      {/* Stamina bar - bottom left */}
      <div className="fixed bottom-16 left-4 z-50">
        <div className="rounded-lg bg-black/60 px-3 py-2 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="font-mono text-[9px] uppercase tracking-wider text-white/50">
              Stamina
            </div>
            {isSprinting && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="font-mono text-[9px] font-bold text-yellow-400"
              >
                SPRINTING
              </motion.div>
            )}
          </div>
          <div className="mt-1 h-2 w-32 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: staminaColor }}
              initial={false}
              animate={{ width: `${stamina}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>
      </div>

      {/* Controls hint - bottom center */}
      <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
        <div className="rounded-lg bg-black/40 px-4 py-2 text-center backdrop-blur-sm">
          <div className="font-mono text-[10px] text-white/60">
            <span className="text-yellow-400/80">WASD</span> Move
            <span className="mx-1.5 text-white/30">|</span>
            <span className="text-yellow-400/80">SHIFT</span> Sprint
            <span className="mx-1.5 text-white/30">|</span>
            <span className="text-yellow-400/80">Space</span> Jump
            <span className="mx-1.5 text-white/30">|</span>
            <span className="text-yellow-400/80">Drag</span> Rotate
          </div>
        </div>
      </div>

      {/* Collection toast - top center */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed left-1/2 top-16 z-50 -translate-x-1/2"
          >
            <div
              className="rounded-lg px-4 py-2 backdrop-blur-sm"
              style={{
                background: `linear-gradient(135deg, rgba(0,0,0,0.7), rgba(0,0,0,0.5))`,
                borderLeft: `3px solid ${toast.color}`,
              }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-sm"
                  style={{ backgroundColor: toast.color, boxShadow: `0 0 8px ${toast.color}` }}
                />
                <span className="font-mono text-sm font-bold text-white">
                  {toast.label} collected!
                </span>
                <span className="font-mono text-sm font-bold text-yellow-400">
                  +10
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
