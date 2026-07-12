"use client";

import { motion, useInView } from "framer-motion";
import { blogPosts } from "@/data/blogPosts";
import Link from "next/link";
import { FaPencilAlt, FaClock, FaArrowRight } from "react-icons/fa";
import { useRef } from "react";

export default function LatestBlogModern() {
  const latestPosts = blogPosts
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, 3);

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      id="blog"
      ref={containerRef}
      className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8"
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="mb-16 flex flex-col items-center justify-between gap-6 sm:flex-row"
      >
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-6 py-2">
            <FaPencilAlt className="h-3 w-3 text-accent" />
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              07 · Blog
            </span>
          </div>
          <h2 className="font-serif text-5xl font-bold tracking-tight text-ink sm:text-6xl">
            Latest <span className="gradient-text">Writing</span>
          </h2>
          <p className="mt-4 text-lg text-muted">
            Thoughts on frontend engineering and system design
          </p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/blog"
            className="glass-strong flex items-center gap-3 rounded-xl px-6 py-3 font-semibold text-ink transition-all hover:bg-white/30"
          >
            View All <FaArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Blog posts grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {latestPosts.map((post, index) => (
          <motion.article
            key={post.slug}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            whileHover={{ y: -8 }}
            className="group"
          >
            <Link href={`/blog/${post.slug}`}>
              <div className="glass-strong flex h-full flex-col overflow-hidden rounded-2xl border border-white/20 transition-all hover:border-accent/50 hover:shadow-2xl">
                {/* Header with gradient */}
                <div className="relative bg-gradient-to-br from-accent/10 via-transparent to-accent2/10 p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="glass rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
                      {post.tags[0]}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-medium text-muted">
                      <FaClock className="h-3 w-3" />
                      {post.readingTime}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-3 font-serif text-xl font-bold leading-tight text-ink transition-colors group-hover:text-accent">
                    {post.title}
                  </h3>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-muted line-clamp-3">
                    {post.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between border-t border-white/20 pt-4">
                    <time
                      dateTime={post.publishedAt}
                      className="text-xs font-medium text-muted"
                    >
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                    <span className="flex items-center gap-2 text-sm font-semibold text-accent transition-all group-hover:gap-3">
                      Read <FaArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>

                {/* Decorative element */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.05, 0.15, 0.05],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                  className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent blur-3xl"
                />
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
