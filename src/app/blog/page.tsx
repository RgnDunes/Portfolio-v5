import { blogPosts } from "@/data/blogPosts";
import Link from "next/link";
import { Metadata } from "next";
import BlogList from "@/components/blog/BlogList";

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

      <BlogList posts={sortedPosts} />
    </div>
  );
}
