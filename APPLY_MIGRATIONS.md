# 🗄️ Aplicar Migrations no Supabase

## ⚡ Quick Setup (Cloud)

Se você quer usar o Supabase Cloud (recomendado), execute:

```bash
# 1. Login (primeira vez)
npx supabase login

# 2. Link ao projeto
npx supabase link --project-ref nhvvhaycahqzlqxcftum

# 3. Aplicar migrations
npx supabase db push

# 4. Carregar dados de exemplo (opcional)
npx supabase db seed run
```

## ✅ Verificar se funcionou

Acesse: https://app.supabase.com/project/nhvvhaycahqzlqxcftum/sql/new

Execute a query:
```sql
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';
```

Você deve ver estas tabelas:
- ✅ teams
- ✅ team_members
- ✅ decision_logs
- ✅ comments
- ✅ external_links
- ✅ decision_log_external_links
- ✅ decision_log_likes

---

## 🐳 Setup Local com Docker (Avançado)

Se preferir usar Supabase local:

```bash
# 1. Iniciar containers
npx supabase start

# Aguarde até aparecer:
# - API running at http://127.0.0.1:54321
# - DB running at postgresql://postgres:postgres@127.0.0.1:54322/postgres

# 2. Aplicar migrations
npx supabase db push --db-url "postgresql://postgres:postgres@127.0.0.1:54322/postgres"

# 3. Carregar dados de exemplo
npx supabase db seed run
```

---

## 📝 O que as Migrations Fazem

### Arquivo: `supabase/migrations/001_create_tables.sql`

Cria:
1. **Tabela `teams`**
   - id (UUID)
   - name, description
   - created_at, updated_at

2. **Tabela `team_members`**
   - id (UUID)
   - team_id (FK → teams)
   - name, role, email
   - created_at, updated_at

3. **Tabela `decision_logs`**
   - id (UUID)
   - title, project_name, methodology, stage
   - context, choices (array), final_decision, impact
   - author, author_role
   - team_id (FK → teams), likes (count)
   - created_at, updated_at

4. **Tabela `comments`**
   - id (UUID)
   - decision_log_id (FK → decision_logs)
   - author_name, author_role, content
   - created_at

5. **Tabela `external_links`**
   - id (UUID)
   - platform, url, label
   - created_at

6. **Tabela `decision_log_external_links`** (Junction)
   - decision_log_id (FK)
   - external_link_id (FK)

7. **Tabela `decision_log_likes`**
   - id (UUID)
   - decision_log_id (FK)
   - user_id (UUID)
   - created_at
   - UNIQUE(decision_log_id, user_id)

### Segurança: Row Level Security (RLS)
- ✅ Todos podem LER
- ✅ Apenas autenticados podem ESCREVER
- ✅ Foreign keys com CASCADE delete

---

## 🧪 Testar a Integração

Após aplicar as migrations:

```bash
# 1. Backend ainda rodando? (porta 3000)
curl http://localhost:3000/api/decision-logs

# 2. Frontend ainda rodando? (porta 3001)
# Abra http://localhost:3001 no navegador

# 3. Criar um log de decisão
curl -X POST http://localhost:3000/api/decision-logs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Primeira Decisão",
    "project_name": "Sunflower",
    "methodology": "Agile",
    "stage": "execution",
    "context": "Teste da integração",
    "choices": ["Opção A", "Opção B"],
    "final_decision": "Opção A",
    "impact": "Funciona!",
    "author": "Dev",
    "author_role": "Developer"
  }'
```

Se receber um JSON com os dados salvos = ✅ Tudo funcionando!

---

## 🆘 Problemas Comuns

### ❌ "Authentication required"
- Você precisa fazer login: `npx supabase login`
- Selecione "Local development" quando perguntado

### ❌ "Project not found"
- Verifique o project-ref: `nhvvhaycahqzlqxcftum`
- Link ao projeto: `npx supabase link --project-ref nhvvhaycahqzlqxcftum`

### ❌ "Migration already applied"
- Isso é OK! Significa que já foi aplicada
- Se precisar limpar: `npx supabase db reset`

### ❌ "Connection refused" (local)
- Supabase local não está rodando
- Execute: `npx supabase start` primeiro

---

## ✨ Próximas Ações

- ✅ Migrations aplicadas? 
- ✅ Backend rodando em 3000?
- ✅ Frontend rodando em 3001?
- 👉 Abra http://localhost:3001 e teste!

**Boa sorte! 🚀**
