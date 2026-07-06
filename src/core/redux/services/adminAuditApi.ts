// src/core/redux/services/adminAuditApi.ts
//
// Platform audit-log viewer (superadmin). /admin/audits lists all activity;
// /admin/audits/:tenantId scopes to one tenant.

import { baseApi } from "./baseApi";

const list = (r: any): any[] => {
  if (Array.isArray(r)) return r;
  if (r && typeof r === "object") {
    for (const k of ["data", "logs", "activityLogs", "activities"]) if (Array.isArray(r[k])) return r[k];
  }
  return [];
};

export const adminAuditApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAuditLogs: builder.query<any[], void>({
      query: () => "admin/audits",
      transformResponse: list,
      providesTags: [{ type: "AuditLog", id: "ALL" }],
    }),
    getTenantAuditLogs: builder.query<any[], string>({
      query: (tenantId) => `admin/audits/${tenantId}`,
      transformResponse: list,
      providesTags: (_r, _e, tenantId) => [{ type: "AuditLog", id: tenantId }],
    }),
  }),
});

export const { useGetAuditLogsQuery, useGetTenantAuditLogsQuery } = adminAuditApi;
