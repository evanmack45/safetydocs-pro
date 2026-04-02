import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/payment/"],
      },
    ],
    sitemap: "https://safetydocspro.com/sitemap.xml",
  };
}
