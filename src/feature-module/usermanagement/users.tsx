import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../core/redux/store";
import { Table } from "antd";
import Select from "react-select";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Filter, Sliders, PlusCircle, Edit, Trash2, Eye, User, Globe, RotateCcw } from "react-feather";

import UserModal from "../../core/modals/peoples/userModal";
import UserEditModal from "./editUser";
import { fetchGlobalUsers, deleteGlobalUser } from "../../core/redux/slices/user";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import { exportUsersToExcel, exportUsersToPDF } from "../inventory/DataExport/exportUser";

const Users = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users = [], loading } = useSelector((state: RootState) => state.user);

  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedUserEdit, setSelectedUserEdit] = useState<any>(null);

  // Fetch users on mount
  useEffect(() => {
    dispatch(fetchGlobalUsers());
  }, [dispatch]);

  // Prepare table data safely
  const tableData = useMemo(
    () =>
      users
        .filter((c): c is NonNullable<typeof c> => c !== null && c !== undefined)
        .map((user) => ({
          key: user.id || Math.random().toString(),
          userId: user.id || "",
          name: user.name || "N/A",
          email: user.email || "N/A",
          phone: user.phone || "N/A",
          address: user.address || "N/A",
          isActive: user.isActive ? "Active" : "Inactive",
          isEmailVerified: user.isEmailVerified ? "Verified" : "Unverified",
          createdAt: user.createdAt
            ? new Date(user.createdAt).toLocaleDateString()
            : "N/A",
        })),
    [users]
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
          await dispatch(deleteGlobalUser(id));
          setFilteredData((prev) => prev.filter((item) => item.userId !== id));
          MySwal.fire("Deleted!", "User has been deleted.", "success");
        } catch {
          MySwal.fire("Error!", "Failed to delete user.", "error");
        }
      }
    });
  };

  // Unique users for dropdown filter
  const uniqueCustomers = Array.from(
    new Map(users.filter(Boolean).map((c) => [c!.id, c!])).values()
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
      title: "Name",
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
      title: "isActive",
      dataIndex: "isActive",
      sorter: (a: any, b: any) => a.isActive.localeCompare(b.isActive),
    },
    {
      title: "Email Verified",
      dataIndex: "isEmailVerified",
      sorter: (a: any, b: any) => a.isEmailVerified.localeCompare(b.isEmailVerified),
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
        const user = users.find((c) => c?.id === record.userId);
        return (
          <div className="edit-delete-action">
            <Link
              className="me-2 p-2"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#user-edit-modal"
              onClick={() => user && setSelectedUserEdit(user)}
            >
              <Edit className="feather-edit" />
            </Link>
            <Link
              className="confirm-text p-2"
              to="#"
              onClick={() => showConfirmationAlert(record.userId)}
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

  const exportData = users.map((user) => ({
    userId: user.id,
    name: user.name,
    email: user.email || "N/A",
    phone: user.phone || "N/A",
    address: user.address || "N/A",
    createdAt: user.createdAt
      ? new Date(user.createdAt).toLocaleDateString()
      : "N/A",
  }));

  return (
    <div className="page-wrapper">
      <div className="content">
        {/* HEADER */}
        <div className="page-header">
          <div className="add-item d-flex">
            <div className="page-title">
              <h4>User</h4>
              <h6>Manage your users</h6>
            </div>
          </div>

          <ul className="table-top-head">
            <li>
              <OverlayTrigger placement="top" overlay={<Tooltip>Pdf</Tooltip>}>
                <Link to="#" onClick={() => exportUsersToPDF(exportData)}>
                  <ImageWithBasePath src="assets/img/icons/pdf.svg" alt="img" />
                </Link>
              </OverlayTrigger>
            </li>
            <li>
              <OverlayTrigger placement="top" overlay={<Tooltip>Excel</Tooltip>}>
                <Link to="#" onClick={() => exportUsersToExcel(exportData)}>
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
                <Link to="#" onClick={() => dispatch(fetchGlobalUsers())}>
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
              data-bs-target="#user-modal"
            >
              <PlusCircle className="me-2" />
              Add New User
            </Link>
          </div>
        </div>
        {/* <div className="page-header d-flex justify-content-between align-items-center mb-3">
          <h4>Users</h4>
          <Link
            to="#"
            className="btn btn-added me-2"
            data-bs-toggle="modal"
            data-bs-target="#user-modal"
          >
            <PlusCircle className="me-2" />
            Add New User
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
                        { label: "All Users", value: "" },
                        ...uniqueCustomers.map((c) => ({
                          label: c.name,
                          value: c.name,
                        })),
                      ]}
                      placeholder="Filter by User Name"
                      isClearable
                      value={null}
                      onChange={() => { }}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">

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
            rowKey={(record) => record.userId || Math.random().toString()}
            loading={loading}
          />
        </div>
      </div>

      {/* MODALS */}
      <UserModal />
      <UserEditModal selectedUserEdit={selectedUserEdit} />

    </div>
  );
};

export default Users;
