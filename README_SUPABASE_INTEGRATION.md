# 🌻 Sunflower - Integração Completa com Supabase

## 📖 Documentação Completa

Esta integração fornece uma solução completa de backend e frontend para a plataforma Sunflower, com Supabase como banco de dados e Next.js como API.

### 📚 Documentos

1. **[QUICK_START.md](QUICK_START.md)** - Guia rápido para começar (👈 **COMECE AQUI**)
2. **[API_INTEGRATION.md](API_INTEGRATION.md)** - Documentação detalhada da API
3. **[TESTING_GUIDE.md](TESTING_GUIDE.md)** - Exemplos de teste com cURL
4. **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** - Resumo técnico
5. **[README.md (original)](README.md)** - Guia original do projeto

---

## ⚡ Início Rápido

```bash
# 1. Instalar dependências
cd sunflower-app && npm install && cd ..
npm install

# 2. Iniciar Supabase
supabase start

# 3. Aplicar migrations
supabase db push

# 4. (Opcional) Carregar dados de exemplo
supabase db reset

# 5. Iniciar desenvolvimento
# Terminal 1
cd sunflower-app && npm run dev

# Terminal 2
npm run dev
```

Pronto! Acesse:
- 🎨 Frontend: http://localhost:5173
- 🔌 Backend: http://localhost:3000
- 📊 Supabase Studio: http://127.0.0.1:54323

---

## 🎯 O que foi implementado

### ✅ Backend (Next.js)

#### Camada de Serviços (`lib/services/`)
- `decision-logs.ts` - CRUD e operações para registros de decisão
- `teams.ts` - CRUD para times e membros

#### API Routes (`app/api/`)
```
/api/decision-logs
├── route.ts (GET, POST, PUT, DELETE)
└── [id]/route.ts (POST para comentários e likes)

/api/teams
├── route.ts (GET, POST, PUT, DELETE)
└── [id]/members/route.ts (GET, POST, PUT, DELETE)
```

#### Validação (`lib/`)
- `schemas.ts` - Schemas Zod para validação de entrada
- `api-utils.ts` - Utilitários para respostas API

### ✅ Frontend (React/Vite)

#### Cliente HTTP (`src/api/`)
- `client.ts` - Cliente HTTP com métodos para cada recurso
- `hooks.ts` - React hooks para facilitar uso nos componentes

### ✅ Banco de Dados (PostgreSQL via Supabase)

#### Migrations (`supabase/migrations/`)
- `001_create_tables.sql` - Schema com 7 tabelas:
  - `teams` - Equipes/times
  - `team_members` - Membros dos times
  - `decision_logs` - Registros de decisões
  - `comments` - Comentários
  - `external_links` - Links externos
  - `decision_log_external_links` - Associação (N-M)
  - `decision_log_likes` - Likes por usuário

#### Seeds (`supabase/seed.sql`)
- Dados de exemplo para testes

### ✅ Documentação
- Guias de setup e uso
- Exemplos de teste
- Resumo técnico

---

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────┐
│          React/Vite Frontend             │
│  (Port 5173)                             │
│  - Components                            │
│  - Hooks (useDecisionLogs, etc)          │
│  - API Client                            │
└────────────────┬────────────────────────┘
                 │
         HTTP (fetch/axios)
                 ▼
┌─────────────────────────────────────────┐
│        Next.js Backend API               │
│  (Port 3000)                             │
│  - Route Handlers                        │
│  - Service Layer                         │
│  - Input Validation (Zod)                │
│  - Error Handling                        │
└────────────────┬────────────────────────┘
                 │
        Supabase Client SDK
                 ▼
