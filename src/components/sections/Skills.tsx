"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { skillCategories } from "@/data/skills";
import Image from "next/image";

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState(
    "Frontend Development"
  );

  return (
    <section
      id="skills"
      className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Cosmos/starfield background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-0.5 w-0.5 rounded-full bg-accent"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.1,
            }}
            animate={{
              opacity: [0.05, 0.2, 0.05],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
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
            Skills & Technologies
          </h2>
          <span className="hidden text-sm font-medium tracking-wider text-accent sm:inline">
            03 · SKILLS
          </span>
        </div>

        <div className="mt-8 flex gap-3 overflow-x-auto pb-2 scrollbar-hide sm:flex-wrap sm:overflow-x-visible sm:pb-0">
          {skillCategories.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                selectedCategory === category.name
                  ? "bg-accent text-white"
                  : "border-2 border-[#d4cdc0] bg-white text-muted hover:border-accent"
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
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      whileHover={{
                        scale: 1.05,
                        y: -5,
                        boxShadow: "0 15px 40px rgba(0,0,0,0.1)",
                        borderColor: "#c84b31"
                      }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.05,
                        ease: "easeOut"
                      }}
                      className="group relative overflow-hidden rounded-lg border-2 border-[#d4cdc0] bg-white p-6"
                    >
                      <div className="relative z-10 flex items-center gap-4">
                        <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-gray-50 p-2">
                          <Image
                            src={skill.image}
                            alt={`${skill.name} logo`}
                            fill
                            sizes="48px"
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-[#0f0e0c]">
                            {skill.name}
                          </h3>
                          <p className="text-sm font-medium text-accent">
                            {skill.experience}
                          </p>
                        </div>
                      </div>
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
