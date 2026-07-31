"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

export function RevealPhone() {
  const t = useTranslations("actions");
  const [phone, setPhone] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function reveal() {
    setLoading(true);
    try {
      const res = await fetch("/api/phone");
      if (res.ok) {
        const data = await res.json();
        setPhone(data.phone);
      }
    } finally {
      setLoading(false);
    }
  }

  if (phone) {
    return (
      <a href={`tel:${phone}`} className="rounded-md border border-border px-4 py-2 text-sm font-medium">
        {phone}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={reveal}
      disabled={loading}
      className="rounded-md border border-border px-4 py-2 text-sm font-medium disabled:opacity-60"
    >
      {loading ? t("revealing") : t("revealPhone")}
    </button>
  );
}
