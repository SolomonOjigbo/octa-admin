import BASE_URL from "./api";
import { GlobalCategory, GlobalCategoryListResponse } from "../types/globalCategory";

const getToken = () => localStorage.getItem("accessToken") || "";

export const globalCategoryApi = {
  getAll: async (): Promise<GlobalCategoryListResponse> => {
    const response = await fetch(`${BASE_URL}/admin/global-category`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (!response.ok) throw new Error(await response.text());

    return response.json();
  },

  getById: async (id: string): Promise<GlobalCategory> => {
    const response = await fetch(`${BASE_URL}/admin/global-category/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (!response.ok) throw new Error(await response.text());

    return response.json();
  },

  getSubcategories: async (id: string): Promise<GlobalCategory[]> => {
    const response = await fetch(
      `${BASE_URL}/admin/global-category/${id}/subcategories`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );

    if (!response.ok) throw new Error(await response.text());

    return response.json();
  },

  create: async (dto: Partial<GlobalCategory>): Promise<GlobalCategory> => {
    const response = await fetch(`${BASE_URL}/admin/global-category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(dto),
    });

    if (!response.ok) throw new Error(await response.text());

    const json = await response.json();
    return json.data;
  },

    // UPDATE CATEGORY

update: async (id: string, data: Partial<GlobalCategory>): Promise<GlobalCategory> => {
  const response = await fetch(`${BASE_URL}/admin/global-category/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error(await response.text());

  const json = await response.json();
  return json.data; // ensure you return the updated category object
},

   // DELETE CATEGORY

  delete: async (id: string): Promise<string> => {
  const response = await fetch(`${BASE_URL}/admin/global-category/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` },
  });

  if (!response.ok) throw new Error(await response.text());

  const json = await response.json();
  // return the deleted id directly for convenience
  return json.data?.id || id;
},

};
