# Conta Azul MCP

### ERP financeiro Conta Azul para Claude, Cursor e agentes de IA

Conecte sua conta **Conta Azul** ao seu agente de IA. Gerencie **clientes e fornecedores, produtos, serviços, vendas, contratos, contas a pagar e receber, parcelas, quitações e NF-e** em **linguagem natural**. Login via OAuth da própria Conta Azul, em 30 segundos — sem digitar token, sem configurar nada.

- 🏢 **ERP completo** — pessoas, produtos, vendas, contratos, financeiro e NF-e em um só lugar
- 💬 **Funciona com qualquer cliente MCP**: Claude Desktop, Cursor, VS Code, Cline, Continue
- ✍️ **Lê e escreve** — a IA consulta dados e também cria/edita cadastros, vendas, contas e quitações (sempre quando você pede)
- 📊 **35 ferramentas** cobrindo a API v2 da Conta Azul
- 🔑 **OAuth 2.0 da Conta Azul** — a plataforma fornece a aplicação OAuth, você só clica em **Autorizar**
- 🛡️ **LGPD-compliant** — consentimento explícito, retenção mínima, você no controle

[English version](README.en.md) · [Documentação completa](docs/) · [Skills do Claude Code](skills/)

---

## Instalar em 1 clique

### Claude (Web e Desktop)

A Anthropic unificou a instalação de MCPs em `claude.ai/customize/connectors`. **O mesmo link serve pra Claude Web e Claude Desktop** (basta estar logado na sua conta):

