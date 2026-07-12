"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import BlogListModern from "@/components/blog/BlogListModern";
import { BlogPost } from "@/data/blogPosts";

interface BlogPageClientProps {
  posts: BlogPost[];
}

export default function BlogPageClient({ posts }: BlogPageClientProps) {
  return (
    <div className="relative min-h-screen">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#f5f0e8] via-[#dad4cc] to-[#d5cfc7]">
        <div className="absolute inset-0 opacity-20">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -left-20 top-20 h-96 w-96 rounded-full bg-gradient-to-br from-accent/20 to-transparent blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -right-20 bottom-20 h-96 w-96 rounded-full bg-gradient-to-br from-accent2/20 to-transparent blur-3xl"
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
        {/* Back Button */}
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

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 max-w-4xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-6 py-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              Engineering Blog
            </span>
          </div>

          <h1 className="font-serif text-6xl font-bold tracking-tight text-ink sm:text-7xl lg:text-8xl">
            Engineering{" "}
            <span className="gradient-text">Diaries</span>
          </h1>

          <p className="mt-8 text-xl leading-relaxed text-muted lg:text-2xl">
            Thoughts on frontend architecture, system design, and building better
            web experiences. Written from the trenches of building international
            payment systems and enterprise software.
          </p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-6"
          >
            <div className="glass-strong rounded-xl px-6 py-3">
              <div className="text-2xl font-bold text-accent">
                {posts.length}
              </div>
              <div className="text-sm text-muted">Articles</div>
            </div>
            <div className="glass-strong rounded-xl px-6 py-3">
              <div className="text-2xl font-bold text-accent2">
                {new Set(posts.flatMap((p) => p.tags)).size}
              </div>
              <div className="text-sm text-muted">Topics</div>
            </div>
            <div className="glass-strong rounded-xl px-6 py-3">
              <div className="text-2xl font-bold text-accent">
                {posts.reduce(
                  (sum, post) => {
                    const time = parseInt(post.readingTime.replace(/\D/g, ''));
                    return sum + (isNaN(time) ? 0 : time);
                  },
                  0
                )}
                min
              </div>
              <div className="text-sm text-muted">Total Reading</div>
            </div>
          </motion.div>
        </motion.div>

        <BlogListModern posts={posts} />
      </div>
    </div>
  );
}
