/* =======================
   TENANT TYPES
======================= */

export type TenantType =
  | "RETAIL_PHARMACY"
  | "WHOLESALE_PHARMACY"
  | "HOSPITAL"
  | "CLINIC"
  | "DIAGNOSTIC_LAB"
  | "DISTRIBUTOR";

  export type StoreType =
  | "RETAIL_STORE"
  | "WHOLESALE_WAREHOUSE"
  | "DIAGNOSTIC_CENTER"
  | "HOSPITAL_OPD"
  | "CLINIC_BRANCH";


export interface Tenant {
  id: string;
  name: string;
  slug: string;
  legalName?: string;
  contactEmail?: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

/* =======================
   LIST RESPONSE
======================= */

export interface TenantListResponse {
  count: number;
  data: Tenant[];
}

/* =======================
   ONBOARDING TYPES
======================= */

export interface TenantOnboardPayload {
  tenant: {
    name: string;
    slug: string;
     type?: TenantType;
    legalName?: string;
    contactEmail?: string;
  };
  businessEntity: {
    name: string;
    tenantId?: string;
    taxId?: string;
    legalAddress?: string;
  };
  store: {
    name: string;
    code: string;
    address?: string;
    isMain?: boolean;
  type?: StoreType;

};
  adminUser: {
    name: string;
    email: string;
    password: string;
    phone?: string;
  };
  warehouse?: {
    code?: string;
    name?: string;
    address?: string;
  };
}

/* =======================
   UPDATE TENANT
======================= */

export interface UpdateTenantPayload {
  name?: string;
  slug?: string;
  legalName?: string;
  contactEmail?: string;
  branding?: Record<string, any>;
  settings?: Record<string, any>;
}
