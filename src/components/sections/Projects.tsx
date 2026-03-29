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
          <span className="hidden text-sm font-medium tracking-wider text-accent sm:inline">
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
              {/* Subtle background graphic */}
              <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-[0.08]">
                {index % 4 === 0 && (
                  <svg className="absolute -right-6 -top-6 h-48 w-48" viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="80" stroke="#0f0e0c" strokeWidth="1.5" />
                    <circle cx="100" cy="100" r="60" stroke="#0f0e0c" strokeWidth="1" />
                    <circle cx="100" cy="100" r="40" stroke="#0f0e0c" strokeWidth="0.8" />
                    <circle cx="100" cy="100" r="20" stroke="#0f0e0c" strokeWidth="0.5" />
                    <line x1="20" y1="100" x2="180" y2="100" stroke="#0f0e0c" strokeWidth="0.5" />
                    <line x1="100" y1="20" x2="100" y2="180" stroke="#0f0e0c" strokeWidth="0.5" />
                  </svg>
                )}
                {index % 4 === 1 && (
                  <svg className="absolute -right-4 -top-4 h-44 w-44" viewBox="0 0 200 200" fill="none">
                    <rect x="30" y="30" width="140" height="140" stroke="#0f0e0c" strokeWidth="1" rx="4" />
                    <rect x="55" y="55" width="90" height="90" stroke="#0f0e0c" strokeWidth="0.8" rx="4" />
                    <rect x="75" y="75" width="50" height="50" stroke="#0f0e0c" strokeWidth="0.5" rx="4" />
                    <line x1="30" y1="30" x2="75" y2="75" stroke="#0f0e0c" strokeWidth="0.4" />
                    <line x1="170" y1="30" x2="125" y2="75" stroke="#0f0e0c" strokeWidth="0.4" />
                    <line x1="30" y1="170" x2="75" y2="125" stroke="#0f0e0c" strokeWidth="0.4" />
                    <line x1="170" y1="170" x2="125" y2="125" stroke="#0f0e0c" strokeWidth="0.4" />
                  </svg>
                )}
                {index % 4 === 2 && (
                  <svg className="absolute -right-8 -top-8 h-52 w-52" viewBox="0 0 200 200" fill="none">
                    <polygon points="100,10 190,60 190,140 100,190 10,140 10,60" stroke="#0f0e0c" strokeWidth="1" fill="none" />
                    <polygon points="100,40 160,70 160,130 100,160 40,130 40,70" stroke="#0f0e0c" strokeWidth="0.7" fill="none" />
                    <polygon points="100,65 135,82 135,118 100,135 65,118 65,82" stroke="#0f0e0c" strokeWidth="0.5" fill="none" />
                  </svg>
                )}
                {index % 4 === 3 && (
                  <svg className="absolute -right-6 -top-6 h-48 w-48" viewBox="0 0 200 200" fill="none">
                    <path d="M100 10 L100 190" stroke="#0f0e0c" strokeWidth="0.5" />
                    <path d="M10 100 L190 100" stroke="#0f0e0c" strokeWidth="0.5" />
                    <path d="M30 30 L170 170" stroke="#0f0e0c" strokeWidth="0.4" />
                    <path d="M170 30 L30 170" stroke="#0f0e0c" strokeWidth="0.4" />
                    <circle cx="100" cy="100" r="70" stroke="#0f0e0c" strokeWidth="1" />
                    <circle cx="100" cy="100" r="45" stroke="#0f0e0c" strokeWidth="0.6" />
                    <circle cx="100" cy="100" r="4" fill="#0f0e0c" />
                  </svg>
                )}
              </div>

              <h3 className="relative z-10 font-serif text-2xl font-bold text-[#0f0e0c]">
                {project.title}
              </h3>
              <p className="relative z-10 mt-4 leading-relaxed text-[#0f0e0c]">
                {project.description}
              </p>

              <div className="relative z-10 mt-6 flex flex-wrap gap-2">
                {project.technologies.map((tech: string) => (
                  <span
                    key={tech}
                    className="rounded-md bg-[#f5e6d3] px-3 py-1 text-xs font-medium text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="relative z-10 mt-6 flex items-center justify-between">
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
