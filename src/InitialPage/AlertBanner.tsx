import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import { notificationApi, AdminNotification } from "../core/redux/apis/notification";

const BANNER_POLL_MS = 60000;

const variant: Record<string, string> = {
  info: "alert-info",
  success: "alert-success",
  warning: "alert-warning",
  error: "alert-danger",
};

const icon: Record<string, string> = {
  info: "info",
  success: "check-circle",
  warning: "alert-triangle",
  error: "alert-octagon",
};

const AlertBanner: React.FC = () => {
  const navigate = useNavigate();
  const [banners, setBanners] = useState<AdminNotification[]>([]);

  const load = useCallback(async () => {
    try {
      const res = await notificationApi.banners();
      setBanners(res.data ?? []);
    } catch (_) {
      /* silent */
    }
  }, []);

  useEffect(() => {
    load();
    const t = setInterval(load, BANNER_POLL_MS);
    return () => clearInterval(t);
  }, [load]);

  const dismiss = async (id: string) => {
    try {
      await notificationApi.dismissBanner(id);
    } catch (_) {
      /* non-blocking */
    }
    setBanners((prev) => prev.filter((b) => b.id !== id));
  };

  if (banners.length === 0) return null;

  return (
    <div className="alert-banners px-3 pt-2">
      {banners.map((b) => (
        <div
          key={b.id}
          className={`alert ${variant[b.type] || "alert-warning"} d-flex align-items-center justify-content-between mb-2`}
          role="alert"
        >
          <div
            className="d-flex align-items-center gap-2"
            role={b.link ? "button" : undefined}
            style={{ cursor: b.link ? "pointer" : "default", flex: 1 }}
            onClick={() => b.link && navigate(b.link)}
          >
            <FeatherIcon icon={icon[b.type] || "bell"} size={18} />
            <span>
              {b.title && <strong className="me-1">{b.title}:</strong>}
              {b.message}
            </span>
          </div>
          <button
            type="button"
            className="btn-close ms-3"
            aria-label="Dismiss"
            onClick={() => dismiss(b.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default AlertBanner;
