import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "antd";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Filter, Sliders, PlusCircle, Edit, Trash2, Eye, RotateCcw } from "react-feather";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import { AppDispatch, RootState } from "@/core/redux/store";
import {
  fetchGlobalVariants,
  deleteGlobalVariant,
} from "../../../core/redux/slices/globalVariant";

import VariantModal from "./variantModal";
import VariantEditModal from "./editVariant";
import ImageWithBasePath from "../../../core/img/imagewithbasebath";
import {
  exportVariantsToPDF,
  exportVariantsToExcel
} from "../DataExport/exportVariant";
import ViewVariantModal from "./ViewVariantModal";


const Variants = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { variants = [], loading } = useSelector(
    (state: RootState) => state.globalVariant
  );

  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedVariantEdit, setSelectedVariantEdit] = useState<any>(null);

  const [selectedVariantView, setSelectedVariantView] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchGlobalVariants());
  }, [dispatch]);

  const tableData = useMemo(
    () =>
      variants.map((variant: any) => ({
        key: variant.id,
        variantId: variant.id,
        name: variant.name || "N/A",
        sku: variant.sku || "N/A",
        costPrice: variant.costPrice || 0,
        unitPrice: variant.unitPrice || 0,
        stock: variant.stock || 0,
        createdAt: variant.createdAt
          ? new Date(variant.createdAt).toLocaleDateString()
          : "N/A",
      })),
    [variants]
  );

  useEffect(() => {
    const lower = searchText.toLowerCase();
    setFilteredData(
      tableData.filter(
        (item) =>
          item.name.toLowerCase().includes(lower) ||
          item.sku.toLowerCase().includes(lower)
      )
    );
  }, [searchText, tableData]);

  const MySwal = withReactContent(Swal);

  const confirmDelete = (id: string) => {
    MySwal.fire({
      title: "Delete variant?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then(async (res) => {
      if (res.isConfirmed) {
        await dispatch(deleteGlobalVariant(id));
        MySwal.fire("Deleted", "Variant removed", "success");
      }
    });
  };

  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "SKU", dataIndex: "sku" },
    { title: "Cost Price", dataIndex: "costPrice" },
    { title: "Unit Price", dataIndex: "unitPrice" },
    { title: "Stock", dataIndex: "stock" },
    { title: "Created", dataIndex: "createdAt" },
    {
      title: "Actions",
      render: (_: any, record: any) => {
        const variant = variants.find((v: any) => v.id === record.variantId);
        return (
          <div className="edit-delete-action">
            <Link
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#variant-edit-modal"
              onClick={() => setSelectedVariantEdit(variant)}
            >
              <Edit />
            </Link>
            <Link to="#" onClick={() => confirmDelete(record.variantId)}>
              <Trash2 />
            </Link>
            <Link
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#variant-view-modal"
              onClick={() => setSelectedVariantView(variant)}
            >
              <Eye />
            </Link>

          </div>
        );
      },
    },
  ];


  const exportData = variants.map((variant) => ({
    variantId: variant.id,
    name: variant.name,
    sku: variant.sku || "N/A",
    costPrice: variant.costPrice || "N/A",
    unitPrice: variant.unitPrice,
    stock: variant.stock,
    createdAt: variant.createdAt



  }));
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="add-item d-flex">
            <div className="page-title">
              <h4>Variants</h4>

              <h6>Manage variants</h6>
            </div>
          </div>

          {/* <ul className="table-top-head">
            <li>
              <OverlayTrigger overlay={<Tooltip>Refresh</Tooltip>}>
                <Link to="#" onClick={() => dispatch(fetchGlobalVariants())}>
                  <RotateCcw />
                </Link>
              </OverlayTrigger>
            </li>
          </ul> */}
          <ul className="table-top-head">
            <li>
              <OverlayTrigger placement="top" overlay={<Tooltip>Pdf</Tooltip>}>
                <Link to="#" onClick={() => exportVariantsToPDF(exportData)}>
                  <ImageWithBasePath src="assets/img/icons/pdf.svg" alt="img" />
                </Link>
              </OverlayTrigger>
            </li>
            <li>
              <OverlayTrigger placement="top" overlay={<Tooltip>Excel</Tooltip>}>
                <Link to="#" onClick={() => exportVariantsToExcel(exportData)}>
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
                <Link to="#" onClick={() => dispatch(fetchGlobalVariants())}>
                  <RotateCcw />
                </Link>
              </OverlayTrigger>
            </li>
          </ul>
          <div className="page-btn">
            <Link
              to="#"
              className="btn btn-added"
              data-bs-toggle="modal"
              data-bs-target="#variant-modal"
            >
              <PlusCircle /> Add Variant
            </Link>
          </div>

        </div>

        <div className="table-top mb-3">
          <input
            className="form-control"
            placeholder="Search by name or SKU"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Filter onClick={() => setIsFilterVisible(!isFilterVisible)} />
          <Sliders />
        </div>

        <Table
          loading={loading}
          columns={columns}
          dataSource={filteredData}
          rowKey="variantId"
        />
      </div>

      <VariantModal />
      <VariantEditModal selectedVariantEdit={selectedVariantEdit} />
      <ViewVariantModal variant={selectedVariantView} />
    </div>
  );
};

export default Variants;
