# Ferramentas

O Conta Azul MCP expõe **35 ferramentas** para o seu agente de IA, cobrindo a API v2 da Conta Azul. Diferente de um MCP só-leitura, **várias ferramentas escrevem** (criam/alteram dados) e algumas são **destrutivas** (cancelar/excluir).

Modelo de permissão (`op`):
- **read** — leituras seguras
- **write** — mutações reversíveis (create/update, settle/unsettle)
- **admin** — destrutivo (delete/cancel)

> ✍️ As tools `write`/`admin` alteram dados reais na sua Conta Azul. Confirme antes de executar. Operações destrutivas (cancelar venda/contrato, excluir pessoa) não têm desfazer fácil.

## Sumário

| # | Tool | Op | O que faz |
|---|---|---|---|
| 1 | `contaazul_list_accounts` | read | Lista empresas Conta Azul vinculadas |
| 2 | `contaazul_get_company` | read | Dados da empresa ativa (CNPJ, razão social, regime) |
| 3 | `contaazul_list_people` | read | Lista pessoas (clientes/fornecedores/vendedores/transportadores) |
| 4 | `contaazul_get_person` | read | Detalhe de pessoa por id |
| 5 | `contaazul_person_write_create` | write | Cria uma pessoa |
| 6 | `contaazul_person_write_update` | write | Atualiza uma pessoa por id |
| 7 | `contaazul_person_delete` | admin | Remove uma pessoa (destrutivo) |
| 8 | `contaazul_list_products` | read | Lista produtos |
| 9 | `contaazul_get_product` | read | Detalhe de produto por id |
| 10 | `contaazul_product_write_create` | write | Cria um produto |
| 11 | `contaazul_product_write_update` | write | Atualiza um produto por id |
| 12 | `contaazul_list_services` | read | Lista serviços |
| 13 | `contaazul_service_write` | write | Cria um serviço |
| 14 | `contaazul_list_sales` | read | Lista vendas |
| 15 | `contaazul_get_sale` | read | Detalhe de venda por id |
| 16 | `contaazul_sale_write_create` | write | Cria uma venda |
| 17 | `contaazul_sale_write_update` | write | Atualiza uma venda por id |
| 18 | `contaazul_sale_cancel` | admin | Cancela uma venda (destrutivo) |
| 19 | `contaazul_list_contracts` | read | Lista contratos |
| 20 | `contaazul_get_contract` | read | Detalhe de contrato por id |
| 21 | `contaazul_contract_write` | write | Cria um contrato |
| 22 | `contaazul_contract_cancel` | admin | Cancela/remove um contrato (destrutivo) |
| 23 | `contaazul_list_receivables` | read | Lista contas a receber |
| 24 | `contaazul_receivable_create` | write | Cria conta a receber |
| 25 | `contaazul_list_payables` | read | Lista contas a pagar |
| 26 | `contaazul_payable_create` | write | Cria conta a pagar |
| 27 | `contaazul_list_installments` | read | Lista parcelas (eventos financeiros) |
| 28 | `contaazul_get_installment` | read | Detalhe de parcela por id |
| 29 | `contaazul_settle_installment` | write | Quita (settle) uma parcela |
| 30 | `contaazul_unsettle_installment` | write | Desfaz uma quitação por id |
| 31 | `contaazul_list_financial_accounts` | read | Lista contas financeiras (banco, caixa, cartão) |
| 32 | `contaazul_list_categories` | read | Lista categorias financeiras (DRE) |
| 33 | `contaazul_list_cost_centers` | read | Lista centros de custo |
| 34 | `contaazul_list_invoices_nfe` | read | Lista NF-e emitidas |
| 35 | `contaazul_get_invoice_nfe` | read | Detalhe de NF-e por id |

> 💡 Quando o install tem **mais de uma empresa** conectada, toda tool aceita um parâmetro opcional `account` (company_id, label ou parcial — veja `contaazul_list_accounts`). Com uma única empresa, pode omitir.

## Empresa & contas

### 1. `contaazul_list_accounts`
**Op**: read · **Input**: nenhum
Lista as empresas Conta Azul vinculadas a este install (`company_id`, `label`).

### 2. `contaazul_get_company`
**Op**: read · **Input**: `account` (opcional)
Dados da empresa Conta Azul ativa: CNPJ, razão social, regime tributário.

## Pessoas (clientes / fornecedores / vendedores / transportadores)

### 3. `contaazul_list_people`
**Op**: read · **Input**: `tamanho_pagina`, `pagina`, `busca` (nome/documento), `tipo` (`CLIENTE`, `FORNECEDOR`, `VENDEDOR`, `TRANSPORTADOR`), `ativo`
Lista pessoas cadastradas com filtros.

### 4. `contaazul_get_person`
**Op**: read · **Input**: `id` (UUID da pessoa)
Detalhe de uma pessoa.

### 5. `contaazul_person_write_create`
**Op**: write · **Input**: `data` (JSON com `nome` + `cpf`|`cnpj` + `perfis`)
Cria uma pessoa. Ex.: `{"nome":"João Silva","cpf":"12345678900","perfis":[{"tipo_perfil":"Cliente"}],"tipo_pessoa":"Física"}`.

### 6. `contaazul_person_write_update`
**Op**: write · **Input**: `id`, `data` (JSON com campos a alterar)
Atualiza uma pessoa por id.

### 7. `contaazul_person_delete`
**Op**: admin · **Input**: `id`
Remove uma pessoa. **Operação destrutiva** — confirme antes.

## Produtos & serviços

### 8. `contaazul_list_products`
**Op**: read · **Input**: `tamanho_pagina`, `pagina`, `busca`, `ativo`
Lista produtos cadastrados.

