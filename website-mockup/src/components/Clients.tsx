"use client";

import HashLink from "./HashLink";
import { useCopy } from "./Language";
import Reveal from "./Reveal";

export default function Clients() {
  const { t } = useCopy();
  return (
    <section id="clients" data-section="clients" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <h2 className="display max-w-3xl overflow-hidden text-4xl text-ink sm:text-6xl">
            <span className="clip-line block">{t.clients.heading}</span>
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">{t.clients.lede}</p>
        </Reveal>
        <ul className="mt-12 grid gap-px overflow-x-clip border border-line bg-line sm:grid-cols-2">
          {t.clients.items.map((client, index) => (
            <li key={client.name} className="bg-bg">
              <Reveal delay={index * 0.05} className="h-full p-6">
              {"href" in client && client.href ? (
                <a href={client.href} target="_blank" rel="noreferrer" className="text-lg font-semibold text-ink hover:text-accent">
                  {client.name}
                </a>
              ) : (
                <p className="text-lg font-semibold text-ink">{client.name}</p>
              )}
              <p className="mt-2 leading-relaxed text-ink-muted">{client.note}</p>
              </Reveal>
            </li>
          ))}
        </ul>
        <HashLink href="#contact" className="mt-10 inline-flex min-h-11 items-center text-ink underline decoration-line underline-offset-4 hover:text-accent">
          {t.clients.cta}
        </HashLink>
      </div>
    </section>
  );
}
