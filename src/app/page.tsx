import Header from "@/components/layout/Header";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Testimonials from "@/components/sections/Testimonials";
import ArticlesAndProducts from "@/components/sections/ArticlesAndProducts";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="flex min-h-screen items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-4xl font-bold text-transparent sm:text-6xl">
              Divyansh Singh
            </h1>
            <p className="mt-4 text-xl text-gray-400 sm:text-2xl">
              Senior Frontend Engineer
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
              Building exceptional digital experiences with modern web
              technologies
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <a
                href="#about"
                className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                About Me
              </a>
              <a
                href="#contact"
                className="rounded-lg border border-gray-600 px-6 py-3 text-sm font-semibold text-gray-300 transition-colors hover:border-gray-500 hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </section>

        {/* Other Sections */}
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Testimonials />
        <ArticlesAndProducts />
        <Contact />
      </main>
    </>
  );
}
