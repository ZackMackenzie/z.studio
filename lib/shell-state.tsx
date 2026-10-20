"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { useT } from "@/lib/i18n";

export const EASE = "cubic-bezier(.16,1,.3,1)";
export const EASE_IN_OUT = "cubic-bezier(.76,0,.24,1)";

export const ROUTES: Record<string, { n: string; labelKey: string; curtainKey?: string }> = {
  "/": { n: "01", labelKey: "nav_home" },
  "/work": { n: "02", labelKey: "nav_work" },
  "/about": { n: "03", labelKey: "nav_studio" },
  "/services": { n: "04", labelKey: "nav_services" },
  "/experience": { n: "05", labelKey: "nav_exp" },
  "/contact": { n: "06", labelKey: "nav_contact" },
  "/terms": { n: "", labelKey: "terms_t", curtainKey: "foot_terms" },
};

function reducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type ShellContextValue = {
  menuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
  caseIndex: number | null;
  openCase: (i: number) => void;
  closeCase: () => void;
  stepCase: (delta: number) => void;
  motionReady: boolean;
  motionGeneration: number;
  navigate: (href: string) => void;
  curtainRef: React.RefObject<HTMLDivElement | null>;
  curtainTextRef: React.RefObject<HTMLSpanElement | null>;
  navLogoRef: React.RefObject<HTMLAnchorElement | null>;
};

const ShellContext = createContext<ShellContextValue | null>(null);

export function useShell() {
  const ctx = useContext(ShellContext);
  if (!ctx) throw new Error("useShell must be used inside ShellProvider");
  return ctx;
}

