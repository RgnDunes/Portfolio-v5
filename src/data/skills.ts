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
        name: "ReactJS",
        image: "/images/skills/react.png",
        experience: "4+ years",
      },
      {
        name: "TypeScript",
        image: "/images/skills/ts.png",
        experience: "3+ years",
      },
      {
        name: "Redux",
        image: "/images/skills/redux.png",
        experience: "4+ years",
      },
      {
        name: "Zustand",
        image: "/images/skills/zustand.png",
        experience: "3+ years",
      },
      {
        name: "JavaScript",
        image: "/images/skills/js.png",
        experience: "4+ years",
      },
      {
        name: "HTML",
        image: "/images/skills/html.png",
        experience: "6+ years",
      },
      {
        name: "CSS",
        image: "/images/skills/css.png",
        experience: "6+ years",
      },
    ],
  },
  {
    name: "UI Templating Libraries",
    skills: [
      {
        name: "Material-UI",
        image: "/images/skills/mui.png",
        experience: "3+ years",
      },
      {
        name: "Blade UI",
        image: "/images/skills/blade-ui.png",
        experience: "2+ years",
      },
      {
        name: "Semantic UI",
        image: "/images/skills/semantic-ui.png",
        experience: "2+ years",
      },
      {
        name: "Chakra UI",
        image: "/images/skills/chakra-ui.png",
        experience: "2+ years",
      },
    ],
  },
  {
    name: "Backend Development",
    skills: [
      {
        name: "Flask",
        image: "/images/skills/flask.png",
        experience: "2+ years",
      },
      {
        name: "Firebase",
        image: "/images/skills/firebase.png",
        experience: "3+ years",
      },
    ],
  },
  {
    name: "Tools & Technologies",
    skills: [
      {
        name: "Git",
        image: "/images/skills/git.png",
        experience: "5+ years",
      },
      {
        name: "Firebase",
        image: "/images/skills/firebase.png",
        experience: "3+ years",
      },
    ],
  },
];
