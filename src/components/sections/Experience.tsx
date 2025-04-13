"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    company: "Razorpay",
    title: "Senior Frontend Engineer",
    period: "May 2021 - Present",
    description: [
      "Leading a pod to expand Razorpay into Malaysia by integrating region-specific payment methods and addressing localization challenges across a diverse tech stack (Svelte, ReactJS), resulting in the activation of 530 merchants and achieving a monthly GMV of 80M MYR.",
      "Leading the frontend team in launching Razorpay products in Singapore, this project focused on enhancing the checkout and merchant experience for new geographies.",
      "Leading the team in Project Plus to improve internationalization support in our products by crafting i18n UI components, utilities, SDKs, linters and more. Successfully open-sourced the SDK, now accessible on npm as @razorpay/i18nify.",
    ],
  },
  {
    company: "Razorpay",
    title: "Software Development Engineer I",
    period: "Aug 2022 - Oct 2024",
    description: [
      "Led the end-to-end development and launch of Mastercard Biometric Authentication, demo'ed at GFP-2024, replacing 3DS-OTP authentication and increasing SR by 35%.",
      "Accelerated international expansion by slashed time-to-market for new geographies from 8-9 months to 1 month.",
      "Developed i18n-linter, a static code analysis tool reducing region-sensitive hard-coding errors by 87%.",
      "Contributed in Migration of Merchant Dashboard from Monolithic to Micro-frontend Architecture achieving a 67% reduction in build time (from 21 minutes to 7 minutes), cut UI runtime by 67% (from 15 minutes to 5 minutes), and decreased E2E test runtime by 70% (from 108 minutes to 32 minutes).",
      "Created India's first token lifecycle management system for 4 major banks, complying with RBI guidelines, enabling 8 tokenizations, delivering customized solutions to millions, and reducing risk exposure by 40%.",
    ],
  },
  {
    company: "Razorpay",
    title: "Frontend Engineer Intern",
    period: "May 2021 - Jul 2022",
    description: [
      "Cut payment dispute resolution time by 50%, reducing the average from 20 minutes to 10 minutes, and improving team efficiency.",
      "Revamped Shield UI, achieving a 33% surge in user engagement and reducing load time by 21%.",
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
                  <h3 className="text-xl font-bold text-gray-100">
                    {experience.title}
                  </h3>
                  <div className="mt-2 flex flex-col gap-1">
                    <p className="text-lg font-semibold text-blue-500">
                      {experience.company}
                    </p>
                    <p className="text-sm text-gray-400">{experience.period}</p>
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
                        {item}
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
