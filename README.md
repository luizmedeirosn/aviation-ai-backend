# 🚀 Contexto do Projeto

 Aviation AI é uma solução B2B que transforma os transcripts das conversas na cabine em insights de segurança, identificando padrões críticos de comunicação e ajudando as companhias aéreas a aprimorar procedimentos, reduzir riscos e elevar a segurança operacional.

## 🛠️ Tecnologias Utilizadas

| Área                              | Tecnologia                        | Justificativa                                                                                                         |
|:----------------------------------|:----------------------------------|:----------------------------------------------------------------------------------------------------------------------|
| **Linguagem**                     | TypeScript                        | Tipagem estrita, programação assíncrona e disponibilidade de recursos.                                                |
| **Backend**                       | Node.js + Express                 | Runtime javascript, escalabilidade e exposição de serviços.                                                           |
| **Banco de Dados**                | MongoDB + Mongoose                | Esclabilidade, robustez e performance para modelos de dados (NoSQL) complexos e de alta disponibilidade.              |
| **API Principal**                 | GraphQL (Apollo Server Express)   | Disponibililidade de recursos para trafegar dados e utilizar serviços de forma eficiente utilizando GraphQL.          |
| **Armazenamento de arquivos**     | AWS S3                            | Armazenamento durável de arquivos grandes (transcrições PDF), segurança com *presign url* e baixo custo.              |
| **Análise com IA**                | OpenAI API (GPT-4o Mini)          | Estruturar as análises com *Function Calling* e *JSON Schema* para analisar as transcrições e modelar as saídas.      |
| **Formatação de código**          | ESLint + Prettier                 | Padrões de qualidade de código legíveis e consistentes, bem como a auto-formatação.                                   |

## 🧩 Estrutura do Projeto

O projeto segue a arquitetura **Modular/Layered** para separação de responsabilidades de cada serviço tornando o código escalável, legível e de fácil manutenção.

## ⚙️ Configuração do Ambiente

### Setup inicial

1.  **Node.js:** Versão 20+ (Conferir o arquivo `.nvmrc`).
2.  **NVM:** Não obrigatório, mas recomendado.
3.  **Docker & Docker Compose:** Necessário para executar o banco de dados MongoDB localmente.
4.  **Credenciais da OpenAI:** Chave de API para o serviço de análise de IA.
4.  **Credenciais do S3:** Chaves para a integração do serviço de armazenamento e download de arquivos fornecidos pela AWS.

## ⚡ Executando o projeto localmente

### Passo 1: Instalação de Dependências

```bash
npm install
```

### Passo 2: Configuração do Arquivo .env

Adicione as configurações necessárias no arquivo .env na raiz do projeto:

```bash
# Configuração do Ambiente Local
PORT=4000
MONGODB_URI=mongodb://localhost:27017/aviation-ai-db

# Credenciais da OpenAI
OPENAI_API_KEY=

# Credenciais do S3
AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_BUCKET_NAME=
```

### Passo 3: Iniciar o Banco de Dados

```bash
npm run docker:mongo-up
```

### Passo 4: Iniciar o Servidor (localhost)


```bash
npm run dev
```

### Passo 5: Analisar os transcripts

#### 1. Criação de Organizações (Seeding de Dados)

**Ação:** Executar a mutação `CreateOrganization` substituindo a variável `$input` por `SparringAirlanesInput`, `AeroLinkInput` e `FlySafeInput`.

**Endpoint:** `POST http://localhost:4000/graphql`

**Query GraphQL:**
```graphql
mutation CreateOrganization($input: CreateOrganizationInput!) {
  createOrganization(input: $input) {
    id
    name
    pilotCount
    avgFlightHours
    fleetSize
    aiPrompt
    securityPatterns {
      title
      checklists {
          name
        }
      }
  }
}
```

