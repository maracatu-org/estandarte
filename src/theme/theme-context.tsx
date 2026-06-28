"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

export type Theme = "dark" | "light";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export type ThemeProviderProps = {
  children: React.ReactNode;
  /** Theme used before any stored preference is found. Defaults to "dark". */
  defaultTheme?: Theme;
  /** Cookie name the preference is persisted under. Defaults to "maracatu_theme". */
  storageKey?: string;
};

function readCookie(key: string): Theme | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${key}=(dark|light)`));
  return (match?.[1] as Theme) ?? null;
}

/**
 * Provides the active theme and toggles a `dark` class on <html> so the
 * Estandarte tokens (theme.css) flip. Persists the choice to a cookie so it
 * survives reloads and is readable server-side.
 */
export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "maracatu_theme",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => readCookie(storageKey) ?? defaultTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const persist = useCallback(
    (next: Theme) => {
      setThemeState(next);
      document.cookie = `${storageKey}=${next};path=/;max-age=${365 * 86400};SameSite=Lax`;
    },
    [storageKey],
  );

  const toggleTheme = useCallback(() => {
    persist(theme === "dark" ? "light" : "dark");
  }, [theme, persist]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme: persist }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
