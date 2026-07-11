"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {/* Top progress bar */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-accent via-accent2 to-accent"
        style={{ scaleX }}
      />

      {/* Circular progress indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-8 right-8 z-50 hidden lg:block"
      >
        <svg className="h-16 w-16 -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(200, 75, 49, 0.1)"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="8"
            strokeLinecap="round"
            style={{
              pathLength: scrollYProgress,
            }}
            strokeDasharray="0 1"
          />
          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c84b31" />
              <stop offset="100%" stopColor="#2a6e4a" />
            </linearGradient>
          </defs>
        </svg>

        {/* Percentage text */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            opacity: useSpring(scrollYProgress, {
              stiffness: 100,
              damping: 30,
            }),
          }}
        >
          <motion.span className="text-xs font-bold text-accent">
            {Math.round(scrollYProgress.get() * 100)}%
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Scroll to top button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: scrollYProgress.get() > 0.1 ? 1 : 0,
          scale: scrollYProgress.get() > 0.1 ? 1 : 0,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="glass-strong fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/20 text-accent shadow-xl transition-all hover:shadow-2xl lg:bottom-28"
        aria-label="Scroll to top"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </motion.button>
    </>
  );
}
