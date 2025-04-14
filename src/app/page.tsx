import Navbar from "@/components/Navbar";
import About from "@/components/sections/About";
import ArticlesAndProducts from "@/components/sections/ArticlesAndProducts";
import Contact from "@/components/sections/Contact";
import DigitalProducts from "@/components/sections/DigitalProducts";
import Experience from "@/components/sections/Experience";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Testimonials from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0F172A] text-white">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <DigitalProducts />
        <ArticlesAndProducts />
        <Testimonials />
        <Contact />
      </main>
    </>
  );
}
