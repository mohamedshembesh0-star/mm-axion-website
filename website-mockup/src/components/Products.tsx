"use client";

import { useCopy } from "./Language";
import Reveal from "./Reveal";

export default function Products() {
  const { t } = useCopy();
  return (
    <section id="products" data-section="products" className="scroll-mt-24 border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <h2 className="display max-w-3xl overflow-hidden text-4xl text-ink sm:text-6xl">
            <span className="clip-line block">{t.products.heading}</span>
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">{t.products.lede}</p>
        </Reveal>
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {t.products.items.map((product, index) => (
            <Reveal key={product.name} delay={index * 0.1} from={index % 2 ? "right" : "left"}>
              <article className="lift sheen flex h-full flex-col justify-between border border-line bg-surface p-6 sm:p-10">
                <div>
                  <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">{product.kicker}</p>
                  <h3 className="display mt-4 text-5xl text-ink sm:text-7xl">{product.name}</h3>
                  <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-muted">{product.body}</p>
                </div>
                <div className="mt-10 flex flex-wrap gap-3">
                  <a href={product.modules} className="btn btn-ghost" target="_blank" rel="noreferrer">
                    {t.products.explore}
                  </a>
                  <a href={product.href} className="btn btn-accent" target="_blank" rel="noreferrer">
                    {t.products.open}
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
