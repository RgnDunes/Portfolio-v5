"use client";

import { motion, useInView } from "framer-motion";
import { useState, useRef } from "react";
import { skillCategories } from "@/data/skills";
import Image from "next/image";

export default function SkillsImproved() {
  const [selectedCategory, setSelectedCategory] = useState("Frontend Development");
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const selectedCategoryData = skillCategories.find(
    (cat) => cat.name === selectedCategory
  );

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8"
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="relative z-10 mb-16 text-center"
      >
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-6 py-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent">
            03 · Expertise
          </span>
        </div>
        <h2 className="font-serif text-5xl font-bold tracking-tight text-ink sm:text-6xl">
          Skills & <span className="gradient-text">Technologies</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
          A comprehensive toolkit built through years of hands-on experience
        </p>
      </motion.div>

      {/* Category filters - Minimalist */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 mb-16 flex justify-center"
      >
        <div className="inline-flex gap-2 rounded-2xl bg-white/60 p-2 shadow-sm">
          {skillCategories.map((category, index) => (
            <motion.button
              key={category.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
              onClick={() => setSelectedCategory(category.name)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`rounded-xl px-6 py-3 text-sm font-medium transition-all ${
                selectedCategory === category.name
                  ? "bg-gradient-to-r from-accent to-accent2 text-white"
                  : "bg-transparent text-ink hover:bg-white"
              }`}
            >
              {category.name}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Skills grid - Minimalist clean cards */}
      <motion.div
        key={selectedCategory}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10"
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {selectedCategoryData?.skills.map((skill: any, index: number) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              whileHover={{ y: -4 }}
              className="group rounded-2xl bg-white p-6 shadow-sm transition-all hover:shadow-md"
            >
              {/* Skill icon - Clean and simple */}
              {skill.image && (
                <div className="mb-5 flex justify-center">
                  <div className="relative h-16 w-16 transition-transform duration-200 group-hover:scale-105">
                    <Image
                      src={skill.image}
                      alt={skill.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              )}

              {/* Skill name */}
              <h3 className="mb-2 text-center font-serif text-lg font-bold text-ink">
                {skill.name}
              </h3>

              {/* Experience badge - minimal */}
              {skill.experience && (
                <div className="flex justify-center">
                  <span className="text-xs font-medium text-accent">
                    {skill.experience}
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
