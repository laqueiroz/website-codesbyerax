import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ChecksumLine } from "@/components/home/ChecksumLine";
import { DownloadButton, StoreButton } from "@/components/home/DownloadButton";

describe("botão de download", () => {
  it("fica desabilitado e anuncia 'Disponível em breve' quando não há URL", () => {
    render(<DownloadButton url="" />);

    const button = screen.getByRole("button", { name: /disponível em breve/i });
    expect(button).toBeDisabled();
    // O ponto central: nenhum link falso é renderizado.
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("vira um link de download real quando a URL está configurada", () => {
    render(
      <DownloadButton
        url="https://cdn.exemplo.com/vinculo-1.4.2.exe"
        version="1.4.2"
        fileSize="24 MB"
        showVersionMeta
      />,
    );

    const link = screen.getByRole("link", { name: /baixar para windows/i });
    expect(link).toHaveAttribute("href", "https://cdn.exemplo.com/vinculo-1.4.2.exe");
    expect(link).toHaveAttribute("download");
    expect(link).toHaveTextContent("v1.4.2 · 24 MB");
  });
});

describe("botão da Microsoft Store", () => {
  it("fica desabilitado sem URL configurada", () => {
    render(<StoreButton url="" />);

    expect(
      screen.getByRole("button", { name: /microsoft store em breve/i }),
    ).toBeDisabled();
  });

  it("abre em nova aba com rel de segurança quando configurado", () => {
    render(<StoreButton url="https://apps.microsoft.com/detail/exemplo" />);

    const link = screen.getByRole("link", { name: /microsoft store/i });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});

describe("checksum SHA-256", () => {
  const CHECKSUM =
    "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08";

  /**
   * `userEvent.setup()` instala a própria área de transferência falsa. Para
   * observar o que o componente escreve, o override precisa vir DEPOIS do
   * setup — daí a definição direta em `navigator` em vez de `vi.stubGlobal`.
   */
  function stubClipboard(clipboard: { writeText: () => Promise<void> } | undefined) {
    Object.defineProperty(navigator, "clipboard", {
      value: clipboard,
      configurable: true,
      writable: true,
    });
  }

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("avisa que o checksum ainda não foi publicado quando está vazio", () => {
    render(<ChecksumLine sha256="" />);

    expect(screen.getByText(/ainda não publicado/i)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /copiar/i })).not.toBeInTheDocument();
  });

  it("copia o checksum e confirma visualmente", async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    stubClipboard({ writeText });

    render(<ChecksumLine sha256={CHECKSUM} />);

    await user.click(screen.getByRole("button", { name: /copiar checksum/i }));

    expect(writeText).toHaveBeenCalledWith(CHECKSUM);
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /copiar checksum/i })).toHaveTextContent(
        /copiado/i,
      );
    });
  });

  it("informa a falha em vez de fingir que copiou", async () => {
    const user = userEvent.setup();
    stubClipboard(undefined);

    render(<ChecksumLine sha256={CHECKSUM} />);

    await user.click(screen.getByRole("button", { name: /copiar checksum/i }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /copiar checksum/i })).toHaveTextContent(
        /não foi possível copiar/i,
      );
    });
  });
});
