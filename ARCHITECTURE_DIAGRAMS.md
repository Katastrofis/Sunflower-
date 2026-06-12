# 📊 Diagramas de Arquitetura - Sunflower

## 1. Arquitetura Geral

```
┌─────────────────────────────────────────────────────────────┐
│                     SUNFLOWER PLATFORM                       │
└─────────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
   ┌─────────┐       ┌──────────┐      ┌──────────┐
   │ React   │       │ Next.js  │      │ Supabase │
   │ Vite    │       │ Backend  │      │  Auth    │
   │ Port    │       │ Port     │      │ Realtime │
   │ 5173    │       │ 3000     │      │  RLS     │
   └─────────┘       └──────────┘      └──────────┘
        │                   │                   │
        └───────────────────┼───────────────────┘
                            │
                    ┌───────▼────────┐
                    │ PostgreSQL DB  │
                    │ (Supabase)     │
                    └────────────────┘
```

## 2. Fluxo de Dados

```
┌──────────────────────────────────────────────────────────────┐
│                    USUÁRIO FRONTEND                          │
└──────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌──────────────────────────────────────────────────────────────┐
│              COMPONENTE REACT                                │
│  (ex: DecisionsList.tsx)                                     │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ useDecisionLogs() or decisionLogsAPI.getAll()        │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
                            │
                            ▼ HTTP/JSON
┌──────────────────────────────────────────────────────────────┐
│             NEXT.JS API ROUTE HANDLER                        │
│  (ex: app/api/decision-logs/route.ts)                        │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ GET /api/decision-logs                              │   │
│  │ ├─ Validação de query params                        │   │
│  │ └─ Chamada ao serviço                               │   │
│  └─────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌──────────────────────────────────────────────────────────────┐
│              SERVIÇO DE LÓGICA                               │
│  (ex: lib/services/decision-logs.ts)                         │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ getDecisionLogs(teamId?)                            │   │
│  │ ├─ Criar query com Supabase                         │   │
│  │ ├─ Aplicar filtros se necessário                   │   │
│  │ └─ Retornar resultados com relacionamentos         │   │
│  └─────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────┘
                            │
                            ▼ SQL
┌──────────────────────────────────────────────────────────────┐
│              SUPABASE CLIENT SDK                             │
│  (@supabase/supabase-js)                                     │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ supabase                                            │   │
│  │   .from('decision_logs')                            │   │
│  │   .select('*, comments(*), external_links(*)')      │   │
│  │   .order('created_at')                              │   │
│  └─────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌──────────────────────────────────────────────────────────────┐
│           POSTGRESQL DATABASE                                │
│  (Supabase)                                                  │
│                                                              │
│  Tables:                                                     │
│  ├─ decision_logs                                           │
│  ├─ comments                                                │
│  ├─ external_links                                          │
│  ├─ teams                                                   │
│  ├─ team_members                                            │
│  ├─ decision_log_external_links (FK)                        │
│  └─ decision_log_likes (FK)                                 │
└──────────────────────────────────────────────────────────────┘
```

## 3. Estrutura de Tabelas e Relacionamentos

```
┌──────────────────┐
│     teams        │
├──────────────────┤
│ id (PK)          │
│ name             │
│ description      │
│ created_at       │
└────────┬─────────┘
         │ 1:N
         │
    ┌────▼──────────────┐
    │  team_members     │
    ├───────────────────┤
    │ id (PK)           │
    │ team_id (FK)      │
    │ name              │
    │ role              │
    │ email             │
    │ created_at        │
    └───────────────────┘


┌──────────────────────────────┐
│     decision_logs            │
├──────────────────────────────┤
│ id (PK)                      │
│ title                        │
│ project_name                 │
│ methodology                  │
│ stage                        │
│ context                      │
│ choices (array)              │
│ final_decision               │
│ impact                       │
│ author                       │
│ team_id (FK, nullable)       │
│ likes (count)                │
│ created_at / updated_at      │
└────────┬──────────┬──────────┘
         │1:N       │1:N
         │          │
    ┌────▼─────┐ ┌──▼──────────────┐
    │ comments  │ │ decision_log_   │
    ├───────────┤ │   external_     │
    │ id (PK)   │ │   links (MN)    │
    │ ...       │ ├─────────────────┤
    │ content   │ │ decision_log_id │
    │ created_at│ │ external_link_id│
    └───────────┘ └─────────┬───────┘
                            │
                       ┌────▼──────────┐
                       │external_links │
                       ├───────────────┤
                       │ id (PK)       │
                       │ platform      │
                       │ url           │
                       │ label         │
                       │ created_at    │
                       └───────────────┘
```

