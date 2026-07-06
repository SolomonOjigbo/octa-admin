// src/feature-module/admin/operations/index.tsx
//
// Phase 3 cross-tenant operational views — live tables replacing the mock/empty
// stock, sales, and purchase pages. Read-first (delete where the backend allows).

import React from "react";
import { Tag } from "antd";
import CrudPage from "../common/CrudPage";
import {
  useGetTransactionsQuery, useDeleteTransactionMutation,
  useGetPaymentsQuery,
  useGetPosSessionsQuery, useDeletePosSessionMutation,
  useGetStocksQuery,
  useGetInventoryQuery,
  useGetStockTransfersQuery,
  useGetQuotationsQuery, useDeleteQuotationMutation,
  useGetPurchaseOrdersQuery, useDeletePurchaseOrderMutation,
} from "../../../core/redux/services/adminPhase3Api";

export const money = (v: any) => (v == null || v === "" ? "—" : `₦${Number(v).toLocaleString(undefined, { maximumFractionDigits: 2 })}`);
const date = (v: any) => (v ? new Date(v).toLocaleDateString() : "—");
const dateTime = (v: any) => (v ? new Date(v).toLocaleString() : "—");
const txt = (v: any) => (v == null || v === "" ? "—" : String(v));

const statusColors: Record<string, string> = {
  PAID: "green", COMPLETED: "green", ACTIVE: "green", APPROVED: "green", ACCEPTED: "green", CLOSED: "default",
  PENDING: "orange", PROCESSING: "orange", PARTIALLY_PAID: "orange", SENT: "blue", OPEN: "green",
  UNPAID: "red", REJECTED: "red", CANCELLED: "red", VOID: "red", EXPIRED: "default", REFUNDED: "purple",
};
const Status: React.FC<{ s?: string }> = ({ s }) => (s ? <Tag color={statusColors[s] || "blue"}>{s}</Tag> : <>—</>);
const tenantCol = { title: "Tenant", dataIndex: "tenantId", ellipsis: true, render: txt };

export const Transactions: React.FC = () => {
  const { data = [], isFetching } = useGetTransactionsQuery();
  const [remove] = useDeleteTransactionMutation();
  const columns = [
    { title: "Reference", key: "ref", render: (_: any, r: any) => txt(r.transactionNo || r.referenceId || r.id), ellipsis: true },
    { title: "Amount", dataIndex: "totalAmount", render: (v: any, r: any) => money(v ?? r.amount) },
    { title: "Method", key: "method", render: (_: any, r: any) => txt(r.paymentMethod || (Array.isArray(r.paymentMethods) ? r.paymentMethods.join(", ") : r.paymentMethods)) },
    { title: "Status", key: "st", render: (_: any, r: any) => <Status s={r.paymentStatus || r.status} /> },
    tenantCol,
    { title: "Date", dataIndex: "createdAt", render: dateTime },
  ];
  return <CrudPage title="Transactions" subtitle="All POS/sales transactions across tenants" rows={data} loading={isFetching} columns={columns} onDelete={(id) => remove(id).unwrap()} />;
};

export const Payments: React.FC = () => {
  const { data = [], isFetching } = useGetPaymentsQuery();
  const columns = [
    { title: "Reference", key: "ref", render: (_: any, r: any) => txt(r.reference || r.invoiceId || r.transactionId || r.id), ellipsis: true },
    { title: "Amount", dataIndex: "amount", render: money },
    { title: "Method", dataIndex: "method", render: txt },
    { title: "Status", key: "st", render: (_: any, r: any) => <Status s={r.status} /> },
    tenantCol,
    { title: "Date", dataIndex: "createdAt", render: dateTime },
  ];
  return <CrudPage title="Payments" subtitle="All payments across tenants" rows={data} loading={isFetching} columns={columns} />;
};

export const PosSessions: React.FC = () => {
  const { data = [], isFetching } = useGetPosSessionsQuery();
  const [remove] = useDeletePosSessionMutation();
  const columns = [
    { title: "Session", key: "s", render: (_: any, r: any) => txt(r.sessionNo || r.id), ellipsis: true },
    { title: "Store", dataIndex: "storeId", ellipsis: true, render: txt },
    { title: "Cashier", key: "u", render: (_: any, r: any) => txt(r.user?.name || r.userId) },
    { title: "Status", key: "st", render: (_: any, r: any) => <Status s={r.status} /> },
    tenantCol,
    { title: "Opened", dataIndex: "openedAt", render: dateTime },
    { title: "Closed", dataIndex: "closedAt", render: dateTime },
  ];
  return <CrudPage title="POS Sessions" subtitle="Point-of-sale sessions across tenants" rows={data} loading={isFetching} columns={columns} onDelete={(id) => remove(id).unwrap()} />;
};

