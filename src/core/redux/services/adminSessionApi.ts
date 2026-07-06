// src/core/redux/services/adminSessionApi.ts
//
// Platform session management (superadmin): list + revoke a user's active sessions.
// Backed by /admin/sessions/*. Also exposes a lightweight admin-users list for the
// session page's user picker.

import { baseApi } from './baseApi';

const pick = (...keys: string[]) => (r: any) => {
  if (r && typeof r === 'object') {
    for (const k of keys) if (k in r) return r[k];
  }
  return r;
};

export interface AdminSession {
  id: string;
  userId?: string;
  createdAt?: string;
  expiresAt?: string;
  revoked?: boolean;
  userAgent?: string;
  ip?: string;
  [k: string]: any;
}

export const adminSessionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminUsers: builder.query<any[], void>({
      query: () => 'admin/users',
      transformResponse: (r: any) => pick('users', 'data')(r) ?? [],
    }),

    getUserSessions: builder.query<AdminSession[], string>({
      query: (userId) => `admin/sessions/user/${userId}`,
      transformResponse: (r: any) => pick('sessions', 'data')(r) ?? [],
      providesTags: (_r, _e, userId) => [{ type: 'Session', id: userId }],
    }),
    revokeSession: builder.mutation<any, { sessionId: string; userId: string }>({
      query: ({ sessionId }) => ({ url: `admin/sessions/${sessionId}`, method: 'DELETE' }),
      invalidatesTags: (_r, _e, { userId }) => [{ type: 'Session', id: userId }],
    }),
    revokeAllUserSessions: builder.mutation<any, string>({
      query: (userId) => ({ url: `admin/sessions/user/${userId}`, method: 'DELETE' }),
      invalidatesTags: (_r, _e, userId) => [{ type: 'Session', id: userId }],
    }),
  }),
});

export const {
  useGetAdminUsersQuery,
  useGetUserSessionsQuery,
  useRevokeSessionMutation,
  useRevokeAllUserSessionsMutation,
} = adminSessionApi;
