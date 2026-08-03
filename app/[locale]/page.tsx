import { setRequestLocale } from "next-intl/server";
import { getContent, type Locale } from "@/content";
import { personJsonLd, localizedUrl } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { OpenToWork } from "@/components/sections/OpenToWork";
import { Summary } from "@/components/sections/Summary";
import { HomeCta } from "@/components/sections/HomeCta";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = getContent(locale as Locale);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            personJsonLd(locale as Locale, localizedUrl(locale as Locale)),
          ),
        }}
      />
      <main>
        <Hero content={content} />
        <OpenToWork />
        <Summary content={content} />
        <HomeCta />
      </main>
    </>
  );
}
