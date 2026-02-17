import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../core/redux/store";
import { Table } from "antd";
import Select from "react-select";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Filter, Sliders, PlusCircle, Edit, Trash2, Eye, User, Globe, RotateCcw } from "react-feather";

import CustomerModal from "../../../core/modals/peoples/customerModal";
import CustomerEditModal from "./editCustomer";
import { fetchGlobalCustomers, deleteGlobalCustomer } from "../../../core/redux/slices/customer";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ImageWithBasePath from "../../../core/img/imagewithbasebath";
import { exportCustomersToExcel, exportCustomersToPDF } from "../DataExport/exportCustomer";

const Customers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { customers = [], loading } = useSelector((state: RootState) => state.customer);

  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedCustomerEdit, setSelectedCustomerEdit] = useState<any>(null);

  // Fetch customers on mount
  useEffect(() => {
    dispatch(fetchGlobalCustomers());
  }, [dispatch]);

  // Prepare table data safely
  const tableData = useMemo(
    () =>
      customers
        .filter((c): c is NonNullable<typeof c> => c !== null && c !== undefined)
        .map((customer) => ({
          key: customer.id || Math.random().toString(),
          customerId: customer.id || "",
          name: customer.name || "N/A",
          email: customer.email || "N/A",
          phone: customer.phone || "N/A",
          address: customer.address || "N/A",
          createdAt: customer.createdAt
            ? new Date(customer.createdAt).toLocaleDateString()
            : "N/A",
        })),
    [customers]
  );

  // Apply search filter
  useEffect(() => {
    const lower = searchText.toLowerCase();
    const filtered = tableData.filter(
      (item) =>
        item.name.toLowerCase().includes(lower) ||
        item.email.toLowerCase().includes(lower)
    );
    setFilteredData(filtered);
  }, [searchText, tableData]);

  const toggleFilterVisibility = () => setIsFilterVisible((prev) => !prev);

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
          await dispatch(deleteGlobalCustomer(id));
          setFilteredData((prev) => prev.filter((item) => item.customerId !== id));
          MySwal.fire("Deleted!", "Customer has been deleted.", "success");
        } catch {
          MySwal.fire("Error!", "Failed to delete customer.", "error");
        }
      }
    });
  };

  // Unique customers for dropdown filter
  const uniqueCustomers = Array.from(
    new Map(customers.filter(Boolean).map((c) => [c!.id, c!])).values()
  );

  // Table columns
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
      title: "Customer Name",
      dataIndex: "name",
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
      title: "Address",
      dataIndex: "address",
      sorter: (a: any, b: any) => a.address.localeCompare(b.address),
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
      render: (_: any, record: any) => {
        const customer = customers.find((c) => c?.id === record.customerId);
        return (
          <div className="edit-delete-action">
            <Link
              className="me-2 p-2"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#customer-edit-modal"
              onClick={() => customer && setSelectedCustomerEdit(customer)}
            >
              <Edit className="feather-edit" />
            </Link>
            <Link
              className="confirm-text p-2"
              to="#"
              onClick={() => showConfirmationAlert(record.customerId)}
            >
              <Trash2 className="feather-trash-2" />
            </Link>
            <Link className="me-2 p-2" to="#">
              <Eye className="feather-view" />
            </Link>
          </div>
        );
      },
    },
  ];

    const exportData = customers.map((customer) => ({
      customerId: customer.id,
    name: customer.name,
    email: customer.email || "N/A",
    phone: customer.phone || "N/A",
    address: customer.address || "N/A",
    createdAt: customer.createdAt
      ? new Date(customer.createdAt).toLocaleDateString()
      : "N/A",
  }));

  return (
    <div className="page-wrapper">
      <div className="content">
        {/* HEADER */}
          <div className="page-header">
          <div className="add-item d-flex">
            <div className="page-title">
              <h4>Customer</h4>
              <h6>Manage your customers</h6>
            </div>
          </div>

          <ul className="table-top-head">
            <li>
              <OverlayTrigger placement="top" overlay={<Tooltip>Pdf</Tooltip>}>
                <Link to="#" onClick={() => exportCustomersToPDF(exportData)}>
                  <ImageWithBasePath src="assets/img/icons/pdf.svg" alt="img" />
                </Link>
              </OverlayTrigger>
            </li>
            <li>
              <OverlayTrigger placement="top" overlay={<Tooltip>Excel</Tooltip>}>
                <Link to="#" onClick={() => exportCustomersToExcel(exportData)}>
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
                <Link to="#" onClick={() => dispatch(fetchGlobalCustomers())}>
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
              Add New Customer
            </Link>
          </div>
        </div>
        {/* <div className="page-header d-flex justify-content-between align-items-center mb-3">
          <h4>Customers</h4>
          <Link
            to="#"
            className="btn btn-added me-2"
            data-bs-toggle="modal"
            data-bs-target="#customer-modal"
          >
            <PlusCircle className="me-2" />
            Add New Customer
          </Link>
        </div> */}

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
                  <div className="input-blocks">
                    <User className="info-img" />
                    <Select
                      options={[
                        { label: "All Customers", value: "" },
                        ...uniqueCustomers.map((c) => ({
                          label: c.name,
                          value: c.name,
                        })),
                      ]}
                      placeholder="Filter by Customer Name"
                      isClearable
                      value={null}
                      onChange={() => {}}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="input-blocks">
                    <Globe className="info-img" />
                    <Select
                      options={[
                        { label: "All Countries", value: "" },
                        { label: "India", value: "India" },
                        { label: "USA", value: "USA" },
                      ]}
                      placeholder="Filter by Country"
                    />
                  </div>
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
            rowKey={(record) => record.customerId || Math.random().toString()}
            loading={loading}
          />
        </div>
      </div>

      {/* MODALS */}
      <CustomerModal />
      <CustomerEditModal selectedCustomerEdit={selectedCustomerEdit} />
   
    </div>
  );
};

export default Customers;
