"use client";

import { motion, useInView } from "framer-motion";
import { FaSearch, FaExternalLinkAlt, FaBookOpen } from "react-icons/fa";
import { useState, useMemo, useRef } from "react";
import { articles } from "@/data/articles";

export default function ArticlesModern() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string>("All");
  const [showAll, setShowAll] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTab = activeTab === "All" || article.type === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [searchQuery, activeTab]);

  const displayedArticles = showAll ? filteredArticles : filteredArticles.slice(0, 6);

  const articleTypes = useMemo(() => {
    return ["All", ...Array.from(new Set(articles.map((article) => article.type)))];
  }, []);

  return (
    <section
      id="articles-products"
      ref={containerRef}
      className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8"
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="mb-16 text-center"
      >
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-6 py-2">
          <FaBookOpen className="h-3 w-3 text-accent" />
          <span className="text-xs font-semibold uppercase tracking-wider text-accent">
            06 · Publications
          </span>
        </div>
        <h2 className="font-serif text-5xl font-bold tracking-tight text-ink sm:text-6xl">
          Articles & <span className="gradient-text">Talks</span>
        </h2>
      </motion.div>

      {/* Search and filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-12 space-y-6"
      >
        {/* Search bar */}
        <div className="relative max-w-xl">
          <FaSearch className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted/50" />
          <input
            type="text"
            placeholder="Search articles and talks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="glass-strong w-full rounded-xl border border-white/20 px-12 py-3 text-sm text-ink placeholder-muted/60 outline-none transition-all focus:border-accent/50 focus:shadow-lg"
          />
        </div>

        {/* Type tabs */}
        <div className="flex flex-wrap gap-2">
          {articleTypes.map((type) => (
            <motion.button
              key={type}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(type)}
              className={`rounded-xl px-5 py-2 text-sm font-semibold transition-all ${
                activeTab === type
                  ? "bg-gradient-to-r from-accent to-accent2 text-white shadow-lg"
                  : "glass bg-white/60 text-ink hover:bg-white/80"
              }`}
            >
              {type}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Articles grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {displayedArticles.map((article, index) => (
          <motion.article
            key={article.title}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            whileHover={{ y: -6 }}
            className="group"
          >
            <div className="glass-strong flex h-full flex-col overflow-hidden rounded-2xl border border-white/20 p-6 transition-all hover:border-accent/50 hover:shadow-2xl">
              {/* Header with type badge */}
              <div className="mb-4 flex items-start justify-between">
                <span className="glass rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
                  {article.type}
                </span>
                {article.year && (
                  <span className="text-xs font-medium text-muted">{article.year}</span>
                )}
              </div>

              {/* Title */}
              <h3 className="mb-3 font-serif text-xl font-bold leading-tight text-ink transition-colors group-hover:text-accent">
                {article.title}
              </h3>

              {/* Description */}
              <p className="mb-4 flex-1 text-sm leading-relaxed text-muted">
                {article.description}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-white/20 pt-4">
                <span className="text-xs font-medium text-muted">
                  {article.platform || article.publication}
                </span>
                <motion.a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 text-sm font-semibold text-accent transition-all hover:gap-3"
                >
                  Read <FaExternalLinkAlt className="h-3 w-3" />
                </motion.a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* View More button */}
      {!showAll && filteredArticles.length > 6 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <motion.button
            onClick={() => setShowAll(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-accent to-accent2 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:shadow-accent/50"
          >
            View All {filteredArticles.length} Articles
            <FaExternalLinkAlt className="h-4 w-4" />
          </motion.button>
        </motion.div>
      )}

      {/* Show less button */}
      {showAll && filteredArticles.length > 6 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-12 text-center"
        >
          <button
            onClick={() => {
              setShowAll(false);
              containerRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-sm font-medium text-accent hover:text-accent2 transition-colors"
          >
            Show Less ↑
          </button>
        </motion.div>
      )}

      {/* Empty state */}
      {filteredArticles.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-strong rounded-2xl p-12 text-center"
        >
          <FaSearch className="mx-auto mb-4 h-12 w-12 text-muted/30" />
          <p className="text-lg text-muted">No articles found matching your search.</p>
        </motion.div>
      )}
    </section>
  );
}
