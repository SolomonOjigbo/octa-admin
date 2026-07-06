// src/core/redux/services/adminAnalyticsApi.ts
//
// Cross-tenant platform analytics for the admin Reports/Dashboard pages.
// Backed by /admin/analytics/* (all accept optional ?from&to).

import { baseApi } from "./baseApi";

type Range = { from?: string; to?: string } | void;
const params = (r: Range) => (r ? (r as Record<string, unknown>) : {});

export const adminAnalyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOverview: builder.query<any, Range>({
      query: (r) => ({ url: "admin/analytics/overview", params: params(r) }),
    }),
    getSalesAnalytics: builder.query<any, Range>({
      query: (r) => ({ url: "admin/analytics/sales", params: params(r) }),
    }),
    getPurchasesAnalytics: builder.query<any, Range>({
      query: (r) => ({ url: "admin/analytics/purchases", params: params(r) }),
    }),
    getFinancials: builder.query<any, Range>({
      query: (r) => ({ url: "admin/analytics/financials", params: params(r) }),
    }),
    getTax: builder.query<any, Range>({
      query: (r) => ({ url: "admin/analytics/tax", params: params(r) }),
    }),
    getTopCustomers: builder.query<any[], ({ limit?: number } & { from?: string; to?: string }) | void>({
      query: (r) => ({ url: "admin/analytics/top-customers", params: params(r) }),
    }),
    getTopSuppliers: builder.query<any[], ({ limit?: number } & { from?: string; to?: string }) | void>({
      query: (r) => ({ url: "admin/analytics/top-suppliers", params: params(r) }),
    }),
    getInventoryAnalytics: builder.query<any, void>({
      query: () => "admin/analytics/inventory",
    }),
  }),
});

export const {
  useGetOverviewQuery,
  useGetSalesAnalyticsQuery,
  useGetPurchasesAnalyticsQuery,
  useGetFinancialsQuery,
  useGetTaxQuery,
  useGetTopCustomersQuery,
  useGetTopSuppliersQuery,
  useGetInventoryAnalyticsQuery,
} = adminAnalyticsApi;
