// Import skill icons
import reactIcon from "../assets/images/skills/react.png";
import tsIcon from "../assets/images/skills/ts.png";
import reduxIcon from "../assets/images/skills/redux.png";
import zustandIcon from "../assets/images/skills/zustand.png";
import jsIcon from "../assets/images/skills/js.png";
import htmlIcon from "../assets/images/skills/html.png";
import cssIcon from "../assets/images/skills/css.png";
import muiIcon from "../assets/images/skills/mui.png";
import bladeUiIcon from "../assets/images/skills/blade-ui.png";
import semanticUiIcon from "../assets/images/skills/semantic-ui.png";
import chakraUiIcon from "../assets/images/skills/chakra-ui.png";
import flaskIcon from "../assets/images/skills/flask.png";
import firebaseIcon from "../assets/images/skills/firebase.png";
import gitIcon from "../assets/images/skills/git.png";
import { StaticImageData } from "next/image";

export interface Skill {
  name: string;
  image: string | StaticImageData;
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
        image: reactIcon,
        experience: "4+ years",
      },
      {
        name: "TypeScript",
        image: tsIcon,
        experience: "3+ years",
      },
      {
        name: "Redux",
        image: reduxIcon,
        experience: "4+ years",
      },
      {
        name: "Zustand",
        image: zustandIcon,
        experience: "3+ years",
      },
      {
        name: "JavaScript",
        image: jsIcon,
        experience: "4+ years",
      },
      {
        name: "HTML",
        image: htmlIcon,
        experience: "6+ years",
      },
      {
        name: "CSS",
        image: cssIcon,
        experience: "6+ years",
      },
    ],
  },
  {
    name: "UI Templating Libraries",
    skills: [
      {
        name: "Material-UI",
        image: muiIcon,
        experience: "3+ years",
      },
      {
        name: "Blade UI",
        image: bladeUiIcon,
        experience: "2+ years",
      },
      {
        name: "Semantic UI",
        image: semanticUiIcon,
        experience: "2+ years",
      },
      {
        name: "Chakra UI",
        image: chakraUiIcon,
        experience: "2+ years",
      },
    ],
  },
  {
    name: "Backend Development",
    skills: [
      {
        name: "Flask",
        image: flaskIcon,
        experience: "2+ years",
      },
      {
        name: "Firebase",
        image: firebaseIcon,
        experience: "3+ years",
      },
    ],
  },
  {
    name: "Tools & Technologies",
    skills: [
      {
        name: "Git",
        image: gitIcon,
        experience: "5+ years",
      },
      {
        name: "Firebase",
        image: firebaseIcon,
        experience: "3+ years",
      },
    ],
  },
];
