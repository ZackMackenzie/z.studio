"use client";

import { forwardRef, type AnchorHTMLAttributes, type MouseEvent } from "react";
import { useShell } from "@/lib/shell-state";

type TLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

// Every internal nav link (menu items, logo, footer links, the "Vamos
// conversar" CTA) goes through this instead of next/link directly, so the
// page-transition curtain can run. Only intercepts plain left-clicks with
// no modifier keys and no explicit target -- anything else (middle-click,
// cmd/ctrl-click, open-in-new-tab) falls through to the browser's normal
// handling untouched. forwardRef because the header logo's ref is read
// directly by the intro animation (needs the real <a> node to measure).
export const TLink = forwardRef<HTMLAnchorElement, TLinkProps>(function TLink(
  { href, onClick, ...rest },
  ref
) {
  const { navigate } = useShell();

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (rest.target && rest.target !== "_self") return;
    e.preventDefault();
    navigate(href);
  }

  return <a ref={ref} href={href} onClick={handleClick} {...rest} />;
});
