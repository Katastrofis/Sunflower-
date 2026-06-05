/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DecisionLog, Team, MethodologyType } from "./types";

export const initialTeams: Team[] = [
  {
    id: "team-1",
    name: "Estúdio Girassol Cre",
    description: "Time focado em design de produto focado em acessibilidade e sustentabilidade digital.",
    projectsCount: 3,
    members: [
      { id: "m-1", name: "Mariana Costa", role: "UX Researcher", email: "mariana@girassol.design" },
      { id: "m-2", name: "Gabriel Souza", role: "UI Designer Líder", email: "gabriel@girassol.design" },
      { id: "m-3", name: "Aline Santos", role: "Design Strategist", email: "aline@girassol.design" }
    ]
  },
  {
    id: "team-2",
    name: "Squad Eclipse",
    description: "Time multidisciplinar focado em refatorar a arquitetura da informação de web apps complexos.",
    projectsCount: 2,
    members: [
      { id: "m-4", name: "Lucas Lima", role: "Product Designer", email: "lucas@eclipse.design" },
      { id: "m-5", name: "Beatriz Mello", role: "Frontend Engineer / UX", email: "beatriz@eclipse.design" }
    ]
  }
];

export const initialDecisions: DecisionLog[] = [
  {
    id: "dec-1",
    title: "Adoção de Tipografia Sans-Serif Humanista de Alta Regularidade para Leitores no Escuro",
    projectName: "Portal Educação Livre",
    methodology: MethodologyType.DOUBLE_DIAMOND,
    stage: "Desenvolver (Develop)",
    context: "Usuários noturnos relataram fadiga ocular persistente ao ler eixos acadêmicos longos no portal utilizando a fonte condensada anterior.",
    choices: [
      "Substituir por fonte geométrica super limpa (ex: Futura PT)",
      "Adotar fonte humanista aberta com excelente kerning e altura de x proeminente (ex: Inter / Open Sans)",
      "Migrar para um modelo Serifado robusto (ex: Merriweather)"
    ],
    finalDecision: "Adoção da fonte Inter (Sans-serif Humanista) com line-height de 1.625 e letter-spacing suave. Fontes humanistas reduzem a fadiga ocular em 18% em dispositivos móveis sob baixa luminosidade, mantendo legibilidade ideal.",
    impact: "alto",
    author: "Gabriel Souza",
    authorRole: "UI Designer Líder",
    teamId: "team-1",
    likes: 24,
    likedByUser: false,
    createdAt: "2026-06-01T10:30:00Z",
    comments: [
      {
        id: "c-1",
        authorName: "Beatriz Mello",
        authorRole: "Frontend Engineer / UX",
        content: "Excelente escolha! A implementação técnica na folha CSS foi direta e os testes de contraste do WCAG AAA passaram sem esforço.",
        createdAt: "2026-06-01T15:00:00Z"
      },
      {
        id: "c-2",
        authorName: "Renato Cruz",
        authorRole: "UX Critic",
        content: "Importante pontuar que a legibilidade foi facilitada também pelo contraste cromático regulado. Testaram com daltonismo?",
        createdAt: "2026-06-02T09:12:00Z"
      }
    ],
    externalLinks: [
      { id: "l-1", platform: "figma", url: "https://figma.com/file/projeto-educacao", label: "Prancheta de Contraste e Variantes" },
      { id: "l-2", platform: "behance", url: "https://behance.net/gallery/projeto-educacao", label: "Estudo de Caso Completo" }
    ]
  },
  {
    id: "dec-2",
    title: "Redução do Fluxo de Checkout de 5 para 3 Passos via Abordagem Construtivista",
    projectName: "E-Commerce VerdeVida",
    methodology: MethodologyType.DESIGN_THINKING,
    stage: "Ideação (Ideate)",
    context: "Taxa de abandono do carrinho estava em 62% na etapa de seleção de meio de pagamento externo. Usuários sentiam desconfiança ao navegar em blocos redirecionados.",
    choices: [
      "Checkout em página única (One-Step Checkout) agrupando tudo",
      "Checkout progressivo em 3 etapas com indicador transparente superior de status e salvamento silencioso persistente",
      "Manter 5 etapas, mas adicionar chat robótico de suporte contextual em tempo real"
    ],
    finalDecision: "Implementamos a progressão reduzida em 3 passos (Carrinho -> Endereço/Frete -> Pagamento Simples integrado). O salvamento persistente em cache local evita digitação redundante e recupera a sessão ativa do usuário se houver queda.",
    impact: "alto",
    author: "Mariana Costa",
    authorRole: "UX Researcher",
    teamId: "team-1",
    likes: 42,
    likedByUser: true,
    createdAt: "2026-06-03T18:45:00Z",
    comments: [
      {
        id: "c-3",
        authorName: "Aline Santos",
        authorRole: "Design Strategist",
        content: "A validação preliminar aponta aumento imediato de 14% na taxa de conversão após a simplificação estrutural.",
        createdAt: "2026-06-04T08:30:00Z"
      }
    ],
    externalLinks: [
      { id: "l-3", platform: "github", url: "https://github.com/verdevida/checkout", label: "Protótipo React Funcional" },
      { id: "l-4", platform: "linkedin", url: "https://linkedin.com/posts/verdevida-ux", label: "Compartilhamento dos Aprendizados" }
    ]
  },
  {
    id: "dec-3",
    title: "Substituição do Menu Lateral (Drawer) por Navegação Inferior de Fixação Rápida no Mobile",
    projectName: "App Mobilidade Urbana",
    methodology: MethodologyType.LEAN_UX,
    stage: "Medição e Aprendizado",
    context: "O teste de calor indicava que apenas 4% dos usuários em movimento tentavam abrir o menu hambúrguer no canto superior esquerdo para trocar de rota.",
    choices: [
      "Mover menu hambúrguer para o canto direito",
      "Substituir por barra de abas inferior (Tab Bar) com as 4 ações primárias acessíveis na zona do polegar",
      "Adicionar gesto de arrastar da borda esquerda para abrir o menu hambúrguer"
    ],
    finalDecision: "Adoção da barra de navegação inferior flutuante. A zona do polegar foi priorizada facilitando rotas imediatas com apenas uma mão livre nos terminais.",
    impact: "médio",
    author: "Lucas Lima",
    authorRole: "Product Designer",
    teamId: "team-2",
    likes: 18,
    likedByUser: false,
    createdAt: "2026-06-04T12:00:00Z",
    comments: [],
    externalLinks: [
      { id: "l-5", platform: "instagram", url: "https://instagram.com/p/mobilidade-design", label: "Análise de Calor no Story" }
    ]
  }
];
