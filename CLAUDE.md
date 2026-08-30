# lucascriado

Página pessoal — lista os produtos no ar e os repositórios de
`github.com/lucascriado`.

- **Repositório:** `git@github.com:lucascriado/lucascriado.git` (público)
- **Produção:** <https://lucascriado.com>
- **Local:** `C:\www\lucascriado`

## Stack

React + Vite em TypeScript. O `package.json` ainda se chama `url-http-state`,
herança do scaffold. Sem roteador, sem dependência além de `react` e
`react-dom`.

```
src/App.tsx     a página inteira
src/App.css     layout
src/index.css   tokens e reset
public/favicon.svg
```

## Comandos

`npm run dev` · `npm run build` (roda `tsc` antes do Vite) · `npm run preview`

## Deploy

Coolify, aplicação **`myirtpecbkgusu6wv59pjg12`**, push na `main` dispara o
deploy pelo GitHub App.

> **Build pack tem de ser `dockerfile`.** O build pack `static` do Coolify
> **ignora o `publish_directory`** mesmo com o campo preenchido: ele gera um
> Dockerfile com `COPY . .` para dentro do nginx e publica a raiz do
> repositório. O resultado é o `index.html` de origem do Vite, que aponta para
> `/src/main.tsx` — o navegador não executa TypeScript e a página abre em
> branco, com 366 bytes de casca vazia.
>
> O `Dockerfile` do repositório resolve isso em dois estágios: node compila,
> nginx serve só o `dist`. Ele também traz um `try_files` mandando rota
> desconhecida para o `index.html`, senão um F5 fora da raiz daria 404.

## Como a página funciona

Renderiza duas listas. **Produtos** é fixa no código (`PRODUTOS` em `App.tsx`)
e aponta para `ticketboard.app` e `nonia.app`. **Repositórios** vem da API
pública do GitHub a cada visita, com uma cópia embutida (`REPOS`) como
fallback — se a API não responder, a página continua completa em vez de
aparecer vazia.

Ao adicionar um produto novo, edite `PRODUTOS`. A lista de repositórios se
atualiza sozinha; a cópia embutida só precisa de atenção se ficar muito
defasada.

## Design

Sempre escura, sem seguir `prefers-color-scheme` — foi decisão explícita.
JetBrains Mono do início ao fim, carregada do Google Fonts no `index.html`.
Coluna única de 720px, tokens de cor em `:root` no `index.css`.

O favicon é um **"l" minúsculo desenhado no traço da JetBrains Mono**: flag no
topo, haste, curva à direita na base, branco sobre quadrado escuro `#101010`.

## Alterações em 30/08/2026

O repositório **era o template starter do Vite** — contador, logos do Vite e do
React, `App.css` de exemplo. Foi substituído pela página atual. Junto disso:
título passou a ser `lucascriado.com`, favicon novo, `public/vite.svg` e
`src/assets/react.svg` removidos, e o `Dockerfile` acrescentado.
