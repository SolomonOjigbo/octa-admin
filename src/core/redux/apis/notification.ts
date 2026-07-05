import BASE_URL from "./api";

const getToken = () => localStorage.getItem("accessToken") || "";
const authHeaders = () => ({ Authorization: `Bearer ${getToken()}` });

export interface AdminNotification {
  id: string;
  type: "info" | "success" | "warning" | "error";
  category: string | null;
  priority: string;
  title: string | null;
  message: string;
  link: string | null;
  isRead: boolean;
  createdAt: string;
}

export interface NotificationListResponse {
  data: AdminNotification[];
  meta: { total: number; page: number; limit: number; totalPages: number; unread: number };
}

export const notificationApi = {
  list: async (params: { page?: number; limit?: number } = {}): Promise<NotificationListResponse> => {
    const qs = new URLSearchParams();
    if (params.page) qs.set("page", String(params.page));
    if (params.limit) qs.set("limit", String(params.limit));
    const res = await fetch(`${BASE_URL}/notifications?${qs.toString()}`, { headers: authHeaders() });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  unreadCount: async (): Promise<{ unread: number }> => {
    const res = await fetch(`${BASE_URL}/notifications/unread-count`, { headers: authHeaders() });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  markRead: async (id: string): Promise<void> => {
    const res = await fetch(`${BASE_URL}/notifications/${id}/read`, { method: "PATCH", headers: authHeaders() });
    if (!res.ok) throw new Error(await res.text());
  },

  markAllRead: async (): Promise<void> => {
    const res = await fetch(`${BASE_URL}/notifications/read-all`, { method: "PATCH", headers: authHeaders() });
    if (!res.ok) throw new Error(await res.text());
  },

  remove: async (id: string): Promise<void> => {
    const res = await fetch(`${BASE_URL}/notifications/${id}`, { method: "DELETE", headers: authHeaders() });
    if (!res.ok) throw new Error(await res.text());
  },
};
