"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = dot.current;
    if (!el || prefersReducedMotion()) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let x = 0;
    let y = 0;
    let tx = -100;
    let ty = -100;
    const move = (event: PointerEvent) => {
      tx = event.clientX;
      ty = event.clientY;
      el.style.opacity = "1";
    };
    window.addEventListener("pointermove", move);
    const tick = () => {
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    gsap.ticker.add(tick);
    return () => {
      window.removeEventListener("pointermove", move);
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <div
      ref={dot}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[55] hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#7ef9ff] opacity-0 md:block"
    />
  );
}
