"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { BlogPost } from "@/data/blogPosts";

interface BlogListProps {
  posts: BlogPost[];
}

export default function BlogList({ posts }: BlogListProps) {
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
      <div className="mt-12 space-y-6">
        {/* Search */}
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white/50 px-4 py-3 pl-10 text-sm text-gray-800 placeholder-gray-400 outline-none transition-colors focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
          />
          <svg
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Tag Filters */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTag(null)}
            className={`rounded-full px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors ${
              selectedTag === null
                ? "bg-gray-800 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() =>
                setSelectedTag(selectedTag === tag ? null : tag)
              }
              className={`rounded-full px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors ${
                selectedTag === tag
                  ? "bg-orange-500 text-white"
                  : "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Result count */}
        {(selectedTag || searchQuery) && (
          <p className="text-sm text-gray-500">
            {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""} found
            {selectedTag && (
              <>
                {" "}in <span className="font-medium text-orange-500">{selectedTag}</span>
              </>
            )}
            {searchQuery && (
              <>
                {" "}for &ldquo;<span className="font-medium">{searchQuery}</span>&rdquo;
              </>
            )}
          </p>
        )}
      </div>

      {/* Blog Posts */}
      <div className="mt-10 space-y-12">
        {filteredPosts.map((post) => (
          <article
            key={post.slug}
            className="group border-b border-gray-200 pb-12 last:border-0"
          >
            <Link href={`/blog/${post.slug}`}>
              <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
                {/* Metadata Column */}
                <div className="flex flex-col gap-2">
                  <time
                    dateTime={post.publishedAt}
                    className="font-mono text-xs uppercase tracking-widest text-gray-600"
                  >
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-orange-500/10 px-3 py-1 font-mono text-xs uppercase tracking-wider text-orange-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content Column */}
                <div>
                  <h2 className="font-serif text-3xl font-bold leading-tight text-gray-800 transition-colors group-hover:text-orange-500">
                    {post.title}
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-gray-600">
                    {post.description}
                  </p>
                  <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
                    <span>{post.readingTime}</span>
                    <span className="h-1 w-1 rounded-full bg-muted" />
                    <span className="transition-colors group-hover:text-orange-500">
                      Read article →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600">
            No articles match your filters.
          </p>
          <button
            onClick={() => {
              setSelectedTag(null);
              setSearchQuery("");
            }}
            className="mt-4 text-sm text-orange-500 hover:text-orange-600 transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}
