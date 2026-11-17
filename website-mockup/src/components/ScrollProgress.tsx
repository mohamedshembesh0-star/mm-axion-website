"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bar.current;
    if (!el || prefersReducedMotion()) return;
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        el.style.transform = `scaleX(${self.progress})`;
      },
    });
    return () => st.kill();
  }, []);

  return (
    <div
      ref={bar}
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 origin-left scale-x-0 bg-accent motion-reduce:hidden"
    />
  );
}
