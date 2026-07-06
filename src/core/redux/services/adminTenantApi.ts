// src/core/redux/services/adminTenantApi.ts
//
// Tenant 360 — the platform-admin view of a single tenant, backed by the backend's
// /admin/tenants/:id/* sub-resources plus lifecycle mutations. Injected into baseApi
// so every call is cached, tagged, and auth-refreshed.

import { baseApi } from './baseApi';

// Backend responses are sometimes { data: ... } and sometimes the raw payload.
const unwrap = (r: any) => (r && typeof r === 'object' && 'data' in r ? r.data : r);

export interface AdminTenant {
  id: string;
  name?: string;
  slug?: string;
  type?: string;
  status?: string;
  isActive?: boolean;
  contactEmail?: string;
  createdAt?: string;
  [k: string]: any;
}

export const adminTenantApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTenant: builder.query<AdminTenant, string>({
      query: (id) => `admin/tenants/${id}`,
      transformResponse: unwrap,
      providesTags: (_r, _e, id) => [{ type: 'Tenant', id }],
    }),

    getTenantStores: builder.query<any[], string>({
      query: (id) => `admin/tenants/${id}/stores`,
      transformResponse: (r: any) => unwrap(r) ?? [],
      providesTags: (_r, _e, id) => [{ type: 'TenantStores', id }],
    }),
    getTenantWarehouses: builder.query<any[], string>({
      query: (id) => `admin/tenants/${id}/warehouses`,
      transformResponse: (r: any) => unwrap(r) ?? [],
      providesTags: (_r, _e, id) => [{ type: 'TenantWarehouses', id }],
    }),
    getTenantUsers: builder.query<any[], string>({
      query: (id) => `admin/tenants/${id}/users`,
      transformResponse: (r: any) => unwrap(r) ?? [],
      providesTags: (_r, _e, id) => [{ type: 'TenantUsers', id }],
    }),
    getTenantCustomers: builder.query<any[], string>({
      query: (id) => `admin/tenants/${id}/customers`,
      transformResponse: (r: any) => unwrap(r) ?? [],
      providesTags: (_r, _e, id) => [{ type: 'TenantCustomers', id }],
    }),
    getTenantTransactions: builder.query<any[], string>({
      query: (id) => `admin/tenants/${id}/transactions`,
      transformResponse: (r: any) => unwrap(r) ?? [],
      providesTags: (_r, _e, id) => [{ type: 'TenantTransactions', id }],
    }),
    getTenantPayments: builder.query<any[], string>({
      query: (id) => `admin/tenants/${id}/payments`,
      transformResponse: (r: any) => unwrap(r) ?? [],
      providesTags: (_r, _e, id) => [{ type: 'TenantPayments', id }],
    }),
    getTenantInventories: builder.query<any[], string>({
      query: (id) => `admin/tenants/${id}/inventories`,
      transformResponse: (r: any) => unwrap(r) ?? [],
      providesTags: (_r, _e, id) => [{ type: 'TenantInventories', id }],
    }),
    getTenantPosSessions: builder.query<any[], string>({
      query: (id) => `admin/tenants/${id}/pos-sessions`,
      transformResponse: (r: any) => unwrap(r) ?? [],
      providesTags: (_r, _e, id) => [{ type: 'TenantPosSessions', id }],
    }),
    getTenantBusinessEntities: builder.query<any[], string>({
      query: (id) => `admin/tenants/${id}/business-entities`,
      transformResponse: (r: any) => unwrap(r) ?? [],
      providesTags: (_r, _e, id) => [{ type: 'TenantBusinessEntities', id }],
    }),
    getTenantSuppliers: builder.query<any[], string>({
      query: (id) => `admin/tenants/${id}/suppliers`,
      transformResponse: (r: any) => unwrap(r) ?? [],
      providesTags: (_r, _e, id) => [{ type: 'TenantSuppliers', id }],
    }),
    getTenantProductSuppliers: builder.query<any[], string>({
      query: (id) => `admin/tenants/${id}/product-suppliers`,
      transformResponse: (r: any) => unwrap(r) ?? [],
      providesTags: (_r, _e, id) => [{ type: 'TenantProductSuppliers', id }],
    }),

    // --- Lifecycle mutations ---
    updateTenant: builder.mutation<AdminTenant, { id: string } & Partial<AdminTenant>>({
      query: ({ id, ...body }) => ({ url: `admin/tenants/${id}`, method: 'PUT', body }),
      transformResponse: unwrap,
      invalidatesTags: (_r, _e, { id }) => [{ type: 'Tenant', id }],
    }),
    deactivateTenant: builder.mutation<AdminTenant, string>({
      query: (id) => ({ url: `admin/tenants/${id}/deactivate`, method: 'PATCH' }),
      transformResponse: unwrap,
      invalidatesTags: (_r, _e, id) => [{ type: 'Tenant', id }],
    }),
    reactivateTenant: builder.mutation<AdminTenant, string>({
      query: (id) => ({ url: `admin/tenants/${id}/reactivate`, method: 'PATCH' }),
      transformResponse: unwrap,
      invalidatesTags: (_r, _e, id) => [{ type: 'Tenant', id }],
    }),
    deleteTenant: builder.mutation<{ id: string }, string>({
      query: (id) => ({ url: `admin/tenants/delete/${id}`, method: 'DELETE' }),
      transformResponse: unwrap,
      invalidatesTags: (_r, _e, id) => [{ type: 'Tenant', id }],
    }),
  }),
});

export const {
  useGetTenantQuery,
  useGetTenantStoresQuery,
  useGetTenantWarehousesQuery,
  useGetTenantUsersQuery,
  useGetTenantCustomersQuery,
  useGetTenantTransactionsQuery,
  useGetTenantPaymentsQuery,
  useGetTenantInventoriesQuery,
  useGetTenantPosSessionsQuery,
  useGetTenantBusinessEntitiesQuery,
  useGetTenantSuppliersQuery,
  useGetTenantProductSuppliersQuery,
  useUpdateTenantMutation,
  useDeactivateTenantMutation,
  useReactivateTenantMutation,
  useDeleteTenantMutation,
} = adminTenantApi;
