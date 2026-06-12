import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export interface DecisionLogInsert {
  title: string;
  project_name: string;
  methodology: string;
  stage: string;
  context: string;
  choices: string[];
  final_decision: string;
  impact: 'baixo' | 'médio' | 'alto';
  author: string;
  author_role: string;
  team_id?: string;
  external_links?: Array<{
    platform: string;
    url: string;
    label: string;
  }>;
}

export interface DecisionLog extends DecisionLogInsert {
  id: string;
  likes: number;
  created_at: string;
  updated_at: string;
  comments: Array<{
    id: string;
    author_name: string;
    author_role: string;
    content: string;
    created_at: string;
  }>;
  external_links: Array<{
    id: string;
    platform: string;
    url: string;
    label: string;
  }>;
}

export async function createDecisionLog(data: DecisionLogInsert) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // First, create external links if provided
  let externalLinkIds: string[] = [];
  if (data.external_links && data.external_links.length > 0) {
    const { data: links, error: linksError } = await supabase
      .from('external_links')
      .insert(
        data.external_links.map((link) => ({
          platform: link.platform,
          url: link.url,
          label: link.label,
        }))
      )
      .select('id');

    if (linksError) throw linksError;
    externalLinkIds = links?.map((l) => l.id) || [];
  }

  // Create decision log
  const { data: decisionLog, error: logError } = await supabase
    .from('decision_logs')
    .insert([
      {
        title: data.title,
        project_name: data.project_name,
        methodology: data.methodology,
        stage: data.stage,
        context: data.context,
        choices: data.choices,
        final_decision: data.final_decision,
        impact: data.impact,
        author: data.author,
        author_role: data.author_role,
        team_id: data.team_id || null,
      },
    ])
    .select()
    .single();

  if (logError) throw logError;

  // Create junction table entries for external links
  if (externalLinkIds.length > 0) {
    const { error: junctionError } = await supabase
      .from('decision_log_external_links')
      .insert(
        externalLinkIds.map((linkId) => ({
          decision_log_id: decisionLog.id,
          external_link_id: linkId,
        }))
      );

    if (junctionError) throw junctionError;
  }

  return decisionLog;
}

export async function getDecisionLogs(teamId?: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  let query = supabase
    .from('decision_logs')
    .select(
      `
      *,
      comments(*),
      decision_log_external_links(
        external_links(*)
      )
    `
    )
    .order('created_at', { ascending: false });

  if (teamId) {
    query = query.eq('team_id', teamId);
  }

  const { data, error } = await query;

  if (error) throw error;

  return data;
}

export async function getDecisionLogById(id: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from('decision_logs')
    .select(
      `
      *,
      comments(*),
      decision_log_external_links(
        external_links(*)
      )
    `
    )
    .eq('id', id)
    .single();

  if (error) throw error;

  return data;
}

export async function updateDecisionLog(id: string, data: Partial<DecisionLogInsert>) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const updateData = {
    ...(data.title && { title: data.title }),
    ...(data.project_name && { project_name: data.project_name }),
    ...(data.methodology && { methodology: data.methodology }),
    ...(data.stage && { stage: data.stage }),
    ...(data.context && { context: data.context }),
    ...(data.choices && { choices: data.choices }),
    ...(data.final_decision && { final_decision: data.final_decision }),
    ...(data.impact && { impact: data.impact }),
    updated_at: new Date().toISOString(),
  };

  const { data: result, error } = await supabase
    .from('decision_logs')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  return result;
}

export async function deleteDecisionLog(id: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase
    .from('decision_logs')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export async function addCommentToDecisionLog(
  decisionLogId: string,
  comment: {
    author_name: string;
    author_role: string;
    content: string;
  }
) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from('comments')
    .insert([
      {
        decision_log_id: decisionLogId,
        author_name: comment.author_name,
        author_role: comment.author_role,
        content: comment.content,
      },
    ])
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function toggleLikeDecisionLog(
  decisionLogId: string,
  userId: string
) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // Check if user already liked
  const { data: existingLike, error: checkError } = await supabase
    .from('decision_log_likes')
    .select('id')
    .eq('decision_log_id', decisionLogId)
    .eq('user_id', userId)
    .single();

  if (existingLike) {
    // Unlike
    const { error: deleteError } = await supabase
      .from('decision_log_likes')
      .delete()
      .eq('decision_log_id', decisionLogId)
      .eq('user_id', userId);

    if (deleteError) throw deleteError;

    // Decrement likes count
    const { data: decisionLog } = await supabase
      .from('decision_logs')
      .select('likes')
      .eq('id', decisionLogId)
      .single();

    const newLikes = Math.max(0, (decisionLog?.likes || 1) - 1);
    await supabase
      .from('decision_logs')
      .update({ likes: newLikes })
      .eq('id', decisionLogId);

    return { liked: false, likes: newLikes };
  } else {
    // Like
    const { error: insertError } = await supabase
      .from('decision_log_likes')
      .insert([
        {
          decision_log_id: decisionLogId,
          user_id: userId,
        },
      ]);

    if (insertError && insertError.code !== 'PGRST116') throw insertError;

    // Increment likes count
    const { data: decisionLog } = await supabase
      .from('decision_logs')
      .select('likes')
      .eq('id', decisionLogId)
      .single();

    const newLikes = (decisionLog?.likes || 0) + 1;
    await supabase
      .from('decision_logs')
      .update({ likes: newLikes })
      .eq('id', decisionLogId);

    return { liked: true, likes: newLikes };
  }
}
