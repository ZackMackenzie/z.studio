import type { ReactNode } from "react"

export const metadata = {
  title: "Asher Vale",
  description: "A portfolio for designers and creatives to showcase their work, tell their story, and win more clients.",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
