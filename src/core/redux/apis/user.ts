import BASE_URL from "./api";
import { User, UserListResponse,InviteUserDto  } from "../types/user";

const getToken = () => localStorage.getItem("accessToken") || "";

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
};

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

   getByTenant: async (tenantId: string): Promise<UserListResponse> => {
    const res = await fetch(
      `${BASE_URL}/admin/users/tenant/${tenantId}`,
      { headers }
    );
    const json = await handleResponse(res);
    return { users: json, count: json.length };
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
    updateByTenantAndUser: async (
    tenantId: string,
    userId: string,
    dto: Partial<User>
  ): Promise<User> => {
    const res = await fetch(
      `${BASE_URL}/admin/users/tenants/${tenantId}/user/${userId}`,
      {
        method: "PUT",
        headers,
        body: JSON.stringify(dto),
      }
    );
    return handleResponse(res);
  },

    // =====================
  // ACTIVATE / DEACTIVATE
  // =====================
  deactivate: async (userId: string): Promise<User> => {
    const res = await fetch(
      `${BASE_URL}/admin/users/deactivate/${userId}`,
      { method: "PATCH", headers }
    );
    return handleResponse(res).then((r) => r.user);
  },

  reactivate: async (userId: string): Promise<User> => {
    const res = await fetch(
      `${BASE_URL}/admin/users/reactivate/${userId}`,
      { method: "PATCH", headers }
    );
    return handleResponse(res).then((r) => r.user);
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

    // =====================
  // INVITE USER
  // =====================
  invite: async (dto: InviteUserDto): Promise<User> => {
    const res = await fetch(`${BASE_URL}/admin/users/invite`, {
      method: "POST",
      headers,
      body: JSON.stringify(dto),
    });
    return handleResponse(res).then((r) => r.user);
  },
};
