"use client";

import { useT } from "@/lib/i18n";
import { Reveal } from "@/components/motion/Reveal";
import { SplitChars } from "@/components/motion/SplitChars";

export default function ContactPage() {
  const t = useT();

  return (
    <section className="zs-pad" style={{ paddingTop: 140, paddingBottom: 40, minHeight: "calc(100svh - 160px)" }}>
      <Reveal type="rule" className="zs-rule" as="div" />
      <div style={{ padding: "20px 0 72px" }}>
        <span className="zs-lbl">
          <span style={{ marginRight: 16 }}>06</span>
          <span>{t("cont_t")}</span>
        </span>
      </div>
      <SplitChars text={t("cont_h")} as="h2" className="zs-h2-contact" />
      <Reveal type="up" delay={200} as="div">
        <p className="zs-lead" style={{ margin: "32px 0 40px", color: "var(--ink-300)", maxWidth: "40ch" }}>
          {t("cont_lead")}
        </p>
      </Reveal>
      <div className="zs-contact-links" style={{ display: "flex", flexWrap: "wrap", gap: "16px 72px" }}>
        <Reveal type="up" delay={260} as="div">
          <a
            href="https://www.linkedin.com/in/z-studio"
            target="_blank"
            rel="noopener noreferrer"
            className="zs-contact-row"
            style={{ display: "block", padding: "8px 0" }}
          >
            <span className="zs-contact-link" style={{ display: "inline-flex", alignItems: "baseline", gap: ".4em" }}>
              LinkedIn
              <span data-arrow aria-hidden="true" style={{ fontWeight: 400 }}>
                ↗
              </span>
            </span>
            <span className="zs-handle" style={{ display: "block", marginTop: 8, color: "var(--ink-400)" }}>
              linkedin.com/in/z-studio
            </span>
          </a>
        </Reveal>
        <Reveal type="up" delay={340} as="div">
          <a
            href="https://www.instagram.com/z.studio.portifolio/"
            target="_blank"
            rel="noopener noreferrer"
            className="zs-contact-row"
            style={{ display: "block", padding: "8px 0" }}
          >
            <span className="zs-contact-link" style={{ display: "inline-flex", alignItems: "baseline", gap: ".4em" }}>
              Instagram
              <span data-arrow aria-hidden="true" style={{ fontWeight: 400 }}>
                ↗
              </span>
            </span>
            <span className="zs-handle" style={{ display: "block", marginTop: 8, color: "var(--ink-400)" }}>
              @z.studio.portifolio
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
