"use client";

import { useEffect, useLayoutEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { useShell } from "@/lib/shell-state";

type RevealType = "up" | "clip" | "rule";

function applyInitial(el: HTMLElement, type: RevealType) {
  if (type === "up") {
    el.style.opacity = "0";
    el.style.transform = "translateY(32px)";
  } else if (type === "clip") {
    el.style.clipPath = "inset(100% 0 0 0)";
  } else if (type === "rule") {
    el.style.transform = "scaleX(0)";
    el.style.transformOrigin = "left";
  }
}

function applyFinal(el: HTMLElement, type: RevealType, delay: number) {
  if (type === "up") {
    el.style.transition = `transform 1000ms cubic-bezier(.16,1,.3,1) ${delay}ms, opacity 800ms cubic-bezier(.16,1,.3,1) ${delay}ms`;
    el.style.opacity = "1";
    el.style.transform = "none";
  } else if (type === "clip") {
    el.style.transition = `clip-path 1200ms cubic-bezier(.76,0,.24,1) ${delay}ms`;
    el.style.clipPath = "inset(0 0 0 0)";
  } else if (type === "rule") {
    el.style.transition = `transform 1400ms cubic-bezier(.16,1,.3,1) ${delay}ms`;
    el.style.transform = "none";
  }
}

export function Reveal({
  type,
  delay = 0,
  as: Tag = "div",
  className,
  style,
  children,
}: {
  type: RevealType;
  delay?: number;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  // observeRef (the outer tag, carries className/style/layout role) is
  // always what IntersectionObserver watches. For "up"/"rule" the same
  // element is also what gets animated -- confirmed via direct
  // instrumentation that transform:scaleX(0)/translateY() don't disturb
  // Chromium's intersection geometry. "clip" is different: its hidden
  // state, clip-path:inset(100% ...), is a genuine zero-visible-area
  // clip, and Chromium reports isIntersecting:false *forever* for an
  // element clipped to nothing, since there's no area left to ever
  // intersect the viewport -- confirmed the same way (an about-page
  // portrait sitting in the middle of the viewport never revealed,
  // logged as ratio:0 the whole time). So only "clip" gets a second,
  // inner element: the outer stays full-area for observation, the inner
  // carries the actual clip-path animation.
  const observeRef = useRef<HTMLElement | null>(null);
  const clipInnerRef = useRef<HTMLDivElement | null>(null);
  const { motionReady } = useShell();
  const reduceMotionRef = useRef(false);

  useLayoutEffect(() => {
    reduceMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotionRef.current) return;
    const target = type === "clip" ? clipInnerRef.current : observeRef.current;
    if (target) applyInitial(target, type);
    // Only on mount -- each page navigation remounts this component fresh.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!motionReady || reduceMotionRef.current) return;
    const observeEl = observeRef.current;
    const animateEl = type === "clip" ? clipInnerRef.current : observeRef.current;
    if (!observeEl || !animateEl) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            applyFinal(animateEl, type, delay);
            io.unobserve(observeEl);
          }
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
        <div ref={clipInnerRef} style={{ width: "100%", height: "100%" }}>
          {children}
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
