export interface Customer {
  id: string;
  tenantId: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  gender: string | null;
  dateOfBirth: string | null;
  isActive: boolean;
  loyaltyNumber: string | null;
  segment: string | null;
  tags: string[] | null;
  defaultPaymentTerm: string | null;
  createdAt: string;
  updatedAt: string;
  linkedTenantId: string | null;
}

export interface CustomerListResponse {
  count: number;
  customers: Customer[];
}
