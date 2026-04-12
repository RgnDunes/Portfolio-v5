export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content?: string; // Markdown or HTML content (inline)
  contentPath?: string; // Path to HTML file in /public/blog/ directory
  contentType?: "markdown" | "html"; // Default: markdown
  publishedAt: string; // ISO date
  tags: string[];
  readingTime: string;
  featured?: boolean;
  author: {
    name: string;
    image?: string;
  };
  coverImage?: string;
}

// Your blog posts go here - add new posts to this array
export const blogPosts: BlogPost[] = [
  {
    slug: "css-has-changed-everything",
    title: "CSS :has() Changed Everything: The Selector That Eliminated JavaScript From My Stylesheets",
    description: "A deep dive into CSS :has() - the parent selector that finally arrived, and how it fundamentally changes the relationship between CSS and JavaScript in modern web development.",
    contentPath: "/blog/css-has-changed-everything_article.html",
    publishedAt: "2026-04-13",
    tags: ["CSS", "Web Development", "Frontend"],
    readingTime: "~18 min read",
    author: {
      name: "Divyansh Singh",
    },
  },
  {
    slug: "fetch-api-streams-cancellation-features",
    title: "The Fetch API Is Not What You Think: Streams, Cancellation, and the Features Nobody Uses",
    description: "Most developers treat fetch() as a glorified XMLHttpRequest. This deep dive explores the powerful features hiding in plain sight - streaming, cancellation, caching, and the patterns that separate hobby projects from production-grade code.",
    contentPath: "/blog/fetch-api-streams-cancellation-features_article.html",
    publishedAt: "2026-04-05",
    tags: ["JavaScript", "Web APIs", "Fetch API"],
    readingTime: "~20 min read",
    author: {
      name: "Divyansh Singh",
    },
  },
  {
    slug: "web-workers-are-not-threads",
    title: "Web Workers Are Not Threads: What JavaScript Developers Get Wrong About Browser Parallelism",
    description: "Most JavaScript developers think Web Workers give them multithreading. They don't. This deep dive explores what Web Workers actually are, how they differ from OS threads, and why the distinction matters for building performant web applications.",
    contentPath: "/blog/web-workers-are-not-threads_article.html",
    publishedAt: "2026-04-05",
    tags: ["JavaScript", "Web Workers", "Concurrency"],
    readingTime: "18 min read",
    author: {
      name: "Divyansh Singh",
    },
  },
  {
    slug: "ai-boardgame-testing",
    title: "I Let Claude & GPT-4 Play My Board Game Until It Was Bug-Free",
    description: "How I used two competing AI models as adversarial test players to stress-test a web version of Monopoly Deal and Scotland Yard — and what the simulation taught me about edge cases no human tester would ever find.",
    contentPath: "/blog/ai_boardgame_testing_article.html",
    publishedAt: "2026-03-28",
    tags: ["AI", "Testing", "Games"],
    readingTime: "18 min read",
    author: { name: "Divyansh Singh" },
  },
  {
    slug: "ai-code-review",
    title: "AI Code Review Is Making Your Codebase Harder to Maintain",
    description: "Everyone is merging faster, the PR backlog is clean, and the dashboards look very good. So why does opening a module from eight months ago feel like reading someone else's fever dream?",
    contentPath: "/blog/ai_code_review_article.html",
    publishedAt: "2026-04-08",
    tags: ["AI", "Code Review", "Software Engineering"],
    readingTime: "10 min read",
    author: { name: "Divyansh Singh" },
  },
  {
    slug: "buildkite-vs-github-actions",
    title: "Buildkite vs GitHub Actions: A Web Infrastructure Engineer's Honest Take",
    description: "I have spent the better part of two years running both of these in production across teams of different shapes and sizes. Here is everything I wish someone had told me before I started forming opinions.",
    contentPath: "/blog/buildkite_vs_github_actions.html",
    publishedAt: "2026-04-10",
    tags: ["CI/CD", "DevOps", "Infrastructure"],
    readingTime: "12 min read",
    author: { name: "Divyansh Singh" },
  },
  {
    slug: "death-of-traditional-cicd",
    title: "The Death of the Traditional CI/CD Pipeline",
    description: "How AI-assisted deployments, platform engineering, and a new generation of tooling are dismantling the pipeline model we've relied on for a decade, and what actually comes next.",
    contentPath: "/blog/cicd_pipeline_article.html",
    publishedAt: "2026-04-01",
    tags: ["CI/CD", "DevOps", "AI"],
    readingTime: "12 min read",
    author: { name: "Divyansh Singh" },
  },
  {
    slug: "frontend-observability",
    title: "Frontend Observability is Not a Backend Problem",
    description: "Your servers are green. Your APIs are healthy. Your dashboards look perfectly fine. And somewhere out there, a real user is staring at a blank white screen. Here is why that gap exists, and what you can actually do about it.",
    contentPath: "/blog/frontend_observability_article.html",
    publishedAt: "2026-04-15",
    tags: ["Observability", "Frontend", "Performance"],
    readingTime: "10 min read",
    author: { name: "Divyansh Singh" },
  },
  {
    slug: "npm-supply-chain-attacks",
    title: "npm Supply Chain Attacks: What Actually Happens Inside Your Registry",
    description: "A proper look at how attackers get into your dependency tree, what they do once they are in, and why your lockfile alone is not going to save you.",
    contentPath: "/blog/npm_supply_chain_attacks.html",
    publishedAt: "2026-04-17",
    tags: ["Security", "npm", "Supply Chain"],
    readingTime: "12 min read",
    author: { name: "Divyansh Singh" },
  },
  {
    slug: "npm-workspaces-isolation",
    title: "No Isolation in npm Workspaces, And Why That Matters",
    description: "npm workspaces make monorepo dependency management feel very convenient, but they deliberately share a single node_modules tree across every package. This design has consequences that quietly break reproducibility.",
    contentPath: "/blog/npm_workspaces_isolation.html",
    publishedAt: "2026-04-22",
    tags: ["npm", "Monorepo", "Tooling"],
    readingTime: "10 min read",
    author: { name: "Divyansh Singh" },
  },
  {
    slug: "react19-actions",
    title: "React 19 Actions Are Not a State Management Solution",
    description: "The new Actions API is a solid improvement for handling async mutations and form submissions. But teams are already reaching for it as a Zustand or Redux replacement, and that's a category error that will bite them at scale.",
    contentPath: "/blog/react19_actions_article.html",
    publishedAt: "2026-04-24",
    tags: ["React", "State Management", "Frontend"],
    readingTime: "10 min read",
    author: { name: "Divyansh Singh" },
  },
  {
    slug: "rollup-not-just-for-libraries",
    title: "Rollup Is Not Just for Libraries Anymore",
    description: "For years we quietly assumed Rollup was the library bundler and Webpack was the application bundler. That line has blurred considerably. Here is why Rollup deserves a second look for your next production application.",
    contentPath: "/blog/rollup_article.html",
    publishedAt: "2026-04-29",
    tags: ["Bundlers", "Rollup", "Tooling"],
    readingTime: "10 min read",
    author: { name: "Divyansh Singh" },
  },
  {
    slug: "zero-bundle-size-dx-cost",
    title: "What \"Zero Bundle Size\" Frameworks Actually Cost in Developer Experience",
    description: "The pitch is very attractive: ship no JavaScript, score 100 on Lighthouse. But the developer experience of working with Qwik, Astro Islands, and their cousins is a different story altogether.",
    contentPath: "/blog/zero-bundle-size-dx-cost.html",
    publishedAt: "2026-05-01",
    tags: ["Frameworks", "DX", "Performance"],
    readingTime: "12 min read",
    author: { name: "Divyansh Singh" },
  },
  // Example 1: Markdown blog post (write inline)
  // {
  //   slug: "my-markdown-post",
  //   title: "My Markdown Post",
  //   description: "A blog post written in markdown",
  //   content: `
  // # My First Blog Post
  //
  // Your markdown content goes here...
  //
  // ## Section heading
  //
  // Some text with **bold** and *italic*.
  //
  // \`\`\`typescript
  // const example = "code block";
  // \`\`\`
  //   `,
  //   publishedAt: "2026-03-25",
  //   tags: ["React", "JavaScript"],
  //   readingTime: "5 min read",
  //   author: {
  //     name: "Divyansh Singh",
  //   },
  // },

  // Example 2: HTML from file (easiest - just drop HTML file!)
  // {
  //   slug: "my-article-from-file",
  //   title: "My Article From File",
  //   description: "Import HTML article by file path",
  //   contentPath: "/blog/my-article.html",  // 👈 Just reference the file!
  //   publishedAt: "2026-03-25",
  //   tags: ["HTML", "Import"],
  //   readingTime: "8 min read",
  //   author: {
  //     name: "Divyansh Singh",
  //   },
  // },

  // Example 3: Inline HTML (if you prefer pasting)
  // {
  //   slug: "my-inline-html",
  //   title: "My Inline HTML",
  //   description: "HTML pasted directly",
  //   contentType: "html",
  //   content: `
  //     <h1>My HTML Article</h1>
  //     <p>Paste your HTML here...</p>
  //   `,
  //   publishedAt: "2026-03-25",
  //   tags: ["HTML"],
  //   readingTime: "5 min read",
  //   author: {
  //     name: "Divyansh Singh",
  //   },
  // },
];
