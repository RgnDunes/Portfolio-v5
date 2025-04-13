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
      className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl">
          Featured Projects
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-gray-800/50 p-8 backdrop-blur-sm transition-all hover:bg-gray-800/70"
            >
              <h3 className="text-xl font-semibold text-gray-100">
                {project.title}
              </h3>
              <p className="mt-4 text-gray-400">{project.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.technologies.map((tech: string) => (
                  <span
                    key={tech}
                    className="rounded-full bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between">
                {project.stats && (
                  <span className="text-sm text-gray-500">{project.stats}</span>
                )}
                <div className="flex gap-4">
                  {project.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 transition-colors hover:text-gray-100"
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
