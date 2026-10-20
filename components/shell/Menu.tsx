"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useT } from "@/lib/i18n";
import { useShell } from "@/lib/shell-state";
import { TLink } from "@/components/TLink";

const ITEMS = [
  { n: "02", href: "/work", labelKey: "nav_work" },
  { n: "03", href: "/about", labelKey: "nav_studio" },
  { n: "04", href: "/services", labelKey: "nav_services" },
  { n: "05", href: "/experience", labelKey: "nav_exp" },
  { n: "06", href: "/contact", labelKey: "nav_contact" },
];

export function Menu() {
  const t = useT();
  const { menuOpen, closeMenu } = useShell();
  const pathname = usePathname();
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const reduceMotionRef = useRef(false);

  useEffect(() => {
    reduceMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (!menuOpen || reduceMotionRef.current) return;
    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const delay = 200 + i * 70;
      el.animate(
        [
          { opacity: 0, transform: "translateY(48px)" },
          { opacity: 1, transform: "none" },
        ],
        { duration: 900, delay, easing: "cubic-bezier(.16,1,.3,1)", fill: "backwards" }
      );
    });
  }, [menuOpen]);

  return (
    <nav
      id="zs-menu"
      aria-label="Menu"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: "var(--z-menu)",
        background: "#fff",
        color: "#000",
        clipPath: menuOpen ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
        transition: menuOpen
          ? "clip-path .8s cubic-bezier(.76,0,.24,1)"
          : "clip-path .8s cubic-bezier(.76,0,.24,1), visibility 0s linear .8s",
        visibility: menuOpen ? "visible" : "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "96px 32px 40px",
      }}
    >
      {ITEMS.map((item, i) => {
        const active = pathname === item.href;
        return (
          <TLink
            key={item.href}
            href={item.href}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            onClick={closeMenu}
            data-active={active ? "" : undefined}
            className="zs-menu-link"
            style={{
              color: "#000",
              display: "flex",
              alignItems: "baseline",
              gap: 20,
              padding: "4px 0",
            }}
          >
            <span style={{ font: "600 12px/1 var(--font-display)", letterSpacing: ".08em", color: "#555", minWidth: 24 }}>
              {item.n}
            </span>
            <span
              className="zs-menu-item"
              style={active ? { textDecoration: "underline", textDecorationThickness: ".05em", textUnderlineOffset: ".1em" } : undefined}
            >
              {t(item.labelKey)}
            </span>
          </TLink>
        );
      })}
      <span
        style={{
          position: "absolute",
          left: 32,
          bottom: 32,
          font: "600 12px/1 var(--font-display)",
          letterSpacing: ".08em",
          textTransform: "uppercase",
          color: "#555",
        }}
      >
        Esc
      </span>
    </nav>
  );
}
