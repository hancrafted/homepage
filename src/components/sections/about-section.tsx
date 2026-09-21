import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SITE_CONTENT } from '@/content/site-data';
import { type LocaleCode } from '@/lib/preferences';
import { Check, Mail, MessageSquare, ShieldCheck, Terminal } from 'lucide-react';

function PromiseGrid({ locale }: { locale: LocaleCode }) {
  const author = SITE_CONTENT.author;
  return (
    <div className="space-y-4 pt-4">
      <h3 className="font-bold text-sm uppercase tracking-wider text-foreground font-mono">
        {locale === 'de' ? 'Die Drei Kernversprechen' : 'The Three Promises'}:
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {author.promises.map((promise) => (
          <div key={promise.title} className="p-4 rounded-lg border border-border bg-card space-y-2">
            <div className="font-bold text-sm font-mono text-foreground flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-accent" />
              <span>{promise.title}</span>
            </div>
            <div className="text-[11px] font-mono text-accent">{promise.target[locale]}</div>
            <p className="text-xs text-muted-foreground leading-relaxed">{promise.description[locale]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactActions({ locale }: { locale: LocaleCode }) {
  return (
    <div className="pt-2 flex flex-col gap-3">
      <Button asChild size="lg" className="w-full font-mono text-xs gap-2">
        <a href="mailto:contact@hancrafted.dev?subject=Advisory%20/%20Workshop%20Inquiry">
          <Mail className="h-4 w-4" />
          <span>contact@hancrafted.dev</span>
        </a>
      </Button>
      <Button asChild variant="outline" size="sm" className="w-full font-mono text-xs gap-2">
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
    <Card className="border-border shadow-md bg-card">
      <CardHeader className="space-y-2 pb-4">
        <Badge variant="accent" className="w-fit font-mono text-xs">
          {locale === 'de' ? 'Direktkontakt' : 'Direct Inquiries'}
        </Badge>
        <CardTitle className="text-2xl font-bold tracking-tight">{headings.getInTouch[locale]}</CardTitle>
        <p className="text-xs text-muted-foreground">
          {locale === 'de'
            ? 'Beratung für Startups & KMU, Coaching, Pitch-Training oder massgeschneiderte In-House-Workshops.'
            : 'Advisory for startups & SMEs, coaching, pitch architecture, or tailored in-house workshops.'}
        </p>
      </CardHeader>
      <CardContent className="space-y-5 text-sm">
        <div className="space-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2 text-foreground">
            <Check className="h-4 w-4 text-accent shrink-0" />
            <span>
              {locale === 'de'
                ? 'Kein Agentur-Overhead, direkte Sparringspartner'
                : 'No agency overhead, direct founder-to-founder sparring'}
            </span>
          </div>
          <div className="flex items-center gap-2 text-foreground">
            <Check className="h-4 w-4 text-accent shrink-0" />
            <span>
              {locale === 'de'
                ? 'Praxisnahe Umsetzung mit verifizierbaren Artefakten'
                : 'Battle-tested execution with verified artifacts'}
            </span>
          </div>
        </div>
        <ContactActions locale={locale} />
      </CardContent>
    </Card>
  );
}

export function AboutSection({ locale }: { locale: LocaleCode }) {
  const author = SITE_CONTENT.author;
  const headings = SITE_CONTENT.aboutHeading;

  return (
    <section className="py-20 border-b border-border/70" id="about">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="font-mono text-xs font-semibold text-accent uppercase tracking-widest">
                // Background & Stance
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                {headings.title[locale]}
              </h2>
              <p className="text-base text-accent font-mono font-medium">{author.role[locale]}</p>
            </div>
            <p className="text-muted-foreground text-base leading-relaxed">{author.bio[locale]}</p>
            <div className="p-4 rounded-xl border border-border bg-muted/30 space-y-2 font-mono text-xs">
              <div className="text-foreground font-bold flex items-center gap-2">
                <Terminal className="h-4 w-4 text-accent" />
                <span>{locale === 'de' ? 'Erfahrungshintergrund' : 'Lived Experience'}:</span>
              </div>
              <p className="text-muted-foreground leading-relaxed pl-6">{author.experience[locale]}</p>
            </div>
            <PromiseGrid locale={locale} />
          </div>
          <div className="lg:col-span-5" id="contact">
            <ContactCard locale={locale} />
          </div>
        </div>
      </div>
    </section>
  );
}
