
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChalkboardTeacher, Code, PenTool, FileText } from "lucide-react";

const services = [
  {
    title: "Technical Mentorship",
    description: "One-on-one guidance to help you advance your programming skills and career in software development.",
    icon: ChalkboardTeacher,
  },
  {
    title: "Code Reviews & Consulting",
    description: "Expert analysis and feedback on your codebase with recommendations for improvements and best practices.",
    icon: Code,
  },
  {
    title: "Custom Technical Writing",
    description: "High-quality technical content creation for blogs, documentation, tutorials, and educational materials.",
    icon: PenTool,
  },
  {
    title: "Workshop Facilitation",
    description: "Interactive learning sessions and workshops on programming, software architecture, and development practices.",
    icon: FileText,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-16 bg-secondary/50 dark:bg-secondary/10">
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Freelance Services</h2>
          <p className="text-muted-foreground">
            Expert assistance to help you grow as a developer
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="border-0 shadow-md animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader className="pb-2">
                  <div className="mb-4 bg-primary/10 w-12 h-12 rounded-md flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
