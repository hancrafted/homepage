'use client';

import { type ThemeMode } from '@/lib/preferences';
import { useTheme } from '@/lib/use-theme';
import { Monitor, Moon, Sun } from 'lucide-react';
import React from 'react';

interface ThemeOption {
  mode: ThemeMode;
  label: string;
  icon: React.ReactNode;
}

const THEME_OPTIONS: readonly ThemeOption[] = [
  { mode: 'light', label: 'Light theme', icon: <Sun className="h-3.5 w-3.5" /> },
  { mode: 'dark', label: 'Dark theme', icon: <Moon className="h-3.5 w-3.5" /> },
  { mode: 'system', label: 'System theme', icon: <Monitor className="h-3.5 w-3.5" /> },
];

export function ThemeToggle() {
  const { theme, setTheme, mounted } = useTheme();

  return (
    <div
      className="flex items-center rounded-lg border bg-muted/40 p-0.5 text-xs font-mono font-medium"
      role="group"
      aria-label="Theme selection"
      data-theme-toggle="true"
    >
      {THEME_OPTIONS.map((opt) => {
        const isActive = mounted && theme === opt.mode;
        return (
          <button
            key={opt.mode}
            type="button"
            onClick={() => setTheme(opt.mode)}
            className={`rounded px-1.5 py-1 transition-all flex items-center justify-center ${
              isActive
                ? 'bg-background text-foreground shadow-sm font-semibold'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            aria-label={`Switch to ${opt.label.toLowerCase()}`}
            title={opt.label}
            data-theme-option={opt.mode}
          >
            {opt.icon}
          </button>
        );
      })}
    </div>
  );
}
