"use client";

import { useCopy } from "./Language";
import Reveal from "./Reveal";

export default function Work() {
  const { t } = useCopy();
  const work = t.work;
  return (
    <section id="work" data-section="work" className="scroll-mt-24 border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <h2 className="display overflow-hidden text-4xl text-ink sm:text-6xl">
            <span className="clip-line block">{work.heading}</span>
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">{work.lede}</p>
        </Reveal>
        <Reveal className="mt-12 border border-line p-6 sm:p-10" delay={0.12}>
          <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">{work.badge}</p>
          <h3 className="display mt-4 text-4xl text-ink sm:text-6xl">{work.title}</h3>
          <p className="mt-3 text-sm tracking-[0.16em] text-ink-muted uppercase">{work.place}</p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">{work.body}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {work.tags.map((tag) => (
              <li key={tag} className="inline-flex min-h-11 items-center border border-line px-4 text-sm text-ink-muted">
                {tag}
              </li>
            ))}
          </ul>
          <a href={work.href} target="_blank" rel="noreferrer" className="btn btn-ghost mt-8">
            {work.cta}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
