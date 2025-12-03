import { ArrowUpRight } from "lucide-react";
import { experience } from "@/data/portfolio";

const Experience = () => {
  return (
    <section
      id="experience"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="Work experience"
    >
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-foreground lg:sr-only">
          Experience
        </h2>
      </div>

      <div>
        <ol className="group/list">
          {experience.map((job, index) => (
            <li key={index} className="mb-12">
              <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-secondary/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />

                <header
                  className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:col-span-2"
                  aria-label={job.period}
                >
                  {job.period}
                </header>

                <div className="z-10 sm:col-span-6">
                  <h3 className="font-medium leading-snug text-foreground">
                    <div>
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-baseline font-medium leading-tight text-foreground hover:text-primary focus-visible:text-primary group/link text-base"
                        aria-label={`${job.title} at ${job.company}`}
                      >
                        <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
                        <span>
                          {job.title} ·{" "}
                          <span className="inline-block">
                            {job.company}
                            <ArrowUpRight className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" />
                          </span>
                        </span>
                      </a>
                    </div>
                    <div className="text-muted-foreground text-sm font-normal mt-0.5">
                      {job.location}
                    </div>
                  </h3>

                  <p className="mt-2 text-sm leading-normal text-muted-foreground">
                    {job.description}
                  </p>

                  <ul className="mt-3 space-y-1.5">
                    {job.bullets.map((bullet, bulletIndex) => (
                      <li
                        key={bulletIndex}
                        className="text-sm text-muted-foreground flex gap-2"
                      >
                        <span className="text-primary mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies used">
                    {job.technologies.map((tech) => (
                      <li key={tech}>
                        <span className="tech-badge">{tech}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12">
          <a
            href="/resume.pdf"
            className="inline-flex items-center font-medium leading-tight text-foreground group"
            aria-label="View Full Resume"
          >
            <span className="border-b border-transparent pb-px transition hover:border-primary group-hover:border-primary">
              View Full Résumé
            </span>
            <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Experience;
