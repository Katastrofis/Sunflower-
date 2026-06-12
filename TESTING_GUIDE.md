# 🧪 Guia de Testes - Sunflower API

## Pré-requisitos

- Supabase rodando localmente: `supabase start`
- Next.js rodando: `npm run dev` (na pasta `sunflower-app`)
- Ferramenta de teste HTTP (curl, Postman, Insomnia, ou Thunder Client no VS Code)

## 📍 Base URL

```
http://localhost:3000/api
```

## 🧪 Testes com cURL

### 1. Listar todos os Decision Logs

```bash
curl -X GET http://localhost:3000/api/decision-logs \
  -H "Content-Type: application/json"
```

### 2. Obter Decision Log específico

```bash
curl -X GET "http://localhost:3000/api/decision-logs?id=<UUID>" \
  -H "Content-Type: application/json"
```

### 3. Criar novo Decision Log

```bash
curl -X POST http://localhost:3000/api/decision-logs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Escolha de Banco de Dados",
    "project_name": "Backend Migration",
    "methodology": "Design Thinking",
    "stage": "Definição",
    "context": "Necessário migrar de MongoDB para PostgreSQL",
    "choices": ["PostgreSQL + Supabase", "MySQL", "Firebase"],
    "final_decision": "PostgreSQL com Supabase foi escolhido pela melhor integração com Next.js",
    "impact": "alto",
    "author": "Dev Team",
    "author_role": "Backend Engineers",
    "external_links": [
      {
        "platform": "github",
        "url": "https://github.com/company/migration",
        "label": "Migration Scripts"
      }
    ]
  }'
```

### 4. Atualizar Decision Log

```bash
curl -X PUT "http://localhost:3000/api/decision-logs?id=<UUID>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Título Atualizado",
    "final_decision": "Nova decisão com mais detalhes..."
  }'
```

### 5. Deletar Decision Log

```bash
curl -X DELETE "http://localhost:3000/api/decision-logs?id=<UUID>" \
  -H "Content-Type: application/json"
```

### 6. Adicionar Comentário

```bash
curl -X POST "http://localhost:3000/api/decision-logs/<UUID>" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "comment",
    "author_name": "Ana Silva",
    "author_role": "Design Lead",
    "content": "Excelente decisão técnica!"
  }'
```

### 7. Toggle Like

```bash
curl -X POST "http://localhost:3000/api/decision-logs/<UUID>" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "like",
    "userId": "user-123"
  }'
```

### 8. Listar todos os Teams

```bash
curl -X GET http://localhost:3000/api/teams \
  -H "Content-Type: application/json"
```

### 9. Criar novo Team

```bash
curl -X POST http://localhost:3000/api/teams \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Frontend Squad",
    "description": "Responsável pelo desenvolvimento frontend"
  }'
```

### 10. Adicionar membro ao Team

```bash
curl -X POST "http://localhost:3000/api/teams/<TEAM_UUID>/members" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pedro Costa",
    "role": "Senior Frontend Engineer",
    "email": "pedro@company.com"
  }'
```

### 11. Listar membros do Team

```bash
curl -X GET "http://localhost:3000/api/teams/<TEAM_UUID>/members" \
  -H "Content-Type: application/json"
```

### 12. Atualizar membro do Team

```bash
curl -X PUT "http://localhost:3000/api/teams/<TEAM_UUID>/members?memberId=<MEMBER_UUID>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pedro Costa Jr",
    "role": "Staff Frontend Engineer"
  }'
```

### 13. Deletar membro do Team

```bash
curl -X DELETE "http://localhost:3000/api/teams/<TEAM_UUID>/members?memberId=<MEMBER_UUID>" \
  -H "Content-Type: application/json"
```

## 🧪 Testes com Insomnia/Postman

### Importar Collection

Você pode criar uma collection com as seguintes requisições:

#### Collection JSON

```json
{
  "client": "Thunder Client",
  "collectionName": "Sunflower API",
  "dateExported": "2024-01-15T10:00:00.000Z",
  "version": "1.1",
  "folders": [],
  "requests": [
    {
      "name": "List Decision Logs",
      "method": "GET",
      "url": "http://localhost:3000/api/decision-logs"
    },
    {
      "name": "Create Decision Log",
      "method": "POST",
      "url": "http://localhost:3000/api/decision-logs",
      "body": {
        "title": "Teste",
        "project_name": "Projeto Teste",
        "methodology": "Design Thinking",
        "stage": "Ideação",
        "context": "Contexto de teste",
        "choices": ["Opção 1", "Opção 2"],
        "final_decision": "Decisão final",
        "impact": "médio",
        "author": "Tester",
        "author_role": "QA"
      }
    }
  ]
}
```

