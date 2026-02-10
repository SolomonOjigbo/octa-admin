

import BASE_URL from "./api";
import {
  GlobalVariant,
  GlobalVariantListResponse,
} from "../types/globalVariant";

const getToken = () => localStorage.getItem("accessToken") || "";

const handleResponse = async (res: Response) => {
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.message || res.statusText);
  return json.data || json;
};

export const globalVariantApi = {
  // GET ALL
  getAll: async (): Promise<GlobalVariantListResponse> => {
    const res = await fetch(`${BASE_URL}/admin/global-variant`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  // GET BY ID
  getById: async (id: string): Promise<GlobalVariant> => {
    const res = await fetch(`${BASE_URL}/admin/global-variant/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return handleResponse(res);
  },

  // GET BY GLOBAL PRODUCT
  getByProduct: async (
    globalProductId: string
  ): Promise<GlobalVariantListResponse> => {
    const res = await fetch(
      `${BASE_URL}/admin/global-variant/product/${globalProductId}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );

    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  // CREATE
  create: async (
    dto: Partial<GlobalVariant>
  ): Promise<GlobalVariant> => {
    const res = await fetch(`${BASE_URL}/admin/global-variant`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(dto),
    });

    return handleResponse(res);
  },

  // UPDATE
  update: async (
    id: string,
    dto: Partial<GlobalVariant>
  ): Promise<GlobalVariant> => {
    const res = await fetch(`${BASE_URL}/admin/global-variant/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(dto),
    });

    return handleResponse(res);
  },

  // DELETE
  delete: async (id: string): Promise<string> => {
    const res = await fetch(`${BASE_URL}/admin/global-variant/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (!res.ok) throw new Error(await res.text());
    return id;
  },
};
