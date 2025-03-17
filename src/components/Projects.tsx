
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";

type Project = {
  title: string;
  description: string;
  tags: string[];
  image: string;
  github?: string;
  demo?: string;
};

const projects: Project[] = [
  {
    title: "AI-Powered Content Generator",
    description: "A tool that uses machine learning to generate high-quality content for blogs, social media, and marketing materials.",
    tags: ["React", "Node.js", "Machine Learning", "OpenAI"],
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
    github: "https://github.com/",
    demo: "https://demo.com/",
  },
  {
    title: "Financial Dashboard",
    description: "An interactive dashboard for monitoring financial metrics, transactions, and market trends in real-time.",
    tags: ["TypeScript", "React", "D3.js", "Firebase"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    github: "https://github.com/",
  },
  {
    title: "E-Learning Platform",
    description: "A comprehensive platform for creating and consuming educational content with video lessons, quizzes, and progress tracking.",
    tags: ["Next.js", "MongoDB", "AWS", "WebRTC"],
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
    github: "https://github.com/",
    demo: "https://demo.com/",
  },
  {
    title: "Code Collaboration Tool",
    description: "A real-time code collaboration tool allowing multiple developers to work on the same codebase simultaneously.",
    tags: ["React", "Socket.io", "Express", "MongoDB"],
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
    github: "https://github.com/",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-16">
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground">
            A selection of my best work showcasing my skills and expertise
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="px-6 pb-6 pt-0 flex gap-4">
                {project.github && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </a>
                  </Button>
                )}
                {project.demo && (
                  <Button size="sm" asChild>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
