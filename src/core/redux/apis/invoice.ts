// src/core/apis/invoice.ts
import BASE_URL from "./api";
import { Invoice } from "../types/invoice";

const getToken = () => localStorage.getItem("accessToken") || "";

const handleResponse = async (res: Response) => {
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.message || res.statusText);
  return json.data || json;
};

export const invoiceApi = {
  // GET ALL
  getAll: async (): Promise<Invoice[]> => {
    const res = await fetch(`${BASE_URL}/admin/invoices`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return handleResponse(res);
  },

  // GET BY ID
  getById: async (id: string): Promise<Invoice> => {
    const res = await fetch(`${BASE_URL}/admin/invoices/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return handleResponse(res);
  },

  // GET BY TENANT
  getByTenant: async (tenantId: string): Promise<Invoice[]> => {
    const res = await fetch(`${BASE_URL}/admin/invoices/tenant/${tenantId}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return handleResponse(res);
  },

  // GET BY CUSTOMER
  getByCustomer: async (customerId: string): Promise<Invoice[]> => {
    const res = await fetch(`${BASE_URL}/admin/invoices/customer/${customerId}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return handleResponse(res);
  },

  // GET BY SUPPLIER
  getBySupplier: async (supplierId: string): Promise<Invoice[]> => {
    const res = await fetch(`${BASE_URL}/admin/invoices/supplier/${supplierId}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return handleResponse(res);
  },

  // CREATE
  create: async (dto: Partial<Invoice>): Promise<Invoice> => {
    const res = await fetch(`${BASE_URL}/admin/invoices`, {
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
  update: async (id: string, dto: Partial<Invoice>): Promise<Invoice> => {
    const res = await fetch(`${BASE_URL}/admin/invoices/${id}`, {
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
    const res = await fetch(`${BASE_URL}/admin/invoices/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    if (!res.ok) throw new Error(await res.text());
    return id;
  },
};
