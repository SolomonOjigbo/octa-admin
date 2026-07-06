// src/core/redux/services/adminStatusApi.ts
//
// Dedicated status-toggle mutations that the app previously faked via generic
// updates. These hit the real backend toggle endpoints. Pages still on the legacy
// fetch-slices call these and then refetch their own data; pages on RTK Query get
// tag invalidation for free (add tags here as those pages migrate).

import { baseApi } from './baseApi';

export const adminStatusApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    toggleCustomerStatus: builder.mutation<any, string>({
      query: (id) => ({ url: `admin/customers/${id}/status`, method: 'PATCH' }),
    }),
    toggleBrandStatus: builder.mutation<any, string>({
      query: (id) => ({ url: `admin/brands/${id}/status`, method: 'PATCH' }),
    }),
    toggleGlobalProductStatus: builder.mutation<any, string>({
      query: (id) => ({ url: `admin/global-product/${id}/status`, method: 'PATCH' }),
    }),
  }),
});

export const {
  useToggleCustomerStatusMutation,
  useToggleBrandStatusMutation,
  useToggleGlobalProductStatusMutation,
} = adminStatusApi;