```json
{
  "SparringAirlanesInput": {
    "name": "Sparring Airlines",
    "pilotCount": 4,
    "avgFlightHours": 1250.0,
    "fleetSize": 3,
    "aiPrompt": "Monitoramento de comunicação em cabine, foco em emergências e checklists críticos, acompanhamento de falhas reportadas.",
    "securityPatterns": [
      {
        "title": "Gestão de Erros e Interrupções",
        "checklists": [
          { "name": "Confirmação De Instruções Criticas" },
          { "name": "Uso De Linguagem Objetiva E Sem Ambiguidade" },
          { "name": "Execução Correta De Procedimentos De Contingencia" }
        ]
      },
      {
        "title": "Procedimentos Padronizados",
        "checklists": [
          { "name": "Seguimento Completo De Checklists De Voo" },
          { "name": "Cumprimento De Protocolos De Segurança Operacional" }
        ]
      },
      {
        "title": "Comunicação Clara e Confirmada",
        "checklists": [
          { "name": "Confirmação De Entendimento Entre Piloto E Copiloto" },
          { "name": "Uso De Termos Claros E Precisos" }
        ]
      }
    ]
  },
  "AeroLinkInput": {
    "name": "AeroLink",
    "pilotCount": 6,
    "avgFlightHours": 980.0,
    "fleetSize": 5,
    "aiPrompt": "Foco em coordenação de equipe e respostas rápidas a alertas de sistema, treinamento contínuo em gestão de emergências. Priorizar checklists de detecção de anomalias.",
    "securityPatterns": [
      {
        "title": "Gestão de Erros e Interrupções",
        "checklists": [
          { "name": "Confirmação de instruções críticas" },
          { "name": "Uso de linguagem objetiva e sem ambiguidades" }
        ]
      },
      {
        "title": "Procedimentos Padronizados",
        "checklists": [
          { "name": "Cumprimento de protocolos de segurança operacional" },
          { "name": "Adesão a práticas recomendadas e regulamentações" }
        ]
      },
      {
        "title": "Detecção de Alertas e Anomalias",
        "checklists": [
          { "name": "Identificação rápida de falhas técnicas" },
          { "name": "Comunicação imediata de alertas à equipe" }
        ]
      },
      {
        "title": "Coordenação e Trabalho em Equipe",
        "checklists": [
          { "name": "Distribuição clara de tarefas durante operações" },
          { "name": "Cooperação na tomada de decisões críticas" }
        ]
      }
    ]
  },
  "FlySafeInput": {
    "name": "FlySafe Aviation",
    "pilotCount": 50,
    "avgFlightHours": 1100.0,
    "fleetSize": 80,
    "aiPrompt": "Monitoramento extensivo de emergência, execução de checklists e respostas a falhas múltiplas; foco em segurança operacional, treinamento contínuo e auditorias internas.",
    "securityPatterns": [
      {
        "title": "Comunicação Clara e Confirmada",
        "checklists": [
          { "name": "Confirmação de instruções críticas" },
          { "name": "Uso de linguagem objetiva e sem ambiguidades" }
        ]
      },
      {
        "title": "Detecção de Alertas e Anomalias",
        "checklists": [
          { "name": "Observação de condições externas (clima, tráfego)" },
          { "name": "Comunicação imediata de alertas à equipe" }
        ]
      },
      {
        "title": "Coordenação e Trabalho em Equipe",
        "checklists": [
          { "name": "Sincronização nas ações de emergência" },
          { "name": "Cooperação na tomada de decisões críticas" }
        ]
      },
      {
        "title": "Procedimentos Padronizados",
        "checklists": [
          { "name": "Seguimento completo de checklists de voo" },
          { "name": "Adesão a práticas recomendadas" }
        ]
      },
      {
        "title": "Gestão de Erros e Interrupções",
        "checklists": [
          { "name": "Reconhecimento e correção de erros em tempo hábil" },
          { "name": "Continuidade das operações apesar de interrupções" }
        ]
      }
    ]
  }
}
```

#### 2. Cadastrar Pilotos (Inserção em Massa)

**Ação:** : Usar a mutação createPilots com o array de inputs.

**Endpoint:** : POST http://localhost:4000/graphql

**Query GraphQL:**
```graphql
mutation InsertPilots($input: [CreatePilotInput!]!) {
  createPilots(input: $input) {
    id
    name
    flightHours
    role
  }
}
```

