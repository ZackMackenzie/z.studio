/** @type {import("next").NextConfig} */
const nextConfig = {
  output: "standalone",
  async redirects() {
    return [
      // The old site's project-listing and project-detail pages are gone;
      // /work is the closest real equivalent in the new structure (it's a
      // text-only list, not per-project pages -- the project overlay isn't
      // a route). :path* so old slugs with accents/em-dashes resolve
      // without depending on exact percent-encoding.
      {
        source: "/projects",
        destination: "/work",
        permanent: true,
      },
      {
        source: "/projects/:path*",
        destination: "/work",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        // Vercel's default HSTS header on the *.vercel.app domain includes
        // includeSubDomains/preload; the custom domain didn't inherit that
        // stronger policy. Applying it explicitly, site-wide.
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
    ];
  },
};

export default nextConfig;
