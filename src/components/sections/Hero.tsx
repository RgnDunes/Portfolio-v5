"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import heroBg from "../../assets/images/hero-bg.JPG";

const roles = ["Engineer", "Mentor", "Speaker", "Author", "Instructor"];

export default function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative mt-20 flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-[#0F172A]">
      {/* Background image */}
      <div className="absolute inset-0">
        <div className="relative h-full w-full">
          <Image
            src={heroBg}
            alt="Background"
            fill
            priority
            className="object-cover object-center opacity-50"
            quality={75}
            sizes="100vw"
            onLoad={() => setIsLoaded(true)}
            loading="eager"
          />
        </div>
      </div>

      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/50 via-[#0F172A]/40 to-[#1E293B]/60" />

      {/* Grid pattern */}
      <div className="absolute inset-0">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.05) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          mixBlendMode: "overlay",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl"
          >
            Divyansh Singh
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 text-xl font-medium text-white sm:text-2xl"
          >
            Senior Frontend Engineer
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-2 text-lg leading-8 text-gray-200"
          >
            {roles.map((role, index) => (
              <motion.span
                key={role}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: currentRoleIndex === index ? 1 : 0.3,
                  scale: currentRoleIndex === index ? 1 : 0.8,
                }}
                transition={{ duration: 0.3 }}
                className={`rounded-full px-4 py-1 ${
                  currentRoleIndex === index
                    ? "bg-blue-500/20 text-blue-400"
                    : "bg-gray-800/50 text-gray-400"
                }`}
              >
                {role}
              </motion.span>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-10 flex items-center justify-center gap-x-6"
          >
            <Link
              href="#about"
              className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              About Me
            </Link>
            <Link
              href="#contact"
              className="rounded-md border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              Get in Touch
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-white">Scroll down</span>
          <div className="h-8 w-0.5 bg-white/50" />
        </div>
      </motion.div>
    </section>
  );
}
