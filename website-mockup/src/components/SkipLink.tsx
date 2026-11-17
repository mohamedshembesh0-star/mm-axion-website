"use client";

import { useCopy } from "./Language";

export default function SkipLink() {
  const { t } = useCopy();
  return (
    <a
      href="#top"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[80] focus:bg-accent focus:px-4 focus:py-3 focus:text-bg"
    >
      {t.skip}
    </a>
  );
}
