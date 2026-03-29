import { StaticImageData } from "next/image";
import razorpayLogo from "../assets/images/logos/razorpay-logo.png";
import gfgLogo from "../assets/images/logos/gfg-logo.png";
import ripplingLogo from "../assets/images/logos/rippling-logo.png";
import acciojobLogo from "../assets/images/logos/acciojob.jpeg";
import airtribeLogo from "../assets/images/logos/airtribe.png";
import correlationsLogo from "../assets/images/logos/correlations.png";
import taghiveLogo from "../assets/images/logos/taghive.jpg";

// Media imports
import espritDeCorp1 from "../assets/media/espirit_de_corp_rzp.jpeg";
import espritDeCorp2 from "../assets/media/espirit_de_corp_rzp_2.jpeg";
import winnerOfWeek from "../assets/media/winner_of_the_week_rzp.jpeg";
import rzpInternCert from "../assets/media/rzp_internship_cert.jpeg";
import gfgInternCert from "../assets/media/gfg_internship_cert.png";
import correlationsInternCert from "../assets/media/correlations_ai_internship_certificate.png";
import taghiveInternCert from "../assets/media/Taghive_internship_cert.png";

interface MediaItem {
  src: StaticImageData;
  caption: string;
}

interface PreviousRole {
  position: string;
  duration: string;
  description: string;
  achievements: string[];
  media?: MediaItem[];
}

interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string;
  achievements?: string[];
  previousRoles?: PreviousRole[];
  logo: string | StaticImageData;
  technologies?: string[];
  media?: MediaItem[];
}

