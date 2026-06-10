/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SpecSection {
  id: string;
  title: string;
  subtitle: string;
  category: "arquitetura" | "dados" | "features" | "fluxos" | "design" | "seguranca" | "tech";
  markdown: string;
}

export const specSections: SpecSection[] = [
  {
    id: "arch-1",
    title: "1. Arquitetura Conceitual",
    subtitle: "Estrutura geral de módulos e relacionamento cliente-servidor",
    category: "arquitetura",
    markdown: `A plataforma **sunflower** foi desenhada sob um modelo arquitetural leve e modular, otimizada para evitar sobrecarga de armazenamento de ativos e focada totalmente na facilitação do diálogo de decisões críticas.

### Visão Geral dos Módulos Principais:
* **Módulo de Catalogação (Log Generator):** Motor onde o designer insere os dados estruturados baseando-se em metodologias existentes (Double Diamond, Design Thinking, etc.).
* **Fórum de Discussão (Community Feed):** Um barramento social assíncrono que reúne os projetos públicos e permite interação espontânea entre times e designers espectadores.
* **Espaço de Times (Collaboration Hub):** Gerenciador de espaços de trabalho para alinhar membros e sincronizar as restrições e visões nos projetos comuns.
* **Motor de Relatórios (PDF & Print compiler):** Compilador cliente-servidor que reúne e normaliza as tomadas de decisões cronologicamente em um blueprint legível e portável.

### FLUXO DE COMPONENTES sunflower:
\`\`\`
[ DESIGNER CLIENT ] 
      │ 
      ├─► [ Cataloga Decisões ] ───► [ Validação de Links Externos ] (Favicon / Preview Metadata)
      ├─► [ Cria/Gerencia Times ] ───► [ Sincroniza Workspace ]
      └─► [ Gera Relatórios ] ─────► [ PDF / Impressão Local ] (Layout limpo, WCAG AAA)
      
[ SERVER SIDE REGISTRY ] (Leve, ágil)
      │
      ├─► Controle de Referências Seguras (HTTPS Link Checker)
      ├─► Estrutura de dados relacional pura (Tabelas de metadados de projetos e logs)
      └─► Sem armazenamento de arquivos binários (Portfólios externos permanecem no Behance/Figma)
\`\`\``
  },
  {
    id: "data-2",
    title: "2. Estrutura de Dados Estratégica",
    subtitle: "Diferenciação clara entre persistência interna e referências externas",
    category: "dados",
    markdown: `Para honrar a diretriz de **não funcionar como banco de dados de arquivos**, a modelagem preserva apenas dados textuais, relacionais estruturados e ponteiros seguros.

### O Que É Armazenado (Banco de Dados sunflower):
1. **Perfil do Usuário:** ID exclusivo, nome completo, cargo/especialidade e e-mail único.
2. **Registro de Decisão (DecisionLog):**
   * ID único, título, nome do projeto.
   * Tipo da metodologia (ex: Double Diamond, Design Thinking).
   * Etapa metodológica ativa.
   * Painel de contexto do problema (textual).
   * Lista de opções estruturadas avaliadas.
   * Conclusão fundamentada e impacto esperado.
   * Carimbos de data/hora, likes e contador.
3. **Comentários (Comments):** Instância de feedback em árvore ligada à decisão (autor, conteúdo, timestamp).
4. **Relacionamento de Time:** ID do time, listagem de ID dos membros, funções autorizadas.

### O Que É Apenas Referenciado (Sem Armazenamento de Arquivos):
* **Ativos Visuais e Protótipos:** Links diretos com protocolo HTTPS (Figma, Behance, GitHub, Instagram, etc.).
* **Arquivos de Especificação:** Links ativos de armazenamento em nuvem externa administrada pelo usuário (Drive, Dropbox). No sunflower, apenas armazenamos a URL ativa, a plataforma atua como um coordenador de inteligência de processos criativos.`
  },
  {
    id: "feat-3",
    title: "3. Priorização de Funcionalidades",
    subtitle: "Matriz de prioridade (Impacto vs Esforço) para o roadmap de desenvolvimento",
    category: "features",
    markdown: `Para o MVP da plataforma sunflower, desenhamos a seguinte prioridade estratégica de entrega:

| Feature | Prioridade | Impacto | Esforço | Descrição |
| :--- | :--- | :--- | :--- | :--- |
| **Catalogador de Decisão** | Alta (P0) | Crítico | Médio | Criação de logs estruturados de decisão com as fases das metodologias tradicionais. |
| **Visualizador de Times** | Alta (P0) | Alto | Baixo-Médio | Criação de grupos e compartilhamento de visões sobre relatórios e projetos ativos. |
| **Integração de Links** | Alta (P0) | Crítico | Baixo | Adição e validação sintática das URLs externas dos portfólios existentes. |
| **Geração de Relatórios** | Média (P1) | Alto | Médio | Exportação de documentos dinâmicos limpos em formato PDF/A4. |
| **Comentários e Likes** | Média (P1) | Médio | Baixo-Médio | Engajamento social para validação e fomento de caminhos criativos da comunidade. |
| **Painel de Descoberta** | Baixa (P2) | Médio | Alto | Feed avançado com inteligência de busca por tipo de decisão ou problema similar. |`
  },
  {
    id: "flow-4",
    title: "4. Fluxos de Interação Core",
    subtitle: "Processos passo a passo para as ações principais do usuário",
    category: "fluxos",
    markdown: `### A. Documentar Decisão Estratégica:
1. Designer clica em **"Nova Decisão"** no painel central.
2. Seleciona o Projeto ativo e escolhe a Metodologia (ex. *Double Diamond*).
3. Seleciona a Etapa Metodológica atual (*ex. Descoberta / Divergência*).
4. Descreve o desafio encontrado (O Contexto).
5. Cria itens para as opções avaliadas (Cenário A vs Cenário B).
6. Registra a resposta final e o impacto.
7. Insere links externos relacionados (Behance, Figma, etc.).
8. Envia para publicação (Lança no Fórum Público ou restringe ao Time privado).

### B. Criação de Times e Convites:
1. Usuário acessa o painel de **"Meu Time"**.
2. Seleciona **"Criar Nova Equipe"** e dita o foco.
3. Insere o e-mail de designers parceiros.
4. O sistema gera um link de convite dinâmico associado ao workspace do time.
5. Membros aceitam o convite, ganhando visualização mútua e direito de auditar/comentar as decisões do workspace do time virtualizado.

### C. Geração de Relatórios Compilados:
1. Líder do Projeto clica no botão **"Gerar Relatório de Decisões"**.
2. O compile-engine puxa todas as instâncias cronológicas de decisões do projeto.
3. Formata em layout estático, limpo, de alto contraste (Inter Font, sem ruídos ornamentais).
4. Ativa botões rápidos de impressão universal nativa no navegador (Print para Salvar como PDF).`
  },
  {
    id: "design-5",
    title: "5. Diretrizes de Design de Interface (UI/UX)",
    subtitle: "Pilares visuais para manter a simplicidade e clareza",
    category: "design",
    markdown: `sunflower é desenhado **pelos designers, para os designers**. Isso exige o ápice do minimalismo e sofisticação visual — um design limpo e funcional focado no texto e no processo, livre de exageros ornamentais de inteligência artificial.

### Princípios de Design Aplicados:
* **Tipografia Rítmica:** Escolha rigorosa da fonte **Inter** para leitura limpa com espaços largos de entrelinha, acompanhada de **JetBrains Mono** para metadados técnicos de projeto.
* **Cores Construtivas:** Tons de cinza de alta densidade (\`zinc-50\` a \`zinc-900\`) fundando os quadros de leitura. O amarelo **Girassol** (\`amber-500\`) é usado com moderação cirúrgica apenas para itens interativos ativos, badges importantes de progresso e feedbacks de sucesso.
* **Arquitetura sem Clutter:** Sem falsos displays de debug, terminais forçados ou telemetrias de IA. A página de cada decisão é estruturada como um artigo elegante, dividida com clareza entre contexto, caminhos, escolha e hiperlinks.
* **Facilidade de Escaneabilidade:** O leitor de relatórios prioriza contrastes nítidos e legibilidade ideal (WCAG AAA).`
  },
  {
    id: "sec-6",
    title: "6. Estratégia de Links Externos Seguros",
    subtitle: "Como o sunflower atua como um hub agnóstico de dados ativos",
    category: "seguranca",
    markdown: `Para garantir integridade jurídica e segurança de dados, a plataforma sunflower segue regras estritas de tráfego agnóstico de links:

1. **Protocolo HTTPS Mandatório:** Todos os links fornecidos passam por filtro corretivo sanitário obrigatório de formato. URLs inseguras (HTTP puro) ou sem domínios válidos são vetadas.
2. **Sandbox de Redirecionamento (No-Storage Redirect):**
   * Ao clicar no link externo, o usuário é direcionado em uma nova guia (\`target=\"_blank\"\` com reforço de segurança \`rel=\"noopener noreferrer\"\`).
   * A plataforma não carrega, faz download ou processa o código interno dos arquivos.
3. **Mapeamento de Favicons e Hostnames:** O sistema utiliza o hostname da URL para gerar visualmente badges dinâmicos elegantes, identificando rapidamente para onde o link aponta (ex. Ícones estilizados de *Behance*, *GitHub*, *Instagram*, *Figma*, *LinkedIn*).`
  },
  {
    id: "tech-7",
    title: "7. Recomendações Técnicas Basilares",
    subtitle: "Especificações sugeridas de infraestrutura e stack tecnológica",
    category: "tech",
    markdown: `Para o desenvolvimento e escalabilidade ideal da sunflower, recomendamos o seguinte ecossistema tecnológico robusto:

### Frontend & Experiência de Uso (Client App):
* **Framework principal:** React 19 (com Vite para carregamento ultra-rápido).
* **CSS & Temática:** Tailwind CSS v4 para definição de temas rápidos baseados em design tokens.
* **Componentes & Acessibilidade:** Radix UI Primitives (para comboboxes, diálogos em tela cheia e menus acessíveis para leitores de tela).
* **Animações Fluidas:** \`motion/react\` para fornecer movimentos de feedback sutis.

### Backend & Persistência (Server-side & API):
* **Linguagem:** Node.js (com TypeScript nativo).
* **Servidor de API:** Express para roteamentos rápidos e leves.
* **Banco de Dados Relacional:** PostgreSQL para excelente relacionamento entre projetos, times, logs e comentários.
* **Persitência NoSQL alternativa:** Firebase Firestore para sincronização em tempo real de discussões e comentários da comunidade se esse for o pilar primário de interação do produto.

### Infraestrutura & Deploy:
* **Hospedagem de Container:** Cloud Run, garantindo escalabilidade automática do backend e desligamento de servidores inativos para economia de custos operativos.
* **Segurança e Caching:** CDN global (Cloudflare) para acelerar a entrega de metadados e focar a experiência do designer em velocidade pura.`
  }
];
