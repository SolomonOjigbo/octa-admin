import React from "react";
import {
  useGetBusinessEntitiesQuery,
  useUpdateBusinessEntityMutation,
  useDeleteBusinessEntityMutation,
} from "../../core/redux/services/adminPhase2Api";
import CrudPage, { CrudField } from "./common/CrudPage";

const fields: CrudField[] = [
  { name: "name", label: "Name", required: true },
  { name: "legalName", label: "Legal name" },
  { name: "address", label: "Address", type: "textarea" },
  { name: "email", label: "Email" },
  { name: "phone", label: "Phone" },
];

const columns = [
  { title: "Name", dataIndex: "name" },
  { title: "Legal name", dataIndex: "legalName", render: (v: string) => v || "—" },
  { title: "Type", dataIndex: "type", render: (v: string) => v || "—" },
  { title: "Tenant", dataIndex: "tenantId", ellipsis: true, render: (v: string) => v || "—" },
  { title: "Created", dataIndex: "createdAt", render: (v: string) => (v ? new Date(v).toLocaleDateString() : "—") },
];

const BusinessEntities: React.FC = () => {
  const { data = [], isFetching } = useGetBusinessEntitiesQuery();
  const [update] = useUpdateBusinessEntityMutation();
  const [remove] = useDeleteBusinessEntityMutation();
  return (
    <CrudPage
      title="Business Entities"
      subtitle="Legal business entities across all tenants"
      rows={data}
      loading={isFetching}
      columns={columns}
      fields={fields}
      onUpdate={(id, values) => update({ id, ...values }).unwrap()}
      onDelete={(id) => remove(id).unwrap()}
    />
  );
};

export default BusinessEntities;