## 🧪 Fluxo de Teste Completo

### 1. Criar um Time

```bash
TEAM_ID=$(curl -s -X POST http://localhost:3000/api/teams \
  -H "Content-Type: application/json" \
  -d '{
    "name": "QA Team",
    "description": "Time de qualidade"
  }' | jq -r '.id')

echo "Team ID: $TEAM_ID"
```

### 2. Adicionar Membros ao Time

```bash
curl -X POST "http://localhost:3000/api/teams/$TEAM_ID/members" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice",
    "role": "QA Lead",
    "email": "alice@company.com"
  }'
```

### 3. Criar um Decision Log associado ao Time

```bash
DECISION_ID=$(curl -s -X POST http://localhost:3000/api/decision-logs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Estratégia de Testes",
    "project_name": "QA Strategy 2024",
    "methodology": "Lean UX",
    "stage": "Definição",
    "context": "Implementar nova estratégia de testes automatizados",
    "choices": ["Jest + Playwright", "Vitest + Cypress", "Pytest"],
    "final_decision": "Jest + Playwright para melhor integração",
    "impact": "alto",
    "author": "Alice",
    "author_role": "QA Lead",
    "team_id": "'$TEAM_ID'"
  }' | jq -r '.id')

echo "Decision ID: $DECISION_ID"
```

### 4. Adicionar Comentário

```bash
curl -X POST "http://localhost:3000/api/decision-logs/$DECISION_ID" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "comment",
    "author_name": "Bob",
    "author_role": "QA Engineer",
    "content": "Ótima escolha! Jest tem excelente documentação."
  }'
```

### 5. Dar Like

```bash
curl -X POST "http://localhost:3000/api/decision-logs/$DECISION_ID" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "like",
    "userId": "bob-123"
  }'
```

### 6. Recuperar Decision Log com relacionamentos

```bash
curl -X GET "http://localhost:3000/api/decision-logs?id=$DECISION_ID" \
  -H "Content-Type: application/json"
```

## 📊 Resposta Esperada

### Decision Log completo

```json
{
  "id": "uuid",
  "title": "Estratégia de Testes",
  "project_name": "QA Strategy 2024",
  "methodology": "Lean UX",
  "stage": "Definição",
  "context": "Implementar nova estratégia de testes automatizados",
  "choices": ["Jest + Playwright", "Vitest + Cypress", "Pytest"],
  "final_decision": "Jest + Playwright para melhor integração",
  "impact": "alto",
  "author": "Alice",
  "author_role": "QA Lead",
  "team_id": "team-uuid",
  "likes": 1,
  "created_at": "2024-01-15T10:30:00.000Z",
  "updated_at": "2024-01-15T10:30:00.000Z",
  "comments": [
    {
      "id": "comment-uuid",
      "author_name": "Bob",
      "author_role": "QA Engineer",
      "content": "Ótima escolha! Jest tem excelente documentação.",
      "created_at": "2024-01-15T10:35:00.000Z"
    }
  ],
  "external_links": []
}
```

## ⚠️ Tratamento de Erros

### Resposta 400 - Bad Request

```json
{
  "error": "ID is required"
}
```

### Resposta 500 - Server Error

```json
{
  "error": "Failed to create decision log"
}
```

## 💡 Dicas

1. **Usar jq para parsear JSON:** `curl ... | jq '.id'` para extrair campos
2. **Salvar IDs em variáveis:** `ID=$(curl ... | jq -r '.id')`
3. **Pretty print JSON:** `curl ... | jq '.'`
4. **Headers custom:** `-H "Authorization: Bearer TOKEN"`

## 🚀 Próximos Passos

- [ ] Implementar autenticação real
- [ ] Adicionar validação de entrada
- [ ] Implementar paginação
- [ ] Adicionar rate limiting
- [ ] Criar testes automatizados
- [ ] Documentar rate limits
- [ ] Adicionar cache
