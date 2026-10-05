# Conta Azul MCP

### Conta Azul ERP for Claude, Cursor and AI agents

Connect your **Conta Azul** account to your AI agent. Manage **customers and suppliers, products, services, sales, contracts, payables and receivables, installments, settlements and NF-e invoices** in **natural language**. Log in with Conta Azul's own OAuth, in 30 seconds — no token to paste, nothing to configure.

- 🏢 **Full ERP** — people, products, sales, contracts, finance and NF-e in one place
- 💬 **Works with any MCP client**: Claude Desktop, Cursor, VS Code, Cline, Continue
- ✍️ **Read + write** — the AI reads data and also creates/edits records, sales, accounts and settlements (only when you ask)
- 📊 **52 tools** covering Conta Azul's API v2
- 🔑 **Conta Azul OAuth 2.0** — the platform provides the OAuth app, you just click **Authorize**
- 🛡️ **LGPD-compliant** — explicit consent, minimal retention, you in control

[Portuguese version](README.md) · [Full docs (PT-BR)](docs/)

---

## One-click install

### Claude (Web and Desktop)

Anthropic unified MCP installation at `claude.ai/customize/connectors`. **The same link works for both Claude Web and Claude Desktop** (you just need to be logged into your account):

[➕ Open in Claude and connect](https://claude.ai/customize/connectors?modal=add-custom-connector&mcpName=Conta%20Azul%20MCP&mcpServerUrl=https%3A%2F%2Fapi.mcp.ai%2Fcontaazul)

This link opens the "Add custom connector" modal with **name** (`Conta Azul MCP`) and **URL** (`https://api.mcp.ai/contaazul`) pre-filled. Click **Add**, log in via magic-link on the first call, authorize your Conta Azul company.

**Manual** (if the deeplink doesn't open): go to [claude.ai/customize/connectors](https://claude.ai/customize/connectors) → click **+** → **Add custom connector** → paste:
- **Name**: `Conta Azul MCP`
- **URL**: `https://api.mcp.ai/contaazul`

### Cursor

[➕ Install Conta Azul MCP in Cursor](cursor://anysphere.cursor-deeplink/mcp/install?name=contaazul&config=eyJ1cmwiOiJodHRwczovL2FwaS5tY3AuYWkvY29udGFhenVsIn0=)

### VS Code (Copilot Chat)

[➕ Install Conta Azul MCP in VS Code](vscode:mcp/install?name=contaazul&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fapi.mcp.ai%2Fcontaazul%22%7D)

### ChatGPT, Manus, OpenClaw and 40+ other clients

Conta Azul MCP works in any MCP client that supports **MCP over HTTP**. The server URL is always:

```
https://api.mcp.ai/contaazul
```

See [INSTALL.md](INSTALL.md#outros-clientes-mcp) for per-client config examples.

**Detailed instructions**: [INSTALL.md](INSTALL.md) — manual file config (`claude_desktop_config.json`, `.cursor/mcp.json`, `.vscode/mcp.json`), `agent-auth` flow for clients without OAuth, and troubleshooting.

---

## Run your business in chat

After authorizing your company, ask and command things like:

```
List the last 20 sales and total revenue in the last 30 days
Which payables are due this week?
Which receivables are overdue today?
Create the customer João Silva (CPF 123.456.789-00, email joao@ex.com)
Create a product "Initial Setup" priced at R$ 499
Register a sale of "Mensalidade Premium" to customer X
Summarize this month's cash flow (inflow vs outflow)
Settle the R$ 250 installment that was due today on the Itaú account
List the NF-e invoices issued in May
```

> ✍️ **Read + write**: beyond querying, the AI can **create and modify data** in your Conta Azul — records, sales, contracts, payables/receivables and settlements. Writes only happen when **you ask**. Review the proposed action before confirming (especially cancellations and deletions, which are destructive).

---

## 52 available tools

These cover Conta Azul's API v2, grouped by module. Detail for each in [docs/ferramentas.md](docs/ferramentas.md) (PT-BR).

### Company & accounts

| Tool | Description |
|---|---|
| `contaazul_list_accounts` | Lists the linked Conta Azul companies |
| `contaazul_get_company` | Active company data (CNPJ, legal name, tax regime) |

### People (customers / suppliers / sellers / carriers)

| Tool | Description |
|---|---|
| `contaazul_list_people` | Lists people (filters: search, type, active) |
| `contaazul_get_person` | Details of one or more people by id |
| `contaazul_person_write_create` | Creates a person |
| `contaazul_person_write_update` | Updates a person (only the fields sent) |
| `contaazul_person_delete` | Removes people (destructive) |

### Products & services

| Tool | Description |
|---|---|
| `contaazul_list_products` | Lists products |
| `contaazul_product_write` | Creates a product |
| `contaazul_list_services` | Lists services |
| `contaazul_service_write` | Creates a service |

### Sales & quotes

| Tool | Description |
|---|---|
| `contaazul_list_sales` | Lists sales (filters: customer, seller, status, category, product, number, dates, free text) |
| `contaazul_list_sale_items` | Line items (products/services, quantity, value) of up to 50 sales |
| `contaazul_get_sale` | Details of one or more sales by id |
| `contaazul_sale_write_create` | Creates a sale |
| `contaazul_sale_write_update` | Updates a sale |
| `contaazul_sale_cancel` | Cancels sales (destructive) |
| `contaazul_list_budgets` | Lists quotes |
| `contaazul_get_budget` | Details of one or more quotes by id |
| `contaazul_create_budget` | Creates a quote |
| `contaazul_delete_budgets` | Deletes quotes (destructive) |

### Contracts

| Tool | Description |
|---|---|
| `contaazul_list_contracts` | Lists contracts by period |
| `contaazul_get_contract` | Details of one or more contracts by id |
| `contaazul_contract_next_number` | Next available contract number |
| `contaazul_contract_write` | Creates a contract |
| `contaazul_terminate_contract` | Terminates contracts |
| `contaazul_delete_contract` | Removes contracts (destructive) |

### Finance: receivables & payables

| Tool | Description |
|---|---|
| `contaazul_list_receivables` | Lists receivables (filters: due date, status) |
| `contaazul_receivable_create` | Creates a receivable |
| `contaazul_list_payables` | Lists payables (filters: due date, status) |
| `contaazul_payable_create` | Creates a payable |
| `contaazul_list_changed_events` | Financial events changed in a period (incremental sync) |

### Finance: installments & settlements

| Tool | Description |
|---|---|
| `contaazul_list_installments` | Installments of a financial event |
| `contaazul_get_installment` | Details of one or more installments by id |
| `contaazul_update_installment` | Updates installment fields |
| `contaazul_settle_installment` | Records a payment for an installment |
| `contaazul_list_settlements` | Lists the payments of an installment |
| `contaazul_get_settlement` | Payment details by id |
| `contaazul_update_settlement` | Updates a payment |
| `contaazul_delete_settlement` | Reverses a payment (destructive) |

### Charges

| Tool | Description |
|---|---|
| `contaazul_generate_charge` | Generates boleto, Pix or payment link for installments |
| `contaazul_get_charge` | Details of an issued charge |
| `contaazul_cancel_charge` | Cancels an issued charge |

### Financial accounts, categories & cost centers

| Tool | Description |
|---|---|
| `contaazul_list_financial_accounts` | Lists financial accounts (bank, cash, card) |
| `contaazul_get_account_balance` | Current balance of a financial account |
| `contaazul_get_initial_balance` | Initial account balances by period |
| `contaazul_list_transfers` | Transfers between accounts by period |
| `contaazul_list_categories` | Lists financial categories (P&L) |
| `contaazul_list_cost_centers` | Lists cost centers |

### Invoices

| Tool | Description |
|---|---|
| `contaazul_list_invoices_nfe` | Lists issued NF-e |
| `contaazul_get_invoice_nfe` | Details of one or more NF-e by id |
| `contaazul_list_invoices_nfse` | Lists NFS-e by period |

---

## How it works

```
1. Install the MCP in your client (Claude/Cursor/VS Code)
2. On first call, browser opens for magic-link
3. Create account (email only, no password) and click "Authorize with Conta Azul"
4. Log into your Conta Azul account (OAuth 2.0) and authorize the company
5. Done — command and query in natural language
```

One authorization = one Conta Azul company. Higher tiers let you connect **multiple companies**.

---

## Pricing

Business (CNPJ) plans. Billed in **BRL**, monthly.

| Plan | Price | Connected companies | Requests |
|---|---|---|---|
| Free | R$ 0 | — | 10 / 24h |
| Solo | R$ 19.90/mo | 1 | Unlimited |
| Plus | R$ 29.90/mo | up to 3 | Unlimited |
| **Unlimited** ⭐ | **R$ 49.90/mo** | **5+ (R$ 9/extra company)** | Unlimited |

Cancel anytime, no fee. Pricing in BRL (Brazilian Real). Details: [docs/precos.md](docs/precos.md) (PT-BR).

---

## Privacy & LGPD

- **Explicit consent** via Conta Azul OAuth, revocable anytime
- **Minimal scope**: only the data of the Conta Azul company(ies) you authorize
- **Read + write**: the AI can query and also create/modify data — always when you ask
- **Minimum retention**: a company's data deleted after disconnect
- **Sub-processors**: Conta Azul (ERP) + the LLM host you choose
- **You're in control**: revoke OAuth authorization, export data, delete account

Full policy: [docs/privacidade-lgpd.md](docs/privacidade-lgpd.md) (PT-BR)

> ⚠️ **Note**: data returned by tools is forwarded to the **LLM host you choose** (Anthropic / OpenAI / Cursor / your own agent). That provider is a sub-processor outside our control. We recommend subscribing with training opt-out enabled.

---

## FAQ

**Can the AI change data in my Conta Azul?**
Yes. Unlike a read-only MCP, Conta Azul MCP has write tools: create/update people; create products and services; create/update/cancel sales; create, terminate and delete contracts; create payables/receivables; record and reverse installment payments; issue boleto/Pix charges. Writes **only happen when you ask** the agent. Destructive operations (cancel sale or charge, delete person/contract/quote, reverse a payment) should be reviewed before confirming — the token grants full access to the authorized company.

**Do I have to hand over my Conta Azul password?**
No. The connection uses **Conta Azul's own OAuth 2.0** — you log in on the official Conta Azul site and authorize access. Your password never passes through us.

**Is my data used to train AI?**
Not by us. Data goes to the LLM host you choose (Claude, ChatGPT, etc.) — training policy is on that provider. We recommend opt-out.

**Can I connect more than one company?**
Yes. Each OAuth authorization connects one Conta Azul company. The Plus (up to 3) and Unlimited (5+) tiers allow multiple companies — handy for accountants and groups.

**Can I use it with my own agent (not Claude/Cursor)?**
Yes — any client supporting MCP over HTTP. See [INSTALL.md](INSTALL.md) "Other clients".

**Is the server open source?**
The server is proprietary (hosted). This repo is the public wrapper with manifests, docs and skills — all MIT.

---

## Contributing

Issues, PRs and suggestions welcome. Especially:

- Doc/skill translations (PT ✓, EN ✓, ES, FR, IT)
- New Claude Code skills
- Install snippets for new MCP clients
- Documentation fixes/improvements

Please read [SECURITY.md](SECURITY.md) before opening security-related issues.

---

## Support

- 📧 [contaazul@mcp.ai](mailto:contaazul@mcp.ai) — questions, suggestions, partnerships
- 🐛 [GitHub Issues](https://github.com/douglac/contaazul-mcp/issues) — bugs and features
- 📄 [docs/](docs/) — full documentation (PT-BR)

---

## License

MIT — see [LICENSE](LICENSE).

The MCP server at `api.mcp.ai/contaazul` is proprietary (hosted). This repository (manifests, docs, skills) is MIT.

Conta Azul is a trademark of Conta Azul. This project is not affiliated with Conta Azul — it uses the public API v2 via OAuth 2.0.
