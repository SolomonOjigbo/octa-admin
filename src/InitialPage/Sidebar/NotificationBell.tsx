import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import { notificationApi, AdminNotification } from "../../core/redux/apis/notification";

const POLL_MS = 30000;

const typeIcon: Record<string, string> = {
  success: "check-circle",
  warning: "alert-triangle",
  error: "x-circle",
  info: "info",
};

function timeAgo(iso: string): string {
  if (!iso) return "";
  const secs = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (secs < 60) return "just now";
  const mins = Math.floor(secs / 60);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

const NotificationBell: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<AdminNotification[]>([]);
  const [unread, setUnread] = useState(0);

  const refresh = useCallback(async () => {
    try {
      const [list, count] = await Promise.all([
        notificationApi.list({ limit: 8 }),
        notificationApi.unreadCount(),
      ]);
      setItems(list.data ?? []);
      setUnread(count.unread ?? 0);
    } catch (_) {
      /* silent — bell should never break the header */
    }
  }, []);

  useEffect(() => {
    refresh();
    const t = setInterval(refresh, POLL_MS);
    return () => clearInterval(t);
  }, [refresh]);

  const handleOpen = async (n: AdminNotification) => {
    if (!n.isRead) {
      try {
        await notificationApi.markRead(n.id);
      } catch (_) {
        /* non-blocking */
      }
    }
    await refresh();
    if (n.link) navigate(n.link);
  };

  const handleMarkAll = async () => {
    try {
      await notificationApi.markAllRead();
    } catch (_) {
      /* non-blocking */
    }
    await refresh();
  };

  const handleDelete = async (id: string) => {
    try {
      await notificationApi.remove(id);
    } catch (_) {
      /* non-blocking */
    }
    await refresh();
  };

  return (
    <li className="nav-item dropdown nav-item-box">
      <Link to="#" className="dropdown-toggle nav-link" data-bs-toggle="dropdown">
        <FeatherIcon icon="bell" />
        {unread > 0 && <span className="badge rounded-pill">{unread > 99 ? "99+" : unread}</span>}
      </Link>
      <div className="dropdown-menu notifications">
        <div className="topnav-dropdown-header">
          <span className="notification-title">Notifications</span>
          {unread > 0 && (
            <Link to="#" className="clear-noti" onClick={handleMarkAll}>
              Mark all read
            </Link>
          )}
        </div>
        <div className="noti-content">
          {items.length === 0 && (
            <div className="text-center text-muted py-4">You&apos;re all caught up 🎉</div>
          )}
          <ul className="notification-list">
            {items.map((n) => (
              <li key={n.id} className={`notification-message ${n.isRead ? "" : "active"}`}>
                <div className="media d-flex align-items-start">
                  <span
                    className="me-2"
                    role="button"
                    tabIndex={0}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleOpen(n)}
                  >
                    <FeatherIcon icon={typeIcon[n.type] || "info"} size={18} />
                  </span>
                  <div
                    className="media-body flex-grow-1"
                    role="button"
                    tabIndex={0}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleOpen(n)}
                  >
                    <p className="noti-details mb-0">
                      <span className="noti-title">{n.title || n.category || "Notification"}</span>
                    </p>
                    <p className="noti-details text-muted mb-0">{n.message}</p>
                    <p className="noti-time mb-0">
                      <span className="notification-time">{timeAgo(n.createdAt)}</span>
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn btn-link btn-sm text-muted p-0 ms-2"
                    title="Dismiss"
                    onClick={() => handleDelete(n.id)}
                  >
                    <FeatherIcon icon="x" size={14} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="topnav-dropdown-footer">
          <Link to="#" onClick={() => refresh()}>
            Refresh
          </Link>
        </div>
      </div>
    </li>
  );
};

export default NotificationBell;
