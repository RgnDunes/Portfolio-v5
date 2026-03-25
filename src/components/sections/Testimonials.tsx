"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaLinkedin } from "react-icons/fa";
import { testimonials } from "@/data/testimonials";
import Image from "next/image";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="testimonials"
      className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-serif text-3xl font-bold tracking-tight text-[#0f0e0c] sm:text-4xl">
          Testimonials
        </h2>
        <div className="mt-12">
          <div className="relative overflow-hidden">
            <div className="relative">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                whileHover={{
                  scale: 1.01,
                  boxShadow: "0 15px 40px rgba(0,0,0,0.1)"
                }}
                className="rounded-lg border-2 border-[#d4cdc0] bg-white p-8"
              >
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-full bg-gray-50">
                    <Image
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="object-cover"
                      fill
                      sizes="64px"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#0f0e0c]">
                      {testimonials[currentIndex].name}
                    </h3>
                    <p className="text-sm text-muted">
                      {testimonials[currentIndex].role} at{" "}
                      {testimonials[currentIndex].company}
                    </p>
                    <a
                      href={testimonials[currentIndex].linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1 text-sm text-accent hover:text-[#a03b25]"
                    >
                      <FaLinkedin className="h-4 w-4" />
                      <span>View Profile</span>
                    </a>
                  </div>
                </div>
                <blockquote className="mt-6">
                  <p className="font-serif text-lg italic leading-relaxed text-[#0f0e0c]">
                    "{testimonials[currentIndex].testimonial}"
                  </p>
                </blockquote>
              </motion.div>
            </div>
            <div className="mt-6 flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    currentIndex === index ? "bg-accent" : "bg-[#d4cdc0]"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
