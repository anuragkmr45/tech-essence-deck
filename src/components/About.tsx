const About = () => {
  return (
    <section
      id="about"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="About me"
    >
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-foreground lg:sr-only">
          About
        </h2>
      </div>

      <ul className="space-y-3 list-none">
        <li className="flex items-start gap-3 text-muted-foreground leading-relaxed">
          <span className="text-primary mt-1.5">▹</span>
          <span><span className="text-foreground">Back in 2021</span>, my journey started with a curiosity about how systems work under the hood — now I specialize in real-time applications, offline-first architectures, and developer tooling.</span>
        </li>

        <li className="flex items-start gap-3 text-muted-foreground leading-relaxed">
          <span className="text-primary mt-1.5">▹</span>
          <span>Currently working as a <span className="text-foreground font-medium">Founding Engineer at Hexmon Technology</span>, architecting enterprise-grade systems with Next.js, TypeScript, and PostgreSQL.</span>
        </li>

        <li className="flex items-start gap-3 text-muted-foreground leading-relaxed">
          <span className="text-primary mt-1.5">▹</span>
          <span>Focus heavily on security — <span className="text-foreground font-medium">rate limiting</span>, <span className="text-foreground font-medium">CSRF protection</span>, <span className="text-foreground font-medium">RBAC</span>, and cryptographic implementations.</span>
        </li>

        <li className="flex items-start gap-3 text-muted-foreground leading-relaxed">
          <span className="text-primary mt-1.5">▹</span>
          <span>Building software where <span className="text-foreground">security meets user experience</span> — creating systems that are both robust and delightful to use.</span>
        </li>

        <li className="flex items-start gap-3 text-muted-foreground leading-relaxed">
          <span className="text-primary mt-1.5">▹</span>
          <span>When I'm not coding, I'm exploring <span className="text-foreground font-medium">AI tools</span>, contributing to{" "}
            <a
              href="https://github.com/anuragkmr45"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground font-medium link-underline"
            >
              open-source projects
            </a>, or diving deep into system design patterns.</span>
        </li>
      </ul>
    </section>
  );
};

export default About;
