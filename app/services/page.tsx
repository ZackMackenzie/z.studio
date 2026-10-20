"use client";

import { useT } from "@/lib/i18n";
import { useShell } from "@/lib/shell-state";
import { Reveal } from "@/components/motion/Reveal";

const SERVICES = ["s0", "p0", "s1", "p1", "s2", "p2", "s3", "p3"]; // [nameKey, descProjectPrefix] pairs below
const LETTERS = ["A", "B", "C", "D"];

export default function ServicesPage() {
  const t = useT();
  const { openCase } = useShell();

  return (
    <section className="zs-pad" style={{ paddingTop: 140, paddingBottom: 96 }}>
      <Reveal type="rule" className="zs-rule" as="div" />
      <div style={{ padding: "20px 0 56px" }}>
        <span className="zs-lbl">
          <span style={{ marginRight: 16 }}>04</span>
          <span>{t("serv_t")}</span>
        </span>
      </div>
      <div>
        {LETTERS.map((letter, i) => {
          const nameKey = SERVICES[i * 2];
          const descKey = SERVICES[i * 2 + 1];
          return (
            <Reveal key={letter} type="up" delay={i * 70} as="div">
              <a
                href="/work"
                onClick={(e) => {
                  e.preventDefault();
                  openCase(i);
                }}
                className="zs-cap zs-service-row"
                style={{ borderTop: "1px solid var(--line-subtle)", padding: "32px 0", color: "#fff" }}
              >
                <span className="zs-lbl" style={{ color: "inherit", opacity: 0.7 }}>
                  {letter}
                </span>
                <span className="zs-service-name">{t(`${nameKey}_n`)}</span>
                <span className="zs-capd zs-body-hero" style={{ maxWidth: "none" }}>
                  {t(`${descKey}_l`)}
                </span>
                <span aria-hidden="true" style={{ textAlign: "right", font: "600 20px/1 var(--font-display)" }}>
                  →
                </span>
              </a>
            </Reveal>
          );
        })}
        <div style={{ borderTop: "1px solid var(--line-subtle)" }} />
      </div>
    </section>
  );
}
