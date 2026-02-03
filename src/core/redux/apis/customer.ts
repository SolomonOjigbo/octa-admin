import BASE_URL from "./api";
import { Customer, CustomerListResponse } from "../types/customer";

const getToken = () => localStorage.getItem("accessToken") || "";

const handleResponse = async (res: Response) => {
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.message || res.statusText || "API Error");
  return json.data || json;
};

export const globalCustomerApi = {
  getAll: async (): Promise<CustomerListResponse> => {
    const res = await fetch(`${BASE_URL}/admin/customers`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });

    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  getById: async (id: string): Promise<Customer> => {
    const res = await fetch(`${BASE_URL}/admin/customers/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });

    if (!res.ok) throw new Error(await res.text());
    const json = await res.json();

    return json.data || json;
  },

  create: async (dto: Partial<Customer>): Promise<Customer> => {
    const res = await fetch(`${BASE_URL}/admin/customers`, {
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

    update: async (id: string, dto: Partial<Customer>): Promise<Customer> => {
    const res = await fetch(`${BASE_URL}/admin/customers/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(dto),
    });
    return handleResponse(res);
  },

  updateold: async (id: string, dto: Partial<Customer>): Promise<Customer> => {
    const res = await fetch(`${BASE_URL}/admin/customers/${id}`, {
      method: "PATCH",
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
    const res = await fetch(`${BASE_URL}/admin/customers/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getToken()}` },
    });

    if (!res.ok) throw new Error(await res.text());

    const json = await res.json();
    return json.data?.id || id;
  },
};
