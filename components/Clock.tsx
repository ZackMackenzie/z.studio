"use client";

import { useEffect, useState } from "react";
import { useLang, clockLocale, CLOCK_TIMEZONE } from "@/lib/i18n";

// Empty on SSR (avoids a hydration mismatch -- the server has no idea what
// time it is for the visitor), filled in after mount, refreshed every 20s.
export function Clock() {
  const { lang } = useLang();
  const [time, setTime] = useState("");

  useEffect(() => {
    function tick() {
      setTime(
        new Date().toLocaleTimeString(clockLocale(lang), {
          timeZone: CLOCK_TIMEZONE,
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }
    tick();
    const id = setInterval(tick, 20000);
    return () => clearInterval(id);
  }, [lang]);

  return (
    <div style={{ font: "600 16px/1.3 var(--font-display)", fontVariantNumeric: "tabular-nums" }}>
      {time ? `São Paulo ${time}` : "São Paulo"}
    </div>
  );
}
