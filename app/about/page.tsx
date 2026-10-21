"use client";

import { useEffect, useRef } from "react";
import { useT } from "@/lib/i18n";
import { useShell } from "@/lib/shell-state";
import { Reveal } from "@/components/motion/Reveal";
import { ManifestoReveal } from "@/components/motion/ManifestoReveal";
import { TLink } from "@/components/TLink";

// The "paper" behind the content starts as a small inset, rounded card and
// expands to fill the page (README §6.4) -- a different shape than the
// shared Reveal "clip" type (which wipes from a flat top edge), so it's
// implemented locally rather than folded into that primitive.
function usePaperExpand(ready: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const playedRef = useRef(false);
  useEffect(() => {
    if (!ready || playedRef.current) return;
    playedRef.current = true;
    const el = ref.current;
    if (!el) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      el.style.clipPath = "inset(0 0 0 0 round 0)";
      return;
    }
    el.style.transition = "none";
    el.style.clipPath = "inset(24px 24px 0 24px round 28px)";
    void el.offsetHeight;
    el.style.transition = "clip-path 1400ms cubic-bezier(.16,1,.3,1) 500ms";
    el.style.clipPath = "inset(0px 0px 0px 0px round 0px)";
  }, [ready]);
  return ref;
}

export default function AboutPage() {
  const t = useT();
  const { motionReady } = useShell();
  const paperRef = usePaperExpand(motionReady);

  return (
    <section className="zs-pad" style={{ position: "relative", padding: "120px 32px", color: "#000" }}>
      <div ref={paperRef} style={{ position: "absolute", inset: 0, background: "#fff" }} />
      <div style={{ position: "relative" }}>
        <Reveal type="rule" className="zs-rule" style={{ background: "var(--line-on-white)" }} as="div" />
        <div style={{ padding: "20px 0 72px" }}>
          <span className="zs-lbl" style={{ color: "var(--ink-500)" }}>
            <span style={{ marginRight: 16 }}>03</span>
            <span>{t("about_t")}</span>
          </span>
        </div>
        <div className="zs-ab">
          <div>
            <ManifestoReveal text={t("studio_m")} className="zs-manifesto" />
            <div style={{ display: "grid", gap: 20, maxWidth: "56ch", color: "var(--ink-700)" }}>
              <Reveal type="up" delay={0} as="div">
                <p className="zs-about-p1" style={{ margin: 0 }}>
                  {t("about_1")}
                </p>
              </Reveal>
              <Reveal type="up" delay={60} as="div">
                <p className="zs-about-p" style={{ margin: 0 }}>
                  {t("about_2")}
                </p>
              </Reveal>
              <Reveal type="up" delay={120} as="div">
                <p className="zs-about-p" style={{ margin: 0 }}>
                  {t("about_3")}
                </p>
              </Reveal>
              <Reveal type="up" delay={180} as="div">
                <p className="zs-about-p" style={{ margin: 0 }}>
                  {t("about_4")}
                </p>
              </Reveal>
              <Reveal type="up" delay={240} as="div">
                <p className="zs-about-p" style={{ margin: 0 }}>
                  {t("about_5")}
                </p>
              </Reveal>
            </div>
            <Reveal type="up" delay={300} as="div">
              <TLink
                href="/contact"
                className="zs-cta-pill"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  marginTop: 40,
                  height: 52,
                  padding: "0 28px",
                  borderRadius: 999,
                  background: "#000",
                  color: "#fff",
                }}
              >
                {t("about_cta")}
              </TLink>
            </Reveal>
          </div>
          <Reveal type="clip" as="figure" style={{ margin: 0, maxWidth: 340, justifySelf: "end", width: "100%" }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- deliberate: README calls for a plain <img>, no next/image effects/optimization on the one approved portrait */}
            <img src="/images/zack-about.jpg" alt="Zack Rodrigues" width={1000} height={1000} decoding="async" style={{ display: "block", width: "100%", height: "auto" }} />
            <figcaption className="zs-lbl" style={{ color: "var(--ink-500)", marginTop: 14 }}>
              Zack Rodrigues
            </figcaption>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
