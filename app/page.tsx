"use client";

import { useT } from "@/lib/i18n";
import { Reveal } from "@/components/motion/Reveal";
import { SplitChars } from "@/components/motion/SplitChars";
import { Clock } from "@/components/Clock";

export default function HomePage() {
  const t = useT();

  return (
    <section
      id="zs-hero"
      data-n="01"
      className="zs-pad"
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        paddingTop: 120,
        paddingBottom: 40,
        gap: 64,
      }}
    >
      <div>
        <SplitChars text={t("hero_h")} as="h1" className="zs-h1-hero" />
      </div>
      <div>
        <Reveal type="rule" delay={700} className="zs-rule" style={{ marginBottom: 24 }} as="div" />
        <Reveal type="up" delay={850}>
          <div className="zs-hmeta">
            <p className="zs-body-hero" style={{ margin: 0, color: "var(--ink-300)", gridColumn: "span 2" }}>
              {t("hero_sub")}
            </p>
            <div>
              <div className="zs-lbl" style={{ marginBottom: 10 }}>
                {t("hero_founder")}
              </div>
              <div style={{ font: "600 16px/1.3 var(--font-display)" }}>Zack Rodrigues</div>
            </div>
            <div>
              <div className="zs-lbl" style={{ marginBottom: 10 }}>
                {t("hero_now")}
              </div>
              <Clock />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
