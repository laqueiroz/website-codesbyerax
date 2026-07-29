# Codes by Erax — site institucional

Site da **Codes by Erax**, estúdio de software, inteligência artificial e
educação. A conversão principal é o download do **Vínculo Tutoria**, aplicativo
de Windows para professores registrarem atendimentos de tutoria.

Direção visual: **“Carta celeste”** — o portfólio como constelação, produtos
publicados são estrelas acesas, produtos futuros ficam velados por nébula.

> As duas direções recusadas na revisão (`Observatório` e `Console`) **não**
> foram implementadas, conforme o handoff.

---

## Stack

- **Next.js 15** (App Router) + **React 19**
- **TypeScript** em modo estrito (`noUncheckedIndexedAccess`, `noUnusedLocals`)
- **Tailwind CSS 4** — tokens de design em `@theme`, sem `tailwind.config.js`
- **Framer Motion** — revelações na rolagem, parallax de mouse, modais, cards
- **next/font** — Cormorant Garamond, IBM Plex Sans e IBM Plex Mono
  auto-hospedadas
- **Resend** — e-mail transacional dos formulários
- **Vitest** + Testing Library (unidade/integração) e **Playwright** (E2E)

---

## Rodando o projeto

```bash
npm install
cp .env.example .env.local   # preencha o que tiver; nada é obrigatório para subir
npm run dev                  # http://localhost:3000
```

Build de produção:

```bash
npm run build
npm run start
```

### Scripts

| Script | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Serve o build |
| `npm run lint` | ESLint (`next/core-web-vitals` + `next/typescript`) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test` | Vitest (48 testes) |
| `npm run test:e2e` | Playwright — sobe o build automaticamente na porta 3100 |
| `npm run verify` | lint + typecheck + test + build, em sequência |

---

## Variáveis de ambiente

Nenhuma variável é obrigatória para o site subir. Quando falta configuração, a
interface **diz isso ao visitante** em vez de fingir que funciona.

### Site

| Variável | Obrigatória | Efeito se ausente |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | recomendada | Usa `https://codesbyerax.com` em canonical, sitemap, robots e OG |
| `NEXT_PUBLIC_ZOHO_VERIFICATION` | não | Já embutida com o valor atual do domínio |

### E-mail — servidor, nunca exposto ao navegador

| Variável | Obrigatória | Efeito se ausente |
|---|---|---|
| `RESEND_API_KEY` | para os formulários | Rotas respondem **503**; formulário informa configuração pendente |
| `CONTACT_TO_EMAIL` | idem | idem |
| `CONTACT_FROM_EMAIL` | idem | idem |

### Distribuição do Vínculo Tutoria — públicas

| Variável | Efeito se ausente |
|---|---|
| `NEXT_PUBLIC_VINCULO_DOWNLOAD_URL` | Botões de download **desabilitados** com “Disponível em breve” |
| `NEXT_PUBLIC_VINCULO_STORE_URL` | Botão da Store desabilitado |
| `NEXT_PUBLIC_VINCULO_VERSION` | Padrão `1.4.2` |
| `NEXT_PUBLIC_VINCULO_FILE_SIZE` | Padrão `24 MB` |
| `NEXT_PUBLIC_VINCULO_SHA256` | Página informa que o checksum ainda não foi publicado |
| `NEXT_PUBLIC_SUPPORT_EMAIL` | Bloco de e-mail direto fica oculto |

Só variáveis com prefixo `NEXT_PUBLIC_` chegam ao bundle. A chave do Resend é
lida apenas em Route Handlers (`runtime = "nodejs"`), e `src/lib/mailer.ts`
importa `server-only` para que um import acidental no cliente quebre o build.

---

## Deploy na Vercel

1. Importe o repositório na Vercel. O framework é detectado automaticamente
   (build `next build`, sem configuração extra).
2. Em **Settings → Environment Variables**, cadastre as variáveis da seção
   acima para Production e Preview. As `NEXT_PUBLIC_*` são lidas em build:
   depois de alterá-las é preciso **redeploy**, não só restart.
3. Aponte o domínio e ajuste `NEXT_PUBLIC_SITE_URL` para ele — canonical,
   `sitemap.xml` e `robots.txt` derivam dessa variável.
4. No Resend, verifique o domínio do `CONTACT_FROM_EMAIL` antes do primeiro
   envio real.

Os cabeçalhos de segurança (CSP, HSTS, `X-Frame-Options`, `Permissions-Policy`)
saem de `next.config.ts` e valem em qualquer host, não só na Vercel.

---

## Estrutura

