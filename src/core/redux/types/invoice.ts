// types/invoice.ts

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  type: string;
  legalName?: string | null;
  contactEmail?: string | null;
  branding?: string | null;
  createdAt: string;
  updatedAt: string;
  isSystem: boolean;
  isActive: boolean;
}

export interface Customer {
  id: string;
  tenantId: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  gender?: string | null;
  dateOfBirth?: string | null;
  isActive: boolean;
  loyaltyNumber?: string | null;
  segment?: string | null;
  tags?: string[];
  defaultPaymentTerm?: string | null;
  createdAt: string;
  updatedAt: string;
  linkedTenantId?: string | null;
}

export interface Supplier {
  id: string;
  tenantId: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  leadTime?: string | null;
  performanceMetrics?: any;
  paymentTerms?: any;
  linkedB2BPartnerId?: string | null;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Invoice {
  id: string;
  tenantId: string;
  customerId?: string | null;
  referenceId?: string | null;
  invoiceNo: string;
  issueDate: string;
  supplierId?: string | null;
  dueDate?: string | null;
  paymentTerms?: string | null;
  status: string;
  paymentStatus: string;
  purchaseOrderId?: string | null;
  referenceType?: string | null;
  subTotal: string;
  taxTotal: string;
  amountPaid?: string | null;
  totalAmount: string;
  metadata?: any;
  createdById: string;
  updatedById?: string | null;
  createdAt: string;
  updatedAt: string;
  quotationId?: string | null;
  tenant: Tenant;
  customer?: Customer | null;
  supplier?: Supplier | null;
  purchaseOrder?: any;
}
