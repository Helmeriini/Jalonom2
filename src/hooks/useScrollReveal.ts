"use client";

import { useEffect } from "react";

export const useScrollReveal = (): void => {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal"),
    );

    if (elements.length === 0) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Respect reduced motion immediately
    if (mediaQuery.matches) {
      for (const el of elements) {
        el.style.opacity = "1";
        el.style.transform = "none";
        el.style.filter = "none";
        el.classList.add("reveal-visible");
      }
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          const target = entry.target as HTMLElement;
          const delay = target.dataset.revealDelay;

          if (delay) {
            target.style.setProperty("--reveal-delay", `${delay}ms`);
          }

          target.classList.add("reveal-visible");
          obs.unobserve(target);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -12% 0px",
      },
    );

    for (const el of elements) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);
};
