"use client";

import { motion, AnimatePresence } from "framer-motion";

interface SectionOverlayProps {
  section: string | null;
  onClose: () => void;
}

const SECTION_CONTENT: Record<string, { title: string; icon: string; items: string[] }> = {
  about: {
    title: "About Me",
    icon: "👤",
    items: [
      "Senior Frontend Engineer at Rippling (L6)",
      "Previously at Razorpay for 4+ years",
      "B.Tech CSE from KIIT (CGPA 9.24/10)",
      "100K+ npm downloads on open source projects",
      "Passionate about frontend architecture & DX",
      "Building international payment systems & enterprise software",
    ],
  },
  experience: {
    title: "Experience",
    icon: "💼",
    items: [
      "Rippling — Senior Frontend Engineer (L6), Jun 2025 - Present",
      "Razorpay — Frontend Engineer, May 2022 - Jun 2025",
      "Built Mastercard Biometric Authentication SDK",
      "Created i18nify internationalization toolkit (100K+ downloads)",
      "Led frontend for international payment systems",
      "Pioneered micro-frontend architecture at scale",
    ],
  },
  skills: {
    title: "Skills & Tools",
    icon: "⚡",
    items: [
      "Languages: TypeScript, JavaScript, HTML, CSS",
      "Frameworks: React, Next.js, Vue.js",
      "State: Redux, Zustand, React Query",
      "Build: Webpack, Rollup, Vite, Babel",
      "Testing: Jest, Cypress, Playwright",
      "DevOps: Docker, Kubernetes, CI/CD, AWS",
    ],
  },
  projects: {
    title: "Featured Projects",
    icon: "🏗️",
    items: [
      "i18nify-js — Internationalization SDK (100K+ downloads)",
      "CompliQ — Compliance automation platform",
      "DOMinator — Browser DevTools extension",
      "ReRoute — Smart URL redirect manager",
      "Multiple open-source contributions",
      "Visit the portfolio to see live demos & GitHub links",
    ],
  },
  blog: {
    title: "Engineering Diaries",
    icon: "📚",
    items: [
      "10+ deep-dive articles on frontend engineering",
      "Topics: React 19, npm security, CI/CD, observability",
      "Published on personal blog, Medium & LinkedIn",
      "AI Code Review — Why it's making codebases worse",
      "Buildkite vs GitHub Actions — honest comparison",
      "Zero Bundle Size frameworks — the real DX cost",
    ],
  },
  contact: {
    title: "Get In Touch",
    icon: "📬",
    items: [
      "Email: divyanshsingh.tech@gmail.com",
      "LinkedIn: linkedin.com/in/rgndunes",
      "GitHub: github.com/RgnDunes",
      "Twitter: @rgndunes",
      "Open to collaborations & interesting projects",
      "Exit game mode to view the full portfolio →",
    ],
  },
};

export default function SectionOverlay({ section, onClose }: SectionOverlayProps) {
  const content = section ? SECTION_CONTENT[section] : null;

  return (
    <AnimatePresence>
      {content && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 30 }}
            transition={{ type: "spring", damping: 20 }}
            className="mx-4 w-full max-w-lg rounded-xl border border-white/10 bg-[#1a1a2e] p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10 text-2xl">
                {content.icon}
              </div>
              <div>
                <h2 className="font-serif text-2xl font-bold text-white">
                  {content.title}
                </h2>
                <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                  Portfolio Section
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="mt-6 space-y-3">
              {content.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-lg bg-white/5 px-4 py-3"
                >
                  <span className="mt-0.5 text-xs text-yellow-400">▸</span>
                  <span className="text-sm leading-relaxed text-white/80">{item}</span>
                </div>
              ))}
            </div>

            {/* Close */}
            <button
              onClick={onClose}
              className="mt-6 w-full rounded-lg bg-white/10 py-2.5 font-mono text-sm text-white transition-colors hover:bg-white/20"
            >
              Close &middot; ESC
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
