"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
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
            Senior Frontend Engineer with expertise in building scalable web
            applications and leading frontend teams. Currently at Razorpay,
            focusing on expanding payment solutions across Southeast Asia and
            improving internationalization support.
          </p>
          <p className="mt-4 text-lg text-gray-400">
            I specialize in React.js, TypeScript, and modern frontend
            technologies, with a track record of reducing development time and
            improving application performance. My work has contributed to
            significant improvements in user engagement and system efficiency.
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
            <ul className="mt-2 list-inside list-disc space-y-2">
              <li>
                Led frontend team to expand Razorpay into Malaysia, achieving
                monthly GMV of 80M MYR
              </li>
              <li>
                Developed i18n-linter reducing region-sensitive hard-coding
                errors by 87%
              </li>
              <li>
                Improved API response time by 67% through microservices
                architecture
              </li>
              <li>
                Created India's first token lifecycle management system for
                major banks
              </li>
              <li>
                Published a book "Full Spectrum JavaScript" with 200+ copies
                sold
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-100">Education</h3>
            <p className="mt-2">
              Bachelor of Technology in Computer Science Engineering
              <br />
              Kalinga Institute of Industrial Technology (CGPA: 9.4/10)
              <br />
              2018 - 2022
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
