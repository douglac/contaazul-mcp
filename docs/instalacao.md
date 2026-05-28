# Instalação detalhada

O Conta Azul MCP é um servidor MCP remoto. Você não precisa rodar nada localmente — só apontar seu cliente pra `https://api.mcp.ai/contaazul`.

Para os snippets rápidos com deeplinks, veja [INSTALL.md](../INSTALL.md). Esta página explica o fluxo completo, incluindo cadastro, autorização da empresa Conta Azul e troubleshooting.

## Passo 1 — Crie sua conta na MCP.AI

1. Acesse [app.mcp.ai/contaazul](https://app.mcp.ai/contaazul)
2. Digite seu e-mail
3. Receba o magic-link no inbox e clique pra entrar (não tem senha — autenticação é só por magic-link)

## Passo 2 — Autorize sua empresa Conta Azul

1. Dentro da sua conta, clique em **Autorizar com Conta Azul**
2. Você é redirecionado pro login oficial da **Conta Azul** (OAuth 2.0)
3. Faça login na sua conta Conta Azul
4. Autorize o acesso da MCP.AI à empresa
5. Você volta pra MCP.AI com a empresa conectada

Você pode autorizar **mais de uma empresa** (cada uma é um fluxo OAuth). Quantas empresas você pode conectar depende do plano (veja [precos.md](precos.md)). A plataforma já fornece a aplicação OAuth — você nunca precisa cadastrar client_id/client_secret da Conta Azul.

## Passo 3 — Configure seu cliente MCP

Veja [INSTALL.md](../INSTALL.md) — Cursor, Claude Desktop ou VS Code.

Resumindo:

| Cliente | URL | Auth |
|---|---|---|
| Claude Desktop | `https://api.mcp.ai/contaazul` | OAuth 2.1 (auto) ou agent-auth |
| Cursor | `https://api.mcp.ai/contaazul` | OAuth 2.1 (auto) ou agent-auth |
| VS Code (Copilot) | `https://api.mcp.ai/contaazul` | OAuth 2.1 (auto) ou agent-auth |
| Outros (Continue, Cline, etc.) | `https://api.mcp.ai/contaazul` | OAuth 2.1 (auto) ou agent-auth |

A configuração JSON é **a mesma em todos**: só a URL, sem headers. O fluxo de auth (OAuth ou agent-auth) é escolhido em runtime pelo cliente.

## Passo 4 — Use no chat

Exemplos de prompts:

- "Quais empresas Conta Azul eu tenho conectadas?"
- "Liste minhas vendas do mês e o total faturado"
- "Quais contas a pagar vencem essa semana?"
- "Cadastra o cliente João Silva (CPF 123.456.789-00)"
- "Quita a parcela que venceu hoje na conta do Itaú"

Veja [ferramentas.md](ferramentas.md) pra lista completa de 35 ferramentas.

> ✍️ **Lembre**: o Conta Azul MCP lê **e escreve**. Antes de confirmar uma criação, alteração, cancelamento, exclusão ou quitação, revise o que o agente vai fazer.

## OAuth 2.1 vs agent-auth — qual escolher?

Você não escolhe — o cliente escolhe baseado na própria capacidade. A configuração JSON é a mesma:

```json
{"mcpServers": {"contaazul": {"url": "https://api.mcp.ai/contaazul"}}}
```

O servidor responde diferente conforme detecta:

**OAuth 2.1 (recomendado, cliente moderno)**:
- Servidor responde 401 com `WWW-Authenticate` apontando pro authorization server
- Cliente abre browser, magic-link, você clica "Autorizar com Conta Azul"
- Você nunca cola um token
- Token rotaciona sozinho
- Suportado por: Claude Desktop / Cursor / VS Code recentes

**agent-auth (cliente sem OAuth)**:
- Servidor expõe a tool `authenticate(token)` pro agente
- Agente pede pra você abrir `https://app.mcp.ai/agent-auth`
- Você faz login, autoriza a empresa, copia o JWT, cola no chat
- Agente chama `authenticate(token=<JWT>)`
- Pra clientes legados, scripts, CI/CD, agentes próprios
- ⚠️ Token passa pelo chat → entra nos logs do provedor LLM (Anthropic / OpenAI / etc.)

Detalhe completo: [autenticacao.md](autenticacao.md)

## Quanto custa?

- **Free**: 10 requests em 24h. Sem cartão.
- **Planos pagos**: a partir de R$ 19,90/mês (PJ). Veja [precos.md](precos.md).

## Desinstalar

Pra remover o MCP:

1. **Cliente MCP**: remova o bloco `mcpServers.contaazul` (ou `servers.contaazul` no VS Code) do config e reinicie.
2. **Empresa conectada**: vá em `app.mcp.ai/contaazul` → **Desconectar empresa** revoga a autorização OAuth da Conta Azul.
3. **Conta**: `app.mcp.ai/contaazul → Settings → Excluir conta` apaga tudo (30 dias de retenção legal antes do delete final).

## Troubleshooting

| Sintoma | Causa provável | Solução |
|---|---|---|
| "Authentication required" | OAuth não completou | No browser, finalize o magic-link + "Autorizar com Conta Azul" (Caminho A) ou cole token de `app.mcp.ai/agent-auth` (Caminho B) |
| "401 invalid token" / "Token expired" | JWT expirou | Gere outro em `app.mcp.ai/agent-auth` |
| "Tool authenticate not available" | Cliente fez OAuth com sucesso | Tudo certo — não precisa de agent-auth |
| "Tools não aparecem" | Cliente não recarregou | Reinicie Claude Desktop / Cursor / VS Code |
| "0 empresas conectadas" | Não autorizou nenhuma empresa | `app.mcp.ai/contaazul → Autorizar com Conta Azul` |
| "Conta Azul reauth needed" | Autorização OAuth expirou/revogada | `app.mcp.ai/contaazul → Reautorizar` a empresa afetada |
| "Connection timeout" | Rede/firewall | Verifique se `https://api.mcp.ai/contaazul` abre no browser |

Dúvidas? [contaazul@mcp.ai](mailto:contaazul@mcp.ai)
