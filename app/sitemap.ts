import type { MetadataRoute } from "next";
import { insights } from "@/data/insights";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://humanitariancva.org"; const now = new Date();
  const routes = ["", "/services", "/lali360", "/learning", "/insights", "/events", "/opportunities", "/about"];
  return [...routes.map((route, index) => ({ url: `${base}${route}`, lastModified: now, changeFrequency: index === 4 ? "weekly" as const : "monthly" as const, priority: index === 0 ? 1 : .8 })), ...insights.map(item => ({ url: `${base}/insights/${item.slug}`, lastModified: new Date(item.date), changeFrequency: "yearly" as const, priority: .7 }))];
}
