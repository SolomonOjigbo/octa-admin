// src/core/redux/services/adminPhase3Api.ts
//
// Phase 3 operational observability (superadmin, cross-tenant): transactions,
// payments, POS sessions, stock, inventory movements, stock transfers, quotations,
// purchase orders. Mostly read views (list-all), with deletes where the backend
// exposes them.

import { baseApi } from "./baseApi";

// Superadmin list controllers return { data }, { transactions }, { payments }, … .
const list = (...keys: string[]) => (r: any) => {
  if (Array.isArray(r)) return r;
  if (r && typeof r === "object") {
    for (const k of ["data", ...keys]) if (Array.isArray(r[k])) return r[k];
  }
  return [];
};

export const adminPhase3Api = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query<any[], void>({
      query: () => "admin/transactions",
      transformResponse: list("transactions"),
      providesTags: [{ type: "Transaction", id: "LIST" }],
    }),
    deleteTransaction: builder.mutation<any, string>({
      query: (id) => ({ url: `admin/transactions/delete/${id}`, method: "DELETE" }),
      invalidatesTags: [{ type: "Transaction", id: "LIST" }],
    }),

    getPayments: builder.query<any[], void>({
      query: () => "admin/payments",
      transformResponse: list("payments"),
      providesTags: [{ type: "Payment", id: "LIST" }],
    }),

    getPosSessions: builder.query<any[], void>({
      query: () => "admin/pos-sessions",
      transformResponse: list("sessions", "posSessions"),
      providesTags: [{ type: "PosSession", id: "LIST" }],
    }),
    deletePosSession: builder.mutation<any, string>({
      query: (id) => ({ url: `admin/pos-sessions/${id}`, method: "DELETE" }),
      invalidatesTags: [{ type: "PosSession", id: "LIST" }],
    }),

    getStocks: builder.query<any[], void>({
      query: () => "admin/stocks",
      transformResponse: list("stocks"),
      providesTags: [{ type: "Stock", id: "LIST" }],
    }),
    getInventory: builder.query<any[], void>({
      query: () => "admin/inventory",
      transformResponse: list("inventory", "movements"),
      providesTags: [{ type: "InventoryMovement", id: "LIST" }],
    }),
    getStockTransfers: builder.query<any[], void>({
      query: () => "admin/stock-transfers",
      transformResponse: list("stockTransfers", "transfers"),
      providesTags: [{ type: "StockTransfer", id: "LIST" }],
    }),

    getQuotations: builder.query<any[], void>({
      query: () => "admin/quotations",
      transformResponse: list("quotations"),
      providesTags: [{ type: "Quotation", id: "LIST" }],
    }),
    deleteQuotation: builder.mutation<any, string>({
      query: (id) => ({ url: `admin/quotations/${id}`, method: "DELETE" }),
      invalidatesTags: [{ type: "Quotation", id: "LIST" }],
    }),

    getPurchaseOrders: builder.query<any[], void>({
      query: () => "admin/purchase-order",
      transformResponse: list("purchaseOrders", "orders"),
      providesTags: [{ type: "PurchaseOrder", id: "LIST" }],
    }),
    deletePurchaseOrder: builder.mutation<any, string>({
      query: (id) => ({ url: `admin/purchase-order/${id}`, method: "DELETE" }),
      invalidatesTags: [{ type: "PurchaseOrder", id: "LIST" }],
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useDeleteTransactionMutation,
  useGetPaymentsQuery,
  useGetPosSessionsQuery,
  useDeletePosSessionMutation,
  useGetStocksQuery,
  useGetInventoryQuery,
  useGetStockTransfersQuery,
  useGetQuotationsQuery,
  useDeleteQuotationMutation,
  useGetPurchaseOrdersQuery,
  useDeletePurchaseOrderMutation,
} = adminPhase3Api;
