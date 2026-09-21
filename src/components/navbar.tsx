'use client';
// Interactive navigation header with mobile drawer and responsive toggles

import { LocaleSwitcher } from '@/components/locale-switcher';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { SITE_CONTENT, type NavItem } from '@/content/site-data';
import { useLocale } from '@/i18n/context';
import { Link } from '@/i18n/navigation';
import { type LocaleCode } from '@/lib/preferences';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

function DesktopNav({ items, locale }: { items: NavItem[]; locale: LocaleCode }) {
  return (
    <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
      {items.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className="transition-colors hover:text-foreground hover:underline underline-offset-4"
          data-nav-item={item.id}
        >
          {item.label[locale]}
        </Link>
      ))}
    </nav>
  );
}

function MobileNavDrawer({ items, locale, onClose }: { items: NavItem[]; locale: LocaleCode; onClose: () => void }) {
  return (
    <div className="md:hidden border-b border-border bg-background px-4 py-4 space-y-3">
      {items.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          onClick={onClose}
          className="block py-2 text-sm font-medium text-foreground hover:text-accent transition-colors"
        >
          {item.label[locale]}
        </Link>
      ))}
      <div className="pt-2">
        <Button size="sm" className="w-full font-mono text-xs" asChild>
          <Link href="#contact" onClick={onClose}>
            {SITE_CONTENT.workshopsHeading.inquireBtn[locale]}
          </Link>
        </Button>
      </div>
    </div>
  );
}

export function Navbar() {
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const items = SITE_CONTENT.navigation;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-mono font-bold text-sm tracking-wider shadow-sm transition-transform group-hover:scale-105">
            H
          </div>
          <span className="font-semibold tracking-tight text-foreground text-base">{SITE_CONTENT.author.name}</span>
        </Link>

        <DesktopNav items={items} locale={locale} />

        <div className="hidden md:flex items-center gap-3">
          <LocaleSwitcher />
          <ThemeToggle />
          <Button size="sm" asChild className="font-mono text-xs">
            <Link href="#contact">{SITE_CONTENT.workshopsHeading.inquireBtn[locale]}</Link>
          </Button>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <LocaleSwitcher />
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation menu"
            className="h-9 w-9"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && <MobileNavDrawer items={items} locale={locale} onClose={() => setOpen(false)} />}
    </header>
  );
}
