# Ferramentas

O Conta Azul MCP expõe **52 ferramentas** para o seu agente de IA, cobrindo a API v2 da Conta Azul. Diferente de um MCP só-leitura, **várias ferramentas escrevem** (criam/alteram dados) e algumas são **destrutivas** (cancelar/excluir).

Modelo de permissão (`op`):
- **read** — leituras seguras
- **write** — mutações reversíveis (criar/atualizar, registrar baixa, gerar cobrança)
- **admin** — destrutivo (excluir/cancelar/estornar)

> ✍️ As tools `write`/`admin` alteram dados reais na sua Conta Azul. Confirme antes de executar. Operações destrutivas (cancelar venda/cobrança, excluir pessoa/contrato/orçamento, estornar baixa) não têm desfazer fácil.

## Sumário

| # | Tool | Op | O que faz |
|---|---|---|---|
| 1 | `contaazul_list_accounts` | read | Lista as empresas Conta Azul vinculadas |
| 2 | `contaazul_get_company` | read | Dados da empresa ativa (CNPJ, razão social, regime tributário) |
| 3 | `contaazul_list_people` | read | Lista pessoas (filtros: busca, tipo, ativo) |
| 4 | `contaazul_get_person` | read | Detalhe de uma ou mais pessoas por id |
| 5 | `contaazul_person_write_create` | write | Cria uma pessoa |
| 6 | `contaazul_person_write_update` | write | Atualiza uma pessoa (só os campos enviados) |
| 7 | `contaazul_person_delete` | admin | Remove pessoas (destrutivo) |
| 8 | `contaazul_list_products` | read | Lista produtos cadastrados |
| 9 | `contaazul_product_write` | write | Cria um produto |
| 10 | `contaazul_list_services` | read | Lista serviços cadastrados |
| 11 | `contaazul_service_write` | write | Cria um serviço |
| 12 | `contaazul_list_sales` | read | Lista vendas (filtros: cliente, vendedor, situação, categoria, produto, número, datas, texto livre) |
| 13 | `contaazul_list_sale_items` | read | Itens (produtos/serviços, quantidade, valor) de até 50 vendas |
| 14 | `contaazul_get_sale` | read | Detalhe de uma ou mais vendas por id |
| 15 | `contaazul_sale_write_create` | write | Cria uma venda |
| 16 | `contaazul_sale_write_update` | write | Atualiza uma venda |
| 17 | `contaazul_sale_cancel` | admin | Cancela vendas (destrutivo) |
| 18 | `contaazul_list_budgets` | read | Lista orçamentos |
| 19 | `contaazul_get_budget` | read | Detalhe de um ou mais orçamentos por id |
| 20 | `contaazul_create_budget` | write | Cria um orçamento |
| 21 | `contaazul_delete_budgets` | admin | Exclui orçamentos (destrutivo) |
| 22 | `contaazul_list_contracts` | read | Lista contratos por período |
| 23 | `contaazul_get_contract` | read | Detalhe de um ou mais contratos por id |
| 24 | `contaazul_contract_next_number` | read | Próximo número de contrato disponível |
| 25 | `contaazul_contract_write` | write | Cria um contrato |
| 26 | `contaazul_terminate_contract` | admin | Encerra contratos |
| 27 | `contaazul_delete_contract` | admin | Remove contratos (destrutivo) |
| 28 | `contaazul_list_receivables` | read | Lista contas a receber (filtros: vencimento, status) |
| 29 | `contaazul_receivable_create` | write | Cria uma conta a receber |
| 30 | `contaazul_list_payables` | read | Lista contas a pagar (filtros: vencimento, status) |
| 31 | `contaazul_payable_create` | write | Cria uma conta a pagar |
| 32 | `contaazul_list_changed_events` | read | Eventos financeiros alterados num período (sync incremental) |
| 33 | `contaazul_list_installments` | read | Parcelas de um evento financeiro |
| 34 | `contaazul_get_installment` | read | Detalhe de uma ou mais parcelas por id |
| 35 | `contaazul_update_installment` | write | Atualiza campos de uma parcela |
| 36 | `contaazul_settle_installment` | write | Registra a baixa (recebimento/pagamento) de uma parcela |
| 37 | `contaazul_list_settlements` | read | Lista as baixas de uma parcela |
| 38 | `contaazul_get_settlement` | read | Detalhe de uma baixa por id |
| 39 | `contaazul_update_settlement` | write | Atualiza uma baixa |
| 40 | `contaazul_delete_settlement` | admin | Estorna uma baixa (destrutivo) |
| 41 | `contaazul_generate_charge` | write | Gera boleto, Pix ou link de pagamento para parcelas |
| 42 | `contaazul_get_charge` | read | Detalhe de uma cobrança emitida |
| 43 | `contaazul_cancel_charge` | admin | Cancela uma cobrança emitida |
| 44 | `contaazul_list_financial_accounts` | read | Lista contas financeiras (banco, caixa, cartão) |
| 45 | `contaazul_get_account_balance` | read | Saldo atual de uma conta financeira |
| 46 | `contaazul_get_initial_balance` | read | Saldos iniciais das contas por período |
| 47 | `contaazul_list_transfers` | read | Transferências entre contas por período |
| 48 | `contaazul_list_categories` | read | Lista categorias financeiras (DRE) |
| 49 | `contaazul_list_cost_centers` | read | Lista centros de custo |
| 50 | `contaazul_list_invoices_nfe` | read | Lista NF-e emitidas |
| 51 | `contaazul_get_invoice_nfe` | read | Detalhe de uma ou mais NF-e por id |
| 52 | `contaazul_list_invoices_nfse` | read | Lista NFS-e por competência |

