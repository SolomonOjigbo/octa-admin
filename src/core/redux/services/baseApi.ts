// src/core/redux/services/baseApi.ts
//
// Central RTK Query API for the admin console. This is the single HTTP client:
// - one fetchBaseQuery with the platform base URL,
// - a request layer that injects the Bearer token,
// - a response layer that, on 401, refreshes the token ONCE (concurrent 401s share
//   the same refresh) and retries; on refresh failure it clears tokens, logs out,
//   and redirects to sign-in.
//
// New admin integrations should `baseApi.injectEndpoints(...)` rather than adding
// hand-rolled fetch files — they get caching, tag invalidation, and auth for free.

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import BASE_URL from '../apis/api';
import { logout } from '../slices/auth';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const stateToken = (getState() as any)?.auth?.accessToken;
    const token = stateToken || localStorage.getItem('accessToken');
    if (token) headers.set('authorization', `Bearer ${token}`);
    return headers;
  },
});

// Single-flight refresh: concurrent 401s await the same in-progress refresh.
let refreshPromise: Promise<boolean> | null = null;

async function refreshOnce(
  api: Parameters<BaseQueryFn>[1],
  extraOptions: Parameters<BaseQueryFn>[2]
): Promise<boolean> {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) return false;
      const res = await rawBaseQuery(
        { url: 'auth/refresh', method: 'POST', body: { refreshToken } },
        api,
        extraOptions
      );
      const data: any = (res.data as any)?.data ?? res.data;
      if (data?.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
        if (data.refreshToken) localStorage.setItem('refreshToken', data.refreshToken);
        return true;
      }
      return false;
    })();
    // Reset once settled so the next 401 starts a fresh refresh.
    refreshPromise.finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
}

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const ok = await refreshOnce(api, extraOptions);
    if (ok) {
      result = await rawBaseQuery(args, api, extraOptions); // retry with the new token
    } else {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      api.dispatch(logout());
      if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/signin')) {
        window.location.href = '/signin';
      }
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'Tenant',
    'TenantStores',
    'TenantWarehouses',
    'TenantUsers',
    'TenantCustomers',
    'TenantTransactions',
    'TenantPayments',
    'TenantInventories',
    'TenantPosSessions',
    'TenantBusinessEntities',
    'TenantSuppliers',
    'TenantProductSuppliers',
    // Room for later phases:
    'Role',
    'Permission',
    'Session',
    'Warehouse',
    'BusinessEntity',
    'Setting',
    'ProductSupplier',
    'B2bConnection',
    'Barcode',
    'AuditLog',
    'TenantCategory',
    'TenantCatalogProduct',
    'TenantSupplier',
    // Phase 3 operational views
    'Transaction',
    'Payment',
    'PosSession',
    'Stock',
    'InventoryMovement',
    'StockTransfer',
    'Quotation',
    'PurchaseOrder',
    // Compliance / KYC
    'Kyc',
    'KycQueue',
  ],
  endpoints: () => ({}),
});
