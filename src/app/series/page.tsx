import { Metadata } from "next";
import { seriesList } from "@/data/series";
import SeriesIndexClient from "./page-client";

export const metadata: Metadata = {
  title: "Series - Divyansh Singh",
  description:
    "Long-form book-style series on frontend infrastructure, platform engineering and modern web systems. Each series is a chapter-by-chapter guide, released in the open.",
};

export default function SeriesIndexPage() {
  return <SeriesIndexClient series={seriesList} />;
}
