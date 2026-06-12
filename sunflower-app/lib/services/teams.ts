import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export interface TeamInsert {
  name: string;
  description?: string;
}

export interface Team extends TeamInsert {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface TeamMemberInsert {
  name: string;
  role: string;
  email?: string;
}

export interface TeamMember extends TeamMemberInsert {
  id: string;
  team_id: string;
  created_at: string;
  updated_at: string;
}

export async function createTeam(data: TeamInsert) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: team, error } = await supabase
    .from('teams')
    .insert([data])
    .select()
    .single();

  if (error) throw error;

  return team;
}

export async function getTeams() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from('teams')
    .select('*, team_members(*)')
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data;
}

export async function getTeamById(id: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from('teams')
    .select('*, team_members(*)')
    .eq('id', id)
    .single();

  if (error) throw error;

  return data;
}

export async function updateTeam(id: string, data: Partial<TeamInsert>) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: team, error } = await supabase
    .from('teams')
    .update({
      ...data,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  return team;
}

export async function deleteTeam(id: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase
    .from('teams')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export async function addTeamMember(teamId: string, data: TeamMemberInsert) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: member, error } = await supabase
    .from('team_members')
    .insert([
      {
        team_id: teamId,
        name: data.name,
        role: data.role,
        email: data.email || null,
      },
    ])
    .select()
    .single();

  if (error) throw error;

  return member;
}

export async function getTeamMembers(teamId: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .eq('team_id', teamId)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data;
}

export async function updateTeamMember(
  memberId: string,
  data: Partial<TeamMemberInsert>
) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: member, error } = await supabase
    .from('team_members')
    .update({
      ...data,
      updated_at: new Date().toISOString(),
    })
    .eq('id', memberId)
    .select()
    .single();

  if (error) throw error;

  return member;
}

export async function deleteTeamMember(memberId: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase
    .from('team_members')
    .delete()
    .eq('id', memberId);

  if (error) throw error;
}
