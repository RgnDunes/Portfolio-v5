import { FaGithub, FaExternalLinkAlt, FaNpm } from "react-icons/fa";

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
    title: "i18nify-js",
    description:
      "It is an open-source internationalization SDK designed to simplify locale-based formatting, translations, and region-aware UI rendering across web apps. Published on npm with 100k+ weekly downloads.",
    image: "/images/projects/js-book.jpg",
    technologies: ["JavaScript", "Rollup"],
    links: [
      {
        label: "Book",
        href: "https://www.npmjs.com/package/@razorpay/i18nify-js",
        icon: FaNpm,
      },
      {
        label: "GitHub",
        href: "https://github.com/razorpay/i18nify",
        icon: FaGithub,
      },
    ],
    stats: "86K+ weekly downloads",
  },
];
