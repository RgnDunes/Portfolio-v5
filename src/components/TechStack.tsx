
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Technology = {
  name: string;
  icon: string;
  className?: string;
};

const technologies: Technology[] = [
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    className: "bg-yellow-50 dark:bg-yellow-900/20",
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    className: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    className: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    className: "bg-green-50 dark:bg-green-900/20",
  },
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    className: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    name: "GraphQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
    className: "bg-pink-50 dark:bg-pink-900/20",
  },
  {
    name: "AWS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
    className: "bg-orange-50 dark:bg-orange-900/20",
  },
  {
    name: "Docker",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    className: "bg-blue-50 dark:bg-blue-900/20",
  },
];

export default function TechStack() {
  return (
    <section className="py-12 bg-secondary/30 dark:bg-secondary/5">
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-2xl font-bold mb-4">Tech Stack</h2>
          <p className="text-muted-foreground">
            Technologies I work with
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
          {technologies.map((tech, index) => (
            <Card key={index} className={cn("border-0 shadow-sm overflow-hidden animate-scale-in", tech.className)} style={{ animationDelay: `${index * 50}ms` }}>
              <CardContent className="flex flex-col items-center justify-center p-4">
                <img 
                  src={tech.icon} 
                  alt={tech.name} 
                  className="w-10 h-10 mb-2"
                />
                <span className="text-xs font-medium">{tech.name}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
