# Pendências que dependem da cliente

Lista do que falta para o site sair do ar "tecnicamente pronto" e virar
"comercialmente completo". Nada aqui bloqueia o deploy — o site já funciona e,
onde falta informação, ele diz isso ao visitante em vez de improvisar.

## 1. Distribuição do Vínculo Tutoria (bloqueia a conversão principal)

| Item | Onde entra | Situação hoje |
|---|---|---|
| URL do instalador | `NEXT_PUBLIC_VINCULO_DOWNLOAD_URL` | Botões de download aparecem **desabilitados** com "Disponível em breve" |
| URL da Microsoft Store | `NEXT_PUBLIC_VINCULO_STORE_URL` | Botão desabilitado: "Microsoft Store em breve" |
| Checksum SHA-256 do instalador | `NEXT_PUBLIC_VINCULO_SHA256` | A página informa "checksum ainda não publicado para esta versão" |
| Versão e tamanho reais | `NEXT_PUBLIC_VINCULO_VERSION`, `NEXT_PUBLIC_VINCULO_FILE_SIZE` | Usando os valores do handoff (1.4.2 / 24 MB) como padrão |

Enquanto essas variáveis não existirem, **nenhum link falso é renderizado** —
foi decisão explícita não apontar para `#`.

## 2. Envio de e-mail (bloqueia lista de espera e contato)

| Item | Variável |
|---|---|
| Chave da API Resend | `RESEND_API_KEY` |
| Caixa que recebe as mensagens | `CONTACT_TO_EMAIL` |
| Remetente verificado no domínio | `CONTACT_FROM_EMAIL` |

Sem as três, `POST /api/waitlist` e `POST /api/contact` respondem **503** e o
formulário mostra "o envio de e-mails ainda não está configurado neste
ambiente". Nenhum envio é apresentado como concluído sem ter acontecido.

O domínio já tem a verificação do Zoho Mail no `<head>`
(`zoho-verification=zb68600730.zmverify.zoho.com`). Se o e-mail transacional
for pelo Zoho em vez do Resend, é uma troca localizada em `src/lib/mailer.ts`.

## 3. Depoimentos

As três citações do protótipo **não foram publicadas**. O próprio handoff as
marca como "DEPOIMENTO PENDENTE", e atribuí-las a pessoas seria inventar prova
social.

Para publicar:
1. colher depoimentos reais **com autorização de uso por escrito**;
2. preencher `src/content/testimonials.ts` (id, quote, author, role);
3. trocar `showTestimonials` para `true` em `src/content/site.ts`.

O layout está pronto e testado.

## 4. Conteúdo incompleto

- **Changelog** — só a versão 1.4 estava documentada nos materiais. A página
  exibe um aviso de que o histórico está sendo montado. Faltam as notas das
  versões anteriores (`src/content/changelog.ts`).
- **Blog** — nenhum artigo. A rota existe com estado "em construção" e está
  marcada como `noindex` até o primeiro texto sair (`showBlogPosts`).
- **Páginas legais** (`/privacidade`, `/termos`, `/licencas`) — redação
  preliminar, escrita a partir de como o produto funciona de fato. **Precisa de
  revisão jurídica.** Cada página exibe esse aviso. Nenhuma garantia,
  certificação ou selo foi inventado.
- **Licenças do aplicativo desktop** — as dependências de terceiros do Vínculo
  Tutoria não foram informadas; a página lista só as do site.
- **Painel de status** — atualizado à mão. A página diz isso explicitamente,
  para não sugerir monitoramento automático que não existe.

## 5. Divergência a confirmar

O hero diz **"3 em construção"**, mas só dois produtos não lançados foram
catalogados (Plano de Aula IA e Constelação). Confirmar se existe um terceiro
— e cadastrá-lo em `src/content/products.ts` — ou ajustar o número para 2.
Marcado como `PENDENTE COM A CLIENTE` no arquivo.

## 6. Textos ajustados por não haver o destino prometido

- O botão **"Ver demonstração"** do bloco do Vínculo virou **"Ver requisitos e
  suporte"** (aponta para `/suporte`). Não existe demonstração para mostrar, e
  um botão com esse rótulo levando a outra coisa enganaria o visitante. Quando
  houver vídeo ou demo, é só voltar o rótulo e trocar o destino.
- O link **"Suporte"** da navbar aponta para a página `/suporte`, e não para a
  seção de depoimentos como no protótipo (onde `#suporte` era o id da seção
  "Quem já usa").

## 7. Inglês

A arquitetura está preparada para i18n por rota, mas **só existe conteúdo em
pt-BR**. O botão EN aparece desabilitado, com explicação para leitores de tela
("English — em breve"). Nenhuma tradução automática foi gerada.

Para ativar, siga o roteiro comentado em `src/i18n/config.ts`. É preciso a
tradução humana de: `src/content/*`, textos dos formulários, metadata das
páginas e as páginas legais.
