// src/feature-module/admin/reports/index.tsx
//
// Live cross-tenant Reports & Analytics, backed by /admin/analytics/*. Replaces
// the empty Dreams-template report shells.

import React from "react";
import { Card, Row, Col, Statistic, Table, Spin, Tag, DatePicker } from "antd";
import ReactApexChart from "react-apexcharts";
import {
  useGetOverviewQuery,
  useGetSalesAnalyticsQuery,
  useGetPurchasesAnalyticsQuery,
  useGetFinancialsQuery,
  useGetTaxQuery,
  useGetTopCustomersQuery,
  useGetTopSuppliersQuery,
  useGetInventoryAnalyticsQuery,
} from "../../../core/redux/services/adminAnalyticsApi";

const { RangePicker } = DatePicker;

export const money = (v: any) => `₦${Number(v || 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
const num = (v: any) => Number(v || 0).toLocaleString();
const monthLabel = (v: any) => (v ? new Date(v).toLocaleDateString(undefined, { month: "short", year: "2-digit" }) : "");

const Page: React.FC<{ title: string; subtitle?: string; extra?: React.ReactNode; children: React.ReactNode }> = ({ title, subtitle, extra, children }) => (
  <div className="page-wrapper">
    <div className="content">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="mb-1">{title}</h4>
          {subtitle && <p className="text-muted mb-0">{subtitle}</p>}
        </div>
        {extra}
      </div>
      {children}
    </div>
  </div>
);

const Kpi: React.FC<{ label: string; value: any; money?: boolean; color?: string }> = ({ label, value, money: isMoney, color }) => (
  <Col xs={12} md={8} lg={6} className="mb-3">
    <Card>
      <Statistic title={label} value={isMoney ? money(value) : num(value)} valueStyle={color ? { color } : undefined} />
    </Card>
  </Col>
);

const useRange = () => {
  const [range, setRange] = React.useState<{ from?: string; to?: string }>({});
  const picker = (
    <RangePicker
      onChange={(v) => setRange(v && v[0] && v[1] ? { from: v[0].toISOString(), to: v[1].toISOString() } : {})}
    />
  );
  return { range, picker };
};

// ---- Dashboard ------------------------------------------------------------
export const AnalyticsDashboard: React.FC = () => {
  const { range, picker } = useRange();
  const { data: ov, isFetching: l1 } = useGetOverviewQuery(range);
  const { data: sales } = useGetSalesAnalyticsQuery(range);
  const { data: fin } = useGetFinancialsQuery(range);
  const { data: inv } = useGetInventoryAnalyticsQuery();
  const { data: topCust = [] } = useGetTopCustomersQuery({ limit: 5 });
  const { data: topSup = [] } = useGetTopSuppliersQuery({ limit: 5 });

  const series = sales?.series ?? [];
  const chart = {
    options: {
      chart: { toolbar: { show: false }, zoom: { enabled: false } },
      dataLabels: { enabled: false },
      stroke: { curve: "smooth" as const, width: 2 },
      xaxis: { categories: series.map((s: any) => monthLabel(s.month)) },
      yaxis: { labels: { formatter: (v: number) => `₦${Number(v).toLocaleString()}` } },
      colors: ["#cc752e"],
    },
    series: [{ name: "Sales", data: series.map((s: any) => Number(s.total || 0)) }],
  };

  return (
    <Page title="Analytics" subtitle="Platform-wide performance across all tenants" extra={picker}>
      {l1 && !ov ? (
        <div className="text-center py-5"><Spin /></div>
      ) : (
        <>
          <Row gutter={16}>
            <Kpi label="Revenue" value={ov?.revenue} money />
            <Kpi label="Transactions" value={ov?.transactionCount} />
            <Kpi label="Purchases" value={ov?.purchaseValue} money />
            <Kpi label="Receivables" value={ov?.outstandingReceivables} money color="#cf1322" />
            <Kpi label="Tenants" value={ov?.counts?.tenants} />
            <Kpi label="Active tenants" value={ov?.counts?.activeTenants} />
            <Kpi label="Customers" value={ov?.counts?.customers} />
            <Kpi label="Products" value={ov?.counts?.products} />
          </Row>

          <Row gutter={16}>
            <Col lg={16} className="mb-3">
              <Card title="Sales trend">
                {series.length ? <ReactApexChart options={chart.options} series={chart.series} type="area" height={300} /> : <p className="text-muted">No sales in range.</p>}
              </Card>
            </Col>
            <Col lg={8} className="mb-3">
              <Card title="Financials">
                <Statistic title="Income" value={money(fin?.income)} />
                <Statistic title="Expense" value={money(fin?.expense)} valueStyle={{ color: "#cf1322" }} className="mt-2" />
                <Statistic title="Profit" value={money(fin?.profit)} valueStyle={{ color: (fin?.profit ?? 0) >= 0 ? "#3f8600" : "#cf1322" }} className="mt-2" />
              </Card>
              <Card title="Inventory" className="mt-3">
                <Statistic title="Stock value" value={money(inv?.stockValue)} />
                <div className="mt-2 d-flex gap-3">
                  <span>Low stock: <Tag color="orange">{num(inv?.lowStockCount)}</Tag></span>
                  <span>Expired: <Tag color="red">{num(inv?.expiredCount)}</Tag></span>
                </div>
              </Card>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col lg={12} className="mb-3">
              <Card title="Top customers">
                <Table rowKey={(r: any) => r.customerId} size="small" pagination={false}
                  dataSource={topCust}
                  columns={[
                    { title: "Customer", dataIndex: "name", render: (v: string) => v || "—" },
                    { title: "Spend", dataIndex: "total", align: "right", render: money },
                    { title: "Orders", dataIndex: "orders", align: "right" },
                  ]} />
              </Card>
            </Col>
            <Col lg={12} className="mb-3">
              <Card title="Top suppliers">
                <Table rowKey={(r: any) => r.supplierId} size="small" pagination={false}
                  dataSource={topSup}
                  columns={[
                    { title: "Supplier", dataIndex: "name", render: (v: string) => v || "—" },
                    { title: "PO value", dataIndex: "total", align: "right", render: money },
                    { title: "Orders", dataIndex: "orders", align: "right" },
                  ]} />
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Page>
  );
};

// ---- Individual reports ---------------------------------------------------
export const SalesReport: React.FC = () => {
  const { range, picker } = useRange();
  const { data, isFetching } = useGetSalesAnalyticsQuery(range);
  return (
    <Page title="Sales Report" subtitle="Sales across all tenants" extra={picker}>
      <Row gutter={16}>
        <Kpi label="Total sales" value={data?.totalSales} money />
        <Kpi label="Transactions" value={data?.salesCount} />
      </Row>
      <Card title="Top tenants by sales">
        <Table rowKey={(r: any) => r.tenantId} loading={isFetching} size="small"
          dataSource={data?.byTenant ?? []}
          columns={[
            { title: "Tenant", dataIndex: "tenantId", ellipsis: true },
            { title: "Sales", dataIndex: "total", align: "right", render: money },
            { title: "Count", dataIndex: "count", align: "right" },
          ]} />
      </Card>
    </Page>
  );
};

export const PurchaseReport: React.FC = () => {
  const { range, picker } = useRange();
  const { data, isFetching } = useGetPurchasesAnalyticsQuery(range);
  return (
    <Page title="Purchase Report" subtitle="Purchase orders across all tenants" extra={picker}>
      <Row gutter={16}>
        <Kpi label="Total purchases" value={data?.totalPurchases} money />
        <Kpi label="Orders" value={data?.purchaseCount} />
      </Row>
      <Row gutter={16}>
        <Col lg={12} className="mb-3">
          <Card title="By status">
            <Table rowKey={(r: any) => r.status} loading={isFetching} size="small" pagination={false}
              dataSource={data?.byStatus ?? []}
              columns={[
                { title: "Status", dataIndex: "status", render: (s: string) => <Tag>{s}</Tag> },
                { title: "Value", dataIndex: "total", align: "right", render: money },
                { title: "Count", dataIndex: "count", align: "right" },
              ]} />
          </Card>
        </Col>
        <Col lg={12} className="mb-3">
          <Card title="Top tenants by spend">
            <Table rowKey={(r: any) => r.tenantId} size="small" pagination={false}
              dataSource={data?.byTenant ?? []}
              columns={[
                { title: "Tenant", dataIndex: "tenantId", ellipsis: true },
                { title: "Spend", dataIndex: "total", align: "right", render: money },
              ]} />
          </Card>
        </Col>
      </Row>
    </Page>
  );
};

const FinancialByCategory: React.FC<{ title: string; type?: "INCOME" | "EXPENSE" }> = ({ title, type }) => {
  const { range, picker } = useRange();
  const { data, isFetching } = useGetFinancialsQuery(range);
  const rows = (data?.byCategory ?? []).filter((c: any) => (type ? c.type === type : true));
  return (
    <Page title={title} subtitle="From the unified financial ledger" extra={picker}>
      <Row gutter={16}>
        {(!type || type === "INCOME") && <Kpi label="Income" value={data?.income} money color="#3f8600" />}
        {(!type || type === "EXPENSE") && <Kpi label="Expense" value={data?.expense} money color="#cf1322" />}
        {!type && <Kpi label="Profit" value={data?.profit} money color={(data?.profit ?? 0) >= 0 ? "#3f8600" : "#cf1322"} />}
      </Row>
      <Card title="By category">
        <Table rowKey={(r: any) => `${r.type}-${r.category}`} loading={isFetching} size="small"
          dataSource={rows}
          columns={[
            { title: "Type", dataIndex: "type", render: (t: string) => <Tag color={t === "INCOME" ? "green" : "red"}>{t}</Tag> },
            { title: "Category", dataIndex: "category" },
            { title: "Amount", dataIndex: "total", align: "right", render: money },
          ]} />
      </Card>
    </Page>
  );
};

export const ProfitLoss: React.FC = () => <FinancialByCategory title="Profit & Loss" />;
export const IncomeReport: React.FC = () => <FinancialByCategory title="Income Report" type="INCOME" />;
export const ExpenseReport: React.FC = () => <FinancialByCategory title="Expense Report" type="EXPENSE" />;

export const TaxReport: React.FC = () => {
  const { range, picker } = useRange();
  const { data } = useGetTaxQuery(range);
  return (
    <Page title="Tax Report" subtitle="Tax collected across all tenants" extra={picker}>
      <Row gutter={16}>
        <Kpi label="Tax collected" value={data?.taxCollected} money />
        <Kpi label="Sales base" value={data?.salesBase} money />
      </Row>
    </Page>
  );
};

export const CustomerReport: React.FC = () => {
  const { data = [], isFetching } = useGetTopCustomersQuery({ limit: 50 });
  return (
    <Page title="Customer Report" subtitle="Top customers across all tenants">
      <Card>
        <Table rowKey={(r: any) => r.customerId} loading={isFetching} size="small"
          dataSource={data}
          columns={[
            { title: "Customer", dataIndex: "name", render: (v: string) => v || "—" },
            { title: "Tenant", dataIndex: "tenantId", ellipsis: true },
            { title: "Spend", dataIndex: "total", align: "right", render: money },
            { title: "Orders", dataIndex: "orders", align: "right" },
          ]} />
      </Card>
    </Page>
  );
};

export const SupplierReport: React.FC = () => {
  const { data = [], isFetching } = useGetTopSuppliersQuery({ limit: 50 });
  return (
    <Page title="Supplier Report" subtitle="Top suppliers across all tenants">
      <Card>
        <Table rowKey={(r: any) => r.supplierId} loading={isFetching} size="small"
          dataSource={data}
          columns={[
            { title: "Supplier", dataIndex: "name", render: (v: string) => v || "—" },
            { title: "Tenant", dataIndex: "tenantId", ellipsis: true },
            { title: "PO value", dataIndex: "total", align: "right", render: money },
            { title: "Orders", dataIndex: "orders", align: "right" },
          ]} />
      </Card>
    </Page>
  );
};

export const InventoryReport: React.FC = () => {
  const { data, isFetching } = useGetInventoryAnalyticsQuery();
  return (
    <Page title="Inventory Report" subtitle="Stock position across all tenants">
      {isFetching && !data ? <div className="text-center py-5"><Spin /></div> : (
        <Row gutter={16}>
          <Kpi label="Stock value" value={data?.stockValue} money />
          <Kpi label="Total quantity" value={data?.totalQuantity} />
          <Kpi label="Distinct products" value={data?.distinctProducts} />
          <Kpi label="Low stock" value={data?.lowStockCount} color="#d46b08" />
          <Kpi label="Expired" value={data?.expiredCount} color="#cf1322" />
        </Row>
      )}
    </Page>
  );
};