### 9. `contaazul_get_product`
**Op**: read · **Input**: `id`
Detalhe de produto.

### 10. `contaazul_product_write_create`
**Op**: write · **Input**: `data` (JSON com `nome` + `valor_venda`)
Cria um produto.

### 11. `contaazul_product_write_update`
**Op**: write · **Input**: `id`, `data`
Atualiza um produto por id.

### 12. `contaazul_list_services`
**Op**: read · **Input**: `tamanho_pagina`, `pagina`, `busca`
Lista serviços cadastrados.

### 13. `contaazul_service_write`
**Op**: write · **Input**: `data` (JSON com `nome`, `valor`, etc.)
Cria um serviço.

## Vendas

### 14. `contaazul_list_sales`
**Op**: read · **Input**: `tamanho_pagina`, `pagina`, `data_inicio`, `data_fim` (YYYY-MM-DD), `cliente_id`, `status_venda`
Lista vendas com filtros.

### 15. `contaazul_get_sale`
**Op**: read · **Input**: `id`
Detalhe de uma venda.

### 16. `contaazul_sale_write_create`
**Op**: write · **Input**: `data` (payload completo da venda em JSON)
Cria uma venda. Ex.: `{"cliente_id":"uuid-p1","itens":[{"produto_id":"uuid-pr1","quantidade":1,"valor":99.0}]}`.

### 17. `contaazul_sale_write_update`
**Op**: write · **Input**: `id`, `data`
Atualiza uma venda por id.

### 18. `contaazul_sale_cancel`
**Op**: admin · **Input**: `id`
Cancela uma venda. **Operação destrutiva** — confirme antes.

## Contratos

### 19. `contaazul_list_contracts`
**Op**: read · **Input**: `tamanho_pagina`, `pagina`, `cliente_id`, `status`
Lista contratos.

### 20. `contaazul_get_contract`
**Op**: read · **Input**: `id`
Detalhe de contrato.

### 21. `contaazul_contract_write`
**Op**: write · **Input**: `data` (payload do contrato em JSON)
Cria um contrato.

### 22. `contaazul_contract_cancel`
**Op**: admin · **Input**: `id`
Cancela/remove um contrato. **Operação destrutiva** — confirme antes.

## Financeiro — contas a receber / pagar

### 23. `contaazul_list_receivables`
**Op**: read · **Input**: `tamanho_pagina`, `pagina`, `data_inicio`, `data_fim`, `status` (`PENDENTE`, `PAGO`, `ATRASADO`), `cliente_id`
Lista contas a receber.

### 24. `contaazul_receivable_create`
**Op**: write · **Input**: `data` (JSON com `cliente_id`, `valor`, `data_vencimento`)
Cria uma conta a receber.

### 25. `contaazul_list_payables`
**Op**: read · **Input**: `tamanho_pagina`, `pagina`, `data_inicio`, `data_fim`, `status`, `fornecedor_id`
Lista contas a pagar.

### 26. `contaazul_payable_create`
**Op**: write · **Input**: `data` (JSON com `fornecedor_id`, `valor`, `data_vencimento`)
Cria uma conta a pagar.

## Financeiro — parcelas / quitação

### 27. `contaazul_list_installments`
**Op**: read · **Input**: `tamanho_pagina`, `pagina`, `data_vencimento_inicio`, `data_vencimento_fim`, `tipo` (`RECEITA`/`DESPESA`), `status`
Lista parcelas (eventos financeiros).

### 28. `contaazul_get_installment`
**Op**: read · **Input**: `id`
Detalhe de uma parcela.

### 29. `contaazul_settle_installment`
**Op**: write · **Input**: `data` (JSON com `parcela_id`, `conta_financeira_id`, `valor_pago`, `data_pagamento`)
Quita (settle) uma parcela. Resolva `conta_financeira_id` via `contaazul_list_financial_accounts`.

### 30. `contaazul_unsettle_installment`
**Op**: write · **Input**: `id` (UUID da quitação)
Desfaz uma quitação.

## Financeiro — contas / categorias / centros de custo

### 31. `contaazul_list_financial_accounts`
**Op**: read · **Input**: `tamanho_pagina`, `pagina`
Lista contas financeiras (banco, caixa, cartão).

### 32. `contaazul_list_categories`
**Op**: read · **Input**: `tamanho_pagina`, `pagina`, `tipo` (`RECEITA`/`DESPESA`)
Lista categorias financeiras (DRE).

### 33. `contaazul_list_cost_centers`
**Op**: read · **Input**: `tamanho_pagina`, `pagina`
Lista centros de custo.

## NF-e

### 34. `contaazul_list_invoices_nfe`
**Op**: read · **Input**: `tamanho_pagina`, `pagina`, `data_emissao_inicio`, `data_emissao_fim`, `status`
Lista NF-e emitidas.

### 35. `contaazul_get_invoice_nfe`
**Op**: read · **Input**: `id`
Detalhe de uma NF-e.

## Prompts de exemplo

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

## Limites e cuidados

- **Rate limit**: o servidor é generoso, mas chamadas em loop podem receber `429`. Espere alguns segundos e tente de novo.
- **Paginação**: `tamanho_pagina` vai até 100. Use `pagina` pra navegar.
- **`data` é JSON string**: as tools de escrita recebem o payload em `data` como string JSON — monte o objeto com cuidado e valide campos obrigatórios.
- **Multi-empresa**: com mais de uma empresa conectada, passe `account` em toda chamada.
- **Confirme escritas**: especialmente `*_cancel`, `*_delete` e `unsettle` — são reversíveis só com retrabalho manual (ou nem isso).
