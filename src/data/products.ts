import { FaExternalLinkAlt } from "react-icons/fa";
import { StaticImageData } from "next/image";
import jsBookImg from "../assets/images/digital-products/javascript-book.jpg";
import hldBookImg from "../assets/images/digital-products/hld-book.jpg";
import cssUnmaskedBookImg from "../assets/images/digital-products/css-unmasked-book.png";

export interface Product {
  title: string;
  type: string;
  description: string;
  image?: string | StaticImageData;
  link: string;
  stats: string;
  techStack: string[];
}

export const products: Product[] = [
  {
    title: "Full Spectrum JavaScript",
    type: "Ebook",
    description: `This book is for:
        • Absolute Beginners who have little to no prior programming experience and want to learn JavaScript as their first programming language.
        • Aspiring Frontend Developers who want to understand JavaScript's role in web development and master the skills needed to build modern, interactive websites.
        • Backend Developers who want to expand their expertise into JavaScript and Node.js for full-stack development.
        • Intermediate Developers who want to fill in the gaps in their knowledge, dive deeper into JavaScript's advanced features, and improve their coding techniques.
        No matter where you are in your coding journey, this book has something to offer.`,
    image: jsBookImg,
    link: "https://rgndunes.gumroad.com/l/full-spectrum-javascript",
    stats: "200+ copies sold",
    techStack: ["JavaScript", "Web Development", "Programming"],
  },
  {
    title: "CSS Unmasked -- Styling Secrets They Never Told You",
    type: "Ebook",
    description: `This book is for:
        • Curious Beginners who have dabbled with HTML and want to finally understand how CSS actually works — without copy-pasting random snippets.
        • Junior Developers who are tired of fighting with layout bugs, specificity wars, and mystery margins that won't behave.
        • Frontend Engineers who want to go beyond the basics and learn how to write scalable, performant, and maintainable CSS at a professional level.
        • Designers transitioning into code who want a fun, visual, and practical way to master the styling layer of the web.
        • Senior Developers who secretly Google “how to center a div” and want to confidently teach or lead CSS decisions on large teams.`,
    image: cssUnmaskedBookImg,
    link: "https://rgndunes.gumroad.com/l/css-unmasked",
    stats: "INR 250",
    techStack: [
      "JavaScript",
      "Web Development",
      "Programming",
      "CSS",
      "Frontend",
    ],
  },
  {
    title: "Frontend HLD Playbook",
    type: "Ebook",
    description: `Ever wondered how platforms like Google Docs, Uber, or YouTube manage to feel so smooth, scale to millions of users, and never seem to break a sweat?

        Welcome to the Frontend HLD Playbook — a deep-dive into the frontend high-level design of some of the most iconic and complex web platforms in the world.

        • This book breaks down real-world platforms like Uber, Airbnb, GitHub, Confluence, YouTube, Netflix, Instagram, Figma, and more
        • Learn how these platforms are architected and optimized for performance
        • Understand how they handle scale, caching, state, and user experience at a global level
        • Perfect for frontend engineers preparing for system design interviews
        • Great for curious learners and seasoned devs looking for inspiration
        • Get practical insights and patterns that go way beyond tutorials`,
    image: hldBookImg,
    link: "https://www.linkedin.com/posts/activity-7305530469465395200-Y_TM?utm_source=share&utm_medium=member_desktop&rcm=ACoAAC9y2o8BaDk7N25xcrxhEmqqai4Wo9F4yKA",
    stats: "Launching Soon...",
    techStack: ["System Design", "Frontend", "HLD"],
  },
];
