// src/core/redux/services/adminRoleApi.ts
//
// Platform roles & permissions management (superadmin). Backed by
// /admin/super-admin/roles and /admin/super-admin/permissions.

import { baseApi } from './baseApi';

// Responses vary: { roles }, { role }, { permissions }, { permission }, or { data }.
const pick = (...keys: string[]) => (r: any) => {
  if (r && typeof r === 'object') {
    for (const k of keys) if (k in r) return r[k];
  }
  return r;
};

export interface AdminPermission {
  id: string;
  name: string;
  description?: string | null;
}
export interface AdminRole {
  id: string;
  name: string;
  description?: string | null;
  permissions?: AdminPermission[];
  [k: string]: any;
}

export const adminRoleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSystemRoles: builder.query<AdminRole[], void>({
      query: () => 'admin/super-admin/roles',
      transformResponse: (r: any) => pick('roles', 'data')(r) ?? [],
      providesTags: (result = []) => [
        { type: 'Role' as const, id: 'LIST' },
        ...result.map((x) => ({ type: 'Role' as const, id: x.id })),
      ],
    }),
    getSystemRole: builder.query<AdminRole, string>({
      query: (id) => `admin/super-admin/roles/${id}`,
      transformResponse: pick('role', 'data'),
      providesTags: (_r, _e, id) => [{ type: 'Role', id }],
    }),
    createSystemRole: builder.mutation<AdminRole, { name: string; description?: string }>({
      query: (body) => ({ url: 'admin/super-admin/roles', method: 'POST', body }),
      transformResponse: pick('role', 'data'),
      invalidatesTags: [{ type: 'Role', id: 'LIST' }],
    }),
    updateSystemRole: builder.mutation<AdminRole, { id: string; name?: string; description?: string }>({
      query: ({ id, ...body }) => ({ url: `admin/super-admin/roles/${id}`, method: 'PUT', body }),
      transformResponse: pick('role', 'data'),
      invalidatesTags: (_r, _e, { id }) => [{ type: 'Role', id }, { type: 'Role', id: 'LIST' }],
    }),
    deleteSystemRole: builder.mutation<{ message?: string }, string>({
      query: (id) => ({ url: `admin/super-admin/roles/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Role', id: 'LIST' }],
    }),

    getPermissions: builder.query<AdminPermission[], void>({
      query: () => 'admin/super-admin/permissions',
      transformResponse: (r: any) => pick('permissions', 'data')(r) ?? [],
      providesTags: [{ type: 'Permission', id: 'LIST' }],
    }),
    createPermission: builder.mutation<AdminPermission, { name: string; description?: string }>({
      query: (body) => ({ url: 'admin/super-admin/permissions', method: 'POST', body }),
      transformResponse: pick('permission', 'data'),
      invalidatesTags: [{ type: 'Permission', id: 'LIST' }],
    }),

    assignPermission: builder.mutation<AdminRole, { roleId: string; permissionId: string }>({
      query: (body) => ({ url: 'admin/super-admin/permissions/assign', method: 'POST', body }),
      transformResponse: pick('role', 'data'),
      invalidatesTags: (_r, _e, { roleId }) => [{ type: 'Role', id: roleId }, { type: 'Role', id: 'LIST' }],
    }),
    removePermission: builder.mutation<AdminRole, { roleId: string; permissionId: string }>({
      query: (body) => ({ url: 'admin/super-admin/permissions/remove', method: 'POST', body }),
      transformResponse: pick('role', 'data'),
      invalidatesTags: (_r, _e, { roleId }) => [{ type: 'Role', id: roleId }, { type: 'Role', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetSystemRolesQuery,
  useGetSystemRoleQuery,
  useCreateSystemRoleMutation,
  useUpdateSystemRoleMutation,
  useDeleteSystemRoleMutation,
  useGetPermissionsQuery,
  useCreatePermissionMutation,
  useAssignPermissionMutation,
  useRemovePermissionMutation,
} = adminRoleApi;
