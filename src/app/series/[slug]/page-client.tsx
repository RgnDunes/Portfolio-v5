"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaBookOpen,
  FaCheckCircle,
  FaHourglassHalf,
  FaArrowRight,
} from "react-icons/fa";
import { Series } from "@/data/series";

interface Props {
  series: Series;
}

export default function SeriesDetailClient({ series }: Props) {
  const publishedChapters = series.chapters.filter(
    (c) => c.status === "published"
  );

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

      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/series"
            className="glass-strong group inline-flex items-center gap-3 rounded-xl px-6 py-3 text-sm font-semibold text-ink transition-all hover:bg-white/30 hover:shadow-lg"
          >
            <FaArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            All Series
          </Link>
        </motion.div>

        {/* Cover */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="glass-strong relative mt-10 overflow-hidden rounded-3xl border border-white/20 p-10 sm:p-16"
        >
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-accent2/10 blur-3xl" />

          <div className="relative">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-5 py-2">
              <FaBookOpen className="h-3 w-3 text-accent" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                A Book by {series.author.name}
              </span>
            </div>

            <h1 className="font-serif text-5xl font-bold tracking-tight text-ink sm:text-6xl lg:text-7xl">
              {series.title.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="gradient-text">
                {series.title.split(" ").slice(-1)}
              </span>
            </h1>

            <p className="mt-6 max-w-3xl font-serif text-xl italic leading-relaxed text-muted sm:text-2xl">
              {series.subtitle}
            </p>

            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
              {series.tagline}
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <span className="glass rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider text-accent">
                {series.status === "in-progress"
                  ? "In Progress · Released Chapter-by-Chapter"
                  : "Complete"}
              </span>
              <span className="glass rounded-full px-4 py-2 text-xs font-medium text-muted">
                Started {new Date(series.startedAt).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="glass rounded-full px-4 py-2 text-xs font-medium text-muted">
                By {series.author.name} · {series.author.role}
              </span>
            </div>
          </div>
        </motion.section>

        {/* Preface: audience + prereqs + out-of-scope */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-strong rounded-2xl border border-white/20 p-8"
          >
            <h2 className="mb-4 font-serif text-2xl font-bold text-ink">
              Who this book is for
            </h2>
            <ul className="space-y-2">
              {series.audience.map((a) => (
                <li
                  key={a}
                  className="flex items-start gap-3 text-sm leading-relaxed text-muted"
                >
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                  {a}
                </li>
              ))}
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-strong rounded-2xl border border-white/20 p-8"
          >
            <h2 className="mb-4 font-serif text-2xl font-bold text-ink">
              Prerequisites
            </h2>
            <ul className="space-y-2">
              {series.prerequisites.map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-3 text-sm leading-relaxed text-muted"
                >
                  <FaCheckCircle className="mt-1 h-3.5 w-3.5 flex-shrink-0 text-accent2" />
                  {p}
                </li>
              ))}
            </ul>

            {series.outOfScope && series.outOfScope.length > 0 && (
              <>
                <h3 className="mt-8 mb-3 font-serif text-lg font-bold text-ink">
                  Not in scope
                </h3>
                <ul className="space-y-2">
                  {series.outOfScope.map((o) => (
                    <li
                      key={o}
                      className="flex items-start gap-3 text-sm leading-relaxed text-muted"
                    >
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-muted/60" />
                      {o}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </motion.section>
        </div>

        {/* Table of Contents */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16"
        >
          <div className="mb-8 flex items-end justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
                  Table of Contents
                </span>
              </div>
              <h2 className="font-serif text-4xl font-bold tracking-tight text-ink sm:text-5xl">
                The <span className="gradient-text">Chapters</span>
              </h2>
            </div>
            {publishedChapters.length > 0 && (
              <span className="glass hidden rounded-full px-4 py-2 text-xs font-medium text-muted sm:inline-block">
                {publishedChapters.length} of {series.chapters.length} live
              </span>
            )}
          </div>

          {series.parts && series.parts.length > 0 ? (
            <div className="space-y-8">
              {series.parts.map((part, partIndex) => {
                const partChapters = series.chapters.filter(
                  (c) => c.part === part.title
                );
                return (
                  <motion.div
                    key={part.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.55 + partIndex * 0.08,
                    }}
                    className="glass-strong rounded-2xl border border-white/20 p-8"
                  >
                    <div className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-accent">
                      {part.title}
                    </div>
                    {part.description && (
                      <p className="mb-6 max-w-3xl text-sm leading-relaxed text-muted">
                        {part.description}
                      </p>
                    )}

                    {partChapters.length === 0 ? (
                      <div className="flex items-center gap-3 rounded-xl border border-dashed border-muted/30 bg-white/20 px-6 py-5 text-sm text-muted">
                        <FaHourglassHalf className="h-4 w-4 text-accent" />
                        Chapters for this part are being drafted. They will appear
                        here as they ship.
                      </div>
                    ) : (
                      <ol className="space-y-2">
                        {partChapters.map((chapter) => (
                          <ChapterRow
                            key={chapter.slug}
                            seriesSlug={series.slug}
                            chapter={chapter}
                          />
                        ))}
                      </ol>
                    )}
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="glass-strong rounded-2xl border border-white/20 p-8">
              <ol className="space-y-2">
                {series.chapters.map((chapter) => (
                  <ChapterRow
                    key={chapter.slug}
                    seriesSlug={series.slug}
                    chapter={chapter}
                  />
                ))}
              </ol>
            </div>
          )}

          {series.chapters.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-10 rounded-2xl border border-dashed border-muted/30 bg-white/20 p-10 text-center"
            >
              <p className="font-serif text-lg italic text-muted">
                The first chapter is being written. Subscribe to the blog RSS or
                check back — this table of contents will start filling in
                shortly.
              </p>
            </motion.div>
          )}
        </motion.section>

        {/* Footer navigation */}
        <div className="mt-16 flex flex-col items-center gap-4 border-t border-white/20 pt-10 sm:flex-row sm:justify-between">
          <Link
            href="/blog"
            className="text-sm font-medium text-accent transition-colors hover:text-accent2"
          >
            ← Prefer standalone posts? Read the blog
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-muted transition-colors hover:text-ink"
          >
            Back to Home →
          </Link>
        </div>
      </div>
    </div>
  );
}

function ChapterRow({
  seriesSlug,
  chapter,
}: {
  seriesSlug: string;
  chapter: import("@/data/series").SeriesChapter;
}) {
  const isPublished = chapter.status === "published";
  const body = (
    <div
      className={`group flex items-center justify-between gap-4 rounded-xl border border-transparent px-4 py-4 transition-all ${
        isPublished
          ? "hover:border-accent/30 hover:bg-white/30"
          : "opacity-70"
      }`}
    >
      <div className="flex min-w-0 items-start gap-4">
        <span className="font-mono text-xs font-semibold text-accent">
          Ch {String(chapter.number).padStart(2, "0")}
        </span>
        <div className="min-w-0">
          <div className="font-serif text-lg font-bold text-ink transition-colors group-hover:text-accent">
            {chapter.title}
          </div>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            {chapter.description}
          </p>
        </div>
      </div>
      <div className="flex flex-shrink-0 items-center gap-3">
        {chapter.readingTime && (
          <span className="hidden text-xs font-medium text-muted sm:inline">
            {chapter.readingTime}
          </span>
        )}
        {isPublished ? (
          <span className="flex items-center gap-2 text-sm font-semibold text-accent">
            Read <FaArrowRight className="h-3 w-3" />
          </span>
        ) : (
          <span className="glass rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted">
            Coming soon
          </span>
        )}
      </div>
    </div>
  );

  if (!isPublished) {
    return <li>{body}</li>;
  }
  return (
    <li>
      <Link href={`/series/${seriesSlug}/${chapter.slug}`}>{body}</Link>
    </li>
  );
}
