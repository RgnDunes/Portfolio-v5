"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { FaTag, FaTimes, FaSearch } from "react-icons/fa";

interface TagSelectorProps {
  allTags: string[];
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
}

export default function TagSelector({ allTags, selectedTag, onSelectTag }: TagSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTags = useMemo(() => {
    if (!searchQuery) return allTags;
    return allTags.filter(tag =>
      tag.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allTags, searchQuery]);

  const topTags = allTags.slice(0, 12);
  const hasMoreTags = allTags.length > 12;

  return (
    <>
      {/* Main tag filters - show top tags */}
      <div className="flex flex-wrap gap-2.5">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onSelectTag(null)}
          className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
            selectedTag === null
              ? "bg-gradient-to-r from-accent via-[#d55a3f] to-accent2 text-white shadow-lg"
              : "glass bg-white/60 text-ink hover:bg-white/80"
          }`}
        >
          All Articles
        </motion.button>

        {topTags.map((tag, index) => (
          <motion.button
            key={tag}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: 0.02 * index }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelectTag(selectedTag === tag ? null : tag)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
              selectedTag === tag
                ? "bg-accent text-white shadow-md"
                : "glass bg-white/60 text-ink/90 hover:bg-white/80"
            }`}
          >
            <FaTag className="h-3 w-3" />
            {tag}
          </motion.button>
        ))}

        {/* View all tags button */}
        {hasMoreTags && (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 rounded-xl border-2 border-dashed border-accent/30 bg-white/40 px-4 py-2.5 text-sm font-medium text-accent transition-all hover:border-accent/60 hover:bg-white/60"
          >
            <FaSearch className="h-3 w-3" />
            Browse All {allTags.length} Tags
          </motion.button>
        )}
      </div>

      {/* Modal for all tags */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 max-h-[85vh] w-full max-w-3xl overflow-hidden rounded-3xl bg-white p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-ink">
                    Browse All Tags
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    {allTags.length} topics available
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted/10 text-muted transition-all hover:bg-accent/10 hover:text-accent"
                >
                  <FaTimes className="h-5 w-5" />
                </button>
              </div>

              {/* Search */}
              <div className="relative mb-6">
                <FaSearch className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted/50" />
                <input
                  type="text"
                  placeholder="Search tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-muted/20 bg-muted/5 px-12 py-3 text-sm text-ink outline-none transition-all focus:border-accent/50 focus:bg-white"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-accent"
                  >
                    <FaTimes className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Tags grid */}
              <div className="max-h-96 overflow-y-auto">
                {filteredTags.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {filteredTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => {
                          onSelectTag(tag);
                          setIsOpen(false);
                          setSearchQuery("");
                        }}
                        className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                          selectedTag === tag
                            ? "bg-accent text-white"
                            : "bg-muted/10 text-ink hover:bg-accent/10 hover:text-accent"
                        }`}
                      >
                        <FaTag className="h-3 w-3" />
                        {tag}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center text-muted">
                    No tags found matching "{searchQuery}"
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
