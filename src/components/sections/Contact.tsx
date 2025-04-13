"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl">
          Get in Touch
        </h2>
        <p className="mt-4 text-lg text-gray-400">
          I'm always open to discussing new projects, creative ideas, or
          opportunities to be part of your vision.
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl bg-gray-800/50 p-8 backdrop-blur-sm"
          >
            <h3 className="text-xl font-semibold text-gray-100">
              Contact Information
            </h3>
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-4">
                <FaEnvelope className="h-5 w-5 text-blue-500" />
                <a
                  href="mailto:contact@example.com"
                  className="text-gray-400 hover:text-gray-100"
                >
                  contact@example.com
                </a>
              </div>
              <p className="text-gray-400">
                Feel free to reach out through email or any of the social
                platforms below. I typically respond within 24-48 hours.
              </p>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="rounded-2xl bg-gray-800/50 p-8 backdrop-blur-sm"
          >
            <h3 className="text-xl font-semibold text-gray-100">
              Connect With Me
            </h3>
            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-gray-700/50 px-4 py-2 text-gray-400 transition-colors hover:bg-gray-700 hover:text-gray-100"
                aria-label="GitHub"
              >
                <FaGithub className="h-5 w-5" />
                <span>GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-gray-700/50 px-4 py-2 text-gray-400 transition-colors hover:bg-gray-700 hover:text-gray-100"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="h-5 w-5" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://twitter.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-gray-700/50 px-4 py-2 text-gray-400 transition-colors hover:bg-gray-700 hover:text-gray-100"
                aria-label="Twitter"
              >
                <FaTwitter className="h-5 w-5" />
                <span>Twitter</span>
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
