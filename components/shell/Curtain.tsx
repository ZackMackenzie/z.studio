"use client";

import { useShell } from "@/lib/shell-state";

// Purely a visual shell -- shell-state.tsx drives clip-path/visibility/text
// imperatively via these two refs (WAAPI .animate() calls), not React
// state, since the sequence is a one-shot choreography triggered by
// navigate(), not something that re-renders cleanly from props.
export function Curtain() {
  const { curtainRef, curtainTextRef } = useShell();
  return (
    <div
      ref={curtainRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: "var(--z-curtain)",
        background: "#fff",
        color: "#000",
        clipPath: "inset(100% 0 0 0)",
        visibility: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <span ref={curtainTextRef} className="zs-curtain-text" style={{ opacity: 0 }} />
    </div>
  );
}
