export interface Skill {
  name: string;
  image: string;
  experience: string;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Frontend Development",
    skills: [
      {
        name: "React",
        image: "/images/skills/react.svg",
        experience: "5+ years",
      },
      {
        name: "TypeScript",
        image: "/images/skills/typescript.svg",
        experience: "4+ years",
      },
      {
        name: "Next.js",
        image: "/images/skills/nextjs.svg",
        experience: "3+ years",
      },
      {
        name: "Tailwind CSS",
        image: "/images/skills/tailwind.svg",
        experience: "2+ years",
      },
    ],
  },
  {
    name: "Backend Development",
    skills: [
      {
        name: "Node.js",
        image: "/images/skills/nodejs.svg",
        experience: "4+ years",
      },
      {
        name: "GraphQL",
        image: "/images/skills/graphql.svg",
        experience: "3+ years",
      },
      {
        name: "PostgreSQL",
        image: "/images/skills/postgresql.svg",
        experience: "3+ years",
      },
    ],
  },
  {
    name: "Tools & Technologies",
    skills: [
      {
        name: "Git",
        image: "/images/skills/git.svg",
        experience: "5+ years",
      },
      {
        name: "Docker",
        image: "/images/skills/docker.svg",
        experience: "3+ years",
      },
      {
        name: "AWS",
        image: "/images/skills/aws.svg",
        experience: "2+ years",
      },
    ],
  },
];
