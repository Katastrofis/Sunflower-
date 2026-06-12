# 📂 Estrutura Completa do Projeto Sunflower

## 📊 Visualização da Árvore de Arquivos

```
/workspaces/Sunflower-/
├── 📄 README.md
├── 📄 package.json                              (Frontend)
├── 📄 tsconfig.json
├── 📄 vite.config.ts
├── 📄 index.html
│
├── 📚 DOCUMENTAÇÃO (11 arquivos)
│   ├── 📖 README_SETUP.md                      ← LEIA PRIMEIRO!
│   ├── 📖 RESUMO_FINAL.md                      ← Resumo em português
│   ├── 📖 PROJECT_STATUS.md                    ← Status do projeto
│   ├── 📖 QUICK_START.md                       ← Início rápido
│   ├── 📖 SETUP_COMPLETO.md                    ← Setup detalhado
│   ├── 📖 APPLY_MIGRATIONS.md                  ← Como aplicar migrations
│   ├── 📖 API_INTEGRATION.md                   ← Referência de APIs
│   ├── 📖 ARCHITECTURE_DIAGRAMS.md             ← Diagramas
│   ├── 📖 TESTING_GUIDE.md                     ← Testes cURL
│   ├── 📖 TESTING_COMPLETE.md                  ← Testes completos
│   ├── 📖 README_SUPABASE_INTEGRATION.md       ← Integração Supabase
│   └── 📖 PROJECT_SPECIFICATION.md             ← Especificações
│
├── 📦 src/ (Frontend React)
│   ├── 📄 main.tsx                             (Entrada da app)
│   ├── 📄 App.tsx                              (Componente principal)
│   ├── 📄 index.css                            (Estilos)
│   ├── 📄 vite-env.d.ts                        (Tipos Vite)
│   ├── 📄 types.ts                             (Tipos da app)
│   ├── 📄 mockData.ts                          (Dados para teste)
│   ├── 📄 documentationData.ts                 (Dados de documentação)
│   ├── 📄 supabaseClient.ts                    (Cliente Supabase)
│   │
│   ├── 📁 api/
│   │   ├── 🔌 client.ts                        (HTTP Client - 20 métodos)
│   │   └── 🎣 hooks.ts                         (React Hooks - 15 hooks)
│   │
│   └── 📁 components/
│       ├── 🎨 AuthForm.tsx                     (Formulário de autenticação)
│       ├── 🎨 DashboardTab.tsx                 (Aba dashboard)
│       └── 🎨 DocsTab.tsx                      (Aba documentação)
│
├── 📦 sunflower-app/ (Backend Next.js)
│   ├── 📄 package.json                         (377 dependências)
│   ├── 📄 tsconfig.json
│   ├── 📄 next.config.ts
│   ├── 📄 postcss.config.mjs
│   ├── 📄 eslint.config.mjs
│   ├── 📄 next-env.d.ts
│   ├── 📄 .env.local                           ✅ CONFIGURADO
│   │
│   ├── 📁 app/
│   │   ├── 📄 globals.css
│   │   ├── 📄 layout.tsx
│   │   ├── 📄 page.tsx
│   │   │
│   │   └── 📁 api/ (8 ENDPOINTS)
│   │       │
│   │       ├── 📁 decision-logs/
│   │       │   ├── 📄 route.ts                 (GET/POST - Listar/Criar)
│   │       │   │   - GET /api/decision-logs
│   │       │   │   - POST /api/decision-logs
│   │       │   │
│   │       │   └── 📁 [id]/
│   │       │       └── 📄 route.ts             (POST - Comentar/Like)
│   │       │           - POST /api/decision-logs/{id}
│   │       │
│   │       ├── 📁 teams/
│   │       │   ├── 📄 route.ts                 (GET/POST/PUT/DELETE)
│   │       │   │   - GET /api/teams
│   │       │   │   - POST /api/teams
│   │       │   │   - PUT /api/teams/{id}
│   │       │   │   - DELETE /api/teams/{id}
│   │       │   │
│   │       │   └── 📁 [id]/
│   │       │       └── 📁 members/
│   │       │           └── 📄 route.ts         (GET/POST/PUT/DELETE)
│   │       │               - GET /api/teams/{id}/members
│   │       │               - POST /api/teams/{id}/members
│   │       │               - PUT /api/teams/{id}/members/{memberId}
│   │       │               - DELETE /api/teams/{id}/members/{memberId}
│   │
│   ├── 📁 lib/
│   │   │
│   │   ├── 📁 services/
│   │   │   ├── 💼 decision-logs.ts             (7 funções de negócio)
│   │   │   │   - createDecisionLog()
│   │   │   │   - getDecisionLogs()
│   │   │   │   - getDecisionLogById()
│   │   │   │   - updateDecisionLog()
│   │   │   │   - deleteDecisionLog()
│   │   │   │   - addCommentToDecisionLog()
│   │   │   │   - toggleLikeDecisionLog()
│   │   │   │
│   │   │   └── 💼 teams.ts                     (9 funções de negócio)
│   │   │       - createTeam()
│   │   │       - getTeams()
│   │   │       - getTeamById()
│   │   │       - updateTeam()
│   │   │       - deleteTeam()
│   │   │       - addTeamMember()
│   │   │       - getTeamMembers()
│   │   │       - updateTeamMember()
│   │   │       - deleteTeamMember()
│   │   │
│   │   ├── 📄 schemas.ts                       (12+ Zod Schemas)
│   │   │   - DecisionLogCreateSchema
│   │   │   - DecisionLogUpdateSchema
│   │   │   - DecisionLogActionSchema
│   │   │   - TeamCreateSchema
│   │   │   - TeamUpdateSchema
│   │   │   - TeamMemberCreateSchema
│   │   │   - TeamMemberUpdateSchema
│   │   │   - ExternalLinkSchema
│   │   │   - CommentSchema
│   │   │   - ... e mais
│   │   │
│   │   └── 📄 api-utils.ts                     (Utilities de API)
│   │       - sendError()
│   │       - sendSuccess()
│   │       - sendCreated()
│   │       - validateRequestBody()
│   │
│   ├── 📁 public/
│   └── 📁 utils/
│       └── 📁 supabase/
│           ├── 📄 client.ts
│           ├── 📄 middleware.ts
│           └── 📄 server.ts
│
├── 📦 supabase/ (Banco de Dados)
│   ├── 📄 config.toml                          (Configuração Supabase)
│   │
│   ├── 📁 migrations/
│   │   └── 📄 001_create_tables.sql             (SCHEMA - 7 TABELAS)
│   │       ├── CREATE TABLE teams
│   │       ├── CREATE TABLE team_members
│   │       ├── CREATE TABLE decision_logs
│   │       ├── CREATE TABLE comments
│   │       ├── CREATE TABLE external_links
│   │       ├── CREATE TABLE decision_log_external_links
│   │       ├── CREATE TABLE decision_log_likes
│   │       ├── Índices para performance
│   │       ├── Row Level Security (RLS)
│   │       └── Foreign keys com CASCADE
│   │
│   └── 📄 seed.sql                             (DADOS DE EXEMPLO)
│       ├── 3 times (teams)
│       ├── 4 membros (team_members)
│       ├── 3 logs de decisão (decision_logs)
│       ├── 4 comentários (comments)
│       ├── 4 links externos (external_links)
│       └── Junction records
│
└── 📁 assets/
    └── (Imagens e assets estáticos)
```

