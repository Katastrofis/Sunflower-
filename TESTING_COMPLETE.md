# 🧪 Guia Completo de Testes - Sunflower

## ✅ Status Verificado

### Backend (Next.js) - ✅ Respondendo
```bash
curl http://localhost:3000/api/decision-logs
# Resposta esperada:
# {"error": "Failed to fetch decision logs"}
# ↑ Isso é NORMAL! Significa backend está vivo
# O erro acontece porque migrations não foram aplicadas ainda
```

### Frontend (React/Vite) - ✅ Rodando
```
URL: http://localhost:3001
Status: Vite compilado com sucesso
```

---

## 📋 Plano de Testes Completo

### Fase 1: Setup (Agora) ✅
- [x] Backend iniciado (3000)
- [x] Frontend iniciado (3001)
- [ ] Migrations aplicadas (PRÓXIMO)
- [ ] Dados carregados

### Fase 2: Validação de Integração
Após aplicar migrations, execute:

```bash
# Teste 1: Listar decision logs (deve retornar array vazio [])
curl http://localhost:3000/api/decision-logs

# Teste 2: Criar decision log (deve retornar 201 Created)
curl -X POST http://localhost:3000/api/decision-logs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Escolha de Framework",
    "project_name": "Sunflower",
    "methodology": "Design Thinking",
    "stage": "ideation",
    "context": "Decisão de qual framework usar",
    "choices": ["React", "Vue", "Angular"],
    "final_decision": "React",
    "impact": "Aumentou a produtividade do time",
    "author": "Maria Silva",
    "author_role": "Tech Lead"
  }'

# Resposta esperada (201 Created):
# {
#   "id": "uuid-aleatorio",
#   "title": "Escolha de Framework",
#   "project_name": "Sunflower",
#   ...
# }
```

---

## 🛠️ Testes por Endpoint

### 1️⃣ Decision Logs - GET (Listar)

**Request:**
```bash
curl http://localhost:3000/api/decision-logs
```

**Response esperada (após migrations):**
```json
[]
```

**Opção com filtro por team:**
```bash
curl "http://localhost:3000/api/decision-logs?team_id=uuid-do-time"
```

---

### 2️⃣ Decision Logs - POST (Criar)

**Request:**
```bash
curl -X POST http://localhost:3000/api/decision-logs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Seleção de Database",
    "project_name": "Sunflower",
    "methodology": "Agile",
    "stage": "execution",
    "context": "Precisávamos escolher um banco de dados escalável",
    "choices": ["PostgreSQL", "MongoDB", "Firebase"],
    "final_decision": "PostgreSQL",
    "impact": "Melhor relação custo-benefício com escalabilidade",
    "author": "João Dev",
    "author_role": "Backend Developer"
  }'
```

**Response esperada (201 Created):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Seleção de Database",
  "project_name": "Sunflower",
  "methodology": "Agile",
  "stage": "execution",
  "context": "Precisávamos escolher um banco de dados escalável",
  "choices": ["PostgreSQL", "MongoDB", "Firebase"],
  "final_decision": "PostgreSQL",
  "impact": "Melhor relação custo-benefício com escalabilidade",
  "author": "João Dev",
  "author_role": "Backend Developer",
  "team_id": null,
  "likes": 0,
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

---

### 3️⃣ Decision Logs - PUT (Atualizar)

**Request:**
```bash
curl -X PUT http://localhost:3000/api/decision-logs/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -d '{
    "impact": "Melhor relação custo-benefício com escalabilidade e excelente suporte"
  }'
```

**Response esperada (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Seleção de Database",
  ...
  "impact": "Melhor relação custo-benefício com escalabilidade e excelente suporte",
  ...
}
```

---

### 4️⃣ Decision Logs - DELETE (Deletar)

**Request:**
```bash
curl -X DELETE http://localhost:3000/api/decision-logs/550e8400-e29b-41d4-a716-446655440000
```

**Response esperada (200 OK):**
```json
{
  "message": "Decision log deleted successfully"
}
```

---

### 5️⃣ Decision Logs - POST Comentar/Like

**Comentar:**
```bash
curl -X POST http://localhost:3000/api/decision-logs/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -d '{
    "action": "comment",
    "author_name": "Ana",
    "author_role": "Frontend Lead",
    "content": "Ótima escolha! PostgreSQL é muito confiável."
  }'
```

**Dar Like:**
```bash
curl -X POST http://localhost:3000/api/decision-logs/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -d '{
    "action": "like",
    "user_id": "user-uuid"
  }'
```

---

### 6️⃣ Teams - GET (Listar)

**Request:**
```bash
curl http://localhost:3000/api/teams
```

**Response esperada:**
```json
[]
```

---

### 7️⃣ Teams - POST (Criar)

**Request:**
```bash
curl -X POST http://localhost:3000/api/teams \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Design System Team",
    "description": "Responsável pela arquitetura e componentes do design system"
  }'
