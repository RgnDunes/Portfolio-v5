interface Testimonial {
  name: string;
  role: string;
  company: string;
  image: string;
  testimonial: string;
  linkedinUrl: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Ketan Somani",
    role: "Founder",
    company: "Eternalight Infotech",
    image: "/images/testimonials/ketan-somani.jpg",
    testimonial:
      "I had the pleasure of working with Divyansh during their internship as a ReactJS Developer at Razorpay. Divyansh consistently demonstrated excellent attention to detail and a strong ability to complete tasks on time. Their dedication to delivering high-quality work was evident in every project they tackled. Divyansh is a reliable, diligent, and talented developer, and I highly recommend them for any web development role",
    linkedinUrl: "https://www.linkedin.com/in/ketansomani74/",
  },
  {
    name: "Anshu Raj",
    role: "Frontend Engineer",
    company: "Google",
    image: "/images/testimonials/anshu-raj.jpg",
    testimonial:
      "I was mentoring Divyansh when he joined Razorpay into my team. He is a quick learner has good problem solving skills. He was able to take on complex tasks in no time. He quickly on boarded into the team and was participating in team exercises instantly. He was able to take a complex module and finish it off without much oversight.",
    linkedinUrl: "https://www.linkedin.com/in/anshuraj1/",
  },
  {
    name: "Aditya Kumar Jha",
    role: "Senior Software Engineer",
    company: "Jiostar",
    image: "/images/testimonials/aditya-kumar-jha.jpg",
    testimonial:
      "Divyansh Singh is an outstanding professional who I had the privilege of working with on the Admin Dashboard project. He is smart, hardworking, and detail-oriented. Divyansh's approach to problem-solving, by breaking it down into manageable parts, impressed me. As a key team member, he made significant contributions and was always humble and easy to communicate with. Divyansh is a quick learner and a diligent worker, consistently delivering tasks on time with clean and readable code. He is goal-oriented, passionate about learning, and thrives on challenging territories. His humor and collaborative nature make him a pleasure to work with. I highly recommend Divyansh and would love to work with him again given the opportunity.",
    linkedinUrl: "https://www.linkedin.com/in/adijha07/",
  },
  {
    name: "Neeraj Kumar Singh",
    role: "Software Engineer 2",
    company: "Microsoft",
    image: "/images/testimonials/neeraj-kumar-singh.jpg",
    testimonial:
      "I mentored Divyansh when He was an intern. He had been a very quick learner and got the grasp of technologies as well as codebases very quickly. I loved his keenness for learning new things from time to and grow.",
    linkedinUrl: "https://www.linkedin.com/in/neeraj719714/",
  },
];
