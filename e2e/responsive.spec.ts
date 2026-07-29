import { expect, test, type Page } from "@playwright/test";

/** Larguras exigidas no briefing. */
const WIDTHS = [360, 390, 768, 1024, 1280, 1440, 1920];

const ROUTES = [
  "/",
  "/produtos",
  "/downloads",
  "/suporte",
  "/contato",
  "/changelog",
  "/status",
  "/sobre",
  "/blog",
  "/privacidade",
  "/termos",
  "/licencas",
  "/rota-que-nao-existe",
];

/** Pula a intro para que as medições não peguem a sobreposição no caminho. */
async function skipIntro(page: Page) {
  await page.addInitScript(() => {
    sessionStorage.setItem("erax:intro-visto", "1");
  });
}

test.describe("layout responsivo", () => {
  for (const width of WIDTHS) {
    test(`sem rolagem horizontal em ${width}px`, async ({ page }) => {
      await skipIntro(page);
      await page.setViewportSize({ width, height: 900 });

      for (const route of ROUTES) {
        await page.goto(route);
        await page.waitForLoadState("networkidle");

        const overflow = await page.evaluate(() => ({
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
        }));

        expect(
          overflow.scrollWidth,
          `${route} transborda horizontalmente em ${width}px`,
        ).toBeLessThanOrEqual(overflow.clientWidth + 1);
      }
    });
  }

  test("nenhum botão ou link escapa da viewport em 360px", async ({ page }) => {
    await skipIntro(page);
    await page.setViewportSize({ width: 360, height: 900 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const escaping = await page.evaluate(() => {
      const viewport = document.documentElement.clientWidth;
      return [...document.querySelectorAll("a, button")]
        .filter((element) => {
          const rect = element.getBoundingClientRect();
          if (rect.width === 0 || rect.height === 0) return false;
          return rect.left < -1 || rect.right > viewport + 1;
        })
        .map((element) => element.textContent?.trim().slice(0, 40) ?? "");
    });

    expect(escaping).toEqual([]);
  });
});

test.describe("menu móvel", () => {
  test("abre, navega e fecha", async ({ page }) => {
    await skipIntro(page);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const toggle = page.getByRole("button", { name: /abrir menu de navegação/i });
    await expect(toggle).toBeVisible();
    await toggle.click();

    const drawer = page.getByRole("navigation", {
      name: /navegação principal \(celular\)/i,
    });
    await expect(drawer).toBeVisible();

    await drawer.getByRole("link", { name: "Suporte" }).click();
    await expect(page).toHaveURL(/\/suporte$/);
    await expect(drawer).toBeHidden();
  });

  test("o modal da lista de espera cabe na viewport em 360px", async ({ page }) => {
    await skipIntro(page);
    await page.setViewportSize({ width: 360, height: 640 });
    await page.goto("/produtos");

    await page
      .getByRole("button", { name: /entrar na lista de espera de Plano de Aula IA/i })
      .click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    const box = await dialog.boundingBox();
    expect(box!.width).toBeLessThanOrEqual(360);
    expect(box!.height).toBeLessThanOrEqual(640);
  });
});

test.describe("navegação por teclado", () => {
  test("o link de pular chega ao conteúdo principal", async ({ page }) => {
    await skipIntro(page);
    await page.goto("/");

    await page.keyboard.press("Tab");
    const skipLink = page.getByRole("link", { name: /pular para o conteúdo/i });
    await expect(skipLink).toBeFocused();

    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#conteudo$/);
  });

  test("a lista de espera abre e fecha só com o teclado", async ({ page }) => {
    await skipIntro(page);
    await page.goto("/produtos");

    const trigger = page.getByRole("button", {
      name: /entrar na lista de espera de Constelação/i,
    });
    await trigger.focus();
    await page.keyboard.press("Enter");

    await expect(page.getByRole("dialog")).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toBeHidden();
    await expect(trigger).toBeFocused();
  });
});

test.describe("movimento reduzido", () => {
  test("a intro não aparece e a rolagem nunca é travada", async ({ page }) => {
    // `emulateMedia` em vez de `test.use({ reducedMotion })`: é explícito e a
    // asserção seguinte confirma que a emulação de fato pegou — sem isso, o
    // teste poderia passar por engano rodando com movimento normal.
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    const state = await page.evaluate(() => ({
      reduceActive: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      intro: document.documentElement.getAttribute("data-intro"),
      locked: document.documentElement.hasAttribute("data-scroll-locked"),
    }));

    expect(state.reduceActive, "a emulação de movimento reduzido não foi aplicada").toBe(
      true,
    );
    expect(state.intro).toBe("done");
    expect(state.locked).toBe(false);

    await expect(
      page.getByRole("button", { name: /pular introdução/i }),
    ).toHaveCount(0);
  });

  test("a intro roda normalmente sem movimento reduzido", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");

    // Contraprova do teste acima: a diferença vem mesmo da preferência.
    await expect(
      page.getByRole("button", { name: /pular introdução/i }),
    ).toBeVisible();
  });
});

test.describe("integridade dos links", () => {
  test("nenhum link href='#' e todos os internos respondem", async ({ page, request }) => {
    await skipIntro(page);

    const seen = new Set<string>();

    for (const route of ROUTES.slice(0, 12)) {
      await page.goto(route);

      const hrefs = await page.$$eval("a[href]", (anchors) =>
        anchors.map((anchor) => anchor.getAttribute("href") ?? ""),
      );

      expect(hrefs, `${route} contém link placeholder`).not.toContain("#");

      for (const href of hrefs) {
        if (href.startsWith("/") && !href.startsWith("//")) {
          seen.add(href.split("#")[0] || "/");
        }
      }
    }

    for (const path of seen) {
      const response = await request.get(path);
      expect(response.status(), `${path} respondeu ${response.status()}`).toBeLessThan(400);
    }
  });
});
