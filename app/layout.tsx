import type { ReactNode } from "react"

export const metadata = {
  title: "Z.studio",
  description: "Z.studio - Design, tecnologia e desenvolvimento para transformar negócios com soluções digitais sob medida.",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
