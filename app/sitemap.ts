import type { MetadataRoute } from "next";

const BASE_URL = "https://www.zstudioportifolio.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", priority: 1.0 },
    { path: "/work", priority: 0.9 },
    { path: "/about", priority: 0.8 },
    { path: "/services", priority: 0.8 },
    { path: "/experience", priority: 0.6 },
    { path: "/contact", priority: 0.7 },
    { path: "/terms", priority: 0.3 },
  ];
  return routes.map((r) => ({
    url: `${BASE_URL}${r.path}`,
    priority: r.priority,
  }));
}
