import { Github, Linkedin, Twitter, Mail, FileText, MapPin } from "lucide-react";
import { personalInfo } from "@/data/portfolio";
import FlipCard from "./FlipCard";
import { Button } from "./ui/button";

const Hero = () => {
  const socialLinks = [
    { icon: Github, href: personalInfo.github, label: "GitHub" },
    { icon: Linkedin, href: personalInfo.linkedin, label: "LinkedIn" },
    { icon: Twitter, href: personalInfo.twitter, label: "Twitter" },
    { icon: Mail, href: `mailto:${personalInfo.email}`, label: "Email" },
  ];

  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center text-center py-20">
      {/* Main Hero Text with Inline Image */}
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-foreground leading-[1.05] tracking-tight animate-fade-in">
          <span className="text-muted-foreground italic font-normal">Hey, I'm</span>{" "}
          <span className="inline-flex items-center gap-3">
            <FlipCard size="inline" />
            <span className="text-foreground">{personalInfo.name}</span>
          </span>
        </h1>

        <h2 className="mt-6 text-xl sm:text-2xl md:text-3xl font-medium animate-fade-in" style={{ animationDelay: "100ms" }}>
          <span className="text-primary">a {personalInfo.role.toLowerCase()}</span>
        </h2>

        <div className="mt-4 flex items-center justify-center gap-2 text-muted-foreground animate-fade-in" style={{ animationDelay: "150ms" }}>
          <MapPin className="h-4 w-4 text-primary" />
          <span>based in {personalInfo.location}</span>
        </div>

        <p className="mt-8 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: "200ms" }}>
          {personalInfo.tagline}
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "300ms" }}>
          <Button
            asChild
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-6"
          >
            <a href="#projects">View Projects</a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-primary/50 hover:border-primary hover:bg-primary/10"
          >
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              <span>View Resume</span>
            </a>
          </Button>
        </div>

        {/* Social Links */}
        <ul
          className="mt-10 flex items-center justify-center gap-4 animate-fade-in"
          style={{ animationDelay: "400ms" }}
          aria-label="Social media"
        >
          {socialLinks.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary/50 text-muted-foreground hover:text-primary hover:bg-secondary transition-all duration-200"
                aria-label={`${social.label} (opens in new tab)`}
              >
                <social.icon className="h-5 w-5" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
