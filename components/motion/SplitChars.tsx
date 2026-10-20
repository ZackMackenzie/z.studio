"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, type ElementType } from "react";
import { useShell } from "@/lib/shell-state";

// Structure matches README §6.2 exactly: word (inline-block, nowrap) >
// char-mask (overflow:hidden, the padding/margin pair that keeps accents
// and descenders from clipping) > char (the actual animated element).
function buildWords(text: string) {
  return text.split(" ").map((word, wi) => ({
    key: `${wi}-${word}`,
    word,
    chars: [...word].map((ch, ci) => ({ key: `${wi}-${ci}-${ch}`, ch })),
  }));
}

export function SplitChars({
  text,
  delay = 0,
  as: Tag = "h1",
  className,
}: {
  text: string;
  delay?: number;
  as?: ElementType;
  className?: string;
}) {
  const wrapRef = useRef<HTMLElement | null>(null);
  const charRefs = useRef<HTMLSpanElement[]>([]);
  const hasPlayedRef = useRef(false);
  const reduceMotionRef = useRef(false);
  const { motionReady } = useShell();
  const words = useMemo(() => buildWords(text), [text]);

  charRefs.current = [];
  const registerChar = (el: HTMLSpanElement | null) => {
    if (el) charRefs.current.push(el);
  };

  const applyInitial = () => {
    charRefs.current.forEach((c) => {
      c.style.transform = "translateY(112%) rotate(7deg)";
    });
  };

  const play = (playDelay: number) => {
    charRefs.current.forEach((c, i) => {
      c.style.transition = `transform 1100ms cubic-bezier(.16,1,.3,1) ${playDelay + i * 28}ms`;
      c.style.transform = "none";
    });
    hasPlayedRef.current = true;
  };

  useLayoutEffect(() => {
    reduceMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduceMotionRef.current) applyInitial();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Language change re-renders with new `words` (new char elements) --
  // replay immediately if this had already played once; otherwise leave
  // it in the initial hidden state, waiting for its first reveal.
  useLayoutEffect(() => {
    if (reduceMotionRef.current) return;
    if (hasPlayedRef.current) {
      applyInitial();
      // force a reflow so the transform reset above actually paints
      // before the transition to "none" starts, same as the prototype's
      // `el.offsetHeight` trick.
      void wrapRef.current?.offsetHeight;
      play(0);
    } else {
      applyInitial();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  useEffect(() => {
    if (!motionReady || reduceMotionRef.current || hasPlayedRef.current) return;
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            play(delay);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [motionReady, delay]);

  return (
    <Tag ref={wrapRef} aria-label={text} className={className}>
      {words.map((w, wi) => (
        <span key={w.key}>
          <span aria-hidden="true" style={{ display: "inline-block", whiteSpace: "nowrap" }}>
            {w.chars.map((c) => (
              <span
                key={c.key}
                style={{
                  display: "inline-block",
                  overflow: "hidden",
                  verticalAlign: "top",
                  padding: ".14em 0 .12em",
                  margin: "-.14em 0 -.12em",
                }}
              >
                <span ref={registerChar} style={{ display: "inline-block", transformOrigin: "0 100%" }}>
                  {c.ch}
                </span>
              </span>
            ))}
          </span>
          {wi < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
