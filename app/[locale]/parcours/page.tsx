import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getContent, type Locale } from "@/content";
import { buildParcoursMetadata } from "@/lib/seo";
import { Experience } from "@/components/sections/Experience";
import { Stack } from "@/components/sections/Stack";
import { Languages } from "@/components/sections/Languages";
import { Interests } from "@/components/sections/Interests";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildParcoursMetadata(locale as Locale);
}

export default async function ParcoursPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = getContent(locale as Locale);
  return (
    <main>
      <Experience content={content} />
      <Stack content={content} />
      <Languages content={content} />
      <Interests content={content} />
    </main>
  );
}
