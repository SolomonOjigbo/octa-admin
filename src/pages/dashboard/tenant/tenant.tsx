import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../core/redux/store";
import { Table } from "antd";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Filter, Sliders, PlusCircle, Edit, Trash2, Eye, RotateCcw } from "react-feather";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

//import TenantModal from "./tenantModal";
import TenantEditModal from "./editTenant";

import {
  fetchGlobalTenants,
  deleteGlobalTenant,
} from "../../../core/redux/slices/tenantSlice";

const Tenants = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tenants = [], loading } = useSelector(
    (state: RootState) => state.tenant
  );
console.log("Tenants from Redux:", tenants);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedTenantEdit, setSelectedTenantEdit] = useState<any>(null);

  /* =========================
     FETCH TENANTS
  ========================== */
  useEffect(() => {
    dispatch(fetchGlobalTenants());
  }, [dispatch]);

  /* =========================
     TABLE DATA
  ========================== */
  const tableData = useMemo(
    () =>
      tenants
        .filter(Boolean)
        .map((tenant) => ({
          key: tenant.id,
          tenantId: tenant.id,
          name: tenant.name || "N/A",
          slug: tenant.slug || "N/A",
          legalName: tenant.legalName || "N/A",
          contactEmail: tenant.contactEmail || "N/A",
            isActive: tenant.isActive || false,
          createdAt: tenant.createdAt
            ? new Date(tenant.createdAt).toLocaleDateString()
            : "N/A",
        })),
    [tenants]
  );

  /* =========================
     SEARCH
  ========================== */
  useEffect(() => {
    const lower = searchText.toLowerCase();
    const filtered = tableData.filter(
      (item) =>
        item.name.toLowerCase().includes(lower) ||
        item.slug.toLowerCase().includes(lower)
    );
    setFilteredData(filtered);
  }, [searchText, tableData]);

  const toggleFilterVisibility = () => setIsFilterVisible((prev) => !prev);

  /* =========================
     DELETE CONFIRMATION
  ========================== */
  const MySwal = withReactContent(Swal);

  const showConfirmationAlert = (id: string) => {
    MySwal.fire({
      title: "Delete Tenant?",
      text: "This action cannot be undone",
      showCancelButton: true,
      confirmButtonColor: "#00ff00",
      cancelButtonColor: "#ff0000",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(deleteGlobalTenant(id));
        setFilteredData((prev) =>
          prev.filter((item) => item.tenantId !== id)
        );
        MySwal.fire("Deleted!", "Tenant removed.", "success");
      }
    });
  };

  /* =========================
     TABLE COLUMNS
  ========================== */
  const columns = [
    {
      title: "Tenant Name",
      dataIndex: "name",
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: "Slug",
      dataIndex: "slug",
      sorter: (a: any, b: any) => a.slug.localeCompare(b.slug),
    },
    {
      title: "Legal Name",
      dataIndex: "legalName",
    },
    {
      title: "Contact Email",
      dataIndex: "contactEmail",
    },
    {
  title: "isActive",
  dataIndex: "isActive",
  render: (v: boolean) => (
    <span className={v ? "text-success" : "text-danger"}>
      {v ? "true" : "false"}
    </span>
  ),
},
    {
      title: "Created",
      dataIndex: "createdAt",
    },
    {
      title: "Actions",
      render: (_: any, record: any) => {
        const tenant = tenants.find((t) => t.id === record.tenantId);

        return (
          <div className="edit-delete-action">
            <Link
              to="#"
              className="me-2 p-2"
              data-bs-toggle="modal"
              data-bs-target="#tenant-edit-modal"
              onClick={() => tenant && setSelectedTenantEdit(tenant)}
            >
              <Edit />
            </Link>

            <Link
              to="#"
              className="p-2"
              onClick={() => showConfirmationAlert(record.tenantId)}
            >
              <Trash2 />
            </Link>

            {/* <Link to="#" className="me-2 p-2">
              <Eye />
            </Link> */}
          </div>
        );
      },
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">

        {/* HEADER */}
        <div className="page-header">
          <div className="page-title">
            <h4>Tenants</h4>
            <h6>Manage your organizations</h6>
          </div>

          <ul className="table-top-head">
            <li>
              <OverlayTrigger placement="top" overlay={<Tooltip>Refresh</Tooltip>}>
                <Link to="#" onClick={() => dispatch(fetchGlobalTenants())}>
                  <RotateCcw />
                </Link>
              </OverlayTrigger>
            </li>
          </ul>

          {/* <div className="page-btn">
            <Link
              to="#"
              className="btn btn-added"
              data-bs-toggle="modal"
              data-bs-target="#tenant-modal"
            >
              <PlusCircle className="me-2" />
              Add Tenant
            </Link>
          </div> */}
        </div>

        {/* SEARCH */}
        <div className="table-top mb-3 d-flex align-items-center">
          <input
            type="text"
            placeholder="Search tenant"
            className="form-control me-2"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Filter onClick={toggleFilterVisibility} />
          <Sliders className="ms-2" />
        </div>

        {/* TABLE */}
        <div className="table-responsive">
          <Table
            columns={columns}
            dataSource={filteredData}
            loading={loading}
          />
        </div>
      </div>

      {/* MODALS */}
      {/* <TenantModal /> */}
      <TenantEditModal selectedTenantEdit={selectedTenantEdit} />
    </div>
  );
};

export default Tenants;