> 💡 Quando o install tem **mais de uma empresa** conectada, toda tool aceita um parâmetro opcional `account` (company_id, label ou parcial — veja `contaazul_list_accounts`). Com uma única empresa, pode omitir.

## Empresa & contas

### 1. `contaazul_list_accounts`
**Op**: read
Lista as empresas Conta Azul vinculadas a este install (company_id, label).

### 2. `contaazul_get_company`
**Op**: read
Dados da empresa Conta Azul ativa (CNPJ, razão social, regime tributário).

## Pessoas (clientes / fornecedores / vendedores / transportadores)

### 3. `contaazul_list_people`
**Op**: read
Lista pessoas (clientes, fornecedores, vendedores, transportadores) cadastradas. Filtros via params: tamanho_pagina, pagina, busca (nome/documento), tipo_perfil, ativo.

### 4. `contaazul_get_person`
**Op**: read
Detalhe de uma pessoa por id. Bulk support: accepts ids for batched execution.

### 5. `contaazul_person_write_create`
**Op**: write
Cria ou atualiza uma pessoa. action=create: requer nome, tipo_pessoa e (cpf|cnpj) — passe os campos via `data` (JSON). action=update: requer id e APENAS os campos a alterar em `data` (JSON) — é update PARCIAL: o resto do cadastro fica intacto e campo que o registro não tem NÃO é exigido (dá pra trocar só o email). Enums de escrita: tipo_pessoa = Física|Jurídica|Estrangeira; perfis = [{"tipo_perfil":"Cliente"|"Fornecedor"|"Transportadora"}] (variações de caixa/acento são normalizadas). Único campo fora do update parcial é `outros_contatos`: mudá-lo obriga a substituição integral do cadastro, e aí o Conta Azul exige codigo, data_nascimento, observacao, telefone_celular e telefone_comercial preenchidos — o erro retornado diz qual falta; inclua-o no `data`. [Flattened action: create] Bulk support: accepts ids for batched execution.

### 6. `contaazul_person_write_update`
**Op**: write
Cria ou atualiza uma pessoa. action=create: requer nome, tipo_pessoa e (cpf|cnpj) — passe os campos via `data` (JSON). action=update: requer id e APENAS os campos a alterar em `data` (JSON) — é update PARCIAL: o resto do cadastro fica intacto e campo que o registro não tem NÃO é exigido (dá pra trocar só o email). Enums de escrita: tipo_pessoa = Física|Jurídica|Estrangeira; perfis = [{"tipo_perfil":"Cliente"|"Fornecedor"|"Transportadora"}] (variações de caixa/acento são normalizadas). Único campo fora do update parcial é `outros_contatos`: mudá-lo obriga a substituição integral do cadastro, e aí o Conta Azul exige codigo, data_nascimento, observacao, telefone_celular e telefone_comercial preenchidos — o erro retornado diz qual falta; inclua-o no `data`. [Flattened action: update] Bulk support: accepts ids for batched execution.

