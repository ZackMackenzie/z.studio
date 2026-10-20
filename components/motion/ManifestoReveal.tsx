"use client";

import { useEffect, useLayoutEffect, useMemo, useRef } from "react";

// README §6.3: not an IntersectionObserver reveal -- continuously tracks
// scroll position and lights up a proportional number of words as the
// manifesto line crosses the viewport. p = clamp((vh*.78 - top) / (height
// + vh*.22), 0, 1); first round(p * wordCount) words go to opacity 1.
export function ManifestoReveal({ text, className }: { text: string; className?: string }) {
  const wrapRef = useRef<HTMLParagraphElement>(null);
  const wordRefs = useRef<HTMLSpanElement[]>([]);
  const words = useMemo(() => text.split(" "), [text]);
  const reduceMotionRef = useRef(false);

  wordRefs.current = [];
  const register = (el: HTMLSpanElement | null) => {
    if (el) wordRefs.current.push(el);
  };

  useLayoutEffect(() => {
    reduceMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (reduceMotionRef.current) {
      wordRefs.current.forEach((w) => (w.style.opacity = "1"));
      return;
    }
    let raf = 0;
    const tick = () => {
      raf = 0;
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.78 - rect.top) / (rect.height + vh * 0.22)));
      const n = Math.round(p * wordRefs.current.length);
      wordRefs.current.forEach((w, i) => {
        w.style.opacity = i < n ? "1" : ".18";
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [words]);

  return (
    <p ref={wrapRef} aria-label={text} className={className}>
      {words.map((w, i) => (
        <span key={`${i}-${w}`}>
          <span
            ref={register}
            aria-hidden="true"
            style={{ opacity: reduceMotionRef.current ? 1 : 0.18, transition: "opacity .4s", display: "inline-block" }}
          >
            {w}
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
