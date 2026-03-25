# Blog Writing Guide

## How to Add a New Blog Post

Your portfolio uses a **static blog system** with **3 easy ways** to add content:

1. 🗂️ **HTML File** - Drop HTML file in `/public/blog/` (EASIEST!)
2. ✍️ **Markdown** - Write inline with markdown syntax
3. 📋 **Inline HTML** - Paste HTML directly in code

---

## Method 1: HTML File (Recommended for Existing Articles)

### Super Simple 3-Step Process:

**Step 1**: Drop your HTML file in `/public/blog/`
```bash
public/blog/
└── my-article.html  # 👈 Just drop your HTML file here!
```

**Step 2**: Add reference in `src/data/blogPosts.ts`
```typescript
export const blogPosts: BlogPost[] = [
  {
    slug: "my-article",
    title: "My Article Title",
    description: "Article description for preview",
    contentPath: "/blog/my-article.html",  // 👈 That's it!
    publishedAt: "2026-03-25",
    tags: ["React", "Performance"],
    readingTime: "8 min read",
    author: { name: "Divyansh Singh" },
  },
];
```

**Step 3**: Deploy
```bash
npm run dev      # Preview locally
npm run build    # Build
git push         # Deploy
```

### That's It! 🎉

No copying, no pasting, no manual work. Just drop the file and reference it.

Perfect for:
- ✅ Importing articles from Medium, Dev.to, etc.
- ✅ Using existing HTML files (like `Downloads/ai_boardgame_testing_article.html`)
- ✅ Articles with complex formatting
- ✅ Keeping blog content separate from code

---

## Method 2: Markdown (Best for New Articles)

Here's how to publish a new blog:

### Step 1: Open the Blog Data File

Navigate to: `src/data/blogPosts.ts`

### Step 2: Add Your Blog Post

Add a new object to the `blogPosts` array:

```typescript
export const blogPosts: BlogPost[] = [
  {
    slug: "your-blog-post-url",  // Used in URL: /blog/your-blog-post-url
    title: "Your Blog Post Title",
    description: "A compelling description that appears in previews and search results (keep under 160 characters)",
    content: `
# Your Blog Post Title

Your markdown content goes here. Use markdown syntax for formatting.

## Subheading

Regular paragraph text with **bold** and *italic* formatting.

### Smaller heading

- Bullet point 1
- Bullet point 2
- Bullet point 3

\`\`\`typescript
// Code blocks with syntax highlighting
const example = "TypeScript code";
console.log(example);
\`\`\`

> Blockquotes for important notes or quotes

[Link to external site](https://example.com)

---

*Footer text or call to action*
    `,
    publishedAt: "2026-03-25",  // ISO date format: YYYY-MM-DD
    tags: ["React", "JavaScript", "Career"],  // 2-4 relevant tags
    readingTime: "8 min read",  // Estimate: ~200 words = 1 minute
    featured: false,  // Set to true to highlight on homepage
    author: {
      name: "Divyansh Singh",
    },
  },
  // Add more blog posts here...
];
```

### Step 3: Preview Locally

```bash
npm run dev
```

Visit: `http://localhost:3000/blog` to see your blog list
Visit: `http://localhost:3000/blog/your-blog-post-url` to see the full post

### Step 4: Deploy

```bash
# Build the site
npm run build

# Push to GitHub (GitHub Actions will auto-deploy)
git add .
git commit -m "Add new blog post: Your Title"
git push origin main
```

---

## Method 3: Inline HTML (Alternative)

If you prefer pasting HTML directly in code (not recommended - use Method 1 instead):

```typescript
export const blogPosts: BlogPost[] = [
  {
    slug: "my-inline-html",
    title: "My HTML Article",
    description: "Article description",
    contentType: "html",
    content: `
      <h1>My Article Title</h1>
      <p>Paste your HTML here...</p>
      <h2>Section Heading</h2>
      <ul>
        <li>List item 1</li>
        <li>List item 2</li>
      </ul>
    `,
    publishedAt: "2026-03-25",
    tags: ["HTML"],
    readingTime: "5 min read",
    author: { name: "Divyansh Singh" },
  },
];
```

**Note**: Method 1 (HTML file) is much cleaner and easier to maintain!

---

## Markdown Tips (Option 1)

### Headings
```markdown
# H1 - Main title
## H2 - Section
### H3 - Subsection
```

### Text Formatting
```markdown
**bold text**
*italic text*
~~strikethrough~~
`inline code`
```

### Links & Images
```markdown
[Link text](https://example.com)
![Alt text](/images/photo.jpg)
```

### Code Blocks
````markdown
```typescript
const greeting = "Hello World";
```
````

Supported languages: `typescript`, `javascript`, `jsx`, `tsx`, `python`, `bash`, `css`, `html`, etc.

### Lists
```markdown
- Unordered item 1
- Unordered item 2

1. Ordered item 1
2. Ordered item 2
```

### Blockquotes
```markdown
> Important note or quote
> Can span multiple lines
```