### 7. `contaazul_person_delete`
**Op**: admin
Remove uma pessoa por id. Operação destrutiva — confirme antes. Bulk support: accepts ids for batched execution.

## Produtos & serviços

### 8. `contaazul_list_products`
**Op**: read
Lista produtos cadastrados. Filtros: tamanho_pagina, pagina, busca, ativo.

### 9. `contaazul_product_write`
**Op**: write
Cria um produto (nome + valor_venda obrigatórios em `data` JSON). A API v2 do Conta Azul não expõe atualização nem GET de produto por id — para consultar, use contaazul_list_products (/produto/busca) com filtro.

### 10. `contaazul_list_services`
**Op**: read
Lista serviços cadastrados.

### 11. `contaazul_service_write`
**Op**: write
Cria um serviço. `data` é JSON com nome, valor, etc.

## Vendas & orçamentos

### 12. `contaazul_list_sales`
**Op**: read
Lista vendas (GET /venda/busca). Filtros: data_inicio/data_fim (emissão, AAAA-MM-DD), data_criacao_de/ate (AAAA-MM-DD), data_alteracao_de/ate (AAAA-MM-DDTHH:MM:SS), ids_clientes, ids_vendedores, ids_categorias, ids_produtos, numeros, situacoes (ex.: aprovado, em_andamento, faturado, cancelado, orcamento), termo_busca, ordenação por numero/cliente/data. Paginação: pagina + tamanho_pagina; a resposta traz total_itens, totais e quantidades por situação. Bulk support: accepts cliente_ids for batched execution.

### 13. `contaazul_list_sale_items`
**Op**: read
Itens (produtos/serviços, quantidade, valor) de uma ou mais vendas. Passe ids_venda (até 50); devolve um resultado por venda.

### 14. `contaazul_get_sale`
**Op**: read
Detalhe de uma venda por id. Bulk support: accepts ids for batched execution.

### 15. `contaazul_sale_write_create`
**Op**: write
Cria ou atualiza venda. action=create posta em /venda; action=update em /vendas/{id}. `data` é o payload completo da venda em JSON. [Flattened action: create] Bulk support: accepts ids for batched execution.

### 16. `contaazul_sale_write_update`
**Op**: write
Cria ou atualiza venda. action=create posta em /venda; action=update em /vendas/{id}. `data` é o payload completo da venda em JSON. [Flattened action: update] Bulk support: accepts ids for batched execution.

### 17. `contaazul_sale_cancel`
**Op**: admin
Cancela uma venda. Operação destrutiva — confirme antes. Bulk support: accepts ids for batched execution.

### 18. `contaazul_list_budgets`
**Op**: read
Lista orçamentos (cliente, número, total, situação, versão). Paginado.

### 19. `contaazul_get_budget`
**Op**: read
Detalhe de um orçamento por id (itens, cliente, composição de valor). Bulk support: accepts ids for batched execution.

### 20. `contaazul_create_budget`
**Op**: write
Cria um orçamento. `data` é o JSON com id_cliente (obrigatório, UUID de uma pessoa com perfil Cliente), data_orcamento (obrigatório, YYYY-MM-DD), itens[] (cada item exige id do produto/serviço + tipo/quantidade/valor), data_validade, id_vendedor e composicao_de_valor (frete, desconto).

### 21. `contaazul_delete_budgets`
**Op**: admin
Exclui orçamentos em lote por id. Operação destrutiva, confirme antes. `ids` é a lista de UUIDs de orçamento (a API v2 não tem exclusão por id única).

## Contratos

### 22. `contaazul_list_contracts`
**Op**: read
Lista contratos no intervalo de data de início (data_inicio/data_fim, YYYY-MM-DD — obrigatórios na API; se omitidos, usa janela ampla = listar todos). Filtros: pagina, tamanho_pagina (máx 50), cliente_id, busca_textual. Bulk support: accepts cliente_ids for batched execution.

### 23. `contaazul_get_contract`
**Op**: read
Detalhe de um contrato por id (cliente, termos, condição de pagamento, composição de valor). Bulk support: accepts ids for batched execution.

### 24. `contaazul_contract_next_number`
**Op**: read
Retorna o próximo número de contrato disponível.

