import { Metadata } from "next";
import { notFound } from "next/navigation";
import { seriesList, getSeriesBySlug } from "@/data/series";
import SeriesDetailClient from "./page-client";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return seriesList.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getSeriesBySlug(params.slug);
  if (!s) return { title: "Series Not Found" };
  return {
    title: `${s.title} - ${s.subtitle}`,
    description: s.tagline,
    openGraph: {
      title: s.title,
      description: s.tagline,
      type: "book",
      authors: [s.author.name],
    },
  };
}

export default function SeriesDetailPage({ params }: Props) {
  const series = getSeriesBySlug(params.slug);
  if (!series) notFound();
  return <SeriesDetailClient series={series} />;
}
