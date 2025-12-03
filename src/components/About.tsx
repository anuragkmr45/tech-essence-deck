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

      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          <span className="text-foreground">Back in 2021</span>, my journey started with a curiosity about how systems work under the hood, which evolved into a deep interest in real-time applications, offline-first architectures, and developer tooling.
        </p>

        <p className="text-muted-foreground leading-relaxed">
          Currently, I'm working as a Founding Engineer at{" "}
          <span className="text-foreground font-medium">Hexmon Technology</span>, where I architect and build enterprise-grade systems using Next.js, TypeScript, and PostgreSQL. I focus heavily on security—from{" "}
          <span className="text-foreground font-medium">rate limiting</span> and{" "}
          <span className="text-foreground font-medium">CSRF protection</span> to{" "}
          <span className="text-foreground font-medium">role-based access control</span> and cryptographic implementations.
        </p>

        <p className="text-muted-foreground leading-relaxed">
          My main focus these days is building secure, scalable products at{" "}
          <a
            href="#experience"
            className="text-foreground font-medium link-underline"
          >
            Hexmon Technology
          </a>
          . I most enjoy building software in the sweet spot where{" "}
          <span className="text-foreground">security meets user experience</span>
          —creating systems that are both robust and delightful to use.
        </p>

        <p className="text-muted-foreground leading-relaxed">
          When I'm not at the computer, I'm usually exploring new{" "}
          <span className="text-foreground font-medium">AI tools</span>, contributing to{" "}
          <a
            href="https://github.com/anuragkmr45"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground font-medium link-underline"
          >
            open-source projects
          </a>
          , or diving deep into system design patterns.
        </p>
      </div>
    </section>
  );
};

export default About;
