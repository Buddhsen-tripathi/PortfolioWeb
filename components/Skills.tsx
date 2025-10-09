'use client'
import Marquee from 'react-fast-marquee'
import { SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiTailwindcss, SiNodedotjs, SiExpress, SiMongodb, SiAngular, SiCplusplus, SiDocker, SiFlask, SiGooglecloud, SiJenkins, SiKubernetes, SiMysql, SiNestjs, SiPostgresql, SiPython, SiSupabase, SiGithubactions, SiMocha, SiTensorflow, SiVuedotjs, SiPrometheus, SiFastapi, SiScikitlearn, SiRedux, SiRuby, SiRubyonrails} from 'react-icons/si'
import { FaAws, FaJava } from "react-icons/fa"
import { VscAzure } from "react-icons/vsc"

const FRONTEND_N_CICD_SKILLS = [
  { Icon: SiReact, name: "React" },
  { Icon: SiNextdotjs, name: "Next.js" },
  { Icon: SiVuedotjs, name: "Vue.js"},
  { Icon: SiRedux, name: "Redux" },
  { Icon: SiTypescript, name: "TypeScript" },
  { Icon: SiJavascript, name: "JavaScript" },
  { Icon: SiTailwindcss, name: "Tailwind CSS" },
  { Icon: SiAngular, name: "Angular" },
  { Icon: SiTensorflow, name: "Tensorflow" },
  { Icon: SiScikitlearn, name: "scikit-learn" },
  { Icon: SiJenkins, name: "Jenkins" },
  { Icon: SiGithubactions, name: "GitHub Actions" },
  { Icon: SiMocha, name: "Mocha" },
]

const BACKEND_DEVOPS_SKILLS = [
  { Icon: SiNodedotjs, name: "Node.js" },
  { Icon: SiNestjs, name: "NestJS" },
  { Icon: SiExpress, name: "Express" },
  { Icon: SiFlask, name: "Flask" },
  { Icon: SiMongodb, name: "MongoDB" },
  { Icon: SiPostgresql, name: "PostgreSQL" },
  { Icon: SiMysql, name: "MySQL" },
  { Icon: SiSupabase, name: "Supabase" },
  { Icon: SiDocker, name: "Docker" },
  { Icon: SiKubernetes, name: "Kubernetes" },
  { Icon: FaAws, name: "AWS" },
  { Icon: SiGooglecloud, name: "Google Cloud" },
  { Icon: VscAzure, name: "Azure" },
  { Icon: SiPrometheus, name: "Prometheus" },
  { Icon: SiFastapi, name: "FastAPI" },
  { Icon: SiJenkins, name: "Jenkins" },
  { Icon: FaJava, name: "Java" },
  { Icon: SiPython, name: "Python" },
  { Icon: SiRuby, name: "Ruby" },
  { Icon: SiRubyonrails, name: "Ruby on Rails" },
  { Icon: SiCplusplus, name: "C++" }
]

export default function Skills() {
  return (
    <>
      <h2 className="text-3xl font-bold mb-6 text-foreground">Skills</h2>
      <section className="my-8 space-y-6 bg-background p-2 transition-colors duration-300">
        {/* Frontend Skills */}
        <div className="relative overflow-hidden">
          <Marquee
            autoFill
            pauseOnHover
            pauseOnClick
            speed={20}
            className="[&>div]:flex [&>div]:items-center"
          >
            <SkillsList skills={FRONTEND_N_CICD_SKILLS} />
          </Marquee>
        </div>

        {/* Backend & DevOps Skills (Reversed Direction) */}
        <div className="relative overflow-hidden">
          <Marquee
            autoFill
            pauseOnHover
            pauseOnClick
            direction="right"
            speed={20}
            className="[&>div]:flex [&>div]:items-center"
          >
            <SkillsList skills={BACKEND_DEVOPS_SKILLS} />
          </Marquee>
        </div>
      </section>
    </>
  )
}

interface Skill {
  Icon: React.ComponentType<{ className?: string }>
  name: string
}

const SkillsList = ({ skills }: { skills: Skill[] }) => {
  return (
    <div className="flex items-center gap-4 px-4">
      {skills.map(({ Icon, name }, index) => (
        <div
          key={index}
          className="flex items-center gap-2 px-5 py-3 rounded-full border border-primary/60 dark:border-secondary/60 bg-secondary dark:bg-primary/80 text-secondary-foreground text-sm shadow-sm transition-colors duration-300 hover:bg-primary/30 dark:hover:bg-primary/60"
        >
          <Icon className="w-5 h-5" aria-label={name} />
          <span className="whitespace-nowrap">{name}</span>
        </div>
      ))}
    </div>
  )
}
