"use client";

import { motion, useInView } from "framer-motion";
import { FaGithub, FaLinkedin, FaExternalLinkAlt, FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import KiitLogo from "../../assets/images/logos/kiit-logo.png";
import ProfileImage from "../../assets/images/profile.jpg";
import Image from "next/image";
import { useRef } from "react";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/RgnDunes",
    icon: FaGithub,
    color: "hover:bg-[#333] hover:text-white",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/rgndunes",
    icon: FaLinkedin,
    color: "hover:bg-[#0077B5] hover:text-white",
  },
  {
    name: "Email",
    href: "mailto:rgndunes@gmail.com",
    icon: MdEmail,
    color: "hover:bg-accent hover:text-white",
  },
];

const highlights = [
  {
    metric: "530+",
    label: "Merchants Onboarded",
    description: "Led international expansion in MY/SG",
  },
  {
    metric: "100K+",
    label: "Weekly Downloads",
    description: "i18nify-js open-source SDK",
  },
  {
    metric: "100+",
    label: "Students Mentored",
    description: "Instructor at AccioJob & Airtribe",
  },
];

export default function AboutModern() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden opacity-20">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -left-20 top-20 h-96 w-96 rounded-full bg-gradient-to-br from-accent/20 to-transparent blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -right-20 bottom-20 h-96 w-96 rounded-full bg-gradient-to-br from-accent2/20 to-transparent blur-3xl"
        />
      </div>

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="mb-16 text-center"
      >
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-6 py-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent">
            01 · Introduction
          </span>
        </div>
        <h2 className="font-serif text-5xl font-bold tracking-tight text-ink sm:text-6xl">
          About <span className="gradient-text">Me</span>
        </h2>
      </motion.div>

      <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
        {/* Left column - Profile & Social */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-2"
        >
          {/* Profile image with decorative border */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative mb-8"
          >
            <div className="glass-strong relative mx-auto h-72 w-72 overflow-hidden rounded-3xl p-2 shadow-2xl lg:h-80 lg:w-80">
              <div className="relative h-full w-full overflow-hidden rounded-2xl">
                <Image
                  src={ProfileImage}
                  alt="Divyansh Singh"
                  fill
                  sizes="(min-width: 1024px) 320px, 288px"
                  className="object-cover object-top transition-transform duration-500 hover:scale-110"
                  priority
                />
              </div>
              {/* Gradient overlay on hover */}
              <div className="absolute inset-2 rounded-2xl bg-gradient-to-t from-accent/20 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
            </div>

            {/* Floating decorative elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-accent/10 blur-2xl"
            />
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-accent2/10 blur-2xl"
            />
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center gap-4"
          >
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.15, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`glass-strong flex h-14 w-14 items-center justify-center rounded-xl text-ink transition-all ${link.color}`}
                  aria-label={link.name}
                >
                  <Icon className="h-6 w-6" />
                </motion.a>
              );
            })}
          </motion.div>

          {/* Education badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="glass-strong mt-8 rounded-2xl p-6 text-center"
          >
            <div className="mb-3 flex justify-center">
              <div className="relative h-16 w-16">
                <Image src={KiitLogo} alt="KIIT University" fill className="object-contain" />
              </div>
            </div>
            <h3 className="font-serif text-lg font-bold text-ink">
              B.Tech Computer Science
            </h3>
            <p className="mt-1 text-sm text-muted">KIIT University, 2019</p>
            <p className="mt-2 text-xs font-medium text-accent">CGPA: 9.65/10</p>
          </motion.div>
        </motion.div>

        {/* Right column - Bio & Highlights */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-8 lg:col-span-3"
        >
          {/* Bio text */}
          <div className="space-y-6 text-base leading-relaxed text-ink lg:text-lg">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              I'm <span className="font-semibold text-accent">Divyansh Singh</span>, a{" "}
              <span className="font-semibold">Software Engineer II (L6)</span> at{" "}
              <span className="font-semibold text-accent2">Rippling</span> on the Web
              Infrastructure team, where I work on CI/CD pipelines, developer tooling, E2E
              test observability, and deployment infrastructure using AWS, Datadog,
              Buildkite, and Playwright.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Previously, I spent 4+ years at{" "}
              <span className="font-semibold text-accent">Razorpay</span> as a Senior
              Frontend Engineer, leading the international expansion into Malaysia and
              Singapore (530 merchants, 80M MYR GMV), building Mastercard Biometric
              Authentication (demoed at GFF 2024), and open-sourcing the i18nify-js SDK
              (100K+ weekly downloads, 27+ teams).
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              Outside work, I freelance as a{" "}
              <span className="font-semibold text-accent2">React instructor</span> at
              AccioJob and have mentored 100+ students at Airtribe. I was invited as a
              Jury Member for Flipkart GRID 6.0 and am passionate about technical
              writing, mentoring, and contributing to open-source.
            </motion.p>
          </div>

          {/* Highlights cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid gap-6 sm:grid-cols-3"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-strong group cursor-default rounded-2xl p-6 text-center transition-all hover-glow"
              >
                <div className="mb-2 font-serif text-4xl font-bold text-accent transition-all duration-300 group-hover:scale-110">
                  {item.metric}
                </div>
                <div className="mb-1 text-sm font-semibold text-ink">
                  {item.label}
                </div>
                <div className="text-xs text-muted">{item.description}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-wrap gap-4"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-accent to-accent2 px-8 py-4 text-base font-semibold text-white shadow-xl transition-all hover:shadow-accent/50"
            >
              <span className="relative z-10">Get in Touch</span>
              <motion.div
                className="absolute inset-0 -z-0 bg-gradient-to-r from-accent2 to-accent"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>

            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-strong flex items-center gap-2 rounded-xl px-8 py-4 text-base font-semibold text-ink transition-all hover:bg-white/30"
            >
              <span>View Resume</span>
              <FaExternalLinkAlt className="h-4 w-4" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
