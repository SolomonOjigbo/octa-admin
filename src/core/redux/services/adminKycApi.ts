// src/core/redux/services/adminKycApi.ts
//
// Superadmin KYC review — backed by the backend /admin/kyc/* endpoints (manual
// review v1). Queue + per-tenant review + document/tenant decisions. Injected into
// baseApi so calls are cached, tagged, and auth-refreshed.

import { baseApi } from './baseApi';

const unwrap = (r: any) => (r && typeof r === 'object' && 'data' in r ? r.data : r);

export interface KycDocument {
  id: string;
  type: string;
  fileUrl: string;
  fileName: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  reviewNote?: string | null;
  expiryDate?: string | null;
  createdAt?: string;
}

export interface KycQueueItem {
  id: string;
  tenantId: string;
  status: string;
  submittedAt?: string | null;
  tenant?: { id: string; name?: string; type?: string; isActive?: boolean };
}

export interface KycReview {
  id: string;
  tenantId: string;
  status: string;
  registeredName?: string | null;
  rcNumber?: string | null;
  tin?: string | null;
  businessStructure?: string | null;
  natureOfBusiness?: string | null;
  addrLine1?: string | null;
  addrCity?: string | null;
  addrState?: string | null;
  contactPhone?: string | null;
  contactEmail?: string | null;
  website?: string | null;
  rejectionReason?: string | null;
  submittedAt?: string | null;
  documents: KycDocument[];
  requiredDocuments: string[];
  tenant?: { id: string; name?: string; type?: string; isActive?: boolean; contactEmail?: string };
  [k: string]: any;
}

export const adminKycApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getKycQueue: builder.query<{ items: KycQueueItem[]; total: number }, string | void>({
      query: (status) => (status ? `admin/kyc?status=${status}` : 'admin/kyc'),
      transformResponse: (r: any) => {
        const d = unwrap(r);
        return { items: d?.items ?? [], total: d?.total ?? 0 };
      },
      providesTags: ['KycQueue'],
    }),
    getKycReview: builder.query<KycReview, string>({
      query: (tenantId) => `admin/kyc/${tenantId}`,
      transformResponse: unwrap,
      providesTags: (_r, _e, tenantId) => [{ type: 'Kyc', id: tenantId }],
    }),
    startKycReview: builder.mutation<KycReview, string>({
      query: (tenantId) => ({ url: `admin/kyc/${tenantId}/start-review`, method: 'POST' }),
      transformResponse: unwrap,
      invalidatesTags: (_r, _e, tenantId) => [{ type: 'Kyc', id: tenantId }, 'KycQueue'],
    }),
    reviewKycDocument: builder.mutation<
      KycDocument,
      { tenantId: string; documentId: string; status: 'APPROVED' | 'REJECTED'; reviewNote?: string }
    >({
      query: ({ tenantId, documentId, ...body }) => ({
        url: `admin/kyc/${tenantId}/documents/${documentId}/review`,
        method: 'PATCH',
        body,
      }),
      transformResponse: unwrap,
      invalidatesTags: (_r, _e, { tenantId }) => [{ type: 'Kyc', id: tenantId }],
    }),
    approveKyc: builder.mutation<KycReview, { tenantId: string; note?: string }>({
      query: ({ tenantId, note }) => ({ url: `admin/kyc/${tenantId}/approve`, method: 'POST', body: { note } }),
      transformResponse: unwrap,
      invalidatesTags: (_r, _e, { tenantId }) => [{ type: 'Kyc', id: tenantId }, 'KycQueue'],
    }),
    rejectKyc: builder.mutation<KycReview, { tenantId: string; reason: string }>({
      query: ({ tenantId, reason }) => ({ url: `admin/kyc/${tenantId}/reject`, method: 'POST', body: { reason } }),
      transformResponse: unwrap,
      invalidatesTags: (_r, _e, { tenantId }) => [{ type: 'Kyc', id: tenantId }, 'KycQueue'],
    }),
    suspendKyc: builder.mutation<KycReview, { tenantId: string; reason: string }>({
      query: ({ tenantId, reason }) => ({ url: `admin/kyc/${tenantId}/suspend`, method: 'POST', body: { reason } }),
      transformResponse: unwrap,
      invalidatesTags: (_r, _e, { tenantId }) => [{ type: 'Kyc', id: tenantId }, 'KycQueue'],
    }),
    reinstateKyc: builder.mutation<KycReview, string>({
      query: (tenantId) => ({ url: `admin/kyc/${tenantId}/reinstate`, method: 'POST' }),
      transformResponse: unwrap,
      invalidatesTags: (_r, _e, tenantId) => [{ type: 'Kyc', id: tenantId }, 'KycQueue'],
    }),
  }),
});

export const {
  useGetKycQueueQuery,
  useGetKycReviewQuery,
  useStartKycReviewMutation,
  useReviewKycDocumentMutation,
  useApproveKycMutation,
  useRejectKycMutation,
  useSuspendKycMutation,
  useReinstateKycMutation,
} = adminKycApi;
