"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";

// Dynamically import components that are below the fold
const Projects = dynamic(() => import("@/components/sections/Projects"), {
  loading: () => <div className="min-h-screen" />,
});
const DigitalProducts = dynamic(
  () => import("@/components/sections/DigitalProducts"),
  {
    loading: () => <div className="min-h-screen" />,
  }
);
const ArticlesAndProducts = dynamic(
  () => import("@/components/sections/ArticlesAndProducts"),
  {
    loading: () => <div className="min-h-screen" />,
  }
);
const Testimonials = dynamic(
  () => import("@/components/sections/Testimonials"),
  {
    loading: () => <div className="min-h-screen" />,
  }
);
const Contact = dynamic(() => import("@/components/sections/Contact"), {
  loading: () => <div className="min-h-screen" />,
});
const LatestBlogPosts = dynamic(
  () => import("@/components/sections/LatestBlogPosts"),
  {
    loading: () => <div className="min-h-screen" />,
  }
);

export default function Home() {
  return (
    <>
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen"
        style={{ background: '#dad4cc', color: '#0f0e0c' }}
      >
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <DigitalProducts />
        <ArticlesAndProducts />
        <LatestBlogPosts />
        <Testimonials />
        <Contact />
      </motion.main>
    </>
  );
}
