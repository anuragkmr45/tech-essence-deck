import { Github, Linkedin, Twitter, Mail, FileText } from "lucide-react";
import { personalInfo } from "@/data/portfolio";
import { Button } from "./ui/button";

// Lightweight hero — no border cage, no mono labels, type does the work
const Hero = () => {
  const socialLinks = [
    { icon: Github, href: personalInfo.github, label: "Github" },
    { icon: Linkedin, href: personalInfo.linkedin, label: "LinkedIn" },
    { icon: Twitter, href: personalInfo.twitter, label: "Twitter" },
    { icon: Mail, href: `mailto:${personalInfo.email}`, label: "Email" },
  ];

  return (
    <section
      className="relative w-full pt-12 md:pt-20 pb-20 md:pb-28"
      aria-label="Introduction"
    >
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        {/* Quiet role line */}
        <p className="mb-10 md:mb-14 text-sm text-muted-foreground/80 animate-fade-in">
          {personalInfo.role} &nbsp;·&nbsp; {personalInfo.location}
        </p>

        {/* Display headline */}
        <h1
          className="font-serif font-light text-foreground leading-[0.95] tracking-tight mb-10 md:mb-14 animate-fade-in"
          style={{ animationDelay: "100ms" }}
        >
          <span className="block text-6xl md:text-8xl lg:text-[9rem]">
            Anurag
          </span>
          <span
            className="block italic font-light text-5xl md:text-7xl lg:text-[7.5rem] text-primary/90 mt-1"
          >
            Kumar
          </span>
        </h1>

        {/* Tagline */}
        <p
          className="max-w-xl text-lg md:text-xl font-light leading-[1.75] text-muted-foreground mb-10 animate-fade-in"
          style={{ animationDelay: "250ms" }}
        >
          {personalInfo.tagline}
        </p>

        {/* CTAs + socials in one quiet row */}
        <div
          className="flex flex-wrap items-center gap-x-8 gap-y-5 animate-fade-in"
          style={{ animationDelay: "350ms" }}
        >
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              className="rounded-full px-6 py-5 bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium transition-all duration-300"
            >
              <a href="#projects">View projects</a>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="rounded-full px-6 py-5 text-foreground hover:bg-card text-sm font-medium transition-all duration-300"
            >
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <FileText className="h-3.5 w-3.5" />
                Resume
              </a>
            </Button>
          </div>

          <div className="flex items-center gap-5 ml-auto">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
                aria-label={`${social.label} (opens in new tab)`}
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
