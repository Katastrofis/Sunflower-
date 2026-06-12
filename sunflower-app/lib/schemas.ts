import { z } from 'zod';

// Decision Log Schemas
export const DecisionLogMethodology = z.enum([
  'Double Diamond',
  'Design Thinking',
  'Lean UX',
  'Personalizada',
]);

export const DecisionLogImpact = z.enum(['baixo', 'médio', 'alto']);

export const ExternalLinkPlatform = z.enum([
  'behance',
  'instagram',
  'linkedin',
  'github',
  'figma',
  'other',
]);

export const ExternalLinkSchema = z.object({
  platform: ExternalLinkPlatform,
  url: z.string().url('URL inválida'),
  label: z.string().min(1, 'Label é obrigatório'),
});

export const CommentSchema = z.object({
  author_name: z.string().min(1, 'Nome do autor é obrigatório'),
  author_role: z.string().min(1, 'Papel do autor é obrigatório'),
  content: z.string().min(1, 'Conteúdo do comentário é obrigatório'),
});

export const DecisionLogCreateSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório').max(255),
  project_name: z.string().min(1, 'Nome do projeto é obrigatório').max(255),
  methodology: DecisionLogMethodology,
  stage: z.string().min(1, 'Estágio é obrigatório').max(255),
  context: z.string().min(1, 'Contexto é obrigatório'),
  choices: z.array(z.string().min(1)).min(1, 'Pelo menos uma escolha é obrigatória'),
  final_decision: z.string().min(1, 'Decisão final é obrigatória'),
  impact: DecisionLogImpact,
  author: z.string().min(1, 'Autor é obrigatório').max(255),
  author_role: z.string().min(1, 'Papel do autor é obrigatório').max(255),
  team_id: z.string().uuid().optional(),
  external_links: z.array(ExternalLinkSchema).optional(),
});

export const DecisionLogUpdateSchema = DecisionLogCreateSchema.partial();

export const DecisionLogLikeSchema = z.object({
  userId: z.string().min(1, 'userId é obrigatório'),
});

export const DecisionLogActionSchema = z.discriminatedUnion('action', [
  z.object({
    action: z.literal('comment'),
    author_name: z.string().min(1),
    author_role: z.string().min(1),
    content: z.string().min(1),
  }),
  z.object({
    action: z.literal('like'),
    userId: z.string().min(1),
  }),
]);

// Team Schemas
export const TeamCreateSchema = z.object({
  name: z.string().min(1, 'Nome do time é obrigatório').max(255),
  description: z.string().max(1000).optional(),
});

export const TeamUpdateSchema = TeamCreateSchema.partial();

// Team Member Schemas
export const TeamMemberCreateSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(255),
  role: z.string().min(1, 'Papel/role é obrigatório').max(255),
  email: z.string().email('Email inválido').optional(),
});

export const TeamMemberUpdateSchema = TeamMemberCreateSchema.partial();

// Export types
export type DecisionLogCreate = z.infer<typeof DecisionLogCreateSchema>;
export type DecisionLogUpdate = z.infer<typeof DecisionLogUpdateSchema>;
export type TeamCreate = z.infer<typeof TeamCreateSchema>;
export type TeamUpdate = z.infer<typeof TeamUpdateSchema>;
export type TeamMemberCreate = z.infer<typeof TeamMemberCreateSchema>;
export type TeamMemberUpdate = z.infer<typeof TeamMemberUpdateSchema>;
export type Comment = z.infer<typeof CommentSchema>;
export type ExternalLink = z.infer<typeof ExternalLinkSchema>;
export type DecisionLogAction = z.infer<typeof DecisionLogActionSchema>;

// Validation helpers
export function validateDecisionLogCreate(data: unknown) {
  return DecisionLogCreateSchema.safeParse(data);
}

export function validateDecisionLogUpdate(data: unknown) {
  return DecisionLogUpdateSchema.safeParse(data);
}

export function validateTeamCreate(data: unknown) {
  return TeamCreateSchema.safeParse(data);
}

export function validateTeamUpdate(data: unknown) {
  return TeamUpdateSchema.safeParse(data);
}

export function validateTeamMemberCreate(data: unknown) {
  return TeamMemberCreateSchema.safeParse(data);
}

export function validateTeamMemberUpdate(data: unknown) {
  return TeamMemberUpdateSchema.safeParse(data);
}

export function validateDecisionLogAction(data: unknown) {
  return DecisionLogActionSchema.safeParse(data);
}