### 25. `contaazul_contract_write`
**Op**: write
Cria um contrato. `data` é o payload em JSON.

### 26. `contaazul_terminate_contract`
**Op**: admin
Encerra um contrato por id. Operação sensível, confirme antes. Bulk support: accepts ids for batched execution.

### 27. `contaazul_delete_contract`
**Op**: admin
Remove um contrato por id. Operação destrutiva, confirme antes. Bulk support: accepts ids for batched execution.

## Financeiro: contas a receber e a pagar

### 28. `contaazul_list_receivables`
**Op**: read
Lista contas a receber (parcelas de receita). Filtros: tamanho_pagina, pagina, data_vencimento_de, data_vencimento_ate (YYYY-MM-DD; se omitidas, lista todas), status (PERDIDO, RECEBIDO, EM_ABERTO, RENEGOCIADO, RECEBIDO_PARCIAL, ATRASADO), ids_clientes (UUID do cliente).

### 29. `contaazul_receivable_create`
**Op**: write
Cria um evento financeiro de conta a receber. `data` é o JSON do EventoFinanceiroRequest. OBRIGATÓRIOS: data_competencia (YYYY-MM-DD), valor (number), observacao, descricao, contato (UUID do cliente — via contaazul_list_people), conta_financeira (UUID — via contaazul_list_financial_accounts), condicao_pagamento.parcelas[] (cada: descricao, data_vencimento YYYY-MM-DD, nota, conta_financeira UUID, detalhe_valor:{valor_bruto obrigatório; valor_liquido derivado se omitido} — os aliases de leitura valor_composicao (o que contaazul_get_installment devolve) e de baixa composicao_valor são normalizados automaticamente pro detalhe_valor, metodo_pagamento com o enum EXATO da API: PIX_PAGAMENTO_INSTANTANEO, BOLETO_BANCARIO, TRANSFERENCIA_BANCARIA, CARTAO_CREDITO, CARTAO_DEBITO, DINHEIRO, DEPOSITO_BANCARIO, DEBITO_AUTOMATICO etc — formas curtas comuns como PIX/BOLETO/TED são normalizadas). OPCIONAL: rateio[] (cada: id_categoria UUID via contaazul_list_categories, valor, rateio_centro_custo[]). Retorna 202 + {protocolId,status} (processamento assíncrono).

### 30. `contaazul_list_payables`
**Op**: read
Lista contas a pagar (parcelas de despesa). Filtros: tamanho_pagina, pagina, data_vencimento_de, data_vencimento_ate (YYYY-MM-DD; se omitidas, lista todas), status (PERDIDO, RECEBIDO, EM_ABERTO, RENEGOCIADO, RECEBIDO_PARCIAL, ATRASADO). O Conta Azul usa os MESMOS status de contas a receber (RECEBIDO aqui = pago) e o mesmo formato de item — parecido com list_receivables, mas são despesas.

