"use client";

import { useEffect, useLayoutEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { useShell } from "@/lib/shell-state";

type RevealType = "up" | "clip" | "rule";

const EASE = "cubic-bezier(.16,1,.3,1)";
const EASE_IN_OUT = "cubic-bezier(.76,0,.24,1)";

// will-change at prep time is scoped to `eager` (hero content, which
// plays within the first second of load) rather than set for every
// reveal on the page up front -- promoting dozens of below-the-fold
// elements to their own compositing layer before they're anywhere near
// playing is wasted GPU memory. Non-eager elements still get it, just
// deferred to the moment they're actually about to animate (applyFinal).
function applyInitial(el: HTMLElement, type: RevealType, eager: boolean) {
  if (type === "up") {
    el.style.opacity = "0";
    el.style.transform = "translateY(32px)";
    if (eager) el.style.willChange = "transform, opacity";
  } else if (type === "rule") {
    el.style.transform = "scaleX(0)";
    el.style.transformOrigin = "left";
    if (eager) el.style.willChange = "transform";
  }
}

// Clears the inline transition/will-change this reveal set, once its
// animation is done -- otherwise an element with its own CSS :hover
// transition (e.g. .zs-cta-pill) is stuck using the reveal's 1000ms/1400ms
// duration for hovers forever after, since the inline value set during
// the reveal outranks the stylesheet rule.
function applyFinal(el: HTMLElement, type: RevealType, delay: number) {
  if (type === "up") {
    el.style.willChange = "transform, opacity";
    el.style.transition = `transform 1000ms ${EASE} ${delay}ms, opacity 800ms ${EASE} ${delay}ms`;
    el.style.opacity = "1";
    el.style.transform = "none";
    setTimeout(() => {
      el.style.transition = "";
      el.style.willChange = "";
    }, 1000 + delay + 80);
  } else if (type === "rule") {
    el.style.willChange = "transform";
    el.style.transition = `transform 1400ms ${EASE} ${delay}ms`;
    el.style.transform = "none";
    setTimeout(() => {
      el.style.transition = "";
      el.style.willChange = "";
    }, 1400 + delay + 80);
  }
}

export function Reveal({
  type,
  delay = 0,
  as: Tag = "div",
  className,
  style,
  children,
  eager = false,
}: {
  type: RevealType;
  delay?: number;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  // Hero content (plays within the first second of load, before the
  // user can scroll) -- see applyInitial.
  eager?: boolean;
}) {
  // observeRef (the outer tag, carries className/style/layout role) is
  // always what IntersectionObserver watches. "up"/"rule" animate that
  // same element directly -- confirmed via direct instrumentation that
  // transform:scaleX(0)/translateY() don't disturb Chromium's
  // intersection geometry. "clip" is a parallax-mask reveal instead of a
  // clip-path wipe: an overflow:hidden mask div (maskRef) slides in from
  // translateY(100%) while the content inside it (clipInnerRef) slides
  // the opposite way from translateY(-100%) -- the two cancel out, so
  // the content never visually moves, only the mask's reveal edge sweeps
  // across it. Both are transform-only (GPU-composited, no paint), and
  // neither ever clips to a zero-area box, so this sidesteps the old
  // clip-path bug where an element clipped to inset(100% ...) reports
  // isIntersecting:false forever.
  const observeRef = useRef<HTMLElement | null>(null);
  const maskRef = useRef<HTMLDivElement | null>(null);
  const clipInnerRef = useRef<HTMLDivElement | null>(null);
  const { motionReady } = useShell();
  const reduceMotionRef = useRef(false);

  useLayoutEffect(() => {
    reduceMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotionRef.current) return;
    if (type === "clip") {
      const m = maskRef.current;
      const i = clipInnerRef.current;
      if (m && i) {
        m.style.transition = i.style.transition = "none";
        m.style.transform = "translateY(100%)";
        i.style.transform = "translateY(-100%)";
        if (eager) m.style.willChange = i.style.willChange = "transform";
      }
      return;
    }
    const target = observeRef.current;
    if (target) applyInitial(target, type, eager);
    // Only on mount -- each page navigation remounts this component fresh.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!motionReady || reduceMotionRef.current) return;
    const observeEl = observeRef.current;
    if (!observeEl) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (type === "clip") {
            const m = maskRef.current;
            const i = clipInnerRef.current;
            if (m && i) {
              m.style.transition = i.style.transition = `transform 1200ms ${EASE_IN_OUT} ${delay}ms`;
              m.style.transform = i.style.transform = "none";
              setTimeout(() => {
                m.style.transition = i.style.transition = "";
                m.style.willChange = i.style.willChange = "";
              }, 1200 + delay + 80);
            }
          } else {
            applyFinal(observeEl, type, delay);
          }
          io.unobserve(observeEl);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(observeEl);
    return () => io.disconnect();
  }, [motionReady, type, delay]);

  if (type === "clip") {
    return (
      <Tag ref={observeRef} className={className} style={style}>
        <div ref={maskRef} style={{ overflow: "hidden", pointerEvents: "none", width: "100%", height: "100%" }}>
          <div ref={clipInnerRef} style={{ width: "100%", height: "100%" }}>
            {children}
          </div>
        </div>
      </Tag>
    );
  }

  return (
    <Tag ref={observeRef} className={className} style={style}>
      {children}
    </Tag>
  );
}
