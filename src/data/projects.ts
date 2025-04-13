import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

export interface ProjectLink {
  label: string;
  href: string;
  icon: typeof FaGithub | typeof FaExternalLinkAlt;
}

export interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  links: ProjectLink[];
  stats?: string;
}

export const projects: Project[] = [
  {
    title: "Full Spectrum JavaScript",
    description:
      "A comprehensive guide to modern JavaScript development, covering everything from basics to advanced patterns and best practices.",
    image: "/images/projects/js-book.jpg",
    technologies: ["JavaScript", "TypeScript", "Node.js", "React"],
    links: [
      {
        label: "Book",
        href: "https://fullspectrumjs.com",
        icon: FaExternalLinkAlt,
      },
      {
        label: "GitHub",
        href: "https://github.com/rgndunes/full-spectrum-js",
        icon: FaGithub,
      },
    ],
    stats: "200+ copies sold",
  },
  {
    title: "i18n Linter",
    description:
      "Custom ESLint plugin for detecting internationalization issues in React applications, helping teams maintain consistent localization.",
    image: "/images/projects/i18n-linter.jpg",
    technologies: ["TypeScript", "ESLint", "AST", "Node.js"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/rgndunes/i18n-linter",
        icon: FaGithub,
      },
    ],
    stats: "50k+ downloads",
  },
];
