"use client";

import { useEffect, useRef } from "react";
import { site } from "@/lib/content";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import HashLink from "./HashLink";
import { useCopy } from "./Language";
import Reveal from "./Reveal";

export default function Footer() {
  const { t, lang } = useCopy();
  const live = lang === "pl" ? site.livePl : site.live;
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-letter]",
        { yPercent: 110 },
        {
          yPercent: 0,
          ease: "none",
          stagger: 0.04,
          scrollTrigger: {
            trigger: "[data-wordmark]",
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={root} className="overflow-hidden border-t border-line pt-12">
      <Reveal className="mx-auto max-w-6xl px-5">
        <p className="display text-3xl text-ink sm:text-5xl">{t.footer.tagline}</p>
        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          <div>
            <p className="text-sm font-semibold text-ink">{t.footer.services}</p>
            <ul className="mt-3 space-y-2">
              {t.services.items.slice(0, 5).map((item) => (
                <li key={item.title}>
                  <HashLink href="#services" className="inline-flex min-h-11 items-center text-sm text-ink-muted hover:text-ink">
                    {item.title}
                  </HashLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-ink">{t.footer.products}</p>
            <ul className="mt-3 space-y-2">
              {t.products.items.map((item) => (
                <li key={item.name}>
                  <a href={item.href} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center text-sm text-ink-muted hover:text-ink">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-ink">{t.footer.company}</p>
            <ul className="mt-3 space-y-2">
              {t.nav
                .filter((item) => ["about", "work", "clients", "contact"].includes(item.mark))
                .map((item) => (
                  <li key={item.mark}>
                    <HashLink href={item.href} className="inline-flex min-h-11 items-center text-sm text-ink-muted hover:text-ink">
                      {item.label}
                    </HashLink>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <p className="mt-10 text-sm leading-relaxed text-ink-muted">
          {t.footer.previewBefore}
          <a className="text-ink underline decoration-line underline-offset-4" href={live}>
            mmaxionsolutions.com
          </a>
          {t.footer.previewAfter}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ink-faint">
          <p>
            © {new Date().getFullYear()} MM Axion Solutions. {t.footer.rights}
          </p>
          <HashLink href="#neural" className="inline-flex min-h-11 items-center hover:text-ink">
            {t.neural.title}
          </HashLink>
          <a href="/privacy" className="inline-flex min-h-11 items-center hover:text-ink">
            {t.footer.privacy}
          </a>
        </div>
      </Reveal>
      <p
        data-wordmark
        aria-hidden="true"
        className="display mt-10 flex justify-center overflow-hidden px-2 pb-[0.08em] text-[clamp(4rem,18vw,14rem)] leading-[0.85] text-ink select-none"
      >
        {"AXION".split("").map((letter, index) => (
          <span key={index} data-letter className="inline-block">
            {letter}
          </span>
        ))}
      </p>
    </footer>
  );
}
