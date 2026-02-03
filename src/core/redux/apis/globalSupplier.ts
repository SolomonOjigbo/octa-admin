import BASE_URL from "./api";
import { Supplier, SupplierListResponse } from "../types/globalSupplier";

const getToken = () => localStorage.getItem("accessToken") || "";

export const globalSupplierApi = {
  getAll: async (): Promise<SupplierListResponse> => {
    const res = await fetch(`${BASE_URL}/admin/suppliers`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  getById: async (id: string): Promise<Supplier> => {
  const res = await fetch(`${BASE_URL}/admin/suppliers/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error(await res.text());

  const json = await res.json();
  return json.data || json;
},

  create: async (dto: Partial<Supplier>): Promise<Supplier> => {
    const res = await fetch(`${BASE_URL}/admin/suppliers`, {
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


  update: async (id: string, dto: Partial<Supplier>): Promise<Supplier> => {
  const res = await fetch(`${BASE_URL}/admin/suppliers/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(dto),
  });
  if (!res.ok) throw new Error(await res.text());

  const json = await res.json();
  return json.data;
},

  delete: async (id: string): Promise<string> => {
    const res = await fetch(`${BASE_URL}/admin/suppliers/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    if (!res.ok) throw new Error(await res.text());
    const json = await res.json();
    return json.data?.id || id;
  },
};
