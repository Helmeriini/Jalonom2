"use client";

import Lenis from "@studio-freight/lenis";

let lenis: Lenis | null = null;
let prefersReducedMotionCached: boolean | null = null;

function prefersReducedMotion(): boolean {
  if (prefersReducedMotionCached !== null) return prefersReducedMotionCached;
  prefersReducedMotionCached = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  return prefersReducedMotionCached;
}

export function initSmoothScroll(): Lenis | null {
  if (lenis) return lenis;

  if (prefersReducedMotion()) return null;

  lenis = new Lenis({
    duration: 0.6, // ↓ was ~1.15 — this is the biggest change
    easing: (t: number): number => 1 - Math.pow(1 - t, 4), // easeOutQuart (snappier than expo)
    smoothWheel: true,
    wheelMultiplier: 1.4, // ↑ faster response
    touchMultiplier: 1,
    infinite: false,
  });

  const raf = (time: number): void => {
    lenis?.raf(time);
    requestAnimationFrame(raf);
  };

  requestAnimationFrame(raf);

  return lenis;
}

export function destroySmoothScroll(): void {
  lenis?.destroy();
  lenis = null;
}

export function scrollToTarget(
  target: string | HTMLElement,
  options?: { offset?: number },
): void {
  const offset = options?.offset ?? 0;

  if (lenis) {
    lenis.scrollTo(target as Parameters<Lenis["scrollTo"]>[0], { offset });
    return;
  }

  if (typeof target === "string") {
    const hash = target.startsWith("#") ? target : `#${target}`;
    const el = document.querySelector(hash);
    if (!el) return;
    target = el as HTMLElement;
  }

  const top = Math.max(
    0,
    (target as HTMLElement).getBoundingClientRect().top +
      window.scrollY +
      offset,
  );
  window.scrollTo({
    top,
    behavior: prefersReducedMotion() ? "auto" : "smooth",
  });
}
