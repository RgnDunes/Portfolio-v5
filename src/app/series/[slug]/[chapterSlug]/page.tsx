import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { seriesList, getChapter } from "@/data/series";
import MarkdownRenderer from "@/components/blog/MarkdownRenderer";
import ViewCounter from "@/components/ViewCounter";

interface Props {
  params: { slug: string; chapterSlug: string };
}

export async function generateStaticParams() {
  return seriesList.flatMap((s) =>
    s.chapters
      .filter((c) => c.status === "published")
      .map((c) => ({ slug: s.slug, chapterSlug: c.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const found = getChapter(params.slug, params.chapterSlug);
  if (!found) return { title: "Chapter Not Found" };
  const { series, chapter } = found;
  return {
    title: `${chapter.title} · ${series.title}`,
    description: chapter.description,
    openGraph: {
      title: chapter.title,
      description: chapter.description,
      type: "article",
      authors: [series.author.name],
    },
  };
}

export default function ChapterPage({ params }: Props) {
  const found = getChapter(params.slug, params.chapterSlug);
  if (!found || found.chapter.status !== "published") notFound();
  const { series, chapter } = found;

  const publishedChapters = series.chapters.filter(
    (c) => c.status === "published"
  );
  const currentIndex = publishedChapters.findIndex(
    (c) => c.slug === chapter.slug
  );
  const prev = currentIndex > 0 ? publishedChapters[currentIndex - 1] : null;
  const next =
    currentIndex >= 0 && currentIndex < publishedChapters.length - 1
      ? publishedChapters[currentIndex + 1]
      : null;

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-ink bg-ink py-3 text-center font-mono text-xs uppercase tracking-[0.18em] text-paper">
        {series.title} · Chapter {chapter.number}
      </div>

      <article className="mx-auto max-w-[860px] px-8 py-16">
        <div className="mb-8 flex items-center justify-between">
          <Link
            href={`/series/${series.slug}`}
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            ← Back to {series.title}
          </Link>
          <Link
            href="/series"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            All Series
          </Link>
        </div>

        <div className="mb-6 font-mono text-xs uppercase tracking-[0.18em] text-accent">
          Chapter {chapter.number}
          {chapter.part ? ` · ${chapter.part}` : ""}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4 border-b border-gray-200 pb-6 font-mono text-xs uppercase tracking-[0.12em] text-gray-600">
          <span>By {series.author.name}</span>
          {chapter.publishedAt && (
            <>
              <span className="h-1 w-1 rounded-full bg-rule" />
              <span>
                {new Date(chapter.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </>
          )}
          {chapter.readingTime && (
            <>
              <span className="h-1 w-1 rounded-full bg-rule" />
              <span>{chapter.readingTime}</span>
            </>
          )}
          <span className="h-1 w-1 rounded-full bg-rule" />
          <ViewCounter
            pageId={`series-${series.slug}-${chapter.slug}`}
            showLabel={false}
          />
        </div>

        <div className="prose prose-lg mt-12 max-w-none">
          <MarkdownRenderer
            content={chapter.content}
            contentPath={chapter.contentPath}
            contentType={chapter.contentType || "markdown"}
          />
        </div>

        <div className="mt-16 text-center text-2xl tracking-[0.5em] text-gray-600">
          · · ·
        </div>

        <nav className="mt-12 grid gap-4 border-t border-gray-200 pt-8 sm:grid-cols-2">
          {prev ? (
            <Link
              href={`/series/${series.slug}/${prev.slug}`}
              className="group rounded-xl border border-gray-200 p-5 transition-all hover:border-accent hover:bg-orange-50"
            >
              <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-gray-500">
                ← Previous Chapter
              </div>
              <div className="font-serif text-base font-bold text-ink group-hover:text-accent">
                {prev.title}
              </div>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/series/${series.slug}/${next.slug}`}
              className="group rounded-xl border border-gray-200 p-5 text-right transition-all hover:border-accent hover:bg-orange-50"
            >
              <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-gray-500">
                Next Chapter →
              </div>
              <div className="font-serif text-base font-bold text-ink group-hover:text-accent">
                {next.title}
              </div>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </article>
    </div>
  );
}
