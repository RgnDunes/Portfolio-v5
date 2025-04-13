"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FaLinkedin } from "react-icons/fa";

const testimonials = [
  {
    name: "John Doe",
    role: "Engineering Manager at Razorpay",
    image: "/testimonials/john-doe.jpg", // You'll need to add these images to public/testimonials/
    testimonial:
      "Divyansh is an exceptional frontend engineer who consistently delivers high-quality solutions. His work on the internationalization project significantly improved our development workflow.",
    linkedinUrl: "https://linkedin.com/in/johndoe",
  },
  {
    name: "Jane Smith",
    role: "Tech Lead at PayU",
    image: "/testimonials/jane-smith.jpg",
    testimonial:
      "Working with Divyansh was a great experience. His technical expertise and leadership skills were instrumental in the successful launch of several key projects.",
    linkedinUrl: "https://linkedin.com/in/janesmith",
  },
  {
    name: "Alex Johnson",
    role: "Senior Software Engineer at Microsoft",
    image: "/testimonials/alex-johnson.jpg",
    testimonial:
      "Divyansh's contributions to the open-source community, especially the i18nify-js library, have been invaluable. His attention to detail and commitment to quality are remarkable.",
    linkedinUrl: "https://linkedin.com/in/alexjohnson",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

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
          What People Say
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
                      {testimonials[currentIndex].role}
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
            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={prev}
                className="rounded-full bg-gray-800 p-2 text-gray-400 transition-colors hover:bg-gray-700 hover:text-gray-100"
                aria-label="Previous testimonial"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={next}
                className="rounded-full bg-gray-800 p-2 text-gray-400 transition-colors hover:bg-gray-700 hover:text-gray-100"
                aria-label="Next testimonial"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
