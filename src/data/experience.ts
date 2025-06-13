import { StaticImageData } from "next/image";
import razorpayLogo from "../assets/images/logos/razorpay-logo.png";
import gfgLogo from "../assets/images/logos/gfg-logo.png";
import ripplingLogo from "../assets/images/logos/rippling-logo.png";

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
  achievements?: string[];
  previousRoles?: PreviousRole[];
  logo: string | StaticImageData;
}

export const experiences: Experience[] = [
  {
    company: "Rippling",
    position: "Senior Frontend Engineer - L6",
    duration: "2025 - Present",
    description: "Stay tuned...",
    achievements: undefined,
    logo: ripplingLogo,
  },
  {
    company: "Razorpay",
    position: "Senior Frontend Engineer",
    duration: "2021 - 2025",
    description:
      "Leading frontend development for international expansion, focusing on Southeast Asian markets. Spearheading i18n initiatives and performance optimizations.",
    achievements: [
      "Led a team to launch Razorpay in Malaysia by adding local payment options and solving language and region-related challenges, helping 530 businesses go live with 80M MYR in monthly transactions.",
      "Contributed to Razorpay's Singapore launch, processing 88K SGD in the first week of April and projecting 3x growth over March, with 4 new merchants onboarded and 10 MTUs live — led by Golftripz at 62K SGD.",
      "Leading the development of i18nify-js, an open-source internationalization SDK by Razorpay, designed to simplify locale handling across web applications.",
      "Awarded with `Esprit De Corps` award twice for my contribution to the company.",
    ],
    logo: razorpayLogo,
    previousRoles: [
      {
        position: "Software Development Engineer I",
        duration: "2022 - 2024",
        description:
          "From OTP to Biometric, 8L+ Tokens & 1-Month Global Launches",
        achievements: [
          "Led the end-to-end development and launch of Mastercard Biometric Authentication, demo'ed at GFF-2024, replacing 3DS OTP authentication and increasing SR by 35%.",
          "Accelerated international expansion by slashed time-to-market for new geographies from 8-9 months to 1 month.",
          "Built India's first token lifecycle management system for 4 major banks, complying with RBI guidelines, enabling 8 lac tokenizations, delivering customized solutions to millions, and reducing risk exposure by 40%",
          "Achieved 99.78% unit test coverage for i18nify-js.",
        ],
      },
      {
        position: "Frontend Engineer Intern",
        duration: "2021 - 2022",
        description:
          "Developed key features for RazorpayX using React and TypeScript",
        achievements: [
          "Cut payment dispute resolution time by 50% , reducing the average from 20 minutes to 10 minutes, and improving team efficiency.",
          "Revamped Shield UI, achieving a 33% surge in user engagement and reducing load time by 21%",
        ],
      },
    ],
  },
  {
    company: "GeeksforGeeks",
    position: "Technical Content Writer Intern",
    duration: "Oct 2020 - Aug 2021",
    description:
      "Published 11+ technical articles and enhanced 2 existing ones on GeeksforGeeks covering Linked Lists, Python, Git, ReactJS, Firestore, Flask, and more.",
    achievements: undefined,
    logo: gfgLogo,
  },
] as const;
