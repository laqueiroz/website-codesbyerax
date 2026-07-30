import { expect, test, type Page } from "@playwright/test";

const ROUTES = [
  "/pt",
  "/pt/vinculo-tutoria",
  "/pt/blog",
  "/pt/blog/o-que-e-tutoria-escolar",
  "/pt/changelog",
  "/pt/feedback",
  "/pt/status",
  "/pt/privacidade",
  "/pt/termos",
  "/pt/licencas",
  "/pt/404",
  "/en",
  "/en/vinculo-tutoria",
  "/en/blog",
  "/en/blog/what-is-school-tutoring",
  "/en/changelog",
  "/en/feedback",
  "/en/status",
  "/en/privacy",
  "/en/terms",
  "/en/licenses",
  "/en/404",
];

async function skipIntro(page: Page) {
  await page.addInitScript(() => sessionStorage.setItem("erax:intro-visto", "1"));
}

test("todas as rotas PT e EN respondem e não transbordam", async ({ page }) => {
  await skipIntro(page);
  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ROUTES) {
      const response = await page.goto(route);
      expect(response?.status(), route).toBeLessThan(400);
      const dimensions = await page.evaluate(() => ({
        scroll: document.documentElement.scrollWidth,
        client: document.documentElement.clientWidth,
      }));
      expect(dimensions.scroll, `${route} em ${width}px`).toBeLessThanOrEqual(dimensions.client + 1);
    }
  }
});

test("a troca de idioma mantém a página e o artigo equivalentes", async ({ page }) => {
  await skipIntro(page);
  await page.goto("/pt/blog/o-que-e-tutoria-escolar");
  await page.getByRole("link", { name: "English" }).click();
  await expect(page).toHaveURL(/\/en\/blog\/what-is-school-tutoring$/);
  await page.getByRole("link", { name: "Português" }).click();
  await expect(page).toHaveURL(/\/pt\/blog\/o-que-e-tutoria-escolar$/);
});

test("o menu móvel abre, navega e fecha", async ({ page }) => {
  await skipIntro(page);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/pt");
  const toggle = page.getByRole("button", { name: /menu/i });
  await toggle.click();
  await expect(page.getByRole("navigation", { name: /primary navigation/i })).toBeVisible();
  await page.getByRole("link", { name: "Blog", exact: true }).first().click();
  await expect(page).toHaveURL(/\/pt\/blog$/);
});

test("movimento reduzido pula a introdução", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/pt");
  await expect(page.locator("#intro-overlay")).toHaveCount(0);
  const state = await page.evaluate(() => document.documentElement.getAttribute("data-intro"));
  expect(state).toBe("done");
});

test("não há links placeholder ou para rotas antigas", async ({ page, request }) => {
  await skipIntro(page);
  for (const route of ROUTES) {
    await page.goto(route);
    const hrefs = await page.locator("a[href]").evaluateAll((links) =>
      links.map((link) => link.getAttribute("href") || ""),
    );
    expect(hrefs).not.toContain("#");
    for (const href of hrefs.filter((value) => value.startsWith("/"))) {
      const path = href.split("#")[0] || "/";
      const response = await request.get(path);
      expect(response.status(), path).toBeLessThan(400);
    }
  }
});
