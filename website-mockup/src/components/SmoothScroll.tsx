"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { LENIS_DURATION, lenisEasing } from "@/lib/motion";
import { gsap, ScrollTrigger } from "@/lib/gsap";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default function SmoothScroll() {
  useEffect(() => {
    const root = document.documentElement;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: LENIS_DURATION,
      easing: lenisEasing,
      smoothWheel: true,
      wheelMultiplier: 1,
      syncTouch: false,
    });
    window.__lenis = lenis;
    root.classList.add("lenis", "lenis-smooth");

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.__lenis = undefined;
      root.classList.remove("lenis", "lenis-smooth");
    };
  }, []);

  return null;
}

export function scrollToHash(hash: string) {
  const el = document.querySelector(hash);
  if (!el) return;
  if (window.__lenis) {
    window.__lenis.scrollTo(el as HTMLElement, {
      offset: -72,
      duration: 1.4,
      easing: lenisEasing,
    });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  history.pushState(null, "", hash);
}
