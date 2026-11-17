"use client";

import { useCopy } from "./Language";
import Reveal from "./Reveal";

export default function About() {
  const { t } = useCopy();
  return (
    <section id="about" data-section="about" className="scroll-mt-24 border-t border-line py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-12">
        <Reveal className="lg:col-span-7" from="left">
          <h2 className="display overflow-hidden text-4xl text-ink sm:text-6xl">
            <span className="clip-line block">{t.about.heading}</span>
          </h2>
          <div className="mt-6 max-w-xl space-y-4 text-lg leading-relaxed text-ink-muted">
            {t.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>
        <Reveal className="lg:col-span-5" delay={0.12} from="right">
          <ul className="divide-y divide-line border-y border-line">
            {t.about.points.map((point) => (
              <li key={point} className="py-4 text-ink">
                {point}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
