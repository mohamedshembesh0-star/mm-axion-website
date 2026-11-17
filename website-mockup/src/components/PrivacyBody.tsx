"use client";

import Link from "next/link";
import { site } from "@/lib/content";
import { useCopy } from "./Language";

export default function PrivacyBody() {
  const { t, lang } = useCopy();
  const live = lang === "pl" ? site.livePl : site.live;
  return (
    <main id="top" className="mx-auto max-w-2xl px-5 pt-28 pb-20">
      <p className="eyebrow">{t.preview}</p>
      <h1 className="display mt-4 text-5xl text-ink">{t.privacy.heading}</h1>
      <div className="mt-8 space-y-4 leading-relaxed text-ink-muted">
        {t.privacy.paragraphs.map((paragraph) => (
          <p key={paragraph}>
            {paragraph.includes("mmaxionsolutions.com") ? (
              <>
                {paragraph.split("mmaxionsolutions.com")[0]}
                <a className="text-ink underline underline-offset-4" href={live}>
                  mmaxionsolutions.com
                </a>
                {paragraph.split("mmaxionsolutions.com")[1]}
              </>
            ) : (
              paragraph
            )}
          </p>
        ))}
      </div>
      <Link href="/" className="btn btn-ghost mt-10">
        {t.privacy.back}
      </Link>
    </main>
  );
}