```json
{
  "input": [
    /* Sparring Airlines */
    { "organizationId": "ORGANIZATION_ID", "name": "João Silva", "role": "COMMANDER", "flightHours": 1500.0 },
    { "organizationId": "ORGANIZATION_ID", "name": "Ana Pereira", "role": "COPILOT", "flightHours": 1200.0 },
    { "organizationId": "ORGANIZATION_ID", "name": "Carlos Souza", "role": "COMMANDER", "flightHours": 1300.0 },
    { "organizationId": "ORGANIZATION_ID", "name": "Mariana Lima", "role": "COPILOT", "flightHours": 1000.0 },
    
    /* AeroLink */
    { "organizationId": "ORGANIZATION_ID", "name": "Lucas Martins", "role": "COMMANDER", "flightHours": 1050.0 },
    { "organizationId": "ORGANIZATION_ID", "name": "Beatriz Costa", "role": "COPILOT", "flightHours": 900.0 },
    { "organizationId": "ORGANIZATION_ID", "name": "Rafael Almeida", "role": "COMMANDER", "flightHours": 1100.0 },
    { "organizationId": "ORGANIZATION_ID", "name": "Fernanda Rocha", "role": "COPILOT", "flightHours": 950.0 },
    { "organizationId": "ORGANIZATION_ID", "name": "Gabriel Nunes", "role": "COMMANDER", "flightHours": 1000.0 },
    { "organizationId": "ORGANIZATION_ID", "name": "Patrícia Dias", "role": "COPILOT", "flightHours": 940.0 },
    
    /* FlySafe Aviation */
    { "organizationId": "ORGANIZATION_ID", "name": "Eduardo Lima", "role": "COMMANDER", "flightHours": 1200.0 },
    { "organizationId": "ORGANIZATION_ID", "name": "Sofia Castro", "role": "COPILOT", "flightHours": 1100.0 },
    { "organizationId": "ORGANIZATION_ID", "name": "Bruno Carvalho", "role": "COMMANDER", "flightHours": 1300.0 },
    { "organizationId": "ORGANIZATION_ID", "name": "Camila Santos", "role": "COPILOT", "flightHours": 1150.0 },
    { "organizationId": "ORGANIZATION_ID", "name": "Thiago Rocha", "role": "COMMANDER", "flightHours": 1180.0 },
    { "organizationId": "ORGANIZATION_ID", "name": "Renata Alves", "role": "COPILOT", "flightHours": 1120.0 },
    { "organizationId": "ORGANIZATION_ID", "name": "Daniel Ferreira", "role": "COMMANDER", "flightHours": 1250.0 },
    { "organizationId": "ORGANIZATION_ID", "name": "Larissa Moreira", "role": "COPILOT", "flightHours": 1100.0 },
    { "organizationId": "ORGANIZATION_ID", "name": "Felipe Almeida", "role": "COMMANDER", "flightHours": 1200.0 },
    { "organizationId": "ORGANIZATION_ID", "name": "Juliana Costa", "role": "COPILOT", "flightHours": 1050.0 },
    { "organizationId": "ORGANIZATION_ID", "name": "Rodrigo Lima", "role": "COMMANDER", "flightHours": 1220.0 },
    { "organizationId": "ORGANIZATION_ID", "name": "Mariana Santos", "role": "COPILOT", "flightHours": 1130.0 },
    { "organizationId": "ORGANIZATION_ID", "name": "Ricardo Oliveira", "role": "COMMANDER", "flightHours": 1210.0 },
    { "organizationId": "ORGANIZATION_ID", "name": "Camila Ferreira", "role": "COPILOT", "flightHours": 1140.0 },
    { "organizationId": "ORGANIZATION_ID", "name": "Bruno Souza", "role": "COMMANDER", "flightHours": 1300.0 },
    { "organizationId": "ORGANIZATION_ID", "name": "Vanessa Rocha", "role": "COPILOT", "flightHours": 1100.0 },
    { "organizationId": "ORGANIZATION_ID", "name": "Alexandre Dias", "role": "COMMANDER", "flightHours": 1250.0 },
    { "organizationId": "ORGANIZATION_ID", "name": "Tatiana Lima", "role": "COPILOT", "flightHours": 1120.0 },
    { "organizationId": "ORGANIZATION_ID", "name": "Henrique Martins", "role": "COMMANDER", "flightHours": 1180.0 },
    { "organizationId": "ORGANIZATION_ID", "name": "Juliana Rocha", "role": "COPILOT", "flightHours": 1150.0 },
    { "organizationId": "ORGANIZATION_ID", "name": "Eduardo Oliveira", "role": "COMMANDER", "flightHours": 1200.0 },
    { "organizationId": "ORGANIZATION_ID", "name": "Larissa Dias", "role": "COPILOT", "flightHours": 1100.0 },
    { "organizationId": "ORGANIZATION_ID", "name": "Gustavo Castro", "role": "COMMANDER", "flightHours": 1220.0 },
    { "organizationId": "ORGANIZATION_ID", "name": "Renata Lima", "role": "COPILOT", "flightHours": 1130.0 },
    { "organizationId": "ORGANIZATION_ID", "name": "Felipe Carvalho", "role": "COMMANDER", "flightHours": 1250.0 },
    { "organizationId": "ORGANIZATION_ID", "name": "Camila Martins", "role": "COPILOT", "flightHours": 1140.0 },
    { "organizationId": "ORGANIZATION_ID", "name": "Bruno Almeida", "role": "COMMANDER", "flightHours": 1300.0 },
    { "organizationId": "ORGANIZATION_ID", "name": "Juliana Santos", "role": "COPILOT", "flightHours": 1120.0 },
    { "organizationId": "ORGANIZATION_ID", "name": "Rodrigo Ferreira", "role": "COMMANDER", "flightHours": 1200.0 },
    { "organizationId": "ORGANIZATION_ID", "name": "Vanessa Lima", "role": "COPILOT", "flightHours": 1100.0 },
    { "organizationId": "ORGANIZATION_ID", "name": "Alexandre Oliveira", "role": "COMMANDER", "flightHours": 1210.0 },
    { "organizationId": "ORGANIZATION_ID", "name": "Tatiana Castro", "role": "COPILOT", "flightHours": 1130.0 },
    { "organizationId": "ORGANIZATION_ID", "name": "Henrique Souza", "role": "COMMANDER", "flightHours": 1250.0 },
    { "organizationId": "ORGANIZATION_ID", "name": "Mariana Dias", "role": "COPILOT", "flightHours": 1140.0 },
    { "organizationId": "ORGANIZATION_ID", "name": "Eduardo Martins", "role": "COMMANDER", "flightHours": 1200.0 },
    { "organizationId": "ORGANIZATION_ID", "name": "Larissa Rocha", "role": "COPILOT", "flightHours": 1120.0 },
    { "organizationId": "ORGANIZATION_ID", "name": "Gustavo Lima", "role": "COMMANDER", "flightHours": 1220.0 },
    { "organizationId": "ORGANIZATION_ID", "name": "Renata Santos", "role": "COPILOT", "flightHours": 1130.0 },
    { "organizationId": "ORGANIZATION_ID", "name": "Felipe Dias", "role": "COMMANDER", "flightHours": 1250.0 },
    { "organizationId": "ORGANIZATION_ID", "name": "Camila Oliveira", "role": "COPILOT", "flightHours": 1140.0 },
    { "organizationId": "ORGANIZATION_ID", "name": "Bruno Martins", "role": "COMMANDER", "flightHours": 1300.0 },
    { "organizationId": "ORGANIZATION_ID", "name": "Juliana Lima", "role": "COPILOT", "flightHours": 1120.0 },
    { "organizationId": "ORGANIZATION_ID", "name": "Rodrigo Santos", "role": "COMMANDER", "flightHours": 1200.0 },
    { "organizationId": "ORGANIZATION_ID", "name": "Vanessa Dias", "role": "COPILOT", "flightHours": 1100.0 }
  ]
}
```

