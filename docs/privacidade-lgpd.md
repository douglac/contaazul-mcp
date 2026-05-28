# Privacidade & LGPD

Conta Azul MCP é um conector que acessa o ERP **Conta Azul** (API v2) via **OAuth 2.0**, em nome da(s) empresa(s) que você autorizar. Esta página detalha como tratamos seus dados, baseada na LGPD (Lei Geral de Proteção de Dados Pessoais, Lei nº 13.709/2018).

## Princípios

1. **Consentimento explícito**: você autoriza expressamente cada empresa via OAuth da Conta Azul, e pode revogar a qualquer momento.
2. **Escopo mínimo**: só acessamos os dados da(s) empresa(s) Conta Azul que você autorizar, e apenas os módulos cobertos pelas 35 ferramentas.
3. **Lê e escreve — sob seu comando**: além de consultar, a IA pode criar/alterar/cancelar dados na Conta Azul. Essas escritas só acontecem quando **você pede** ao agente. Recomendamos revisar antes de confirmar.
4. **Você no controle**: pode desconectar empresas, gerar/revogar tokens, excluir sua conta a qualquer momento.

## Dados acessados

Ao autorizar uma empresa Conta Azul, o MCP pode ler e (quando você pede) escrever, via API v2 da Conta Azul:

- **Empresa**: CNPJ, razão social, regime tributário
- **Pessoas**: clientes, fornecedores, vendedores e transportadores (nome, CPF/CNPJ, e-mails, perfis)
- **Produtos & serviços**: catálogo (nome, valor de venda)
- **Vendas & contratos**: vendas, itens, contratos, valores, status
- **Financeiro**: contas a pagar/receber, parcelas, quitações, contas financeiras, categorias (DRE), centros de custo
- **NF-e**: notas fiscais eletrônicas emitidas

**NÃO acessamos**: sua senha da Conta Azul (o login é no site oficial deles via OAuth), nem dados fora do escopo das ferramentas listadas em [ferramentas.md](ferramentas.md).

## Como autoriza

1. Você cria conta em `app.mcp.ai/contaazul` (e-mail + magic-link, sem senha)
2. Clica em **Autorizar com Conta Azul**
3. É redirecionado pro login oficial da **Conta Azul** (OAuth 2.0)
4. Faz login e concede a autorização **explícita e revogável**:

> "Autorizo o acesso da MCP.AI aos dados e operações da minha empresa na Conta Azul (pessoas, produtos, serviços, vendas, contratos, financeiro e NF-e), inclusive operações de escrita (criação/alteração/cancelamento), e entendo que os dados acessados serão enviados ao assistente de IA que eu escolher (Claude, ChatGPT, Cursor, etc.), cuja política de privacidade é de minha responsabilidade conhecer."
>
> *(O texto exato e os escopos OAuth são exibidos na tela de autorização da Conta Azul antes do consentimento.)*

5. Você volta pra MCP.AI com a empresa conectada

## Como revoga

- **Uma empresa**: `app.mcp.ai/contaazul → seleciona a empresa → Desconectar`. Revoga a autorização OAuth da Conta Azul.
- **Todas**: `app.mcp.ai/contaazul → Settings → Desconectar todas`.
- **Diretamente na Conta Azul**: você também pode revogar a autorização do app dentro das configurações da sua conta Conta Azul.
- **A conta inteira (MCP.AI)**: `Settings → Excluir conta`. Vide "Retenção" abaixo.

## Sub-processadores

Pra entregar o serviço, dados passam por:

| Sub-processador | País | Papel |
|---|---|---|
| **Conta Azul** | BR | Provedor do ERP — fonte e destino dos dados (você é cliente deles) |
| **LLM host escolhido por você** (Claude, ChatGPT, Cursor, agente próprio) | varia | Consumidor dos dados retornados pelas tools |

> **Atenção**: o LLM host (Anthropic/OpenAI/Cursor/seu próprio) é um sub-processador **fora do nosso controle**. Os dados retornados pelas tools são enviados pra ele a cada chamada. A política de privacidade do provedor de IA que você escolher se aplica — recomendamos contratar planos com **opt-out de treinamento** ativado.

