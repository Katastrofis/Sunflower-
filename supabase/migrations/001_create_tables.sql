-- Create teams table
CREATE TABLE IF NOT EXISTS teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create team members table
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  email TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create external links table
CREATE TABLE IF NOT EXISTS external_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT NOT NULL CHECK (platform IN ('behance', 'instagram', 'linkedin', 'github', 'figma', 'other')),
  url TEXT NOT NULL,
  label TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  decision_log_id UUID NOT NULL,
  author_name TEXT NOT NULL,
  author_role TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create decision logs table
CREATE TABLE IF NOT EXISTS decision_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  project_name TEXT NOT NULL,
  methodology TEXT NOT NULL CHECK (methodology IN ('Double Diamond', 'Design Thinking', 'Lean UX', 'Personalizada')),
  stage TEXT NOT NULL,
  context TEXT NOT NULL,
  final_decision TEXT NOT NULL,
  impact TEXT NOT NULL CHECK (impact IN ('baixo', 'médio', 'alto')),
  author TEXT NOT NULL,
  author_role TEXT NOT NULL,
  team_id UUID REFERENCES teams(id) ON DELETE SET NULL,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create decision log choices (array field would be in the decision_logs table as TEXT[])
ALTER TABLE decision_logs ADD COLUMN IF NOT EXISTS choices TEXT[] DEFAULT '{}';

-- Create decision log external links junction table
CREATE TABLE IF NOT EXISTS decision_log_external_links (
  decision_log_id UUID NOT NULL REFERENCES decision_logs(id) ON DELETE CASCADE,
  external_link_id UUID NOT NULL REFERENCES external_links(id) ON DELETE CASCADE,
  PRIMARY KEY (decision_log_id, external_link_id)
);

-- Create likes table to track user likes
CREATE TABLE IF NOT EXISTS decision_log_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  decision_log_id UUID NOT NULL REFERENCES decision_logs(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(decision_log_id, user_id)
);

-- Add comments relationship to decision_logs
ALTER TABLE comments ADD COLUMN IF NOT EXISTS decision_log_id UUID NOT NULL REFERENCES decision_logs(id) ON DELETE CASCADE;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_team_members_team_id ON team_members(team_id);
CREATE INDEX IF NOT EXISTS idx_decision_logs_team_id ON decision_logs(team_id);
CREATE INDEX IF NOT EXISTS idx_decision_logs_author ON decision_logs(author);
CREATE INDEX IF NOT EXISTS idx_decision_log_likes_decision_id ON decision_log_likes(decision_log_id);
CREATE INDEX IF NOT EXISTS idx_comments_decision_log_id ON comments(decision_log_id);

-- Enable RLS (Row Level Security)
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE decision_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE external_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE decision_log_likes ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read on decision_logs"
  ON decision_logs FOR SELECT
  USING (true);

CREATE POLICY "Allow public read on comments"
  ON comments FOR SELECT
  USING (true);

CREATE POLICY "Allow public read on external_links"
  ON external_links FOR SELECT
  USING (true);

CREATE POLICY "Allow public read on team_members"
  ON team_members FOR SELECT
  USING (true);

-- Create policies for authenticated write access
CREATE POLICY "Allow authenticated create decision_logs"
  ON decision_logs FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update own decision_logs"
  ON decision_logs FOR UPDATE
  USING (true);

CREATE POLICY "Allow authenticated delete own decision_logs"
  ON decision_logs FOR DELETE
  USING (true);

CREATE POLICY "Allow authenticated create comments"
  ON comments FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow authenticated create external_links"
  ON external_links FOR INSERT
  WITH CHECK (true);
