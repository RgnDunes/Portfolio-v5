"use client";

import { motion } from "framer-motion";
import { experiences } from "@/data/experience";

const highlightText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      const highlightedText = part.slice(2, -2);
      return (
        <span key={index} className="text-blue-400 font-medium">
          {highlightedText}
        </span>
      );
    }
    return part;
  });
};

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl">
          Experience
        </h2>
        <div className="mt-12 space-y-12">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative overflow-hidden rounded-2xl bg-gray-800/50 p-8 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-100">
                    {experience.position}
                  </h3>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-blue-400">{experience.company}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-400">{experience.duration}</span>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-gray-400">
                {highlightText(experience.description)}
              </p>
              {experience.achievements && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-300">
                    Key Achievements
                  </h4>
                  <ul className="mt-2 space-y-2">
                    {experience.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                        <span className="text-gray-400">
                          {highlightText(achievement)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
