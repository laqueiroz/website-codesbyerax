import "@testing-library/jest-dom/vitest";

import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";

/**
 * APIs de navegador que o jsdom não implementa e das quais os componentes
 * dependem. Sem elas, o teste falharia por motivos que não são o comportamento
 * sob análise.
 */

class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

class IntersectionObserverStub {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds: readonly number[] = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

/**
 * Atribuição direta, e não `vi.stubGlobal`: testes que precisam trocar
 * `fetch` ou `navigator` chamam `vi.unstubAllGlobals()`, e isso derrubaria
 * junto os stubs de infraestrutura. Reaplicar a cada teste mantém a base
 * estável independentemente da ordem de execução.
 */
function installBrowserStubs() {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    configurable: true,
    // Nenhuma media query casa por padrão; os testes de movimento reduzido
    // sobrescrevem este mock.
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }),
  });

  globalThis.ResizeObserver = ResizeObserverStub as unknown as typeof ResizeObserver;
  globalThis.IntersectionObserver =
    IntersectionObserverStub as unknown as typeof IntersectionObserver;

  // jsdom não implementa scrollTo; alguns componentes de layout o chamam.
  window.scrollTo = (() => {}) as typeof window.scrollTo;
}

installBrowserStubs();

beforeEach(() => {
  installBrowserStubs();
  document.documentElement.removeAttribute("data-intro");
  document.documentElement.removeAttribute("data-scroll-locked");
  sessionStorage.clear();
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});
