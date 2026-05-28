---
name: contaazul-mcp
description: Skill abrangente pra operar o ERP Conta Azul via Conta Azul MCP — vendas, faturamento, contas a pagar/receber, fluxo de caixa, cadastros de pessoas/produtos/serviços, contratos, parcelas/quitações e NF-e. Use sempre que o usuário perguntar ou pedir algo sobre a operação financeira/comercial da empresa dele na Conta Azul (vendas, clientes, fornecedores, produtos, contas, parcelas, notas fiscais). Orquestra as 35 ferramentas contaazul_* (read + write) do servidor MCP remoto em https://api.mcp.ai/contaazul.
---

# Conta Azul MCP — skill geral

Skill única que cobre todos os casos de uso do Conta Azul MCP. Use sempre que o usuário falar sobre a operação da empresa dele na Conta Azul.

> ⚠️ **Lê E escreve.** Várias tools alteram dados reais na Conta Azul (criar/atualizar/cancelar/excluir/quitar). **Antes de qualquer escrita, mostre ao usuário exatamente o que vai ser feito e peça confirmação.** Operações destrutivas (`contaazul_sale_cancel`, `contaazul_contract_cancel`, `contaazul_person_delete`, `contaazul_unsettle_installment`) exigem confirmação explícita.

## Quando ativar

Qualquer pergunta ou comando sobre a operação da empresa:

- **Vendas / faturamento**: "minhas vendas do mês", "quanto faturei", "cria uma venda", "cancela a venda X"
- **Contas a receber/pagar**: "o que tenho a receber", "contas a pagar dessa semana", "cria uma conta a receber", "o que está vencido"
- **Fluxo de caixa**: "fluxo de caixa do mês", "entradas vs saídas", "como tá o caixa"
- **Cadastros**: "cadastra esse cliente", "atualiza o e-mail do fornecedor", "cria um produto", "novo serviço"
- **Contratos**: "meus contratos ativos", "cria um contrato", "cancela o contrato Y"
- **Parcelas / quitação**: "quita essa parcela", "desfaz a quitação", "parcelas vencendo"
- **NF-e**: "notas fiscais emitidas", "detalhe da NF-e número 100"
- **Estrutura financeira**: "minhas contas financeiras", "categorias do DRE", "centros de custo"

## Setup inicial (uma vez por sessão)

1. **`contaazul_list_accounts`** → empresas Conta Azul vinculadas (company_id, label).
   - Se 0 → instrua "Autorize uma empresa em https://app.mcp.ai/contaazul antes de continuar."
   - Se 1 → use sem o parâmetro `account`.
   - Se >1 → pergunte ao usuário em qual empresa operar e passe `account` (company_id, label ou parcial) em todas as chamadas seguintes.
2. **`contaazul_get_company`** (opcional) → CNPJ, razão social, regime tributário, pra contextualizar respostas.

Cacheie o resultado e reaproveite na conversa.

## Casos de uso — playbooks

### 1. Resumo de vendas / faturamento

**Plano**:
1. Período (padrão: mês atual). `data_inicio` / `data_fim` em `YYYY-MM-DD`.
2. `contaazul_list_sales(data_inicio, data_fim, tamanho_pagina: 100)`. Pagine via `pagina` se vier `total` maior que a página.
3. Agregue: total faturado (soma `valor_total`), nº de vendas, ticket médio, top clientes.
4. Apresente em tabela markdown. R$ com 2 casas.

### 2. Contas a receber / a pagar

**Plano**:
1. `contaazul_list_receivables(status, data_inicio, data_fim)` e/ou `contaazul_list_payables(...)`.
2. Pra "vencidas hoje" / "vencem essa semana": filtre por `data_vencimento` no recorte pedido.
3. Tabela `Vencimento | Cliente/Fornecedor | Valor | Status`. Some o total.
4. Para criar: `contaazul_receivable_create` / `contaazul_payable_create` com `data` (JSON). **Confirme antes.**

### 3. Fluxo de caixa do mês

**Plano**:
1. `contaazul_list_installments(data_vencimento_inicio, data_vencimento_fim)` ou cruze receivables + payables.
2. Separe `tipo` RECEITA (entradas) e DESPESA (saídas).
3. Tabela `Mês | Entradas | Saídas | Líquido`. Destaque o saldo líquido.
4. Opcional: agrupe por `contaazul_list_categories` (DRE) pra ver onde entra/sai mais.

