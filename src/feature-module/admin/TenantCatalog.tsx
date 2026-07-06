import React, { useMemo, useState } from "react";
import { Card, Select, Tabs, Empty } from "antd";
import { useGetTenantsQuery } from "../../core/redux/services/adminTenantApi";
import {
  useGetTenantCategoriesQuery,
  useCreateTenantCategoryMutation,
  useUpdateTenantCategoryMutation,
  useDeleteTenantCategoryMutation,
  useGetTenantCatalogProductsQuery,
  useCreateTenantCatalogProductMutation,
  useUpdateTenantCatalogProductMutation,
  useDeleteTenantCatalogProductMutation,
} from "../../core/redux/services/adminTenantCatalogApi";
import { CrudTable, CrudField } from "./common/CrudPage";

const categoryFields: CrudField[] = [
  { name: "name", label: "Name", required: true },
  { name: "description", label: "Description", type: "textarea" },
];
const productFields: CrudField[] = [
  { name: "name", label: "Name", required: true },
  { name: "sku", label: "SKU", required: true },
  { name: "description", label: "Description", type: "textarea" },
];

const CategoriesTab: React.FC<{ tenantId: string }> = ({ tenantId }) => {
  const { data = [], isFetching } = useGetTenantCategoriesQuery(tenantId);
  const [create] = useCreateTenantCategoryMutation();
  const [update] = useUpdateTenantCategoryMutation();
  const [remove] = useDeleteTenantCategoryMutation();
  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Description", dataIndex: "description", ellipsis: true, render: (v: string) => v || "—" },
    { title: "Created", dataIndex: "createdAt", render: (v: string) => (v ? new Date(v).toLocaleDateString() : "—") },
  ];
  return (
    <CrudTable
      title="Category"
      rows={data}
      loading={isFetching}
      columns={columns}
      fields={categoryFields}
      card={false}
      onCreate={(v) => create({ tenantId, ...v }).unwrap()}
      onUpdate={(id, v) => update({ tenantId, id, name: v.name, description: v.description }).unwrap()}
      onDelete={(id) => remove({ tenantId, id }).unwrap()}
    />
  );
};

const ProductsTab: React.FC<{ tenantId: string }> = ({ tenantId }) => {
  const { data = [], isFetching } = useGetTenantCatalogProductsQuery(tenantId);
  const [create] = useCreateTenantCatalogProductMutation();
  const [update] = useUpdateTenantCatalogProductMutation();
  const [remove] = useDeleteTenantCatalogProductMutation();
  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "SKU", dataIndex: "sku", render: (v: string) => v || "—" },
    { title: "Category", key: "cat", render: (_: any, r: any) => r.tenantCategory?.name || r.tenantCategoryId || "—", ellipsis: true },
    { title: "Created", dataIndex: "createdAt", render: (v: string) => (v ? new Date(v).toLocaleDateString() : "—") },
  ];
  return (
    <CrudTable
      title="Product"
      rows={data}
      loading={isFetching}
      columns={columns}
      fields={productFields}
      card={false}
      onCreate={(v) => create({ tenantId, ...v }).unwrap()}
      onUpdate={(id, v) => update({ tenantId, id, name: v.name, sku: v.sku, description: v.description }).unwrap()}
      onDelete={(id) => remove({ tenantId, id }).unwrap()}
    />
  );
};

const TenantCatalog: React.FC = () => {
  const [tenantId, setTenantId] = useState<string | null>(null);
  const { data: tenants = [] } = useGetTenantsQuery();

  const items = useMemo(
    () =>
      tenantId
        ? [
            { key: "categories", label: "Categories", children: <CategoriesTab tenantId={tenantId} /> },
            { key: "products", label: "Products", children: <ProductsTab tenantId={tenantId} /> },
          ]
        : [],
    [tenantId]
  );

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h4 className="mb-1">Tenant Catalog</h4>
            <p className="text-muted mb-0">Manage any tenant's product categories and products</p>
          </div>
          <Select
            showSearch
            style={{ minWidth: 280 }}
            placeholder="Select a tenant…"
            optionFilterProp="label"
            value={tenantId}
            onChange={setTenantId}
            options={tenants.map((t: any) => ({ value: t.id, label: t.name || t.id }))}
            allowClear
          />
        </div>
        <Card>
          {tenantId ? <Tabs items={items} destroyInactiveTabPane /> : <Empty description="Select a tenant to manage its catalog" />}
        </Card>
      </div>
    </div>
  );
};

export default TenantCatalog;
