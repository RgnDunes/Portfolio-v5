import { blogPosts } from "@/data/blogPosts";
import { notFound } from "next/navigation";
import Link from "next/link";
import MarkdownRenderer from "@/components/blog/MarkdownRenderer";
import ViewCounter from "@/components/ViewCounter";
import { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} - Divyansh Singh`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Masthead */}
      <div className="border-b border-ink bg-ink py-3 text-center font-mono text-xs uppercase tracking-[0.18em] text-paper">
        Engineering Diaries · {post.tags.join(" · ")}
      </div>

      {/* Hero Section */}
      <article className="mx-auto max-w-[860px] px-8 py-16">
        <header className="border-b-2 border-ink pb-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors mb-6"
          >
            ← Back to Blog
          </Link>

          <div className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-orange-500">
            {post.tags[0]}
          </div>

          <h1 className="font-serif text-5xl font-black leading-[1.08] tracking-tight text-gray-800">
            {post.title}
          </h1>

          <p className="mt-6 max-w-[640px] text-lg font-light leading-relaxed text-gray-600">
            {post.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-gray-200 pt-5 font-mono text-xs uppercase tracking-[0.12em] text-gray-600">
            <span>By {post.author.name}</span>
            <span className="h-1 w-1 rounded-full bg-rule" />
            <span>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className="h-1 w-1 rounded-full bg-rule" />
            <span>{post.readingTime}</span>
            <span className="h-1 w-1 rounded-full bg-rule" />
            <ViewCounter pageId={`blog-${post.slug}`} showLabel={false} />
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg mt-12 max-w-none">
          <MarkdownRenderer
            content={post.content}
            contentPath={post.contentPath}
            contentType={post.contentType || "markdown"}
          />
        </div>

        {/* Footer Ornament */}
        <div className="mt-16 text-center text-2xl tracking-[0.5em] text-gray-600">
          · · ·
        </div>

        {/* Tags */}
        <div className="mt-8 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-sm bg-rule px-3 py-1 font-mono text-xs uppercase tracking-wider text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Back to Blog */}
        <div className="mt-12 border-t border-gray-200 pt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-medium text-orange-500 hover:text-orange-500/80 transition-colors"
          >
            ← Read more articles
          </Link>
        </div>
      </article>
    </div>
  );
}
