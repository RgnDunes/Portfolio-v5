"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowLeft, FaBookOpen, FaArrowRight } from "react-icons/fa";
import { Series } from "@/data/series";

interface Props {
  series: Series[];
}

export default function SeriesIndexClient({ series }: Props) {
  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#f5f0e8] via-[#dad4cc] to-[#d5cfc7]">
        <div className="absolute inset-0 opacity-20">
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -left-20 top-20 h-96 w-96 rounded-full bg-gradient-to-br from-accent/20 to-transparent blur-3xl"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], rotate: [90, 0, 90] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -right-20 bottom-20 h-96 w-96 rounded-full bg-gradient-to-br from-accent2/20 to-transparent blur-3xl"
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/"
            className="glass-strong group inline-flex items-center gap-3 rounded-xl px-6 py-3 text-sm font-semibold text-ink transition-all hover:bg-white/30 hover:shadow-lg"
          >
            <FaArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 max-w-4xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-6 py-2">
            <FaBookOpen className="h-3 w-3 text-accent" />
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              Book Series
            </span>
          </div>

          <h1 className="font-serif text-6xl font-bold tracking-tight text-ink sm:text-7xl lg:text-8xl">
            Long-form <span className="gradient-text">Series</span>
          </h1>

          <p className="mt-8 text-xl leading-relaxed text-muted lg:text-2xl">
            Book-style, chapter-by-chapter guides written in the open. Unlike the
            standalone posts on the blog, each series builds a full mental model
            of a topic — read start to finish, or jump to the chapter you need.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {series.map((s, index) => {
            const publishedChapters = s.chapters.filter(
              (c) => c.status === "published"
            ).length;
            return (
              <motion.article
                key={s.slug}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Link href={`/series/${s.slug}`}>
                  <div className="glass-strong relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/20 transition-all hover:border-accent/50 hover:shadow-2xl">
                    <div className="relative bg-gradient-to-br from-accent/15 via-transparent to-accent2/15 p-8">
                      <div className="mb-4 flex items-center gap-3">
                        <span className="glass rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
                          {s.status === "in-progress"
                            ? "In Progress"
                            : "Complete"}
                        </span>
                        <span className="text-xs font-medium text-muted">
                          {publishedChapters} chapter
                          {publishedChapters === 1 ? "" : "s"} live
                        </span>
                      </div>
                      <h2 className="font-serif text-3xl font-bold leading-tight text-ink transition-colors group-hover:text-accent">
                        {s.title}
                      </h2>
                      <p className="mt-3 font-serif text-lg italic text-muted">
                        {s.subtitle}
                      </p>
                    </div>

                    <div className="flex flex-1 flex-col p-8">
                      <p className="text-base leading-relaxed text-muted">
                        {s.description}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {s.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-lg bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-8 flex items-center justify-between border-t border-white/20 pt-6">
                        <span className="text-sm font-medium text-muted">
                          By {s.author.name}
                        </span>
                        <span className="flex items-center gap-2 text-sm font-semibold text-accent transition-all group-hover:gap-3">
                          Open Series <FaArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
