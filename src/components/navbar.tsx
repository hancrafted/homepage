'use client';
// Interactive navigation header with floating beam layout and soft diffusion glassmorphism

import { LocaleSwitcher } from '@/components/locale-switcher';
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
    <div className="md:hidden rounded-2xl border border-white/[0.08] bg-background/90 backdrop-blur-xl p-5 space-y-3 shadow-2xl">
      {items.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          onClick={onClose}
          className="block py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
        >
          {item.label[locale]}
        </Link>
      ))}
      <div className="pt-2">
        <Button size="sm" className="w-full rounded-full font-mono text-xs shadow-md" asChild>
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
    <header className="fixed top-3 sm:top-5 inset-x-0 z-50 px-3 sm:px-6 pointer-events-none transition-all">
      <div className="mx-auto max-w-5xl rounded-full border border-white/[0.08] bg-background/70 backdrop-blur-md backdrop-saturate-150 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_8px_32px_rgba(0,0,0,0.36)] pointer-events-auto transition-colors">
        <div className="flex h-14 items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground font-mono font-bold text-xs tracking-wider shadow-sm transition-transform group-hover:scale-105">
              H
            </div>
            <span className="font-semibold tracking-tight text-foreground text-sm sm:text-base">
              {SITE_CONTENT.author.name}
            </span>
          </Link>

          <DesktopNav items={items} locale={locale} />

          <div className="hidden md:flex items-center gap-3">
            <LocaleSwitcher />
            <Button size="sm" asChild className="h-8 rounded-full px-4 font-mono text-xs shadow-sm hover:shadow">
              <Link href="#contact">{SITE_CONTENT.workshopsHeading.inquireBtn[locale]}</Link>
            </Button>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <LocaleSwitcher />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(!open)}
              aria-label="Toggle navigation menu"
              className="h-8 w-8 rounded-full"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      {open && (
        <div className="mx-auto max-w-5xl mt-2 pointer-events-auto">
          <MobileNavDrawer items={items} locale={locale} onClose={() => setOpen(false)} />
        </div>
      )}
    </header>
  );
}
