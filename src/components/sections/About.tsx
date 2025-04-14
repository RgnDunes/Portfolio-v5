"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaExternalLinkAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

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
      className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl">
            About Me
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            👋 Hey there! I'm Divyansh — a full-time Senior Frontend Engineer at
            Razorpay, part-time code whisperer, and full-time fan of dark mode.{" "}
            <br />
          </p>
          <p className="mt-4 text-lg text-gray-400">
            By day, I lead Razorpay's global frontend efforts (hello Malaysia
            and Singapore 🌏). But come weekends and holidays, I switch gears —
            mentoring bright minds at ProPeers and AccioJob, and occasionally
            pretending I have a social life (spoiler: it's usually with code).
          </p>
          <p className="mt-4 text-lg text-gray-400">
            I was also recently invited by Airtribe as a Jury Member for an AI
            Tech Hackathon in Bangalore — because apparently, I now judge things
            other than bad variable names 😄
          </p>
          <p className="mt-4 text-lg text-gray-400">
            I'm passionate about clean code, clever UI, and helping devs level
            up their frontend game — all while debugging like a caffeine-fueled
            detective 🕵️‍♂️
          </p>

          <p className="mt-4 text-lg text-gray-400">
            Let's connect if you want to geek out over React, discuss
            internationalization (I might've open-sourced a thing 👀), or debate
            why undefined shows up only when you're on a roll.
          </p>
          <div className="mt-8 flex gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-colors hover:bg-gray-700 hover:text-gray-100"
                aria-label={link.name}
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6 text-base text-gray-400"
        >
          <div>
            <h3 className="text-lg font-semibold text-gray-100">
              Key Achievements
            </h3>
            <ul className="mt-2 list-none space-y-2">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                Built Industry's First Biometric Authentication: An OTP-Free
                Payment Checkout.
                <a
                  href="https://razorpay.com/blog/biometric-authentication-easy-card-payments-checkout/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300"
                  aria-label="Read"
                >
                  <FaExternalLinkAlt className="h-4 w-4" />
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                Created India's first token lifecycle management system for
                major banks.
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                Published a book "Full Spectrum JavaScript" with 200+ copies
                sold.
                <a
                  href="https://rgndunes.gumroad.com/l/full-spectrum-javascript"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300"
                  aria-label="Buy Book"
                >
                  <FaExternalLinkAlt className="h-4 w-4" />
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-100">Education</h3>
            <div className="mt-2 flex items-center gap-4">
              <div className="h-12 w-12 overflow-hidden rounded-lg bg-gray-700/50 p-2">
                <img
                  src="/images/logos/kiit-logo.png"
                  alt="KIIT Logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <p>
                  Bachelor of Technology in Computer Science Engineering
                  <br />
                  Kalinga Institute of Industrial Technology (CGPA: 9.24/10)
                  <br />
                  2018 - 2022
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
