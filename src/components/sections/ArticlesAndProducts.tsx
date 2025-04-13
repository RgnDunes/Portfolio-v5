"use client";

import { motion } from "framer-motion";
import {
  FaExternalLinkAlt,
  FaMedium,
  FaDev,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useState, useMemo } from "react";

const articles = [
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
  {
    title: "Building Accessible Web Applications",
    type: "Best Practices",
    description:
      "Essential guidelines and techniques for creating web applications that are accessible to all users, including those with disabilities.",
    link: "https://medium.com/@rgndunes/web-accessibility",
    icon: FaMedium,
    date: "Mar 2024",
    stats: "6K+ reads",
  },
  {
    title: "React Performance Optimization",
    type: "Technical Article",
    description:
      "Advanced techniques for optimizing React applications, including memoization, code splitting, and virtual DOM optimization.",
    link: "https://dev.to/rgndunes/react-performance",
    icon: FaDev,
    date: "Feb 2024",
    stats: "7K+ reads",
  },
  {
    title: "The State of JavaScript 2024",
    type: "Trend Analysis",
    description:
      "Annual survey results and analysis of JavaScript ecosystem trends, developer preferences, and emerging technologies.",
    link: "https://medium.com/@rgndunes/js-state-2024",
    icon: FaMedium,
    date: "Mar 2024",
    stats: "10K+ reads",
  },
  {
    title: "Building Microservices with Node.js",
    type: "Tutorial",
    description:
      "Step-by-step guide to building scalable microservices using Node.js, including service discovery, load balancing, and monitoring.",
    link: "https://dev.to/rgndunes/node-microservices",
    icon: FaDev,
    date: "Jan 2024",
    stats: "5.5K+ reads",
  },
  {
    title: "CSS Grid vs Flexbox",
    type: "Tutorial",
    description:
      "Detailed comparison of CSS Grid and Flexbox, with practical examples of when to use each layout system for optimal results.",
    link: "https://medium.com/@rgndunes/css-grid-flexbox",
    icon: FaMedium,
    date: "Feb 2024",
    stats: "4K+ reads",
  },
  {
    title: "Testing Strategies for React Applications",
    type: "Best Practices",
    description:
      "Comprehensive guide to testing React applications, covering unit testing, component testing, and end-to-end testing strategies.",
    link: "https://dev.to/rgndunes/react-testing",
    icon: FaDev,
    date: "Mar 2024",
    stats: "3.5K+ reads",
  },
  {
    title: "Web Security Best Practices",
    type: "Best Practices",
    description:
      "Essential security practices for web applications, covering authentication, authorization, and protection against common vulnerabilities.",
    link: "https://medium.com/@rgndunes/web-security",
    icon: FaMedium,
    date: "Feb 2024",
    stats: "9K+ reads",
  },
  {
    title: "Building Progressive Web Apps",
    type: "Tutorial",
    description:
      "Complete guide to building Progressive Web Apps (PWAs) that work offline, load quickly, and provide native-like experiences.",
    link: "https://dev.to/rgndunes/pwa-guide",
    icon: FaDev,
    date: "Jan 2024",
    stats: "6.5K+ reads",
  },
];

const products = [
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
    link: "https://github.com/RgnDunes/react-components",
    stats: "50K+ downloads",
    techStack: ["React", "TypeScript", "Tailwind CSS"],
  },
];

const ARTICLES_PER_PAGE = 4;

export default function ArticlesAndProducts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("All");

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = !selectedType || article.type === selectedType;
      const matchesTab = activeTab === "All" || article.type === activeTab;
      return matchesSearch && matchesType && matchesTab;
    });
  }, [articles, searchQuery, selectedType, activeTab]);

  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  );

  const articleTypes = useMemo(() => {
    return Array.from(new Set(articles.map((article) => article.type)));
  }, [articles]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset to first page when changing tabs
  };

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
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-xl font-semibold text-gray-100">
              Featured Articles
            </h3>
            <div className="flex flex-wrap gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg bg-gray-800/50 px-4 py-2 pl-10 text-gray-100 placeholder-gray-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-6">
            <div className="flex flex-wrap gap-2 border-b border-gray-800">
              <button
                onClick={() => handleTabChange("All")}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === "All"
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-gray-400 hover:text-gray-100"
                }`}
              >
                All
              </button>
              {articleTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => handleTabChange(type)}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    activeTab === type
                      ? "border-b-2 border-blue-500 text-blue-500"
                      : "text-gray-400 hover:text-gray-100"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="mt-6 grid gap-8 sm:grid-cols-2">
              {paginatedArticles.map((article, index) => (
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="rounded-lg bg-gray-800/50 p-2 text-gray-400 transition-colors hover:bg-gray-800/70 hover:text-gray-100 disabled:opacity-50 disabled:hover:bg-gray-800/50 disabled:hover:text-gray-400"
                  aria-label="Previous page"
                >
                  <FaChevronLeft className="h-5 w-5" />
                </button>
                <span className="text-gray-400">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="rounded-lg bg-gray-800/50 p-2 text-gray-400 transition-colors hover:bg-gray-800/70 hover:text-gray-100 disabled:opacity-50 disabled:hover:bg-gray-800/50 disabled:hover:text-gray-400"
                  aria-label="Next page"
                >
                  <FaChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
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
