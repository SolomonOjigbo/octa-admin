import BASE_URL from "./api";
import { Store, StoreListResponse } from "../types/store";

const getToken = () => localStorage.getItem("accessToken") || "";

const handleResponse = async (res: Response) => {
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.message || res.statusText || "API Error");
  return json.data || json;
};

export const globalStoreApi = {

  getAllold: async (): Promise<StoreListResponse> => {
  const res = await fetch(`${BASE_URL}/admin/stores`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });

  if (!res.ok) throw new Error(await res.text());

  const json = await res.json(); 
  return {
    stores: json,
    count: json.length,
  };
},
getAll: async (): Promise<StoreListResponse> => {
  const res = await fetch(`${BASE_URL}/admin/stores`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });

  if (!res.ok) throw new Error(await res.text());

  const json = await res.json();

  return {
    stores: json.data || [],
    count: json.count || (json.data ? json.data.length : 0),
  };
},



  getById: async (id: string): Promise<Store> => {
    const res = await fetch(`${BASE_URL}/admin/stores/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });

    if (!res.ok) throw new Error(await res.text());
    const json = await res.json();

    return json.data || json;
  },

  create: async (dto: Partial<Store>): Promise<Store> => {
    const res = await fetch(`${BASE_URL}/admin/stores`, {
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

    update: async (id: string, dto: Partial<Store>): Promise<Store> => {
    const res = await fetch(`${BASE_URL}/admin/stores/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(dto),
    });
    return handleResponse(res);
  },


  delete: async (id: string): Promise<string> => {
    const res = await fetch(`${BASE_URL}/admin/stores/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getToken()}` },
    });

    if (!res.ok) throw new Error(await res.text());

    const json = await res.json();
    return json.data?.id || id;
  },
};
