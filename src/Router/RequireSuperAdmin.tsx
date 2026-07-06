// src/Router/RequireSuperAdmin.tsx
//
// Route guard for platform-superadmin pages. The backend is the real authority
// (/admin/* enforces requireSuperAdmin), so this is a UX gate: unauthenticated ->
// sign-in; determinately non-superadmin -> a 403 notice. When the persisted user
// carries no role info (indeterminate), we allow through and let the backend decide,
// so a valid superadmin is never locked out by a missing client-side field.

import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../core/redux/store";

function computeIsSuperAdmin(user: any): boolean | null {
  if (!user) return null;
  if (typeof user.isSuperAdmin === "boolean") return user.isSuperAdmin;
  const roles = user.roles ?? user.role;
  if (Array.isArray(roles)) {
    return roles.some((r: any) => (typeof r === "string" ? r : r?.name) === "superAdmin");
  }
  return null; // indeterminate — defer to the backend
}

const Forbidden: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="page-wrapper">
      <div className="content">
        <Result
          status="403"
          title="403"
          subTitle="This console is restricted to platform administrators."
          extra={
            <Button type="primary" onClick={() => navigate("/signin")}>
              Sign in as an admin
            </Button>
          }
        />
      </div>
    </div>
  );
};

// Works both as a nested-route wrapper (renders <Outlet/>) and as a direct wrapper
// (renders children) — `<RequireSuperAdmin><Page/></RequireSuperAdmin>`.
const RequireSuperAdmin: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const auth = useSelector((s: RootState) => s.auth as any);
  const accessToken = auth?.accessToken;
  if (!accessToken) return <Navigate to="/signin" replace />;

  const isSuper = computeIsSuperAdmin(auth?.user);
  if (isSuper === false) return <Forbidden />;
  return children ? <>{children}</> : <Outlet />;
};

export default RequireSuperAdmin;
