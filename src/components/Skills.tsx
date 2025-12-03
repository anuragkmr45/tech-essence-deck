import { skills, achievements, education } from "@/data/portfolio";
import { Code2, Trophy, Award, GraduationCap } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  code: Code2,
  trophy: Trophy,
  award: Award,
};

const Skills = () => {
  return (
    <section
      id="skills"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="Skills and achievements"
    >
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-foreground lg:sr-only">
          Skills
        </h2>
      </div>

      {/* Tech Stack */}
      <div className="mb-16">
        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-8">
          Tech Stack
        </h3>
        <div className="grid gap-8 sm:grid-cols-2">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-foreground font-medium text-sm mb-3">
                {category}
              </h4>
              <ul className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <li key={skill}>
                    <span className="tech-badge">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="mb-16">
        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-8">
          Achievements
        </h3>
        <div className="grid gap-6">
          {achievements.map((achievement, index) => {
            const Icon = iconMap[achievement.icon] || Code2;
            return (
              <div
                key={index}
                className="group flex gap-4 p-4 rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-foreground font-medium">
                    {achievement.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {achievement.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Education */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-8">
          Education
        </h3>
        <div className="space-y-6">
          {education.map((edu, index) => (
            <div
              key={index}
              className="group flex gap-4 p-4 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-foreground font-medium">{edu.degree}</h4>
                <p className="text-sm text-muted-foreground">
                  {edu.institution}, {edu.location}
                </p>
                <p className="text-xs text-primary mt-1">{edu.period}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
