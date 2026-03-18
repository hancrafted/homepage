"use client";

import { useEffect, useId, useRef, useState } from "react";

type TestimonialItem = {
  name: string;
  role: string;
  quote: string;
  badge: string;
};

type TestimonialRailProps = {
  items: TestimonialItem[];
  ariaLabel: string;
  previousLabel: string;
  nextLabel: string;
  jumpLabel: string;
};

const SCROLL_END_TOLERANCE = 8;

export function TestimonialRail({
  items,
  ariaLabel,
  previousLabel,
  nextLabel,
  jumpLabel,
}: TestimonialRailProps) {
  const railId = useId();
  const railRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canPrevious, setCanPrevious] = useState(false);
  const [canNext, setCanNext] = useState(items.length > 1);

  useEffect(() => {
    const rail = railRef.current;

    if (!rail) {
      return;
    }

    const updateScrollState = () => {
      setCanPrevious(rail.scrollLeft > SCROLL_END_TOLERANCE);
      setCanNext(rail.scrollLeft + rail.clientWidth < rail.scrollWidth - SCROLL_END_TOLERANCE);
    };

    updateScrollState();

    rail.addEventListener("scroll", updateScrollState, { passive: true });

    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(rail);

    return () => {
      rail.removeEventListener("scroll", updateScrollState);
      resizeObserver.disconnect();
    };
  }, [items.length]);

  useEffect(() => {
    const rail = railRef.current;
    const nodes = itemRefs.current.filter((node): node is HTMLLIElement => node !== null);

    if (!rail || nodes.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

        if (!mostVisible) {
          return;
        }

        const index = Number((mostVisible.target as HTMLLIElement).dataset.index);

        if (Number.isFinite(index)) {
          setActiveIndex(index);
        }
      },
      {
        root: rail,
        threshold: [0.45, 0.7, 0.9],
      },
    );

    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, [items.length]);

  const scrollToIndex = (index: number) => {
    const target = itemRefs.current[index];

    if (!target || typeof window === "undefined") {
      return;
    }

    const behavior: ScrollBehavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";

    target.scrollIntoView({
      behavior,
      inline: "start",
      block: "nearest",
    });
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm leading-6 text-[var(--color-muted)]">{jumpLabel}</p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="ghost-control min-h-11 w-11 px-0"
            onClick={() => scrollToIndex(Math.max(activeIndex - 1, 0))}
            disabled={!canPrevious}
            aria-controls={railId}
            aria-label={previousLabel}
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            className="ghost-control min-h-11 w-11 px-0"
            onClick={() => scrollToIndex(Math.min(activeIndex + 1, items.length - 1))}
            disabled={!canNext}
            aria-controls={railId}
            aria-label={nextLabel}
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <ul
        id={railId}
        ref={railRef}
        className="no-scrollbar flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-px-1"
        aria-label={ariaLabel}
      >
        {items.map((item, index) => (
          <li
            key={`${item.name}-${item.role}`}
            ref={(node) => {
              itemRefs.current[index] = node;
            }}
            data-index={index}
            className="w-[min(21rem,calc(100vw-2rem))] shrink-0 snap-start sm:w-[21rem] lg:w-[22rem]"
          >
            <article className="flex h-full flex-col justify-between rounded-[1.5rem] border bg-[var(--color-bg)] p-6 shadow-[var(--shadow-card)]">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-base font-semibold text-[var(--color-fg)]">{item.name}</p>
                    <p className="text-sm text-[var(--color-muted)]">{item.role}</p>
                  </div>
                  <span className="rounded-full bg-[var(--color-accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--color-accent)]">
                    {item.badge}
                  </span>
                </div>
                <p className="text-sm leading-7 text-[var(--color-muted)] md:text-base">
                  <span aria-hidden="true" className="mr-2 text-xl font-semibold text-[var(--color-accent)]">
                    “
                  </span>
                  {item.quote}”
                </p>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap items-center gap-2" aria-label={jumpLabel}>
        {items.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={`${item.name}-${index}`}
              type="button"
              className={`h-3 w-3 rounded-full border ${
                isActive
                  ? "border-[var(--color-accent)] bg-[var(--color-accent)]"
                  : "border-[var(--color-border)] bg-[var(--color-bg)]"
              }`}
              onClick={() => scrollToIndex(index)}
              aria-controls={railId}
              aria-label={`${jumpLabel} ${index + 1}`}
              aria-pressed={isActive}
            />
          );
        })}
      </div>
    </div>
  );
}