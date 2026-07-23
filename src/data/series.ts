export interface SeriesChapter {
  slug: string;
  part?: string;
  number: number;
  title: string;
  description: string;
  readingTime?: string;
  publishedAt?: string;
  content?: string;
  contentPath?: string;
  contentType?: "markdown" | "html";
  status: "published" | "coming-soon";
}

export interface SeriesPart {
  title: string;
  description?: string;
}

export interface Series {
  slug: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  author: {
    name: string;
    role: string;
  };
  audience: string[];
  prerequisites: string[];
  outOfScope?: string[];
  tags: string[];
  status: "in-progress" | "completed";
  startedAt: string;
  parts?: SeriesPart[];
  chapters: SeriesChapter[];
}

export const seriesList: Series[] = [
  {
    slug: "frontend-infrastructure",
    title: "Frontend Infrastructure",
    subtitle: "Building, Scaling and Operating Modern Frontend Systems",
    tagline:
      "A Complete Guide to CI/CD, Build Systems, Monorepos, Testing, Deployment, Performance, Observability, Security and Platform Engineering for Frontend Teams",
    description:
      "An open, chapter-by-chapter book on the infrastructure layer that sits around modern frontend applications. Each chapter is a standalone post — read them in order or dip in wherever you need.",
    author: {
      name: "Divyansh Singh",
      role: "Senior Software Engineer",
    },
    audience: [
      "Frontend Engineers wanting to move into Frontend Infrastructure",
      "Senior Frontend Engineers",
      "Staff Engineers",
      "Platform Engineers",
      "Developer Experience Engineers",
      "Infrastructure Engineers wanting to understand frontend",
      "Engineering Managers",
      "Tech Leads",
    ],
    prerequisites: [
      "You are comfortable with HTML, CSS and JavaScript",
      "You have shipped something in React (or a similar framework)",
    ],
    outOfScope: [
      "This book will not teach JavaScript",
      "This book will not teach React",
      "This book will not cover basic frontend concepts — everything focuses on infrastructure around frontend",
    ],
    tags: [
      "Frontend Infrastructure",
      "Build Systems",
      "CI/CD",
      "Monorepos",
      "Platform Engineering",
    ],
    status: "in-progress",
    startedAt: "2026-07-24",
    parts: [
      {
        title: "Part I · Foundations",
        description:
          "The language, tooling and mental models that everything else builds on.",
      },
      {
        title: "Part II · Build Systems & Delivery",
        description:
          "Bundlers, module systems, monorepos, caching, CI/CD pipelines and how frontend code actually reaches production.",
      },
      {
        title: "Part III · Runtime, Performance & Observability",
        description:
          "What happens after deploy — performance budgets, real user monitoring, error reporting and the boring middle where users live.",
      },
      {
        title: "Part IV · Security, Reliability & Platform",
        description:
          "Supply chain, isolation, rollouts, feature flags, and the platform layer that lets one team support hundreds of engineers.",
      },
    ],
    chapters: [],
  },
];

export function getSeriesBySlug(slug: string): Series | undefined {
  return seriesList.find((s) => s.slug === slug);
}

export function getChapter(
  seriesSlug: string,
  chapterSlug: string
): { series: Series; chapter: SeriesChapter } | undefined {
  const series = getSeriesBySlug(seriesSlug);
  if (!series) return undefined;
  const chapter = series.chapters.find((c) => c.slug === chapterSlug);
  if (!chapter) return undefined;
  return { series, chapter };
}
