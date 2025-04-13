"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const skillCategories = [
  {
    name: "Frontend Development",
    skills: [
      "ReactJS",
      "TypeScript",
      "JavaScript",
      "Redux",
      "Zustand",
      "Svelte",
      "Blade UI",
      "MUI",
      "Chakra UI",
      "HTML",
      "CSS",
    ],
  },
  {
    name: "Backend Development",
    skills: ["Flask"],
  },
  {
    name: "Testing Tools",
    skills: [
      "Jest",
      "React Testing Library",
      "Mock Service Worker (MSW)",
      "Playwright",
    ],
  },
  {
    name: "UI Libraries & Frameworks",
    skills: [
      "Chakra UI",
      "Blade UI",
      "Semantic UI",
      "Material UI",
      "Styled Components",
    ],
  },
  {
    name: "Other Tools & Platforms",
    skills: ["Firebase", "Git", "GitHub", "npm", "Webpack", "Rollup", "Vite"],
  },
];

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState(
    "Frontend Development"
  );

  return (
    <section
      id="skills"
      className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl">
          Skills & Technologies
        </h2>
        <div className="mt-8 flex flex-wrap gap-4">
          {skillCategories.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                selectedCategory === category.name
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        <div className="mt-12">
          {skillCategories.map(
            (category) =>
              selectedCategory === category.name && (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {category.skills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.2,
                        delay: index * 0.05,
                      }}
                      className="group relative overflow-hidden rounded-lg bg-gray-800/50 p-6 backdrop-blur-sm transition-all hover:bg-gray-800/70"
                    >
                      <div className="relative z-10">
                        <h3 className="text-lg font-semibold text-gray-100">
                          {skill}
                        </h3>
                        <div className="mt-2 h-1 w-full rounded-full bg-gray-700">
                          <motion.div
                            className="h-1 rounded-full bg-blue-500"
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                          />
                        </div>
                      </div>
                      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
                    </motion.div>
                  ))}
                </motion.div>
              )
          )}
        </div>
      </motion.div>
    </section>
  );
}
