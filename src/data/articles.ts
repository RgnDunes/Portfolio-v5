import { FaMedium, FaDev } from "react-icons/fa";

export interface Article {
  title: string;
  type: string;
  description: string;
  link: string;
  icon: typeof FaMedium | typeof FaDev;
  date: string;
  stats: string;
}

export const articles: Article[] = [
  {
    title: "Building Scalable i18n Solutions",
    type: "Technical Article",
    description:
      "Deep dive into building internationalization solutions for large-scale applications, featuring real-world examples and best practices.",
    link: "https://medium.com/@rgndunes/building-scalable-i18n-solutions",
    icon: FaMedium,
    date: "Jan 2024",
    stats: "5K+ reads",
  },
  {
    title: "Micro-frontend Architecture at Scale",
    type: "Technical Article",
    description:
      "A detailed look at implementing and scaling micro-frontend architecture, based on experience migrating large monolithic applications.",
    link: "https://dev.to/rgndunes/micro-frontend-architecture-at-scale",
    icon: FaDev,
    date: "Dec 2023",
    stats: "3K+ reads",
  },
  {
    title: "The Future of Web Development in 2024",
    type: "Trend Analysis",
    description:
      "Exploring emerging technologies and trends that will shape web development in the coming year, from AI integration to new frameworks.",
    link: "https://medium.com/@rgndunes/web-dev-2024",
    icon: FaMedium,
    date: "Feb 2024",
    stats: "8K+ reads",
  },
  {
    title: "Mastering TypeScript Generics",
    type: "Tutorial",
    description:
      "A comprehensive guide to TypeScript generics, covering advanced patterns and real-world use cases for better type safety.",
    link: "https://dev.to/rgndunes/typescript-generics",
    icon: FaDev,
    date: "Jan 2024",
    stats: "4.5K+ reads",
  },
];
