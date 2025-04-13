"use client";

import { motion } from "framer-motion";
import { FaBook, FaExternalLinkAlt, FaMedium, FaDev } from "react-icons/fa";

const articles = [
  {
    title: "Full Spectrum JavaScript",
    type: "Book",
    description:
      "A comprehensive guide to JavaScript, covering everything from basics to advanced concepts, design patterns, and best practices.",
    image: "/articles/javascript-book.jpg",
    link: "https://gumroad.com",
    icon: FaBook,
    date: "2023",
    stats: "200+ copies sold",
  },
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
];

const products = [
  {
    title: "i18nify-js",
    type: "Open Source Library",
    description:
      "A powerful internationalization library for JavaScript applications, featuring automated translations, locale management, and more.",
    link: "https://github.com/RgnDunes/i18nify-js",
    stats: "1 lac+ weekly downloads",
    techStack: ["TypeScript", "React", "Node.js"],
  },
  {
    title: "React Component Library",
    type: "UI Library",
    description:
      "A collection of reusable React components built with TypeScript and styled with Tailwind CSS, focusing on accessibility and performance.",
    link: "https://github.com/RgnDunes/react-components",
    stats: "50K+ downloads",
    techStack: ["React", "TypeScript", "Tailwind CSS"],
  },
];

export default function ArticlesAndProducts() {
  return (
    <section
      id="articles-products"
      className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl">
          Articles & Digital Products
        </h2>

        {/* Articles */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-gray-100">
            Featured Articles
          </h3>
          <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <motion.div
                key={article.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-gray-800/50 p-6 backdrop-blur-sm transition-all hover:bg-gray-800/70"
              >
                <div className="flex items-center gap-4">
                  <article.icon className="h-8 w-8 text-blue-500" />
                  <div>
                    <span className="text-sm font-medium text-blue-400">
                      {article.type}
                    </span>
                    <h4 className="text-lg font-semibold text-gray-100">
                      {article.title}
                    </h4>
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-400">
                  {article.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    <span>{article.date}</span>
                    {article.stats && (
                      <>
                        <span className="mx-2">•</span>
                        <span>{article.stats}</span>
                      </>
                    )}
                  </div>
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300"
                    aria-label={`Read ${article.title}`}
                  >
                    <FaExternalLinkAlt className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Digital Products */}
        <div className="mt-16">
          <h3 className="text-xl font-semibold text-gray-100">
            Digital Products
          </h3>
          <div className="mt-6 grid gap-8 lg:grid-cols-2">
            {products.map((product, index) => (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-gray-800/50 p-8 backdrop-blur-sm transition-all hover:bg-gray-800/70"
              >
                <div>
                  <span className="text-sm font-medium text-blue-400">
                    {product.type}
                  </span>
                  <h4 className="mt-1 text-xl font-semibold text-gray-100">
                    {product.title}
                  </h4>
                </div>
                <p className="mt-4 text-gray-400">{product.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {product.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-sm text-gray-500">{product.stats}</span>
                  <a
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300"
                    aria-label={`View ${product.title}`}
                  >
                    <FaExternalLinkAlt className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