export const Stock: React.FC = () => {
  const { data = [], isFetching } = useGetStocksQuery();
  const columns = [
    { title: "Product", key: "p", ellipsis: true, render: (_: any, r: any) => txt(r.tenantProductVariant?.name || r.tenantProduct?.name || r.tenantProductVariantId || r.tenantProductId) },
    { title: "Quantity", dataIndex: "quantity", render: (v: any) => txt(v) },
    { title: "Location", key: "loc", ellipsis: true, render: (_: any, r: any) => txt(r.store?.name || r.warehouse?.name || r.storeId || r.warehouseId) },
    { title: "Batch", dataIndex: "batchNumber", render: txt },
    { title: "Reorder pt", dataIndex: "reorderPoint", render: (v: any) => txt(v) },
    tenantCol,
  ];
  return <CrudPage title="Stock" subtitle="Stock levels across all tenants" rows={data} loading={isFetching} columns={columns} />;
};

export const InventoryMovements: React.FC = () => {
  const { data = [], isFetching } = useGetInventoryQuery();
  const columns = [
    { title: "Type", dataIndex: "movementType", render: (v: any) => <Tag>{txt(v)}</Tag> },
    { title: "Product", key: "p", ellipsis: true, render: (_: any, r: any) => txt(r.tenantProductVariant?.name || r.tenantProduct?.name || r.tenantProductVariantId || r.tenantProductId) },
    { title: "Qty", dataIndex: "quantity", render: (v: any) => txt(v) },
    { title: "Reason", dataIndex: "reason", ellipsis: true, render: txt },
    tenantCol,
    { title: "Date", dataIndex: "createdAt", render: dateTime },
  ];
  return <CrudPage title="Inventory Movements" subtitle="Inventory ledger across all tenants" rows={data} loading={isFetching} columns={columns} />;
};

export const StockTransfers: React.FC = () => {
  const { data = [], isFetching } = useGetStockTransfersQuery();
  const columns = [
    { title: "Reference", key: "ref", render: (_: any, r: any) => txt(r.reference || r.transferNo || r.id), ellipsis: true },
    { title: "From", key: "from", ellipsis: true, render: (_: any, r: any) => txt(r.fromStore?.name || r.fromWarehouse?.name || r.fromStoreId || r.fromWarehouseId) },
    { title: "To", key: "to", ellipsis: true, render: (_: any, r: any) => txt(r.toStore?.name || r.toWarehouse?.name || r.toStoreId || r.toWarehouseId) },
    { title: "Status", key: "st", render: (_: any, r: any) => <Status s={r.status} /> },
    tenantCol,
    { title: "Date", dataIndex: "createdAt", render: dateTime },
  ];
  return <CrudPage title="Stock Transfers" subtitle="Inter-location & B2B transfers across tenants" rows={data} loading={isFetching} columns={columns} />;
};

export const Quotations: React.FC = () => {
  const { data = [], isFetching } = useGetQuotationsQuery();
  const [remove] = useDeleteQuotationMutation();
  const columns = [
    { title: "Quote #", dataIndex: "quoteNo", render: txt },
    { title: "Customer", key: "c", ellipsis: true, render: (_: any, r: any) => txt(r.customer?.name || r.customerId) },
    { title: "Total", dataIndex: "totalAmount", render: money },
    { title: "Status", key: "st", render: (_: any, r: any) => <Status s={r.status} /> },
    { title: "Valid until", dataIndex: "validUntil", render: date },
    tenantCol,
  ];
  return <CrudPage title="Quotations" subtitle="Sales quotations across tenants" rows={data} loading={isFetching} columns={columns} onDelete={(id) => remove(id).unwrap()} />;
};

export const PurchaseOrders: React.FC = () => {
  const { data = [], isFetching } = useGetPurchaseOrdersQuery();
  const [remove] = useDeletePurchaseOrderMutation();
  const columns = [
    { title: "PO #", dataIndex: "poNumber", render: txt },
    { title: "Supplier", key: "s", ellipsis: true, render: (_: any, r: any) => txt(r.supplier?.name || r.supplierId) },
    { title: "Total", dataIndex: "totalAmount", render: money },
    { title: "Status", key: "st", render: (_: any, r: any) => <Status s={r.status} /> },
    { title: "Payment", key: "pay", render: (_: any, r: any) => <Status s={r.paymentStatus} /> },
    tenantCol,
    { title: "Date", dataIndex: "createdAt", render: date },
  ];
  return <CrudPage title="Purchase Orders" subtitle="Purchase orders across tenants" rows={data} loading={isFetching} columns={columns} onDelete={(id) => remove(id).unwrap()} />;
};
