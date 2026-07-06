import React from "react";
import { useGetBarcodesQuery, useDeleteBarcodeMutation } from "../../core/redux/services/adminPhase2Api";
import CrudPage from "./common/CrudPage";

const Barcodes: React.FC = () => {
  const { data = [], isFetching } = useGetBarcodesQuery();
  const [remove] = useDeleteBarcodeMutation();

  const columns = [
    { title: "Code", key: "code", render: (_: any, r: any) => r.code || r.barcode || r.value || "—", ellipsis: true },
    { title: "Product", key: "product", ellipsis: true, render: (_: any, r: any) => r.tenantProduct?.name || r.product?.name || r.tenantProductId || "—" },
    { title: "Tenant", dataIndex: "tenantId", ellipsis: true, render: (v: string) => v || "—" },
    { title: "Created", dataIndex: "createdAt", render: (v: string) => (v ? new Date(v).toLocaleDateString() : "—") },
  ];

  return (
    <CrudPage
      title="Barcodes"
      subtitle="Generated barcodes across all tenants"
      rows={data}
      loading={isFetching}
      columns={columns}
      onDelete={(id) => remove(id).unwrap()}
    />
  );
};

export default Barcodes;
