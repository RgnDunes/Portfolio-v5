interface PreviousRole {
  position: string;
  duration: string;
  description: string;
  achievements: string[];
}

interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string;
  achievements: string[];
  previousRoles?: PreviousRole[];
  logo: string;
}

export const experiences: Experience[] = [
  {
    company: "Razorpay",
    position: "Senior Frontend Engineer",
    duration: "2021 - Present",
    description:
      "Leading frontend development for international expansion, focusing on Southeast Asian markets. Spearheading i18n initiatives and performance optimizations.",
    achievements: [
      "Reduced page load time by 50% through code splitting and lazy loading",
      "Implemented real-time transaction tracking handling $2B+ in monthly transactions",
      "Developed a comprehensive design system serving 10+ products",
    ],
    logo: "/images/logos/razorpay.png",
    previousRoles: [
      {
        position: "Software Development Engineer I",
        duration: "2021 - 2022",
        description:
          "Led the development of RazorpayX Dashboard, handling $2B+ in monthly transactions",
        achievements: [
          "Implemented real-time transaction tracking and analytics features",
          "Built reusable component library used across multiple products",
          "Reduced page load time by 50% through code splitting and lazy loading",
        ],
      },
      {
        position: "Frontend Engineer Intern",
        duration: "2021",
        description:
          "Developed key features for RazorpayX using React and TypeScript",
        achievements: [
          "Implemented responsive designs and cross-browser compatibility",
          "Collaborated with backend team to integrate REST APIs",
          "Wrote unit tests achieving 85% code coverage",
        ],
      },
    ],
  },
  {
    company: "Freelance",
    position: "Frontend Developer",
    duration: "2020",
    description:
      "Developed and maintained web applications for various clients using React and Next.js",
    achievements: [
      "Implemented responsive designs and optimized performance for better user experience",
      "Collaborated with clients to understand requirements and deliver solutions",
      "Built reusable components and maintained code quality through testing",
    ],
    logo: "/images/logos/freelance.png",
  },
  {
    company: "Coding Ninjas",
    position: "Frontend Developer Intern",
    duration: "2020",
    description:
      "Worked on the development of the Coding Ninjas learning platform",
    achievements: [
      "Implemented UI components and features using React",
      "Collaborated with the team to improve user experience",
      "Contributed to code reviews and documentation",
    ],
    logo: "/images/logos/coding-ninjas.png",
  },
] as const;