## Retenção

- **Dados da empresa (cadastros, vendas, financeiro)**: acessados em tempo real via API da Conta Azul, com cache curto pelo período da autorização ativa. Não mantemos um histórico paralelo além disso.
- **Tokens OAuth**: armazenados de forma criptografada enquanto a empresa estiver conectada. Apagados ao desconectar.
- **Após desconectar uma empresa**: os dados e tokens daquela conexão são apagados em **30 dias** (janela técnica de revogação).
- **Após excluir a conta**: dados pessoais (e-mail, tokens, conexões) apagados em **30 dias** salvo obrigação legal. Logs anônimos podem ser retidos por mais tempo pra fins de segurança e auditoria.

## Categorias de dados (taxonomia)

- `business.company` — dados cadastrais da empresa (CNPJ, razão social, regime)
- `business.people` — clientes, fornecedores, vendedores, transportadores
- `business.catalog` — produtos e serviços
- `business.sales` — vendas e contratos
- `financial.accounts_payable_receivable` — contas a pagar/receber, parcelas, quitações
- `financial.structure` — contas financeiras, categorias (DRE), centros de custo
- `fiscal.nfe` — notas fiscais eletrônicas emitidas

## Seus direitos (LGPD)

Como titular / responsável pelos dados, você tem direito a:

- **Confirmar** que tratamos seus dados
- **Acessar** seus dados (exportável em JSON via `app.mcp.ai/contaazul → Settings → Exportar dados`)
- **Corrigir** dados incorretos (a fonte é a Conta Azul; correções de cadastro são feitas lá, inclusive via as tools de escrita)
- **Anonimizar, bloquear ou eliminar** dados desnecessários (excluir conta / desconectar empresa)
- **Portar** dados a outro fornecedor
- **Saber com quem compartilhamos** (lista de sub-processadores acima)
- **Revogar consentimento** a qualquer momento (Desconectar empresa / revogar OAuth na Conta Azul)
- **Opor-se** a tratamento

Para exercer qualquer direito: [contaazul@mcp.ai](mailto:contaazul@mcp.ai). Respondemos em até 15 dias úteis (LGPD Art. 19).

## Encarregado de Proteção de Dados (DPO)

Atualmente o ponto de contato é [contaazul@mcp.ai](mailto:contaazul@mcp.ai). DPO formal será nomeado quando a base de usuários ativos justificar (em consonância com Art. 41 da LGPD e regulamentação ANPD).

## Base legal

- **Consentimento** (Art. 7º, I) — você autoriza expressamente cada empresa via OAuth da Conta Azul
- **Execução de contrato** (Art. 7º, V) — pra entregar o serviço que você contratou
- **Legítimo interesse** (Art. 7º, IX) — segurança, prevenção a fraude e auditoria de acesso

## Termos da Conta Azul

O Conta Azul MCP usa a API v2 da Conta Azul via OAuth 2.0. O acesso e o tratamento de dados dentro da Conta Azul são regidos também pelos Termos de Uso e pela Política de Privacidade da própria Conta Azul, exibidos na tela de autorização da Conta Azul antes do consentimento. Recomendamos lê-los.

## Transferência internacional

Os dados da MCP.AI são armazenados no Brasil. Mas quando você usa o MCP com um LLM host hospedado no exterior (ex.: Anthropic nos EUA), os dados retornados pelas tools são transmitidos pra esse host fora do Brasil. Esse fluxo é responsabilidade sua e governado pela política do provedor de IA que você escolheu.

## Mudanças nesta política

Quando atualizamos, registramos no `CHANGELOG.md` do repositório e notificamos por e-mail os usuários ativos. Mudanças materiais ficam com janela de 30 dias antes de entrarem em vigor.

## Reclamações

Se você acha que tratamos seus dados de forma inadequada:

1. Tente resolver direto: [contaazul@mcp.ai](mailto:contaazul@mcp.ai)
2. Reclame na ANPD: [www.gov.br/anpd](https://www.gov.br/anpd/pt-br)

**Última atualização**: 2026-05-28.