### 4. Cadastro de pessoa (cliente / fornecedor)

**Plano**:
1. Confirme os dados com o usuário: nome, CPF ou CNPJ, perfil (Cliente/Fornecedor/Vendedor/Transportador), e-mail.
2. Verifique duplicidade: `contaazul_list_people(busca: "<nome ou documento>")`.
3. **Mostre o payload que vai enviar e peça OK.**
4. `contaazul_person_write_create` com `data` JSON (ex.: `{"nome":"João Silva","cpf":"12345678900","perfis":[{"tipo_perfil":"Cliente"}],"tipo_pessoa":"Física"}`).
5. Para alterar: `contaazul_person_write_update(id, data)`.

### 5. Produtos & serviços

- Listar: `contaazul_list_products` / `contaazul_list_services` (filtro `busca`).
- Criar produto: `contaazul_product_write_create` (`{"nome":...,"valor_venda":...}`). Atualizar: `contaazul_product_write_update(id, data)`.
- Criar serviço: `contaazul_service_write` (`{"nome":...,"valor":...}`).

### 6. Criar uma venda

**Plano**:
1. Resolva os ids: cliente via `contaazul_list_people`, produtos via `contaazul_list_products`.
2. Monte o payload (`cliente_id`, `itens[]` com `produto_id`, `quantidade`, `valor`).
3. **Mostre o resumo da venda e peça confirmação.**
4. `contaazul_sale_write_create(data)`. Para editar: `contaazul_sale_write_update(id, data)`.
5. Cancelar (`contaazul_sale_cancel`) é destrutivo — confirmação explícita.

### 7. Contratos

- Listar/detalhar: `contaazul_list_contracts`, `contaazul_get_contract`.
- Criar: `contaazul_contract_write(data)`. Cancelar: `contaazul_contract_cancel(id)` (destrutivo).

### 8. Parcelas & quitação

**Plano**:
1. `contaazul_list_installments(tipo, status, data_vencimento_inicio, data_vencimento_fim)`.
2. Detalhe: `contaazul_get_installment(id)`.
3. Quitar: `contaazul_settle_installment(data)` com `{"parcela_id":...,"conta_financeira_id":...,"valor_pago":...,"data_pagamento":"YYYY-MM-DD"}`. Resolva `conta_financeira_id` via `contaazul_list_financial_accounts`. **Confirme valor e conta antes.**
4. Desfazer: `contaazul_unsettle_installment(id)` (reverte — confirme).

### 9. NF-e

- `contaazul_list_invoices_nfe(data_emissao_inicio, data_emissao_fim, status)` e `contaazul_get_invoice_nfe(id)`. Ambas são apenas consulta (não emitem nem alteram NF-e).

## Regras transversais

### Formatação
- Valores sempre em **R$ com 2 casas decimais** (`R$ 1.234,56`).
- Datas em **DD/MM/YYYY** na exibição; **YYYY-MM-DD** nos params das tools.
- Use **tabela markdown** pra qualquer agregação. Bullets pra resumo.

### Antes de escrever (obrigatório)
- **Sempre confirme** create/update/cancel/delete/settle/unsettle com o usuário antes de chamar a tool.
- Mostre o **payload ou o resumo** do que será criado/alterado.
- Para `data` (JSON string), monte o objeto explicitamente e valide os campos obrigatórios (ex.: pessoa precisa de nome + cpf|cnpj; venda precisa de cliente_id + itens).

### Multi-empresa
- Se `contaazul_list_accounts` retornar mais de uma empresa, **sempre** passe `account` e confirme com o usuário em qual empresa está operando antes de qualquer escrita.

### Não faça
- ❌ Cancelar/excluir sem confirmação explícita.
- ❌ Inventar ids — sempre resolva via list/get antes de referenciar.
- ❌ Assumir a empresa quando há múltiplas conectadas.
- ❌ Mostrar valores em centavos sem formatar.
- ❌ Dar conselho contábil/fiscal definitivo — lembre que o contador deve validar.

## Output esperado (template universal)

```markdown
## [Título] — [Período / empresa]

**Resumo**: [1-2 linhas com a conclusão principal]

### [Seção]
[Tabela ou bullets]

### Ações propostas (se houver escrita)
- [O que será criado/alterado] → aguardando sua confirmação
```

Mantenha output enxuto — quando for muita info, ofereça "Quer detalhar X?" em vez de jogar tudo de uma vez.
