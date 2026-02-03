import BASE_URL from "./api";
import { GlobalBrand, GlobalBrandListResponse } from "../types/globalBrand";

const getToken = () => localStorage.getItem("accessToken") || "";

export const globalBrandApi = {
  getAll: async (): Promise<GlobalBrandListResponse> => {
    const res = await fetch(`${BASE_URL}/admin/brands`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });

    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  getById: async (id: string): Promise<GlobalBrand> => {
    const res = await fetch(`${BASE_URL}/admin/brands/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });

    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  // CREATE
  create: async (dto: Partial<GlobalBrand>): Promise<GlobalBrand> => {
    const res = await fetch(`${BASE_URL}/admin/brands`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(dto),
    });

    if (!res.ok) throw new Error(await res.text());
    return (await res.json()).data;
  },

  // UPDATE
  update: async (id: string, dto: Partial<GlobalBrand>): Promise<GlobalBrand> => {
    const res = await fetch(`${BASE_URL}/admin/brands/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(dto),
    });

    if (!res.ok) throw new Error(await res.text());
    return (await res.json()).data;
  },

  // DELETE
  delete: async (id: string): Promise<string> => {
    const res = await fetch(`${BASE_URL}/admin/brands/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getToken()}` },
    });

    if (!res.ok) throw new Error(await res.text());

    const json = await res.json();
    return json.data?.id || id;
  },
};
