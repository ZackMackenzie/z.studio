"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { LangProvider } from "@/lib/i18n";
import { ShellProvider, useShell } from "@/lib/shell-state";
import { Intro } from "@/components/shell/Intro";
import { Header } from "@/components/shell/Header";
import { Menu } from "@/components/shell/Menu";
import { Curtain } from "@/components/shell/Curtain";
import { Footer } from "@/components/shell/Footer";
import { CaseOverlay } from "@/components/shell/CaseOverlay";

// About's own content already sizes the page (bio text + sticky
// portrait); the shared floor below is only needed for short pages
// (Contact, Terms). The floor must flip in sync with `motionGeneration`
// (bumped by ShellProvider's swapEffects, right after the curtain has
// fully covered the screen) rather than with raw pathname, which updates
// the instant router.push fires -- well before the curtain finishes
// rising. Resizing <main> that early was visible underneath the curtain
// as a stutter mid-transition.
function MainContent({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { motionGeneration } = useShell();
  const [safePathname, setSafePathname] = useState(pathname);

  useEffect(() => {
    setSafePathname(pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [motionGeneration]);

  const isAbout = safePathname.startsWith("/about");

  return (
    <main id="top" tabIndex={-1} style={{ minHeight: isAbout ? 0 : "calc(100svh - 120px)", outline: "none" }}>
      {children}
    </main>
  );
}

export function ClientShell({ children }: { children: ReactNode }) {
  const [introDone, setIntroDone] = useState(false);

  return (
    <LangProvider>
      <ShellProvider introDone={introDone}>
        <Intro onDone={() => setIntroDone(true)} />
        <Header />
        <Menu />
        <Curtain />
        <CaseOverlay />
        <MainContent>{children}</MainContent>
        <Footer />
      </ShellProvider>
    </LangProvider>
  );
}
