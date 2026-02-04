import { useState, useEffect } from "react";
import { Github, Linkedin, Twitter, Mail, FileText } from "lucide-react";
import { personalInfo, navItems } from "@/data/portfolio";
import FlipCard from "./FlipCard";
import { Button } from "./ui/button";

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.slice(1));
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const socialLinks = [
    { icon: Github, href: personalInfo.github, label: "GitHub" },
    { icon: Linkedin, href: personalInfo.linkedin, label: "LinkedIn" },
    { icon: Twitter, href: personalInfo.twitter, label: "Twitter" },
    { icon: Mail, href: `mailto:${personalInfo.email}`, label: "Email" },
  ];

  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24 lg:px-12">
      <div>
        {/* Profile Image with Flip Animation */}
        <div className="mb-8 animate-fade-in">
          <FlipCard />
        </div>

        {/* Name and Title */}
        <div className="mb-4">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            <a href="/" className="hover:text-primary transition-colors">
              {personalInfo.name}
            </a>
          </h1>
          <h2 className="mt-3 text-lg font-medium tracking-tight text-foreground sm:text-xl">
            {personalInfo.role}
          </h2>
          <p className="mt-4 max-w-xs leading-relaxed text-muted-foreground">
            {personalInfo.tagline}
          </p>
        </div>

        {/* View Resume Button */}
        <div className="mt-6 mb-8">
          <Button
            asChild
            variant="outline"
            className="group border-primary/50 hover:border-primary hover:bg-primary/10"
          >
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4 text-primary" />
              <span>View Resume</span>
            </a>
          </Button>
        </div>

        {/* Navigation */}
        <nav className="nav hidden lg:block mt-16" aria-label="In-page jump links">
          <ul className="w-max space-y-5">
            {navItems.map((item, index) => (
              <li 
                key={item.href}
                className="animate-slide-in-left"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <a
                  href={item.href}
                  className={`nav-link ${activeSection === item.href.slice(1) ? "active" : ""}`}
                >
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Social Links */}
      <ul 
        className="ml-1 mt-8 flex items-center gap-5" 
        aria-label="Social media"
      >
        {socialLinks.map((social, index) => (
          <li 
            key={social.label}
            className="animate-fade-in"
            style={{ animationDelay: `${(index + 5) * 100}ms` }}
          >
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon block p-1"
              aria-label={`${social.label} (opens in new tab)`}
            >
              <social.icon className="h-6 w-6" />
            </a>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Sidebar;
