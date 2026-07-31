import type { MetadataRoute } from "next";
import { localizedUrl } from "@/lib/seo";
import { routing } from "@/i18n/routing";

// Every page on the site, as a pathname relative to the locale root.
// "" is the home page. Add a new route here (e.g. "projets") to have it
// picked up for every locale with correct hreflang alternates.
const routes = [""];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap((route) =>
    routing.locales.map((locale) => ({
      url: localizedUrl(locale, route),
      alternates: {
        languages: Object.fromEntries([
          ...routing.locales.map((l) => [l, localizedUrl(l, route)]),
          ["x-default", localizedUrl(routing.defaultLocale, route)],
        ]),
      },
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
  );
}
