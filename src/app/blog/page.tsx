import { blogPosts } from "@/data/blogPosts";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Divyansh Singh",
  description:
    "Articles on frontend engineering, system design, and web development from a Senior Frontend Engineer at Rippling.",
};

export default function BlogPage() {
  const sortedPosts = blogPosts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <div className="mx-auto min-h-screen max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors mb-8"
        >
          ← Back to Home
        </Link>
        <h1 className="font-serif text-5xl font-black tracking-tight text-gray-800 sm:text-6xl">
          Engineering Diaries
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-gray-600">
          Thoughts on frontend architecture, system design, and building better
          web experiences. Written from the trenches of building international
          payment systems and enterprise software.
        </p>
      </div>

      {/* Blog Posts Grid */}
      <div className="mt-16 space-y-12">
        {sortedPosts.map((post, index) => (
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
                    <span className="group-hover:text-orange-500 transition-colors">
                      Read article →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {/* Empty State (if no posts) */}
      {sortedPosts.length === 0 && (
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600">
            No blog posts yet. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}
