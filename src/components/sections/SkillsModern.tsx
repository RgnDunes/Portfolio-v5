"use client";

import { motion, useInView } from "framer-motion";
import { useState, useRef } from "react";
import { skillCategories } from "@/data/skills";
import Image from "next/image";

export default function SkillsModern() {
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
      {/* Animated starfield background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-accent"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

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

      {/* Category filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 mb-12 flex justify-center"
      >
        <div className="glass-strong inline-flex flex-wrap justify-center gap-3 rounded-2xl p-4">
          {skillCategories.map((category, index) => (
            <motion.button
              key={category.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
              onClick={() => setSelectedCategory(category.name)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative overflow-hidden rounded-xl px-6 py-3 text-sm font-semibold transition-all ${
                selectedCategory === category.name
                  ? "bg-gradient-to-r from-accent to-accent2 text-white shadow-lg"
                  : "bg-white/50 text-ink hover:bg-white/80"
              }`}
            >
              <span className="relative z-10">{category.name}</span>
              {selectedCategory === category.name && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-gradient-to-r from-accent to-accent2"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Skills grid */}
      <motion.div
        key={selectedCategory}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {selectedCategoryData?.skills.map((skill: any, index: number) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              whileHover={{ scale: 1.05, y: -8 }}
              className="glass-strong group relative overflow-hidden rounded-2xl border border-white/20 p-6 transition-all hover:border-accent/50 hover:shadow-2xl"
            >
              {/* Animated gradient background */}
              <motion.div
                className="absolute inset-0 -z-10 bg-gradient-to-br from-accent/10 via-transparent to-accent2/10 opacity-0 transition-opacity duration-500"
                whileHover={{ opacity: 1 }}
              />

              {/* Skill icon - larger and more prominent */}
              {skill.image && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.03 + 0.2, type: "spring" }}
                  className="mb-6 flex justify-center"
                >
                  <div className="relative h-20 w-20 overflow-hidden rounded-2xl bg-white p-3 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:rotate-6">
                    <Image
                      src={skill.image}
                      alt={skill.name}
                      fill
                      className="object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                </motion.div>
              )}

              {/* Skill name */}
              <h3 className="mb-2 text-center font-serif text-lg font-bold text-ink transition-colors duration-300 group-hover:text-accent">
                {skill.name}
              </h3>

              {/* Experience badge */}
              {skill.experience && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 + 0.4 }}
                  className="flex justify-center"
                >
                  <span className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-accent">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                    {skill.experience}
                  </span>
                </motion.div>
              )}

              {/* Decorative corner elements */}
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.1,
                }}
                className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-accent blur-2xl"
              />
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.1 + 0.5,
                }}
                className="absolute -bottom-6 -left-6 h-20 w-20 rounded-full bg-accent2 blur-2xl"
              />
            </motion.div>
          ))}
        </div>

        {/* Category summary */}
        {selectedCategoryData?.description && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-strong mt-12 rounded-2xl border border-white/20 p-8 text-center"
          >
            <p className="text-lg leading-relaxed text-muted">
              {selectedCategoryData.description}
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Floating decorative elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-10 top-20 -z-10 h-64 w-64 rounded-full bg-gradient-to-br from-accent/10 to-transparent blur-3xl"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-20 left-10 -z-10 h-64 w-64 rounded-full bg-gradient-to-br from-accent2/10 to-transparent blur-3xl"
      />
    </section>
  );
}
