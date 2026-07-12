import { blogPosts } from "@/data/blogPosts";
import { Metadata } from "next";
import BlogPageClient from "./page-client";

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

  return <BlogPageClient posts={sortedPosts} />;
}
