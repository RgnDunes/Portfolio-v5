"use client";

import { motion } from "framer-motion";
import { FaGithub, FaNpm, FaExternalLinkAlt } from "react-icons/fa";
import { IconType } from "react-icons";

interface ProjectLink {
  label: string;
  href: string;
  icon: IconType;
}

interface Project {
  title: string;
  description: string;
  techStack: string[];
  links: ProjectLink[];
  stats?: string;
}

const projects: Project[] = [
  {
    title: "i18nify-js",
    description:
      "A powerful internationalization library for JavaScript applications, featuring automated translations, locale management, and more.",
    techStack: ["TypeScript", "React", "Node.js"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/RgnDunes/i18nify-js",
        icon: FaGithub,
      },
      {
        label: "npm",
        href: "https://www.npmjs.com/package/i18nify-js",
        icon: FaNpm,
      },
    ],
    stats: "1 lac+ weekly downloads",
  },
  {
    title: "Full Spectrum JavaScript",
    description:
      "Authored and sold 200+ copies of the book Full Spectrum JavaScript on Gumroad, covering comprehensive JavaScript concepts and best practices.",
    techStack: ["JavaScript", "Web Development", "Programming"],
    links: [
      {
        label: "Gumroad",
        href: "https://gumroad.com",
        icon: FaExternalLinkAlt,
      },
    ],
  },
];

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
          Projects
        </h2>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
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
                {project.techStack.map((tech) => (
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
