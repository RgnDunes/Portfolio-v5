"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { FaBookOpen, FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { seriesList } from "@/data/series";

export default function SeriesModern() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const featured = seriesList[0];
  if (!featured) return null;

  const publishedCount = featured.chapters.filter(
    (c) => c.status === "published"
  ).length;

  return (
    <section
      id="series"
      ref={containerRef}
      className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="mb-16 flex flex-col items-center justify-between gap-6 sm:flex-row"
      >
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-6 py-2">
            <FaBookOpen className="h-3 w-3 text-accent" />
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              08 · Series
            </span>
          </div>
          <h2 className="font-serif text-5xl font-bold tracking-tight text-ink sm:text-6xl">
            The <span className="gradient-text">Bookshelf</span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Standalone posts live on the blog. Longer, book-style deep dives —
            written chapter-by-chapter — live here.
          </p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/series"
            className="glass-strong flex items-center gap-3 rounded-xl px-6 py-3 font-semibold text-ink transition-all hover:bg-white/30"
          >
            All Series <FaArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </motion.div>

      <motion.article
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.15 }}
        whileHover={{ y: -6 }}
        className="group"
      >
        <Link href={`/series/${featured.slug}`}>
          <div className="glass-strong relative grid overflow-hidden rounded-3xl border border-white/20 transition-all hover:border-accent/50 hover:shadow-2xl lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
            {/* Book cover panel */}
            <div className="relative flex min-h-[380px] flex-col justify-between overflow-hidden bg-gradient-to-br from-accent/15 via-transparent to-accent2/20 p-10 sm:p-12">
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.1, 0.25, 0.1],
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent blur-3xl"
              />
              <motion.div
                animate={{
                  scale: [1.1, 1, 1.1],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{ duration: 10, repeat: Infinity, delay: 1 }}
                className="absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-accent2 blur-3xl"
              />

              <div className="relative">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-white/40 px-3 py-1">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
                    A Book · In Progress
                  </span>
                </div>
                <div className="font-mono text-xs uppercase tracking-[0.25em] text-muted">
                  {featured.author.name}
                </div>
              </div>

              <div className="relative">
                <h3 className="font-serif text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl">
                  {featured.title}
                </h3>
                <p className="mt-4 font-serif text-base italic leading-snug text-muted sm:text-lg">
                  {featured.subtitle}
                </p>
              </div>

              <div className="relative flex items-center gap-3">
                <span className="glass rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent">
                  {publishedCount === 0
                    ? "First chapter dropping soon"
                    : `${publishedCount} chapter${publishedCount === 1 ? "" : "s"} live`}
                </span>
              </div>
            </div>

            {/* Details panel */}
            <div className="flex flex-col justify-between p-10 sm:p-12">
              <div>
                <p className="text-base leading-relaxed text-muted sm:text-lg">
                  {featured.tagline}
                </p>

                <div className="mt-8 grid gap-3">
                  {featured.audience.slice(0, 4).map((a) => (
                    <div
                      key={a}
                      className="flex items-start gap-3 text-sm text-muted"
                    >
                      <FaCheckCircle className="mt-1 h-3.5 w-3.5 flex-shrink-0 text-accent2" />
                      <span>{a}</span>
                    </div>
                  ))}
                  {featured.audience.length > 4 && (
                    <div className="pl-6 text-xs font-medium text-muted/70">
                      + {featured.audience.length - 4} more
                    </div>
                  )}
                </div>

                <div className="mt-8 flex flex-wrap gap-2">
                  {featured.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-10 flex items-center justify-between border-t border-white/20 pt-6">
                <span className="text-sm font-medium text-muted">
                  Cover · Table of Contents · Chapters
                </span>
                <span className="flex items-center gap-2 text-sm font-semibold text-accent transition-all group-hover:gap-3">
                  Open the book <FaArrowRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          </div>
        </Link>
      </motion.article>
    </section>
  );
}
