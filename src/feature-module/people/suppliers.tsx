import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../core/redux/store";
import { Link } from "react-router-dom";
import { Table } from "antd";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Select from "react-select";
import {
  Filter,
  Sliders,
  PlusCircle,
  Edit,
  Trash2,
  RotateCcw,
} from "react-feather";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import SupplierModal from "../../core/modals/peoples/supplierModal";
import SupplierEditModal from "./editSupplier";
import {
  fetchGlobalSuppliers,
  deleteGlobalSupplier,
} from "../../core/redux/slices/globalSupplier";
import {
  exportSuppliersToExcel,
  exportSuppliersToPDF,
} from "../inventory/DataExport/exportSupplier";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const Suppliers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { suppliers, loading } = useSelector(
    (state: RootState) => state.globalSupplier
  );

  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedSupplierEdit, setSelectedSupplierEdit] = useState<any>(null);

  // NEW: tenant dropdown selected value
  const [tenantFilter, setTenantFilter] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchGlobalSuppliers());
  }, [dispatch]);

  // Table data
  const tableData = React.useMemo(
    () =>
      suppliers?.map((supplier) => ({
        key: supplier.id,
        supplierId: supplier.id,
        name: supplier.name,
        email: supplier.email || "N/A",
        phone: supplier.phone || "N/A",
        paymentTerms: supplier.paymentTerms || "N/A",
        tenantId: supplier.tenant?.id || "",
        tenant: supplier.tenant?.name || "N/A",
        createdAt: supplier.createdAt
          ? new Date(supplier.createdAt).toLocaleDateString()
          : "N/A",
      })) || [],
    [suppliers]
  );

  useEffect(() => {
    setFilteredData(tableData);
  }, [tableData]);

  // APPLY SEARCH + TENANT FILTER
  useEffect(() => {
    applyFilterAndSearch();
  }, [searchText, tenantFilter, tableData]);

  const applyFilterAndSearch = () => {
    let data = [...tableData];

    // Search by Name OR Email
    if (searchText) {
      const lower = searchText.toLowerCase();
      data = data.filter(
        (item) =>
          item.name.toLowerCase().includes(lower) ||
          item.email.toLowerCase().includes(lower)
      );
    }

    // Tenant Filter
    if (tenantFilter && tenantFilter !== "ALL") {
      data = data.filter((item) => item.tenantId === tenantFilter);
    }


    setFilteredData(data);
  };

  const toggleFilterVisibility = () => {
    setIsFilterVisible((prev) => !prev);
  };

  const MySwal = withReactContent(Swal);

  const showConfirmationAlert = (id: string) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#00ff00",
      confirmButtonText: "Yes, delete it!",
      cancelButtonColor: "#ff0000",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await dispatch(deleteGlobalSupplier(id));
          setFilteredData((prev) =>
            prev.filter((item) => item.supplierId !== id)
          );
          MySwal.fire("Deleted!", "Supplier has been deleted.", "success");
        } catch {
          MySwal.fire("Error!", "Failed to delete supplier.", "error");
        }
      } else {
        MySwal.close();
      }
    });
  };

  // Extract unique tenants
  const uniqueTenants = Array.from(
    new Map(
      suppliers
        .filter((s) => s.tenant)
        .map((s) => [s.tenant?.id, s.tenant])
    ).values()
  );

  const columns = [
    {
      render: () => (
        <label className="checkboxs">
          <input type="checkbox" />
          <span className="checkmarks" />
        </label>
      ),
    },
    {
      title: "Supplier Name",
      dataIndex: "name",
      render: (text: string, record: any) => (
        <span className="productimgname">
          <Link to="#" className="product-img stock-img">
            <ImageWithBasePath alt="" src={record.image} />
          </Link>
          <Link to="#">{text}</Link>
        </span>
      ),
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a: any, b: any) => a.email.localeCompare(b.email),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      sorter: (a: any, b: any) => a.phone.localeCompare(b.phone),
    },
    {
      title: "Payment Terms",
      dataIndex: "paymentTerms",
      sorter: (a: any, b: any) => a.paymentTerms.localeCompare(b.paymentTerms),
    },
    {
      title: "Tenant",
      dataIndex: "tenant",
      sorter: (a: any, b: any) => a.tenant.localeCompare(b.tenant),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      sorter: (a: any, b: any) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_: any, record: any) => (
        <td className="action-table-data">
          <div className="edit-delete-action">
            <Link
              className="me-2 p-2"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#edit-supplier"
              onClick={() => {
                const fullSupplier = suppliers.find(
                  (s) => s.id === record.supplierId
                );
                setSelectedSupplierEdit(fullSupplier);
              }}
            >
              <Edit className="feather-edit" />
            </Link>
            <Link
              className="confirm-text p-2"
              to="#"
              onClick={() => showConfirmationAlert(record.supplierId)}
            >
              <Trash2 className="feather-trash-2" />
            </Link>
          </div>
        </td>
      ),
    },
  ];

  const exportData = suppliers.map((supplier) => ({
    name: supplier.name,
    email: supplier.email || "N/A",
    phone: supplier.phone || "N/A",
    paymentTerms: supplier.paymentTerms || "N/A",
    tenant: supplier.tenant?.name || "N/A",
    createdAt: supplier.createdAt
      ? new Date(supplier.createdAt).toLocaleDateString()
      : "N/A",
  }));

  return (
    <div className="page-wrapper">
      <div className="content">
        {/* HEADER */}
        <div className="page-header">
          <div className="add-item d-flex">
            <div className="page-title">
              <h4>Suppliers</h4>
              <h6>Manage your suppliers</h6>
            </div>
          </div>

          <ul className="table-top-head">
            <li>
              <OverlayTrigger placement="top" overlay={<Tooltip>Pdf</Tooltip>}>
                <Link to="#" onClick={() => exportSuppliersToPDF(exportData)}>
                  <ImageWithBasePath src="assets/img/icons/pdf.svg" alt="img" />
                </Link>
              </OverlayTrigger>
            </li>
            <li>
              <OverlayTrigger placement="top" overlay={<Tooltip>Excel</Tooltip>}>
                <Link to="#" onClick={() => exportSuppliersToExcel(exportData)}>
                  <ImageWithBasePath
                    src="assets/img/icons/excel.svg"
                    alt="img"
                  />
                </Link>
              </OverlayTrigger>
            </li>
            <li>
              <OverlayTrigger placement="top" overlay={<Tooltip>Printer</Tooltip>}>
                <Link to="#" onClick={() => window.print()}>
                  <i data-feather="printer" className="feather-printer" />
                </Link>
              </OverlayTrigger>
            </li>
            <li>
              <OverlayTrigger placement="top" overlay={<Tooltip>Refresh</Tooltip>}>
                <Link to="#" onClick={() => dispatch(fetchGlobalSuppliers())}>
                  <RotateCcw />
                </Link>
              </OverlayTrigger>
            </li>
          </ul>

          <div className="page-btn">
            <Link
              to="#"
              className="btn btn-added me-2"
              data-bs-toggle="modal"
              data-bs-target="#supplier-modal"
            >
              <PlusCircle className="me-2" />
              Add New Supplier
            </Link>
          </div>
        </div>

        {/* SEARCH + FILTER */}
        <div className="table-top mb-3 d-flex align-items-center">
          <input
            type="text"
            placeholder="Search by name or email"
            className="form-control me-2"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Filter className="cursor-pointer" onClick={toggleFilterVisibility} />
          <Sliders className="ms-2" />
        </div>

        {/* FILTER CARD */}
        {isFilterVisible && (
          <div className="card mb-3">
            <div className="card-body pb-0">
              <div className="row">
                <div className="col-lg-3 col-sm-6 col-12">

                  {/* TENANT FILTER DROPDOWN */}
                  <Select
                    options={[
                      { label: "All Tenants", value: "ALL" }, // 👈 NEW OPTION

                      ...uniqueTenants.map((t) => ({
                        label: t!.name,
                        value: t!.id,
                      })),
                    ]}

                    placeholder="Filter by Tenant"
                    isClearable
                    value={
                      tenantFilter
                        ? tenantFilter === "ALL"
                          ? { label: "All Tenants", value: "ALL" }
                          : uniqueTenants
                            .map((t) => ({ label: t!.name, value: t!.id }))
                            .find((opt) => opt.value === tenantFilter)
                        : null
                    }
                    onChange={(e) => setTenantFilter(e ? e.value : null)}
                  />


                </div>
              </div>
            </div>
          </div>
        )}

        {/* TABLE */}
        <div className="table-responsive">
          <Table
            columns={columns}
            dataSource={filteredData}
            loading={loading}
            rowKey={(record) => record.supplierId}
          />
        </div>
      </div>

      {/* MODALS */}
      <SupplierModal />
      <SupplierEditModal selectedSupplierEdit={selectedSupplierEdit} />
    </div>
  );
};

export default Suppliers;
