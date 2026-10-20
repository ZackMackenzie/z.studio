"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useLang, useT, LOCALES, type Locale } from "@/lib/i18n";
import { useShell, ROUTES } from "@/lib/shell-state";
import { TLink } from "@/components/TLink";

export function Header() {
  const t = useT();
  const { lang, setLang } = useLang();
  const { menuOpen, toggleMenu, navLogoRef } = useShell();
  const pathname = usePathname();
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const btnRefs = useRef<Partial<Record<Locale, HTMLButtonElement>>>({});

  const route = ROUTES[pathname];
  const centerLabel = route ? (route.n ? `${route.n} / ${t(route.labelKey)}` : t(route.labelKey)) : "";

  const positionIndicator = () => {
    const btn = btnRefs.current[lang];
    const ind = indicatorRef.current;
    if (!btn || !ind) return;
    ind.style.left = btn.offsetLeft + 8 + "px";
    ind.style.width = btn.offsetWidth - 16 + "px";
  };

  useLayoutEffect(() => {
    positionIndicator();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useEffect(() => {
    window.addEventListener("resize", positionIndicator);
    return () => window.removeEventListener("resize", positionIndicator);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header
      className="zs-pad"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: "var(--z-header)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 16,
        height: "var(--header-h)",
        mixBlendMode: menuOpen ? "normal" : "difference",
        color: menuOpen ? "#000" : "#fff",
      }}
    >
      <TLink
        href="/"
        ref={navLogoRef}
        id="zs-navlogo"
        aria-label="z.studio"
        className="zs-wordmark-header zs-fade-hover"
        style={{ opacity: 0, color: "inherit", display: "inline-block", minHeight: 44 }}
      >
        z.studio
      </TLink>
      <span
        className="zs-lbl zs-navmid"
        style={{ color: "inherit", fontVariantNumeric: "tabular-nums" }}
      >
        {centerLabel}
      </span>
      <div className="zs-nr" style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div role="group" aria-label="Language" style={{ position: "relative", display: "flex" }}>
          {LOCALES.map((l) => (
            <button
              key={l}
              ref={(el) => {
                if (el) btnRefs.current[l] = el;
              }}
              data-lang={l}
              aria-label={l === "pt" ? "Português" : l === "en" ? "English" : "Español"}
              aria-pressed={lang === l}
              onClick={() => setLang(l)}
              className="zs-lang-btn"
              style={{
                background: "none",
                border: 0,
                color: "inherit",
                cursor: "pointer",
                padding: "16px 8px",
                minHeight: 44,
                opacity: lang === l ? 1 : 0.45,
                transition: "opacity .4s",
              }}
            >
              {l.toUpperCase()}
            </button>
          ))}
          <span
            ref={indicatorRef}
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: 12,
              left: 0,
              width: 0,
              height: 1,
              background: "currentColor",
              transition: "left .6s var(--ease), width .6s var(--ease)",
            }}
          />
        </div>
        <button
          id="zs-menubtn"
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-controls="zs-menu"
          className="zs-menu-btn zs-fade-hover"
          style={{
            background: "none",
            border: 0,
            color: "inherit",
            cursor: "pointer",
            padding: "12px 0",
            minHeight: 44,
            minWidth: 64,
            textAlign: "right",
          }}
        >
          {t(menuOpen ? "menu_close" : "menu_open")}
        </button>
      </div>
    </header>
  );
}
