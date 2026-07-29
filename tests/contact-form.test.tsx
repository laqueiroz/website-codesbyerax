import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ContactForm } from "@/components/forms/ContactForm";

async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/nome/i), "Ana Souza");
  await user.type(screen.getByLabelText(/e-mail/i), "ana@escola.com.br");
  await user.type(screen.getByLabelText(/assunto/i), "Dúvida sobre relatórios");
  await user.type(
    screen.getByLabelText(/mensagem/i),
    "Consigo exportar o relatório de uma turma inteira de uma vez?",
  );
}

describe("formulário de contato", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("mostra erros associados aos campos e não chama a API", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: /enviar mensagem/i }));

    const nameField = screen.getByLabelText(/nome/i);
    expect(nameField).toHaveAttribute("aria-invalid", "true");
    expect(nameField).toHaveAccessibleDescription(/informe seu nome/i);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("leva o foco ao primeiro campo com erro", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: /enviar mensagem/i }));

    expect(screen.getByLabelText(/nome/i)).toHaveFocus();
  });

  it("não anuncia sucesso quando o serviço de e-mail não está configurado", async () => {
    const user = userEvent.setup();
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ ok: false, reason: "not-configured" }), {
        status: 503,
        headers: { "Content-Type": "application/json" },
      }),
    );

    render(<ContactForm />);
    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /enviar mensagem/i }));

    expect(
      await screen.findByText(/sua mensagem não foi enviada/i),
    ).toBeInTheDocument();
    expect(screen.queryByText(/mensagem enviada/i)).not.toBeInTheDocument();
  });

  it("confirma o envio somente com resposta de sucesso", async () => {
    const user = userEvent.setup();
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    render(<ContactForm />);
    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /enviar mensagem/i }));

    expect(await screen.findByText(/mensagem enviada/i)).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledWith("/api/contact", expect.anything());
  });

  it("inclui um honeypot fora do alcance de teclado", () => {
    render(<ContactForm />);

    const honeypot = document.querySelector<HTMLInputElement>('input[name="website"]');
    expect(honeypot).not.toBeNull();
    expect(honeypot).toHaveAttribute("tabindex", "-1");
  });
});
