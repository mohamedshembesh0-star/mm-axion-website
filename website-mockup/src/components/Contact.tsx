"use client";

import { useState } from "react";
import { site } from "@/lib/content";
import { useCopy } from "./Language";
import Reveal from "./Reveal";

export default function Contact() {
  const { t } = useCopy();
  const [error, setError] = useState("");

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const company = String(data.get("company") || "").trim();
    const message = String(data.get("message") || "").trim();
    if (!name || !email.includes("@") || message.length < 8) {
      setError(t.contact.error);
      return;
    }
    setError("");
    const lines = [
      `Name: ${name}`,
      `Email: ${email}`,
      company ? `Company: ${company}` : "",
      "",
      message,
    ]
      .filter((line, index, all) => line !== "" || all[index - 1] !== "")
      .join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      `${t.contact.subject} ${name}`,
    )}&body=${encodeURIComponent(lines)}`;
  }

  return (
    <section id="contact" data-section="contact" className="scroll-mt-24 border-t border-line py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-12">
        <Reveal className="lg:col-span-5" from="left">
          <h2 className="display overflow-hidden text-4xl text-ink sm:text-6xl">
            <span className="clip-line block">{t.contact.heading}</span>
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-ink-muted">{t.contact.lede}</p>
          <div className="mt-8 space-y-3">
            <a className="block min-h-11 text-ink hover:text-accent" href={`mailto:${site.email}`}>
              <span className="block text-xs tracking-[0.16em] text-ink-faint uppercase">{t.contact.email}</span>
              {site.email}
            </a>
            <a className="block min-h-11 text-ink hover:text-accent" href={site.phoneHref}>
              <span className="block text-xs tracking-[0.16em] text-ink-faint uppercase">{t.contact.phone}</span>
              {site.phone}
            </a>
          </div>
        </Reveal>
        <Reveal className="lg:col-span-7" delay={0.1} from="right">
        <form onSubmit={onSubmit} noValidate>
          <label className="block text-sm text-ink-muted">
            {t.contact.company}
            <input name="company" autoComplete="organization" className="field mt-2" />
          </label>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block text-sm text-ink-muted">
              {t.contact.name}
              <input name="name" autoComplete="name" required className="field mt-2" />
            </label>
            <label className="block text-sm text-ink-muted">
              {t.contact.emailField}
              <input name="email" type="email" autoComplete="email" required className="field mt-2" />
            </label>
          </div>
          <label className="mt-4 block text-sm text-ink-muted">
            {t.contact.message}
            <textarea name="message" required rows={5} className="field mt-2 resize-y" />
          </label>
          {error ? (
            <p role="alert" className="mt-4 text-sm text-accent">
              {error}
            </p>
          ) : null}
          <button type="submit" className="btn btn-accent mt-6">
            {t.contact.send}
          </button>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-faint">{t.contact.note}</p>
        </form>
        </Reveal>
      </div>
    </section>
  );
}
