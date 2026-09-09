import type { MetadataRoute } from "next";
import { insights } from "@/data/insights";
import { SITE_ORIGIN } from "./seo";

// Stable per-build timestamp so the sitemap does not churn on every request.
const BUILD_DATE = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
    { path: "", changeFrequency: "weekly", priority: 1 },
    { path: "/services", changeFrequency: "monthly", priority: 0.9 },
    { path: "/lali360", changeFrequency: "monthly", priority: 0.9 },
    { path: "/learning", changeFrequency: "monthly", priority: 0.8 },
    { path: "/insights", changeFrequency: "weekly", priority: 0.8 },
    { path: "/events", changeFrequency: "weekly", priority: 0.7 },
    { path: "/opportunities", changeFrequency: "weekly", priority: 0.7 },
    { path: "/5w1h", changeFrequency: "monthly", priority: 0.7 },
    { path: "/about", changeFrequency: "yearly", priority: 0.5 },
  ];

  return [
    ...routes.map((route) => ({
      url: `${SITE_ORIGIN}${route.path}`,
      lastModified: BUILD_DATE,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...insights.map((item) => {
      const parsed = new Date(`${item.date} UTC`);
      return {
        url: `${SITE_ORIGIN}/insights/${item.slug}`,
        lastModified: Number.isNaN(parsed.getTime()) ? BUILD_DATE : parsed,
        changeFrequency: "yearly" as const,
        priority: 0.6,
      };
    }),
  ];
}
