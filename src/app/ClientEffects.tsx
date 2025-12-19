"use client";

import { useEffect, useLayoutEffect } from "react";
import { destroySmoothScroll, initSmoothScroll } from "@/hooks/smooth-scroll";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function ClientEffects() {
  useScrollReveal();

  // Lock scroll restoration and force top before first paint to avoid landing offset after intro.
  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    initSmoothScroll();
    return () => destroySmoothScroll();
  }, []);

  return null;
}
