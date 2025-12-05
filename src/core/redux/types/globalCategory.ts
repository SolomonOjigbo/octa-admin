// src/feature-module/global-category/globalCategory.types.ts

export interface GlobalSubcategory {
  id: string;
  name: string;
  description?: string | null;
  imageUrl?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface GlobalCategory {
  id: string;
  name: string;
  description?: string | null;
  imageUrl?: string | null;
  createdAt?: string;
  updatedAt?: string;
  parentId?: string | null;
    parent?: {
    id: string;
    name: string;
    description?: string | null;
    imageUrl?: string | null;
    createdAt?: string;
    updatedAt?: string;
  } | null;
  subcategories?: GlobalSubcategory[];
}

export interface GlobalCategoryListResponse {
  count: number;
  data: GlobalCategory[];
}
