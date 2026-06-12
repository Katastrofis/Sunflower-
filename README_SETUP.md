# 🌻 Sunflower - Quick Reference

## 🚀 Servidores em Execução

| Serviço | URL | Status |
|---------|-----|--------|
| Backend (Next.js) | http://localhost:3000 | ✅ Rodando |
| Frontend (React) | http://localhost:3001 | ✅ Rodando |
| Supabase Cloud | https://app.supabase.com | 🟡 Configurado |

---

## 🎯 Para Começar (3 Passos)

### 1️⃣ Aplicar Migrations (5 min)
```bash
cd /workspaces/Sunflower-
npx supabase login
npx supabase link --project-ref nhvvhaycahqzlqxcftum
npx supabase db push
```

### 2️⃣ Testar no Navegador (1 min)
Abra: **http://localhost:3001**

### 3️⃣ Testar API (1 min)
```bash
curl http://localhost:3000/api/decision-logs
```

**Total: 7 minutos até estar 100% pronto! ⚡**

---

## 📚 Documentação

### 🔍 Para Entender o Projeto
- [PROJECT_STATUS.md](PROJECT_STATUS.md) - Status geral e checklist
- [API_INTEGRATION.md](API_INTEGRATION.md) - Referência completa de APIs
- [ARCHITECTURE_DIAGRAMS.md](ARCHITECTURE_DIAGRAMS.md) - Diagramas

### 🛠️ Para Desenvolver
- [SETUP_COMPLETO.md](SETUP_COMPLETO.md) - Setup detalhado
- [APPLY_MIGRATIONS.md](APPLY_MIGRATIONS.md) - Como aplicar migrations
- [TESTING_COMPLETE.md](TESTING_COMPLETE.md) - Exemplos de testes

### ⚡ Quick Guides
- [QUICK_START.md](QUICK_START.md) - Guia rápido
- [TESTING_GUIDE.md](TESTING_GUIDE.md) - Exemplos cURL

---

## 🧪 Testes Rápidos

### ✅ Verificar Backend
```bash
curl http://localhost:3000/api/decision-logs
# Retorna: {"error": "Failed to fetch decision logs"}
# ✅ = Backend está vivo e aguardando migrations
```

### ✅ Verificar Frontend
```bash
open http://localhost:3001
# Deve carregar a página React
```

### ✅ Criar Primeiro Recurso (após migrations)
```bash
curl -X POST http://localhost:3000/api/decision-logs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Teste",
    "project_name": "Sunflower",
    "methodology": "Agile",
    "stage": "planning",
    "context": "Teste",
    "choices": ["A", "B"],
    "final_decision": "A",
    "impact": "OK",
    "author": "Dev",
    "author_role": "Developer"
  }'
# Retorna: 201 Created com os dados
```

---

## 📊 8 Endpoints Disponíveis

```
GET    /api/decision-logs              Listar logs
POST   /api/decision-logs              Criar log
PUT    /api/decision-logs/{id}         Atualizar log
DELETE /api/decision-logs/{id}         Deletar log
POST   /api/decision-logs/{id}         Comentar/Like

GET    /api/teams                      Listar times
POST   /api/teams                      Criar time
PUT    /api/teams/{id}                 Atualizar time
DELETE /api/teams/{id}                 Deletar time
GET    /api/teams/{id}/members         Listar membros
POST   /api/teams/{id}/members         Adicionar membro
PUT    /api/teams/{id}/members/{mid}   Atualizar membro
DELETE /api/teams/{id}/members/{mid}   Remover membro
```

---

## 💾 Banco de Dados

### Tabelas Criadas (após migrations)
- ✅ teams
- ✅ team_members
- ✅ decision_logs
- ✅ comments
- ✅ external_links
- ✅ decision_log_external_links
- ✅ decision_log_likes

### Dados de Exemplo
Após aplicar migrations:
```bash
npx supabase db seed run
```

---

## 🛠️ Detalhes Técnicos

