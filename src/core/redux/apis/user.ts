import BASE_URL from "./api";
import { User, UserListResponse } from "../types/user";

const getToken = () => localStorage.getItem("accessToken") || "";

const handleResponse = async (res: Response) => {
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.message || res.statusText || "API Error");
  return json.data || json;
};

export const globalUserApi = {

  getAll: async (): Promise<UserListResponse> => {
  const res = await fetch(`${BASE_URL}/admin/users`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });

  if (!res.ok) throw new Error(await res.text());

  const json = await res.json(); 
  return {
    users: json,
    count: json.length,
  };
},


  getById: async (userId: string): Promise<User> => {
    const res = await fetch(`${BASE_URL}/admin/users/${userId}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });

    if (!res.ok) throw new Error(await res.text());
    const json = await res.json();

    return json.data || json;
  },

  create: async (dto: Partial<User>): Promise<User> => {
    const res = await fetch(`${BASE_URL}/admin/users`, {
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

    update: async (userId: string, dto: Partial<User>): Promise<User> => {
    const res = await fetch(`${BASE_URL}/admin/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(dto),
    });
    return handleResponse(res);
  },


  delete: async (userId: string): Promise<string> => {
    const res = await fetch(`${BASE_URL}/admin/users/${userId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getToken()}` },
    });

    if (!res.ok) throw new Error(await res.text());

    const json = await res.json();
    return json.data?.userId || userId;
  },
};