┌─────────────────────────────────────────┐
│      Supabase (PostgreSQL)               │
│  (Port 54321/54322)                      │
│  - Tables                                │
│  - RLS Policies                          │
│  - Row Level Security                    │
│  - Indexes                               │
└─────────────────────────────────────────┘
```

---

## 📊 Schema do Banco de Dados

### Tabelas Principais

#### `teams`
```sql
id (UUID) - Primary Key
name (TEXT) - Nome do time
description (TEXT) - Descrição
created_at, updated_at (TIMESTAMP)
```

#### `decision_logs`
```sql
id (UUID) - Primary Key
title (TEXT) - Título
project_name (TEXT) - Projeto
methodology (TEXT) - Metodologia
stage (TEXT) - Estágio do projeto
context (TEXT) - Contexto
choices (TEXT[]) - Opções avaliadas
final_decision (TEXT) - Decisão final
impact (TEXT) - Impacto (baixo/médio/alto)
author, author_role (TEXT) - Autor
team_id (UUID) - FK (opcional)
likes (INTEGER) - Contagem de likes
created_at, updated_at (TIMESTAMP)
```

#### `comments`
```sql
id (UUID) - Primary Key
decision_log_id (UUID) - FK
author_name, author_role (TEXT)
content (TEXT) - Conteúdo
created_at (TIMESTAMP)
```

---

## 🔌 Endpoints da API

### Decision Logs

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/decision-logs` | Lista todos os logs |
| GET | `/api/decision-logs?id=uuid` | Log específico |
| POST | `/api/decision-logs` | Cria novo log |
| PUT | `/api/decision-logs?id=uuid` | Atualiza log |
| DELETE | `/api/decision-logs?id=uuid` | Deleta log |
| POST | `/api/decision-logs/[id]` | Adiciona comentário/like |

### Teams

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/teams` | Lista todos os times |
| POST | `/api/teams` | Cria novo time |
| PUT | `/api/teams?id=uuid` | Atualiza time |
| DELETE | `/api/teams?id=uuid` | Deleta time |
| GET | `/api/teams/[id]/members` | Membros do time |
| POST | `/api/teams/[id]/members` | Adiciona membro |
| PUT | `/api/teams/[id]/members?memberId=uuid` | Atualiza membro |
| DELETE | `/api/teams/[id]/members?memberId=uuid` | Remove membro |

---

## 💻 Exemplos de Código

### Usar no React

```tsx
import { useDecisionLogs, useAddComment, useToggleLike } from '@/api/hooks';
import { useEffect } from 'react';

export function DecisionsList() {
  const { logs, loading, fetchLogs } = useDecisionLogs();
  
  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div>
      {loading ? <p>Carregando...</p> : (
        logs.map(log => (
          <div key={log.id}>
            <h3>{log.title}</h3>
            <p>{log.final_decision}</p>
            <p>👍 {log.likes}</p>
          </div>
        ))
      )}
    </div>
  );
}
```

### Usar API Client

```typescript
import { decisionLogsAPI } from '@/api/client';

const logs = await decisionLogsAPI.getAll();
const newLog = await decisionLogsAPI.create({
  title: 'Nova Decisão',
  // ... outros campos
});
```

### Testar com cURL

```bash
# Listar
curl http://localhost:3000/api/decision-logs

# Criar
curl -X POST http://localhost:3000/api/decision-logs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Teste",
    "project_name": "Projeto",
    "methodology": "Design Thinking",
    "stage": "Ideação",
    "context": "Contexto",
    "choices": ["A", "B"],
    "final_decision": "Escolhemos A",
    "impact": "médio",
    "author": "You",
    "author_role": "Engineer"
  }'
```

---

## 🗂️ Estrutura de Pastas

```
Sunflower-/
├── src/
│   ├── api/
│   │   ├── client.ts          ← Cliente HTTP
│   │   └── hooks.ts            ← React hooks
│   ├── components/
│   ├── App.tsx
│   └── main.tsx
│
├── sunflower-app/
│   ├── app/
│   │   ├── api/
│   │   │   ├── decision-logs/  ← Endpoints CRUD
│   │   │   └── teams/          ← Endpoints teams
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── lib/
│       ├── services/           ← Lógica de negócio
│       ├── schemas.ts          ← Validação (Zod)
│       └── api-utils.ts        ← Utilitários
│
├── supabase/
│   ├── migrations/
│   │   └── 001_create_tables.sql
│   ├── seed.sql
│   └── config.toml
│
└── Documentação/
    ├── QUICK_START.md          ← Comece aqui
    ├── API_INTEGRATION.md
    ├── TESTING_GUIDE.md
    └── IMPLEMENTATION_SUMMARY.md
