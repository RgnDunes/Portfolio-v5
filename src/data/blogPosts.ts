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
    slug: "ai-boardgame-testing",
    title: "AI Board Game Testing",
    description: "Testing board games with AI",
    contentPath: "/blog/ai_boardgame_testing_article.html",
    publishedAt: "2026-03-20",
    tags: ["AI", "Testing", "Games"],
    readingTime: "18 min read",
    author: { name: "Divyansh Singh" },
  },
  {
    slug: "death-of-traditional-cicd",
    title: "The Death of the Traditional CI/CD Pipeline",
    description: "How AI-native development is making traditional CI/CD pipelines obsolete",
    contentPath: "/blog/cicd_pipeline_article.html",
    publishedAt: "2026-03-27",
    tags: ["CI/CD", "DevOps", "AI"],
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
