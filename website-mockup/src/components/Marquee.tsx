"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { useCopy } from "./Language";

export default function Marquee({
  source = "services",
  reverse = false,
}: {
  source?: "services" | "innovation" | "clients";
  reverse?: boolean;
}) {
  const { t } = useCopy();
  const words =
    source === "innovation"
      ? t.innovation.items.map((item) => item.title)
      : source === "clients"
        ? t.clients.items.map((item) => item.name)
        : t.services.items.map((item) => item.title);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el || prefersReducedMotion()) return;
    let x = 0;
    let half = 0;
    const measure = () => {
      half = el.scrollWidth / 2;
    };
    measure();
    const base = reverse ? 1.15 : -1.15;
    let vel = base;
    const st = ScrollTrigger.create({
      onUpdate(self) {
        const kick = Math.max(-3.2, Math.min(3.2, self.getVelocity() / 1200));
        vel = base - kick;
      },
    });
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    const tick = () => {
      if (!half) return;
      x += vel;
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      el.style.transform = `translate3d(${x}px,0,0)`;
    };
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      st.kill();
      window.removeEventListener("resize", onResize);
    };
  }, [reverse, words.join("|")]);

  const row = [...words, ...words];
  return (
    <div className="marquee border-y border-line" aria-hidden="true">
      <div ref={track} className="marquee-track">
        <ul className="flex items-center">
          {row.map((item, index) => (
            <li
              key={`${item}-${index}`}
              className={`display flex items-center gap-10 px-5 py-6 text-[clamp(2.2rem,6vw,4.75rem)] text-ink/85 ${
                index >= words.length ? "marquee-copy" : ""
              }`}
            >
              <span className="whitespace-nowrap">{item}</span>
              <span className="text-accent">·</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
