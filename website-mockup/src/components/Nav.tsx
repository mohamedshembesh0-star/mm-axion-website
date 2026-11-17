"use client";

import { useEffect, useState } from "react";
import HashLink from "./HashLink";
import { LanguageSwitch, useCopy } from "./Language";

export default function Nav() {
  const { t } = useCopy();
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className={`border-b border-line/70 backdrop-blur-md transition-[height,background-color] duration-300 ${compact ? "bg-bg/95" : "bg-bg/80"}`}>
        <div className={`mx-auto flex max-w-[92rem] items-center justify-between gap-3 px-4 transition-[height] duration-300 ${compact ? "h-14" : "h-16"}`}>
          <HashLink href="#top" className="shrink-0 text-sm font-semibold tracking-tight text-ink">
            MM Axion
            <span className="ml-2 text-[10px] font-medium tracking-[0.18em] text-ink-faint uppercase">
              {t.preview}
            </span>
          </HashLink>
          <nav className="hidden min-w-0 items-center gap-0.5 2xl:flex" aria-label="Primary">
            {t.nav.map((item) => (
              <HashLink
                key={item.mark}
                href={item.href}
                mark={item.mark}
                className="inline-flex min-h-11 items-center px-2 text-[13px] text-ink-muted hover:text-ink"
              >
                {item.label}
              </HashLink>
            ))}
            <LanguageSwitch />
            <HashLink href="#contact" className="btn btn-accent ml-1">
              {t.book}
            </HashLink>
          </nav>
          <div className="flex items-center 2xl:hidden">
            <LanguageSwitch />
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center text-sm text-ink"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? t.close : t.menu}
          </button>
          </div>
        </div>
      </div>
      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="fixed inset-0 top-16 z-40 flex flex-col overflow-y-auto bg-bg px-5 py-4 2xl:hidden"
        >
          {t.nav.map((item) => (
            <HashLink
              key={item.mark}
              href={item.href}
              mark={item.mark}
              onClick={() => setOpen(false)}
              className="inline-flex min-h-11 items-center border-b border-line text-lg text-ink"
            >
              {item.label}
            </HashLink>
          ))}
          <HashLink href="#contact" onClick={() => setOpen(false)} className="btn btn-accent mt-6">
            {t.book}
          </HashLink>
        </nav>
      ) : null}
    </header>
  );
}
