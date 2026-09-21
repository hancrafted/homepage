import { GsapReveal } from '@/components/animations/gsap-reveal';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SITE_CONTENT } from '@/content/site-data';
import { type LocaleCode } from '@/lib/preferences';
import { Sparkles, Target, Terminal, TrendingUp, Users } from 'lucide-react';

const iconMap = {
  users: Users,
  terminal: Terminal,
  target: Target,
  'trending-up': TrendingUp,
  sparkles: Sparkles,
};

export function ServicesSection({ locale }: { locale: LocaleCode }) {
  const content = SITE_CONTENT;

  return (
    <section className="py-20 border-b border-border/70 bg-muted/10" id="services">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-12">
        <GsapReveal>
          <div className="max-w-2xl space-y-3" data-reveal-item="true">
            <div className="font-mono text-xs font-semibold text-accent uppercase tracking-widest">
              // Core Advisory
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              {content.servicesHeading.title[locale]}
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              {content.servicesHeading.subtitle[locale]}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
            {content.services.map((service) => {
              const Icon = iconMap[service.iconName];
              return (
                <div key={service.id} data-reveal-item="true">
                  <Card className="h-full border-border hover:border-accent/40 transition-all hover:shadow-md group">
                    <CardHeader className="space-y-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                        <Icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-xl font-bold tracking-tight">{service.title[locale]}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                        {service.description[locale]}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </GsapReveal>
      </div>
    </section>
  );
}
