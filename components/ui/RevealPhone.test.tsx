import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "@/messages/fr.json";
import { RevealPhone } from "./RevealPhone";

function wrap() {
  return render(
    <NextIntlClientProvider locale="fr" messages={messages}>
      <RevealPhone />
    </NextIntlClientProvider>,
  );
}

describe("RevealPhone", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("affiche le numéro quand l'appel réussit", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ phone: "+33 6 00 00 00 00" }),
      }),
    );
    wrap();
    fireEvent.click(screen.getByRole("button", { name: "Révéler le numéro" }));
    expect(await screen.findByRole("link", { name: /\+33/ })).toBeInTheDocument();
  });

  it("affiche un message d'erreur accessible si le fetch rejette (au lieu d'une rejection non catchée)", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network down")));
    wrap();
    fireEvent.click(screen.getByRole("button", { name: "Révéler le numéro" }));
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Une erreur est survenue, réessayez.",
    );
  });

  it("affiche un message d'erreur si la réponse n'est pas ok", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
    wrap();
    fireEvent.click(screen.getByRole("button", { name: "Révéler le numéro" }));
    await waitFor(() => expect(screen.getByRole("alert")).toBeInTheDocument());
  });
});
