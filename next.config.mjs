/** @type {import("next").NextConfig} */
const nextConfig = {
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/about/",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/contact/",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/projects/",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/projects/sistemas-de-marca-que-se-sustentam-em-qualquer-lugar/",
        destination: "/projects/sistemas-de-marca-que-se-sustentam-em-qualquer-lugar",
        permanent: true,
      },
      {
        source: "/projects/sistemas-de-marca-que-se-sustentam-em-qualquer-lugar.",
        destination: "/projects/sistemas-de-marca-que-se-sustentam-em-qualquer-lugar",
        permanent: true,
      },
      {
        source: "/projects/produto-completo-—-landing-dashboard-e-tudo-entre-os-dois/",
        destination: "/projects/produto-completo-—-landing-dashboard-e-tudo-entre-os-dois",
        permanent: true,
      },
      {
        source: "/projects/produto-completo-—-landing-dashboard-e-tudo-entre-os-dois.",
        destination: "/projects/produto-completo-—-landing-dashboard-e-tudo-entre-os-dois",
        permanent: true,
      },
      {
        source: "/projects/criativo-de-performance-que-não-parece-um-anúncio/",
        destination: "/projects/criativo-de-performance-que-não-parece-um-anúncio",
        permanent: true,
      },
      {
        source: "/projects/criativo-de-performance-que-não-parece-um-anúncio.",
        destination: "/projects/criativo-de-performance-que-não-parece-um-anúncio",
        permanent: true,
      },
      {
        source: "/projects/websites/",
        destination: "/projects/websites",
        permanent: true,
      },
      {
        source: "/projects/websites.",
        destination: "/projects/websites",
        permanent: true,
      },
      {
        source: "/projects/.",
        destination: "/projects/websites",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        // Framer's runtime unconditionally pings this on every page load to
        // detect whether it's being viewed inside Framer's own editor canvas
        // (for the in-context "Edit Bar" overlay). On Framer's own hosting
        // that path is served dynamically at the framer.com origin; here,
        // self-hosted on Vercel, nothing answers it — a real 404 on every
        // single page load, logged as a console error by every Lighthouse
        // run. We're never inside that editor, so the response content
        // genuinely doesn't matter; only resolving to 200 instead of 404
        // does. Scoped to this exact bare path only — the real static asset
        // at /assets/framer.com/edit/init.mjs is untouched.
        {
          source: "/assets/framer.com/edit",
          destination: "/assets/framer-editor-noop.json",
        },
        {
          source: "/",
          destination: "/index.html",
        },
        {
          source: "/about",
          destination: "/about/index.html",
        },
        {
          source: "/contact",
          destination: "/contact/index.html",
        },
        {
          source: "/projects",
          destination: "/projects/index.html",
        },
        {
          source: "/projects/sistemas-de-marca-que-se-sustentam-em-qualquer-lugar",
          destination: "/projects/sistemas-de-marca-que-se-sustentam-em-qualquer-lugar/index.html",
        },
        {
          source: "/projects/produto-completo-—-landing-dashboard-e-tudo-entre-os-dois",
          destination: "/projects/produto-completo-—-landing-dashboard-e-tudo-entre-os-dois/index.html",
        },
        {
          source: "/projects/produto-completo-%E2%80%94-landing-dashboard-e-tudo-entre-os-dois",
          destination: "/projects/produto-completo-—-landing-dashboard-e-tudo-entre-os-dois/index.html",
        },
        {
          source: "/projects/criativo-de-performance-que-não-parece-um-anúncio",
          destination: "/projects/criativo-de-performance-que-não-parece-um-anúncio/index.html",
        },
        {
          source: "/projects/criativo-de-performance-que-n%C3%A3o-parece-um-an%C3%BAncio",
          destination: "/projects/criativo-de-performance-que-não-parece-um-anúncio/index.html",
        },
        {
          source: "/projects/websites",
          destination: "/projects/websites/index.html",
        },
      ],
    };
  },
  async headers() {
    return [
      {
        // Framer's own exported assets (fonts, images, CMS bundles) are
        // content-hashed in their filename/path, so they're safe to cache
        // "forever" — a future export writes new paths instead of mutating
        // these. zstudio-core.js is NOT under this path and keeps Next's
        // default revalidate-on-every-request caching, since it's a plain
        // filename that does get edited in place.
        source: "/assets/framerusercontent.com/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
