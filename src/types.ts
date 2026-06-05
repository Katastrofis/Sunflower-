/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum MethodologyType {
  DOUBLE_DIAMOND = "Double Diamond",
  DESIGN_THINKING = "Design Thinking",
  LEAN_UX = "Lean UX",
  CUSTOM = "Personalizada"
}

export interface ExternalLink {
  id: string;
  platform: "behance" | "instagram" | "linkedin" | "github" | "figma" | "other";
  url: string;
  label: string;
}

export interface Comment {
  id: string;
  authorName: string;
  authorRole: string;
  content: string;
  createdAt: string;
}

export interface DecisionLog {
  id: string;
  title: string;
  projectName: string;
  methodology: MethodologyType;
  stage: string; // e.g., "Descoberta", "Definição", "Ideação", "Prototipação"
  context: string; // O problema / contexto
  choices: string[]; // Opções avaliadas
  finalDecision: string; // Decisão final tomada e porquê
  impact: "baixo" | "médio" | "alto";
  author: string;
  authorRole: string;
  teamId?: string;
  likes: number;
  likedByUser: boolean;
  comments: Comment[];
  externalLinks: ExternalLink[];
  createdAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
  email: string;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  members: TeamMember[];
  projectsCount: number;
}