### 31. `contaazul_payable_create`
**Op**: write
Cria um evento financeiro de conta a pagar. `data` é o JSON do EventoFinanceiroRequest (mesma estrutura do contaazul_receivable_create: data_competencia, valor, observacao, descricao, contato (UUID do fornecedor), conta_financeira (UUID), condicao_pagamento.parcelas[] (cada parcela leva detalhe_valor:{valor_bruto obrigatório; valor_liquido derivado se omitido} — os aliases valor_composicao e composicao_valor são normalizados automaticamente), rateio[] opcional. metodo_pagamento da parcela usa o enum EXATO da API (PIX_PAGAMENTO_INSTANTANEO, BOLETO_BANCARIO, TRANSFERENCIA_BANCARIA, CARTAO_CREDITO, CARTAO_DEBITO, DINHEIRO etc — formas curtas como PIX/BOLETO/TED são normalizadas). Retorna 202 + {protocolId,status} (assíncrono).

### 32. `contaazul_list_changed_events`
**Op**: read
Lista os IDs de eventos financeiros alterados num período (para sync incremental / conciliação). data_inicio e data_fim (YYYY-MM-DD ou ISO date-time). Paginado. Retorna só os IDs; use contaazul_get_installment para o detalhe.

## Financeiro: parcelas e baixas

### 33. `contaazul_list_installments`
**Op**: read
Lista as parcelas de UM evento financeiro (passe `id_evento`). A API v2 não tem listagem chapada de todas as parcelas — pra varrer contas a receber/pagar use contaazul_list_receivables / contaazul_list_payables.

### 34. `contaazul_get_installment`
**Op**: read
Detalhe de uma parcela por id. Bulk support: accepts ids for batched execution.

### 35. `contaazul_update_installment`
**Op**: write
Atualiza campos de uma parcela (PATCH). Campos editáveis em `data` JSON: nota, descricao, vencimento (YYYY-MM-DD), composicao_valor:{valor_bruto,multa,juros,desconto,taxa,valor_liquido}, data_pagamento_esperado, metodo_pagamento, perda, nsu, pagamento_agendado, id_conta_financeira. O campo `versao` (controle de concorrência) é buscado automaticamente — não precisa passar. NÃO é editável aqui: `rateio`/`rateio_centro_custo` (categoria e centro de custo só entram na CRIAÇÃO do lançamento, via rateio[] do contaazul_payable_create / contaazul_receivable_create; o Conta Azul não deixa alterar depois). Campo fora da lista é RECUSADO com erro em vez de ser enviado, porque a API responde 200 e incrementa a versão descartando o campo em silêncio. Para registrar pagamento/baixa use contaazul_settle_installment e para estornar use contaazul_delete_settlement. Bulk support: accepts ids for batched execution.

### 36. `contaazul_settle_installment`
**Op**: write
Registra a baixa (recebimento/pagamento) de uma parcela. `id` é o UUID da PARCELA (via contaazul_list_receivables / _list_payables / _get_installment). `data` é o JSON da baixa: data_pagamento (YYYY-MM-DD), composicao_valor {valor_bruto, multa, juros, desconto, taxa, valor_liquido}, conta_financeira (UUID em string, via contaazul_list_financial_accounts) e metodo_pagamento, enum EXATO da API: DINHEIRO, PIX_PAGAMENTO_INSTANTANEO, BOLETO_BANCARIO, TRANSFERENCIA_BANCARIA, CARTAO_CREDITO, CARTAO_DEBITO, CARTAO_CREDITO_VIA_LINK, CHEQUE, DEPOSITO_BANCARIO, CARTEIRA_DIGITAL, CASHBACK, CREDITO_LOJA, CREDITO_VIRTUAL, OUTRO (formas curtas como PIX, BOLETO, CARTAO ou TRANSFERENCIA dão 400); observacao é opcional. O campo `versao` (controle de concorrência) é buscado automaticamente. Retorna a baixa com id_reconciliacao. Bulk support: accepts ids for batched execution.

### 37. `contaazul_list_settlements`
**Op**: read
Lista as baixas de uma parcela. `id` é o UUID da parcela. Bulk support: accepts ids for batched execution.

### 38. `contaazul_get_settlement`
**Op**: read
Detalhe de uma baixa por id. `id` é o UUID da baixa. Bulk support: accepts ids for batched execution.

### 39. `contaazul_update_settlement`
**Op**: write
Atualiza uma baixa (PATCH). `id` é o UUID da baixa. `data` é o JSON com os campos a alterar (data_pagamento, composicao_valor, conta_financeira em UUID string, metodo_pagamento com o mesmo enum de contaazul_settle_installment, observacao). O campo `versao` é buscado automaticamente. Bulk support: accepts ids for batched execution.

### 40. `contaazul_delete_settlement`
**Op**: admin
Estorna (remove) uma baixa por id. Operação destrutiva, confirme antes. `id` é o UUID da baixa. Bulk support: accepts ids for batched execution.

## Cobranças

### 41. `contaazul_generate_charge`
**Op**: write
Gera cobrança (boleto, pix ou link de pagamento) para uma ou mais PARCELAS de contas a receber. Aceita até 50 parcelas por chamada; cada uma é emitida separadamente e uma falha não aborta o lote. `tipo` (obrigatório) aceita EXATAMENTE: BOLETO, PIX_COBRANCA ou LINK_PAGAMENTO (cartão de crédito sai por LINK_PAGAMENTO); formas comuns como boleto/pix/cartão são normalizadas. `ids_parcelas` são UUIDs de PARCELA — pegue em contaazul_list_receivables (campo `id` de cada item) ou contaazul_get_installment, NÃO o id do evento financeiro. `conta_bancaria`, `descricao_fatura` e `data_vencimento` são exigidos pela API mas resolvidos automaticamente quando omitidos: a conta de cobranças ativa da empresa (passe `conta_bancaria` se houver mais de uma, via contaazul_list_financial_accounts com tipos=COBRANCAS_CONTA_AZUL) e a descrição/vencimento da própria parcela. Parcela que já tem cobrança ativa é PULADA (sai em `ignoradas`) — use forcar=true para emitir mesmo assim. `maximo_parcelas` só vale para LINK_PAGAMENTO. Retorna {solicitadas, emitidas:[{id_parcela,id,url,status}], ignoradas, erros} — `url` é o link da cobrança. Para consultar depois use contaazul_get_charge e para cancelar contaazul_cancel_charge. A API NÃO envia o e-mail de notificação da cobrança: isso só na tela do Conta Azul.

### 42. `contaazul_get_charge`
**Op**: read
Detalhe de uma cobrança emitida por id (o `id` devolvido em contaazul_generate_charge). Retorna {id, url, status} — status vai de AGUARDANDO_CONFIRMACAO/REGISTRADO até PAGO, CANCELADO, EXPIRADO ou FALHA_EMISSAO. Bulk support: accepts ids for batched execution.

### 43. `contaazul_cancel_charge`
**Op**: admin
CANCELA uma cobrança já emitida (boleto/pix/link deixa de ser pagável). Use quando a cobrança foi gerada errada e ainda não foi paga. Passe o `id` da cobrança (de contaazul_generate_charge ou contaazul_get_charge), NÃO o id da parcela. Bulk support: accepts ids for batched execution.

## Contas financeiras, categorias e centros de custo

### 44. `contaazul_list_financial_accounts`
**Op**: read
Lista contas financeiras (banco, caixa, cartão). Filtre por `tipos`: APLICACAO, CAIXINHA, CONTA_CORRENTE, CARTAO_CREDITO, INVESTIMENTO, OUTROS, MEIOS_RECEBIMENTO, POUPANCA, COBRANCAS_CONTA_AZUL, RECEBA_FACIL_CARTAO. Para achar a conta que recebe cobranças (contaazul_generate_charge) use tipos=["COBRANCAS_CONTA_AZUL"].

### 45. `contaazul_get_account_balance`
**Op**: read
Saldo atual de uma conta financeira por id (banco/caixa/cartão). Pegue o id em contaazul_list_financial_accounts. Bulk support: accepts ids for batched execution.

### 46. `contaazul_get_initial_balance`
**Op**: read
Saldos iniciais das contas financeiras por período. data_inicio e data_fim (YYYY-MM-DD ou ISO date-time; datas simples são normalizadas). Se omitidas, usa uma janela ampla.

### 47. `contaazul_list_transfers`
**Op**: read
Lista transferências entre contas financeiras por período (conciliação). data_inicio e data_fim (YYYY-MM-DD) com janela máxima de 1 ano (se omitidas, usa os últimos 365 dias). Paginado.

### 48. `contaazul_list_categories`
**Op**: read
Lista categorias financeiras (DRE).

### 49. `contaazul_list_cost_centers`
**Op**: read
Lista centros de custo.

## Notas fiscais

### 50. `contaazul_list_invoices_nfe`
**Op**: read
Lista notas fiscais emitidas (NF-e). Filtros: tamanho_pagina, pagina, data_emissao_inicio, data_emissao_fim, status.

### 51. `contaazul_get_invoice_nfe`
**Op**: read
Detalhe de uma NF-e por id. Bulk support: accepts ids for batched execution.

### 52. `contaazul_list_invoices_nfse`
**Op**: read
Lista NFS-e (notas fiscais de serviço) por filtro. Exige data_competencia_de e data_competencia_ate (YYYY-MM-DD), com janela máxima de 15 dias (se omitidas, usa os últimos 15 dias). Outros filtros: id_cliente, numero_venda, status (PENDENTE, PRONTA_ENVIO, EMITIDA, CANCELADA…), tipo_negociacao (VENDA, CONTRATO), numero_nfse_inicial, numero_nfse_final, numero_rps_inicial, numero_rps_final.

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
- **Confirme escritas**: especialmente `*_cancel`, `*_delete` e `delete_settlement` — são reversíveis só com retrabalho manual (ou nem isso).
