'use client';
// Manages interactive theme switching and persists preference to localStorage

import { Button } from '@/components/ui/button';
import { getStoredPreferences, setStoredPreferences, type ThemeMode } from '@/lib/preferences';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(getStoredPreferences().theme);
    setMounted(true);
  }, []);

  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setStoredPreferences({ theme: nextTheme });
    setTheme(nextTheme);
  }

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" aria-label="Toggle theme" className="h-9 w-9">
        <span className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      data-theme-toggle="true"
      className="h-9 w-9 text-muted-foreground hover:text-foreground"
    >
      {theme === 'dark' ? (
        <Sun className="h-4 w-4 transition-transform" />
      ) : (
        <Moon className="h-4 w-4 transition-transform" />
      )}
    </Button>
  );
}
