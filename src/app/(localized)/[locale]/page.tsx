import type { CSSProperties } from "react";

import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { RevealOnScroll } from "@/components/home/reveal-on-scroll";
import { TestimonialRail } from "@/components/home/testimonial-rail";
import { getSiteContent } from "@/content/site-content";
import { buildPageMetadata } from "@/lib/seo";
import { isLocale, type Locale } from "@/lib/i18n/config";

const testimonialUiCopy: Record<
  Locale,
  { previous: string; next: string; jump: string; moreDetail: string }
> = {
  de: {
    previous: "Vorherige Referenz",
    next: "Nächste Referenz",
    jump: "Horizontal scrollen oder mit den Pfeilen durch die Referenzen gehen.",
    moreDetail: "Mehr Details",
  },
  en: {
    previous: "Previous reference",
    next: "Next reference",
    jump: "Scroll horizontally or use the arrow controls to review all references.",
    moreDetail: "More detail",
  },
  zh: {
    previous: "上一条参考评价",
    next: "下一条参考评价",
    jump: "可横向滚动，或使用箭头逐条查看全部参考评价。",
    moreDetail: "展开细节",
  },
};

const serviceCardStyles = [
  {
    background: "color-mix(in srgb, var(--color-accent-soft) 55%, white)",
    borderColor: "color-mix(in srgb, var(--color-accent) 28%, var(--color-border))",
  },
  {
    background: "color-mix(in srgb, var(--color-surface-strong) 78%, white)",
    borderColor: "color-mix(in srgb, var(--color-accent) 18%, var(--color-border))",
  },
  {
    background: "color-mix(in srgb, var(--color-surface) 82%, white)",
    borderColor: "color-mix(in srgb, var(--color-accent) 14%, var(--color-border))",
  },
] satisfies CSSProperties[];

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;

  return isLocale(locale) ? buildPageMetadata(locale, "home") : {};
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const copy = getSiteContent(locale);
  const uiCopy = testimonialUiCopy[locale];
  const heroStats = [
    {
      value: String(copy.home.testimonials.items.length).padStart(2, "0"),
      label: copy.home.testimonials.label,
    },
    {
      value: String(copy.home.services.items.length).padStart(2, "0"),
      label: copy.home.services.label,
    },
    {
      value: String(copy.home.methods.items.length).padStart(2, "0"),
      label: copy.home.methods.label,
    },
  ];

  return (
    <>
      <section className="section-shell border-b">
        <div className="app-shell grid gap-10 xl:grid-cols-[minmax(0,1.1fr)_minmax(21rem,0.9fr)] xl:items-center">
          <RevealOnScroll className="space-y-8">
            <div className="max-w-3xl space-y-5">
              <p className="eyebrow">{copy.home.hero.eyebrow}</p>
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
                {copy.home.hero.title}
              </h1>
              <p className="max-w-2xl text-base leading-8 text-[var(--color-muted)] md:text-lg">
                {copy.home.hero.description}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link className="primary-cta" href={`/${locale}#book-intro`}>
                {copy.home.hero.primaryCta}
              </Link>
              <Link className="secondary-link" href={`/${locale}/about`}>
                {copy.home.hero.secondaryCta}
              </Link>
            </div>

            <dl className="grid gap-4 sm:grid-cols-3">
              {heroStats.map((item) => (
                <div key={item.label} className="rounded-[1.5rem] border bg-[var(--color-bg)] p-5">
                  <dt className="text-sm font-medium uppercase tracking-[0.14em] text-[var(--color-muted)]">
                    {item.label}
                  </dt>
                  <dd className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-fg)]">{item.value}</dd>
                </div>
              ))}
            </dl>
          </RevealOnScroll>

          <RevealOnScroll className="h-full" delay={100}>
            <aside className="surface-card-strong flex h-full flex-col justify-between space-y-6">
              <div className="space-y-4">
                <p className="eyebrow">{copy.home.hero.proofLabel}</p>
                <h2 className="text-2xl font-semibold tracking-tight">{copy.home.hero.proofTitle}</h2>
                <ul className="space-y-3 text-sm leading-7 text-[var(--color-muted)] md:text-base">
                  {copy.home.hero.proofPoints.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-2 w-2 rounded-full bg-[var(--color-accent)]"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row xl:flex-col">
                <Link className="primary-cta" href={`/${locale}#book-intro`}>
                  {copy.headerCta}
                </Link>
                <Link className="secondary-link" href={`/${locale}/about`}>
                  {copy.home.hero.secondaryCta}
                </Link>
              </div>
            </aside>
          </RevealOnScroll>
        </div>
      </section>

      <section id="references" className="section-shell scroll-mt-28 border-b">
        <div className="app-shell space-y-8">
          <RevealOnScroll className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-3">
              <p className="eyebrow">{copy.home.testimonials.label}</p>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                {copy.home.testimonials.title}
              </h2>
              <p className="text-base leading-8 text-[var(--color-muted)] md:text-lg">
                {copy.home.testimonials.description}
              </p>
            </div>

            <Link className="primary-cta w-fit" href={`/${locale}#book-intro`}>
              {copy.headerCta}
            </Link>
          </RevealOnScroll>

          <RevealOnScroll delay={100}>
            <TestimonialRail
              items={copy.home.testimonials.items}
              ariaLabel={copy.home.testimonials.label}
              previousLabel={uiCopy.previous}
              nextLabel={uiCopy.next}
              jumpLabel={uiCopy.jump}
            />
          </RevealOnScroll>
        </div>
      </section>

      <section id="services" className="section-shell scroll-mt-28 border-b">
        <div className="app-shell space-y-8">
          <RevealOnScroll className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-3">
              <p className="eyebrow">{copy.home.services.label}</p>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                {copy.home.services.title}
              </h2>
              <p className="text-base leading-8 text-[var(--color-muted)] md:text-lg">
                {copy.home.services.description}
              </p>
            </div>

            <Link className="secondary-link w-fit" href={`/${locale}#book-intro`}>
              {copy.headerCta}
            </Link>
          </RevealOnScroll>

          <div className="grid gap-6 lg:grid-cols-3">
            {copy.home.services.items.map((service, index) => (
              <RevealOnScroll key={service.title} className="h-full" delay={index * 90}>
                <article
                  className="surface-card flex h-full flex-col space-y-5 border-t-4"
                  style={serviceCardStyles[index] ?? serviceCardStyles[0]}
                >
                  <div className="space-y-3">
                    <p className="eyebrow">{service.eyebrow}</p>
                    <h3 className="text-xl font-semibold md:text-2xl">{service.title}</h3>
                    <p className="text-sm leading-7 text-[var(--color-muted)] md:text-base">
                      {service.description}
                    </p>
                  </div>

                  <ul className="space-y-3 text-sm leading-6 text-[var(--color-muted)] md:text-base">
                    {service.outcomes.map((outcome) => (
                      <li key={outcome} className="flex gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-2 w-2 rounded-full bg-[var(--color-accent)]"
                        />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section id="methods" className="section-shell scroll-mt-28 border-b">
        <div className="app-shell space-y-8">
          <RevealOnScroll className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-3">
              <p className="eyebrow">{copy.home.methods.label}</p>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                {copy.home.methods.title}
              </h2>
              <p className="text-base leading-8 text-[var(--color-muted)] md:text-lg">
                {copy.home.methods.description}
              </p>
            </div>

            <Link className="secondary-link w-fit" href={`/${locale}#book-intro`}>
              {copy.headerCta}
            </Link>
          </RevealOnScroll>

          <div className="grid gap-6 lg:grid-cols-3">
            {copy.home.methods.items.map((method, index) => (
              <RevealOnScroll key={method.title} className="h-full" delay={index * 100}>
                <article
                  className="surface-card flex h-full flex-col space-y-5"
                  style={
                    index === 0
                      ? {
                          background: "color-mix(in srgb, var(--color-accent-soft) 78%, white)",
                          borderColor: "var(--color-accent)",
                        }
                      : undefined
                  }
                >
                  <div className="space-y-3">
                    <p className="eyebrow">{method.eyebrow}</p>
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-xl font-semibold md:text-2xl">{method.title}</h3>
                      {method.badge ? (
                        <span className="rounded-full bg-[var(--color-accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--color-accent)]">
                          {method.badge}
                        </span>
                      ) : null}
                    </div>
                    <p className="text-sm leading-7 text-[var(--color-muted)] md:text-base">
                      {method.description}
                    </p>
                  </div>

                  <details className="rounded-[1.25rem] border bg-[var(--color-bg)] p-4">
                    <summary className="summary-reset flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-[var(--color-fg)]">
                      <span>{uiCopy.moreDetail}</span>
                      <span aria-hidden="true" className="text-lg leading-none text-[var(--color-accent)]">
                        +
                      </span>
                    </summary>
                    <p className="mt-3 text-sm leading-7 text-[var(--color-muted)] md:text-base">
                      {method.detail}
                    </p>
                  </details>
                </article>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section id="book-intro" className="section-shell scroll-mt-28">
        <div className="app-shell">
          <RevealOnScroll>
            <div className="surface-card-strong flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl space-y-3">
                <p className="eyebrow">{copy.home.cta.label}</p>
                <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{copy.home.cta.title}</h2>
                <p className="text-base leading-8 text-[var(--color-muted)] md:text-lg">
                  {copy.home.cta.description}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link className="primary-cta" href={`/${locale}/about`}>
                  {copy.headerCta}
                </Link>
                <Link className="secondary-link" href={`/${locale}/about`}>
                  {copy.home.cta.button}
                </Link>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}