```
src/
  app/
    layout.tsx            shell, fontes, metadata, JSON-LD, skip link
    page.tsx              home (compõe as seções, nada de markup solto)
    not-found.tsx         404 com o gato em constelação
    icon.tsx              favicon gerado do emblema real
    opengraph-image.tsx   card OG gerado do wordmark real
    robots.ts sitemap.ts manifest.ts
    api/waitlist/route.ts api/contact/route.ts
    downloads/ suporte/ contato/ changelog/ status/ sobre/
    blog/ produtos/ privacidade/ termos/ licencas/

  components/
    layout/    Navbar, MobileMenu, Footer, SkipLink, LocaleSwitch,
               PageHeader, LegalNotice
    home/      IntroOverlay, Hero, ProductsSection, ProductCard,
               PrinciplesSection, TechStackStrip, RoadmapSection,
               VinculoFeature, AppWindowMock, TestimonialsSection,
               DownloadSection, DownloadButton, ChecksumLine
    products/  ProductsCatalog
    effects/   StarfieldCanvas, SpaceBackground, Nebula, ConstellationDial,
               ConstellationCat, Reveal, MouseParallax
    forms/     WaitlistModal, WaitlistForm, ContactForm
    ui/        Button, Modal, FormField, FormStatus, SectionHeading,
               StatusBadge, CopyButton
    seo/       JsonLd

  content/     site, products, roadmap, principles, tech, faqs,
               changelog, status, testimonials     ← conteúdo editável
  lib/         validation, rate-limit, mailer, seo, fonts, cn
  hooks/       usePrefersReducedMotion, useScrollLock, useActiveSection
  i18n/        config (preparo para rota por locale)

tests/         Vitest — 48 testes
e2e/           Playwright — 15 testes
docs/          handoff.md (original), pendencias.md, assets.md
```

### Onde editar conteúdo

Nada de versão, data, link ou texto repetido mora dentro de componente. Tudo em
`src/content/`:

| Arquivo | Conteúdo |
|---|---|
| `site.ts` | Identidade, navegação, rodapé, config de download, feature flags |
| `products.ts` | Catálogo tipado (`shipped` / `building` / `research`) |
| `roadmap.ts` | Marcos da linha do tempo |
| `principles.ts` | “Por que a Codes by Erax” |
| `tech.ts` | Faixa de tecnologias |
| `faqs.ts` | Perguntas frequentes e solução de problemas |
| `changelog.ts` | Registro de versões |
| `status.ts` | Painel de status |
| `testimonials.ts` | Depoimentos (vazio por decisão editorial) |

---

## Decisões técnicas

**A entrada do hero é CSS, não Framer Motion.** O `<h1>` é o elemento de LCP.
Se a opacidade inicial viesse de um componente `motion`, o HTML do servidor
chegaria invisível e o texto só apareceria depois da hidratação — atrasando o
LCP e deixando o hero vazio onde o JavaScript demora. Com keyframes a animação
começa na primeira pintura. Framer Motion segue responsável por revelações na
rolagem, parallax, modais e cards, onde nada disso é LCP.

**A intro decide antes de pintar.** Um script bloqueante de ~10 linhas lê
`sessionStorage` e `prefers-reduced-motion` e marca `[data-intro]` no `<html>`
antes do primeiro pixel. Sem isso, quem já viu a intro veria um flash dela. Como
efeito colateral desejado, sem JavaScript a sobreposição nunca aparece e o site
abre direto.

**O breakpoint `wide` é declarado em rem.** O protótipo quebra em 1180px, mas o
Tailwind ordena os breakpoints para montar a cascata e não compara px com rem:
com `1180px`, todas as regras `wide:` eram emitidas *antes* de `sm:`/`md:` e
qualquer `md:` as sobrescrevia acima de 1180px. Em `73.75rem` a ordenação fica
correta. Foi um bug real, encontrado pelos testes de layout.

**Nenhum link decorativo.** O `Button` só renderiza `<a>` quando há destino; sem
URL configurada, renderiza `<button disabled>` com rótulo próprio. Um teste E2E
varre todas as páginas garantindo que não existe `href="#"`.

**Nenhum sucesso simulado.** As rotas checam as credenciais *antes* de tentar
enviar, para distinguir “faltou configurar” (503) de “o provedor recusou” (502).
O cliente mostra mensagens diferentes para cada caso e nunca confirma um envio
que não aconteceu.

**Validação escrita à mão.** As regras dos dois formulários cabem em ~150 linhas
e são compartilhadas entre cliente e servidor, sem somar uma biblioteca de
schema ao bundle do navegador. O servidor sempre revalida.

**Rate limit em memória, com escopo honesto.** Janela deslizante por instância
(5 envios / 10 min). Segura envio repetido e script ingênuo; **não** é proteção
distribuída. Trocar por Upstash/Vercel KV mantém a mesma assinatura em
`src/lib/rate-limit.ts`.

