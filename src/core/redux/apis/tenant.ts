import BASE_URL from "./api";
import { Tenant, TenantListResponse } from "../types/tenantTypes";

const getToken = () => localStorage.getItem("accessToken") || "";

const handleResponse = async (res: Response) => {
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.message || res.statusText || "API Error");
  return json.data || json;
};

export const globalTenantApi = {
  // GET ALL TENANTS
  getAll: async (): Promise<TenantListResponse> => {
    const res = await fetch(`${BASE_URL}/admin/tenants`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });

    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  // GET ONE
  getById: async (id: string): Promise<Tenant> => {
    const res = await fetch(`${BASE_URL}/admin/tenants/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });

    if (!res.ok) throw new Error(await res.text());
    const json = await res.json();

    return json.data || json;
  },

  // CREATE / ONBOARD
  create: async (dto: Partial<Tenant>): Promise<Tenant> => {
    const res = await fetch(`${BASE_URL}/admin/tenants/onboard`, {
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
  updateold: async (id: string, dto: Partial<Tenant>): Promise<Tenant> => {
    const res = await fetch(`${BASE_URL}/admin/tenants/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(dto),
    });

    return handleResponse(res);
  },
  update: async (tenantId: string, dto: Partial<Tenant>): Promise<Tenant> => {
  const res = await fetch(`${BASE_URL}/admin/tenants/${tenantId}`, {
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
    const res = await fetch(`${BASE_URL}/admin/tenants/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getToken()}` },
    });

    if (!res.ok) throw new Error(await res.text());

    const json = await res.json();
    return json.data?.id || id;
  },
};