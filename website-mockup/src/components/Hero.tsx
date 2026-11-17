"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import HashLink from "./HashLink";
import { useCopy } from "./Language";

export default function Hero() {
  const { t } = useCopy();
  const hero = t.hero;
  const root = useRef<HTMLElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || !inner.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.to(inner.current, {
        yPercent: -16,
        opacity: 0.22,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} data-section="top" className="relative isolate overflow-hidden px-5 pt-[4.5rem] pb-8">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_0%,rgb(63_208_194/0.16),transparent_52%)]" />
        <div className="hero-grid absolute inset-[-8%] opacity-50" />
      </div>
      <div ref={inner} className="mx-auto flex min-h-[calc(100svh-4.5rem)] w-full max-w-6xl flex-col justify-center gap-4 sm:gap-5">
        <p className="eyebrow">{hero.kicker}</p>
        <h1 className="display max-w-5xl text-[clamp(1.75rem,6.4vw,5.25rem)] text-ink">
          {hero.lines.map((line, index) => (
            <span className="line-mask" key={line}>
              <span className={`d${index + 1}`}>{line}</span>
            </span>
          ))}
        </h1>
        <div className="rule-in h-px w-28 bg-accent" />
        <p className="rise d4 max-w-xl text-base leading-snug text-ink-muted sm:text-lg sm:leading-relaxed">
          {hero.lede}
        </p>
        <div className="rise d5 flex flex-wrap gap-3">
          <HashLink href="#contact" className="btn btn-accent">
            {hero.primary}
          </HashLink>
          <HashLink href="#products" className="btn btn-ghost">
            {hero.secondary}
          </HashLink>
        </div>
        <div>
          <p className="text-sm text-ink-muted">{t.clients.heading}</p>
          <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
            {t.clients.items.map((client) => (
              <li key={client.name} className="text-sm text-ink">
                {client.name}
              </li>
            ))}
          </ul>
        </div>
        <dl className="grid grid-cols-2 gap-3 border-t border-line pt-4 sm:grid-cols-4 sm:gap-6 sm:pt-5">
          {hero.stats.map((stat) => (
            <div key={stat.label}>
              <dt className="display text-2xl text-accent sm:text-4xl">{stat.value}</dt>
              <dd className="mt-1 text-xs leading-snug text-ink-muted sm:text-sm">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
