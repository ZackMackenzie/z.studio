"use client";

import { useT } from "@/lib/i18n";
import { TLink } from "@/components/TLink";

export function Footer() {
  const t = useT();

  function backToTop(e: React.MouseEvent) {
    e.preventDefault();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }

  return (
    <div className="zs-pad" style={{ paddingBottom: 40 }}>
      <footer
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "8px 32px",
          marginTop: 40,
          paddingTop: 20,
          borderTop: "1px solid var(--line-subtle)",
        }}
      >
        <span style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span className="zs-wordmark-footer">z.studio</span>
          <span className="zs-lbl" style={{ textTransform: "none", letterSpacing: ".01em", fontWeight: 400, fontSize: 13 }}>
            {t("foot_tag")}
          </span>
        </span>
        <span style={{ display: "flex", gap: "8px 24px", flexWrap: "wrap" }}>
          <a
            href="https://www.linkedin.com/in/z-studio"
            target="_blank"
            rel="noopener noreferrer"
            className="zs-lbl footer-link"
            style={{ minHeight: 44, display: "inline-flex", alignItems: "center" }}
          >
            LinkedIn ↗
          </a>
          <a
            href="https://www.instagram.com/z.studio.portifolio/"
            target="_blank"
            rel="noopener noreferrer"
            className="zs-lbl footer-link"
            style={{ minHeight: 44, display: "inline-flex", alignItems: "center" }}
          >
            Instagram ↗
          </a>
          <TLink href="/terms" className="zs-lbl footer-link" style={{ minHeight: 44, display: "inline-flex", alignItems: "center" }}>
            {t("foot_terms")}
          </TLink>
          <a
            href="#top"
            onClick={backToTop}
            className="zs-lbl footer-link"
            style={{ minHeight: 44, display: "inline-flex", alignItems: "center" }}
          >
            {t("foot_top")}
          </a>
        </span>
        <span className="zs-lbl" style={{ flexBasis: "100%", marginTop: 8 }}>
          {t("foot_copy")}
        </span>
      </footer>
    </div>
  );
}
