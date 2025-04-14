"use client";

import { motion } from "framer-motion";
import {
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { useState, useMemo } from "react";
import { articles } from "@/data/articles";

const ARTICLES_PER_PAGE = 4;

export default function ArticlesAndProducts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string>("All");

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTab = activeTab === "All" || article.type === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [articles, searchQuery, activeTab]);

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
      </motion.div>
    </section>
  );
}
