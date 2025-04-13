"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    role: "Senior Frontend Engineer",
    company: "Razorpay",
    period: "Jan 2023 - Present",
    description: [
      "Leading frontend development for RazorpayX, the company's neobanking platform, managing a team of 4 engineers",
      "Architected and implemented a micro-frontend architecture, reducing build times by 40% and improving deployment efficiency",
      "Developed a comprehensive design system serving 10+ products, reducing development time by 30%",
      "Optimized application performance, achieving 90+ Lighthouse scores and reducing bundle size by 35%",
      "Mentored junior engineers and conducted technical interviews for frontend positions",
    ],
    previousRoles: [
      {
        role: "Software Development Engineer I",
        period: "Jul 2021 - Dec 2022",
        description: [
          "Led the development of RazorpayX Dashboard, handling $2B+ in monthly transactions",
          "Implemented real-time transaction tracking and analytics features",
          "Built reusable component library used across multiple products",
          "Reduced page load time by 50% through code splitting and lazy loading",
        ],
      },
      {
        role: "Frontend Engineer Intern",
        period: "Jan 2021 - Jun 2021",
        description: [
          "Developed key features for RazorpayX using React and TypeScript",
          "Implemented responsive designs and cross-browser compatibility",
          "Collaborated with backend team to integrate REST APIs",
          "Wrote unit tests achieving 85% code coverage",
        ],
      },
    ],
  },
  {
    role: "Frontend Developer",
    company: "Freelance",
    period: "Jun 2020 - Dec 2020",
    description: [
      "Developed and maintained web applications for various clients using React and Next.js",
      "Implemented responsive designs and optimized performance for better user experience",
      "Collaborated with clients to understand requirements and deliver solutions",
      "Built reusable components and maintained code quality through testing",
    ],
  },
  {
    role: "Frontend Developer Intern",
    company: "Coding Ninjas",
    period: "Jan 2020 - May 2020",
    description: [
      "Worked on the development of the Coding Ninjas learning platform",
      "Implemented UI components and features using React",
      "Collaborated with the team to improve user experience",
      "Contributed to code reviews and documentation",
    ],
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl">
          Experience
        </h2>
        <div className="mt-12 space-y-12">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.role + experience.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="relative z-10 rounded-2xl bg-gray-800/50 p-8 backdrop-blur-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-100">
                      {experience.role}
                    </h3>
                    <p className="text-gray-400">{experience.company}</p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {experience.period}
                  </span>
                </div>
                <ul className="mt-6 space-y-4">
                  {experience.description.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                      <span className="text-gray-400">{item}</span>
                    </li>
                  ))}
                </ul>
                {experience.previousRoles && (
                  <div className="mt-8 border-t border-gray-700 pt-8">
                    <h4 className="text-lg font-medium text-gray-100">
                      Previous Roles
                    </h4>
                    {experience.previousRoles.map((previousRole, roleIndex) => (
                      <div key={roleIndex} className="mt-6">
                        <div className="flex items-center justify-between">
                          <h5 className="font-medium text-gray-100">
                            {previousRole.role}
                          </h5>
                          <span className="text-sm text-gray-500">
                            {previousRole.period}
                          </span>
                        </div>
                        <ul className="mt-4 space-y-3">
                          {previousRole.description.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex gap-3">
                              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                              <span className="text-gray-400">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {index !== experiences.length - 1 && (
                <div className="absolute -bottom-6 left-8 h-6 w-0.5 bg-gray-700" />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