[➕ Abrir no Claude e conectar](https://claude.ai/customize/connectors?modal=add-custom-connector&mcpName=Conta%20Azul%20MCP&mcpServerUrl=https%3A%2F%2Fapi.mcp.ai%2Fcontaazul)

Esse link abre o modal "Adicionar conector personalizado" já com **nome** (`Conta Azul MCP`) e **URL** (`https://api.mcp.ai/contaazul`) pré-preenchidos. Clique **Adicionar**, faça login via magic-link na primeira chamada, autorize sua empresa Conta Azul.

**Manual** (se o deeplink não abrir): vá em [claude.ai/customize/connectors](https://claude.ai/customize/connectors) → clique **+** → **Adicionar conector personalizado** → cole:
- **Nome**: `Conta Azul MCP`
- **URL**: `https://api.mcp.ai/contaazul`

### Cursor

[➕ Instalar Conta Azul MCP no Cursor](cursor://anysphere.cursor-deeplink/mcp/install?name=contaazul&config=eyJ1cmwiOiJodHRwczovL2FwaS5tY3AuYWkvY29udGFhenVsIn0=)

### VS Code (Copilot Chat)

[➕ Instalar Conta Azul MCP no VS Code](vscode:mcp/install?name=contaazul&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fapi.mcp.ai%2Fcontaazul%22%7D)

### ChatGPT, Manus, OpenClaw e mais 40+ clientes

Conta Azul MCP funciona em qualquer cliente MCP que suporte **MCP over HTTP**. A URL do servidor é sempre a mesma:

```
https://api.mcp.ai/contaazul
```

Veja [INSTALL.md](INSTALL.md#outros-clientes-mcp) pra exemplos de configuração por cliente.

**Instruções detalhadas**: [INSTALL.md](INSTALL.md) — config manual em arquivo (`claude_desktop_config.json`, `.cursor/mcp.json`, `.vscode/mcp.json`), fluxo `agent-auth` pra clientes sem OAuth, troubleshooting, e [instruções pra IA te ajudar a instalar](INSTALL.md#se-uma-ia-está-te-ajudando-a-instalar).

---

## Pergunte sobre o seu negócio

Depois de autorizar sua empresa, faça perguntas e dê comandos como:

```
Liste as 20 últimas vendas e o total faturado nos últimos 30 dias
Quais contas a pagar vencem essa semana?
Quais contas a receber estão vencidas hoje?
Cadastra o cliente João Silva (CPF 123.456.789-00, e-mail joao@ex.com)
Cria um produto "Setup Inicial" com valor de venda R$ 499
Registra uma venda do produto Mensalidade Premium para o cliente X
Resume meu fluxo de caixa do mês (entradas vs saídas)
Quita a parcela de R$ 250 que venceu hoje na conta do Itaú
Lista as NF-e emitidas em maio
```

> ✍️ **Lê e escreve**: além de consultar, a IA pode **criar e alterar dados** na sua Conta Azul — cadastros, vendas, contratos, contas a pagar/receber e quitações. As escritas só acontecem quando **você pede**. Recomendamos revisar a ação proposta antes de confirmar (especialmente cancelamentos e exclusões, que são destrutivos).

---

## 35 ferramentas disponíveis

Cobrem a API v2 da Conta Azul, organizadas por módulo. Detalhe de cada uma em [docs/ferramentas.md](docs/ferramentas.md).

### Empresa & contas

| Tool | Descrição |
|---|---|
| `contaazul_list_accounts` | Lista as empresas Conta Azul vinculadas a este install |
| `contaazul_get_company` | Dados da empresa ativa (CNPJ, razão social, regime tributário) |

### Pessoas (clientes / fornecedores / vendedores / transportadores)

| Tool | Descrição |
|---|---|
| `contaazul_list_people` | Lista pessoas (filtros: busca, tipo, ativo) |
| `contaazul_get_person` | Detalhe de uma pessoa por id |
| `contaazul_person_write_create` | Cria uma pessoa (nome + cpf/cnpj + perfis) |
| `contaazul_person_write_update` | Atualiza uma pessoa por id |
| `contaazul_person_delete` | Remove uma pessoa (destrutivo) |

### Produtos & serviços

| Tool | Descrição |
|---|---|
| `contaazul_list_products` | Lista produtos cadastrados |
| `contaazul_get_product` | Detalhe de produto por id |
| `contaazul_product_write_create` | Cria um produto (nome + valor_venda) |
| `contaazul_product_write_update` | Atualiza um produto por id |
| `contaazul_list_services` | Lista serviços cadastrados |
| `contaazul_service_write` | Cria um serviço |

### Vendas

| Tool | Descrição |
|---|---|
| `contaazul_list_sales` | Lista vendas (filtros: data, cliente, status) |
| `contaazul_get_sale` | Detalhe de uma venda por id |
| `contaazul_sale_write_create` | Cria uma venda |
| `contaazul_sale_write_update` | Atualiza uma venda por id |
| `contaazul_sale_cancel` | Cancela uma venda (destrutivo) |

### Contratos

| Tool | Descrição |
|---|---|
| `contaazul_list_contracts` | Lista contratos (filtros: cliente, status) |
| `contaazul_get_contract` | Detalhe de contrato por id |
| `contaazul_contract_write` | Cria um contrato |
| `contaazul_contract_cancel` | Cancela/remove um contrato (destrutivo) |

### Financeiro (contas a receber / pagar / parcelas / quitação)

| Tool | Descrição |
|---|---|
| `contaazul_list_receivables` | Lista contas a receber (filtros: data, status, cliente) |
| `contaazul_receivable_create` | Cria uma conta a receber |
| `contaazul_list_payables` | Lista contas a pagar (filtros: data, status, fornecedor) |
| `contaazul_payable_create` | Cria uma conta a pagar |
| `contaazul_list_installments` | Lista parcelas / eventos financeiros |
| `contaazul_get_installment` | Detalhe de uma parcela por id |
| `contaazul_settle_installment` | Quita (settle) uma parcela |
| `contaazul_unsettle_installment` | Desfaz uma quitação por id |
| `contaazul_list_financial_accounts` | Lista contas financeiras (banco, caixa, cartão) |
| `contaazul_list_categories` | Lista categorias financeiras (DRE) |
| `contaazul_list_cost_centers` | Lista centros de custo |

### NF-e

| Tool | Descrição |
|---|---|
| `contaazul_list_invoices_nfe` | Lista NF-e emitidas (filtros: data de emissão, status) |
| `contaazul_get_invoice_nfe` | Detalhe de uma NF-e por id |

Documentação detalhada de cada tool: [docs/ferramentas.md](docs/ferramentas.md)

---

## O que dá pra fazer

Conta Azul MCP cobre os principais módulos do ERP:

- **Pessoas** — clientes, fornecedores, vendedores e transportadores (listar, detalhar, criar, atualizar, remover)
- **Produtos & serviços** — catálogo de produtos e serviços com preço de venda
- **Vendas** — listar, detalhar, criar, atualizar e cancelar vendas
- **Contratos** — contratos recorrentes (criar, consultar, cancelar)
- **Contas a receber / pagar** — listar e criar lançamentos financeiros
- **Parcelas & quitações** — listar parcelas, quitar (settle) e desfazer quitação (unsettle)
- **Contas financeiras** — bancos, caixa, cartões
- **Categorias (DRE) & centros de custo** — taxonomia financeira pra análises
- **NF-e** — consulta de notas fiscais eletrônicas emitidas

---

## Como funciona

```
1. Você instala o MCP no seu cliente (Claude/Cursor/VS Code)
2. Na primeira chamada, browser abre pra magic-link
3. Você cria conta (só e-mail, sem senha) e clica em "Autorizar com Conta Azul"
4. Loga na sua conta Conta Azul (OAuth 2.0) e autoriza a empresa
5. Pronto — comandos e perguntas em linguagem natural
```

Uma autorização = uma empresa Conta Azul. Planos superiores permitem conectar **mais de uma empresa**.

Detalhe técnico: [docs/instalacao.md](docs/instalacao.md) · [docs/autenticacao.md](docs/autenticacao.md)

---

## Skill pra agentes de IA

[![skills.sh](https://skills.sh/b/douglac/contaazul-mcp)](https://skills.sh/douglac/contaazul-mcp)

Uma skill geral que cobre **todos os casos de uso** do Conta Azul MCP — vendas, faturamento, contas a pagar/receber, fluxo de caixa, cadastros, contratos e NF-e. Funciona em **Claude Code, Cursor, Codex, OpenCode e outros 50+ agentes** suportados pelo ecossistema [skills.sh](https://skills.sh).

### Instalar via skills.sh (recomendado)

```bash
# detecta seu agente automaticamente e instala no diretório certo
npx skills add douglac/contaazul-mcp

# ou instala globalmente (todos os projetos)
npx skills add douglac/contaazul-mcp -g

# pra um agente específico
npx skills add douglac/contaazul-mcp -a claude-code
```

### Instalar manualmente (Claude Code)

```bash
cp -r skills/contaazul-mcp ~/.claude/skills/
```

📁 Conteúdo da skill: [`skills/contaazul-mcp/SKILL.md`](skills/contaazul-mcp/SKILL.md)

Depois é só pedir coisas como "Resume meu fluxo de caixa do mês" ou "Cadastra esse novo cliente" — a skill ativa automaticamente e orquestra as 35 tools do Conta Azul MCP.

---

## Preços

Planos PJ (CNPJ). Cobrança em **R$ (BRL)**, mensal.

| Plano | Preço | Empresas conectadas | Requests |
|---|---|---|---|
| Free | R$ 0 | — | 10 / 24h |
| Solo | R$ 19,90/mês | 1 | Ilimitados |
| Plus | R$ 29,90/mês | até 3 | Ilimitados |
| **Unlimited** ⭐ | **R$ 49,90/mês** | **5+ (R$ 9/empresa extra)** | Ilimitados |

Detalhamento: [docs/precos.md](docs/precos.md). Cancela quando quiser, sem taxa.

---

## Privacidade & LGPD

- **Consentimento explícito** via OAuth da Conta Azul, revogável a qualquer momento
- **Escopo mínimo**: só os dados da(s) empresa(s) Conta Azul que você autorizar
- **Lê e escreve**: a IA pode consultar e também criar/alterar dados — sempre quando você pede
- **Retenção mínima**: dados de uma empresa apagados após desconectar
- **Sub-processadores**: Conta Azul (ERP) + LLM host que você escolher
- **Você no controle**: revogar a autorização OAuth, exportar dados, excluir conta

Política completa: [docs/privacidade-lgpd.md](docs/privacidade-lgpd.md)

> ⚠️ **Atenção**: os dados retornados pelas tools são enviados ao **LLM host que você escolher** (Anthropic / OpenAI / Cursor / agente próprio). Esse provedor é sub-processador fora do nosso controle. Recomendamos contratar planos com opt-out de treinamento ativado.

---

## Perguntas frequentes

**A IA pode alterar dados na minha Conta Azul?**
Sim. Diferente de um MCP só-leitura, o Conta Azul MCP tem ferramentas de escrita: criar/atualizar pessoas, produtos e serviços; criar/atualizar/cancelar vendas e contratos; criar contas a pagar/receber; quitar e desfazer quitações. As escritas **só ocorrem quando você pede** ao agente. Operações destrutivas (cancelar venda/contrato, excluir pessoa) devem ser revisadas antes de confirmar — o token dá acesso completo à empresa autorizada.

**Preciso entregar minha senha da Conta Azul?**
Não. A conexão é via **OAuth 2.0 da própria Conta Azul** — você loga no site oficial da Conta Azul e autoriza o acesso. Sua senha nunca passa pela gente.

**Meus dados são usados pra treinar IA?**
Não pela gente. Os dados vão pro LLM host que você escolher (Claude, ChatGPT, etc.) — política de treinamento é responsabilidade do provedor de IA. Recomendamos opt-out.

**Posso conectar mais de uma empresa?**
Sim. Cada autorização OAuth conecta uma empresa Conta Azul. Os planos Plus (até 3) e Unlimited (5+) permitem múltiplas empresas — útil pra contadores e grupos.

**Como cancelo?**
`app.mcp.ai/contaazul → Settings → Assinatura → Cancelar`. Encerra no fim do ciclo, sem taxa.

**Posso usar com agente próprio (não Claude/Cursor)?**
Sim — qualquer cliente que suporte MCP over HTTP. Veja [INSTALL.md](INSTALL.md) seção "Outros clientes".

**O servidor é open source?**
O servidor é proprietário (hosted). Este repositório é o wrapper público com manifestos, docs e skills — tudo MIT. PRs e contribuições nas docs/skills são bem-vindas.

---

## Contribuindo

Issues, PRs e sugestões são bem-vindas. Especialmente:

- Traduções de docs/skills (EN ✓, ES, FR, IT)
- Novas skills do Claude Code
- Snippets de instalação pra clientes MCP novos
- Correções/melhorias na documentação

Por favor leia [SECURITY.md](SECURITY.md) antes de abrir issue com algo relacionado a segurança.

---

## Suporte

- 📧 [contaazul@mcp.ai](mailto:contaazul@mcp.ai) — dúvidas, sugestões, parcerias
- 🐛 [GitHub Issues](https://github.com/douglac/contaazul-mcp/issues) — bugs e features
- 📄 [docs/](docs/) — documentação completa em PT-BR

---

## Licença

MIT — veja [LICENSE](LICENSE).

O servidor MCP em `api.mcp.ai/contaazul` é proprietário (hosted). Este repositório (manifestos, docs, skills) é MIT.

Conta Azul é marca da Conta Azul. Este projeto não é afiliado à Conta Azul — usa a API v2 pública via OAuth 2.0.
