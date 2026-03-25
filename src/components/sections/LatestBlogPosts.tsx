"use client";

import { motion } from "framer-motion";
import { blogPosts } from "@/data/blogPosts";
import Link from "next/link";

export default function LatestBlogPosts() {
  const latestPosts = blogPosts
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, 3);

  return (
    <section
      id="blog"
      className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-[#0f0e0c] sm:text-4xl">
              Latest Writing
            </h2>
            <p className="mt-2 text-base text-muted">
              Thoughts on frontend engineering and system design
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden items-center gap-2 font-medium text-accent transition-colors hover:text-[#a03b25] sm:inline-flex"
          >
            View all articles →
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {latestPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{
                y: -8,
                boxShadow: "0 20px 50px rgba(0,0,0,0.12)",
                borderColor: "#c84b31"
              }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
                ease: "easeOut"
              }}
              className="group relative overflow-hidden rounded-lg border-2 border-[#d4cdc0] bg-white p-6"
            >
              <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
                {post.tags[0]}
              </div>
              <h3 className="mb-3 font-serif text-xl font-bold leading-tight text-[#0f0e0c]">
                <Link
                  href={`/blog/${post.slug}`}
                  className="transition-colors hover:text-accent"
                >
                  {post.title}
                </Link>
              </h3>
              <p className="line-clamp-3 text-sm leading-relaxed text-muted">
                {post.description}
              </p>
              <div className="mt-4 flex items-center gap-3 text-xs text-muted">
                <span>{post.readingTime}</span>
                <span className="h-1 w-1 rounded-full bg-muted" />
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-medium text-accent transition-colors hover:text-[#a03b25]"
          >
            View all articles →
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
