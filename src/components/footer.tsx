'use client';
// Footer rendering localized site links, social profiles, and copyright

import { GithubIcon, LinkedinIcon, YoutubeIcon } from '@/components/icons';
import { SITE_CONTENT } from '@/content/site-data';
import { useLocale } from '@/i18n/context';
import { type LocaleCode } from '@/lib/preferences';
import { Mail } from 'lucide-react';

function SocialLinks() {
  return (
    <div className="flex items-center gap-3 text-foreground/70">
      <a
        href="https://github.com/hancrafted"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub profile"
        className="p-2.5 rounded-full hover:bg-white/[0.06] hover:text-foreground transition-colors"
      >
        <GithubIcon className="h-4 w-4" />
      </a>
      <a
        href="https://linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn profile"
        className="p-2.5 rounded-full hover:bg-white/[0.06] hover:text-foreground transition-colors"
      >
        <LinkedinIcon className="h-4 w-4" />
      </a>
      <a
        href="https://youtube.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="YouTube channel"
        className="p-2.5 rounded-full hover:bg-white/[0.06] hover:text-foreground transition-colors"
      >
        <YoutubeIcon className="h-4 w-4" />
      </a>
      <a
        href="mailto:contact@hancrafted.dev"
        aria-label="Send email"
        className="p-2.5 rounded-full hover:bg-white/[0.06] hover:text-foreground transition-colors"
      >
        <Mail className="h-4 w-4" />
      </a>
    </div>
  );
}

export function Footer({ locale: explicitLocale }: { locale?: LocaleCode }) {
  const currentLocale = useLocale();
  const locale = explicitLocale ?? currentLocale;

  return (
    <footer className="w-full bg-background/80 py-16 text-sm text-muted-foreground">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1.5">
            <div className="font-semibold text-foreground tracking-tight flex items-center gap-2.5">
              <span className="font-mono text-primary font-bold">H</span>
              <span>{SITE_CONTENT.author.name}</span>
              <span className="text-xs text-muted-foreground font-normal">
                ({SITE_CONTENT.author.location[locale]})
              </span>
            </div>
            <p className="text-xs text-muted-foreground max-w-md leading-relaxed">
              {SITE_CONTENT.footer.builtWith[locale]}
            </p>
          </div>
          <SocialLinks />
        </div>

        <div className="pt-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground/80">
          <p>{SITE_CONTENT.footer.copyright[locale]}</p>
          <p>{SITE_CONTENT.footer.privacyNotice[locale]}</p>
        </div>
      </div>
    </footer>
  );
}
