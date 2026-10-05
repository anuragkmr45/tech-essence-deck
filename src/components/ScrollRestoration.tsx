"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ScrollRestoration = () => {
  const pathname = usePathname();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const hash = decodeURIComponent(window.location.hash.slice(1));
      const target = hash ? document.getElementById(hash) : null;

      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        return;
      }

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
};

export default ScrollRestoration;
