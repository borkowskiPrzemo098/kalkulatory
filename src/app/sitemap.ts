import type { MetadataRoute } from "next";
import { calculators } from "@/calculators/registry";
import { categories } from "@/lib/categories";

export const dynamic = "force-static";

const SITE_URL = "https://borkowskiprzemo098.github.io/kalkulatory";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/kalkulatory",
    "/o-nas",
    "/kontakt",
    "/polityka-prywatnosci",
    "/polityka-cookies",
    "/regulamin",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.6,
  }));

  const calculatorPages = calculators.map((c) => ({
    url: `${SITE_URL}/kalkulatory/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const categoryPages = categories.map((c) => ({
    url: `${SITE_URL}/kategorie/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticPages, ...calculatorPages, ...categoryPages];
}
