"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaLinkedin } from "react-icons/fa";
import { testimonials } from "@/data/testimonials";

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
        <h2 className="text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl">
          Testimonials
        </h2>
        <div className="mt-12">
          <div className="relative overflow-hidden">
            <div className="relative">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl bg-gray-800/50 p-8 backdrop-blur-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 overflow-hidden rounded-full bg-gray-700">
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-100">
                      {testimonials[currentIndex].name}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {testimonials[currentIndex].role} at{" "}
                      {testimonials[currentIndex].company}
                    </p>
                    <a
                      href={testimonials[currentIndex].linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300"
                    >
                      <FaLinkedin className="h-4 w-4" />
                      <span>View Profile</span>
                    </a>
                  </div>
                </div>
                <blockquote className="mt-6">
                  <p className="text-lg italic text-gray-300">
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
                    currentIndex === index ? "bg-blue-500" : "bg-gray-600"
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
