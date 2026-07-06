import React from "react";
import { Button, Tag, Popconfirm, message } from "antd";
import {
  useGetB2bConnectionsQuery,
  useActivateB2bMutation,
  useDeactivateB2bMutation,
  useDeleteB2bMutation,
} from "../../core/redux/services/adminPhase2Api";
import CrudPage from "./common/CrudPage";

const statusColor: Record<string, string> = { ACTIVE: "green", APPROVED: "green", PENDING: "orange", REJECTED: "red", REVOKED: "default", INACTIVE: "default" };

const B2bConnections: React.FC = () => {
  const { data = [], isFetching } = useGetB2bConnectionsQuery();
  const [activate] = useActivateB2bMutation();
  const [deactivate] = useDeactivateB2bMutation();
  const [remove] = useDeleteB2bMutation();

  const columns = [
    { title: "Requester", key: "a", ellipsis: true, render: (_: any, r: any) => r.tenantA?.name || r.tenantAId || "—" },
    { title: "Partner", key: "b", ellipsis: true, render: (_: any, r: any) => r.tenantB?.name || r.tenantBId || "—" },
    { title: "Type", dataIndex: "type", render: (v: string) => v || "—" },
    { title: "Status", dataIndex: "status", render: (s: string) => <Tag color={statusColor[s] || "blue"}>{s || "—"}</Tag> },
    { title: "Created", dataIndex: "createdAt", render: (v: string) => (v ? new Date(v).toLocaleDateString() : "—") },
  ];

  const act = async (fn: () => Promise<any>, ok: string) => {
    try { await fn(); message.success(ok); } catch { message.error("Action failed"); }
  };

  return (
    <CrudPage
      title="B2B Connections"
      subtitle="Inter-tenant partnership connections"
      rows={data}
      loading={isFetching}
      columns={columns}
      onDelete={(id) => remove(id).unwrap()}
      extraActions={(r) => {
        const active = ["ACTIVE", "APPROVED"].includes(r.status);
        return active ? (
          <Popconfirm title="Deactivate this connection?" onConfirm={() => act(() => deactivate(r.id).unwrap(), "Deactivated")}>
            <Button size="small" type="link">Deactivate</Button>
          </Popconfirm>
        ) : (
          <Button size="small" type="link" onClick={() => act(() => activate(r.id).unwrap(), "Activated")}>Activate</Button>
        );
      }}
    />
  );
};

export default B2bConnections;
