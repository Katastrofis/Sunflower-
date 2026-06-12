## Dependências Necessárias

### ✅ Já instaladas

**Next.js (`sunflower-app/package.json`):**
- ✅ `next` - ^16.2.9
- ✅ `@supabase/ssr` - ^0.12.0
- ✅ `@supabase/supabase-js` - ^2.108.1
- ✅ `react` - 19.2.4
- ✅ `typescript` - ^5

**React/Vite (`package.json`):**
- ✅ `@supabase/supabase-js` - ^2.108.1
- ✅ `react` - ^19.0.1
- ✅ `vite` - ^6.2.3
- ✅ `typescript` - ~5.8.2

### ⚠️ Precisa Instalar

**Para Validação (Recomendado):**
```bash
cd sunflower-app
npm install zod
```

**Para Desenvolvimento (Opcional mas Recomendado):**
```bash
npm install -D @types/node @types/react @types/react-dom
```

### 🆘 Se Tiver Problemas de Dependência

```bash
# Limpar cache
npm cache clean --force

# Reinstalar
cd sunflower-app
rm -rf node_modules package-lock.json
npm install

cd ..
rm -rf node_modules package-lock.json
npm install
```

---

## Versões Recomendadas

| Ferramenta | Versão | Link |
|-----------|--------|------|
| Node.js | 18.17+ ou 20+ | https://nodejs.org |
| npm | 9+ | Incluso no Node.js |
| Docker | Latest | https://www.docker.com (para Supabase) |
| Supabase CLI | Latest | `npm install -g @supabase/cli` |

---

## Verificar Instalação

```bash
# Node.js
node --version

# npm
npm --version

# Supabase CLI
supabase --version

# Verificar dependências instaladas
cd sunflower-app
npm list

cd ..
npm list
```

---

**Última atualização:** 2024-01-15