export function ShellProvider({ children, introDone }: { children: ReactNode; introDone: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const t = useT();

  const [menuOpen, setMenuOpen] = useState(false);
  const [caseIndex, setCaseIndex] = useState<number | null>(null);
  const [motionReady, setMotionReady] = useState(false);
  const [motionGeneration, setMotionGeneration] = useState(0);

  const curtainRef = useRef<HTMLDivElement>(null);
  const curtainTextRef = useRef<HTMLSpanElement>(null);
  const navLogoRef = useRef<HTMLAnchorElement>(null);
  const busyRef = useRef(false);
  const pendingRef = useRef<string | null>(null);
  const intentionalRef = useRef(false);
  const prevPathnameRef = useRef(pathname);

  // Intro finishing is what first arms the whole reveal system (matches
  // the prototype's startReveals(), called from the loader's finish()).
  useEffect(() => {
    if (introDone) setMotionReady(true);
  }, [introDone]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), []);

  const closeCase = useCallback(() => setCaseIndex(null), []);
  const openCase = useCallback((i: number) => setCaseIndex(i), []);
  const stepCase = useCallback((delta: number) => {
    setCaseIndex((cur) => (cur === null ? cur : (cur + delta + 4) % 4));
  }, []);

  const swapEffects = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const main = document.getElementById("top");
    main?.focus({ preventScroll: true });
    setMenuOpen(false);
    setCaseIndex(null);
    // New page's Reveal/SplitChars/ManifestoReveal instances have already
    // mounted fresh (new route = new React tree) in their initial hidden
    // state; bumping the generation re-triggers the "wait for motionReady"
    // effect inside each of them after the 520ms the spec calls for.
    setMotionReady(false);
    setMotionGeneration((g) => g + 1);
    setTimeout(() => setMotionReady(true), 520);
  }, []);

  const runCurtain = useCallback(
    (label: string, opts: { withRise: boolean }) => {
      const cur = curtainRef.current;
      const curt = curtainTextRef.current;
      if (!cur || !curt) return;
      cur.style.visibility = "visible";
      curt.textContent = label;
      curt.style.opacity = "0";

      const rise = () =>
        new Promise<void>((resolve) => {
          if (!opts.withRise) {
            cur.style.clipPath = "inset(0 0 0 0)";
            resolve();
            return;
          }
          const anim = cur.animate(
            [{ clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0 0 0 0)" }],
            { duration: 600, easing: EASE_IN_OUT, fill: "forwards" }
          );
          anim.onfinish = () => resolve();
        });

      rise().then(() => {
        swapEffects();
        curt.animate(
          [
            { opacity: 0, transform: "translateY(24px)" },
            { opacity: 1, transform: "none" },
          ],
          { duration: 500, easing: EASE, fill: "forwards" }
        );
        setTimeout(() => {
          curt.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 250, fill: "forwards" });
          cur.animate(
            [{ clipPath: "inset(0 0 0 0)" }, { clipPath: "inset(0 0 100% 0)" }],
            { duration: 750, easing: EASE_IN_OUT, fill: "forwards" }
          );
          setTimeout(() => {
            cur.style.visibility = "hidden";
            busyRef.current = false;
            const next = pendingRef.current;
            pendingRef.current = null;
            // goRef, not a closed-over `go`: runCurtain is memoized once
            // (its only dep, swapEffects, never changes identity) and
            // would otherwise freeze on the very first render's `go` --
            // stale pathname/t/router from mount, not whatever they are
            // by the time a queued route actually gets processed here.
            if (next) goRef.current(next);
          }, 780);
        }, 450);
      });
    },
    [swapEffects]
  );

  const go = useCallback(
    (href: string) => {
      if (href === pathname) return;
      if (busyRef.current) {
        pendingRef.current = href;
        return;
      }
      const route = ROUTES[href];
      const label = route ? t(route.curtainKey ?? route.labelKey) : "";

      if (reducedMotion()) {
        router.push(href, { scroll: false });
        swapEffects();
        return;
      }

      busyRef.current = true;
      intentionalRef.current = true;
      router.push(href, { scroll: false });
      runCurtain(label, { withRise: true });
    },
    [pathname, router, runCurtain, swapEffects, t]
  );

  const goRef = useRef(go);
  useEffect(() => {
    goRef.current = go;
  }, [go]);

  const navigate = useCallback((href: string) => go(href), [go]);

  // Browser back/forward can't be intercepted before the URL (and thus
  // the route tree) already changed. Detect it via the pathname effect:
  // if the pathname changed without an intentional navigate() call having
  // just fired, run a short retroactive cover/uncover over the
  // already-swapped page instead of silently skipping the curtain.
  useEffect(() => {
    if (pathname === prevPathnameRef.current) return;
    prevPathnameRef.current = pathname;
    if (intentionalRef.current) {
      intentionalRef.current = false;
      return;
    }
    if (reducedMotion()) {
      swapEffects();
      return;
    }
    const route = ROUTES[pathname];
    const label = route ? t(route.curtainKey ?? route.labelKey) : "";
    busyRef.current = true;
    runCurtain(label, { withRise: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const value = useMemo<ShellContextValue>(
    () => ({
      menuOpen,
      toggleMenu,
      closeMenu,
      caseIndex,
      openCase,
      closeCase,
      stepCase,
      motionReady,
      motionGeneration,
      navigate,
      curtainRef,
      curtainTextRef,
      navLogoRef,
    }),
    [menuOpen, toggleMenu, closeMenu, caseIndex, openCase, closeCase, stepCase, motionReady, motionGeneration, navigate]
  );

  // Esc closes the case overlay if one is open (it takes priority), else
  // closes the menu. Re-subscribed on caseIndex change so the handler
  // always sees the current value rather than a stale closure.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      if (caseIndex !== null) {
        setCaseIndex(null);
        return;
      }
      setMenuOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [caseIndex]);

  // body scroll lock while menu or case overlay is open
  useEffect(() => {
    document.body.style.overflow = menuOpen || caseIndex !== null ? "hidden" : "";
  }, [menuOpen, caseIndex]);

  return <ShellContext.Provider value={value}>{children}</ShellContext.Provider>;
}
