import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Navbar } from "@/components/layout/Navbar";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

function openButton() {
  return screen.getByRole("button", { name: /abrir menu de navegação/i });
}

/**
 * A lista de links em linha e a gaveta coexistem no DOM (a primeira é escondida
 * por CSS, que o jsdom não aplica). As consultas precisam ser escopadas à
 * gaveta para não casar com o link homônimo da versão desktop.
 */
function drawer() {
  return screen.getByRole("navigation", { name: /navegação principal \(celular\)/i });
}

describe("menu móvel", () => {
  it("abre pelo hambúrguer e expõe os links de navegação", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const toggle = openButton();
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveAttribute("aria-controls", "menu-navegacao");

    await user.click(toggle);

    expect(
      screen.getByRole("button", { name: /fechar menu de navegação/i }),
    ).toHaveAttribute("aria-expanded", "true");

    expect(
      within(drawer()).getByRole("link", { name: "Vínculo Tutoria" }),
    ).toBeInTheDocument();
  });

  it("trava a rolagem da página enquanto está aberto e libera ao fechar", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    await user.click(openButton());
    expect(document.documentElement).toHaveAttribute("data-scroll-locked");

    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(document.documentElement).not.toHaveAttribute("data-scroll-locked");
    });
  });

  it("fecha com Escape e devolve o foco ao hambúrguer", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const toggle = openButton();
    await user.click(toggle);
    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(
        screen.queryByRole("navigation", { name: /navegação principal \(celular\)/i }),
      ).not.toBeInTheDocument();
    });

    expect(openButton()).toHaveFocus();
  });

  it("fecha ao clicar fora da gaveta", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    await user.click(openButton());
    // O fundo é aria-hidden (atalho de ponteiro), então é alcançado pelo DOM.
    const backdrop = document.querySelector<HTMLElement>(
      '[aria-hidden="true"].cursor-default',
    );
    await user.click(backdrop!);

    await waitFor(() => {
      expect(
        screen.queryByRole("navigation", { name: /navegação principal \(celular\)/i }),
      ).not.toBeInTheDocument();
    });
  });

  it("fecha ao escolher um item do menu", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    await user.click(openButton());
    await user.click(within(drawer()).getByRole("link", { name: "Roadmap" }));

    await waitFor(() => {
      expect(
        screen.queryByRole("navigation", { name: /navegação principal \(celular\)/i }),
      ).not.toBeInTheDocument();
    });
  });
});

describe("seletor de idioma", () => {
  it("mostra EN desabilitado, com explicação acessível", () => {
    render(<Navbar />);

    const [enButton] = screen.getAllByRole("button", { name: /english.*em breve/i });
    expect(enButton).toBeDisabled();
    expect(enButton).toHaveAttribute("aria-disabled", "true");
  });
});
