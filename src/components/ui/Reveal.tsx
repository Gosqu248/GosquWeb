"use client";

import type { CSSProperties, ElementType, HTMLAttributes } from "react";
import { useInView } from "@/hooks/useInView";

type RevealProps = HTMLAttributes<HTMLElement> & {
  /** Tag renderowany zamiast div — ten sam element, ktory bylby tam bez Reveal, zeby nie psuc layoutu grida. */
  as?: "div" | "article" | "li";
  /** Opoznienie w ms, do rozlozenia wejscia kolejnych elementow listy w czasie. */
  delay?: number;
};

export function Reveal({ as = "div", delay = 0, className = "", style, children, ...rest }: RevealProps) {
  const Tag = as as ElementType;
  const [ref, inView] = useInView<HTMLElement>();

  const revealStyle: CSSProperties | undefined = delay ? { ...style, transitionDelay: `${delay}ms` } : style;
  const classes = ["reveal", inView && "reveal--visible", className].filter(Boolean).join(" ");

  return (
    <Tag ref={ref} className={classes} style={revealStyle} {...rest}>
      {children}
    </Tag>
  );
}
