"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    company: "Razorpay",
    logo: "/companies/razorpay.png",
    title: "Senior Frontend Engineer",
    period: "May 2021 - Present",
    techStack: ["Svelte", "ReactJS", "TypeScript", "Redux", "Zustand", "Jest"],
    description: [
      {
        text: "Leading a pod to expand Razorpay into Malaysia by integrating region-specific payment methods and addressing localization challenges across a diverse tech stack (Svelte, ReactJS), resulting in the activation of ",
        highlight: "530 merchants",
        text2: " and achieving a monthly GMV of ",
        highlight2: "80M MYR",
      },
      {
        text: "Leading the frontend team in launching Razorpay products in Singapore, this project focused on enhancing the checkout and merchant experience for new geographies.",
      },
      {
        text: "Leading the team in Project Plus to improve internationalization support in our products by crafting i18n UI components, utilities, SDKs, linters and more. Successfully ",
        highlight: "open-sourced the SDK",
        text2: ", now accessible on npm as @razorpay/i18nify.",
      },
    ],
  },
  {
    company: "Razorpay",
    logo: "/companies/razorpay.png",
    title: "Software Development Engineer I",
    period: "Aug 2022 - Oct 2024",
    techStack: ["React", "TypeScript", "Node.js", "Jest", "Playwright"],
    description: [
      {
        text: "Led the end-to-end development and launch of Mastercard Biometric Authentication, demo'ed at GFP-2024, replacing 3DS-OTP authentication and increasing SR by ",
        highlight: "35%",
      },
      {
        text: "Accelerated international expansion by slashed time-to-market for new geographies from ",
        highlight: "8-9 months to 1 month",
      },
      {
        text: "Developed i18n-linter, a static code analysis tool reducing region-sensitive hard-coding errors by ",
        highlight: "87%",
      },
      {
        text: "Contributed in Migration of Merchant Dashboard from Monolithic to Micro-frontend Architecture achieving a ",
        highlight: "67% reduction in build time",
        text2: " (from 21 minutes to 7 minutes), cut UI runtime by ",
        highlight2: "67%",
        text3:
          " (from 15 minutes to 5 minutes), and decreased E2E test runtime by ",
        highlight3: "70%",
        text4: " (from 108 minutes to 32 minutes)",
      },
      {
        text: "Created India's first token lifecycle management system for ",
        highlight: "4 major banks",
        text2: ", complying with RBI guidelines, enabling ",
        highlight2: "8 tokenizations",
        text3:
          ", delivering customized solutions to millions, and reducing risk exposure by ",
        highlight3: "40%",
      },
    ],
  },
  {
    company: "Razorpay",
    logo: "/companies/razorpay.png",
    title: "Frontend Engineer Intern",
    period: "May 2021 - Jul 2022",
    techStack: ["React", "JavaScript", "CSS", "Material UI"],
    description: [
      {
        text: "Cut payment dispute resolution time by ",
        highlight: "50%",
        text2:
          ", reducing the average from 20 minutes to 10 minutes, and improving team efficiency.",
      },
      {
        text: "Revamped Shield UI, achieving a ",
        highlight: "33% surge",
        text2: " in user engagement and reducing load time by ",
        highlight2: "21%",
      },
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
        <div className="mt-12 space-y-16">
          {experiences.map((experience, index) => (
            <motion.div
              key={`${experience.company}-${experience.title}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="grid gap-8 lg:grid-cols-3">
                <div>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 overflow-hidden rounded-full">
                      <img
                        src={experience.logo}
                        alt={`${experience.company} logo`}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-100">
                        {experience.title}
                      </h3>
                      <p className="text-lg font-semibold text-blue-500">
                        {experience.company}
                      </p>
                      <p className="text-sm text-gray-400">
                        {experience.period}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-gray-300">
                      Tech Stack
                    </h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {experience.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-gray-700/50 px-3 py-1 text-sm font-medium text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <ul className="space-y-4">
                    {experience.description.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="flex gap-3 text-base text-gray-400"
                      >
                        <span className="select-none text-blue-500">›</span>
                        <span>
                          {item.text}
                          {item.highlight && (
                            <span className="font-semibold text-blue-400">
                              {item.highlight}
                            </span>
                          )}
                          {item.text2}
                          {item.highlight2 && (
                            <span className="font-semibold text-blue-400">
                              {item.highlight2}
                            </span>
                          )}
                          {item.text3}
                          {item.highlight3 && (
                            <span className="font-semibold text-blue-400">
                              {item.highlight3}
                            </span>
                          )}
                          {item.text4}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
