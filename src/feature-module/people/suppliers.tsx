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
        tenant: supplier.tenant?.name || "N/A",
        createdAt: supplier.createdAt
          ? new Date(supplier.createdAt).toLocaleDateString()
          : "N/A",
       // image: supplier.image || "",
      })) || [],
    [suppliers]
  );

  useEffect(() => {
    setFilteredData(tableData);
  }, [tableData]);

  // SEARCH
  useEffect(() => {
    applyFilterAndSearch();
  }, [searchText, tableData]);

  const applyFilterAndSearch = () => {
    let data = [...tableData];
    if (searchText) {
      const lower = searchText.toLowerCase();
      data = data.filter(
        (item) =>
          item.name.toLowerCase().includes(lower) ||
          item.email.toLowerCase().includes(lower)
      );
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
            {/* Open Edit Modal with selected supplier */}
            <Link
              className="me-2 p-2"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#edit-supplier"
              onClick={() => setSelectedSupplierEdit(record)}
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
        {/* Header */}
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
                  <ImageWithBasePath src="assets/img/icons/excel.svg" alt="img" />
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
            {/* Add Supplier */}
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

        {/* Search & filter */}
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

        {/* Optional filter card */}
        {isFilterVisible && (
          <div className="card mb-3">
            <div className="card-body pb-0">
              <div className="row">
                <div className="col-lg-3 col-sm-6 col-12">
                  <Select
                    options={suppliers.map((s) => ({
                      label: s.name,
                      value: s.id,
                    }))}
                    placeholder="Choose Supplier"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="table-responsive">
          <Table
            columns={columns}
            dataSource={filteredData}
            loading={loading}
            rowKey={(record) => record.supplierId}
          />
        </div>
      </div>

      {/* Modals */}
      <SupplierModal /> {/* Add Supplier */}
    <SupplierEditModal selectedSupplierEdit={selectedSupplierEdit} />

    </div>
  );
};

export default Suppliers;
