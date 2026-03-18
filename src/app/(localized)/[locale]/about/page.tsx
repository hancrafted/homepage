import Link from "next/link";
import type { CSSProperties } from "react";

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getSiteContent, sourceDocuments } from "@/content/site-content";
import { isLocale } from "@/lib/i18n/config";
import { buildPageMetadata } from "@/lib/seo";

const timelineCardStyles = [
  {
    background: "color-mix(in srgb, var(--color-accent-soft) 42%, white)",
    borderColor: "color-mix(in srgb, var(--color-accent) 26%, var(--color-border))",
  },
  {
    background: "color-mix(in srgb, var(--color-surface-strong) 72%, white)",
    borderColor: "color-mix(in srgb, var(--color-accent) 18%, var(--color-border))",
  },
  {
    background: "color-mix(in srgb, var(--color-surface) 86%, white)",
    borderColor: "var(--color-border)",
  },
] satisfies CSSProperties[];

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;

  return isLocale(locale) ? buildPageMetadata(locale, "about") : {};
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const content = getSiteContent(locale);
  const copy = content.about;
  const latestRole = copy.experience.items[0];
  const summaryStats = [
    { value: String(copy.experience.items.length).padStart(2, "0"), label: copy.experience.label },
    { value: String(copy.education.items.length).padStart(2, "0"), label: copy.education.label },
    {
      value: String(copy.certifications.items.length).padStart(2, "0"),
      label: copy.certifications.label,
    },
  ];
  const sectionLinks = [
    { id: "experience", label: copy.experience.title },
    { id: "education", label: copy.education.title },
    { id: "certifications", label: copy.certifications.title },
    { id: "skills", label: copy.skills.title },
  ];

  return (
    <section className="section-shell">
      <div className="app-shell space-y-10">
        <section className="rounded-[2rem] border bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-accent-soft)_20%,white),white)] px-6 py-8 shadow-[var(--shadow-card)] md:px-8 md:py-10">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] xl:items-start">
            <div className="space-y-8">
              <div className="max-w-3xl space-y-4">
                <p className="eyebrow">{copy.sidebar.label}</p>
                <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                  {copy.sidebar.title}
                </h1>
                <p className="max-w-3xl text-base leading-8 text-[var(--color-muted)] md:text-lg">
                  {copy.sidebar.description}
                </p>
              </div>

              <ul className="flex flex-wrap gap-3">
                {copy.sidebar.highlights.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border bg-[color:color-mix(in_srgb,var(--color-accent-soft)_48%,white)] px-4 py-2 text-sm font-medium text-[var(--color-fg)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <dl className="grid gap-4 sm:grid-cols-3">
                {summaryStats.map((item) => (
                  <div key={item.label} className="rounded-[1.5rem] border bg-[var(--color-bg)] p-5">
                    <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                      {item.label}
                    </dt>
                    <dd className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-fg)]">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <aside className="surface-card-strong space-y-6 xl:sticky xl:top-28">
              <div className="space-y-3">
                <p className="eyebrow">{latestRole.company}</p>
                <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-fg)]">
                  {latestRole.role}
                </h2>
                <p className="text-sm leading-7 text-[var(--color-muted)] md:text-base">
                  {latestRole.period} · {latestRole.location}
                </p>
              </div>

              {latestRole.highlights.length ? (
                <ul className="space-y-3 text-sm leading-7 text-[var(--color-muted)] md:text-base">
                  {latestRole.highlights.slice(0, 3).map((highlight) => (
                    <li key={highlight} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-2 w-2 rounded-full bg-[var(--color-accent)]"
                      />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              <div className="rounded-[1.5rem] border bg-[var(--color-bg)] p-4">
                <dl className="grid gap-4">
                  {copy.sidebar.facts.map((fact) => (
                    <div key={fact.label}>
                      <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                        {fact.label}
                      </dt>
                      <dd className="mt-1 text-sm leading-7 text-[var(--color-fg)] md:text-base">
                        {fact.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row xl:flex-col">
                <Link className="primary-cta" href={`/${locale}#book-intro`}>
                  {content.headerCta}
                </Link>
                <Link className="secondary-link" href={`/${locale}#services`}>
                  {content.nav.services}
                </Link>
              </div>
            </aside>
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-[minmax(18rem,0.72fr)_minmax(0,1.28fr)] lg:items-start">
          <aside className="space-y-6 lg:sticky lg:top-28">
            <section className="surface-card space-y-6">
              <div className="space-y-3">
                <p className="eyebrow">{copy.sidebar.label}</p>
                <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-fg)]">
                  {copy.sidebar.sourcesTitle}
                </h2>
              </div>

              <nav aria-label={copy.sidebar.label}>
                <ul className="grid gap-3">
                  {sectionLinks.map((section) => (
                    <li key={section.id}>
                      <Link
                        className="secondary-link w-full justify-between"
                        href={`/${locale}/about#${section.id}`}
                      >
                        <span>{section.label}</span>
                        <span aria-hidden="true">↗</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <ul className="space-y-4 border-t pt-6 text-sm leading-7 text-[var(--color-muted)] md:text-base">
                {copy.sidebar.sources.map((source) => (
                  <li key={source.label} className="rounded-[1.25rem] border bg-[var(--color-bg)] p-4">
                    <span className="block font-semibold text-[var(--color-fg)]">{source.label}</span>
                    <span className="mt-1 block">{source.detail}</span>
                  </li>
                ))}
              </ul>
            </section>
          </aside>

          <div className="space-y-8">
            <section id="experience" className="surface-card space-y-8 scroll-mt-28">
              <div className="max-w-3xl space-y-3">
                <p className="eyebrow">{copy.experience.label}</p>
                <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                  {copy.experience.title}
                </h2>
                <p className="text-sm leading-7 text-[var(--color-muted)] md:text-base">
                  {copy.experience.description}
                </p>
              </div>

              <ol className="space-y-5">
                {copy.experience.items.map((item, index) => (
                  <li key={`${item.company}-${item.role}`} className="relative pl-8">
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-7 h-3 w-3 rounded-full bg-[var(--color-accent)]"
                    />
                    {index < copy.experience.items.length - 1 ? (
                      <span
                        aria-hidden="true"
                        className="absolute left-[5px] top-10 bottom-[-1.75rem] w-px bg-[var(--color-border)]"
                      />
                    ) : null}

                    <article
                      className="rounded-[1.75rem] border p-5 md:p-6"
                      style={timelineCardStyles[index % timelineCardStyles.length]}
                    >
                      <div className="flex flex-col gap-4 border-b pb-5 md:flex-row md:items-start md:justify-between">
                        <div className="space-y-2">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                            {item.company}
                          </p>
                          <h3 className="text-xl font-semibold tracking-tight text-[var(--color-fg)] md:text-2xl">
                            {item.role}
                          </h3>
                        </div>

                        <div className="flex flex-col items-start gap-2 md:items-end">
                          <span className="rounded-full border bg-[var(--color-bg)] px-4 py-2 text-sm font-medium text-[var(--color-fg)]">
                            {item.period}
                          </span>
                          <span className="text-sm leading-6 text-[var(--color-muted)] md:text-base">
                            {item.location}
                          </span>
                        </div>
                      </div>

                      {item.highlights.length ? (
                        <ul className="mt-5 space-y-3 text-sm leading-7 text-[var(--color-muted)] md:text-base">
                          {item.highlights.map((highlight) => (
                            <li key={highlight} className="flex gap-3">
                              <span
                                aria-hidden="true"
                                className="mt-2 h-2 w-2 rounded-full bg-[var(--color-accent)]"
                              />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}

                      <div className="mt-5 flex flex-wrap gap-2 border-t pt-5">
                        {item.sourceDocumentIds.map((sourceId) => (
                          <span
                            key={sourceId}
                            className="rounded-full border bg-[var(--color-bg)] px-3 py-1 text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-muted)]"
                          >
                            {sourceDocuments[sourceId].label}
                          </span>
                        ))}
                      </div>
                    </article>
                  </li>
                ))}
              </ol>
            </section>

            <div className="grid gap-8 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
              <section id="education" className="surface-card space-y-6 scroll-mt-28">
                <div className="space-y-3">
                  <p className="eyebrow">{copy.education.label}</p>
                  <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                    {copy.education.title}
                  </h2>
                </div>

                <div className="grid gap-4">
                  {copy.education.items.map((item) => (
                    <article
                      key={`${item.institution}-${item.degree}`}
                      className="rounded-[1.5rem] border bg-[var(--color-bg)] p-5"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                        {item.period}
                      </p>
                      <h3 className="mt-3 text-lg font-semibold text-[var(--color-fg)] md:text-xl">
                        {item.institution}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-[var(--color-muted)] md:text-base">
                        {item.degree}
                      </p>
                      {item.details.length ? (
                        <ul className="mt-3 space-y-2 text-sm leading-7 text-[var(--color-muted)] md:text-base">
                          {item.details.map((detail) => (
                            <li key={detail}>{detail}</li>
                          ))}
                        </ul>
                      ) : null}
                    </article>
                  ))}
                </div>
              </section>

              <section id="certifications" className="surface-card space-y-6 scroll-mt-28">
                <div className="space-y-3">
                  <p className="eyebrow">{copy.certifications.label}</p>
                  <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                    {copy.certifications.title}
                  </h2>
                </div>

                <ul className="grid gap-3 sm:grid-cols-2">
                  {copy.certifications.items.map((item, index) => (
                    <li
                      key={item.title}
                      className="rounded-[1.5rem] border p-4 text-sm leading-7 text-[var(--color-muted)] md:text-base"
                      style={timelineCardStyles[(index + 1) % timelineCardStyles.length]}
                    >
                      <span className="font-medium text-[var(--color-fg)]">{item.title}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <section id="skills" className="surface-card space-y-6 scroll-mt-28">
              <div className="max-w-3xl space-y-3">
                <p className="eyebrow">{copy.skills.label}</p>
                <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{copy.skills.title}</h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {copy.skills.groups.map((group) => (
                  <article key={group.title} className="rounded-[1.5rem] border bg-[var(--color-bg)] p-5">
                    <h3 className="text-lg font-semibold text-[var(--color-fg)] md:text-xl">
                      {group.title}
                    </h3>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-full border bg-[color:color-mix(in_srgb,var(--color-surface)_86%,white)] px-3 py-2 text-sm font-medium text-[var(--color-fg)]"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}