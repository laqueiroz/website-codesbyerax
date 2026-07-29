import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ProductsCatalog } from "@/components/products/ProductsCatalog";

function futureProductButton() {
  return screen.getByRole("button", {
    name: /entrar na lista de espera de Plano de Aula IA/i,
  });
}

async function openModal(user: ReturnType<typeof userEvent.setup>) {
  await user.click(futureProductButton());
  return await screen.findByRole("dialog");
}

/**
 * O rótulo do consentimento também contém "e-mail", então a busca por texto
 * casaria com dois campos. O seletor do tipo resolve sem ambiguidade.
 */
function emailInput(dialog: HTMLElement) {
  return within(dialog).getByLabelText(/e-mail/i, {
    selector: 'input[type="email"]',
  });
}

describe("lista de espera", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("abre o modal a partir de um produto futuro, nomeando o produto", async () => {
    const user = userEvent.setup();
    render(<ProductsCatalog />);

    const dialog = await openModal(user);

    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(
      within(dialog).getByRole("heading", { name: /lista de espera · Plano de Aula IA/i }),
    ).toBeInTheDocument();
  });

  it("abre pelo teclado com Enter", async () => {
    const user = userEvent.setup();
    render(<ProductsCatalog />);

    futureProductButton().focus();
    await user.keyboard("{Enter}");

    expect(await screen.findByRole("dialog")).toBeInTheDocument();
  });

  it("fecha com Escape e devolve o foco a quem abriu", async () => {
    const user = userEvent.setup();
    render(<ProductsCatalog />);

    const trigger = futureProductButton();
    await user.click(trigger);
    await screen.findByRole("dialog");

    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
    expect(futureProductButton()).toHaveFocus();
  });

  it("fecha ao clicar fora do painel", async () => {
    const user = userEvent.setup();
    render(<ProductsCatalog />);

    await openModal(user);
    const backdrop = document.querySelector<HTMLElement>(
      '[aria-hidden="true"].cursor-default',
    );
    await user.click(backdrop!);

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("valida no cliente antes de chamar a API", async () => {
    const user = userEvent.setup();
    render(<ProductsCatalog />);

    const dialog = await openModal(user);
    await user.click(within(dialog).getByRole("button", { name: /entrar na lista/i }));

    expect(await screen.findByText(/informe seu nome/i)).toBeInTheDocument();
    expect(screen.getByText(/informe seu e-mail/i)).toBeInTheDocument();
    expect(
      screen.getByText(/é necessário concordar em receber/i),
    ).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
  });

  it("recusa e-mail malformado", async () => {
    const user = userEvent.setup();
    render(<ProductsCatalog />);

    const dialog = await openModal(user);
    await user.type(within(dialog).getByLabelText(/nome/i), "Ana Souza");
    await user.type(emailInput(dialog),"ana@escola");
    await user.click(within(dialog).getByRole("checkbox"));
    await user.click(within(dialog).getByRole("button", { name: /entrar na lista/i }));

    expect(await screen.findByText(/não parece válido/i)).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
  });

  it("mostra configuração pendente quando a API responde 503 — sem fingir sucesso", async () => {
    const user = userEvent.setup();
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ ok: false, reason: "not-configured" }), {
        status: 503,
        headers: { "Content-Type": "application/json" },
      }),
    );

    render(<ProductsCatalog />);
    const dialog = await openModal(user);

    await user.type(within(dialog).getByLabelText(/nome/i), "Ana Souza");
    await user.type(emailInput(dialog),"ana@escola.com.br");
    await user.click(within(dialog).getByRole("checkbox"));
    await user.click(within(dialog).getByRole("button", { name: /entrar na lista/i }));

    expect(
      await screen.findByText(/envio de e-mails ainda não está configurado/i),
    ).toBeInTheDocument();
    expect(screen.queryByText(/seu nome está na lista/i)).not.toBeInTheDocument();
  });

  it("confirma apenas quando a API confirma", async () => {
    const user = userEvent.setup();
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    render(<ProductsCatalog />);
    const dialog = await openModal(user);

    await user.type(within(dialog).getByLabelText(/nome/i), "Ana Souza");
    await user.type(emailInput(dialog),"ana@escola.com.br");
    await user.click(within(dialog).getByRole("checkbox"));
    await user.click(within(dialog).getByRole("button", { name: /entrar na lista/i }));

    expect(await screen.findByText(/seu nome está na lista/i)).toBeInTheDocument();

    const [, requestInit] = vi.mocked(fetch).mock.calls[0]!;
    const body = JSON.parse(String(requestInit?.body)) as { productId: string };
    expect(body.productId).toBe("plano-de-aula-ia");
  });
});
