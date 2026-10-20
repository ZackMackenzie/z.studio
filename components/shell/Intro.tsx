"use client";

import { useEffect, useRef, useState } from "react";
import { useT } from "@/lib/i18n";
import { useShell } from "@/lib/shell-state";

const GLYPHS = ["Z", "a", "c", "k", " ", "R", "o", "d", "r", "i", "g", "u", "e", "s"];
const EASE = "cubic-bezier(.16,1,.3,1)";
const EASE_IN_OUT = "cubic-bezier(.76,0,.24,1)";

export function Intro({ onDone }: { onDone: () => void }) {
  const t = useT();
  const { navLogoRef } = useShell();
  const [visible, setVisible] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const glyphRefs = useRef<HTMLSpanElement[]>([]);
  const tagRefs = useRef<HTMLSpanElement[]>([]);
  const skippedRef = useRef(false);
  const exitingRef = useRef(false);
  const doneRef = useRef(false);

  glyphRefs.current = [];
  const registerGlyph = (el: HTMLSpanElement | null) => {
    if (el) glyphRefs.current.push(el);
  };
  tagRefs.current = [];
  const registerTag = (el: HTMLSpanElement | null) => {
    if (el) tagRefs.current.push(el);
  };

  function finish() {
    if (doneRef.current) return;
    doneRef.current = true;
    setVisible(false);
    if (navLogoRef.current) navLogoRef.current.style.opacity = "1";
    onDone();
  }

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      const anim = loaderRef.current?.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 350,
        delay: 250,
        fill: "forwards",
      });
      if (anim) anim.onfinish = finish;
      else finish();
      return;
    }

    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";

    glyphRefs.current.forEach((g, i) => {
      g.animate([{ transform: "translateY(108%)" }, { transform: "none" }], {
        duration: 1100,
        delay: 250 + i * 46,
        easing: EASE,
        fill: "both",
      });
    });
    tagRefs.current.forEach((tag) => {
      tag.animate([{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "none" }], {
        duration: 700,
        delay: 900,
        easing: EASE,
        fill: "both",
      });
    });

    const portraitPreload = new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = img.onerror = () => resolve();
      img.src = "/images/zack-about.jpg";
    });
    const fontsReady =
      "fonts" in document
        ? Promise.all([document.fonts.load("400 40px Inter"), document.fonts.load("700 40px Manrope")])
        : Promise.resolve();
    const ready = Promise.race([
      Promise.all([fontsReady, portraitPreload]),
      new Promise((resolve) => setTimeout(resolve, 7000)),
    ]);
    const min = new Promise((resolve) => setTimeout(resolve, 1900));

    function skip() {
      if (exitingRef.current || skippedRef.current) return;
      skippedRef.current = true;
      const anim = loaderRef.current?.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: "forwards" });
      if (anim) anim.onfinish = finish;
      else finish();
    }
    function onKeydown(e: KeyboardEvent) {
      if (e.key === "Enter" || e.key === " ") skip();
    }
    loaderRef.current?.addEventListener("click", skip);
    window.addEventListener("keydown", onKeydown);

    Promise.all([ready, min]).then(() => {
      if (skippedRef.current) return;
      exitingRef.current = true;

      tagRefs.current.forEach((tag) => {
        tag.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: "forwards" });
      });
      panelRef.current?.animate([{ clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)" }], {
        duration: 750,
        easing: EASE_IN_OUT,
        fill: "forwards",
      });

      setTimeout(() => {
        const wm = wordmarkRef.current;
        const logo = navLogoRef.current;
        if (wm && logo) {
          const a = wm.getBoundingClientRect();
          const b = logo.getBoundingClientRect();
          const scale = b.width / a.width;
          const dx = b.left - a.left;
          const dy = b.top + b.height / 2 - (a.top + (a.height * scale) / 2);
          const anim = wm.animate([{ transform: "none" }, { transform: `translate(${dx}px,${dy}px) scale(${scale})` }], {
            duration: 950,
            easing: EASE_IN_OUT,
            fill: "forwards",
          });
          anim.onfinish = () => {
            logo.style.opacity = "1";
            wm.style.opacity = "0";
          };
        }
      }, 450);

      setTimeout(() => {
        panelRef.current?.animate([{ clipPath: "inset(0 0 0% 0)" }, { clipPath: "inset(0 0 100% 0)" }], {
          duration: 900,
          easing: EASE_IN_OUT,
          fill: "forwards",
        });
        bgRef.current?.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 400, delay: 500, fill: "forwards" });
      }, 1250);

      setTimeout(finish, 2300);
    });

    return () => {
      loaderRef.current?.removeEventListener("click", skip);
      window.removeEventListener("keydown", onKeydown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={loaderRef}
      role="status"
      aria-label="Zack Rodrigues"
      style={{ position: "fixed", inset: 0, zIndex: "var(--z-loader)" }}
    >
      <div ref={bgRef} style={{ position: "absolute", inset: 0, background: "#000" }} />
      <div
        ref={panelRef}
        style={{ position: "absolute", inset: 0, background: "#fff", clipPath: "inset(100% 0 0 0)" }}
      />
      <div className="zs-pad" style={{ position: "absolute", top: 28, left: 0, right: 0, display: "flex", justifyContent: "space-between" }}>
        <span ref={registerTag} className="zs-lbl" style={{ opacity: 0 }}>
          {t("ld_tag")}
        </span>
        <span ref={registerTag} className="zs-lbl" style={{ opacity: 0 }}>
          São Paulo, BR
        </span>
      </div>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div
          ref={wordmarkRef}
          aria-hidden="true"
          className="zs-wordmark-loader"
          style={{ display: "inline-flex", transformOrigin: "0 0", color: "#fff", mixBlendMode: "difference" }}
        >
          {GLYPHS.map((g, i) => (
            <span
              key={i}
              style={{ overflow: "hidden", display: "block", padding: ".08em 0", width: g === " " ? ".235em" : undefined }}
            >
              <span ref={registerGlyph} style={{ display: "block" }}>
                {g === " " ? "" : g}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