---

## 🔌 Fluxo de Requisição

```
┌─────────────────────────────────────────────┐
│         CLIENTE (http://localhost:3001)     │
│                                             │
│  ┌──────────────────────────────────────┐   │
│  │  React Component                     │   │
│  │  (AuthForm, DashboardTab, etc)       │   │
│  └──────────────┬───────────────────────┘   │
│                 │ useDecisionLogs()         │
│  ┌──────────────▼───────────────────────┐   │
│  │  React Hook (hooks.ts)               │   │
│  │  - useCreateDecisionLog              │   │
│  │  - useUpdateDecisionLog              │   │
│  │  - useDeleteDecisionLog              │   │
│  │  - etc                               │   │
│  └──────────────┬───────────────────────┘   │
│                 │                           │
│  ┌──────────────▼───────────────────────┐   │
│  │  API Client (client.ts)              │   │
│  │  - fetch('/api/decision-logs')       │   │
│  │  - Headers & Error handling          │   │
│  └──────────────┬───────────────────────┘   │
└─────────────────┼─────────────────────────────┘
                  │ HTTP (JSON)
                  │
        ┌─────────▼──────────┐
        │  http://localhost:3000
        │  BACKEND (Next.js)
        └─────────┬──────────┘
                  │
    ┌─────────────▼──────────────┐
    │  Route Handler             │
    │  app/api/decision-logs/... │
    │  (route.ts)                │
    └─────────────┬──────────────┘
                  │
    ┌─────────────▼──────────────┐
    │  Validation (Zod)          │
    │  lib/schemas.ts            │
    │  - validateRequestBody()   │
    └─────────────┬──────────────┘
                  │
    ┌─────────────▼──────────────┐
    │  Service Layer             │
    │  lib/services/...          │
    │  - Business Logic          │
    │  - Database queries        │
    └─────────────┬──────────────┘
                  │
    ┌─────────────▼──────────────┐
    │  Supabase SDK              │
    │  @supabase/supabase-js     │
    │  - Query builder           │
    │  - RLS enforcement         │
    └─────────────┬──────────────┘
                  │
        ┌─────────▼──────────┐
        │  PostgreSQL DB     │
        │  (Supabase)        │
        │  7 Tabelas         │
        └────────────────────┘
```

---

## 📊 Tabelas do Banco de Dados

### 1. **teams**
```
id (UUID, PK)
name (String)
description (String)
created_at (Timestamp)
updated_at (Timestamp)
```

### 2. **team_members**
```
id (UUID, PK)
team_id (UUID, FK → teams)
name (String)
role (String)
email (String)
created_at (Timestamp)
updated_at (Timestamp)
```

