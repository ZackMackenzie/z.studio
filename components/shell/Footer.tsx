"use client";

import { usePathname } from "next/navigation";
import { useT } from "@/lib/i18n";
import { TLink } from "@/components/TLink";

// z.studio is a brand name that must stay lowercase even inside text
// rendered with an uppercase label style (.zs-lbl) -- CSS text-transform
// only changes the paint, not the DOM text, so "(z.studio)" inside an
// uppercase span would otherwise read as "(Z.STUDIO)".
function withBrandCasing(text: string) {
  const BRAND = "z.studio";
  const i = text.indexOf(BRAND);
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <span style={{ textTransform: "none" }}>{BRAND}</span>
      {text.slice(i + BRAND.length)}
    </>
  );
}

export function Footer() {
  const t = useT();
  const pathname = usePathname();
  const isHome = pathname === "/";

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
          <span className="zs-wordmark-footer">Zack Rodrigues</span>
          <span className="zs-lbl" style={{ textTransform: "none", letterSpacing: ".01em", fontWeight: 400, fontSize: 13 }}>
            {t("foot_tag")}
          </span>
        </span>
        <span style={{ display: "flex", gap: "8px 24px", flexWrap: "wrap" }}>
          <a
            href="https://www.linkedin.com/in/zackmackenzie"
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
          {!isHome && (
            <TLink href="/" className="zs-lbl footer-link" style={{ minHeight: 44, display: "inline-flex", alignItems: "center" }}>
              {t("foot_home")}
            </TLink>
          )}
        </span>
        <span className="zs-lbl" style={{ flexBasis: "100%", marginTop: 8 }}>
          {withBrandCasing(t("foot_copy"))}
        </span>
      </footer>
    </div>
  );
}
