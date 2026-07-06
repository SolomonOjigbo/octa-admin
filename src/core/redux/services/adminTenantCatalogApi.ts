// src/core/redux/services/adminTenantCatalogApi.ts
//
// Per-tenant catalog management (superadmin, tenant-scoped): a tenant's product
// categories and products. Backed by /admin/tenant-catalog/:tenantId/*.
// Also exposes a tenant's suppliers (for the product-supplier create picker).

import { baseApi } from "./baseApi";

const list = (r: any) => (r && typeof r === "object" && "data" in r ? r.data : r) ?? [];
const one = (r: any) => (r && typeof r === "object" && "data" in r ? r.data : r);

export const adminTenantCatalogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // --- Categories ---
    getTenantCategories: builder.query<any[], string>({
      query: (tenantId) => `admin/tenant-catalog/${tenantId}/categories`,
      transformResponse: list,
      providesTags: (_r, _e, tenantId) => [{ type: "TenantCategory", id: tenantId }],
    }),
    createTenantCategory: builder.mutation<any, { tenantId: string; [k: string]: any }>({
      query: ({ tenantId, ...body }) => ({ url: `admin/tenant-catalog/${tenantId}/categories`, method: "POST", body }),
      transformResponse: one,
      invalidatesTags: (_r, _e, { tenantId }) => [{ type: "TenantCategory", id: tenantId }],
    }),
    updateTenantCategory: builder.mutation<any, { tenantId: string; id: string; [k: string]: any }>({
      query: ({ tenantId, id, ...body }) => ({ url: `admin/tenant-catalog/${tenantId}/categories/${id}`, method: "PUT", body }),
      transformResponse: one,
      invalidatesTags: (_r, _e, { tenantId }) => [{ type: "TenantCategory", id: tenantId }],
    }),
    deleteTenantCategory: builder.mutation<any, { tenantId: string; id: string }>({
      query: ({ tenantId, id }) => ({ url: `admin/tenant-catalog/${tenantId}/categories/${id}`, method: "DELETE" }),
      invalidatesTags: (_r, _e, { tenantId }) => [{ type: "TenantCategory", id: tenantId }],
    }),

    // --- Products ---
    getTenantCatalogProducts: builder.query<any[], string>({
      query: (tenantId) => `admin/tenant-catalog/${tenantId}/products`,
      transformResponse: list,
      providesTags: (_r, _e, tenantId) => [{ type: "TenantCatalogProduct", id: tenantId }],
    }),
    createTenantCatalogProduct: builder.mutation<any, { tenantId: string; [k: string]: any }>({
      query: ({ tenantId, ...body }) => ({ url: `admin/tenant-catalog/${tenantId}/products`, method: "POST", body }),
      transformResponse: one,
      invalidatesTags: (_r, _e, { tenantId }) => [{ type: "TenantCatalogProduct", id: tenantId }],
    }),
    updateTenantCatalogProduct: builder.mutation<any, { tenantId: string; id: string; [k: string]: any }>({
      query: ({ tenantId, id, ...body }) => ({ url: `admin/tenant-catalog/${tenantId}/products/${id}`, method: "PUT", body }),
      transformResponse: one,
      invalidatesTags: (_r, _e, { tenantId }) => [{ type: "TenantCatalogProduct", id: tenantId }],
    }),
    deleteTenantCatalogProduct: builder.mutation<any, { tenantId: string; id: string }>({
      query: ({ tenantId, id }) => ({ url: `admin/tenant-catalog/${tenantId}/products/${id}`, method: "DELETE" }),
      invalidatesTags: (_r, _e, { tenantId }) => [{ type: "TenantCatalogProduct", id: tenantId }],
    }),

    // --- Suppliers of a tenant (for pickers) ---
    getSuppliersByTenant: builder.query<any[], string>({
      query: (tenantId) => `admin/suppliers/tenant/${tenantId}`,
      transformResponse: list,
      providesTags: (_r, _e, tenantId) => [{ type: "TenantSupplier", id: tenantId }],
    }),
  }),
});

export const {
  useGetTenantCategoriesQuery,
  useCreateTenantCategoryMutation,
  useUpdateTenantCategoryMutation,
  useDeleteTenantCategoryMutation,
  useGetTenantCatalogProductsQuery,
  useCreateTenantCatalogProductMutation,
  useUpdateTenantCatalogProductMutation,
  useDeleteTenantCatalogProductMutation,
  useGetSuppliersByTenantQuery,
} = adminTenantCatalogApi;