#### 3. Fazer Upload do Transcript (REST)

**Ação:** : Executar o comando curl no postman ou em qual ferramenta preferir.

```bash
curl --location 'http://localhost:4000/api/v1/analysis/upload-transcript' \
--form 'transcript=@"/<PATH>/transcript_(1).pdf"'
```

#### 4. Listar Análises por Organização

**Ação:** : Consultar o status das análises via GraphQL.

**Endpoint:** : POST http://localhost:4000/graphql

**Query GraphQL:**
```GRAPHQL
query GetAnalysesByOrganization($id: ID!) {
  analyses(organizationId: $id) {
    id
    status
    pilot {
      name
    }
    createdAt
    }  
}
```

```json
{
  "id": "AERO_LINK_ID_FOR_EXAMPLE"
}
```

#### 5. Acessar os Dados de uma Análise Específica

**Ação:** : Usar o ID de uma análise para obter o *feedback* gerado.

**Endpoint:** : POST http://localhost:4000/graphql

**Query GraphQL:**
```GRAPHQL
query GetAnalysis($id: ID!) {
  analysis(id: $id) {
    id
    downloadUrl
    organization {
      name
    }
    pilot {
      name
    }
    status
    patterns {
      title
      feedback
      checklists {
        name
        passed
      }
    }
  }
}
```

```json
{
  "id": "ID_DA_ANALISE"
}
```