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
      className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Subtle pattern background */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(30deg, #0f0e0c 12%, transparent 12.5%, transparent 87%, #0f0e0c 87.5%, #0f0e0c), linear-gradient(150deg, #0f0e0c 12%, transparent 12.5%, transparent 87%, #0f0e0c 87.5%, #0f0e0c)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-[#0f0e0c] sm:text-4xl">
            Articles & Talks
          </h2>
        </div>

        {/* Articles */}
        <div className="mt-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="font-serif text-xl font-semibold text-[#0f0e0c]">
              Featured Articles
            </h3>
            <div className="flex flex-wrap gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border-2 border-[#d4cdc0] bg-white px-4 py-2 pl-10 text-[#0f0e0c] placeholder-muted focus:border-accent focus:outline-none"
                />
                <FaSearch className="absolute left-3 top-2.5 text-muted" />
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-6">
            <div className="flex flex-wrap gap-2 border-b border-[#d4cdc0]">
              <button
                onClick={() => handleTabChange("All")}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === "All"
                    ? "border-b-2 border-accent text-accent"
                    : "text-muted hover:text-[#0f0e0c]"
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
                      ? "border-b-2 border-accent text-accent"
                      : "text-muted hover:text-[#0f0e0c]"
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
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 15px 40px rgba(0,0,0,0.12)",
                    borderColor: "#c84b31"
                  }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  className="group relative overflow-hidden rounded-lg border-2 border-[#d4cdc0] bg-white p-6"
                >
                  <div className="flex items-center gap-4">
                    <article.icon className="h-8 w-8 text-accent" />
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                        {article.type}
                      </span>
                      <h4 className="font-serif text-lg font-bold text-[#0f0e0c]">
                        {article.title}
                      </h4>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-[#0f0e0c]">
                    {article.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm text-muted">
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
                      className="text-accent transition-colors hover:text-[#a03b25]"
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
                  className="rounded-lg border-2 border-[#d4cdc0] bg-white p-2 text-muted transition-all hover:border-accent hover:text-accent disabled:opacity-50 disabled:hover:border-[#d4cdc0] disabled:hover:text-muted"
                  aria-label="Previous page"
                >
                  <FaChevronLeft className="h-5 w-5" />
                </button>
                <span className="text-muted">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="rounded-lg border-2 border-[#d4cdc0] bg-white p-2 text-muted transition-all hover:border-accent hover:text-accent disabled:opacity-50 disabled:hover:border-[#d4cdc0] disabled:hover:text-muted"
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
