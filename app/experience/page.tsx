"use client";

import { useT } from "@/lib/i18n";
import { Reveal } from "@/components/motion/Reveal";

const EXPS = ["e0", "e1", "e2", "e3"];

export default function ExperiencePage() {
  const t = useT();

  return (
    <section className="zs-pad" style={{ paddingTop: 140, paddingBottom: 96 }}>
      <Reveal type="rule" className="zs-rule" as="div" />
      <div style={{ padding: "20px 0 72px" }}>
        <span className="zs-lbl">
          <span style={{ marginRight: 16 }}>05</span>
          <span>{t("exp_t")}</span>
        </span>
      </div>
      <div className="zs-exp">
        {EXPS.map((e, i) => (
          <Reveal key={e} type="up" delay={(i % 2) * 90} as="div" style={{ borderTop: "1px solid var(--line-subtle)", padding: "32px 0 56px" }}>
            <span className="zs-lbl">{`0${i + 1}`}</span>
            <h3 className="zs-h3-exp" style={{ margin: "20px 0 14px" }}>
              {t(`${e}_h`)}
            </h3>
            <p className="zs-work-desc" style={{ margin: 0, color: "var(--ink-300)" }}>
              {t(`${e}_p`)}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
