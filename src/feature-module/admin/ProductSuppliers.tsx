import React, { useState } from "react";
import { Tag, Button, Modal, Form, Select, InputNumber, Switch, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  useGetProductSuppliersQuery,
  useCreateProductSupplierMutation,
  useDeleteProductSupplierMutation,
} from "../../core/redux/services/adminPhase2Api";
import { useGetTenantsQuery } from "../../core/redux/services/adminTenantApi";
import {
  useGetSuppliersByTenantQuery,
  useGetTenantCatalogProductsQuery,
} from "../../core/redux/services/adminTenantCatalogApi";
import CrudPage from "./common/CrudPage";

// Cascading create: tenant -> (its suppliers, its products) -> price-book fields.
const CreateModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const [form] = Form.useForm();
  const [tenantId, setTenantId] = useState<string | undefined>();
  const { data: tenants = [] } = useGetTenantsQuery();
  const { data: suppliers = [] } = useGetSuppliersByTenantQuery(tenantId as string, { skip: !tenantId });
  const { data: products = [] } = useGetTenantCatalogProductsQuery(tenantId as string, { skip: !tenantId });
  const [create, { isLoading }] = useCreateProductSupplierMutation();

  const submit = async () => {
    try {
      const v = await form.validateFields();
      await create({
        tenantId: v.tenantId,
        supplierId: v.supplierId,
        tenantProductId: v.tenantProductId,
        unitPrice: v.unitPrice,
        leadTime: v.leadTime,
        isPreferred: v.isPreferred,
      }).unwrap();
      message.success("Link created");
      form.resetFields();
      setTenantId(undefined);
      onClose();
    } catch (e: any) {
      if (e?.errorFields) return;
      message.error(e?.data?.message || "Couldn't create link");
    }
  };

  return (
    <Modal title="New Product-Supplier Link" open={open} onOk={submit} okButtonProps={{ loading: isLoading }} okText="Create"
      onCancel={() => { form.resetFields(); setTenantId(undefined); onClose(); }}>
      <Form form={form} layout="vertical">
        <Form.Item name="tenantId" label="Tenant" rules={[{ required: true, message: "Tenant is required" }]}>
          <Select showSearch optionFilterProp="label" placeholder="Select tenant"
            onChange={(v) => { setTenantId(v); form.setFieldsValue({ supplierId: undefined, tenantProductId: undefined }); }}
            options={tenants.map((t: any) => ({ value: t.id, label: t.name || t.id }))} />
        </Form.Item>
        <Form.Item name="supplierId" label="Supplier" rules={[{ required: true, message: "Supplier is required" }]}>
          <Select showSearch optionFilterProp="label" placeholder={tenantId ? "Select supplier" : "Select a tenant first"} disabled={!tenantId}
            options={suppliers.map((s: any) => ({ value: s.id, label: s.name || s.id }))} />
        </Form.Item>
        <Form.Item name="tenantProductId" label="Product" rules={[{ required: true, message: "Product is required" }]}>
          <Select showSearch optionFilterProp="label" placeholder={tenantId ? "Select product" : "Select a tenant first"} disabled={!tenantId}
            options={products.map((p: any) => ({ value: p.id, label: `${p.name}${p.sku ? ` · ${p.sku}` : ""}` }))} />
        </Form.Item>
        <Form.Item name="unitPrice" label="Unit price">
          <InputNumber style={{ width: "100%" }} min={0} prefix="₦" />
        </Form.Item>
        <Form.Item name="leadTime" label="Lead time (days)">
          <InputNumber style={{ width: "100%" }} min={0} />
        </Form.Item>
        <Form.Item name="isPreferred" label="Preferred supplier" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const ProductSuppliers: React.FC = () => {
  const { data = [], isFetching } = useGetProductSuppliersQuery();
  const [remove] = useDeleteProductSupplierMutation();
  const [showNew, setShowNew] = useState(false);

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
    <>
      <CrudPage
        title="Product Suppliers"
        subtitle="Product ↔ supplier price-book links across tenants"
        rows={data}
        loading={isFetching}
        columns={columns}
        onDelete={(id) => remove(id).unwrap()}
        toolbar={<Button type="primary" icon={<PlusOutlined />} onClick={() => setShowNew(true)}>New Link</Button>}
      />
      <CreateModal open={showNew} onClose={() => setShowNew(false)} />
    </>
  );
};

export default ProductSuppliers;
