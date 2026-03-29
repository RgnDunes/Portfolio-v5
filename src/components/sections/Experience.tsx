"use client";

import { motion } from "framer-motion";
import { experiences } from "@/data/experience";
import Image from "next/image";
import { useState } from "react";

const highlightText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      const highlightedText = part.slice(2, -2);
      return (
        <span key={index} className="font-medium text-[#0f0e0c]">
          {highlightedText}
        </span>
      );
    }
    return part;
  });
};

export default function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [expandedRolesIndex, setExpandedRolesIndex] = useState<number | null>(null);
  const [expandedMediaIndex, setExpandedMediaIndex] = useState<number | null>(null);

  return (
    <section
      id="experience"
      className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #0f0e0c 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-[#0f0e0c] sm:text-4xl">
            Work Experience
          </h2>
          <span className="text-sm font-medium tracking-wider text-accent">
            02 · WORK
          </span>
        </div>

        <div className="mt-12 space-y-8">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.company}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className="relative"
            >
              {/* Timeline dot */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                className="absolute -left-2 top-8 h-3 w-3 rounded-full border-2 border-accent bg-white sm:-left-4"
              />

              {/* Card */}
              <motion.div
                whileHover={{
                  scale: 1.01,
                  boxShadow: "0 15px 40px rgba(0,0,0,0.1)",
                  borderColor: "#c84b31"
                }}
                transition={{ duration: 0.3 }}
                className="ml-6 overflow-hidden rounded-lg border-2 border-[#d4cdc0] bg-white p-6 sm:ml-8 sm:p-8"
              >
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-gray-50 p-2">
                      <Image
                        src={experience.logo}
                        alt={`${experience.company} logo`}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-[#0f0e0c]">
                        {experience.position}
                      </h3>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted">
                        {experience.company}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-accent">
                    {experience.duration}
                  </span>
                </div>

                <p className="mt-4 leading-relaxed text-[#0f0e0c]">
                  {highlightText(experience.description)}
                </p>

                {/* Tags */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {experience.technologies?.map((tech: string) => (
                    <span
                      key={tech}
                      className="rounded-md bg-[#f5e6d3] px-3 py-1 text-xs font-medium text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Achievements toggle */}
                {experience.achievements && (
                  <div className="mt-6">
                    <button
                      onClick={() =>
                        setExpandedIndex(expandedIndex === index ? null : index)
                      }
                      className="text-sm font-medium text-accent hover:underline"
                    >
                      {expandedIndex === index
                        ? "Hide achievements ↑"
                        : "Show achievements ↓"}
                    </button>

                    {expandedIndex === index && (
                      <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 space-y-3 border-t border-[#d4cdc0] pt-4"
                      >
                        {experience.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex gap-3">
                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                            <span className="leading-relaxed text-[#0f0e0c]">
                              {highlightText(achievement)}
                            </span>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </div>
                )}

                {/* Media gallery */}
                {experience.media && experience.media.length > 0 && (
                  <div className="mt-6">
                    <button
                      onClick={() =>
                        setExpandedMediaIndex(expandedMediaIndex === index ? null : index)
                      }
                      className="text-sm font-medium text-accent hover:underline"
                    >
                      {expandedMediaIndex === index
                        ? "Hide awards & certificates ↑"
                        : `Show awards & certificates (${experience.media.length}) ↓`}
                    </button>

                    {expandedMediaIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 grid grid-cols-2 gap-4 border-t border-[#d4cdc0] pt-4 sm:grid-cols-3"
                      >
                        {experience.media.map((item, mediaIdx) => (
                          <div key={mediaIdx} className="group/media overflow-hidden rounded-lg border border-[#d4cdc0]">
                            <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
                              <Image
                                src={item.src}
                                alt={item.caption}
                                fill
                                className="object-contain p-2 transition-transform duration-300 group-hover/media:scale-105"
                              />
                            </div>
                            <p className="bg-[#f5f0e8] px-3 py-2 text-center text-xs font-medium text-muted">
                              {item.caption}
                            </p>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                )}

                {/* Previous roles */}
                {experience.previousRoles && (
                  <div className="mt-6">
                    <button
                      onClick={() =>
                        setExpandedRolesIndex(expandedRolesIndex === index ? null : index)
                      }
                      className="text-sm font-medium text-accent hover:underline"
                    >
                      {expandedRolesIndex === index
                        ? "Hide previous roles ↑"
                        : `Show previous roles (${experience.previousRoles.length}) ↓`}
                    </button>

                    {expandedRolesIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 border-t border-[#d4cdc0] pt-6"
                      >
                        {experience.previousRoles.map((previousRole, roleIndex) => (
                          <div key={roleIndex} className="mt-6 first:mt-0">
                            <div className="flex items-start justify-between">
                              <h5 className="font-semibold text-[#0f0e0c]">
                                {previousRole.position}
                              </h5>
                              <span className="text-sm text-muted">
                                {previousRole.duration}
                              </span>
                            </div>
                            <p className="mt-2 leading-relaxed text-[#0f0e0c]">
                              {highlightText(previousRole.description)}
                            </p>
                            {previousRole.achievements && (
                              <ul className="mt-4 space-y-3">
                                {previousRole.achievements.map((achievement, idx) => (
                                  <li key={idx} className="flex gap-3">
                                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                                    <span className="leading-relaxed text-[#0f0e0c]">
                                      {highlightText(achievement)}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            )}
                            {previousRole.media && previousRole.media.length > 0 && (
                              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                                {previousRole.media.map((item, mediaIdx) => (
                                  <div key={mediaIdx} className="overflow-hidden rounded-lg border border-[#d4cdc0]">
                                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
                                      <Image
                                        src={item.src}
                                        alt={item.caption}
                                        fill
                                        className="object-contain p-2"
                                      />
                                    </div>
                                    <p className="bg-[#f5f0e8] px-2 py-1.5 text-center text-xs font-medium text-muted">
                                      {item.caption}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
