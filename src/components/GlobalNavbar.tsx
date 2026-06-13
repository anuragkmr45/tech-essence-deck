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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled ? "bg-background/85 backdrop-blur-md" : "bg-transparent"
      )}
      aria-label="Primary"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Anurag Kumar
          </Link>

          <ul className="hidden md:flex items-center gap-8">
            {globalNavItems.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={cn(
                      "group relative text-sm transition-colors duration-300",
                      active ? "text-primary" : "text-muted-foreground hover:text-primary"
                    )}
                  >
                    {item.label}
                    <span
                      className={cn(
                        "absolute -bottom-1 left-0 h-px bg-primary transition-all duration-500",
                        active ? "w-full" : "w-0 group-hover:w-full"
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-500",
            isMenuOpen ? "max-h-80 pb-4" : "max-h-0"
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
                      "block px-2 py-3 text-sm transition-colors",
                      active ? "text-primary" : "text-muted-foreground hover:text-primary"
                    )}
                  >
                    {item.label}
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
