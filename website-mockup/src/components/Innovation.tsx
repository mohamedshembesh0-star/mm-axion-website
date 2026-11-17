"use client";

import { useCopy } from "./Language";
import Reveal from "./Reveal";

export default function Innovation() {
  const { t } = useCopy();
  return (
    <section id="innovation" data-section="innovation" className="scroll-mt-24 border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <p className="eyebrow">{t.innovation.kicker}</p>
          <h2 className="display mt-4 max-w-3xl overflow-hidden text-4xl text-ink sm:text-6xl">
            <span className="clip-line block">{t.innovation.heading}</span>
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">{t.innovation.lede}</p>
        </Reveal>
        <ul className="mt-12 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
          {t.innovation.items.map((item, index) => (
            <li key={item.title} className="bg-bg">
              <Reveal delay={index * 0.08} from={index % 2 ? "right" : "left"} className="h-full">
                <div className="lift h-full p-6 sm:p-8">
                  <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                  <p className="mt-3 max-w-md leading-relaxed text-ink-muted">{item.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
