"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FaGithub, FaNpm, FaExternalLinkAlt } from "react-icons/fa";
import { IconType } from "react-icons";
import { projects } from "@/data/projects";
import { useRef, MouseEvent } from "react";

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

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative"
    >
      <div className="glass-strong relative overflow-hidden rounded-2xl border border-white/20 p-8 transition-all duration-500 hover:border-accent/50">
        {/* Animated gradient on hover */}
        <div className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent2/10" />
        </div>

        {/* Shimmer effect on hover */}
        <div className="absolute -inset-full top-0 z-10 block h-full w-1/2 -skew-x-12 transform bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:animate-[shimmer_1.5s_ease-in-out] group-hover:opacity-20" />

        {/* Project number badge */}
        <div className="mb-6 flex items-center justify-between">
          <span className="font-serif text-5xl font-bold text-accent/20 transition-all duration-300 group-hover:text-accent/40">
            {String(index + 1).padStart(2, "0")}
          </span>
          {project.stats && (
            <span className="glass rounded-full px-4 py-1 text-xs font-semibold text-accent">
              {project.stats}
            </span>
          )}
        </div>

        {/* Project title */}
        <h3
          className="mb-4 font-serif text-2xl font-bold tracking-tight text-ink transition-colors duration-300 group-hover:text-accent"
          style={{ transform: "translateZ(20px)" }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          className="mb-6 leading-relaxed text-muted"
          style={{ transform: "translateZ(15px)" }}
        >
          {project.description}
        </p>

        {/* Technologies */}
        <div
          className="mb-6 flex flex-wrap gap-2"
          style={{ transform: "translateZ(10px)" }}
        >
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-lg bg-accent/10 px-3 py-1 text-xs font-medium text-ink transition-all duration-300 hover:bg-accent/20 hover:scale-105"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div
          className="flex gap-4"
          style={{ transform: "translateZ(20px)" }}
        >
          {project.links.map((link) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 rounded-lg border border-muted/30 bg-white/50 px-4 py-2 text-sm font-medium text-ink transition-all hover:border-accent hover:bg-accent hover:text-white hover:shadow-lg"
              >
                <Icon className="h-4 w-4" />
                <span>{link.label}</span>
              </motion.a>
            );
          })}
        </div>

        {/* Decorative corner accent */}
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent/5 blur-2xl transition-all duration-500 group-hover:bg-accent/10 group-hover:scale-150" />
        <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-accent2/5 blur-2xl transition-all duration-500 group-hover:bg-accent2/10 group-hover:scale-150" />
      </div>
    </motion.div>
  );
}

export default function ProjectsModern() {
  return (
    <section
      id="projects"
      className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden opacity-[0.02]">
        <div
          className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2"
          style={{
            backgroundImage: `radial-gradient(circle, #0f0e0c 2px, transparent 2px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-16 text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-6 py-2"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
          <span className="text-xs font-semibold uppercase tracking-wider text-accent">
            Featured Work
          </span>
        </motion.div>

        <h2 className="font-serif text-5xl font-bold tracking-tight text-ink sm:text-6xl lg:text-7xl">
          Selected <span className="gradient-text">Projects</span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          Explore my portfolio of open-source contributions, tools, and libraries
          used by thousands of developers worldwide.
        </p>
      </motion.div>

      {/* Projects grid */}
      <div className="grid gap-8 lg:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>

      {/* View more CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-16 text-center"
      >
        <motion.a
          href="https://github.com/rgndunes"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="glass-strong inline-flex items-center gap-3 rounded-xl px-8 py-4 text-base font-semibold text-ink transition-all hover:bg-white/30"
        >
          <FaGithub className="h-5 w-5" />
          <span>View More on GitHub</span>
          <FaExternalLinkAlt className="h-4 w-4" />
        </motion.a>
      </motion.div>
    </section>
  );
}
