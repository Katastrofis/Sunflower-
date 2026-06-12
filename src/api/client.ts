/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { DecisionLog } from '@/lib/services/decision-logs';

const API_BASE = process.env.VITE_API_URL || 'http://localhost:3000/api';

export interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
}

async function fetcher(url: string, options: FetchOptions = {}) {
  const { method = 'GET', body } = options;
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}

// Decision Logs API
export const decisionLogsAPI = {
  async getAll(teamId?: string) {
    const url = new URL(`${API_BASE}/decision-logs`);
    if (teamId) {
      url.searchParams.set('teamId', teamId);
    }
    return fetcher(url.toString());
  },

  async getById(id: string) {
    const url = new URL(`${API_BASE}/decision-logs`);
    url.searchParams.set('id', id);
    return fetcher(url.toString());
  },

  async create(data: any) {
    return fetcher(`${API_BASE}/decision-logs`, {
      method: 'POST',
      body: data,
    });
  },

  async update(id: string, data: any) {
    const url = new URL(`${API_BASE}/decision-logs`);
    url.searchParams.set('id', id);
    return fetcher(url.toString(), {
      method: 'PUT',
      body: data,
    });
  },

  async delete(id: string) {
    const url = new URL(`${API_BASE}/decision-logs`);
    url.searchParams.set('id', id);
    return fetcher(url.toString(), {
      method: 'DELETE',
    });
  },

  async addComment(
    decisionLogId: string,
    comment: {
      author_name: string;
      author_role: string;
      content: string;
    }
  ) {
    return fetcher(`${API_BASE}/decision-logs/${decisionLogId}`, {
      method: 'POST',
      body: {
        action: 'comment',
        ...comment,
      },
    });
  },

  async toggleLike(decisionLogId: string, userId: string) {
    return fetcher(`${API_BASE}/decision-logs/${decisionLogId}`, {
      method: 'POST',
      body: {
        action: 'like',
        userId,
      },
    });
  },
};

// Teams API
export const teamsAPI = {
  async getAll() {
    return fetcher(`${API_BASE}/teams`);
  },

  async getById(id: string) {
    const url = new URL(`${API_BASE}/teams`);
    url.searchParams.set('id', id);
    return fetcher(url.toString());
  },

  async create(data: any) {
    return fetcher(`${API_BASE}/teams`, {
      method: 'POST',
      body: data,
    });
  },

  async update(id: string, data: any) {
    const url = new URL(`${API_BASE}/teams`);
    url.searchParams.set('id', id);
    return fetcher(url.toString(), {
      method: 'PUT',
      body: data,
    });
  },

  async delete(id: string) {
    const url = new URL(`${API_BASE}/teams`);
    url.searchParams.set('id', id);
    return fetcher(url.toString(), {
      method: 'DELETE',
    });
  },

  async getMembers(teamId: string) {
    return fetcher(`${API_BASE}/teams/${teamId}/members`);
  },

  async addMember(
    teamId: string,
    data: {
      name: string;
      role: string;
      email?: string;
    }
  ) {
    return fetcher(`${API_BASE}/teams/${teamId}/members`, {
      method: 'POST',
      body: data,
    });
  },

  async updateMember(
    teamId: string,
    memberId: string,
    data: any
  ) {
    const url = new URL(`${API_BASE}/teams/${teamId}/members`);
    url.searchParams.set('memberId', memberId);
    return fetcher(url.toString(), {
      method: 'PUT',
      body: data,
    });
  },

  async deleteMember(teamId: string, memberId: string) {
    const url = new URL(`${API_BASE}/teams/${teamId}/members`);
    url.searchParams.set('memberId', memberId);
    return fetcher(url.toString(), {
      method: 'DELETE',
    });
  },
};
