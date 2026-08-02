# Codes by Erax

Site institucional bilíngue da Codes by Erax e do Vínculo Tutoria.

## Stack

- Next.js 15 com App Router e React 19
- TypeScript estrito
- Tailwind CSS 4
- Framer Motion
- Vitest e Playwright
- Web3Forms para receber orçamentos e feedback no GitHub Pages
- Resend disponível para endpoints em hospedagens com runtime Node.js

## Desenvolvimento

```bash
npm install
npm run dev
```

O site abre em `http://localhost:3000` e direciona para `/pt`.

## Validação

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
```

## Rotas

As páginas públicas usam prefixos `/pt` e `/en`: home, Vínculo Tutoria, orçamento,
blog, artigos, changelog, feedback, status, privacidade, termos, licenças e 404.
A troca de idioma mantém a página e o artigo equivalentes.

## Conteúdo e interface

- `src/content/localized.ts`: textos em português e inglês, artigos e políticas.
- `src/content/site.ts`: identidade, URLs, assets e configuração do produto.
- `src/components/localized/`: shell, navegação, rodapé e componentes editoriais.
- `src/components/effects/`: fundo cósmico e campo de estrelas.
- `src/app/globals.css`: tokens, layout responsivo e movimento reduzido.

## Variáveis de ambiente

Consulte `.env.example`. As principais são:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_VINCULO_DOWNLOAD_URL`
- `RESEND_API_KEY`, `CONTACT_TO_EMAIL` e `CONTACT_FROM_EMAIL` somente para os
  endpoints opcionais em hospedagens com runtime Node.js

Sem URL de download, o botão permanece indisponível. Na publicação estática do
GitHub Pages, os formulários públicos são enviados diretamente ao Web3Forms.
Os endpoints opcionais respondem com erro quando o Resend não está configurado.

## Publicação

O workflow `.github/workflows/deploy-pages.yml` gera a versão estática para o
GitHub Pages. O domínio canônico é `https://codesbyerax.com.br`.

O asset `design_handoff_codes_by_erax_site/assets/constellation-book.png` é
mantido porque integra a hero da home. Os demais protótipos e arquivos históricos
foram removidos do repositório de produção.
