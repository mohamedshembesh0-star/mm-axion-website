"use client";

import type { ReactNode } from "react";
import { scrollToHash } from "./SmoothScroll";

export default function HashLink({
  href,
  className,
  children,
  onClick,
  mark,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  mark?: string;
}) {
  return (
    <a
      href={href}
      className={className}
      data-nav={mark}
      onClick={(event) => {
        onClick?.();
        if (!href.startsWith("#")) return;
        event.preventDefault();
        scrollToHash(href);
      }}
    >
      {children}
    </a>
  );
}
