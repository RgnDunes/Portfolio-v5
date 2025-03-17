
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type ExperienceItem = {
  company: string;
  position: string;
  period: string;
  description: string;
  tags: string[];
};

const experiences: ExperienceItem[] = [
  {
    company: "Razorpay",
    position: "Software Engineer",
    period: "2022 - Present",
    description: "Working on payment infrastructure and developer tools to help businesses accept and manage payments online.",
    tags: ["JavaScript", "React", "Node.js", "AWS"],
  },
  {
    company: "Correlation AI",
    position: "Software Engineer",
    period: "2020 - 2022",
    description: "Developed AI-powered solutions for enterprise customers, focusing on machine learning integration and data analytics.",
    tags: ["Python", "TypeScript", "ML/AI", "Cloud"],
  },
  {
    company: "TagHive",
    position: "Software Developer",
    period: "2018 - 2020",
    description: "Built educational technology solutions and classroom tools for students and teachers.",
    tags: ["Mobile Development", "React Native", "Education Tech"],
  },
  {
    company: "GeeksforGeeks",
    position: "Technical Content Writer",
    period: "2016 - 2018",
    description: "Created technical tutorials, articles, and learning resources for programming and computer science topics.",
    tags: ["Technical Writing", "Education", "Algorithms"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-16 bg-secondary/50 dark:bg-secondary/10">
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Professional Journey</h2>
          <p className="text-muted-foreground">
            My experience spans across various industry-leading companies
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          {experiences.map((exp, index) => (
            <Card key={index} className="animate-scale-in overflow-hidden" style={{ animationDelay: `${index * 100}ms` }}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-xl">{exp.company}</h3>
                  <span className="text-sm text-muted-foreground">{exp.period}</span>
                </div>
                <h4 className="text-lg font-medium mb-3">{exp.position}</h4>
                <p className="text-muted-foreground mb-4">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
