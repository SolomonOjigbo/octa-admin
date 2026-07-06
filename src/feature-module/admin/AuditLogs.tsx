// src/feature-module/admin/AuditLogs.tsx
//
// Platform audit-log viewer: all activity (or scoped to one tenant), with
// client-side search + action/module filters and expandable detail rows.

import React, { useMemo, useState } from "react";
import { Card, Table, Tag, Select, Input, Space } from "antd";
import { useGetAuditLogsQuery, useGetTenantAuditLogsQuery } from "../../core/redux/services/adminAuditApi";
import { useGetTenantsQuery } from "../../core/redux/services/adminTenantApi";

const txt = (v: any) => (v == null || v === "" ? "—" : String(v));
const dateTime = (v: any) => (v ? new Date(v).toLocaleString() : "—");

const actionColor = (a = "") => {
  if (/DELETE|REVOKE|REMOVE|DEACTIVATE/i.test(a)) return "red";
  if (/CREATE|ADD|ASSIGN|ACTIVATE|INVITE/i.test(a)) return "green";
  if (/UPDATE|EDIT|CHANGE|TOGGLE/i.test(a)) return "blue";
  if (/LOGIN|LOGOUT|AUTH/i.test(a)) return "purple";
  return "default";
};

const AuditLogs: React.FC = () => {
  const [tenantId, setTenantId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [action, setAction] = useState<string | null>(null);
  const [module, setModule] = useState<string | null>(null);

  const { data: tenants = [] } = useGetTenantsQuery();
  const all = useGetAuditLogsQuery(undefined, { skip: !!tenantId });
  const scoped = useGetTenantAuditLogsQuery(tenantId as string, { skip: !tenantId });
  const rows: any[] = tenantId ? scoped.data ?? [] : all.data ?? [];
  const loading = tenantId ? scoped.isFetching : all.isFetching;

  const actions = useMemo(() => Array.from(new Set(rows.map((r) => r.action).filter(Boolean))).sort(), [rows]);
  const modules = useMemo(() => Array.from(new Set(rows.map((r) => r.module).filter(Boolean))).sort(), [rows]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter((r) => {
      if (action && r.action !== action) return false;
      if (module && r.module !== module) return false;
      if (q) {
        const hay = `${r.action} ${r.module} ${r.entityId} ${r.userId} ${r.user?.name} ${r.ipAddress}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [rows, search, action, module]);

  const columns = [
    { title: "Time", dataIndex: "timestamp", render: (v: any, r: any) => dateTime(v || r.createdAt), width: 170 },
    { title: "User", key: "user", ellipsis: true, render: (_: any, r: any) => txt(r.user?.name || r.user?.email || r.userId) },
    { title: "Action", dataIndex: "action", render: (a: string) => <Tag color={actionColor(a)}>{txt(a)}</Tag> },
    { title: "Module", dataIndex: "module", render: txt },
    { title: "Entity", dataIndex: "entityId", ellipsis: true, render: txt },
    { title: "Tenant", dataIndex: "tenantId", ellipsis: true, render: txt },
    { title: "IP", dataIndex: "ipAddress", render: txt },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="mb-3">
          <h4 className="mb-1">Audit Logs</h4>
          <p className="text-muted mb-0">Platform-wide activity trail</p>
        </div>
        <Card>
          <Space wrap className="mb-3">
            <Select
              showSearch allowClear style={{ minWidth: 220 }} placeholder="All tenants"
              optionFilterProp="label" value={tenantId} onChange={setTenantId}
              options={tenants.map((t: any) => ({ value: t.id, label: t.name || t.id }))}
            />
            <Select
              allowClear style={{ minWidth: 200 }} placeholder="Action" value={action} onChange={setAction}
              options={actions.map((a) => ({ value: a, label: a }))} showSearch optionFilterProp="label"
            />
            <Select
              allowClear style={{ minWidth: 180 }} placeholder="Module" value={module} onChange={setModule}
              options={modules.map((m) => ({ value: m, label: m }))} showSearch optionFilterProp="label"
            />
            <Input.Search placeholder="Search user / entity / IP…" allowClear style={{ width: 260 }}
              onChange={(e) => setSearch(e.target.value)} />
          </Space>

          <Table
            rowKey={(r: any) => r.id ?? JSON.stringify(r).slice(0, 40)}
            columns={columns}
            dataSource={filtered}
            loading={loading}
            size="small"
            scroll={{ x: "max-content" }}
            pagination={{ pageSize: 25, showSizeChanger: true, showTotal: (t) => `${t} entries` }}
            expandable={{
              expandedRowRender: (r: any) => (
                <pre style={{ margin: 0, whiteSpace: "pre-wrap", fontSize: 12 }}>
                  {JSON.stringify(r.details ?? r.metadata ?? {}, null, 2)}
                </pre>
              ),
              rowExpandable: (r: any) => Boolean(r.details || r.metadata),
            }}
          />
        </Card>
      </div>
    </div>
  );
};

export default AuditLogs;
