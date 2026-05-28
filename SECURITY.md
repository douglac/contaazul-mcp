# Security Policy

## Seu token de acesso é um credential

O Conta Azul MCP suporta dois fluxos de autenticação. Em **ambos os casos**, o resultado é um token (OAuth access_token ou JWT) que dá acesso aos dados — e às operações de escrita — da(s) sua(s) empresa(s) Conta Azul:

1. **OAuth 2.1 (recomendado)** — o cliente MCP faz o fluxo automaticamente via magic-link + autorização Conta Azul. O token vive **dentro do cliente** (Claude Desktop / Cursor / etc.) e rotaciona sozinho. Você nunca vê nem cola um token.
2. **agent-auth (manual)** — você abre `https://app.mcp.ai/agent-auth`, faz login, copia um JWT e cola no chat com o agente. O agente passa o JWT pra tool `authenticate`. Use quando o cliente não suporta OAuth 2.1.

**O token é equivalente a uma senha.** Quem tem o token consegue, na empresa autorizada:

- Listar e ler pessoas, produtos, serviços, vendas, contratos, financeiro e NF-e
- **Criar e atualizar** pessoas, produtos, serviços, vendas e contratos
- **Criar** contas a pagar e a receber
- **Quitar e desfazer quitações** de parcelas
- **Cancelar** vendas e contratos, e **excluir** pessoas (operações destrutivas)

⚠️ **O Conta Azul MCP lê E escreve.** Diferente de um MCP só-leitura, ele pode **alterar dados reais** na sua Conta Azul: cadastros, vendas, contas a pagar/receber e quitações. As escritas só acontecem quando você pede ao agente, mas o token sozinho dá esse poder — trate-o como uma credencial de acesso total à empresa conectada.

## Boas práticas

- **Não compartilhe** o token. Não cole em chats públicos, issues, e-mails ou pastebins.
- **Revise antes de confirmar escritas**: peça ao agente pra mostrar o que vai criar/alterar/cancelar/excluir antes de executar. Operações destrutivas (`contaazul_sale_cancel`, `contaazul_contract_cancel`, `contaazul_person_delete`) não têm desfazer fácil.
- **Prefira OAuth 2.1** sempre que possível: o token nunca passa pelo chat do agente, não vai pro provedor LLM como sub-processador.
- **No fluxo agent-auth**, lembre que o JWT passa pelo provedor LLM (Anthropic / OpenAI / Cursor / etc.) — ele fica nos logs deles conforme retenção contratada. Mitigue ativando:
  - Claude Pro/Team com "Improve Claude" desligado
  - Cursor com Privacy Mode
  - Política equivalente no provedor que você usa
- **Rotacione**: cada visita a `/agent-auth` emite um novo JWT (o anterior expira sozinho). Pra clientes de longo prazo, regenere periodicamente.
- **Um token por cliente**: gere tokens separados em `/agent-auth` pra cada cliente (Cursor / Claude Desktop / script). Assim você não revoga tudo de uma vez se um vazar.
- **Revogar tudo**: `app.mcp.ai → Settings → Sessões → Encerrar todas` invalida todos os tokens OAuth e agent-auth ativos. Pra cortar o acesso de raiz, revogue também a autorização OAuth da Conta Azul (`app.mcp.ai/contaazul → Desconectar empresa`).

## O que está no escopo do Conta Azul MCP

- ✅ **Leitura**: empresa, pessoas, produtos, serviços, vendas, contratos, contas a pagar/receber, parcelas, contas financeiras, categorias, centros de custo, NF-e.
- ✅ **Escrita reversível**: criar/atualizar pessoas, produtos, serviços, vendas e contratos; criar contas a pagar/receber; quitar e desfazer quitações.
- ✅ **Escrita destrutiva**: cancelar venda/contrato, excluir pessoa. Confirme antes.

## O que NÃO está no escopo

- ❌ **Acesso à senha da sua Conta Azul**: você nunca digita a senha da Conta Azul aqui. O acesso é via **OAuth 2.0 oficial da Conta Azul** — você loga no site deles e autoriza.
- ❌ **Movimentação bancária direta**: o MCP opera dentro do ERP Conta Azul (lançamentos, quitações). Ele não move dinheiro em contas bancárias fora da Conta Azul.
- ❌ **Treinamento de IA**: dados retornados pelas tools NÃO são usados pra treinar nada por nós. Eles vão direto pro cliente LLM que você escolher (Claude, ChatGPT, etc.) — e a política de cada provedor de IA é responsabilidade sua.

## Reportar vulnerabilidades

Encontrou um bug de segurança? Por favor, **NÃO abra issue pública**. Mande um e-mail pra:

**[contaazul@mcp.ai](mailto:contaazul@mcp.ai)**

Inclua:
- Descrição da vulnerabilidade
- Passos pra reproduzir
- Versão do MCP / cliente / SO usado
- Seu nome (opcional, pra crédito no fix)

Resposta em até 72h úteis. Vulnerabilidades críticas pagam recompensa (programa em definição).

## Disclosure timeline

1. Você reporta privadamente
2. Confirmamos recebimento em 72h
3. Investigamos e desenvolvemos fix (prazo varia por severidade)
4. Aplicamos fix em produção
5. Disclosure público (CHANGELOG + post no repo) após fix em produção
