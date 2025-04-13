export const experiences = [
  {
    company: "Razorpay",
    position: "Senior Frontend Engineer",
    duration: "2021 - Present",
    description:
      "Leading frontend development for international expansion, focusing on Southeast Asian markets. Spearheading i18n initiatives and performance optimizations.",
    achievements: [
      "Led frontend team to expand into Malaysia, achieving monthly GMV of 80M MYR",
      "Developed i18n-linter reducing region-sensitive hard-coding errors by 87%",
      "Improved API response time by 67% through microservices architecture",
      "Created India's first token lifecycle management system for major banks",
    ],
    technologies: ["React", "TypeScript", "Next.js", "GraphQL", "Node.js"],
  },
  {
    company: "Previous Experience",
    position: "Frontend Developer",
    duration: "2019 - 2021",
    description:
      "Worked on building scalable web applications and improving user experiences.",
    achievements: [
      "Reduced application load time by 40% through code splitting and lazy loading",
      "Implemented automated testing reducing bug reports by 60%",
      "Led migration from legacy codebase to modern React architecture",
    ],
    technologies: ["React", "JavaScript", "Redux", "Jest", "Webpack"],
  },
] as const;
