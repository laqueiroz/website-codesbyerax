import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { IntroOverlay } from "@/components/home/IntroOverlay";

/**
 * O script bloqueante roda no navegador antes da hidratação; no jsdom ele não
 * executa sozinho, então o efeito dele é reproduzido aqui.
 */
function simulateBootstrap(mode: "play" | "done") {
  document.documentElement.setAttribute("data-intro", mode);
  if (mode === "play") {
    document.documentElement.setAttribute("data-scroll-locked", "");
  }
}

describe("intro da marca", () => {
  it("aparece na primeira visita e trava a rolagem", async () => {
    simulateBootstrap("play");
    render(<IntroOverlay />);

    expect(
      await screen.findByRole("button", { name: /pular introdução/i }),
    ).toBeInTheDocument();
    expect(document.documentElement).toHaveAttribute("data-scroll-locked");
  });

  it("pode ser pulada pelo botão, liberando a rolagem", async () => {
    const user = userEvent.setup();
    simulateBootstrap("play");
    render(<IntroOverlay />);

    await user.click(await screen.findByRole("button", { name: /pular introdução/i }));

    await waitFor(() => {
      expect(
        screen.queryByRole("button", { name: /pular introdução/i }),
      ).not.toBeInTheDocument();
    });
    expect(document.documentElement).not.toHaveAttribute("data-scroll-locked");
  });

  it("pode ser pulada por teclado", async () => {
    const user = userEvent.setup();
    simulateBootstrap("play");
    render(<IntroOverlay />);

    await screen.findByRole("button", { name: /pular introdução/i });
    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(
        screen.queryByRole("button", { name: /pular introdução/i }),
      ).not.toBeInTheDocument();
    });
  });

  it("marca sessionStorage para não repetir na mesma sessão", async () => {
    const user = userEvent.setup();
    simulateBootstrap("play");
    render(<IntroOverlay />);

    await user.click(await screen.findByRole("button", { name: /pular introdução/i }));

    await waitFor(() => {
      expect(sessionStorage.getItem("erax:intro-visto")).toBe("1");
    });
  });

  it("some sozinha depois da sequência, liberando a rolagem", async () => {
    simulateBootstrap("play");
    render(<IntroOverlay />);

    await screen.findByRole("button", { name: /pular introdução/i });

    // A dissolução do Framer Motion depende de rAF, que não avança com timers
    // falsos; por isso a asserção é sobre o efeito observável (rolagem
    // liberada e sessão marcada), com espera real pela sequência de 2,5s.
    await waitFor(
      () => {
        expect(document.documentElement).not.toHaveAttribute("data-scroll-locked");
        expect(sessionStorage.getItem("erax:intro-visto")).toBe("1");
      },
      { timeout: 5000 },
    );
  }, 10_000);

  it("nunca trava a rolagem quando a intro não deve rodar", async () => {
    // Regressão: `playing` começa `true` para casar com o HTML do servidor.
    // Travar por esse estado inicial prendia a rolagem por um instante mesmo
    // com movimento reduzido ou em visita recorrente.
    simulateBootstrap("done");
    render(<IntroOverlay />);

    expect(document.documentElement).not.toHaveAttribute("data-scroll-locked");
    await waitFor(() => {
      expect(
        screen.queryByRole("button", { name: /pular introdução/i }),
      ).not.toBeInTheDocument();
    });
    expect(document.documentElement).not.toHaveAttribute("data-scroll-locked");
  });

  it("não roda quando o bootstrap decidiu que já foi vista", async () => {
    simulateBootstrap("done");
    render(<IntroOverlay />);

    await waitFor(
      () => {
        expect(
          screen.queryByRole("button", { name: /pular introdução/i }),
        ).not.toBeInTheDocument();
      },
      { timeout: 3000 },
    );
    expect(document.documentElement).not.toHaveAttribute("data-scroll-locked");
  });
});