## 4. Fluxo de CRUD Decision Logs

```
┌─────────────────────────────────────────────────────────────┐
│                    CREATE                                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  POST /api/decision-logs                                    │
│  ├─ Validar com Zod schema                                 │
│  ├─ Criar external_links se fornecidos                     │
│  ├─ Inserir em decision_logs                               │
│  ├─ Criar junction records (decision_log_external_links)   │
│  └─ Retornar decision_log completo                         │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    READ                                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  GET /api/decision-logs                                     │
│  ├─ Selecionar de decision_logs                            │
│  ├─ Incluir comments relacionados                          │
│  ├─ Incluir external_links relacionados                    │
│  ├─ Filtrar por team_id (opcional)                         │
│  └─ Ordenar por created_at DESC                            │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    UPDATE                                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  PUT /api/decision-logs?id=uuid                             │
│  ├─ Validar com Zod schema (partial)                       │
│  ├─ Atualizar campos permitidos                            │
│  ├─ Atualizar updated_at                                   │
│  └─ Retornar decision_log atualizado                       │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    DELETE                                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  DELETE /api/decision-logs?id=uuid                          │
│  ├─ Deletar comments (ON CASCADE)                           │
│  ├─ Deletar junction records (ON CASCADE)                   │
│  ├─ Deletar decision_log                                   │
│  └─ Retornar { success: true }                             │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 5. Fluxo de Comentários e Likes

```
┌──────────────────────────────────────────────────────────────┐
│              ADICIONAR COMENTÁRIO                            │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  POST /api/decision-logs/[id]                               │
│  {                                                          │
│    "action": "comment",                                     │
│    "author_name": "João",                                   │
│    "author_role": "Designer",                               │
│    "content": "Ótima decisão!"                              │
│  }                                                          │
│  ├─ Validar com Zod DecisionLogActionSchema               │
│  ├─ Inserir em comments table                              │
│  ├─ Retornar comment criado                                │
│  └─ Status: 201 Created                                    │
│                                                              │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│              TOGGLE LIKE                                     │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  POST /api/decision-logs/[id]                               │
│  {                                                          │
│    "action": "like",                                        │
│    "userId": "user-123"                                     │
│  }                                                          │
│                                                              │
│  Se já gostou (unlike):                                    │
│  ├─ Deletar de decision_log_likes                          │
│  ├─ Decrementar likes count                                │
│  └─ Retornar { liked: false, likes: X }                    │
│                                                              │
│  Se não gostou (like):                                     │
│  ├─ Inserir em decision_log_likes                          │
│  ├─ Incrementar likes count                                │
│  └─ Retornar { liked: true, likes: X }                     │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

## 6. Estrutura de Pastas e Dependências

```
sunflower-app/
│
├── app/
│   └── api/
│       ├── decision-logs/
│       │   ├── route.ts ────────┐
│       │   └── [id]/route.ts    │
│       │                        │
│       └── teams/               │   Importam →
│           ├── route.ts         │
│           └── [id]/members/... │
│                                │
├── lib/                         │
│   ├── services/                │
│   │   ├── decision-logs.ts ◄───┤
│   │   └── teams.ts ◄───────────┤
│   │                            │
│   ├── schemas.ts ◄─────────────┤
│   └── api-utils.ts ◄───────────┘
│
└── Supabase Client SDK
    └── (Importado em services/)
```

## 7. Fluxo de Validação

```
┌────────────────────────────────────────────────────┐
│         REQUEST COM JSON BODY                      │
└────────────────┬─────────────────────────────────┘
                 │
                 ▼
┌────────────────────────────────────────────────────┐
│    API ROUTE HANDLER                               │
│    ├─ Ler request body                            │
│    └─ Chamar validateRequestBody()                │
└────────────────┬─────────────────────────────────┘
                 │
                 ▼
┌────────────────────────────────────────────────────┐
│    ZOD SCHEMA VALIDATION                           │
│    ├─ Checar tipos                                │
│    ├─ Validar formato                             │
│    ├─ Verificar constraints                       │
│    └─ Retornar SafeParseResult                    │
└────────────────┬─────────────────────────────────┘
                 │
        ┌────────┴────────┐
        │                 │
        ▼                 ▼
    ┌────────┐       ┌─────────┐
    │ ERRO   │       │ VÁLIDO  │
    ├────────┤       ├─────────┤
    │ 400    │       │ 200/201 │
    │ JSON   │       │ Processa│
    │ erros  │       │ e salva │
    └────────┘       └─────────┘
```

---

**Última atualização:** 2024-01-15
