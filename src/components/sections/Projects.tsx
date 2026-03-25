"use client";

import { motion } from "framer-motion";
import { FaGithub, FaNpm, FaExternalLinkAlt } from "react-icons/fa";
import { IconType } from "react-icons";
import { projects } from "@/data/projects";

interface ProjectLink {
  label: string;
  href: string;
  icon: IconType;
}

interface Project {
  title: string;
  description: string;
  technologies: string[];
  links: ProjectLink[];
  stats?: string;
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Motorcycle road pattern - very subtle */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none hidden lg:block">
        <svg width="300" height="400" viewBox="0 0 300 400" fill="none">
          {/* Road lines */}
          <line x1="150" y1="0" x2="150" y2="400" stroke="#0f0e0c" strokeWidth="40" />
          <line x1="150" y1="20" x2="150" y2="80" stroke="#dad4cc" strokeWidth="4" strokeDasharray="20 20" />
          <line x1="150" y1="120" x2="150" y2="180" stroke="#dad4cc" strokeWidth="4" strokeDasharray="20 20" />
          <line x1="150" y1="220" x2="150" y2="280" stroke="#dad4cc" strokeWidth="4" strokeDasharray="20 20" />
          <line x1="150" y1="320" x2="150" y2="380" stroke="#dad4cc" strokeWidth="4" strokeDasharray="20 20" />
        </svg>
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
            Featured Projects
          </h2>
          <span className="text-sm font-medium tracking-wider text-accent">
            04 · PROJECTS
          </span>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{
                y: -8,
                boxShadow: "0 20px 50px rgba(0,0,0,0.12)",
                borderColor: "#c84b31"
              }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
                ease: "easeOut"
              }}
              className="group relative overflow-hidden rounded-lg border-2 border-[#d4cdc0] bg-white p-8"
            >
              <h3 className="font-serif text-2xl font-bold text-[#0f0e0c]">
                {project.title}
              </h3>
              <p className="mt-4 leading-relaxed text-[#0f0e0c]">
                {project.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.technologies.map((tech: string) => (
                  <span
                    key={tech}
                    className="rounded-md bg-[#f5e6d3] px-3 py-1 text-xs font-medium text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between">
                {project.stats && (
                  <span className="text-sm font-medium text-accent">
                    {project.stats}
                  </span>
                )}
                <div className="flex gap-4">
                  {project.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted transition-colors hover:text-accent"
                      aria-label={`View ${project.title} on ${link.label}`}
                    >
                      <link.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
