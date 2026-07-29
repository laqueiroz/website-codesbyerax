# Assets — o que existe e o que falta

## Entregues e em uso

| Arquivo | Dimensões | Onde é usado |
|---|---|---|
| `public/assets/logo-mark.png` | 539×491 | Intro, navbar, disco do hero, CTA de download, favicon gerado |
| `public/assets/logo-word.png` | 539×187 | Rodapé, imagem de Open Graph gerada |
| `public/assets/logo-full.png` | 539×678 | Dados estruturados (`logo` da Organization) |

Os três são derivados do único PNG que a cliente forneceu, com os canais
clareados para legibilidade sobre `#040309`.

## Gerados a partir dos assets reais

Em vez de inventar arte, estes são compostos em build a partir dos PNGs acima:

| Rota | Arquivo | O que faz |
|---|---|---|
| `/icon` | `src/app/icon.tsx` | Favicon 64×64: emblema centralizado em um quadrado sobre o preto espacial (o PNG original é retangular e não serve como ícone) |
| `/opengraph-image` | `src/app/opengraph-image.tsx` | Card 1200×630 para Open Graph e Twitter, com o wordmark e a headline |

Se a cliente entregar um `og-image.png` finalizado, basta colocá-lo em
`public/` e apontar `openGraph.images` no `src/app/layout.tsx` — daí o
`opengraph-image.tsx` pode ser removido.

## Faltando

| Asset | Por que importa | Impacto atual |
|---|---|---|
| **Originais vetoriais (SVG/AI)** do logotipo | O emblema da intro chega a 380px de largura; em telas de alto DPR o PNG de 539px começa a esfarelar | Aceitável hoje, visível em monitores 4K |
| **Capturas de tela reais do Vínculo Tutoria** | A seção do app usa uma maquete em HTML/CSS | A maquete é **rotulada na legenda** como representação, com dados fictícios — nunca se apresenta como print do produto |
| **Arte da mascote (gato em constelação)** | Só há a versão em SVG traçada aqui, na página 404 | A 404 tem uma constelação de gato feita à mão, discreta; substituir quando a arte oficial existir |
| **`favicon.ico` multi-resolução** | Navegadores antigos e atalhos do Windows | Suprido pelo `icon.tsx` (PNG); um `.ico` em `public/` passa a ter precedência se adicionado |
| **Ícones do manifest em 192/512 quadrados** | Instalação como PWA no Android | O manifest aponta o PNG retangular; funcional, mas não ideal |

## Caminhos já preparados

Estes caminhos podem receber arquivos definitivos sem tocar em código:

```
public/favicon.ico          → tem precedência sobre o icon.tsx gerado
public/og-image.png         → precisa apontar openGraph.images no layout
public/assets/logo-mark.png → substituição direta
public/assets/logo-word.png → substituição direta
public/assets/logo-full.png → substituição direta
```

Ao trocar um PNG por outro de dimensões diferentes, atualize `brandAssets` em
`src/content/site.ts` — os valores de `width`/`height` estão lá para o
`next/image` reservar o espaço e evitar layout shift.
