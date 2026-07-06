// src/feature-module/tenants/Tenant360.tsx
//
// Platform-admin 360 view of a single tenant: header + lifecycle actions, and a
// tabbed set of the tenant's sub-resources, each lazily loaded from the backend
// /admin/tenants/:id/* endpoints via RTK Query (cached, auto-refreshed).

import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Card, Tabs, Table, Tag, Button, Descriptions, Spin, Popconfirm, Space, message, Empty,
} from "antd";
import {
  useGetTenantQuery,
  useGetTenantStoresQuery,
  useGetTenantWarehousesQuery,
  useGetTenantUsersQuery,
  useGetTenantCustomersQuery,
  useGetTenantBusinessEntitiesQuery,
  useGetTenantSuppliersQuery,
  useGetTenantProductSuppliersQuery,
  useGetTenantInventoriesQuery,
  useGetTenantTransactionsQuery,
  useGetTenantPaymentsQuery,
  useGetTenantPosSessionsQuery,
  useDeactivateTenantMutation,
  useReactivateTenantMutation,
  useDeleteTenantMutation,
} from "../../core/redux/services/adminTenantApi";

// Infer up to `max` display columns from the first row (skips nested objects/arrays,
// which render as compact JSON). Keeps the generic tables readable without per-
// resource column definitions.
function inferColumns(rows: any[], max = 6) {
  const first = rows?.[0];
  if (!first || typeof first !== "object") return [];
  const keys = Object.keys(first).filter((k) => {
    const v = first[k];
    return v === null || ["string", "number", "boolean"].includes(typeof v);
  });
  return keys.slice(0, max).map((k) => ({
    title: k,
    dataIndex: k,
    ellipsis: true,
    render: (v: any) => {
      if (v === null || v === undefined) return <span className="text-muted">—</span>;
      if (typeof v === "boolean") return <Tag color={v ? "green" : "default"}>{String(v)}</Tag>;
      if (typeof v === "string" && /\d{4}-\d{2}-\d{2}T/.test(v)) return new Date(v).toLocaleString();
      return String(v);
    },
  }));
}

const ResourceTab: React.FC<{ useHook: any; tenantId: string }> = ({ useHook, tenantId }) => {
  const { data = [], isFetching, isError } = useHook(tenantId);
  const rows: any[] = Array.isArray(data) ? data : (data as any)?.data ?? [];
  if (isFetching) return <div className="text-center py-4"><Spin /></div>;
  if (isError) return <Empty description="Couldn't load this resource" />;
  return (
    <Table
      rowKey={(r: any) => r.id ?? r._id ?? JSON.stringify(r).slice(0, 40)}
      dataSource={rows}
      columns={inferColumns(rows)}
      loading={isFetching}
      size="small"
      scroll={{ x: "max-content" }}
      pagination={{ pageSize: 10, showSizeChanger: true }}
      locale={{ emptyText: "No records" }}
    />
  );
};

const Tenant360: React.FC = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();

  const { data: tenant, isLoading } = useGetTenantQuery(id, { skip: !id });
  const [deactivate, { isLoading: deactivating }] = useDeactivateTenantMutation();
  const [reactivate, { isLoading: reactivating }] = useReactivateTenantMutation();
  const [removeTenant, { isLoading: deleting }] = useDeleteTenantMutation();

  const isActive = tenant?.isActive ?? tenant?.status !== "INACTIVE";

  const act = async (fn: () => Promise<any>, ok: string) => {
    try { await fn(); message.success(ok); } catch { message.error("Action failed"); }
  };

  const tabs = [
    { key: "stores", label: "Stores", useHook: useGetTenantStoresQuery },
    { key: "warehouses", label: "Warehouses", useHook: useGetTenantWarehousesQuery },
    { key: "users", label: "Users", useHook: useGetTenantUsersQuery },
    { key: "customers", label: "Customers", useHook: useGetTenantCustomersQuery },
    { key: "entities", label: "Business Entities", useHook: useGetTenantBusinessEntitiesQuery },
    { key: "suppliers", label: "Suppliers", useHook: useGetTenantSuppliersQuery },
    { key: "product-suppliers", label: "Product Suppliers", useHook: useGetTenantProductSuppliersQuery },
    { key: "inventories", label: "Inventory", useHook: useGetTenantInventoriesQuery },
    { key: "transactions", label: "Transactions", useHook: useGetTenantTransactionsQuery },
    { key: "payments", label: "Payments", useHook: useGetTenantPaymentsQuery },
    { key: "pos-sessions", label: "POS Sessions", useHook: useGetTenantPosSessionsQuery },
  ].map((t) => ({
    key: t.key,
    label: t.label,
    children: <ResourceTab useHook={t.useHook} tenantId={id} />,
  }));

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h4 className="mb-0">{tenant?.name || "Tenant"}</h4>
            <Link to="/tenants" className="small">← Back to tenants</Link>
          </div>
          <Space>
            {isActive ? (
              <Popconfirm title="Deactivate this tenant?" onConfirm={() => act(() => deactivate(id).unwrap(), "Tenant deactivated")}>
                <Button danger loading={deactivating}>Deactivate</Button>
              </Popconfirm>
            ) : (
              <Button type="primary" loading={reactivating} onClick={() => act(() => reactivate(id).unwrap(), "Tenant reactivated")}>
                Reactivate
              </Button>
            )}
            <Popconfirm
              title="Delete this tenant and all its data? This cannot be undone."
              okButtonProps={{ danger: true }}
              onConfirm={() => act(async () => { await removeTenant(id).unwrap(); navigate("/tenants"); }, "Tenant deleted")}
            >
              <Button danger loading={deleting}>Delete</Button>
            </Popconfirm>
          </Space>
        </div>

        <Card className="mb-3">
          {isLoading ? (
            <div className="text-center py-4"><Spin /></div>
          ) : (
            <Descriptions bordered size="small" column={{ xs: 1, sm: 2, md: 3 }}>
              <Descriptions.Item label="Name">{tenant?.name || "—"}</Descriptions.Item>
              <Descriptions.Item label="Type">{tenant?.type || "—"}</Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag color={isActive ? "green" : "red"}>{isActive ? "Active" : "Inactive"}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Contact">{tenant?.contactEmail || "—"}</Descriptions.Item>
              <Descriptions.Item label="Slug">{tenant?.slug || "—"}</Descriptions.Item>
              <Descriptions.Item label="Created">
                {tenant?.createdAt ? new Date(tenant.createdAt).toLocaleDateString() : "—"}
              </Descriptions.Item>
            </Descriptions>
          )}
        </Card>

        <Card>
          <Tabs items={tabs} destroyInactiveTabPane />
        </Card>
      </div>
    </div>
  );
};

export default Tenant360;
