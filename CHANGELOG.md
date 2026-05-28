# Changelog

Todas as mudanças relevantes do Conta Azul MCP ficam aqui. Segue [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Pendente
- Screenshots e demo (vídeo/gif) do fluxo de uso — a adicionar antes do launch público (veja `assets/README.md`)

## [0.1.0] — 2026-05-28

### Adicionado
- Lançamento público do repositório
- 35 ferramentas cobrindo a API v2 da Conta Azul, agrupadas por módulo:
  - **Empresa & contas**: `contaazul_list_accounts`, `contaazul_get_company`
  - **Pessoas**: `contaazul_list_people`, `contaazul_get_person`, `contaazul_person_write_create`, `contaazul_person_write_update`, `contaazul_person_delete`
  - **Produtos & serviços**: `contaazul_list_products`, `contaazul_get_product`, `contaazul_product_write_create`, `contaazul_product_write_update`, `contaazul_list_services`, `contaazul_service_write`
  - **Vendas**: `contaazul_list_sales`, `contaazul_get_sale`, `contaazul_sale_write_create`, `contaazul_sale_write_update`, `contaazul_sale_cancel`
  - **Contratos**: `contaazul_list_contracts`, `contaazul_get_contract`, `contaazul_contract_write`, `contaazul_contract_cancel`
  - **Financeiro**: `contaazul_list_receivables`, `contaazul_receivable_create`, `contaazul_list_payables`, `contaazul_payable_create`, `contaazul_list_installments`, `contaazul_get_installment`, `contaazul_settle_installment`, `contaazul_unsettle_installment`, `contaazul_list_financial_accounts`, `contaazul_list_categories`, `contaazul_list_cost_centers`
  - **NF-e**: `contaazul_list_invoices_nfe`, `contaazul_get_invoice_nfe`
- Suporte a leitura **e escrita** (create/update, settle/unsettle) + operações destrutivas (cancel/delete)
- Autenticação via OAuth 2.0 da Conta Azul (a plataforma fornece a aplicação OAuth)
- Multi-empresa: um install pode autorizar N empresas Conta Azul
- Manifestos pra Claude Desktop, Cursor e VS Code (configuração única — auth resolvida em runtime via OAuth 2.1 ou tool `authenticate` para clientes sem OAuth)
- Uma Claude Code skill geral (`contaazul-mcp`) que cobre todos os casos de uso de ERP — vendas, faturamento, contas a pagar/receber, fluxo de caixa, cadastros, contratos e NF-e — em um arquivo único
- Documentação PT-BR: instalação, ferramentas, autenticação, privacidade/LGPD, preços
- README em PT-BR e EN
