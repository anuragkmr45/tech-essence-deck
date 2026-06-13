import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Warm Archive nav — mono labels, hairline walnut borders, status pill
const globalNavItems = [
  { label: "Index", href: "/" },
  { label: "Works", href: "/projects" },
  { label: "Writing", href: "/writings" },
];

const GlobalNavbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const isActive = (href: string) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b",
        isScrolled
          ? "bg-background/90 backdrop-blur-md border-walnut/60"
          : "bg-background/40 backdrop-blur-sm border-walnut/30"
      )}
      aria-label="Primary"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex items-center justify-between h-14">
          {/* Logo block — mono serial + name */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
          >
            <span className="archive-bracket">[ 0.0 ]</span>
            <span className="font-sans text-sm font-bold uppercase tracking-[0.18em] text-foreground group-hover:text-primary transition-colors">
              Anurag Kumar
            </span>
          </Link>

          {/* Desktop nav — mono labels with serial on hover */}
          <ul className="hidden md:flex items-center gap-10">
            {globalNavItems.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={cn(
                      "group relative flex items-center gap-2 py-1 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors duration-300",
                      active ? "text-primary" : "text-muted-foreground hover:text-primary"
                    )}
                  >
                    <span
                      className={cn(
                        "text-walnut transition-colors duration-300",
                        active ? "text-primary/70" : "group-hover:text-primary/70"
                      )}
                    >
                      {item.serial}
                    </span>
                    <span>{item.label}</span>
                    <span
                      className={cn(
                        "absolute -bottom-0.5 left-0 h-px bg-primary transition-all duration-500",
                        active ? "w-full" : "w-0 group-hover:w-full"
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right — status pill (desktop) + mobile menu */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 border border-walnut rounded-full">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-primary/90">
                Available for hire
              </span>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-foreground rounded-none border border-walnut/60 hover:border-primary/60 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-500 border-t border-walnut/30",
            isMenuOpen ? "max-h-80 py-4" : "max-h-0 border-transparent"
          )}
        >
          <ul className="flex flex-col gap-1">
            {globalNavItems.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center gap-4 px-2 py-3 font-mono text-xs uppercase tracking-[0.22em] border-b border-walnut/30 transition-colors",
                      active ? "text-primary" : "text-muted-foreground hover:text-primary"
                    )}
                  >
                    <span className="text-walnut">{item.serial}</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default GlobalNavbar;
