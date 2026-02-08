
export interface GlobalProduct {
  id: string;
  name: string;
  sku: string;
  imageUrl?: string | null;
}

export interface GlobalVariant {
  id: string;
  globalProductId: string;
  name: string;
  sku: string;
  imageUrl?: string | null;
  packaging?: string | null;
  costPrice: string | number;
  unitPrice: string | number;
  stock: string | number;
  createdAt: string;
  updatedAt?: string;
  attributes?: Record<string, any> | null;
  product?: GlobalProduct | null;
}

export interface GlobalVariantListResponse {
  count: number;
  data: GlobalVariant[];
}
