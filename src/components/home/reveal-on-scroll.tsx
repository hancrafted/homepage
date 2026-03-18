"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef } from "react";

type RevealOnScrollProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
};

export function RevealOnScroll({
  children,
  className = "",
  delay = 0,
  threshold = 0.18,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;

    if (!node || typeof window === "undefined") {
      return;
    }

    document.documentElement.dataset.js = "true";

    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const isInitiallyVisible = node.getBoundingClientRect().top < viewportHeight * 0.92;

    if (isInitiallyVisible) {
      return;
    }

    node.dataset.revealState = "pending";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          node.dataset.revealState = "visible";
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [threshold]);

  const style = {
    "--reveal-delay": `${delay}ms`,
  } as CSSProperties;

  return (
    <div
      ref={ref}
      className={`reveal-on-scroll ${className}`.trim()}
      data-reveal-state="visible"
      style={style}
    >
      {children}
    </div>
  );
}