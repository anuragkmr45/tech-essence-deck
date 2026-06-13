import { Github, Linkedin, Twitter, Mail, FileText } from "lucide-react";
import { personalInfo } from "@/data/portfolio";
import { Button } from "./ui/button";

// Warm Archive hero — 12-col bordered grid with mono metadata column
const Hero = () => {
  const socialLinks = [
    { icon: Github, href: personalInfo.github, label: "Github" },
    { icon: Linkedin, href: personalInfo.linkedin, label: "LinkedIn" },
    { icon: Twitter, href: personalInfo.twitter, label: "Twitter" },
    { icon: Mail, href: `mailto:${personalInfo.email}`, label: "Email" },
  ];

  return (
    <section
      className="relative w-full"
      aria-label="Introduction"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="border border-walnut/70 border-t-0 bg-background/40">
          <div className="grid grid-cols-1 md:grid-cols-12">
            {/* Left — primary content (cols 1-8) */}
            <div className="md:col-span-8 p-8 md:p-14 lg:p-16 md:border-r border-walnut/70 md:border-b-0 border-b">
              {/* Role meta line */}
              <div className="mb-10 md:mb-14 flex items-center gap-4 animate-fade-in">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-walnut">
                  01 / Role
                </span>
                <span className="h-px w-10 bg-walnut" />
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-walnut">
                  {personalInfo.role}
                </span>
              </div>

              {/* Display headline — split with offset italic */}
              <h1
                className="font-serif font-normal text-foreground leading-[0.85] tracking-tight mb-10 md:mb-14 animate-fade-in"
                style={{ animationDelay: "100ms" }}
              >
                <span className="block text-6xl md:text-8xl lg:text-[10rem]">
                  Anurag
                </span>
                <span
                  className="block italic font-light text-5xl md:text-7xl lg:text-[8rem] ml-8 md:ml-24 lg:ml-40 mt-2"
                  style={{ fontVariationSettings: '"SOFT" 100' }}
                >
                  Kumar
                </span>
              </h1>

              {/* Tagline + CTAs */}
              <div
                className="max-w-md animate-fade-in"
                style={{ animationDelay: "250ms" }}
              >
                <p className="text-lg md:text-xl font-light leading-relaxed text-primary/80 mb-8">
                  {personalInfo.tagline}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    asChild
                    className="rounded-none px-7 py-6 bg-primary text-primary-foreground hover:bg-walnut hover:text-primary font-mono text-[11px] uppercase tracking-[0.22em] font-bold transition-all duration-500"
                  >
                    <a href="#projects">View Projects</a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-none px-7 py-6 border-walnut text-primary hover:bg-card hover:border-primary/60 font-mono text-[11px] uppercase tracking-[0.22em] font-bold transition-all duration-500"
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
              </div>
            </div>

            {/* Right — metadata column (cols 9-12) */}
            <div className="md:col-span-4 flex flex-col">
              {/* LOC_ID */}
              <div className="flex-1 p-8 md:p-10 border-b border-walnut/70 flex flex-col justify-end">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-walnut mb-3">
                  [ LOC_ID ]
                </span>
                <div className="font-sans text-sm uppercase tracking-[0.18em] text-foreground mb-1.5">
                  {personalInfo.location}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-walnut">
                  12° 58' 17" N / 77° 35' 40" E
                </div>
              </div>

              {/* CONNECT */}
              <div className="p-8 md:p-10 flex flex-col gap-5">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-walnut">
                  [ Connect ]
                </span>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-1" aria-label="Social links">
                  {socialLinks.map((social) => (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-primary/80 hover:text-primary border-b border-transparent hover:border-walnut transition-all"
                        aria-label={`${social.label} (opens in new tab)`}
                      >
                        <social.icon className="h-3 w-3 opacity-60 group-hover:opacity-100" />
                        {social.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Status footer bar */}
          <div className="border-t border-walnut/70 bg-card px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="h-1 w-1 bg-primary" />
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary/80">
                System: Operational
              </span>
            </div>
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-walnut">
              Est. 2021 — v3.0 Archive
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
