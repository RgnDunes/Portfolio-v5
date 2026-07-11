"use client";

import { motion, useInView } from "framer-motion";
import { experiences } from "@/data/experience";
import Image from "next/image";
import { useState, useRef } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const highlightText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      const highlightedText = part.slice(2, -2);
      return (
        <span key={index} className="font-semibold text-accent">
          {highlightedText}
        </span>
      );
    }
    return part;
  });
};

export default function ExperienceModern() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [expandedRolesIndex, setExpandedRolesIndex] = useState<number | null>(null);
  const [expandedMediaIndex, setExpandedMediaIndex] = useState<number | null>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8"
    >
      {/* Animated background */}
      <div className="absolute inset-0 -z-10 overflow-hidden opacity-[0.03]">
        <div
          className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2"
          style={{
            background: "linear-gradient(to bottom, transparent, #c84b31, transparent)",
          }}
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
            02 · Career Journey
          </span>
        </div>
        <h2 className="font-serif text-5xl font-bold tracking-tight text-ink sm:text-6xl">
          Work <span className="gradient-text">Experience</span>
        </h2>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Animated timeline line */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute left-4 top-0 hidden h-full w-0.5 origin-top bg-gradient-to-b from-accent via-accent2 to-accent md:block"
          style={{ left: "2rem" }}
        />

        <div className="space-y-12">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.company}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative"
            >
              {/* Timeline node */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={isInView ? { scale: 1, rotate: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                className="absolute left-0 top-8 z-10 hidden md:block"
              >
                <div className="relative flex h-16 w-16 items-center justify-center">
                  <div className="absolute h-16 w-16 animate-pulse-slow rounded-full bg-accent/20" />
                  <div className="glass-strong relative h-12 w-12 overflow-hidden rounded-full border-4 border-white p-1 shadow-xl">
                    <Image
                      src={experience.logo}
                      alt={`${experience.company} logo`}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Experience card */}
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
                className="group ml-0 md:ml-24"
              >
                <div className="glass-strong overflow-hidden rounded-2xl border border-white/20 p-8 shadow-xl transition-all hover:border-accent/50 hover:shadow-2xl">
                  {/* Header */}
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-4">
                      {/* Mobile logo */}
                      <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl bg-white p-2 shadow-md md:hidden">
                        <Image
                          src={experience.logo}
                          alt={`${experience.company} logo`}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="font-serif text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                          {experience.position}
                        </h3>
                        <p className="mt-2 text-sm font-bold uppercase tracking-wider text-accent">
                          {experience.company}
                        </p>
                      </div>
                    </div>
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-ink"
                    >
                      <span className="h-2 w-2 rounded-full bg-accent" />
                      {experience.duration}
                    </motion.span>
                  </div>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: index * 0.2 + 0.5 }}
                    className="mt-6 text-base leading-relaxed text-ink lg:text-lg"
                  >
                    {highlightText(experience.description)}
                  </motion.p>

                  {/* Technologies */}
                  {experience.technologies && experience.technologies.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: index * 0.2 + 0.6 }}
                      className="mt-6 flex flex-wrap gap-2"
                    >
                      {experience.technologies.map((tech: string, techIndex: number) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ delay: index * 0.2 + 0.7 + techIndex * 0.05 }}
                          whileHover={{ scale: 1.1, y: -2 }}
                          className="rounded-lg bg-accent/10 px-3 py-1.5 text-xs font-medium text-ink transition-all hover:bg-accent/20"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </motion.div>
                  )}

                  {/* Expandable content */}
                  {experience.achievements && experience.achievements.length > 0 && (
                    <div className="mt-6">
                      <motion.button
                        onClick={() =>
                          setExpandedIndex(expandedIndex === index ? null : index)
                        }
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="glass-strong flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-semibold text-ink transition-all hover:bg-white/30"
                      >
                        <span>Key Achievements</span>
                        {expandedIndex === index ? (
                          <FaChevronUp className="h-4 w-4 text-accent" />
                        ) : (
                          <FaChevronDown className="h-4 w-4 text-accent" />
                        )}
                      </motion.button>

                      <motion.div
                        initial={false}
                        animate={{
                          height: expandedIndex === index ? "auto" : 0,
                          opacity: expandedIndex === index ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <ul className="mt-4 space-y-3 pl-4">
                          {experience.achievements.map((achievement: string, i: number) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={
                                expandedIndex === index
                                  ? { opacity: 1, x: 0 }
                                  : { opacity: 0, x: -20 }
                              }
                              transition={{ delay: i * 0.1 }}
                              className="flex gap-3 text-sm leading-relaxed text-muted"
                            >
                              <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-accent" />
                              <span>{highlightText(achievement)}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    </div>
                  )}

                  {/* Expandable roles */}
                  {experience.roles && experience.roles.length > 0 && (
                    <div className="mt-4">
                      <motion.button
                        onClick={() =>
                          setExpandedRolesIndex(expandedRolesIndex === index ? null : index)
                        }
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="glass-strong flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-semibold text-ink transition-all hover:bg-white/30"
                      >
                        <span>Role History</span>
                        {expandedRolesIndex === index ? (
                          <FaChevronUp className="h-4 w-4 text-accent" />
                        ) : (
                          <FaChevronDown className="h-4 w-4 text-accent" />
                        )}
                      </motion.button>

                      <motion.div
                        initial={false}
                        animate={{
                          height: expandedRolesIndex === index ? "auto" : 0,
                          opacity: expandedRolesIndex === index ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 space-y-4">
                          {experience.roles.map((role: any, i: number) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, y: 10 }}
                              animate={
                                expandedRolesIndex === index
                                  ? { opacity: 1, y: 0 }
                                  : { opacity: 0, y: 10 }
                              }
                              transition={{ delay: i * 0.1 }}
                              className="glass rounded-lg p-4"
                            >
                              <div className="flex items-start justify-between">
                                <h4 className="font-semibold text-ink">{role.title}</h4>
                                <span className="text-xs font-medium text-accent">
                                  {role.duration}
                                </span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
