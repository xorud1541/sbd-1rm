import type { MetadataRoute } from "next";

const SITE_URL = "https://sbd-1rm.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/ko`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          ko: `${SITE_URL}/ko`,
          en: `${SITE_URL}/en`,
        },
      },
    },
    {
      url: `${SITE_URL}/en`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          ko: `${SITE_URL}/ko`,
          en: `${SITE_URL}/en`,
        },
      },
    },
  ];
}