### Frontend (React 19.2.4)
- **Framework**: React + Vite
- **API Client**: `src/api/client.ts` (20+ métodos)
- **Hooks**: `src/api/hooks.ts` (15 hooks)
- **Validação**: Zod + TypeScript

### Backend (Next.js 16.2.9)
- **Runtime**: Node.js
- **API Routes**: `app/api/*`
- **Serviços**: `lib/services/*`
- **Schemas**: `lib/schemas.ts` (12+ schemas)

### Banco de Dados
- **Provider**: Supabase (PostgreSQL)
- **Segurança**: Row Level Security (RLS)
- **Índices**: Otimizados para performance

---

## 🔧 Mantendo Tudo Rodando

### Terminal 1 (Backend)
```bash
cd /workspaces/Sunflower-/sunflower-app
npm run dev
# Ctrl+C para parar
```

### Terminal 2 (Frontend)
```bash
cd /workspaces/Sunflower-
npm run dev
# Ctrl+C para parar
```

### Terminal 3 (Testes/Migrations)
```bash
cd /workspaces/Sunflower-
# Execute comandos de test, migrations, etc
```

---

## ⚙️ Variáveis de Ambiente

### Backend (.env.local) - ✅ Já Configurado
```
NEXT_PUBLIC_SUPABASE_URL=https://nhvvhaycahqzlqxcftum.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

### Frontend (.env) - Template
```
VITE_API_URL=http://localhost:3000/api
```

---

## 📦 Dependências Instaladas

### Backend (377 packages)
- next@16.2.9
- zod@3.24.1
- @supabase/supabase-js@2.106.0
- typescript@5.8.2

### Frontend (226 packages)
- react@19.2.4
- vite@6.4.3
- typescript@5.8.2
- zod@3.24.1

---

## 🚦 Status Checklist

- [x] Backend compilando ✅
- [x] Frontend compilando ✅
- [x] Endpoints definidos ✅
- [x] Validação implementada ✅
- [x] React hooks criados ✅
- [x] Documentação completa ✅
- [x] Servidores rodando ✅
- [ ] Migrations aplicadas ← PRÓXIMO
- [ ] Testes passando
- [ ] Deploy realizado

---

## 🆘 Quick Fixes

| Problema | Comando |
|----------|---------|
| Porta 3000 em uso | `lsof -i :3000 \| grep LISTEN \| awk '{print $2}' \| xargs kill -9` |
| Porta 3001 em uso | `lsof -i :3001 \| grep LISTEN \| awk '{print $2}' \| xargs kill -9` |
| Limpar node_modules | `rm -rf node_modules && npm install` |
| Reinstalar Supabase CLI | `npm install -g @supabase/cli` |
| Resetar migrations | `npx supabase db reset` |

---

## 💡 Próximas Features (Roadmap)

- [ ] Supabase Auth (login/signup)
- [ ] Upload de arquivos
- [ ] Realtime (WebSockets)
- [ ] Testes automatizados
- [ ] Deploy em Vercel
- [ ] CI/CD com GitHub Actions

---

## 🎯 Objetivo Alcançado

```
┌─────────────────────────────────────┐
│  ✅ SUNFLOWER PRONTO PARA USO       │
│                                     │
│  Backend: http://localhost:3000     │
│  Frontend: http://localhost:3001    │
│  Database: Supabase Cloud           │
│                                     │
│  Próximo: Aplicar migrations        │
│  Tempo: ~5 minutos                  │
└─────────────────────────────────────┘
```

**Status**: 🟢 Pronto para desenvolvimento!

---

## 📞 Need Help?

1. Leia [SETUP_COMPLETO.md](SETUP_COMPLETO.md)
2. Consulte [API_INTEGRATION.md](API_INTEGRATION.md)
3. Veja exemplos em [TESTING_COMPLETE.md](TESTING_COMPLETE.md)
4. Siga [QUICK_START.md](QUICK_START.md)

**Última atualização**: $(date)**

Happy coding! 🚀
