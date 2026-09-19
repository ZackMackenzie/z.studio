import type { ReactNode } from "react"

export const metadata = { title: "tender-insurance-576350.framer.app" }

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