### 3. **decision_logs**
```
id (UUID, PK)
title (String)
project_name (String)
methodology (String)
stage (Enum)
context (Text)
choices (Array)
final_decision (String)
impact (Text)
author (String)
author_role (String)
team_id (UUID, FK → teams)
likes (Integer)
created_at (Timestamp)
updated_at (Timestamp)
```

### 4. **comments**
```
id (UUID, PK)
decision_log_id (UUID, FK → decision_logs)
author_name (String)
author_role (String)
content (Text)
created_at (Timestamp)
```

### 5. **external_links**
```
id (UUID, PK)
platform (String)
url (String)
label (String)
created_at (Timestamp)
```

### 6. **decision_log_external_links** (Junction)
```
decision_log_id (UUID, FK)
external_link_id (UUID, FK)
```

### 7. **decision_log_likes**
```
id (UUID, PK)
decision_log_id (UUID, FK)
user_id (UUID)
created_at (Timestamp)
UNIQUE(decision_log_id, user_id)
```

---

## 📝 Schemas Zod Criados

```typescript
// Decision Log Schemas
DecisionLogCreateSchema      // Validação para criar
DecisionLogUpdateSchema      // Validação para atualizar
DecisionLogActionSchema      // Discriminated union (comment/like)

// Team Schemas
TeamCreateSchema
TeamUpdateSchema

// Team Member Schemas
TeamMemberCreateSchema
TeamMemberUpdateSchema

// Relationship Schemas
ExternalLinkSchema
CommentSchema

// Validation Helpers
validateDecisionLogCreate()
validateDecisionLogUpdate()
validateTeamCreate()
validateDecisionLogAction()
// ... etc
```

---

## 🎣 React Hooks Criados (15 total)

### Decision Logs (7 hooks)
```typescript
useDecisionLogs()           // GET todos
useDecisionLog(id)          // GET um
useCreateDecisionLog()      // POST
useUpdateDecisionLog()      // PUT
useDeleteDecisionLog()      // DELETE
useAddComment()             // POST comment
useToggleLike()             // POST like
```

### Teams (6 hooks)
```typescript
useTeams()                  // GET todos
useTeam(id)                 // GET um
useCreateTeam()             // POST
useUpdateTeam()             // PUT
useDeleteTeam()             // DELETE
useTeamMembers()            // GET membros
```

### Team Members (2+ hooks)
```typescript
useAddTeamMember()          // POST membro
useUpdateTeamMember()       // PUT membro
// ... etc
```

---

## 🔧 Variáveis de Ambiente

### Backend (.env.local) - ✅ JÁ CONFIGURADO
```
NEXT_PUBLIC_SUPABASE_URL=https://nhvvhaycahqzlqxcftum.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_F4k00fmMFUWR_Koap_Xr2w_3XpOUv-0
```

### Frontend (.env) - TEMPLATE
```
VITE_API_URL=http://localhost:3000/api
```

---

## 📦 Dependências Principais

### Backend (377 packages)
```
next@16.2.9
zod@3.24.1
@supabase/supabase-js@2.106.0
typescript@5.8.2
react@19.2.4
react-dom@19.2.4
```

### Frontend (226 packages)
```
react@19.2.4
react-dom@19.2.4
vite@6.4.3
typescript@5.8.2
zod@3.24.1
```

---

## 🚀 Comandos Importantes

```bash
# Setup
cd /workspaces/Sunflower-
npm install                           # Instalar frontend
cd sunflower-app && npm install       # Instalar backend

# Desenvolvimento
npm run dev                            # Frontend (3001)
cd sunflower-app && npm run dev        # Backend (3000)

# Supabase
npx supabase login
npx supabase link --project-ref nhvvhaycahqzlqxcftum
npx supabase db push                  # Aplicar migrations
npx supabase db seed run              # Carregar dados
npx supabase db reset                 # Reset tudo

# Testes
curl http://localhost:3000/api/decision-logs
curl http://localhost:3001            # Frontend
```

---

## ✅ Checklist de Desenvolvimento

- [x] Estrutura de pastas pronta
- [x] Dependências instaladas (603 packages total)
- [x] Backend compilando
- [x] Frontend compilando
- [x] Endpoints definidos (8 total)
- [x] Serviços criados (16+ funções)
- [x] Validação implementada (12+ schemas)
- [x] Hooks React criados (15 total)
- [x] API Client implementado (20+ métodos)
- [x] Banco de dados designado (7 tabelas)
- [x] Documentação escrita (11 arquivos)
- [ ] Migrations aplicadas ← PRÓXIMO
- [ ] Dados carregados
- [ ] Testes executados
- [ ] Deploy realizado

---

## 🎯 Status Final

```
┌────────────────────────────────┐
│    🌻 SUNFLOWER                │
│                                │
│  Frontend: ✅ Pronto           │
│  Backend:  ✅ Pronto           │
│  Database: 🟡 Schema pronto    │
│  Docs:     ✅ Completa         │
│                                │
│  Próximo: Aplicar migrations   │
│  Tempo: 7 minutos              │
└────────────────────────────────┘
```

**Status**: 🟢 Pronto para desenvolvimento!

---

Criado com ❤️ para o Sunflower Project