**O starfield economiza recursos.** Densidade proporcional à área (teto de 340
partículas), `devicePixelRatio` limitado a 2, taxa de quadros em 45 fps, loop
pausado quando a aba fica oculta e um único quadro estático sob movimento
reduzido — sem `requestAnimationFrame` rodando. `aria-hidden` e
`pointer-events: none`.

**Fidelidade não passa por cima de legibilidade.** O handoff pede micro-labels
em `.3`–`.35` de alfa sobre quase-preto, o que não atinge AA. O piso aqui é
`.55`, como o próprio handoff recomenda na seção de acessibilidade.

**Hover nunca é a única pista.** No protótipo, “Entrar na lista de espera” só
existia no hover e tinha `pointer-events: none`. Aqui é um `<button>` real,
sempre no DOM, alcançável por teclado e com área de clique estendida ao card
inteiro. O painel “Em breve” ficou como reforço visual (`aria-hidden`), aparecendo
no hover **e** no foco.

**`support.js` não foi portado.** O runtime do protótipo não foi copiado,
importado nem adaptado — os arquivos originais seguem na raiz e em `reference/`
apenas como referência visual.

---

## Acessibilidade

- Landmarks semânticos, hierarquia de títulos sem saltos, cada seção com nome
  acessível (`aria-labelledby`).
- Link “pular para o conteúdo principal” como primeiro elemento focável.
- Navegação completa por teclado; foco visível com contraste em todo o site.
- Menu móvel e modais com foco preso, `Escape`, clique fora e devolução do foco
  a quem abriu; `aria-expanded` / `aria-controls` / `aria-current`.
- Erros de formulário associados por `aria-describedby` + `aria-invalid`;
  resultado do envio anunciado em região `aria-live`.
- Áreas clicáveis com no mínimo 44px.
- `prefers-reduced-motion`: pula a intro, remove parallax, congela o starfield,
  elimina rotações contínuas e mantém só transições de opacidade.
- O seletor EN aparece desabilitado com explicação para leitor de tela, nunca
  como um botão que finge funcionar.

---

## Testes

```bash
npm run test        # Vitest — 48 testes
npm run test:e2e    # Playwright — 15 testes (faz o build subir sozinho)
```

**Vitest** cobre: abertura/fechamento do menu móvel (item, `Escape`, clique
fora, trava de rolagem, retorno de foco), pular a intro (botão, teclado, timer,
`sessionStorage`), modal da lista de espera (abrir por clique e por `Enter`,
fechar por `Escape` e clique fora, devolução do foco), validação dos dois
formulários no cliente, resposta 503 sem sucesso falso, copiar o checksum
(sucesso e falha), download sem URL configurada, sanitização, injeção de
cabeçalho e rate limit.

**Playwright** cobre: ausência de rolagem horizontal em 360/390/768/1024/1280/
1440/1920px nas 13 rotas, nenhum botão fora da viewport em 360px, modal caber na
viewport em 360×640, fluxo do menu móvel, fluxo só por teclado, movimento
reduzido (com contraprova sem movimento reduzido) e varredura de links —
nenhum `href="#"` e todas as rotas internas respondendo abaixo de 400.

---

## Performance — o que foi e não foi medido

As práticas que o briefing pede estão aplicadas: `next/font` auto-hospedada,
`next/image` com dimensões explícitas e `sizes`, imagens abaixo da dobra em
`loading="lazy"`, componentes client reduzidos ao necessário (o hero, os
princípios, o roadmap, a faixa de stack e todas as páginas internas são de
servidor), zero biblioteca de UI ou de validação extra e densidade do canvas
limitada. O bundle compartilhado é de **103 kB**, com **167 kB** no primeiro
carregamento da home.

**O Lighthouse não foi executado neste ambiente** — não há Chrome instalado além
do Chromium do Playwright, e uma medição local em máquina de desenvolvimento não
representaria a produção. Rode-o contra o deploy de preview da Vercel antes de
considerar a meta de >95 atingida. O que já foi verificado com o build real:
ausência de rolagem horizontal de 360px a 1920px, ausência de links quebrados ou
placeholder, navegação completa por teclado e respeito a
`prefers-reduced-motion`.

---

## Arquivos do protótipo

Continuam na raiz, como referência visual, e estão fora do build e do ESLint:

- `Codes by Erax - Site.dc.html` — protótipo da home
- `support.js` — runtime do protótipo, **não portado** (nada foi copiado,
  importado ou adaptado dele)
- `reference/` — deck de revisão com as três direções exploradas
- `assets/` — PNGs originais entregues pela cliente (a cópia usada em produção
  está em `public/assets/`)

---

## Documentos

- [`docs/handoff.md`](docs/handoff.md) — handoff original, preservado
- [`docs/pendencias.md`](docs/pendencias.md) — o que depende da cliente
- [`docs/assets.md`](docs/assets.md) — assets entregues, gerados e faltantes
