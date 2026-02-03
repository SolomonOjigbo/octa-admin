import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {
  Box,
  ChevronUp,
  Edit,
  Eye,
  Filter,
  GitMerge,
  PlusCircle,
  RotateCcw,
  Sliders,
  StopCircle,
  Trash2,
} from "feather-icons-react/build/IconComponents";
import { Download } from "react-feather";

import { useAppDispatch, useAppSelector } from "../../core/redux/store";
import { fetchGlobalProducts } from "../../core/redux/slices/globalProduct";
import Table from "../../core/pagination/datatable";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import { setToogleHeader } from "../../core/redux/action";
import { all_routes } from "../../Router/all_routes";
import Brand from "../../core/modals/inventory/brand";
import small from "../../assets/images/logo-small.png";
import { exportProductsToExcel, exportProductsToPDF } from "./DataExport/exportProduct";
interface Product {
  id: string;
  product: string;
  productImage: string;
  sku: string;
  category: string;
  brand: string;
  // price: string | number;
  // unit: string;
  //qty: number;
  createdby: string;
  createdAt: string | Date;

  img: string;
  parentCategory?: string;
}

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector(
    (state) => state.globalProduct
  );
    const [searchText, setSearchText] = useState("");
  const sortedProducts = [...products].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const data = useAppSelector((state) => state.globalProduct);

  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const toggleFilterVisibility = () => setIsFilterVisible((prev) => !prev);

  const route = all_routes;

  useEffect(() => {
    dispatch(fetchGlobalProducts());
  }, [dispatch]);

  const dataSource: Product[] = sortedProducts.map((p: any) => ({
    id: p.id,
    product: p.name,
    productImage: p.imageUrl,
    sku: p.sku,
    category: p.category?.name || "No Category",
    brand: p.brand?.name || "No Brand",
    // price: p.price,
    // unit: p.unit,
    qty: p.quantity,
    createdAt: new Date(p.createdAt ?? ""),
    createdby: p.createdBy?.name || "Unknown",
     img: p.imageUrl || small,
    //img: p.createdBy?.imageUrl,
  }));

    // Filtered data based on search
  const filteredData = dataSource.filter((item) => {
    const lowerText = searchText.toLowerCase();
    return (
      item.product.toLowerCase().includes(lowerText) ||
      item.category.toLowerCase().includes(lowerText) ||
      (item.parentCategory || "").toLowerCase().includes(lowerText)
    );
  });

  const MySwal = withReactContent(Swal);

  const showConfirmationAlert = () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#00ff00",
      confirmButtonText: "Yes, delete it!",
      cancelButtonColor: "#ff0000",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          confirmButtonText: "OK",
          customClass: { confirmButton: "btn btn-success" },
        });
      } else {
        MySwal.close();
      }
    });
  };

  const columns = [

{
  title: "Product",
  dataIndex: "product",
  render: (text: string, record: Product) => {
    const imgSrc = record.img ? record.img : small;

    return (
      <span className="productimgname">
        <Link to={`/product-details/${record.id}`} className="product-img stock-img">
          <ImageWithBasePath
            alt={text}
            src={imgSrc} // use dynamic image or fallback
            width={40}
            height={40}
          />
        </Link>
        <Link to={`/product-details/${record.id}`}>{text}</Link>
      </span>
    );
  },
  sorter: (a: Product, b: Product) => a.product.length - b.product.length,
}
,

    { title: "SKU", dataIndex: "sku", sorter: (a: Product, b: Product) => a.sku.length - b.sku.length },
    { title: "Category", dataIndex: "category", sorter: (a: Product, b: Product) => a.category.length - b.category.length },
    { title: "Brand", dataIndex: "brand", sorter: (a: Product, b: Product) => a.brand.length - b.brand.length },
    //{ title: "Price", dataIndex: "price", sorter: (a: Product, b: Product) => String(a.price).length - String(b.price).length },
    //  { title: "Unit", dataIndex: "unit", sorter: (a: Product, b: Product) => a.unit.length - b.unit.length },
    // { title: "Qty", dataIndex: "qty", sorter: (a: Product, b: Product) => a.qty - b.qty },
{
  title: "Created On",
  dataIndex: "createdAt",
  render: (date: string | Date) => {
    if (!date) return "-";
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString();
  },
  sorter: (a: Product, b: Product) => {
    const da = typeof a.createdAt === "string" ? new Date(a.createdAt) : a.createdAt;
    const db = typeof b.createdAt === "string" ? new Date(b.createdAt) : b.createdAt;
    return da.getTime() - db.getTime();
  },
},

    {
      title: "Action",
      dataIndex: "action",
      render: (_: any, record: Product) => (
        <div className="edit-delete-action">
          {/* <Link className="me-2 p-2" to={route.productdetails}>
            <Eye className="feather-view" />
          </Link> */}
          <Link
            className="me-2 p-2"
            to={`/product-details/${record.id}`}
          >
            <Eye className="feather-view" />
          </Link>


          <Link className="me-2 p-2"
          //  to={route.editproduct}
              to={`/edit-product/${record.id}`}
           >
            <Edit className="feather-edit" />
          </Link>
          <Link className="confirm-text p-2" to="#" onClick={showConfirmationAlert}>
            <Trash2 className="feather-trash-2" />
          </Link>
        </div>
      ),
      sorter: (a: Product, b: Product) => a.createdby.length - b.createdby.length,
    },
  ];

  const productlist = [
    { value: "choose", label: "Choose Product" },
    { value: "lenovo", label: "Lenovo 3rd Generation" },
    { value: "nike", label: "Nike Jordan" },
  ];
  const categorylist = [
    { value: "choose", label: "Choose Category" },
    { value: "laptop", label: "Laptop" },
    { value: "shoe", label: "Shoe" },
  ];
  const subcategorylist = [
    { value: "choose", label: "Choose Sub Category" },
    { value: "computers", label: "Computers" },
    { value: "fruits", label: "Fruits" },
  ];
  const brandlist = [
    { value: "all", label: "All Brand" },
    { value: "lenovo", label: "Lenovo" },
    { value: "nike", label: "Nike" },
  ];
  const price = [
    { value: "price", label: "Price" },
    { value: "12500", label: "$12,500.00" },
    { value: "13000", label: "$13,000.00" }, // Replace with your actual values
  ];

  // Filter options
  const options = [
    { value: "sortByDate", label: "Sort by Date" },
    { value: "140923", label: "14 09 23" },
    { value: "110923", label: "11 09 23" },
  ];



  const exportData = products.map((procs) => ({
    id: procs.id,
    product: procs.name,
    sku: procs.sku,
    category: procs.category?.name || "No Category",
    brand: procs.brand?.name || "No Brand",

    createdAt: procs.createdAt ?? new Date().toISOString(),
  }));

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="add-item d-flex">
            <div className="page-title">
              <h4>Product List</h4>
              <h6>Manage your products</h6>
            </div>
          </div>
          <ul className="table-top-head">
            <li>
              <OverlayTrigger placement="top" overlay={<Tooltip>Pdf</Tooltip>}>
                <Link to="#" onClick={() => exportProductsToPDF(exportData)}>
                  <ImageWithBasePath src="assets/img/icons/pdf.svg" alt="img" />
                </Link>
              </OverlayTrigger>
            </li>
            <li>
              <OverlayTrigger placement="top" overlay={<Tooltip>Excel</Tooltip>}>
                <Link to="#" onClick={() => exportProductsToExcel(exportData)}>
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
                <Link to="#" onClick={() => dispatch(fetchGlobalProducts())}>
                  <RotateCcw />
                </Link>
              </OverlayTrigger>
            </li>
          </ul>
          <div className="page-btn">
            <Link to={route.addproduct} className="btn btn-added">
              <PlusCircle className="me-2 iconsize" />
              Add New Product
            </Link>
          </div>
          <div className="page-btn import">
            <Link
              to="#"
              className="btn btn-added color"
              data-bs-toggle="modal"
              data-bs-target="#view-notes"
            >
              <Download className="me-2" />
              Import Product
            </Link>
          </div>
        </div>
        {/* /product list */}
        <div className="card table-list-card">
          <div className="card-body">
            <div className="table-top">
              <div className="search-set">
                <div className="search-input">
                  <input
                    type="text"
                      value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Search"
                    className="form-control form-control-sm formsearch"
                  />
                  <Link to="#" className="btn btn-searchset">
                    <i data-feather="search" className="feather-search" />
                  </Link>
                </div>
              </div>
              <div className="search-path">
                <Link to="#"
                  className={`btn btn-filter ${isFilterVisible ? "setclose" : ""
                    }`}
                  id="filter_search"
                >
                  <Filter
                    className="filter-icon"
                    onClick={toggleFilterVisibility}
                  />
                  <span onClick={toggleFilterVisibility}>
                    <ImageWithBasePath
                      src="assets/img/icons/closes.svg"
                      alt="img"
                    />
                  </span>
                </Link>
              </div>
              <div className="form-sort">
                <Sliders className="info-img" />
                <Select
                  className="select"
                  options={options}
                  placeholder="14 09 23"
                />
              </div>
            </div>
            {/* /Filter */}
            <div
              className={`card${isFilterVisible ? " visible" : ""}`}
              id="filter_inputs"
              style={{ display: isFilterVisible ? "block" : "none" }}
            >
              <div className="card-body pb-0">
                <div className="row">
                  <div className="col-lg-12 col-sm-12">
                    <div className="row">
                      <div className="col-lg-2 col-sm-6 col-12">
                        <div className="input-blocks">
                          <Box className="info-img" />
                          <Select
                            className="select"
                            options={productlist}
                            placeholder="Choose Product"
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 col-sm-6 col-12">
                        <div className="input-blocks">
                          <StopCircle className="info-img" />
                          <Select
                            className="select"
                            options={categorylist}
                            placeholder="Choose Category"
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 col-sm-6 col-12">
                        <div className="input-blocks">
                          <GitMerge className="info-img" />
                          <Select
                            className="select"
                            options={subcategorylist}
                            placeholder="Choose Sub Category"
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 col-sm-6 col-12">
                        <div className="input-blocks">
                          <StopCircle className="info-img" />
                          <Select
                            className="select"
                            options={brandlist}
                            placeholder="Nike"
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 col-sm-6 col-12">
                        <div className="input-blocks">
                          <i className="fas fa-money-bill info-img" />

                          <Select
                            className="select"
                            options={price}
                            placeholder="Price"
                          />
                        </div>
                      </div>
                      <div className="col-lg-2 col-sm-6 col-12">
                        <div className="input-blocks">
                          <Link to="#" className="btn btn-filters ms-auto">
                            {" "}
                            <i
                              data-feather="search"
                              className="feather-search"
                            />{" "}
                            Search{" "}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Filter */}
            <div className="table-responsive">
              <Table props={{}} columns={columns} dataSource={filteredData} />
              {/* <Table props={{}} columns={columns} dataSource={dataSource} /> */}
            </div>
          </div>
        </div>
        {/* /product list */}
        <Brand />
      </div>
    </div>
  );
};

export default ProductList;
