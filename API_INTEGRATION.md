# Sunflower - Integração com Supabase

## 📋 Visão Geral

Esta documentação descreve a integração completa do Sunflower com Supabase, incluindo schema de banco de dados, endpoints API e exemplo de uso.

## 🗄️ Estrutura do Banco de Dados

### Tabelas Principais

#### `teams`
Representa um time/equipe de trabalho.

```sql
- id (UUID) - PK
- name (TEXT) - Nome do time
- description (TEXT) - Descrição
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### `team_members`
Membros de um time.

```sql
- id (UUID) - PK
- team_id (UUID) - FK para teams
- name (TEXT) - Nome do membro
- role (TEXT) - Cargo/papel
- email (TEXT) - Email do membro
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### `decision_logs`
Registro de decisões de design.

```sql
- id (UUID) - PK
- title (TEXT) - Título da decisão
- project_name (TEXT) - Nome do projeto
- methodology (TEXT) - Metodologia usada (Double Diamond, Design Thinking, Lean UX, Personalizada)
- stage (TEXT) - Estágio do projeto (Descoberta, Definição, Ideação, Prototipação)
- context (TEXT) - Contexto/problema
- choices (TEXT[]) - Opções avaliadas
- final_decision (TEXT) - Decisão final e justificativa
- impact (TEXT) - Impacto (baixo, médio, alto)
- author (TEXT) - Autor
- author_role (TEXT) - Papel do autor
- team_id (UUID) - FK para teams (opcional)
- likes (INTEGER) - Número de likes
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### `comments`
Comentários em registros de decisão.

```sql
- id (UUID) - PK
- decision_log_id (UUID) - FK para decision_logs
- author_name (TEXT) - Nome do autor
- author_role (TEXT) - Papel do autor
- content (TEXT) - Conteúdo do comentário
- created_at (TIMESTAMP)
```

#### `external_links`
Links externos (Figma, Behance, etc).

```sql
- id (UUID) - PK
- platform (TEXT) - Plataforma (behance, instagram, linkedin, github, figma, other)
- url (TEXT) - URL do link
- label (TEXT) - Rótulo/descrição
- created_at (TIMESTAMP)
```

#### `decision_log_external_links`
Associação entre decision_logs e external_links.

```sql
- decision_log_id (UUID) - FK
- external_link_id (UUID) - FK
- PK (decision_log_id, external_link_id)
```

#### `decision_log_likes`
Rastreamento de likes por usuário.

```sql
- id (UUID) - PK
- decision_log_id (UUID) - FK
- user_id (TEXT) - ID do usuário
- created_at (TIMESTAMP)
- UNIQUE (decision_log_id, user_id)
```

## 🔌 Endpoints API

### Decision Logs

#### GET /api/decision-logs
Retorna todos os registros de decisão (opcionalmente filtrados por time).

**Query Parameters:**
- `teamId` (opcional) - Filtrar por time
- `id` (opcional) - Retornar específico por ID

**Response:**
```json
[
  {
    "id": "uuid",
    "title": "Escolha de framework",
    "project_name": "Projeto A",
    "methodology": "Design Thinking",
    "stage": "Definição",
    "context": "Necessário escolher framework...",
    "choices": ["React", "Vue", "Svelte"],
    "final_decision": "React foi escolhido por...",
    "impact": "alto",
    "author": "João Silva",
    "author_role": "Lead Designer",
    "likes": 5,
    "comments": [...],
    "external_links": [...],
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  }
]
```

#### POST /api/decision-logs
Cria novo registro de decisão.

**Request Body:**
```json
{
  "title": "Escolha de framework",
  "project_name": "Projeto A",
  "methodology": "Design Thinking",
  "stage": "Definição",
  "context": "Necessário escolher framework...",
  "choices": ["React", "Vue", "Svelte"],
  "final_decision": "React foi escolhido por...",
  "impact": "alto",
  "author": "João Silva",
  "author_role": "Lead Designer",
  "team_id": "uuid (opcional)",
  "external_links": [
    {
      "platform": "figma",
      "url": "https://figma.com/...",
      "label": "Protótipo"
    }
  ]
}
```

#### PUT /api/decision-logs
Atualiza registro de decisão.

**Query Parameters:**
- `id` - ID do registro a atualizar

**Request Body:** (campos parciais)
```json
{
  "title": "Novo título",
  "final_decision": "Nova decisão..."
}
```

#### DELETE /api/decision-logs
Remove registro de decisão.

**Query Parameters:**
- `id` - ID do registro a remover

### Decision Log Actions

#### POST /api/decision-logs/[id]
Adiciona comentário ou likes em um registro.

**Request Body - Adicionar Comentário:**
```json
{
  "action": "comment",
  "author_name": "Maria Silva",
  "author_role": "Designer",
  "content": "Ótima decisão!"
}
```

**Request Body - Toggle Like:**
```json
{
  "action": "like",
  "userId": "user-123"
}
```

**Response:**
```json
{
  "id": "uuid",
  "author_name": "Maria Silva",
  "author_role": "Designer",
  "content": "Ótima decisão!",
  "created_at": "2024-01-15T11:00:00Z"
}
```

### Teams

#### GET /api/teams
Retorna todos os times.

**Query Parameters:**
- `id` (opcional) - Retornar time específico

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "Design System",
    "description": "Time responsável pelo design system",
    "team_members": [...],
    "created_at": "2024-01-01T10:00:00Z",
    "updated_at": "2024-01-01T10:00:00Z"
  }
]
```

