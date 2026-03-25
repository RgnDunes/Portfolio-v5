"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Snowflake {
  id: number;
  left: string;
  animationDuration: string;
  animationDelay: string;
  fontSize: string;
}

export default function Hero() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    // Generate snowflakes
    const flakes: Snowflake[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${10 + Math.random() * 20}s`,
      animationDelay: `${Math.random() * 5}s`,
      fontSize: `${8 + Math.random() * 8}px`,
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <section className="relative mt-20 flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#dad4cc] via-[#d5cfc7] to-[#dad4cc] px-4 py-20 sm:px-6 lg:px-8">
      {/* Mountain silhouette background */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.03]">
        <svg
          className="absolute bottom-0 w-full"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          style={{ height: "60%" }}
        >
          <path
            fill="#0f0e0c"
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      {/* Cosmos stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-accent"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.15,
            }}
            animate={{
              opacity: [0.05, 0.25, 0.05],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Snowfall animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {snowflakes.map((flake) => (
          <div
            key={flake.id}
            className="snowflake absolute text-white/20"
            style={{
              left: flake.left,
              fontSize: flake.fontSize,
              animationDuration: flake.animationDuration,
              animationDelay: flake.animationDelay,
            }}
          >
            ❄
          </div>
        ))}
      </div>

      {/* Motorcycle silhouette - bottom right corner */}
      <div className="absolute bottom-10 right-10 opacity-[0.04] pointer-events-none hidden lg:block">
        <svg
          width="120"
          height="80"
          viewBox="0 0 120 80"
          fill="currentColor"
          className="text-[#0f0e0c]"
        >
          <circle cx="25" cy="60" r="18" />
          <circle cx="95" cy="60" r="18" />
          <path d="M25 60 L50 35 L70 35 L75 45 L95 60" strokeWidth="4" stroke="currentColor" fill="none" />
          <path d="M50 35 L45 25 L55 25 L60 35" strokeWidth="3" stroke="currentColor" fill="none" />
        </svg>
      </div>

      {/* Top label */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 mb-8 text-center"
      >
        <span className="text-xs font-medium tracking-wider text-accent uppercase">
          PORTFOLIO · 2026
        </span>
      </motion.div>

      {/* Main heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="relative z-10 max-w-5xl text-center"
      >
        <h1 className="font-serif text-5xl font-bold tracking-tight text-[#0f0e0c] sm:text-6xl md:text-7xl lg:text-8xl">
          Building scalable{" "}
          <motion.span
            className="italic text-accent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            frontend systems
          </motion.span>
        </h1>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        className="relative z-10 mx-auto mt-8 max-w-3xl text-center text-base leading-relaxed text-[#0f0e0c] sm:text-lg"
      >
        Senior Frontend Engineer (L6) at Rippling. Previously at Razorpay, building
        international payment systems and open-source tools with 86K+ weekly downloads.
        Author, mentor, and system design enthusiast.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        className="relative z-10 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="#contact"
            className="rounded-md bg-[#0f0e0c] px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-[#2a2a2a] hover:shadow-xl"
          >
            Get in touch
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="#projects"
            className="rounded-md border-2 border-[#0f0e0c] bg-transparent px-8 py-3 text-sm font-semibold text-[#0f0e0c] transition-all hover:bg-[#0f0e0c] hover:text-white hover:shadow-lg"
          >
            View my work
          </Link>
        </motion.div>
      </motion.div>

      {/* Bottom labels */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        className="relative z-10 mt-16 flex flex-wrap items-center justify-center gap-4 text-xs font-medium tracking-wide text-muted sm:gap-8"
      >
        <motion.span whileHover={{ color: "#c84b31" }} transition={{ duration: 0.2 }}>
          RIPPLING (L6)
        </motion.span>
        <span className="hidden sm:inline">·</span>
        <motion.span whileHover={{ color: "#c84b31" }} transition={{ duration: 0.2 }}>
          4 YEARS EXPERIENCE
        </motion.span>
        <span className="hidden sm:inline">·</span>
        <motion.span whileHover={{ color: "#c84b31" }} transition={{ duration: 0.2 }}>
          86K+ DOWNLOADS
        </motion.span>
        <span className="hidden sm:inline">·</span>
        <motion.span whileHover={{ color: "#c84b31" }} transition={{ duration: 0.2 }}>
          OPEN SOURCE
        </motion.span>
      </motion.div>

      {/* Bhagavad Gita Quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
        whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
        className="relative z-10 mx-auto mt-20 max-w-2xl rounded-lg bg-[#f5e6d3] px-6 py-6 text-center transition-all sm:px-8"
      >
        <p className="font-serif text-lg text-accent sm:text-xl">
          कर्मण्येवाधिकारस्ते मा फलेषु कदाचन
        </p>
        <p className="mt-2 text-sm text-muted">
          — Bhagavad Gita 2.47
        </p>
        <p className="mt-1 text-xs italic text-muted">
          You have the right to perform your duty, but not to the fruits of your actions
        </p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <div className="h-8 w-0.5 bg-[#0f0e0c]/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
