export interface Category {
  id: string;
  name: string;
  description?: string | null;
  parentId?: string | null;
  imageUrl?: string | null;
  createdAt?: string;
  updatedAt?: string;
}
export interface Brand {
  id: string;
  name: string;
  manufacturer?: string;
  description?: string;
  logoUrl?: string;
  website?: string;
  isActive?: boolean;
  isGlobal?: boolean;
  tenantId?: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface Variant {
  id: string;
  globalProductId: string;
  name: string;
  sku: string;
  unitPrice?: string;
  costPrice?: string;
  stock?: string;
}



export interface GlobalProduct {
  id: string;
  name: string;
  sku: string;
  isActive: boolean;
    category?: Category | null;
  brand?: Brand | null;
  variants?: Variant[];
  description?: string;
  dosageForm?: string;
  strength?: string;
  packaging?: string;
  sellingType?: string;
  costPrice?: number;
  unitPrice?: number;
  reorderPoint?: number;
  reorderQuantity?: number;
  isVariable?: boolean;
  isPrescription?: boolean;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;

}

export interface GlobalProductListResponse {
  count: number;
  data: GlobalProduct[];
}

export interface CreateGlobalProductDto {
  globalCategoryId: string;
  brandId: string;
  name: string;
  sku: string;
  description?: string;
  dosageForm?: string;
  strength?: string;
  packaging?: string;
  sellingType?: string;
  costPrice?: number;
  unitPrice?: number;
  reorderPoint?: number;
  reorderQuantity?: number;
  isVariable?: boolean;
  isPrescription?: boolean;
  isActive?: boolean;
  imageUrl?: string;
}

export interface UpdateGlobalProductDto extends CreateGlobalProductDto {}


export interface GlobalProductImportResult {
  successCount: number;
  failedCount: number;
  errors: {
    row: number;
    message: string;
  }[];
}


export interface ImportError {
  row: number;
  message: string;
}

export interface ImportResult {
  successCount: number;
  failedCount: number;
  errors: ImportError[];
}

