"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaExternalLinkAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import KiitLogo from "../../assets/images/logos/kiit-logo.png";
import Image from "next/image";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/RgnDunes",
    icon: FaGithub,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/rgndunes",
    icon: FaLinkedin,
  },
  {
    name: "Email",
    href: "mailto:rgndunes@gmail.com",
    icon: MdEmail,
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Mountain range background - very subtle */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.02] pointer-events-none">
        <svg
          className="absolute -bottom-20 w-full"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          style={{ height: "80%" }}
        >
          <path
            fill="#0f0e0c"
            d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,128C960,139,1056,181,1152,181.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      <div className="relative z-10 grid gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-[#0f0e0c] sm:text-4xl">
              About Me
            </h2>
            <span className="text-sm font-medium tracking-wider text-accent">
              01 · ABOUT
            </span>
          </div>

          <p className="mt-6 text-base leading-relaxed text-[#0f0e0c]">
            👋 Hey there! I'm Divyansh, a full-time Senior Frontend Engineer at
            Rippling, part-time code whisperer, and full-time fan of clean architecture.
          </p>

          <p className="mt-4 text-base leading-relaxed text-[#0f0e0c]">
            Previously, I led Razorpay's global frontend efforts (hello
            Malaysia, Singapore and US 🌏) before recently joining Rippling.
            Come weekends and holidays, I switch gears, mentoring bright minds
            at ProPeers and AccioJob, and occasionally pretending I have a
            social life (spoiler: it's usually with code).
          </p>

          <p className="mt-4 text-base leading-relaxed text-[#0f0e0c]">
            I was also recently invited by Airtribe as a Jury Member for an AI
            Tech Hackathon in Bangalore, because apparently, I now judge things
            other than bad variable names 😄
          </p>

          <p className="mt-4 text-base leading-relaxed text-[#0f0e0c]">
            I'm passionate about clean code, clever UI, and helping devs level
            up their frontend game, all while debugging like a caffeine-fueled
            detective 🕵️‍♂️
          </p>

          <p className="mt-4 text-base leading-relaxed text-[#0f0e0c]">
            Let's connect if you want to geek out over React, discuss
            internationalization (I might've open-sourced a thing 👀), or debate
            why undefined shows up only when you're on a roll.
          </p>

          <div className="mt-8 flex gap-4">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#d4cdc0] bg-white text-muted transition-all hover:border-accent hover:text-accent"
                aria-label={link.name}
              >
                <link.icon className="h-5 w-5" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="space-y-8"
        >
          <motion.div
            whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}
            transition={{ duration: 0.3 }}
            className="rounded-lg border-2 border-[#d4cdc0] bg-white p-6"
          >
            <h3 className="font-serif text-xl font-semibold text-[#0f0e0c]">
              Key Achievements
            </h3>
            <ul className="mt-4 list-none space-y-3">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                <span className="flex-1 text-sm leading-relaxed text-[#0f0e0c]">
                  Built Industry's First Biometric Authentication: An OTP-Free
                  Payment Checkout.
                </span>
                <a
                  href="https://razorpay.com/blog/biometric-authentication-easy-card-payments-checkout/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent transition-colors hover:text-[#a03b25]"
                  aria-label="Read more"
                >
                  <FaExternalLinkAlt className="h-4 w-4" />
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                <span className="flex-1 text-sm leading-relaxed text-[#0f0e0c]">
                  Created India's first token lifecycle management system for
                  major banks.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                <span className="flex-1 text-sm leading-relaxed text-[#0f0e0c]">
                  Published a book "Full Spectrum JavaScript" with 200+ copies
                  sold.
                </span>
                <a
                  href="https://rgndunes.gumroad.com/l/full-spectrum-javascript"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent transition-colors hover:text-[#a03b25]"
                  aria-label="Buy Book"
                >
                  <FaExternalLinkAlt className="h-4 w-4" />
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}
            transition={{ duration: 0.3 }}
            className="rounded-lg border-2 border-[#d4cdc0] bg-white p-6"
          >
            <h3 className="font-serif text-xl font-semibold text-[#0f0e0c]">
              Education
            </h3>
            <div className="mt-4 flex items-start gap-4">
              <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-gray-50 p-2">
                <Image
                  src={KiitLogo}
                  alt="KIIT Logo"
                  className="h-full w-full object-contain"
                  width={48}
                  height={48}
                />
              </div>
              <div className="text-sm leading-relaxed text-[#0f0e0c]">
                <p className="font-semibold">
                  Bachelor of Technology in Computer Science Engineering
                </p>
                <p className="mt-1 text-muted">
                  Kalinga Institute of Industrial Technology
                </p>
                <p className="mt-1 text-muted">CGPA: 9.24/10 · 2018 - 2022</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
