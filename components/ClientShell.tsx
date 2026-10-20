"use client";

import { useState, type ReactNode } from "react";
import { LangProvider } from "@/lib/i18n";
import { ShellProvider } from "@/lib/shell-state";
import { Intro } from "@/components/shell/Intro";
import { Header } from "@/components/shell/Header";
import { Menu } from "@/components/shell/Menu";
import { Curtain } from "@/components/shell/Curtain";
import { Footer } from "@/components/shell/Footer";
import { CaseOverlay } from "@/components/shell/CaseOverlay";

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
        <main id="top" tabIndex={-1} style={{ minHeight: "calc(100svh - 120px)", outline: "none" }}>
          {children}
        </main>
        <Footer />
      </ShellProvider>
    </LangProvider>
  );
}