#### POST /api/teams
Cria novo time.

**Request Body:**
```json
{
  "name": "Design System",
  "description": "Time responsável pelo design system"
}
```

#### PUT /api/teams
Atualiza time.

**Query Parameters:**
- `id` - ID do time a atualizar

**Request Body:**
```json
{
  "name": "Design System v2",
  "description": "Descrição atualizada"
}
```

#### DELETE /api/teams
Remove time.

**Query Parameters:**
- `id` - ID do time a remover

### Team Members

#### GET /api/teams/[id]/members
Retorna membros de um time.

#### POST /api/teams/[id]/members
Adiciona membro ao time.

**Request Body:**
```json
{
  "name": "João Silva",
  "role": "Senior Designer",
  "email": "joao@example.com"
}
```

#### PUT /api/teams/[id]/members
Atualiza membro do time.

**Query Parameters:**
- `memberId` - ID do membro a atualizar

**Request Body:**
```json
{
  "name": "João Silva Jr",
  "role": "Lead Designer"
}
```

#### DELETE /api/teams/[id]/members
Remove membro do time.

**Query Parameters:**
- `memberId` - ID do membro a remover

## 💻 Exemplos de Uso

### Frontend (React/Vite)

#### Arquivo de cliente API
Ver [src/api/client.ts](../src/api/client.ts)

#### Usando em componentes

```typescript
import { decisionLogsAPI, teamsAPI } from '@/api/client';
import { useEffect, useState } from 'react';

export function DecisionLogsList() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    decisionLogsAPI.getAll()
      .then(setLogs)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Carregando...</div>;

  return (
    <div>
      {logs.map(log => (
        <div key={log.id}>
          <h3>{log.title}</h3>
          <p>{log.context}</p>
          <button onClick={() => decisionLogsAPI.toggleLike(log.id, 'user-123')}>
            Like ({log.likes})
          </button>
        </div>
      ))}
    </div>
  );
}
```

### Criar novo registro

```typescript
const newLog = await decisionLogsAPI.create({
  title: 'Escolha de core web vitals',
  project_name: 'Performance Sprint',
  methodology: 'Lean UX',
  stage: 'Prototipação',
  context: 'Melhorar performance da aplicação',
  choices: ['Otimizar imagens', 'Code splitting', 'CDN'],
  final_decision: 'Implementar todas as estratégias',
  impact: 'alto',
  author: 'Ana Costa',
  author_role: 'Performance Engineer',
  external_links: [
    {
      platform: 'figma',
      url: 'https://figma.com/file/xxx',
      label: 'Design specs'
    }
  ]
});
```

### Gerenciar times

```typescript
// Criar time
const team = await teamsAPI.create({
  name: 'UX Research',
  description: 'Time de pesquisa de UX'
});

// Adicionar membro
const member = await teamsAPI.addMember(team.id, {
  name: 'Carlos Mendez',
  role: 'UX Researcher',
  email: 'carlos@example.com'
});

// Obter membros
const members = await teamsAPI.getMembers(team.id);
```

## 🔒 Row Level Security (RLS)

Todas as tabelas têm RLS habilitado com as seguintes políticas:

- **Leitura pública:** Qualquer um pode ler decision_logs, comments, external_links e team_members
- **Escrita autenticada:** Apenas usuários autenticados podem criar/atualizar/deletar

As políticas devem ser ajustadas conforme as necessidades de segurança específicas da aplicação.

## 🚀 Instalação e Setup

### 1. Inicializar banco de dados local

```bash
cd supabase
supabase start
```

### 2. Aplicar migrations

```bash
supabase db push
```

### 3. Variáveis de ambiente

**Para React (Vite):**
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_API_URL=http://localhost:3000/api
```

**Para Next.js:**
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
```

### 4. Iniciar desenvolvimento

```bash
# Terminal 1 - Backend Next.js
cd sunflower-app
npm run dev

# Terminal 2 - Frontend React/Vite
npm run dev
```

## 📚 Estrutura de pastas

```
project/
├── supabase/
│   ├── migrations/
│   │   └── 001_create_tables.sql
│   └── config.toml
├── sunflower-app/ (Next.js)
│   ├── app/
│   │   └── api/
│   │       ├── decision-logs/
│   │       │   ├── route.ts
│   │       │   └── [id]/route.ts
│   │       └── teams/
│   │           ├── route.ts
│   │           └── [id]/members/route.ts
│   └── lib/
│       └── services/
│           ├── decision-logs.ts
│           └── teams.ts
└── src/ (React/Vite)
    └── api/
        └── client.ts
```

## 🔄 Fluxo de dados

```
React Component
    ↓
API Client (src/api/client.ts)
    ↓
Next.js Route Handler (app/api/*)
    ↓
Service Layer (lib/services/*)
    ↓
Supabase Client
    ↓
PostgreSQL Database
```

## ⚠️ Notas Importantes

1. **RLS Policies:** As políticas atuais são permissivas. Ajustar conforme necessário para produção.
2. **Autenticação:** Implementar autenticação real (Auth0, Supabase Auth, etc.) para produção.
3. **Validação:** Adicionar validação de entrada em todos os endpoints.
4. **Tratamento de erros:** Implementar tratamento robusto de erros no frontend.
5. **Paginação:** Para larga escala, adicionar suporte a paginação nos endpoints GET.

## 📖 Referências

- [Documentação Supabase](https://supabase.com/docs)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [React + TypeScript](https://react-typescript-cheatsheet.netlify.app/)
