import { BlurRevealHeading } from '@/components/animations/blur-reveal-heading';
import { GsapReveal } from '@/components/animations/gsap-reveal';
import { Button } from '@/components/ui/button';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { SITE_CONTENT } from '@/content/site-data';
import { type LocaleCode } from '@/lib/preferences';
import { Check, Mail, MessageSquare, ShieldCheck, Terminal } from 'lucide-react';

function PromiseGrid({ locale }: { locale: LocaleCode }) {
  const author = SITE_CONTENT.author;
  return (
    <div className="space-y-4 pt-4">
      <h3 className="font-bold text-xs uppercase tracking-wider text-muted-foreground font-mono">
        {locale === 'de' ? 'Die Drei Kernversprechen' : 'The Three Promises'}:
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {author.promises.map((promise) => (
          <SpotlightCard
            key={promise.title}
            className="p-5 rounded-2xl bg-card border border-border/60 dark:border-white/[0.06] dark:bg-white/[0.035] backdrop-blur-md space-y-2 shadow-lg shadow-black/5 dark:shadow-black/20 hover:bg-muted/40 dark:hover:bg-white/[0.06] transition-all"
          >
            <div className="font-bold text-sm font-mono text-foreground flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>{promise.title}</span>
            </div>
            <div className="text-[11px] font-mono text-primary font-medium">{promise.target[locale]}</div>
            <p className="text-xs text-muted-foreground leading-relaxed">{promise.description[locale]}</p>
          </SpotlightCard>
        ))}
      </div>
    </div>
  );
}

function ContactActions({ locale }: { locale: LocaleCode }) {
  return (
    <div className="pt-4 flex flex-col gap-3">
      <Button asChild size="lg" className="w-full font-mono text-xs gap-2 shadow-md">
        <a href="mailto:contact@hancrafted.dev?subject=Advisory%20/%20Workshop%20Inquiry">
          <Mail className="h-4 w-4" />
          <span>contact@hancrafted.dev</span>
        </a>
      </Button>
      <Button
        asChild
        variant="ghost"
        size="sm"
        className="w-full font-mono text-xs gap-2 bg-black/[0.04] hover:bg-black/[0.08] dark:bg-white/[0.04] dark:hover:bg-white/[0.08] text-foreground"
      >
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <MessageSquare className="h-3.5 w-3.5" />
          <span>{locale === 'de' ? 'Auf LinkedIn vernetzen' : 'Connect on LinkedIn'}</span>
        </a>
      </Button>
    </div>
  );
}

function ContactCard({ locale }: { locale: LocaleCode }) {
  const headings = SITE_CONTENT.aboutHeading;
  return (
    <SpotlightCard className="p-8 rounded-3xl bg-card border border-border/60 dark:border-white/[0.06] dark:bg-white/[0.035] backdrop-blur-md shadow-2xl shadow-black/5 dark:shadow-black/30">
      <CardHeader className="space-y-3 p-0 pb-4">
        <div className="w-fit font-mono text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block" />
          <span>{locale === 'de' ? 'Direktkontakt' : 'Direct Inquiries'}</span>
        </div>
        <CardTitle className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          {headings.getInTouch[locale]}
        </CardTitle>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {locale === 'de'
            ? 'Beratung für Startups & KMU, Coaching, Pitch-Training oder massgeschneiderte In-House-Workshops.'
            : 'Advisory for startups & SMEs, coaching, pitch architecture, or tailored in-house workshops.'}
        </p>
      </CardHeader>
      <CardContent className="space-y-5 p-0 pt-2 text-sm">
        <div className="space-y-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-2.5 text-foreground">
            <Check className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>
              {locale === 'de'
                ? 'Kein Agentur-Overhead, direkter Sparringspartner auf Augenhöhe'
                : 'No agency overhead, direct founder-to-founder sparring'}
            </span>
          </div>
          <div className="flex items-center gap-2.5 text-foreground">
            <Check className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>
              {locale === 'de'
                ? 'Praxisnahe Umsetzung mit verifizierbaren Artefakten'
                : 'Battle-tested execution with verified artifacts'}
            </span>
          </div>
        </div>
        <ContactActions locale={locale} />
      </CardContent>
    </SpotlightCard>
  );
}

function AuthorHeader({ locale }: { locale: LocaleCode }) {
  const author = SITE_CONTENT.author;
  const headings = SITE_CONTENT.aboutHeading;

  return (
    <div className="space-y-4" data-reveal-item="true">
      <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-primary uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full">
        <span>{locale === 'de' ? 'Kapitel 06 // Haltung & Credo' : 'Chapter 06 // Stance & Credo'}</span>
      </div>
      <BlurRevealHeading
        text={headings.title[locale]}
        as="h2"
        className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight"
      />
      <p className="text-base sm:text-lg text-primary font-mono font-medium">{author.role[locale]}</p>
    </div>
  );
}

export function AboutSection({ locale }: { locale: LocaleCode }) {
  const author = SITE_CONTENT.author;

  return (
    <section data-chapter="06" className="py-24 md:py-32 relative" id="about">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-16">
        <GsapReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-7">
              <AuthorHeader locale={locale} />
              <p data-reveal-item="true" className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                {author.bio[locale]}
              </p>
              <div
                data-reveal-item="true"
                className="p-5 rounded-2xl bg-white/[0.025] backdrop-blur-sm space-y-2 font-mono text-xs"
              >
                <div className="text-foreground font-bold flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-primary" />
                  <span>{locale === 'de' ? 'Erfahrungshintergrund' : 'Lived Experience'}:</span>
                </div>
                <p className="text-muted-foreground leading-relaxed pl-6">{author.experience[locale]}</p>
              </div>
              <div data-reveal-item="true">
                <PromiseGrid locale={locale} />
              </div>
            </div>
            <div className="lg:col-span-5" id="contact" data-reveal-item="true">
              <ContactCard locale={locale} />
            </div>
          </div>
        </GsapReveal>
      </div>
    </section>
  );
}
