import React, { useState } from "react";
import { Select } from "antd";
import {
  useGetWarehousesByTenantQuery,
  useCreateWarehouseMutation,
  useUpdateWarehouseMutation,
  useDeleteWarehouseMutation,
} from "../../core/redux/services/adminPhase2Api";
import { useGetTenantsQuery } from "../../core/redux/services/adminTenantApi";
import CrudPage, { CrudField } from "./common/CrudPage";

const columns = [
  { title: "Name", dataIndex: "name" },
  { title: "Code", dataIndex: "code", render: (v: string) => v || "—" },
  { title: "Address", dataIndex: "address", ellipsis: true, render: (v: string) => v || "—" },
  { title: "Created", dataIndex: "createdAt", render: (v: string) => (v ? new Date(v).toLocaleDateString() : "—") },
];

const fields: CrudField[] = [
  { name: "name", label: "Name", required: true },
  { name: "code", label: "Code" },
  { name: "address", label: "Address", type: "textarea" },
];

const Warehouses: React.FC = () => {
  const [tenantId, setTenantId] = useState<string | null>(null);
  const { data: tenants = [] } = useGetTenantsQuery();
  const { data: warehouses = [], isFetching } = useGetWarehousesByTenantQuery(tenantId as string, { skip: !tenantId });
  const [create] = useCreateWarehouseMutation();
  const [update] = useUpdateWarehouseMutation();
  const [remove] = useDeleteWarehouseMutation();

  const picker = (
    <Select
      showSearch
      style={{ minWidth: 260 }}
      placeholder="Select a tenant…"
      optionFilterProp="label"
      value={tenantId}
      onChange={setTenantId}
      options={tenants.map((t: any) => ({ value: t.id, label: t.name || t.id }))}
      allowClear
    />
  );

  return (
    <CrudPage
      title="Warehouses"
      subtitle={tenantId ? "Warehouses for the selected tenant" : "Select a tenant to manage its warehouses"}
      rows={tenantId ? warehouses : []}
      loading={isFetching}
      columns={columns}
      toolbar={picker}
      fields={fields}
      onCreate={tenantId ? (values) => create({ tenantId, ...values }).unwrap() : undefined}
      onUpdate={tenantId ? (id, values) => update({ tenantId, warehouseId: id, ...values }).unwrap() : undefined}
      onDelete={tenantId ? (id) => remove({ id, tenantId }).unwrap() : undefined}
    />
  );
};

export default Warehouses;
