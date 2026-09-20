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
};

export default nextConfig;
