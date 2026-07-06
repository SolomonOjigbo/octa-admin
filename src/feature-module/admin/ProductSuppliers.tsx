import React from "react";
import { Tag } from "antd";
import {
  useGetProductSuppliersQuery,
  useDeleteProductSupplierMutation,
} from "../../core/redux/services/adminPhase2Api";
import CrudPage from "./common/CrudPage";

const ProductSuppliers: React.FC = () => {
  const { data = [], isFetching } = useGetProductSuppliersQuery();
  const [remove] = useDeleteProductSupplierMutation();

  const columns = [
    { title: "Supplier", key: "supplier", render: (_: any, r: any) => r.supplier?.name || r.supplierId || "—", ellipsis: true },
    {
      title: "Product",
      key: "product",
      ellipsis: true,
      render: (_: any, r: any) => r.tenantProduct?.name || r.globalProduct?.name || r.tenantProductId || r.globalProductId || "—",
    },
    { title: "Unit price", dataIndex: "unitPrice", render: (v: any) => (v != null ? `₦${Number(v).toLocaleString()}` : "—") },
    { title: "Lead time", dataIndex: "leadTime", render: (v: any) => (v != null ? `${v}d` : "—") },
    { title: "Preferred", dataIndex: "isPreferred", render: (v: boolean) => (v ? <Tag color="green">Preferred</Tag> : "—") },
    { title: "Tenant", dataIndex: "tenantId", ellipsis: true, render: (v: string) => v || "—" },
  ];

  return (
    <CrudPage
      title="Product Suppliers"
      subtitle="Product ↔ supplier price-book links across tenants"
      rows={data}
      loading={isFetching}
      columns={columns}
      onDelete={(id) => remove(id).unwrap()}
    />
  );
};

export default ProductSuppliers;
