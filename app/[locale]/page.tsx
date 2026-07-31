import { setRequestLocale } from "next-intl/server";
import { getContent, type Locale } from "@/content";
import { personJsonLd, localizedUrl, LINKEDIN_URL, GITHUB_URL } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { Summary } from "@/components/sections/Summary";
import { Experience } from "@/components/sections/Experience";
import { Stack } from "@/components/sections/Stack";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";

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
        <Summary content={content} />
        <Experience content={content} />
        <Stack content={content} />
        <Education content={content} />
        <Contact content={content} linkedin={LINKEDIN_URL} github={GITHUB_URL} />
      </main>
    </>
  );
}
