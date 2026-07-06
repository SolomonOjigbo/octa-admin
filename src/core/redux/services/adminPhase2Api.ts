// src/core/redux/services/adminPhase2Api.ts
//
// Phase 2 operational entities (superadmin, cross-tenant): business entities,
// settings, product-suppliers, barcodes, and B2B connections. Each uses the
// backend's list-all endpoint plus the confirmed lifecycle actions.

import { baseApi } from "./baseApi";

const list = (r: any) => (r && typeof r === "object" && "data" in r ? r.data : r) ?? [];
const one = (r: any) => (r && typeof r === "object" && "data" in r ? r.data : r);

export const adminPhase2Api = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // --- Business entities ---
    getBusinessEntities: builder.query<any[], void>({
      query: () => "admin/business-entities",
      transformResponse: list,
      providesTags: [{ type: "BusinessEntity", id: "LIST" }],
    }),
    createBusinessEntity: builder.mutation<any, { tenantId: string; [k: string]: any }>({
      // Route carries :tenantId; the controller reads tenantId from the body, so send both.
      query: ({ tenantId, ...rest }) => ({
        url: `admin/business-entities/tenant/${tenantId}`,
        method: "POST",
        body: { tenantId, ...rest },
      }),
      transformResponse: one,
      invalidatesTags: [{ type: "BusinessEntity", id: "LIST" }],
    }),
    updateBusinessEntity: builder.mutation<any, { id: string; [k: string]: any }>({
      query: ({ id, ...body }) => ({ url: `admin/business-entities/${id}`, method: "PUT", body }),
      transformResponse: one,
      invalidatesTags: [{ type: "BusinessEntity", id: "LIST" }],
    }),
    deleteBusinessEntity: builder.mutation<any, string>({
      query: (id) => ({ url: `admin/business-entities/${id}`, method: "DELETE" }),
      invalidatesTags: [{ type: "BusinessEntity", id: "LIST" }],
    }),

    // --- Settings ---
    getSettings: builder.query<any[], void>({
      query: () => "admin/settings",
      transformResponse: list,
      providesTags: [{ type: "Setting", id: "LIST" }],
    }),
    toggleSetting: builder.mutation<any, string>({
      query: (id) => ({ url: `admin/settings/${id}/toggle`, method: "PUT" }),
      invalidatesTags: [{ type: "Setting", id: "LIST" }],
    }),
    deleteSetting: builder.mutation<any, string>({
      query: (id) => ({ url: `admin/settings/${id}`, method: "DELETE" }),
      invalidatesTags: [{ type: "Setting", id: "LIST" }],
    }),

    // --- Product-supplier links ---
    getProductSuppliers: builder.query<any[], void>({
      query: () => "admin/product-supplier",
      transformResponse: list,
      providesTags: [{ type: "ProductSupplier", id: "LIST" }],
    }),
    deleteProductSupplier: builder.mutation<any, string>({
      query: (id) => ({ url: `admin/product-supplier/${id}`, method: "DELETE" }),
      invalidatesTags: [{ type: "ProductSupplier", id: "LIST" }],
    }),

    // --- Barcodes ---
    getBarcodes: builder.query<any[], void>({
      query: () => "admin/barcodes",
      transformResponse: list,
      providesTags: [{ type: "Barcode", id: "LIST" }],
    }),
    deleteBarcode: builder.mutation<any, string>({
      query: (id) => ({ url: `admin/barcodes/${id}`, method: "DELETE" }),
      invalidatesTags: [{ type: "Barcode", id: "LIST" }],
    }),

    // --- Warehouses (tenant-scoped; no list-all) ---
    getWarehousesByTenant: builder.query<any[], string>({
      query: (tenantId) => `admin/warehouse/tenant/${tenantId}/warehouses`,
      transformResponse: list,
      providesTags: (_r, _e, tenantId) => [{ type: "Warehouse", id: tenantId }],
    }),
    createWarehouse: builder.mutation<any, { tenantId: string; [k: string]: any }>({
      query: ({ tenantId, ...body }) => ({
        url: `admin/warehouse/tenant/${tenantId}/warehouses`,
        method: "POST",
        body,
      }),
      transformResponse: one,
      invalidatesTags: (_r, _e, { tenantId }) => [{ type: "Warehouse", id: tenantId }],
    }),
    updateWarehouse: builder.mutation<any, { tenantId: string; warehouseId: string; [k: string]: any }>({
      query: ({ tenantId, warehouseId, ...body }) => ({
        url: `admin/warehouse/tenant/${tenantId}/warehouses/${warehouseId}`,
        method: "PUT",
        body,
      }),
      transformResponse: one,
      invalidatesTags: (_r, _e, { tenantId }) => [{ type: "Warehouse", id: tenantId }],
    }),
    deleteWarehouse: builder.mutation<any, { id: string; tenantId: string }>({
      query: ({ id }) => ({ url: `admin/warehouse/delete/${id}`, method: "DELETE" }),
      invalidatesTags: (_r, _e, { tenantId }) => [{ type: "Warehouse", id: tenantId }],
    }),

    // --- B2B connections ---
    getB2bConnections: builder.query<any[], void>({
      query: () => "admin/b2bconnections",
      transformResponse: list,
      providesTags: [{ type: "B2bConnection", id: "LIST" }],
    }),
    activateB2b: builder.mutation<any, string>({
      query: (id) => ({ url: `admin/b2bconnections/${id}/activate`, method: "PUT" }),
      invalidatesTags: [{ type: "B2bConnection", id: "LIST" }],
    }),
    deactivateB2b: builder.mutation<any, string>({
      query: (id) => ({ url: `admin/b2bconnections/${id}/deactivate`, method: "PUT" }),
      invalidatesTags: [{ type: "B2bConnection", id: "LIST" }],
    }),
    deleteB2b: builder.mutation<any, string>({
      query: (id) => ({ url: `admin/b2bconnections/${id}`, method: "DELETE" }),
      invalidatesTags: [{ type: "B2bConnection", id: "LIST" }],
    }),
  }),
});

export const {
  useGetBusinessEntitiesQuery,
  useCreateBusinessEntityMutation,
  useUpdateBusinessEntityMutation,
  useDeleteBusinessEntityMutation,
  useGetWarehousesByTenantQuery,
  useCreateWarehouseMutation,
  useUpdateWarehouseMutation,
  useDeleteWarehouseMutation,
  useGetSettingsQuery,
  useToggleSettingMutation,
  useDeleteSettingMutation,
  useGetProductSuppliersQuery,
  useDeleteProductSupplierMutation,
  useGetBarcodesQuery,
  useDeleteBarcodeMutation,
  useGetB2bConnectionsQuery,
  useActivateB2bMutation,
  useDeactivateB2bMutation,
  useDeleteB2bMutation,
} = adminPhase2Api;
