// src/feature-module/usermanagement/Sessions.tsx
//
// Platform session management (superadmin): pick a user, view their active
// sessions, and revoke one or all. Backed by /admin/sessions/*.

import React, { useState } from "react";
import { Card, Select, Table, Button, Tag, Popconfirm, Empty, message } from "antd";
import {
  useGetAdminUsersQuery,
  useGetUserSessionsQuery,
  useRevokeSessionMutation,
  useRevokeAllUserSessionsMutation,
} from "../../core/redux/services/adminSessionApi";

const fmt = (v?: string) => (v ? new Date(v).toLocaleString() : "—");

const Sessions: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const { data: users = [] } = useGetAdminUsersQuery();
  const { data: sessions = [], isFetching } = useGetUserSessionsQuery(userId as string, { skip: !userId });
  const [revokeSession] = useRevokeSessionMutation();
  const [revokeAll, { isLoading: revokingAll }] = useRevokeAllUserSessionsMutation();

  const userOptions = (Array.isArray(users) ? users : []).map((u: any) => ({
    value: u.id,
    label: `${u.name || u.email || u.id}${u.email ? ` · ${u.email}` : ""}`,
  }));

  const columns = [
    { title: "Session", dataIndex: "id", ellipsis: true },
    {
      title: "Status",
      key: "status",
      render: (_: any, r: any) => {
        const expired = r.expiresAt && new Date(r.expiresAt) < new Date();
        const revoked = r.revoked;
        return <Tag color={revoked ? "default" : expired ? "orange" : "green"}>{revoked ? "Revoked" : expired ? "Expired" : "Active"}</Tag>;
      },
    },
    { title: "Created", dataIndex: "createdAt", render: fmt },
    { title: "Expires", dataIndex: "expiresAt", render: fmt },
    { title: "Device / IP", key: "device", render: (_: any, r: any) => r.userAgent || r.ip || "—", ellipsis: true },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, r: any) => (
        <Popconfirm
          title="Revoke this session?"
          onConfirm={async () => {
            try { await revokeSession({ sessionId: r.id, userId: userId as string }).unwrap(); message.success("Session revoked"); }
            catch { message.error("Revoke failed"); }
          }}
        >
          <Button size="small" type="link" danger disabled={r.revoked}>Revoke</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="mb-3">
          <h4 className="mb-1">Active Sessions</h4>
          <p className="text-muted mb-0">View and revoke user sessions across the platform</p>
        </div>
        <Card>
          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
            <Select
              showSearch
              style={{ minWidth: 320 }}
              placeholder="Select a user…"
              optionFilterProp="label"
              options={userOptions}
              value={userId}
              onChange={setUserId}
              allowClear
            />
            {userId && sessions.length > 0 && (
              <Popconfirm
                title="Revoke ALL sessions for this user?"
                okButtonProps={{ danger: true }}
                onConfirm={async () => {
                  try { await revokeAll(userId).unwrap(); message.success("All sessions revoked"); }
                  catch { message.error("Revoke failed"); }
                }}
              >
                <Button danger loading={revokingAll}>Revoke all</Button>
              </Popconfirm>
            )}
          </div>

          {!userId ? (
            <Empty description="Pick a user to view their sessions" />
          ) : (
            <Table
              rowKey={(r: any) => r.id}
              columns={columns}
              dataSource={Array.isArray(sessions) ? sessions : []}
              loading={isFetching}
              size="small"
              scroll={{ x: "max-content" }}
              locale={{ emptyText: "No active sessions" }}
            />
          )}
        </Card>
      </div>
    </div>
  );
};

export default Sessions;
