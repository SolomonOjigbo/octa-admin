import React, { useMemo } from "react";
import {
  useGetBusinessEntitiesQuery,
  useCreateBusinessEntityMutation,
  useUpdateBusinessEntityMutation,
  useDeleteBusinessEntityMutation,
} from "../../core/redux/services/adminPhase2Api";
import { useGetTenantsQuery } from "../../core/redux/services/adminTenantApi";
import CrudPage, { CrudField } from "./common/CrudPage";

const columns = [
  { title: "Name", dataIndex: "name" },
  { title: "Tax ID", dataIndex: "taxId", render: (v: string) => v || "—" },
  { title: "Legal address", dataIndex: "legalAddress", ellipsis: true, render: (v: string) => v || "—" },
  { title: "Tenant", dataIndex: "tenantId", ellipsis: true, render: (v: string) => v || "—" },
  { title: "Created", dataIndex: "createdAt", render: (v: string) => (v ? new Date(v).toLocaleDateString() : "—") },
];

const BusinessEntities: React.FC = () => {
  const { data = [], isFetching } = useGetBusinessEntitiesQuery();
  const { data: tenants = [] } = useGetTenantsQuery();
  const [create] = useCreateBusinessEntityMutation();
  const [update] = useUpdateBusinessEntityMutation();
  const [remove] = useDeleteBusinessEntityMutation();

  const fields: CrudField[] = useMemo(
    () => [
      { name: "tenantId", label: "Tenant", type: "select", required: true, options: tenants.map((t: any) => ({ value: t.id, label: t.name || t.id })) },
      { name: "name", label: "Name", required: true },
      { name: "taxId", label: "Tax ID" },
      { name: "legalAddress", label: "Legal address", type: "textarea" },
    ],
    [tenants]
  );

  return (
    <CrudPage
      title="Business Entities"
      subtitle="Legal business entities across all tenants"
      rows={data}
      loading={isFetching}
      columns={columns}
      fields={fields}
      onCreate={(values) => create(values).unwrap()}
      onUpdate={(id, values) => update({ id, name: values.name, taxId: values.taxId, legalAddress: values.legalAddress }).unwrap()}
      onDelete={(id) => remove(id).unwrap()}
    />
  );
};

export default BusinessEntities;