### Horizontal Rule
```markdown
---
```

---

## Best Practices

### 1. **SEO-Friendly Slugs**
- Use lowercase
- Separate words with hyphens
- Keep it short but descriptive
- Example: `building-scalable-react-apps`

### 2. **Compelling Descriptions**
- 130-160 characters (optimal for search results)
- Include main keywords
- Make it click-worthy but honest

### 3. **Tags**
- Use 2-4 tags per post
- Be consistent (use existing tags when possible)
- Common tags: `React`, `TypeScript`, `Performance`, `Career`, `Tutorial`, `Architecture`

### 4. **Reading Time**
- Rough estimate: 200 words = 1 minute
- Count your words, divide by 200
- Round to nearest minute

### 5. **Content Structure**
- Start with a hook (problem statement or interesting fact)
- Use clear headings (H2, H3) to break up content
- Include code examples where relevant
- End with takeaways or call-to-action

### 6. **Code Examples**
- Use syntax highlighting (specify language after triple backticks)
- Keep examples concise and relevant
- Add comments to explain complex logic

---

## Example: Complete Blog Post

```typescript
{
  slug: "react-performance-tips",
  title: "5 React Performance Tips That Actually Matter",
  description: "Practical techniques to make your React apps faster without over-optimization. Learn when and how to use memoization, code splitting, and lazy loading.",
  content: `
# 5 React Performance Tips That Actually Matter

React is fast by default, but as your app grows, you might notice slowdowns. Here are 5 proven techniques to keep things snappy.

## 1. Use React.memo Strategically

Don't wrap every component in React.memo. Only use it when:
- Component renders often with same props
- Rendering is expensive (complex calculations)
- Parent re-renders frequently

\`\`\`typescript
const ExpensiveList = React.memo(({ items }) => {
  return items.map(item => <Item key={item.id} {...item} />);
});
\`\`\`

## Key Takeaways

1. Measure first, optimize second
2. Focus on user-perceived performance
3. Don't over-optimize - React is already fast

---

*What performance issues have you faced in React? Share in the comments!*
  `,
  publishedAt: "2026-03-20",
  tags: ["React", "Performance", "JavaScript"],
  readingTime: "7 min read",
  featured: true,
  author: {
    name: "Divyansh Singh",
  },
}
```

---

## Publishing Workflow Summary

1. **Write**: Add blog post object to `src/data/blogPosts.ts`
2. **Test**: Run `npm run dev` and preview at `http://localhost:3000/blog`
3. **Build**: Run `npm run build` to generate static files
4. **Deploy**: Push to GitHub - your site auto-deploys to GitHub Pages

---

## Real Example: Converting HTML File to Blog Post

Let's say you have an HTML article file like `Downloads/ai_boardgame_testing_article.html`:

**Step 1**: Open the HTML file in a browser

**Step 2**: Open browser DevTools (Right-click > Inspect)

**Step 3**: Find the main content container (usually `<article>`, `<main>`, or a `<div>` with class like `.content`)

**Step 4**: Right-click the container element > Copy > Copy outerHTML

**Step 5**: Add to your blog:

```typescript
export const blogPosts: BlogPost[] = [
  {
    slug: "ai-boardgame-testing",
    title: "AI Board Game Testing",
    description: "Article about testing board games with AI",
    contentType: "html",  // Important!
    content: `
      <!-- Paste your copied HTML here -->
      <article>
        <h1>Your Article Title</h1>
        <p>Your content...</p>
      </article>
    `,
    publishedAt: "2026-03-25",
    tags: ["AI", "Testing"],
    readingTime: "10 min read",
    author: {
      name: "Divyansh Singh",
    },
  },
];
```

**Alternative**: If you want to clean up the HTML, you can also:
1. Open the HTML file in VS Code
2. Extract just the body content (skip `<html>`, `<head>`, etc.)
3. Remove any inline `<style>` tags (portfolio will style it)
4. Paste into the `content` field

---

## Markdown vs HTML: Which to Use?

| Feature | Markdown | HTML |
|---------|----------|------|
| **Ease of writing** | ✅ Simple syntax | ⚠️ More verbose |
| **Version control** | ✅ Easy to diff | ⚠️ Harder to diff |
| **Flexibility** | ⚠️ Limited styling | ✅ Full control |
| **Importing articles** | ⚠️ Need conversion | ✅ Copy-paste ready |
| **Code blocks** | ✅ Native support | ✅ With proper tags |

**Recommendation**:
- Use **Markdown** for new articles you write from scratch
- Use **HTML** when importing existing articles or need custom styling

---

## Need Help?

- **Markdown preview**: Use VS Code markdown preview or [StackEdit](https://stackedit.io/)
- **HTML to Markdown converter**: [Turndown](https://domchristie.github.io/turndown/)
- **Reading time calculator**: [Read-o-Meter](https://niram.org/read/)
- **HTML beautifier**: [HTML Formatter](https://htmlformatter.com/)

Happy blogging! 🚀
