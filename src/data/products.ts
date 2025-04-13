import { FaExternalLinkAlt } from "react-icons/fa";

export interface Product {
  title: string;
  type: string;
  description: string;
  image?: string;
  link: string;
  stats: string;
  techStack: string[];
}

export const products: Product[] = [
  {
    title: "Full Spectrum JavaScript",
    type: "Book",
    description:
      "A comprehensive guide to JavaScript, covering everything from basics to advanced concepts, design patterns, and best practices.",
    image: "/articles/javascript-book.jpg",
    link: "https://gumroad.com",
    stats: "200+ copies sold",
    techStack: ["JavaScript", "Web Development", "Programming"],
  },
  {
    title: "React Component Library",
    type: "UI Library",
    description:
      "A collection of reusable React components built with TypeScript and styled with Tailwind CSS, focusing on accessibility and performance.",
    image: "/images/projects/react-components.jpg",
    link: "https://github.com/RgnDunes/react-components",
    stats: "50K+ downloads",
    techStack: ["React", "TypeScript", "Tailwind CSS"],
  },
];
