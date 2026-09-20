import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Página não encontrada - Z.studio",
  description: "A página que você procura não existe ou foi movida.",
  robots: { index: false, follow: true },
}

const WHATSAPP_URL =
  "https://wa.me/5511914406822?text=" +
  encodeURIComponent("Olá! Conheci a Z.studio e gostaria de conversar sobre um projeto.")

export default function NotFound() {
  return (
    <>
      <style>{`
        @font-face { font-family: "Inter"; src: url("/assets/framerusercontent.com/assets/GrgcKwrN6d3Uz8EwcLHZxwEfC4.woff2") format("woff2"); font-weight: 400; font-style: normal; font-display: swap; }
        @font-face { font-family: "Inter"; src: url("/assets/framerusercontent.com/assets/syRNPWzAMIrcJ3wIlPIP43KjQs.woff2") format("woff2"); font-weight: 700; font-style: normal; font-display: swap; }
        @font-face { font-family: "Manrope"; src: url("/assets/framerusercontent.com/third-party-assets/fontshare/wf/6U2SGH566NSNERG6RGEV3DSNEK7DL2RF/JRDYRKMSAW2H35IWEQIPL67HAJQ35MG5/JNU3GNMUBPWW6V6JTED3S27XL5HN7NM5.woff2") format("woff2"); font-weight: 600; font-style: normal; font-display: swap; }
        @font-face { font-family: "Manrope"; src: url("/assets/framerusercontent.com/third-party-assets/fontshare/wf/NGBUP45ES3F7RD5XGKPEDJ6QEPO4TMOK/EXDVWJ2EDDVVV65UENMX33EDDYBX6OF7/6P4FPMFQH7CCC7RZ4UU4NKSGJ2RLF7V5.woff2") format("woff2"); font-weight: 700; font-style: normal; font-display: swap; }

        .nf-root {
          background: #000;
          color: #fff;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        .nf-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 24px 32px;
        }
        .nf-logo {
          font-family: "Manrope", sans-serif;
          font-weight: 700;
          font-size: 16px;
          color: #fff;
          text-decoration: none;
        }
        .nf-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.85);
          text-decoration: none;
        }
        .nf-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #47c554;
          box-shadow: 0 0 8px #47c554;
          flex-shrink: 0;
        }
        .nf-location {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.6);
          white-space: nowrap;
        }
        .nf-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 48px 24px;
          gap: 20px;
        }
        .nf-404 {
          font-family: "Manrope", sans-serif;
          font-weight: 700;
          font-size: clamp(88px, 18vw, 160px);
          line-height: 1;
          margin: 0;
          letter-spacing: -0.02em;
        }
        .nf-sub {
          margin: 0;
          font-size: 15px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.55);
        }
        .nf-btn {
          margin-top: 12px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 12px 24px;
          border-radius: 9999px;
          background: #fff;
          color: #000;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          transition: opacity 0.2s ease;
        }
        .nf-btn:hover {
          opacity: 0.85;
        }
        .nf-footer {
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding: 48px 32px 24px;
        }
        .nf-footer-top {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 32px;
          margin-bottom: 40px;
        }
        .nf-footer-brand {
          font-family: "Manrope", sans-serif;
          font-weight: 700;
          font-size: 18px;
          margin: 0 0 8px;
        }
        .nf-footer-tagline {
          margin: 0;
          font-size: 13px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.5);
        }
        .nf-footer-links {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .nf-footer-links a {
          font-family: "Manrope", sans-serif;
          font-weight: 700;
          font-size: 20px;
          color: #fff;
          text-decoration: none;
        }
        .nf-footer-bottom {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
          padding-top: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 12px;
          color: rgba(255, 255, 255, 0.4);
        }
      `}</style>

      <div className="nf-root">
        <header className="nf-header">
          <a className="nf-logo" href="/">
            Z.studio
          </a>
          <a className="nf-cta" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <span className="nf-dot" />
            Entre em contato agora
          </a>
          <span className="nf-location">São Paulo, SP</span>
        </header>

        <main className="nf-main">
          <h1 className="nf-404">404</h1>
          <p className="nf-sub">
            Não se preocupe, acontece.
            <br />
            Vamos tentar novamente.
          </p>
          <a className="nf-btn" href="/">
            Voltar ao início
          </a>
        </main>

        <footer className="nf-footer">
          <div className="nf-footer-top">
            <div>
              <p className="nf-footer-brand">Z.studio</p>
              <p className="nf-footer-tagline">
                Pronto para melhorar seu negócio?
                <br />
                Vamos começar.
              </p>
            </div>
            <nav className="nf-footer-links">
              <a href="/">Menu</a>
              <a href="/about">Sobre</a>
              <a href="/projects">Projetos</a>
              <a href="/contact">Contato</a>
            </nav>
          </div>
          <div className="nf-footer-bottom">
            <span>© 2026 - Z.studio</span>
            <span>Zack Rodrigues</span>
          </div>
        </footer>
      </div>
    </>
  )
}
