/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import { decisionLogsAPI, teamsAPI } from '@/api/client';
import { useCallback, useState } from 'react';

// Decision Logs Hooks

export function useDecisionLogs(teamId?: string) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchLogs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await decisionLogsAPI.getAll(teamId);
      setLogs(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [teamId]);

  return { logs, loading, error, fetchLogs };
}

export function useDecisionLog(id: string) {
  const [log, setLog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchLog = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await decisionLogsAPI.getById(id);
      setLog(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [id]);

  return { log, loading, error, fetchLog };
}

export function useCreateDecisionLog() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const create = useCallback(async (data: any) => {
    try {
      setLoading(true);
      setError(null);
      const result = await decisionLogsAPI.create(data);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
}

export function useUpdateDecisionLog() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const update = useCallback(async (id: string, data: any) => {
    try {
      setLoading(true);
      setError(null);
      const result = await decisionLogsAPI.update(id, data);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return { update, loading, error };
}

export function useDeleteDecisionLog() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const delete_ = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await decisionLogsAPI.delete(id);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return { delete: delete_, loading, error };
}

export function useAddComment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const addComment = useCallback(
    async (
      decisionLogId: string,
      comment: {
        author_name: string;
        author_role: string;
        content: string;
      }
    ) => {
      try {
        setLoading(true);
        setError(null);
        const result = await decisionLogsAPI.addComment(decisionLogId, comment);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setError(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { addComment, loading, error };
}

export function useToggleLike() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const toggleLike = useCallback(async (decisionLogId: string, userId: string) => {
    try {
      setLoading(true);
      setError(null);
      const result = await decisionLogsAPI.toggleLike(decisionLogId, userId);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return { toggleLike, loading, error };
}

// Teams Hooks

export function useTeams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchTeams = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await teamsAPI.getAll();
      setTeams(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, []);

  return { teams, loading, error, fetchTeams };
}

export function useTeam(id: string) {
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchTeam = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await teamsAPI.getById(id);
      setTeam(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [id]);

  return { team, loading, error, fetchTeam };
}

export function useCreateTeam() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const create = useCallback(async (data: any) => {
    try {
      setLoading(true);
      setError(null);
      const result = await teamsAPI.create(data);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
}

export function useTeamMembers(teamId: string) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchMembers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await teamsAPI.getMembers(teamId);
      setMembers(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [teamId]);

  return { members, loading, error, fetchMembers };
}

export function useAddTeamMember() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const addMember = useCallback(
    async (
      teamId: string,
      data: {
        name: string;
        role: string;
        email?: string;
      }
    ) => {
      try {
        setLoading(true);
        setError(null);
        const result = await teamsAPI.addMember(teamId, data);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setError(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { addMember, loading, error };
}
