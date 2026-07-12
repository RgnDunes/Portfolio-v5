"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import ViewCounter from "../ViewCounter";

export default function HeroModern() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative mt-20 flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-20 sm:px-6 lg:px-8"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f5f0e8] via-[#dad4cc] to-[#d5cfc7]">
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute top-0 -left-4 h-96 w-96 animate-pulse-slow rounded-full bg-accent/20 blur-3xl"
            style={{
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            }}
          />
          <div
            className="absolute bottom-0 right-0 h-96 w-96 animate-pulse-slow rounded-full bg-accent2/20 blur-3xl"
            style={{
              transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
              animationDelay: "1s",
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 h-96 w-96 animate-pulse-slow rounded-full bg-purple-500/10 blur-3xl"
            style={{
              transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
              animationDelay: "2s",
            }}
          />
        </div>
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, #0f0e0c 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `rgba(200, 75, 49, ${0.1 + Math.random() * 0.2})`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 w-full max-w-7xl">
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 flex justify-center"
        >
          <div className="glass-strong inline-flex items-center gap-2 rounded-full px-6 py-2 text-xs font-medium tracking-wider text-ink">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
            </span>
            AVAILABLE FOR OPPORTUNITIES
          </div>
        </motion.div>

        {/* Main heading with gradient text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <h1 className="font-serif text-6xl font-bold leading-tight tracking-tight text-ink sm:text-7xl md:text-8xl lg:text-9xl">
            Crafting Digital
            <br />
            <span className="gradient-text">Experiences</span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto mt-8 max-w-3xl text-center text-lg leading-relaxed text-muted sm:text-xl"
        >
          Senior Software Engineer specializing in{" "}
          <span className="font-semibold text-accent">Web Infrastructure</span>,{" "}
          <span className="font-semibold text-accent2">CI/CD</span>, and{" "}
          <span className="font-semibold text-accent">Developer Tooling</span>.
          Currently building at Rippling (L6), previously at Razorpay.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-6 md:grid-cols-4"
        >
          {[
            { value: "5+", label: "Years Experience" },
            { value: "100K+", label: "Weekly Downloads" },
            { value: "L6", label: "Engineering Level" },
            { value: "20+", label: "Projects Shipped" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
              className="glass-strong group cursor-default rounded-2xl p-6 text-center transition-all hover:scale-105 hover-glow"
            >
              <div className="font-serif text-4xl font-bold text-accent transition-all group-hover:scale-110">
                {stat.value}
              </div>
              <div className="mt-2 text-sm font-medium text-muted">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="#contact"
              className="group relative overflow-hidden rounded-xl bg-ink px-8 py-4 text-base font-semibold text-paper shadow-2xl transition-all hover:shadow-accent/50"
            >
              <span className="relative z-10">Let's Connect</span>
              <div className="absolute inset-0 -z-0 bg-gradient-to-r from-accent to-accent2 opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="#projects"
              className="glass-strong rounded-xl px-8 py-4 text-base font-semibold text-ink transition-all hover:bg-white/20"
            >
              Explore Work
            </Link>
          </motion.div>
        </motion.div>

        {/* Tech stack icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 opacity-60"
        >
          {["React", "TypeScript", "Next.js", "Node.js", "Python", "Docker"].map(
            (tech, i) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + i * 0.1 }}
                className="text-sm font-medium tracking-wide text-muted transition-all hover:scale-110 hover:text-accent"
              >
                {tech}
              </motion.div>
            )
          )}
        </motion.div>

        {/* Bhagavad Gita Quote - Modern card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          whileHover={{ scale: 1.02, y: -5 }}
          className="glass-strong mx-auto mt-20 max-w-2xl rounded-2xl p-8 text-center shadow-xl transition-all"
        >
          <p className="font-serif text-2xl font-medium text-accent">
            कर्मण्येवाधिकारस्ते मा फलेषु कदाचन
          </p>
          <p className="mt-3 text-sm font-medium text-muted">
            Bhagavad Gita 2.47
          </p>
          <p className="mt-2 text-base italic leading-relaxed text-muted">
            You have the right to perform your duty, but not to the fruits of your
            actions
          </p>
        </motion.div>

        {/* View Counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-10 flex justify-center"
        >
          <ViewCounter pageId="homepage" showLabel={true} />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs font-medium tracking-wider text-muted">
            SCROLL
          </span>
          <div className="h-10 w-6 rounded-full border-2 border-muted/30 p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-2 w-2 rounded-full bg-accent"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
