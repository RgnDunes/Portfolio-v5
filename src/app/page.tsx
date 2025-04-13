import Navbar from "@/components/Navbar";
import About from "@/components/sections/About";
import ArticlesAndProducts from "@/components/sections/ArticlesAndProducts";
import Contact from "@/components/sections/Contact";
import DigitalProducts from "@/components/sections/DigitalProducts";
import Experience from "@/components/sections/Experience";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <ArticlesAndProducts />
        <DigitalProducts />
        <Contact />
      </main>
    </>
  );
}
