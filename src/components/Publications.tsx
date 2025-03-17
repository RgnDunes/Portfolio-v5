
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Book } from "lucide-react";
import { Button } from "@/components/ui/button";

type Article = {
  title: string;
  platform: "LinkedIn" | "Medium" | "Substack" | "Other";
  date: string;
  link: string;
  description: string;
};

type Book = {
  title: string;
  cover: string;
  description: string;
  link: string;
  publishedDate: string;
};

const articles: Article[] = [
  {
    title: "Building Scalable Applications with Microservices",
    platform: "Medium",
    date: "March 15, 2023",
    link: "https://medium.com/",
    description: "A deep dive into microservices architecture and best practices for building scalable applications.",
  },
  {
    title: "The Future of JavaScript: What's Coming in 2024",
    platform: "LinkedIn",
    date: "January 10, 2023",
    link: "https://linkedin.com/",
    description: "Exploring upcoming JavaScript features and how they will shape web development.",
  },
  {
    title: "React Performance Optimization Techniques",
    platform: "Substack",
    date: "November 5, 2022",
    link: "https://substack.com/",
    description: "Practical strategies to improve React application performance and user experience.",
  },
  {
    title: "Understanding TypeScript Generics",
    platform: "Medium",
    date: "September 20, 2022",
    link: "https://medium.com/",
    description: "A comprehensive guide to TypeScript generics with practical examples.",
  },
  {
    title: "Building a CI/CD Pipeline for Frontend Applications",
    platform: "LinkedIn",
    date: "July 12, 2022",
    link: "https://linkedin.com/",
    description: "Step-by-step guide to setting up continuous integration and deployment for web applications.",
  },
  {
    title: "Demystifying Blockchain Technology",
    platform: "Substack",
    date: "May 30, 2022",
    link: "https://substack.com/",
    description: "An introduction to blockchain technology and its applications beyond cryptocurrencies.",
  },
];

const books: Book[] = [
  {
    title: "Modern JavaScript: From Fundamentals to Advanced Concepts",
    cover: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80",
    description: "A comprehensive guide to JavaScript programming, covering everything from basic syntax to advanced patterns and best practices.",
    link: "https://example.com/book",
    publishedDate: "June 2022",
  },
  {
    title: "Full Stack Development: A Practical Approach (Coming Soon)",
    cover: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80",
    description: "An upcoming guide to full stack development with modern technologies and frameworks.",
    link: "#",
    publishedDate: "Expected 2024",
  },
];

export default function Publications() {
  return (
    <section id="publications" className="py-16 bg-secondary/50 dark:bg-secondary/10">
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Publications & Articles</h2>
          <p className="text-muted-foreground">
            Sharing knowledge through books and technical articles
          </p>
        </div>
        
        <Tabs defaultValue="books" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
            <TabsTrigger value="books">Books</TabsTrigger>
            <TabsTrigger value="articles">Articles</TabsTrigger>
          </TabsList>
          
          <TabsContent value="books" className="animate-fade-in">
            <div className="grid gap-8 md:grid-cols-2">
              {books.map((book, index) => (
                <Card key={index} className="flex flex-col md:flex-row overflow-hidden">
                  <div className="w-full md:w-1/3 h-40 md:h-auto">
                    <img 
                      src={book.cover} 
                      alt={book.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-xl">{book.title}</h3>
                      <Badge>{book.publishedDate}</Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">{book.description}</p>
                    <Button asChild variant={book.link === "#" ? "outline" : "default"} disabled={book.link === "#"}>
                      <a href={book.link} target={book.link === "#" ? "" : "_blank"} rel="noopener noreferrer">
                        <Book className="mr-2 h-4 w-4" />
                        {book.link === "#" ? "Coming Soon" : "View Book"}
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="articles" className="animate-fade-in">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant={
                        article.platform === "Medium" ? "default" :
                        article.platform === "LinkedIn" ? "outline" :
                        "secondary"
                      }>
                        {article.platform}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{article.date}</span>
                    </div>
                    <h3 className="font-bold text-lg mb-2">{article.title}</h3>
                    <p className="text-muted-foreground mb-4 text-sm">{article.description}</p>
                    <Button variant="ghost" size="sm" className="pl-0" asChild>
                      <a href={article.link} target="_blank" rel="noopener noreferrer">
                        Read Article
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
