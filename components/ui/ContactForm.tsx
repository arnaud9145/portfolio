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

  const field =
    "mt-1.5 w-full rounded-lg border border-border bg-black/20 px-3 py-2 text-sm text-fg transition-colors placeholder:text-muted focus:border-gold/60";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-fg">{t("name")}</label>
        <input id="name" name="name" required className={field} />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-fg">{t("email")}</label>
        <input id="email" name="email" type="email" required className={field} />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-fg">{t("message")}</label>
        <textarea id="message" name="message" required rows={5} className={field} />
      </div>
      <button type="submit" disabled={status === "sending"} className="btn btn-gold w-full disabled:opacity-60 sm:w-auto">
        {status === "sending" ? t("sending") : t("send")}
      </button>
      {status === "ok" && <p className="text-sm text-gold-hi" role="status">{t("success")}</p>}
      {status === "error" && <p className="text-sm text-red-400" role="alert">{t("error")}</p>}
    </form>
  );
}
