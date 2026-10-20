"use client";

import { useT } from "@/lib/i18n";
import { TLink } from "@/components/TLink";

// Not specified by the design package (README/PROMPT only ever describe
// the 7 approved pages) -- kept deliberately minimal and inside the same
// visual system rather than inventing new copy: a display-weight "404."
// and a single link back home, using the existing nav_home translation
// key rather than new text. Flagged in the delivery report as the one
// element outside the approved design.
export default function NotFound() {
  const t = useT();
  return (
    <section className="zs-pad" style={{ minHeight: "calc(100svh - 120px)", display: "flex", flexDirection: "column", justifyContent: "center", gap: 24 }}>
      <h1 className="zs-h1-hero" style={{ margin: 0 }}>
        404.
      </h1>
      <TLink href="/" className="zs-contact-link zs-fade-hover" style={{ display: "inline-block" }}>
        {t("nav_home")} →
      </TLink>
    </section>
  );
}
