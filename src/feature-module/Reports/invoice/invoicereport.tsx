import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "antd";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Edit, Trash2, Eye, RotateCcw, Filter, Sliders } from "react-feather";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Select from "react-select";
import DateRangePicker from "react-bootstrap-daterangepicker";

import Breadcrumbs from "../../../core/breadcrumbs";
import ImageWithBasePath from "../../../core/img/imagewithbasebath";

import { AppDispatch, RootState } from "../../../core/redux/store";
import { fetchInvoices, deleteInvoice } from "../../../core/redux/slices/invoice";

import InvoiceEditModal from "./InvoiceEditModal";
import ViewInvoiceModal from "./ViewInvoiceModal";
import { exportInvoicesToPDF, exportInvoicesToExcel } from "../../../feature-module/inventory/DataExport/exportInvoice";

interface InvoiceTableRow {
  key: string;
  invoiceNo: string;
  status: string;
  totalAmount: number;
  tenantName: string;
  customerName: string;
  dueDate: string;
}

const InvoiceReport: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { invoices = [], loading } = useSelector((state: RootState) => state.invoice);

  const [searchText, setSearchText] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedInvoiceEdit, setSelectedInvoiceEdit] = useState<any>(null);
  const [selectedInvoiceView, setSelectedInvoiceView] = useState<any>(null);

  const [filterCustomer, setFilterCustomer] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [filterDates, setFilterDates] = useState<[Date, Date] | null>(null);

  useEffect(() => {
    dispatch(fetchInvoices());
  }, [dispatch]);

  const MySwal = withReactContent(Swal);

  const confirmDelete = (id: string) => {
    MySwal.fire({
      title: "Delete invoice?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then(async (res) => {
      if (res.isConfirmed) {
        await dispatch(deleteInvoice(id));
        MySwal.fire("Deleted!", "Invoice removed.", "success");
      }
    });
  };

  const toggleFilterVisibility = () => setIsFilterVisible(!isFilterVisible);

  const tableData: InvoiceTableRow[] = useMemo(() => {
    return invoices
      .filter((inv) =>
        searchText
          ? inv.invoiceNo.toLowerCase().includes(searchText.toLowerCase()) ||
          (inv.customer?.name || "").toLowerCase().includes(searchText.toLowerCase())
          : true
      )
      .filter((inv) => (filterCustomer ? inv.customer?.name === filterCustomer : true))
      .filter((inv) => (filterStatus ? inv.status === filterStatus : true))
      .filter((inv) => {
        if (!filterDates) return true;
        if (!inv.dueDate) return false;
        const due = new Date(inv.dueDate);
        return due >= filterDates[0] && due <= filterDates[1];
      })
      .map((inv) => ({
        key: inv.id,
        invoiceNo: inv.invoiceNo || "",
        status: inv.status || "",
        totalAmount: Number(inv.totalAmount) || 0, // <-- cast string to number
        tenantName: inv.tenant?.name || "",
        customerName: inv.customer?.name || "",
        dueDate: inv.dueDate ? new Date(inv.dueDate).toLocaleDateString() : "",
      }));
  }, [invoices, searchText, filterCustomer, filterStatus, filterDates]);


  // Build filter options from invoices
  const customerOptions = [
    { value: "chooseCustomer", label: "Choose Customer" },
    ...Array.from(new Set(invoices.map((i) => i.customer?.name))).map((name) => ({
      value: name || "",
      label: name || "",
    })),
  ];

  const statusOptions = [
    { value: "chooseStatus", label: "Choose Status" },
    { value: "Paid", label: "Paid" },
    { value: "Unpaid", label: "Unpaid" },
    { value: "Overdue", label: "Overdue" },
  ];

  const columns = [
    { title: "Invoice No", dataIndex: "invoiceNo" },
    { title: "Customer", dataIndex: "customerName" },
    { title: "Tenant", dataIndex: "tenantName" },
    { title: "Due Date", dataIndex: "dueDate" },
    { title: "Amount", dataIndex: "totalAmount" },
    { title: "Status", dataIndex: "status" },
    {
      title: "Actions",
      render: (_: any, record: InvoiceTableRow) => {
        const invoice = invoices.find((i) => i.id === record.key);
        return (
          <div className="edit-delete-action">
            <Link
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#invoice-edit-modal"
              onClick={() => setSelectedInvoiceEdit(invoice)}
            >
              <Edit />
            </Link>
            <Link to="#" onClick={() => confirmDelete(record.key)}>
              <Trash2 />
            </Link>
            <Link
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#invoice-view-modal"
              onClick={() => setSelectedInvoiceView(invoice)}
            >
              <Eye />
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        {/* <Breadcrumbs maintitle="Invoice Report" subtitle="Manage Your Invoice Report" /> */}

<div className="page-header">
   <div className="add-item d-flex">
          <div className="page-title">
            <h4>Invoices</h4>
            <h6>Manage invoices</h6>
          </div>
           </div>
             <ul className="table-top-head">
            <li>
              <OverlayTrigger overlay={<Tooltip>Pdf</Tooltip>}>
                <Link to="#" onClick={() => exportInvoicesToPDF(tableData)}>
                  <ImageWithBasePath src="assets/img/icons/pdf.svg" alt="PDF" />
                </Link>
              </OverlayTrigger>
            </li>
            <li>
              <OverlayTrigger overlay={<Tooltip>Excel</Tooltip>}>
                <Link to="#" onClick={() => exportInvoicesToExcel(tableData)}>
                  <ImageWithBasePath src="assets/img/icons/excel.svg" alt="Excel" />
                </Link>
              </OverlayTrigger>
            </li>
            <li>
              <OverlayTrigger overlay={<Tooltip>Printer</Tooltip>}>
                <Link to="#" onClick={() => window.print()}>
                  <i data-feather="printer" className="feather-printer" />
                </Link>
              </OverlayTrigger>
            </li>
            <li>
              <OverlayTrigger overlay={<Tooltip>Refresh</Tooltip>}>
                <Link to="#" onClick={() => dispatch(fetchInvoices())}>
                  <RotateCcw />
                </Link>
              </OverlayTrigger>
            </li>
          </ul>
               <div className="page-btn">
            {/* <Link
              to="#"
              className="btn btn-added"
              data-bs-toggle="modal"
              data-bs-target="#invoice-modal"
            >
              Add Invoice
            </Link> */}
          </div>
</div>
     
        
     
       

        <div className="table-top mb-3 d-flex align-items-center">
          <input
            className="form-control me-2"
            placeholder="Search by invoice or customer"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Filter onClick={toggleFilterVisibility} />
          <Sliders />
        </div>

        {isFilterVisible && (
          <div className="card mb-3">
            <div className="card-body">
              <div className="row g-3">
                <div className="col-lg-3 col-sm-6">
                  <Select
                    className="select"
                    options={customerOptions}
                    onChange={(opt) =>
                      setFilterCustomer(
                        opt?.value === "chooseCustomer" ? null : opt?.value ?? null
                      )
                    }
                  />
                </div>
                <div className="col-lg-3 col-sm-6">
                  <Select
                    className="select"
                    options={statusOptions}
                    onChange={(opt) =>
                      setFilterStatus(
                        opt?.value === "chooseStatus" ? null : opt?.value ?? null
                      )
                    }
                  />
                </div>

                <div className="col-lg-3 col-sm-6">
                  <DateRangePicker
                    initialSettings={{ startDate: new Date(), endDate: new Date() }}
                    onCallback={(start, end) => setFilterDates([start, end])}
                  >
                    <input type="text" className="form-control" placeholder="Select date range" />
                  </DateRangePicker>
                </div>
              </div>
            </div>
          </div>
        )}

        <Table loading={loading} columns={columns} dataSource={tableData} rowKey="key" />
      </div>

      <InvoiceEditModal selectedInvoiceEdit={selectedInvoiceEdit} />
      <ViewInvoiceModal invoice={selectedInvoiceView} />
    </div>
  );
};

export default InvoiceReport;
