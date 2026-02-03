import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../core/redux/store";
import { Table } from "antd";
import Select from "react-select";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Filter, Sliders, PlusCircle, Edit, Trash2, Eye, User, Globe, RotateCcw } from "react-feather";

import StoreModal from "../../../core/modals/peoples/storeModal";
import UserStoreModal from "./editStore";
import { fetchGlobalStores, deleteGlobalStore } from "../../../core/redux/slices/store";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ImageWithBasePath from "../../../core/img/imagewithbasebath";
import { exportStoresToExcel, exportStoresToPDF } from "../../../feature-module/inventory/DataExport/exportStore";

const Stores = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { stores = [], loading } = useSelector((state: RootState) => state.store);

  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedStoreEdit, setSelectedStoreEdit] = useState<any>(null);

  // Fetch stores on mount
  useEffect(() => {
    dispatch(fetchGlobalStores());
  }, [dispatch]);

  // Prepare table data safely
  const tableData = useMemo(
    () =>
      stores
        .filter((c): c is NonNullable<typeof c> => c !== null && c !== undefined)
        .map((store) => ({
          key: store.id || Math.random().toString(),
          storeId: store.id || "",
          name: store.name || "N/A",
          email: store.email || "N/A",
          phone: store.phone || "N/A",
          address: store.address || "N/A",
          isMain: store.isMain,
          type: store.type,
          status: store.status,
          createdAt: store.createdAt
            ? new Date(store.createdAt).toLocaleDateString()
            : "N/A",
        })),
    [stores]
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
          await dispatch(deleteGlobalStore(id));
          setFilteredData((prev) => prev.filter((item) => item.storeId !== id));
          MySwal.fire("Deleted!", "Store has been deleted.", "success");
        } catch {
          MySwal.fire("Error!", "Failed to delete store.", "error");
        }
      }
    });
  };

  // Unique stores for dropdown filter
  const uniqueStores = Array.from(
    new Map(stores.filter(Boolean).map((c) => [c!.id, c!])).values()
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
  title: "is Main",
  dataIndex: "isMain",
  sorter: (a: any, b: any) => {
    return (a.isMain === b.isMain) ? 0 : a.isMain ? 1 : -1;
  },
  render: (value: boolean) => (value ? "True" : "False"),
},

            {
      title: "Type",
      dataIndex: "type",
      sorter: (a: any, b: any) => a.type.localeCompare(b.type),
    },
                {
      title: "Status",
      dataIndex: "status",
      sorter: (a: any, b: any) => a.status.localeCompare(b.status),
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
        const store = stores.find((c) => c?.id === record.storeId);
        return (
          <div className="edit-delete-action">
            <Link
              className="me-2 p-2"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#store-edit-modal"
              onClick={() => store && setSelectedStoreEdit(store)}
            >
              <Edit className="feather-edit" />
            </Link>
            <Link
              className="confirm-text p-2"
              to="#"
              onClick={() => showConfirmationAlert(record.storeId)}
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

    const exportData = stores.map((store) => ({
      id: store.id,
    name: store.name,
    email: store.email || "N/A",
    phone: store.phone || "N/A",
    address: store.address || "N/A",
    createdAt: store.createdAt
      ? new Date(store.createdAt).toLocaleDateString()
      : "N/A",
  }));

  return (
    <div className="page-wrapper">
      <div className="content">
        {/* HEADER */}
          <div className="page-header">
          <div className="add-item d-flex">
            <div className="page-title">
              <h4>Store</h4>
              <h6>Manage your stores</h6>
            </div>
          </div>

          <ul className="table-top-head">
            <li>
              <OverlayTrigger placement="top" overlay={<Tooltip>Pdf</Tooltip>}>
                <Link to="#" onClick={() => exportStoresToPDF(exportData)}>
                  <ImageWithBasePath src="assets/img/icons/pdf.svg" alt="img" />
                </Link>
              </OverlayTrigger>
            </li>
            <li>
              <OverlayTrigger placement="top" overlay={<Tooltip>Excel</Tooltip>}>
                <Link to="#" onClick={() => exportStoresToExcel(exportData)}>
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
                <Link to="#" onClick={() => dispatch(fetchGlobalStores())}>
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
              data-bs-target="#store-modal"
            >
              <PlusCircle className="me-2" />
              Add New Store
            </Link>
          </div>
        </div>
        {/* <div className="page-header d-flex justify-content-between align-items-center mb-3">
          <h4>Stores</h4>
          <Link
            to="#"
            className="btn btn-added me-2"
            data-bs-toggle="modal"
            data-bs-target="#store-modal"
          >
            <PlusCircle className="me-2" />
            Add New Store
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
                        { label: "All Stores", value: "" },
                        ...uniqueStores.map((c) => ({
                          label: c.name,
                          value: c.name,
                        })),
                      ]}
                      placeholder="Filter by Store Name"
                      isClearable
                      value={null}
                      onChange={() => {}}
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
            rowKey={(record) => record.storeId || Math.random().toString()}
            loading={loading}
          />
        </div>
      </div>

      {/* MODALS */}
      <StoreModal />
      <UserStoreModal selectedStoreEdit={selectedStoreEdit} />
   
    </div>
  );
};

export default Stores;
