"use client";

import { useT } from "@/lib/i18n";
import { useShell } from "@/lib/shell-state";
import { Reveal } from "@/components/motion/Reveal";

const PROJECTS = ["p0", "p1", "p2", "p3"];

export default function WorkPage() {
  const t = useT();
  const { openCase } = useShell();

  return (
    <section className="zs-pad" style={{ paddingTop: 140, paddingBottom: 96 }}>
      <Reveal type="rule" className="zs-rule" as="div" />
      <div className="zs-section-label">
        <span className="zs-lbl">
          <span style={{ marginRight: 16 }}>02</span>
          <span>{t("work_t")}</span>
        </span>
      </div>
      <div className="zs-wg">
        {PROJECTS.map((p, i) => (
          <Reveal key={p} type="up" delay={i * 90} as="div">
            <a
              href="/work"
              onClick={(e) => {
                e.preventDefault();
                openCase(i);
              }}
              className="zs-work-item"
              style={{ position: "relative", display: "block", padding: "28px 0 40px", color: "#fff" }}
            >
              <span
                aria-hidden="true"
                style={{ position: "absolute", left: 0, right: 0, top: 0, height: 1, background: "var(--line-subtle)" }}
              />
              <span
                data-rowline
                aria-hidden="true"
                style={{ position: "absolute", left: 0, right: 0, top: 0, height: 1, background: "#fff" }}
              />
              <div style={{ display: "grid", gridTemplateColumns: "40px minmax(0,1fr) 44px", gap: 12, alignItems: "start" }}>
                <span className="zs-lbl" style={{ paddingTop: "1.1em" }}>
                  {`0${i + 1}`}
                </span>
                <div>
                  <span className="zs-work-title">
                    <span data-roll style={{ display: "flex", flexDirection: "column" }}>
                      <span>{t(`${p}_n`)}</span>
                      <span aria-hidden="true">{t(`${p}_n`)}</span>
                    </span>
                  </span>
                  <p className="zs-work-desc" style={{ margin: "10px 0 16px", color: "var(--ink-300)" }}>
                    {t(`${p}_l`)}
                  </p>
                  <div className="zs-lbl" style={{ display: "flex", flexWrap: "wrap", gap: "6px 20px" }}>
                    <span>{t(`${p}_k`)}</span>
                    <span aria-hidden="true">·</span>
                    <span>{t(`${p}_m`)}</span>
                  </div>
                </div>
                <span
                  data-chip
                  aria-hidden="true"
                  style={{
                    width: 44,
                    height: 44,
                    border: "1px solid var(--line-strong)",
                    borderRadius: 999,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    font: "600 18px/1 var(--font-display)",
                    opacity: 0.6,
                  }}
                >
                  ↗
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
