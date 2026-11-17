"use client";

import { useCopy } from "./Language";
import Reveal from "./Reveal";

export default function Services() {
  const { t } = useCopy();
  return (
    <section id="services" data-section="services" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <h2 className="display max-w-3xl overflow-hidden text-4xl text-ink sm:text-6xl">
            <span className="clip-line block">{t.services.heading}</span>
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">{t.services.lede}</p>
        </Reveal>
        <ol className="mt-14">
          {t.services.items.map((service, index) => (
            <li key={service.title} className="border-t border-line last:border-b">
              <Reveal delay={index * 0.06} from={index % 2 ? "right" : "left"}>
                <div className="grid gap-3 py-8 md:grid-cols-12 md:items-baseline md:gap-8 md:py-10">
                  <div className="md:col-span-5">
                    <div className="rule mb-4 h-px w-14 bg-accent" />
                    <h3 className="display overflow-hidden text-3xl text-ink md:text-5xl">
                      <span className="clip-line block">{service.title}</span>
                    </h3>
                  </div>
                  <p className="max-w-md text-base leading-relaxed text-ink-muted md:col-span-6 md:col-start-7">
                    {service.body}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
