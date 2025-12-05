// src/feature-module/global-products/globalProduct.api.ts

import {
  CreateGlobalProductDto,
  GlobalProductListResponse,
  UpdateGlobalProductDto,
  GlobalProduct,
} from "../types/globalProduct";
import BASE_URL from "./api";

const getToken = () => localStorage.getItem("accessToken") || "";

// --------------------------------
// GET ALL PRODUCTS
// --------------------------------
export const globalProductApi = {
  getAll: async (): Promise<GlobalProductListResponse> => {
    const response = await fetch(`${BASE_URL}/admin/global-product`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (!response.ok) throw new Error(await response.text());
    return response.json();
  },

  // --------------------------------
  // GET PRODUCT BY ID
  // --------------------------------
  getById: async (id: string): Promise<GlobalProduct> => {
    const response = await fetch(`${BASE_URL}/admin/global-product/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (!response.ok) throw new Error(await response.text());

    const json = await response.json();
    return json.data ?? json; // backend difference safety
  },

  // --------------------------------
  // CREATE PRODUCT
  // --------------------------------
  create: async (dto: CreateGlobalProductDto): Promise<GlobalProduct> => {
    const response = await fetch(`${BASE_URL}/admin/global-product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(dto),
    });

    if (!response.ok) throw new Error(await response.text());

    const json = await response.json();
    return json.data ?? json;
  },

  // --------------------------------
  // UPDATE PRODUCT
  // --------------------------------
  update: async (
    id: string,
    dto: Partial<GlobalProduct>
  ): Promise<GlobalProduct> => {
    const response = await fetch(`${BASE_URL}/admin/global-product/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(dto),
    });

    if (!response.ok) throw new Error(await response.text());

    const json = await response.json();
    return json.data ?? json;
  },
  

  // --------------------------------
  // DELETE PRODUCT
  // --------------------------------
  delete: async (id: string): Promise<{ message: string }> => {
    const response = await fetch(`${BASE_URL}/admin/global-product/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (!response.ok) throw new Error(await response.text());
    return await response.json();
  },
};
