# Assets

Recursos visuais do projeto.

## Arquivos atuais

- `logo.svg` — logotipo oficial da Conta Azul (wordmark, azul `#2687E9`), de `contaazul.com/logos/ca-logo.svg`. Marca registrada da Conta Azul, usada como ícone de integração. Trocar se a Conta Azul solicitar (ver disclaimer "não afiliado" no README).

## Pendente (adicionar antes do launch)

- `logo.png` — versão raster 512×512 (alguns registries exigem PNG)
- `logo-dark.svg` — versão pra fundo escuro
- `favicon.ico` (se usar como site)
- `screenshots/` — 4–6 capturas:
  - `claude-desktop-conectado.png` — Claude Desktop mostrando "contaazul" como MCP ativo
  - `pergunta-vendas.png` — exemplo de prompt + resposta com dados sintéticos (resumo de vendas)
  - `contas-a-pagar.png` — análise de contas a pagar/receber
  - `criar-cliente.png` — fluxo de cadastro de cliente com confirmação
  - `app-mcp-ai-contaazul.png` — UI de autorização da empresa Conta Azul
- `demo.gif` — animação 10–15s mostrando o fluxo: instalar → autorizar Conta Azul → primeira pergunta

## Regras pra screenshots

> ⚠️ **CRÍTICO**: nunca commitar screenshots com **dados reais** de clientes/empresa. Use:
> - Ambiente de testes / empresa de demonstração na Conta Azul
> - Dados sintéticos (clientes fictícios, vendas R$ 1.234, CNPJ de exemplo)
> - Ou borre/anonimize qualquer info pessoal (nomes, CPF/CNPJ, valores reais)

Imagens raw com dados reais devem ficar em `assets/screenshots-raw/` (gitignored).

## Pra registries (Smithery, PulseMCP, Glama)

A maioria pede:
- Logo quadrado (mínimo 512×512, idealmente 1024×1024)
- 2–4 screenshots de uso
- Demo gif/vídeo (opcional)

Otimize tamanho: SVG é o ideal pra logo; PNGs comprimidos via `pngquant` ou `tinypng` pra screenshots; GIFs via `gifsicle -O3` ou converta pra MP4 quando o registry aceita.
