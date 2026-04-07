"use client";

import { motion, AnimatePresence } from "framer-motion";

interface SectionModalProps {
  section: string | null;
  onClose: () => void;
  onViewPortfolio?: (section: string) => void;
}

const SECTION_HASH: Record<string, string> = {
  about: "#about",
  experience: "#experience",
  skills: "#skills",
  projects: "#projects",
  blog: "#blog",
  contact: "#contact",
};

const SECTION_CONTENT: Record<
  string,
  { title: string; icon: string; accent: string; items: string[] }
> = {
  about: {
    title: "About Me",
    icon: "🏕️",
    accent: "#c84b31",
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
    icon: "🗿",
    accent: "#8B7355",
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
    icon: "🌊",
    accent: "#4a90d9",
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
    icon: "🏠",
    accent: "#d69e2e",
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
    accent: "#805ad5",
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
    icon: "⚓",
    accent: "#2a6e4a",
    items: [
      "Email: divyanshsingh.tech@gmail.com",
      "LinkedIn: linkedin.com/in/rgndunes",
      "GitHub: github.com/RgnDunes",
      "Twitter: @rgndunes",
      "Open to collaborations & interesting projects",
      "Exit game mode to view the full portfolio",
    ],
  },
};

export default function SectionModal({
  section,
  onClose,
  onViewPortfolio,
}: SectionModalProps) {
  const content = section ? SECTION_CONTENT[section] : null;

  const handleViewPortfolio = () => {
    if (section && onViewPortfolio) {
      onViewPortfolio(section);
    }
  };

  return (
    <AnimatePresence>
      {content && section && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.85, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.85, y: 40, opacity: 0 }}
            transition={{ type: "spring", damping: 22, stiffness: 260 }}
            className="mx-4 w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
            style={{
              background:
                "linear-gradient(145deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Accent bar */}
            <div
              className="h-1.5 w-full"
              style={{ background: content.accent }}
            />

            <div className="p-8">
              {/* Header */}
              <div className="flex items-center gap-4">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-xl text-3xl"
                  style={{ background: `${content.accent}20` }}
                >
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

              {/* Content cards */}
              <div className="mt-6 grid gap-2">
                {content.items.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                    className="flex items-start gap-3 rounded-lg px-4 py-3"
                    style={{ background: `${content.accent}08` }}
                  >
                    <span
                      className="mt-0.5 text-xs"
                      style={{ color: content.accent }}
                    >
                      &#9656;
                    </span>
                    <span className="text-sm leading-relaxed text-white/85">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Actions */}
              <div className="mt-6 flex gap-3">
                <button
                  onClick={handleViewPortfolio}
                  className="flex-1 rounded-lg py-2.5 font-mono text-sm font-bold text-white transition-colors"
                  style={{ background: content.accent }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.opacity = "0.85";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.opacity = "1";
                  }}
                >
                  View in Portfolio
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 rounded-lg bg-white/10 py-2.5 font-mono text-sm text-white transition-colors hover:bg-white/20"
                >
                  Continue Exploring
                </button>
              </div>

              {/* Dismiss hint */}
              <div className="mt-3 text-center font-mono text-[10px] text-white/30">
                Press ESC to close
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
