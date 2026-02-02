export interface SupplierTenant {
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

export interface Supplier {
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  leadTime?: number | null;
  performanceMetrics?: string | null;
  paymentTerms?: string | null;
  linkedB2BPartnerId?: string | null;
  notes?: string | null;
  tenantId?: string;
  createdAt?: string;
  updatedAt?: string;
  tenant?: SupplierTenant | null;
}

export interface SupplierListResponse {
  count: number;
  data: Supplier[];
}
