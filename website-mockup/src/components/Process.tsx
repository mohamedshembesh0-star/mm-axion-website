"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useCopy } from "./Language";
import Reveal from "./Reveal";

export default function Process() {
  const { t } = useCopy();
  const root = useRef<HTMLElement>(null);
  const line = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    const bar = line.current;
    if (!el || !bar) return;
    if (prefersReducedMotion()) {
      bar.style.transform = "scaleY(1)";
      return;
    }
    const ctx = gsap.context(() => {
      gsap.set(bar, { scaleY: 0, transformOrigin: "top center" });
      gsap.to(bar, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 70%",
          end: "bottom 65%",
          scrub: true,
        },
      });
    }, el);
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-card]", el);
      cards.forEach((card, index) => {
        if (index === cards.length - 1) return;
        const face = card.querySelector("[data-face]");
        if (!face) return;
        gsap.to(face, {
          scale: 0.94,
          ease: "none",
          scrollTrigger: {
            trigger: cards[index + 1],
            start: "top 70%",
            end: "top 20%",
            scrub: true,
          },
        });
      });
    });
    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);

  return (
    <section id="process" data-section="process" ref={root} className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <h2 className="display max-w-3xl overflow-hidden text-4xl text-ink sm:text-6xl">
            <span className="clip-line block">{t.process.heading}</span>
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">{t.process.lede}</p>
        </Reveal>
        <div className="relative mt-14">
          <div className="absolute top-0 bottom-0 left-0 w-px bg-line" />
          <div
            ref={line}
            className="absolute top-0 bottom-0 left-0 w-px origin-top scale-y-0 bg-accent"
          />
          <ol className="space-y-12 pl-8 sm:pl-14">
            {t.process.steps.map((step, index) => (
              <li
                key={step.n}
                data-card
                className="md:sticky"
                style={{ top: `calc(5.5rem + ${index} * 0.85rem)` }}
              >
                <Reveal delay={index * 0.08}>
                  <article data-face className="origin-top bg-bg py-2 md:border md:border-line md:p-8">
                    <p className="text-sm font-semibold tracking-[0.18em] text-accent">
                      {step.n}
                    </p>
                    <h3 className="display mt-2 text-3xl text-ink sm:text-5xl">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-xl leading-relaxed text-ink-muted">
                      {step.body}
                    </p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
