import { FaExternalLinkAlt } from "react-icons/fa";

export interface Product {
  title: string;
  type: string;
  description: string;
  image?: string;
  link: string;
  stats: string;
  techStack: string[];
}

export const products: Product[] = [
  {
    title: "Full Spectrum JavaScript",
    type: "Ebook",
    description: `This book is for:
 - Absolute Beginners who have little to no prior programming experience and want to learn JavaScript as their first programming language.
 - Aspiring Frontend Developers who want to understand JavaScript’s role in web development and master the skills needed to build modern, interactive websites.
 - Backend Developers who want to expand their expertise into JavaScript and Node.js for full-stack development.
 - Intermediate Developers who want to fill in the gaps in their knowledge, dive deeper into JavaScript’s advanced features, and improve their coding techniques.
No matter where you are in your coding journey, this book has something to offer.`,
    image: "/images/digital-products/javascript-book.jpg",
    link: "https://rgndunes.gumroad.com/l/full-spectrum-javascript",
    stats: "200+ copies sold",
    techStack: ["JavaScript", "Web Development", "Programming"],
  },
  {
    title: "Frontend HLD Playbook",
    type: "Ebook",
    description: `Ever wondered how platforms like Google Docs, Uber, or YouTube manage to feel so smooth, scale to millions of users, and never seem to break a sweat?

Welcome to the Frontend HLD Playbook — a deep-dive into the frontend high-level design of some of the most iconic and complex web platforms in the world.

This isn’t just another theoretical system design guide. In this book, we break down real-world platforms like Uber, Airbnb, GitHub, Confluence, YouTube, Netflix, Instagram, Figma, and more — one by one — and decode how they’re architected, how they optimize for performance, and how they handle scale, caching, state, and user experience at a global level.

Whether you're a frontend engineer preparing for system design interviews, a curious learner, or a seasoned dev looking to draw inspiration from the best in the industry, this playbook will equip you with practical insights and patterns that go way beyond tutorials.

Let’s peek behind the curtain and see what powers the frontend of the internet’s biggest platforms 🚀`,
    image: "/images/digital-products/hld-book.jpg",
    link: "https://www.linkedin.com/posts/activity-7305530469465395200-Y_TM?utm_source=share&utm_medium=member_desktop&rcm=ACoAAC9y2o8BaDk7N25xcrxhEmqqai4Wo9F4yKA",
    stats: "Coming Soon...",
    techStack: ["System Design", "Frontend", "HLD"],
  },
];
