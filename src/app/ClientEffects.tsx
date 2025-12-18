"use client";

import { useEffect } from "react";
import { destroySmoothScroll, initSmoothScroll } from "@/hooks/smooth-scroll";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function ClientEffects() {
  useScrollReveal();

  useEffect(() => {
    initSmoothScroll();
    return () => destroySmoothScroll();
  }, []);

  return null;
}
