"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaPhone } from "react-icons/fa";

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
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-[#0f0e0c] sm:text-4xl">
            Get in Touch
          </h2>
          <span className="text-sm font-medium tracking-wider text-accent">
            06 · CONTACT
          </span>
        </div>

        <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#0f0e0c]">
          I'm always open to discussing new projects, creative ideas, or
          opportunities to be part of your vision.
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 15px 40px rgba(0,0,0,0.1)",
              borderColor: "#c84b31"
            }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
            className="rounded-lg border-2 border-[#d4cdc0] bg-white p-8"
          >
            <h3 className="font-serif text-xl font-semibold text-[#0f0e0c]">
              Contact Information
            </h3>
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-4">
                <FaEnvelope className="h-5 w-5 text-accent" />
                <a
                  href="mailto:rgndunes@gmail.com"
                  className="text-[#0f0e0c] hover:text-accent"
                >
                  rgndunes@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-4">
                <FaPhone className="h-5 w-5 text-accent" />
                <a
                  href="tel:+917019817001"
                  className="text-[#0f0e0c] hover:text-accent"
                >
                  +91 7019817001
                </a>
              </div>
              <p className="text-sm leading-relaxed text-muted">
                Feel free to reach out through email, phone, or any of the social
                platforms below. I typically respond within 24-48 hours.
              </p>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 15px 40px rgba(0,0,0,0.1)",
              borderColor: "#c84b31"
            }}
            transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
            className="rounded-lg border-2 border-[#d4cdc0] bg-white p-8"
          >
            <h3 className="font-serif text-xl font-semibold text-[#0f0e0c]">
              Connect With Me
            </h3>
            <div className="mt-6 flex flex-wrap gap-4">
              <motion.a
                href="https://github.com/RgnDunes"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 rounded-lg border-2 border-[#d4cdc0] bg-white px-4 py-2 text-muted transition-all hover:border-accent hover:text-accent"
                aria-label="GitHub"
              >
                <FaGithub className="h-5 w-5" />
                <span>GitHub</span>
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/rgndunes"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 rounded-lg border-2 border-[#d4cdc0] bg-white px-4 py-2 text-muted transition-all hover:border-accent hover:text-accent"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="h-5 w-5" />
                <span>LinkedIn</span>
              </motion.a>
              <motion.a
                href="https://twitter.com/RgnDunes"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 rounded-lg border-2 border-[#d4cdc0] bg-white px-4 py-2 text-muted transition-all hover:border-accent hover:text-accent"
                aria-label="Twitter"
              >
                <FaTwitter className="h-5 w-5" />
                <span>Twitter</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
