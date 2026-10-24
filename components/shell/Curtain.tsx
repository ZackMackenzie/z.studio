"use client";

import { useShell } from "@/lib/shell-state";

// Purely a visual shell -- shell-state.tsx drives the panel/text
// imperatively via these refs (WAAPI .animate() calls), not React state,
// since the sequence is a one-shot choreography triggered by navigate(),
// not something that re-renders cleanly from props.
//
// The panel slides via transform (translateY), not clip-path on the
// outer element -- transform-only animations are compositor-only (no
// paint), which matters here since this plays on every single
// navigation. will-change is set permanently on the panel rather than
// toggled per-transition for the same reason: there's no idle period
// where promoting it back off would save anything. Visibility is never
// toggled either -- the panel's own translateY(100%) resting position
// already keeps it offscreen, one less piece of state that could get
// out of sync with the animation.
export function Curtain() {
  const { curtainPanelRef, curtainTextRef } = useShell();
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: "var(--z-curtain)",
        overflow: "hidden",
        color: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <div
        ref={curtainPanelRef}
        style={{ position: "absolute", inset: 0, background: "#fff", transform: "translateY(100%)", willChange: "transform" }}
      />
      <span ref={curtainTextRef} className="zs-curtain-text" style={{ position: "relative", opacity: 0 }} />
    </div>
  );
}
