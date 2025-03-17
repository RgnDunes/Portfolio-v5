
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin } from "lucide-react";

export default function Hero() {
  return (
    <section id="about" className="pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in">
            Full-Time Software Engineer,<br className="hidden sm:block" />
            Part-Time Freelancer
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-balance animate-fade-in" style={{ animationDelay: "100ms" }}>
            I'm an author, instructor, mentor, and technical content writer with a passion for creating 
            high-quality software solutions and sharing knowledge with others.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <Button asChild size="lg" className="rounded-full">
              <a href="#projects">
                View My Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <div className="flex space-x-4 mt-4 sm:mt-0">
              <Button variant="outline" size="icon" className="rounded-full" asChild>
                <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full" asChild>
                <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