```

**Response esperada (201 Created):**
```json
{
  "id": "660e8400-e29b-41d4-a716-446655440001",
  "name": "Design System Team",
  "description": "Responsável pela arquitetura e componentes do design system",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z",
  "team_members": []
}
```

---

### 8️⃣ Teams - Membros (Gerenciar)

**Adicionar membro:**
```bash
curl -X POST http://localhost:3000/api/teams/660e8400-e29b-41d4-a716-446655440001/members \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Carlos",
    "role": "Senior Designer",
    "email": "carlos@sunflower.com"
  }'
```

**Listar membros:**
```bash
curl http://localhost:3000/api/teams/660e8400-e29b-41d4-a716-446655440001/members
```

**Atualizar membro:**
```bash
curl -X PUT http://localhost:3000/api/teams/660e8400-e29b-41d4-a716-446655440001/members/member-uuid \
  -H "Content-Type: application/json" \
  -d '{
    "role": "Lead Designer"
  }'
```

**Remover membro:**
```bash
curl -X DELETE http://localhost:3000/api/teams/660e8400-e29b-41d4-a716-446655440001/members/member-uuid
```

---

## 🔍 Verificar Erros de Validação

### Teste com dados inválidos (deve retornar 400 Bad Request):

```bash
curl -X POST http://localhost:3000/api/decision-logs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Teste"
    # ↑ Faltam campos obrigatórios!
  }'
```

**Response esperada (400 Bad Request):**
```json
{
  "error": "Validation failed",
  "details": {
    "project_name": ["Required"],
    "methodology": ["Required"],
    "stage": ["Required"],
    "context": ["Required"],
    "choices": ["Required"],
    "final_decision": ["Required"],
    "impact": ["Required"],
    "author": ["Required"],
    "author_role": ["Required"]
  }
}
```

---

## 🚀 Testes Frontend (Navegador)

1. Abra: `http://localhost:3001`
2. Você deve ver a interface React carregada
3. Se houver erro de conexão, é porque migrations não foram aplicadas

### Testes que podem fazer após migrations:

- [ ] Carregar lista de decision logs
- [ ] Criar novo decision log
- [ ] Editar decision log
- [ ] Deletar decision log
- [ ] Comentar em um log
- [ ] Dar like em um log
- [ ] Gerenciar times
- [ ] Adicionar membros ao time

---

## 📊 Sequência de Testes Recomendada

### Pré-requisito: Aplicar Migrations
```bash
npx supabase login
npx supabase link --project-ref nhvvhaycahqzlqxcftum
npx supabase db push
```

### Após Migrations (Ordem):

1. **Listar resources vazios**
   ```bash
   curl http://localhost:3000/api/decision-logs
   curl http://localhost:3000/api/teams
   ```

2. **Criar Team**
   ```bash
   curl -X POST http://localhost:3000/api/teams ...
   ```

3. **Criar Decision Log**
   ```bash
   curl -X POST http://localhost:3000/api/decision-logs ...
   ```

4. **Listar com dados**
   ```bash
   curl http://localhost:3000/api/decision-logs
   curl http://localhost:3000/api/teams
   ```

5. **Adicionar membro ao team**
   ```bash
   curl -X POST http://localhost:3000/api/teams/{id}/members ...
   ```

6. **Comentar/Like no log**
   ```bash
   curl -X POST http://localhost:3000/api/decision-logs/{id} ...
   ```

7. **Atualizar recurso**
   ```bash
   curl -X PUT http://localhost:3000/api/decision-logs/{id} ...
   ```

8. **Deletar recurso**
   ```bash
   curl -X DELETE http://localhost:3000/api/decision-logs/{id}
   ```

---

## ✅ Checklist de Sucesso

Após todas as etapas, você deve ter:

- [x] Backend rodando em http://localhost:3000
- [x] Frontend rodando em http://localhost:3001
- [ ] Migrations aplicadas no Supabase
- [ ] Endpoints respondendo corretamente
- [ ] Dados sendo salvos no banco
- [ ] Frontend conectando ao backend
- [ ] Validação funcionando (rejeita dados inválidos)
- [ ] CRUD completo funcionando (Create, Read, Update, Delete)

---

## 🎉 Pronto para Desenvolvimento!

Quando todos os testes passarem:

1. Você pode começar a desenvolver novos features
2. Hot reload está ativado (mudanças aparecem automaticamente)
3. TypeScript compila em tempo real
4. Todos os endpoints estão testados e validados

**Next Step**: Aplicar migrations e começar a explorar a API!

---

## 📞 Troubleshooting

| Problema | Solução |
|----------|---------|
| Porta 3000 em uso | `lsof -i :3000` para ver processo, depois `kill -9 PID` |
| Porta 3001 em uso | `lsof -i :3001` para ver processo, depois `kill -9 PID` |
| Backend não responde | Verifique em outro terminal: `ps aux \| grep node` |
| Frontend não carrega | Verifique console do navegador (F12) |
| Erro de CORS | Frontend em 3001, backend em 3000 (deve funcionar) |
| Erro de Supabase | Verifique `.env.local` com credenciais corretas |

**Happy Testing! 🎉**