export const experiences: Experience[] = [
  {
    company: "Rippling",
    position: "Software Engineer II - L6",
    duration: "Jun 2025 - Present",
    description:
      "Web Infrastructure team - CI/CD pipelines, developer tooling, and observability.",
    achievements: [
      "Migrated package auth from hardcoded tokens to AWS CodeArtifact (dual-registry) and later AWS Secrets Manager, with auto-recovery and phased rollout - zero developer downtime.",
      "Built a Flakiness Detection System - runs E2E suite N times against green commits, computes statistical flakiness scores, and generates HTML dashboards with Datadog integration.",
      "Upgraded E2E observability from module-level failure counts to test-level structured logs in Datadog with error context, video URLs, and retry data.",
      "Redesigned route attribution from string matching to object-based query parameter comparison - order-independent, extra-param tolerant, fully backward compatible.",
      "Automated weekly on-call analytics via a stateless ETL pipeline (Buildkite + Slack API) - TTFR by timezone, query distribution, and shadow support tracking.",
      "Designed an automated E2E test unskip workflow with hybrid triggers (PR file changes + scheduled CI sweep) - tests re-enabled only after N consecutive passes.",
    ],
    logo: ripplingLogo,
    technologies: ["React", "TypeScript", "AWS", "Datadog", "Buildkite", "Playwright", "Slack API"],
  },
  {
    company: "Razorpay",
    position: "Senior Frontend Engineer",
    duration: "May 2021 - Jun 2025",
    description:
      "International expansion, i18n infrastructure, and payment authentication across Malaysia, Singapore, and India.",
    achievements: [
      "Led the frontend charter for Razorpay's expansion into Malaysia and Singapore, enabling 530 merchant activations and 80M MYR monthly GMV by integrating region-specific payment methods.",
      "Built and open-sourced @razorpay/i18nify-js SDK (100K+ weekly downloads), adopted by 27+ teams across Razorpay for locale-specific formatting and validation.",
      "Designed modular i18n component architecture integrated with Blade UI, supporting RTL, region-aware tokens, and plug-and-play customization adopted by 19+ product teams.",
      "Migrated i18n SDK from Webpack to Rollup, enabling better tree-shaking and reducing final bundle size by 30%.",
      "Awarded Esprit De Corps (twice) for outstanding contributions to the company.",
    ],
    logo: razorpayLogo,
    technologies: ["React", "TypeScript", "Rollup", "Blade UI", "Playwright", "Jest"],
    media: [
      { src: espritDeCorp1, caption: "Esprit De Corps Award" },
      { src: espritDeCorp2, caption: "Esprit De Corps Award" },
      { src: winnerOfWeek, caption: "Winner of the Week" },
    ],
    previousRoles: [
      {
        position: "Software Development Engineer",
        duration: "Aug 2022 - Oct 2024",
        description:
          "Payment authentication, tokenization, and frontend infrastructure.",
        achievements: [
          "Built Mastercard Biometric Authentication from scratch; demoed at GFF 2024, improved success rate by 35% over 3DS OTP, and increased card payments by 33%.",
          "Slashed time-to-market for new geography launches from 8-9 months to 1 month by building reusable internationalization layers.",
          "Built HawkAI, an LLM-based static analysis tool to detect non-localized logic and region-specific hardcoding with 97.3% accuracy, now used across 7+ frontend teams.",
          "Migrated Merchant Dashboard to micro-frontend architecture, reducing build time by 67%, unit test runtime by 67%, and E2E test runtime by 70%.",
          "Developed India's first token lifecycle system for 4 major banks, enabling 8L+ tokenizations and reducing risk exposure by 40%.",
        ],
      },
      {
        position: "Frontend Engineer Intern",
        duration: "May 2021 - Jul 2022",
        description:
          "Payment disputes and fraud detection UI for RazorpayX.",
        achievements: [
          "Cut payment dispute resolution time by 50%, reducing the average from 20 minutes to 10 minutes.",
          "Revamped Shield UI, achieving a 33% surge in user engagement and reducing load time by 21%.",
        ],
        media: [
          { src: rzpInternCert, caption: "Internship Certificate" },
        ],
      },
    ],
  },
  {
    company: "AccioJob",
    position: "React & Redux Instructor",
    duration: "Jan 2023 - May 2025",
    description:
      "Freelance instructor teaching frontend development from HTML/CSS/JS through advanced React, state management, and modern frontend patterns.",
    achievements: undefined,
    logo: acciojobLogo,
    technologies: ["React", "Redux", "JavaScript", "HTML", "CSS"],
  },
  {
    company: "Airtribe",
    position: "Full Stack Mentor",
    duration: "Apr 2024 - Oct 2024",
    description:
      "Mentored 100+ students preparing for frontend and backend roles. Invited as Jury Member for a Tech-AI Hackathon held in Bangalore.",
    achievements: undefined,
    logo: airtribeLogo,
    technologies: ["React", "Node.js", "JavaScript", "TypeScript"],
  },
  {
    company: "GeeksforGeeks",
    position: "Technical Content Writer Intern",
    duration: "Oct 2020 - Aug 2021",
    description:
      "Published 11+ technical articles and enhanced 2 existing ones covering Linked Lists, Python, Git, ReactJS, Firestore, Flask, and more.",
    achievements: undefined,
    logo: gfgLogo,
    technologies: ["Python", "ReactJS", "Flask", "Git"],
    media: [
      { src: gfgInternCert, caption: "Internship Certificate" },
    ],
  },
  {
    company: "Correlations.ai",
    position: "SWE Intern",
    duration: "Dec 2020 - Feb 2021",
    description:
      "Worked on Login Infrastructure and Mail Templating Services using ReactJS, Flask, and MongoDB.",
    achievements: undefined,
    logo: correlationsLogo,
    technologies: ["ReactJS", "Flask", "MongoDB"],
    media: [
      { src: correlationsInternCert, caption: "Internship Certificate" },
    ],
  },
  {
    company: "TagHive Inc.",
    position: "Android Developer Intern",
    duration: "Aug 2020 - Oct 2020",
    description:
      "Contributed to the Android development of Class Saathi, an ed-tech app by TagHive (South Korea).",
    achievements: undefined,
    logo: taghiveLogo,
    technologies: ["Android", "Java"],
    media: [
      { src: taghiveInternCert, caption: "Internship Certificate" },
    ],
  },
] as const;
