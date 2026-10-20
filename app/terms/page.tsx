"use client";

import { useT } from "@/lib/i18n";
import { Reveal } from "@/components/motion/Reveal";

const CLAUSES = ["t0", "t1", "t2", "t3", "t4", "t5"];

export default function TermsPage() {
  const t = useT();

  return (
    <section className="zs-pad" style={{ paddingTop: 140, paddingBottom: 96 }}>
      <Reveal type="rule" className="zs-rule" as="div" />
      <div style={{ padding: "20px 0 48px" }}>
        <span className="zs-lbl">{t("terms_t")}</span>
      </div>
      <h2 className="zs-h2-terms" style={{ margin: "0 0 24px" }}>
        {t("terms_h")}
      </h2>
      <p className="zs-lead" style={{ margin: "0 0 56px", color: "var(--ink-300)", maxWidth: "52ch" }}>
        {t("terms_lead")}
      </p>
      <div className="zs-exp">
        {CLAUSES.map((c, i) => (
          <Reveal key={c} type="up" delay={(i % 2) * 80} as="div" style={{ borderTop: "1px solid var(--line-subtle)", padding: "28px 0 40px" }}>
            <span className="zs-lbl">{`0${i + 1}`}</span>
            <h3 className="zs-h3-terms" style={{ margin: "16px 0 12px" }}>
              {t(`${c}_h`)}
            </h3>
            <p className="zs-terms-p" style={{ margin: 0, color: "var(--ink-300)" }}>
              {t(`${c}_p`)}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
