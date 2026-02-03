// src/feature-module/global-brand/globalBrand.types.ts

export interface BrandTenant {
  id: string;
  name: string;
  slug: string;
  type: string;
  legalName?: string | null;
  contactEmail?: string | null;
  branding?: any | null;
  createdAt?: string;
  updatedAt?: string;
  isSystem?: boolean;
  isActive?: boolean;
}

export interface GlobalBrand {
  id: string;
  name: string;
  manufacturer?: string | null;
  description?: string | null;
  logoUrl?: string | null;
  website?: string | null;
  isActive: boolean;
  isGlobal: boolean;
  tenantId?: string;
  createdAt?: string;
  updatedAt?: string;
  tenant?: BrandTenant | null;
}

export interface GlobalBrandListResponse {
  count: number;
  data: GlobalBrand[];
}