```

---

## 🔐 Segurança

### Row Level Security (RLS)
- ✅ Habilitado em todas as tabelas
- ✅ Políticas de leitura pública
- ✅ Escrita autenticada (ajustar conforme necessário)

### Validação de Entrada
- ✅ Zod schemas para validação
- ✅ Tratamento de erros estruturado
- ✅ Respostas de erro consistentes

### Próximos Passos de Segurança
- [ ] Implementar autenticação real
- [ ] Revisar RLS policies
- [ ] Adicionar rate limiting
- [ ] Setup CORS adequado
- [ ] Implementar logging

---

## 🚀 Deployment

### Preparar para Produção

1. **Backend (Next.js)**
   ```bash
   cd sunflower-app
   npm run build
   # Deploy para Vercel, Railway, ou similar
   ```

2. **Supabase**
   - Conectar ao projeto cloud
   - Aplicar migrations
   - Configurar RLS policies

3. **Frontend (React)**
   ```bash
   npm run build
   # Deploy para Vercel, Netlify, ou similar
   ```

### Variáveis de Ambiente - Produção

**Supabase Cloud URLs** (ao invés de localhost):
```
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sua_chave_publica
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_API_URL=https://seu-backend.vercel.app/api
```

---

## 🆘 Troubleshooting

### Erro: "Connection refused"
```bash
supabase status
supabase start
```

### Erro: "Table not found"
```bash
supabase db push
supabase db reset
```

### CORS issues
Verificar `.env` - `VITE_API_URL` deve estar correto

### Porta já em uso
```bash
# Usar porta diferente
npm run dev -- -p 3001
```

---

## 📞 Suporte

1. 📖 Consultar documentação:
   - [QUICK_START.md](QUICK_START.md)
   - [API_INTEGRATION.md](API_INTEGRATION.md)
   - [TESTING_GUIDE.md](TESTING_GUIDE.md)

2. 🔗 Recursos:
   - [Supabase Docs](https://supabase.com/docs)
   - [Next.js Docs](https://nextjs.org/docs)
   - [React Docs](https://react.dev)

3. 🐛 Erros:
   - Verificar terminal do backend
   - Verificar network tab do browser
   - Revisar Supabase Studio

---

## ✅ Checklist de Setup

- [ ] Dependências instaladas
- [ ] Supabase iniciado
- [ ] Migrations aplicadas
- [ ] Variáveis de ambiente configuradas
- [ ] Backend rodando (porta 3000)
- [ ] Frontend rodando (porta 5173)
- [ ] API respondendo (teste um GET)
- [ ] Dados de exemplo carregados (opcional)

---

## 📅 Timeline de Desenvolvimento

- ✅ **Fase 1:** Schema e Migrations
- ✅ **Fase 2:** Serviços (Decision Logs e Teams)
- ✅ **Fase 3:** API Routes e Endpoints
- ✅ **Fase 4:** Cliente HTTP e Hooks React
- ✅ **Fase 5:** Validação com Zod
- ✅ **Fase 6:** Documentação e Testes
- ⏳ **Fase 7:** Autenticação (próximo)
- ⏳ **Fase 8:** Testes automatizados
- ⏳ **Fase 9:** Deploy e Monitoramento

---

## 📝 Notas Importantes

1. **RLS Policies** - Atualmente permissivas para desenvolvimento. Ajustar para produção.

2. **Autenticação** - Não está implementada. Considere:
   - Supabase Auth
   - Auth0
   - NextAuth.js

3. **Validação** - Usar schemas Zod em todos os endpoints.

4. **Testes** - Adicionar testes E2E com Playwright.

5. **Performance** - Adicionar paginação para larga escala.

---

## 🎓 Próximos Passos Recomendados

1. **Implementar Autenticação**
   - Login/logout
   - JWT tokens
   - Proteção de rotas

2. **Melhorar UX**
   - Loading states
   - Otimistic updates
   - Toast notifications

3. **Adicionar Testes**
   - Testes unitários
   - Testes de integração
   - Testes E2E

4. **Optimizar Performance**
   - Paginação
   - Caching
   - Compressão

5. **Preparar Deploy**
   - CI/CD com GitHub Actions
   - Environment variables
   - Error tracking (Sentry)

---

## 📄 Licença

SPDX-License-Identifier: Apache-2.0

---

**Status:** ✅ Pronto para desenvolvimento  
**Última atualização:** 2024-01-15  
**Versão:** 1.0.0

Para começar, vá para [QUICK_START.md](QUICK_START.md) 👈
