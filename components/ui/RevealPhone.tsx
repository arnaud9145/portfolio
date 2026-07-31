"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

export function RevealPhone() {
  const t = useTranslations("actions");
  const [phone, setPhone] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function reveal() {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/phone");
      if (res.ok) {
        const data = await res.json();
        setPhone(data.phone);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
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
    <div className="inline-flex flex-col items-start gap-1.5">
      <button
        type="button"
        onClick={reveal}
        disabled={loading}
        className="rounded-md border border-border px-4 py-2 text-sm font-medium disabled:opacity-60"
      >
        {loading ? t("revealing") : t("revealPhone")}
      </button>
      {error && (
        <p role="alert" className="text-xs text-red-400">
          {t("revealError")}
        </p>
      )}
    </div>
  );
}
