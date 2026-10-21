import type { ReactNode } from "react";
import { Inter, Manrope } from "next/font/google";
import { ClientShell } from "@/components/ClientShell";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  variable: "--font-inter",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://www.zstudioportifolio.com"),
  title: { default: "z.studio", template: "%s | z.studio" },
  description: "z.studio - Design, tecnologia e desenvolvimento para transformar negócios com soluções digitais sob medida.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${manrope.variable}`}>
      <body>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
