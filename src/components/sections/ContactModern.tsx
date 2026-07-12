"use client";

import { motion, useInView } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaPhone, FaWhatsapp, FaPaperPlane } from "react-icons/fa";
import { useRef } from "react";

const contactMethods = [
  {
    icon: FaEnvelope,
    label: "Email",
    value: "rgndunes@gmail.com",
    href: "mailto:rgndunes@gmail.com",
    color: "from-red-500 to-orange-500",
  },
  {
    icon: FaPhone,
    label: "Phone",
    value: "+91 7019817001",
    href: "tel:+917019817001",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    value: "Chat Now",
    href: "https://wa.me/917019817001",
    color: "from-green-500 to-emerald-500",
  },
];

const socialLinks = [
  {
    icon: FaGithub,
    label: "GitHub",
    href: "https://github.com/RgnDunes",
    color: "hover:bg-[#333]",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/rgndunes",
    color: "hover:bg-[#0077B5]",
  },
  {
    icon: FaTwitter,
    label: "Twitter",
    href: "https://twitter.com/rgndunes",
    color: "hover:bg-[#1DA1F2]",
  },
];

export default function ContactModern() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      id="contact"
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
          <FaPaperPlane className="h-3 w-3 text-accent" />
          <span className="text-xs font-semibold uppercase tracking-wider text-accent">
            09 · Get in Touch
          </span>
        </div>
        <h2 className="font-serif text-5xl font-bold tracking-tight text-ink sm:text-6xl">
          Let's <span className="gradient-text">Connect</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
        </p>
      </motion.div>

      {/* Contact cards grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {contactMethods.map((method, index) => {
          const Icon = method.icon;
          return (
            <motion.a
              key={method.label}
              href={method.href}
              target={method.href.startsWith("http") ? "_blank" : undefined}
              rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-strong group relative overflow-hidden rounded-2xl border border-white/20 p-8 transition-all hover:border-accent/50 hover:shadow-2xl"
            >
              {/* Icon with gradient background */}
              <div className="mb-6 flex justify-center">
                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${method.color} shadow-lg transition-transform group-hover:scale-110`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="mb-2 font-serif text-xl font-bold text-ink">
                  {method.label}
                </h3>
                <p className="text-sm font-medium text-muted">
                  {method.value}
                </p>
              </div>

              {/* Hover effect */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.05, 0.15, 0.05],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.5,
                }}
                className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-accent blur-3xl"
              />
            </motion.a>
          );
        })}
      </div>

      {/* Social links section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-16"
      >
        <div className="glass-strong mx-auto max-w-3xl rounded-3xl border border-white/20 p-8 text-center">
          <h3 className="mb-6 font-serif text-2xl font-bold text-ink">
            Follow Me on Social Media
          </h3>
          <div className="flex justify-center gap-4">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.15, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`glass flex h-14 w-14 items-center justify-center rounded-xl border border-white/20 text-ink transition-all hover:border-transparent hover:text-white ${social.color}`}
                  aria-label={social.label}
                >
                  <Icon className="h-6 w-6" />
                </motion.a>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Call to action */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-16 text-center"
      >
        <p className="text-lg text-muted">
          Available for freelance projects and collaborations
        </p>
        <motion.a
          href="mailto:rgndunes@gmail.com"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-accent to-accent2 px-8 py-4 text-base font-semibold text-white shadow-xl transition-all hover:shadow-accent/50"
        >
          <FaPaperPlane className="h-5 w-5" />
          Send Me a Message
        </motion.a>
      </motion.div>
    </section>
  );
}
