-- Seed sample data for Sunflower project

-- Insert sample teams
INSERT INTO teams (name, description) VALUES
  ('Design System', 'Equipe responsável pelo design system da plataforma'),
  ('UX Research', 'Equipe de pesquisa e validação de experiência do usuário'),
  ('Product Design', 'Equipe de design de produto e interfaces')
ON CONFLICT DO NOTHING;

-- Insert sample team members
INSERT INTO team_members (team_id, name, role, email) 
SELECT id, 'Ana Silva', 'Design Lead', 'ana.silva@company.com' FROM teams WHERE name = 'Design System'
UNION ALL
SELECT id, 'Carlos Mendez', 'Senior Designer', 'carlos.mendez@company.com' FROM teams WHERE name = 'Design System'
UNION ALL
SELECT id, 'Maria Costa', 'UX Researcher', 'maria.costa@company.com' FROM teams WHERE name = 'UX Research'
UNION ALL
SELECT id, 'João Santos', 'Product Designer', 'joao.santos@company.com' FROM teams WHERE name = 'Product Design'
ON CONFLICT DO NOTHING;

-- Insert sample decision logs
INSERT INTO decision_logs (
  title, project_name, methodology, stage, context, choices,
  final_decision, impact, author, author_role, team_id, likes
)
SELECT 
  'Framework Frontend - React vs Vue vs Svelte',
  'Portal Dashboard 2024',
  'Design Thinking',
  'Definição',
  'Necessário escolher framework para reconstrução do portal. Considerações: performance, comunidade, documentação, curva de aprendizado.',
  ARRAY['React', 'Vue.js', 'Svelte'],
  'React foi escolhido por ter maior comunidade, melhor documentação, e experiência prévia do time. Ecossistema mais maduro.',
  'alto',
  'Ana Silva',
  'Design Lead',
  (SELECT id FROM teams WHERE name = 'Product Design' LIMIT 1),
  5
UNION ALL
SELECT
  'Paleta de Cores - Dark Mode vs Light Mode First',
  'Design System v2',
  'Double Diamond',
  'Descoberta',
  'Decisão sobre abordagem de temas de cor: desenvolver dark mode primeiro ou light mode.',
  ARRAY['Dark Mode First', 'Light Mode First', 'Ambos em paralelo'],
  'Light Mode First foi escolhido. Facilita testes com usuários reais primeiro, dark mode pode ser iterativo.',
  'médio',
  'Carlos Mendez',
  'Senior Designer',
  (SELECT id FROM teams WHERE name = 'Design System' LIMIT 1),
  8
UNION ALL
SELECT
  'Tipografia - Sistema de escala',
  'Design System v2',
  'Lean UX',
  'Ideação',
  'Estabelecer escala tipográfica consistente e reutilizável entre produtos.',
  ARRAY['Escala modular (1.25)', 'Escala Fibonacci', 'Custom baseado em contextos'],
  'Escala modular 1.25 foi selecionada por sua flexibilidade e simplicidade de implementação.',
  'médio',
  'Maria Costa',
  'UX Researcher',
  (SELECT id FROM teams WHERE name = 'Design System' LIMIT 1),
  3
ON CONFLICT DO NOTHING;

-- Insert sample external links
INSERT INTO external_links (platform, url, label)
VALUES
  ('figma', 'https://figma.com/file/example123', 'Design Specs - Portal Dashboard'),
  ('figma', 'https://figma.com/file/example456', 'Design System Components'),
  ('github', 'https://github.com/company/portal', 'Portal Repository'),
  ('behance', 'https://behance.net/company/portfolio', 'Portfolio Projects')
ON CONFLICT DO NOTHING;

-- Link external resources to decision logs
INSERT INTO decision_log_external_links (decision_log_id, external_link_id)
SELECT 
  dl.id,
  el.id
FROM decision_logs dl, external_links el
WHERE dl.title = 'Framework Frontend - React vs Vue vs Svelte' 
  AND el.platform = 'github'
UNION ALL
SELECT 
  dl.id,
  el.id
FROM decision_logs dl, external_links el
WHERE dl.title = 'Paleta de Cores - Dark Mode vs Light Mode First'
  AND el.platform = 'figma' AND el.label LIKE '%System%'
ON CONFLICT DO NOTHING;

-- Insert sample comments
INSERT INTO comments (decision_log_id, author_name, author_role, content)
SELECT 
  id,
  'João Santos',
  'Product Designer',
  'Concordo completamente. React nos dá a flexibilidade que precisamos para escalar.'
FROM decision_logs
WHERE title = 'Framework Frontend - React vs Vue vs Svelte'
UNION ALL
SELECT
  id,
  'Maria Costa',
  'UX Researcher',
  'Testamos ambas as abordagens com usuários. Light Mode First teve melhor adesão inicial.'
FROM decision_logs
WHERE title = 'Paleta de Cores - Dark Mode vs Light Mode First'
ON CONFLICT DO NOTHING;
