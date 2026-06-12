# 🌻 Sunflower - Guia Rápido de Início

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Arquitetura](#arquitetura)
3. [Setup Rápido](#setup-rápido)
4. [Estrutura de Pastas](#estrutura-de-pastas)
5. [Endpoints Principais](#endpoints-principais)
6. [Exemplos de Uso](#exemplos-de-uso)

## 🎯 Visão Geral

**Sunflower** é uma plataforma colaborativa para documentar e compartilhar decisões de design. A integração com Supabase fornece:

- ✅ Backend em Next.js com API REST
- ✅ Banco de dados PostgreSQL (via Supabase)
- ✅ Frontend em React/Vite
- ✅ Tipos TypeScript completos
- ✅ Hooks React para fácil integração
- ✅ Autenticação e RLS pronto

## 🏗️ Arquitetura

```
┌─────────────────────────────────────┐
│     React/Vite Frontend             │
│  (src/components, src/api/hooks)    │
└────────────────┬────────────────────┘
                 │
                 ▼ HTTP
┌─────────────────────────────────────┐
│     Next.js Backend                 │
│  (app/api/*, lib/services/*)        │
└────────────────┬────────────────────┘
                 │
                 ▼ SDK
┌─────────────────────────────────────┐
│     Supabase (PostgreSQL)           │
│  (Database + Auth + RLS)            │
└─────────────────────────────────────┘
```

## 🚀 Setup Rápido

### 1️⃣ Clonar/Preparar projeto

```bash
cd /workspaces/Sunflower-
```

### 2️⃣ Instalar dependências

```bash
# Backend (Next.js)
cd sunflower-app
npm install
cd ..

# Frontend (React)
npm install
```

### 3️⃣ Iniciar Supabase local

```bash
# Instalar CLI (se não tiver)
npm install -g @supabase/cli

# Iniciar containers
supabase start
```

Você verá:
```
Started supabase local development setup.

API URL: http://127.0.0.1:54321
DB URL: postgresql://postgres:postgres@127.0.0.1:54322/postgres
Studio URL: http://127.0.0.1:54323
```

### 4️⃣ Aplicar migrations

```bash
supabase db push
```

### 5️⃣ (Opcional) Carregar dados de exemplo

```bash
supabase db reset
```

### 6️⃣ Configurar variáveis de ambiente

**Arquivo: `sunflower-app/.env.local`**
```
NEXT_PUBLIC_SUPABASE_URL=https://nhvvhaycahqzlqxcftum.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_F4k00fmMFUWR_Koap_Xr2w_3XpOUv-0
```

Já está preenchido! Se precisar de local, use URLs do `supabase start`.

**Arquivo: `.env` (React)**
```
VITE_SUPABASE_URL=http://127.0.0.1:54321
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_API_URL=http://localhost:3000/api
```

### 7️⃣ Iniciar em desenvolvimento

```bash
# Terminal 1 - Backend Next.js (porta 3000)
cd sunflower-app
npm run dev

# Terminal 2 - Frontend React/Vite (porta 5173)
npm run dev

# Terminal 3 (opcional) - Supabase Studio
# Abrir http://127.0.0.1:54323
```

## 📁 Estrutura de Pastas

```
Sunflower-/
│
├── src/                              # React Frontend
│   ├── api/
│   │   ├── client.ts                 # Cliente HTTP para API
│   │   └── hooks.ts                  # React hooks
│   ├── components/
│   │   ├── AuthForm.tsx
│   │   ├── DashboardTab.tsx
│   │   └── DocsTab.tsx
│   ├── App.tsx
│   └── main.tsx
│
├── sunflower-app/                    # Next.js Backend
│   ├── app/
│   │   ├── api/
│   │   │   ├── decision-logs/
│   │   │   │   ├── route.ts          # CRUD decision logs
│   │   │   │   └── [id]/route.ts     # Comments & likes
│   │   │   └── teams/
│   │   │       ├── route.ts          # CRUD teams
│   │   │       └── [id]/members/route.ts  # Team members
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── lib/
│       └── services/
│           ├── decision-logs.ts      # Lógica de decision logs
│           └── teams.ts              # Lógica de teams
│
├── supabase/
│   ├── migrations/
│   │   └── 001_create_tables.sql     # Schema do banco
│   ├── seed.sql                      # Dados de exemplo
│   └── config.toml                   # Config Supabase
│
├── API_INTEGRATION.md                # Docs completa da API
├── TESTING_GUIDE.md                  # Guia de testes
└── IMPLEMENTATION_SUMMARY.md         # Resumo implementação
```

## 🔌 Endpoints Principais

### Decision Logs
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/decision-logs` | Lista logs |
| GET | `/api/decision-logs?id=uuid` | Log específico |
| POST | `/api/decision-logs` | Criar novo |
| PUT | `/api/decision-logs?id=uuid` | Atualizar |
| DELETE | `/api/decision-logs?id=uuid` | Deletar |
| POST | `/api/decision-logs/[id]` | Comentar/Like |

### Teams
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/teams` | Lista times |
| POST | `/api/teams` | Criar novo |
| PUT | `/api/teams?id=uuid` | Atualizar |
| DELETE | `/api/teams?id=uuid` | Deletar |
| GET | `/api/teams/[id]/members` | Membros |
| POST | `/api/teams/[id]/members` | Adicionar membro |

## 💻 Exemplos de Uso

### 1. Usar no React com Hooks

```tsx
import { useDecisionLogs, useAddComment } from '@/api/hooks';
import { useEffect } from 'react';

export function DecisionsList() {
  const { logs, loading, fetchLogs } = useDecisionLogs();
  const { addComment } = useAddComment();

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
            <p>👍 {log.likes} likes</p>
            <button onClick={() => addComment(log.id, {
              author_name: 'Você',
              author_role: 'Designer',
              content: 'Ótima decisão!'
            })}>
              Comentar
            </button>
          </div>
        ))
      )}
    </div>
  );
}
```

### 2. Usar API Client diretamente

```typescript
import { decisionLogsAPI } from '@/api/client';

// Criar novo log
const newLog = await decisionLogsAPI.create({
  title: 'Escolha de Framework',
  project_name: 'Portal 2024',
  methodology: 'Design Thinking',
  stage: 'Definição',
  context: 'Necessário framework moderno...',
  choices: ['React', 'Vue', 'Svelte'],
  final_decision: 'React escolhido pela comunidade',
  impact: 'alto',
  author: 'Ana Silva',
  author_role: 'Design Lead'
});

console.log('Criado:', newLog.id);

// Dar like
const result = await decisionLogsAPI.toggleLike(newLog.id, 'user-123');
console.log('Likes:', result.likes);
```

### 3. Testar com cURL

```bash
# Listar todos
curl http://localhost:3000/api/decision-logs

# Criar novo
curl -X POST http://localhost:3000/api/decision-logs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Teste",
    "project_name": "Projeto",
    "methodology": "Design Thinking",
    "stage": "Definição",
    "context": "Contexto",
    "choices": ["A", "B"],
    "final_decision": "Escolhemos A",
    "impact": "médio",
    "author": "You",
    "author_role": "Engineer"
  }'

# Obter específico
curl "http://localhost:3000/api/decision-logs?id=<UUID>"

# Adicionar comentário
curl -X POST "http://localhost:3000/api/decision-logs/<UUID>" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "comment",
    "author_name": "João",
    "author_role": "Designer",
    "content": "Concordo!"
  }'

# Dar like
curl -X POST "http://localhost:3000/api/decision-logs/<UUID>" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "like",
    "userId": "user-123"
  }'
```

## 📚 Documentação Detalhada

- 📖 [API_INTEGRATION.md](API_INTEGRATION.md) - Documentação completa dos endpoints
- 🧪 [TESTING_GUIDE.md](TESTING_GUIDE.md) - Guia com exemplos de teste
- 📋 [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) - Resumo técnico

## 🆘 Troubleshooting

### Erro: "Connection refused" ao conectar Supabase

```bash
# Verificar se Supabase está rodando
supabase status

# Se não, iniciar
supabase start
```

### Erro: "Table not found"

```bash
# Aplicar migrations
supabase db push

# Ou resetar e carregar seed
supabase db reset
```

### Erro: CORS ao chamar API

Verifique `.env` - `VITE_API_URL` deve estar correto:
```
VITE_API_URL=http://localhost:3000/api
```

### Port 3000 já está em uso

```bash
# Usar porta diferente
cd sunflower-app
npm run dev -- -p 3001
```

## 🔑 Variáveis de Ambiente Necessárias

### Next.js (`sunflower-app/.env.local`)
```
NEXT_PUBLIC_SUPABASE_URL=seu_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sua_chave
```

### React (`.env`)
```
VITE_SUPABASE_URL=seu_url
VITE_SUPABASE_ANON_KEY=sua_chave
VITE_API_URL=http://localhost:3000/api
```

## ✅ Checklist de Setup

- [ ] Dependências instaladas (`npm install`)
- [ ] Supabase iniciado (`supabase start`)
- [ ] Migrations aplicadas (`supabase db push`)
- [ ] Dados de exemplo carregados (`supabase db reset`)
- [ ] Variáveis de ambiente configuradas
- [ ] Backend rodando (`npm run dev` em `sunflower-app`)
- [ ] Frontend rodando (`npm run dev`)
- [ ] Supabase Studio acessível (http://127.0.0.1:54323)

## 🚀 Próximos Passos

1. **Implementar Autenticação**
   - Setup Supabase Auth
   - Adicionar login/logout

2. **Adicionar Validação**
   - Integrar Zod para validação
   - Melhorar tratamento de erros

3. **Melhorar UX**
   - Adicionar loading states
   - Otimistas updates
   - Toast notifications

4. **Testes**
   - Testes unitários (Vitest)
   - Testes E2E (Playwright)

5. **Deploy**
   - Deploy backend (Vercel)
   - Deploy frontend (Vercel/Netlify)
   - Setup CI/CD (GitHub Actions)

## 📞 Suporte

Para dúvidas ou problemas:
1. Consultar [API_INTEGRATION.md](API_INTEGRATION.md)
2. Ver exemplos em [TESTING_GUIDE.md](TESTING_GUIDE.md)
3. Revisar [Documentação Supabase](https://supabase.com/docs)

---

**Criado em:** 2024-01-15
**Última atualização:** 2024-01-15
**Status:** ✅ Pronto para desenvolvimento
