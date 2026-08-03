import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getContent, type Locale } from "@/content";
import { buildContactMetadata, LINKEDIN_URL, GITHUB_URL } from "@/lib/seo";
import { Contact } from "@/components/sections/Contact";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildContactMetadata(locale as Locale);
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = getContent(locale as Locale);
  return (
    <main>
      <Contact content={content} linkedin={LINKEDIN_URL} github={GITHUB_URL} />
    </main>
  );
}
