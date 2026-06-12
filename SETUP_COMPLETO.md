# 🌻 Sunflower - Setup Completo

## ✅ Status Atual

### Servidores em Execução
- **Backend (Next.js)**: http://localhost:3000 ✅
- **Frontend (React/Vite)**: http://localhost:3001 ✅

### Ambiente Configurado
- **Supabase Cloud**: `nhvvhaycahqzlqxcftum.supabase.co` (configurado em `.env.local`)
- **TypeScript**: ✅ Configurado
- **Validação (Zod)**: ✅ Implementada
- **API Routes**: ✅ 8 endpoints prontos

---

## 📋 Próximas Etapas

### Etapa 1: Aplicar Migrations no Banco de Dados

Você tem 2 opções:

#### **Opção A: Usar Supabase Cloud (Recomendado - Mais Fácil)**

```bash
# Login no Supabase
npx supabase login

# Link ao projeto cloud
npx supabase link --project-ref nhvvhaycahqzlqxcftum

# Aplicar as migrations
npx supabase db push
```

#### **Opção B: Usar Supabase Local (Requer Docker)**

```bash
# Iniciar containers locais
npx supabase start

# Aplicar migrations
npx supabase db push --db-url "postgresql://postgres:postgres@127.0.0.1:54322/postgres"

# Carregar dados de exemplo (opcional)
npx supabase db reset
```

---

## 🧪 Testar os Endpoints

### 1. Listar Decision Logs
```bash
curl http://localhost:3000/api/decision-logs \
  -H "Content-Type: application/json"
```

### 2. Criar um Decision Log
```bash
curl -X POST http://localhost:3000/api/decision-logs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Escolha de Framework",
    "project_name": "Sunflower",
    "methodology": "Design Thinking",
    "stage": "ideation",
    "context": "Precisávamos de um framework web",
    "choices": ["React", "Vue", "Angular"],
    "final_decision": "React",
    "impact": "Aumentou produtividade",
    "author": "João",
    "author_role": "Tech Lead"
  }'
```

### 3. Listar Teams
```bash
curl http://localhost:3000/api/teams \
  -H "Content-Type: application/json"
```

---

## 🔌 Conectar o Frontend ao Backend

O frontend já está configurado para conectar em `http://localhost:3000/api`.

Abra no navegador:
```
http://localhost:3001
```

Se vir os componentes carregando, significa que tudo está funcionando! ✅

---

## 📊 Arquitetura

```
┌─────────────────┐
│  React/Vite     │ (Porto 3001)
│  Frontend       │
└────────┬────────┘
         │ HTTP
         ▼
┌─────────────────┐
│  Next.js        │ (Porto 3000)
│  API Routes     │
└────────┬────────┘
         │ SQL
         ▼
┌─────────────────┐
│  Supabase       │
│  PostgreSQL     │
└─────────────────┘
```

---

## 📦 O que foi Criado

### Backend (Next.js)
- ✅ `app/api/decision-logs/` - CRUD de decisões
- ✅ `app/api/decision-logs/[id]/` - Comentários e likes
- ✅ `app/api/teams/` - Gerenciamento de times
- ✅ `app/api/teams/[id]/members/` - Membros do time
- ✅ `lib/services/` - Lógica de negócio
- ✅ `lib/schemas.ts` - Validação com Zod

### Frontend (React)
- ✅ `src/api/client.ts` - Cliente HTTP
- ✅ `src/api/hooks.ts` - 15 React hooks
- ✅ `src/components/` - Componentes React

### Banco de Dados
- ✅ `supabase/migrations/001_create_tables.sql` - Schema completo
- ✅ `supabase/seed.sql` - Dados de exemplo

---

## 🚀 Fluxo de Desenvolvimento

### Workflow Diário:

1. **Frontend** (em desenvolvimento):
   ```bash
   cd /workspaces/Sunflower-
   npm run dev  # Rodando em http://localhost:3001
   ```

2. **Backend** (em desenvolvimento):
   ```bash
   cd /workspaces/Sunflower-/sunflower-app
   npm run dev  # Rodando em http://localhost:3000
   ```

3. **Modificar código**: Ambos têm hot reload automático

4. **Testar API**: Use a aba de desenvolvimento ou cURL

---

## 📚 Documentação Disponível

- [API_INTEGRATION.md](API_INTEGRATION.md) - Referência completa de endpoints
- [ARCHITECTURE_DIAGRAMS.md](ARCHITECTURE_DIAGRAMS.md) - Diagramas do sistema
- [QUICK_START.md](QUICK_START.md) - Guia de início rápido
- [TESTING_GUIDE.md](TESTING_GUIDE.md) - Exemplos de testes com cURL
- [README_SUPABASE_INTEGRATION.md](README_SUPABASE_INTEGRATION.md) - Integração Supabase

---

## 🐛 Troubleshooting

### Erro: `NEXT_PUBLIC_SUPABASE_URL não definida`
- Solução: Criar `.env.local` em `sunflower-app/` com as credenciais Supabase

### Erro: `VITE_API_URL não definida`
- Solução: Criar `.env` em raiz com `VITE_API_URL=http://localhost:3000/api`

### Erro: `Porta 3000 já em uso`
- Solução: Frontend automaticamente mudou para porta 3001

### Erro ao conectar Supabase
- Verificar credenciais em `.env.local`
- Verificar se banco de dados está online
- Verificar regras de RLS (Row Level Security)

---

## ✨ Próximos Passos Opcionais

1. **Implementar Autenticação Supabase**
   - `src/components/AuthForm.tsx` já existe

2. **Adicionar Testes Automáticos**
   - Setup Jest/Vitest

3. **Deploy**
   - Backend: Vercel, Railway, Heroku
   - Frontend: Vercel, Netlify, GitHub Pages

4. **CI/CD**
   - GitHub Actions

---

## 📞 Contato & Suporte

Para dúvidas sobre a integração ou problemas, consulte:
- Supabase Docs: https://supabase.com/docs
- Next.js Docs: https://nextjs.org/docs
- React Docs: https://react.dev

**Status**: 🟢 Projeto pronto para desenvolvimento!
