import { ArrowUpRight, MapPin, Calendar } from "lucide-react";
import { experience } from "@/data/portfolio";
import { useEffect, useRef, useState } from "react";

const Experience = () => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set([...prev, index]));
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experience"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="Work experience"
    >
      {/* Section Header */}
      <div className="mb-14">
        <p className="text-sm text-muted-foreground/80 mb-4">Experience</p>
        <h2 className="section-title">
          <span className="italic font-light">Selected</span> trajectory
        </h2>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-0 md:left-1/3 top-0 bottom-0 w-px bg-secondary ml-3 md:ml-0 hidden md:block" />

        <ol className="space-y-12 md:space-y-0">
          {experience.map((job, index) => (
            <li
              key={index}
              ref={(el) => (itemRefs.current[index] = el)}
              data-index={index}
              className={`relative md:grid md:grid-cols-3 md:gap-8 transition-all duration-700 ${
                visibleItems.has(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Left Side - Sticky Info */}
              <div className="md:sticky md:top-24 md:self-start md:pr-8 md:text-right mb-4 md:mb-0">
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/3 w-7 h-7 -ml-0.5 md:-ml-3.5 rounded-full bg-background border-2 border-primary flex items-center justify-center z-10 hidden md:flex">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                </div>

                {/* Duration */}
                <div className="flex items-center gap-2 md:justify-end text-primary font-semibold mb-2">
                  <Calendar className="h-4 w-4 md:order-2" />
                  <span className="text-sm">{job.period}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-foreground mb-1">
                  {job.title}
                </h3>

                {/* Company */}
                <a
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-foreground hover:text-primary transition-colors font-medium"
                >
                  {job.company}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>

                {/* Location */}
                <div className="flex items-center gap-1.5 md:justify-end text-muted-foreground text-sm mt-1">
                  <MapPin className="h-3.5 w-3.5 md:order-2" />
                  <span>{job.location}</span>
                </div>
              </div>

              {/* Right Side - Details */}
              <div className="md:col-span-2 md:pl-8 md:border-l border-secondary/50">
                <div className="bg-secondary/30 rounded-lg p-5 hover:bg-secondary/50 transition-colors">
                  <p className="text-sm text-muted-foreground mb-4">
                    {job.description}
                  </p>

                  {/* Bullet Points */}
                  <ul className="space-y-3 mb-5">
                    {job.bullets.map((bullet, bulletIndex) => (
                      <li
                        key={bulletIndex}
                        className={`text-sm text-muted-foreground flex gap-3 transition-all duration-500 ${
                          visibleItems.has(index)
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 -translate-x-4"
                        }`}
                        style={{
                          transitionDelay: `${index * 100 + bulletIndex * 75}ms`,
                        }}
                      >
                        <span className="text-primary mt-1">▹</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <ul
                    className="flex flex-wrap gap-2"
                    aria-label="Technologies used"
                  >
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

        {/* View Resume Link */}
        <div className="mt-12 text-center md:text-left md:ml-[33.33%] md:pl-8">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
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
