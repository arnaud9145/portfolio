"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

export function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) { setStatus("ok"); form.reset(); }
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <div>
        <label htmlFor="name" className="block text-sm font-medium">{t("name")}</label>
        <input id="name" name="name" required className="mt-1 w-full rounded-md border border-border bg-transparent px-3 py-2" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium">{t("email")}</label>
        <input id="email" name="email" type="email" required className="mt-1 w-full rounded-md border border-border bg-transparent px-3 py-2" />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium">{t("message")}</label>
        <textarea id="message" name="message" required rows={5} className="mt-1 w-full rounded-md border border-border bg-transparent px-3 py-2" />
      </div>
      <button type="submit" disabled={status === "sending"} className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white disabled:opacity-60">
        {status === "sending" ? t("sending") : t("send")}
      </button>
      {status === "ok" && <p className="text-sm text-accent" role="status">{t("success")}</p>}
      {status === "error" && <p className="text-sm text-red-500" role="alert">{t("error")}</p>}
    </form>
  );
}
