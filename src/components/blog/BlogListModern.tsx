"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { BlogPost } from "@/data/blogPosts";
import { motion } from "framer-motion";
import { FaSearch, FaClock, FaTag } from "react-icons/fa";

interface BlogListProps {
  posts: BlogPost[];
}

export default function BlogListModern({ posts }: BlogListProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)));
    return Array.from(tagSet).sort();
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesTag = !selectedTag || post.tags.includes(selectedTag);
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query));
      return matchesTag && matchesSearch;
    });
  }, [posts, selectedTag, searchQuery]);

  return (
    <>
      {/* Search + Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-12 space-y-6"
      >
        {/* Search */}
        <div className="relative max-w-xl">
          <FaSearch className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            placeholder="Search articles by title, description, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="glass-strong w-full rounded-2xl border border-white/20 px-12 py-4 text-base text-ink placeholder-muted outline-none transition-all focus:border-accent/50 focus:shadow-lg"
          />
        </div>

        {/* Tag Filters */}
        <div className="flex flex-wrap gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedTag(null)}
            className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
              selectedTag === null
                ? "bg-gradient-to-r from-accent to-accent2 text-white shadow-lg"
                : "glass-strong text-ink hover:bg-white/30"
            }`}
          >
            All Articles
          </motion.button>
          {allTags.map((tag, index) => (
            <motion.button
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
                selectedTag === tag
                  ? "bg-accent text-white shadow-lg"
                  : "glass-strong text-ink hover:bg-white/30"
              }`}
            >
              <FaTag className="h-3 w-3" />
              {tag}
            </motion.button>
          ))}
        </div>

        {/* Result count */}
        {(selectedTag || searchQuery) && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-lg px-4 py-2 text-sm text-muted"
          >
            Found <span className="font-bold text-accent">{filteredPosts.length}</span>{" "}
            article{filteredPosts.length !== 1 ? "s" : ""}
            {selectedTag && (
              <>
                {" "}
                tagged with{" "}
                <span className="font-semibold text-accent">{selectedTag}</span>
              </>
            )}
            {searchQuery && (
              <>
                {" "}
                matching &ldquo;
                <span className="font-semibold text-ink">{searchQuery}</span>&rdquo;
              </>
            )}
          </motion.p>
        )}
      </motion.div>

      {/* Blog Posts */}
      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post, index) => (
          <motion.article
            key={post.slug}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="group"
          >
            <Link href={`/blog/${post.slug}`}>
              <div className="glass-strong h-full overflow-hidden rounded-2xl border border-white/20 transition-all hover:border-accent/50 hover:shadow-2xl">
                {/* Card Header */}
                <div className="relative overflow-hidden bg-gradient-to-br from-accent/10 via-transparent to-accent2/10 p-6">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-accent to-accent2 opacity-0 transition-opacity group-hover:opacity-10"
                  />
                  <div className="relative z-10">
                    <time
                      dateTime={post.publishedAt}
                      className="inline-flex items-center gap-2 rounded-full bg-white/50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent"
                    >
                      <FaClock className="h-3 w-3" />
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h2 className="font-serif text-2xl font-bold leading-tight text-ink transition-colors group-hover:text-accent">
                    {post.title}
                  </h2>

                  <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted">
                    {post.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                      >
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="rounded-lg bg-muted/10 px-3 py-1 text-xs font-medium text-muted">
                        +{post.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="mt-6 flex items-center justify-between border-t border-white/20 pt-4">
                    <span className="text-sm font-medium text-muted">
                      {post.readingTime}
                    </span>
                    <motion.span
                      className="flex items-center gap-2 text-sm font-semibold text-accent transition-all group-hover:gap-3"
                      whileHover={{ x: 5 }}
                    >
                      Read More →
                    </motion.span>
                  </div>
                </div>

                {/* Decorative corner */}
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-accent/5 blur-3xl transition-all group-hover:bg-accent/10" />
              </div>
            </Link>
          </motion.article>
        ))}
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="glass-strong mt-16 rounded-2xl p-12 text-center"
        >
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
            <FaSearch className="h-8 w-8 text-accent" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-ink">
            No Articles Found
          </h3>
          <p className="mt-2 text-muted">
            No articles match your current filters. Try adjusting your search.
          </p>
          <motion.button
            onClick={() => {
              setSelectedTag(null);
              setSearchQuery("");
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 rounded-xl bg-gradient-to-r from-accent to-accent2 px-8 py-3 font-semibold text-white shadow-lg transition-all hover:shadow-accent/50"
          >
            Clear All Filters
          </motion.button>
        </motion.div>
      )}
    </>
  );
}
