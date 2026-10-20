"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import i18nData from "@/content/i18n.json";

export type Locale = "pt" | "en" | "es";
type Dict = Record<string, string>;

const DICT = i18nData as unknown as {
  meta: {
    locales: Locale[];
    defaultLocale: Locale;
    storageKey: string;
    htmlLang: Record<Locale, string>;
    clock: { timeZone: string; locale: Record<Locale, string> };
  };
  pt: Dict;
  en: Dict;
  es: Dict;
};

const STORAGE_KEY = DICT.meta.storageKey;
const DEFAULT_LOCALE = DICT.meta.defaultLocale;

type LangContextValue = {
  lang: Locale;
  setLang: (next: Locale) => void;
  t: (key: string) => string;
};

const LangContext = createContext<LangContextValue | null>(null);

// The "dip": clicking PT/EN/ES fades <main> to .1 opacity and back over
// 520ms (ease-in-out), swapping every piece of text at the 230ms mark --
// matching the approved prototype exactly (README §6.6). Reduced motion
// skips straight to the swap, no animation.
function dip(onMidpoint: () => void) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const main = document.getElementById("top");
  if (reduceMotion || !main) {
    onMidpoint();
    return;
  }
  main.animate([{ opacity: 1 }, { opacity: 0.1 }, { opacity: 1 }], { duration: 520, easing: "ease-in-out" });
  setTimeout(onMidpoint, 230);
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {
      /* private browsing / blocked storage -- fall back to default silently */
    }
    if (saved && DICT.meta.locales.includes(saved as Locale) && saved !== DEFAULT_LOCALE) {
      setLangState(saved as Locale);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = DICT.meta.htmlLang[lang];
  }, [lang]);

  const setLang = useCallback(
    (next: Locale) => {
      if (next === lang) return;
      dip(() => {
        setLangState(next);
        try {
          localStorage.setItem(STORAGE_KEY, next);
        } catch {
          /* ignore */
        }
      });
    },
    [lang]
  );

  const t = useCallback((key: string) => DICT[lang][key] ?? DICT[DEFAULT_LOCALE][key] ?? key, [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
}

export function useT() {
  return useLang().t;
}

export function T({ k }: { k: string }) {
  const t = useT();
  return <>{t(k)}</>;
}

export function clockLocale(lang: Locale) {
  return DICT.meta.clock.locale[lang];
}
export const CLOCK_TIMEZONE = DICT.meta.clock.timeZone;
export const LOCALES = DICT.meta.locales;
