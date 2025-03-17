
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Quote } from "lucide-react";

type Testimonial = {
  quote: string;
  name: string;
  position: string;
  company: string;
};

const testimonials: Testimonial[] = [
  {
    quote: "An exceptional engineer who consistently delivers high-quality code and innovative solutions. Their ability to solve complex problems and communicate technical concepts clearly makes them a valuable asset to any team.",
    name: "Sarah Johnson",
    position: "Engineering Manager",
    company: "Tech Innovations Inc.",
  },
  {
    quote: "I had the pleasure of mentoring sessions that transformed my understanding of software architecture. Their teaching approach is clear, patient, and incredibly effective.",
    name: "Michael Chen",
    position: "Junior Developer",
    company: "DevStart",
  },
  {
    quote: "Their technical articles have become a go-to resource for our entire engineering team. The depth of knowledge and clarity of explanation is truly impressive.",
    name: "Priya Patel",
    position: "CTO",
    company: "FutureTech Solutions",
  },
  {
    quote: "Working on projects together has been a fantastic experience. They bring not only technical excellence but also a positive attitude that elevates the entire team.",
    name: "David Rodriguez",
    position: "Senior Developer",
    company: "CodeCraft Systems",
  },
  {
    quote: "The eBook they authored has become mandatory reading for all new hires in our engineering department. It's that good.",
    name: "Emma Thompson",
    position: "Director of Engineering",
    company: "InnovateSoft",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16">
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">What People Say</h2>
          <p className="text-muted-foreground">
            Feedback from colleagues, clients, and mentees
          </p>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                <div className="p-1">
                  <Card className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <Quote className="h-8 w-8 text-primary/20 mb-4" />
                      <p className="italic text-muted-foreground mb-6">
                        "{testimonial.quote}"
                      </p>
                    </CardContent>
                    <CardFooter className="px-6 pb-6 pt-0">
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.position}, {testimonial.company}
                        </p>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-8">
            <CarouselPrevious className="relative mr-2" />
            <CarouselNext className="relative ml-2" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
