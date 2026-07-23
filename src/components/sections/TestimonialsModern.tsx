"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { FaLinkedin, FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { testimonials } from "@/data/testimonials";
import Image from "next/image";

export default function TestimonialsModern() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      id="testimonials"
      ref={containerRef}
      className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8"
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="mb-16 text-center"
      >
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-6 py-2">
          <FaQuoteLeft className="h-3 w-3 text-accent" />
          <span className="text-xs font-semibold uppercase tracking-wider text-accent">
            09 · Testimonials
          </span>
        </div>
        <h2 className="font-serif text-5xl font-bold tracking-tight text-ink sm:text-6xl">
          Kind <span className="gradient-text">Words</span>
        </h2>
      </motion.div>

      {/* Testimonial carousel */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="mx-auto max-w-4xl"
          >
            <div className="glass-strong relative overflow-hidden rounded-3xl border border-white/20 p-8 shadow-2xl sm:p-12">
              {/* Quote icon */}
              <div className="absolute right-8 top-8 opacity-5">
                <FaQuoteLeft className="h-20 w-20 text-accent" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* Profile section */}
                <div className="mb-8 flex items-center gap-6">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative"
                  >
                    <div className="h-20 w-20 overflow-hidden rounded-2xl border-4 border-white shadow-lg">
                      <Image
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].name}
                        className="object-cover"
                        fill
                        sizes="80px"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 rounded-lg bg-white p-1.5 shadow-lg">
                      <FaLinkedin className="h-4 w-4 text-[#0077B5]" />
                    </div>
                  </motion.div>

                  <div>
                    <h3 className="font-serif text-2xl font-bold text-ink">
                      {testimonials[currentIndex].name}
                    </h3>
                    <p className="mt-1 text-sm text-muted">
                      {testimonials[currentIndex].role}
                    </p>
                    <p className="text-sm font-semibold text-accent">
                      {testimonials[currentIndex].company}
                    </p>
                  </div>
                </div>

                {/* Testimonial text */}
                <blockquote className="relative">
                  <p className="font-serif text-xl leading-relaxed text-ink sm:text-2xl">
                    "{testimonials[currentIndex].testimonial}"
                  </p>
                </blockquote>

                {/* LinkedIn link */}
                <motion.a
                  href={testimonials[currentIndex].linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass mt-8 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-accent transition-all hover:bg-white/30"
                >
                  <FaLinkedin className="h-4 w-4" />
                  View LinkedIn Profile
                </motion.a>
              </div>

              {/* Decorative gradient */}
              <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-gradient-to-br from-accent/10 to-accent2/10 blur-3xl" />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={goToPrev}
            className="glass-strong flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 text-accent transition-all hover:bg-white/30"
            aria-label="Previous testimonial"
          >
            <FaChevronLeft className="h-5 w-5" />
          </motion.button>

          {/* Dots indicator */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-8 bg-accent"
                    : "w-2 bg-muted/30 hover:bg-muted/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={goToNext}
            className="glass-strong flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 text-accent transition-all hover:bg-white/30"
            aria-label="Next testimonial"
          >
            <FaChevronRight className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
