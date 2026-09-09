import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Humanitarian CVA",
    short_name: "HCVA",
    description:
      "Aria Technologies’ global platform for Cash and Voucher Assistance digital services, consulting, Lali360 tools, learning, and sector knowledge.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f5f1eb",
    theme_color: "#861f24",
    lang: "en",
    categories: ["business", "education", "productivity"],
    icons: [
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
