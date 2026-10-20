"use client";

import { useEffect, useRef } from "react";
import { useT } from "@/lib/i18n";
import { useShell } from "@/lib/shell-state";

const PROJECTS = ["p0", "p1", "p2", "p3"];

export function CaseOverlay() {
  const t = useT();
  const { caseIndex, closeCase, stepCase } = useShell();
  const overlayRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLButtonElement>(null);
  const childRefs = useRef<HTMLElement[]>([]);
  const reduceMotionRef = useRef(false);
  const prevIndexRef = useRef<number | null>(null);

  useEffect(() => {
    reduceMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  childRefs.current = [];
  const registerChild = (el: HTMLElement | null) => {
    if (el) childRefs.current.push(el);
  };

  useEffect(() => {
    if (caseIndex === null) {
      prevIndexRef.current = null;
      return;
    }
    const isFreshOpen = prevIndexRef.current === null;
    prevIndexRef.current = caseIndex;
    overlayRef.current?.scrollTo({ top: 0 });

    if (isFreshOpen) {
      const timer = setTimeout(() => backRef.current?.focus({ preventScroll: true }), 500);
      if (reduceMotionRef.current) return () => clearTimeout(timer);
      childRefs.current.forEach((el, k) => {
        el.animate(
          [
            { opacity: 0, transform: "translateY(36px)" },
            { opacity: 1, transform: "none" },
          ],
          { duration: 1000, delay: 450 + k * 70, easing: "cubic-bezier(.16,1,.3,1)", fill: "backwards" }
        );
      });
      return () => clearTimeout(timer);
    }

    // stepping prev/next within an already-open overlay
    if (reduceMotionRef.current) return;
    childRefs.current.forEach((el, k) => {
      el.animate(
        [
          { opacity: 0, transform: "translateY(36px)" },
          { opacity: 1, transform: "none" },
        ],
        { duration: 800, delay: k * 50, easing: "cubic-bezier(.16,1,.3,1)", fill: "backwards" }
      );
    });
  }, [caseIndex]);

  useEffect(() => {
    if (caseIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") stepCase(1);
      if (e.key === "ArrowLeft") stepCase(-1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [caseIndex, stepCase]);

  const open = caseIndex !== null;
  const p = PROJECTS[caseIndex ?? 0];

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="zs-ct"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: "var(--z-case)",
        background: "#000",
        overflowY: "auto",
        visibility: open ? "visible" : "hidden",
        clipPath: open ? "inset(0 0 0 0)" : "inset(100% 0 0 0)",
        transition: open
          ? "clip-path .9s cubic-bezier(.76,0,.24,1)"
          : "clip-path .75s cubic-bezier(.76,0,.24,1), visibility 0s linear .75s",
      }}
    >
      <div className="zs-pad" style={{ paddingTop: 104, paddingBottom: 56 }}>
        <button
          ref={backRef}
          onClick={closeCase}
          className="zs-fade-hover"
          style={{
            background: "none",
            border: 0,
            color: "#fff",
            font: "600 14px/1 var(--font-display)",
            letterSpacing: ".04em",
            cursor: "pointer",
            padding: "12px 0",
            minHeight: 44,
          }}
        >
          ← {t("case_back")}
        </button>
        <div style={{ marginTop: 32, maxWidth: 900 }} ref={registerChild}>
          <div className="zs-lbl" id="zs-cidx" style={{ marginBottom: 24 }}>
            {`0${(caseIndex ?? 0) + 1} / 04`}
          </div>
          <h2 id="zs-ct" className="zs-case-title" style={{ margin: "0 0 40px" }}>
            {t(`${p}_n`)}
          </h2>
          <p className="zs-case-lead" style={{ margin: "0 0 40px", color: "var(--ink-300)" }}>
            {t(`${p}_l`)}
          </p>
          <div
            style={{
              borderTop: "1px solid var(--line-subtle)",
              display: "grid",
              gridTemplateColumns: "120px 1fr",
              gap: "14px 16px",
              padding: "20px 0",
              font: "400 15px/1.4 var(--font-body)",
            }}
          >
            <span className="zs-lbl">{t("case_disc")}</span>
            <span>{t(`${p}_k`)}</span>
            <span className="zs-lbl">{t("case_fmt")}</span>
            <span>{t(`${p}_m`)}</span>
            <span className="zs-lbl">{t("case_status")}</span>
            <span>{t("case_status_v")}</span>
          </div>
        </div>
        <div
          ref={registerChild}
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 16,
            marginTop: 72,
            borderTop: "1px solid var(--line-strong)",
            paddingTop: 8,
          }}
        >
          <button
            onClick={() => stepCase(-1)}
            className="zs-case-nav zs-fade-hover"
            style={{ background: "none", border: 0, color: "#fff", cursor: "pointer", padding: "20px 0", minHeight: 44, textAlign: "left" }}
          >
            ← {t("case_prev")}
          </button>
          <button
            onClick={() => stepCase(1)}
            className="zs-case-nav zs-fade-hover"
            style={{ background: "none", border: 0, color: "#fff", cursor: "pointer", padding: "20px 0", minHeight: 44, textAlign: "right" }}
          >
            {t("case_next")} →
          </button>
        </div>
      </div>
    </div>
  );
}
